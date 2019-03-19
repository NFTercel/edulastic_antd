import { testActivityApi, testsApi } from "@edulastic/api";
import { takeEvery, call, all, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import { keyBy as _keyBy } from "lodash";
import { ShuffleChoices } from "../utils/test";
import { getCurrentGroup } from "../../student/Login/ducks";
import {
  LOAD_TEST,
  LOAD_TEST_ITEMS,
  SET_TEST_ID,
  FINISH_TEST,
  LOAD_PREVIOUS_RESPONSES,
  LOAD_ANSWERS,
  SET_TEST_ACTIVITY_ID,
  LOAD_SCRATCH_PAD,
  SET_TEST_LOADING_STATUS
} from "../constants/actions";
import { loadQuestionsAction } from "../actions/questions";
import { setShuffledOptions } from "../actions/shuffledOptions";
import { SET_RESUME_STATUS } from "../../student/Assignments/ducks";

const getQuestions = (testItems = []) => {
  const allQuestions = [];

  testItems.forEach(item => {
    const { questions = [], resources = [] } = item.data;
    allQuestions.push(...questions, ...resources);
  });

  return allQuestions;
};

function* loadTest({ payload }) {
  try {
    yield put({
      type: SET_TEST_LOADING_STATUS,
      payload: true
    });

    const { testActivityId, testId } = payload;
    yield put({
      type: SET_TEST_ID,
      payload: {
        testId
      }
    });

    const groupId = yield select(getCurrentGroup);
    // if testActivityId is passed, need to load previous responses as well!
    const getTestActivity = testActivityId ? call(testActivityApi.getById, testActivityId, groupId) : false;
    const [test, testActivity] = yield all([
      call(testsApi.getById, testId, {
        validation: true,
        data: true
      }),
      getTestActivity
    ]);

    const questions = getQuestions(test.testItems);
    yield put(loadQuestionsAction(_keyBy(questions, "id")));

    let { testItems } = test;

    const { testActivity: activity, questionActivities = [] } = testActivity;
    // if questions are shuffled !!!
    if (activity.shuffleQuestions) {
      const itemsByKey = _keyBy(testItems, "_id");
      testItems = (activity.shuffledTestItems || []).map(id => itemsByKey[id]).filter(item => !!item);
    }

    let shuffles;
    if (activity.shuffledTestItems) {
      [testItems, shuffles] = ShuffleChoices(testItems, questionActivities);
      yield put(setShuffledOptions(shuffles));
    }

    yield put({
      type: LOAD_TEST_ITEMS,
      payload: {
        items: testItems,
        title: test.title,
        annotations: test.annotations,
        docUrl: test.docUrl
      }
    });

    // if testActivity is present.
    if (testActivity) {
      let allAnswers = {};
      const userWork = {};

      yield put({
        type: SET_TEST_ACTIVITY_ID,
        payload: { testActivityId }
      });

      let lastAttemptedQuestion = questionActivities[0] || {};

      questionActivities.forEach(item => {
        allAnswers = {
          ...allAnswers,
          [item.qid]: item.userResponse
        };
        if (item.updatedAt > lastAttemptedQuestion.updatedAt) {
          lastAttemptedQuestion = item;
        }
      });

      // get currentItem index;
      let lastAttendedQuestion = 0;
      if (lastAttemptedQuestion && lastAttemptedQuestion.testItemId) {
        test.testItems.forEach((item, index) => {
          if (item._id === lastAttemptedQuestion.testItemId) {
            lastAttendedQuestion = index;
          }
        });
      }

      // load previous responses
      yield put({
        type: LOAD_ANSWERS,
        payload: allAnswers
      });

      yield put({
        type: LOAD_SCRATCH_PAD,
        payload: userWork
      });

      // only load from previous attempted if resuming from assignments page
      const loadFromLast = yield select(state => state.test && state.test.resume);

      // move to last attended question
      if (loadFromLast) {
        yield put(push(`${lastAttendedQuestion}`));
        yield put({
          type: SET_RESUME_STATUS,
          payload: false
        });
      }
    }

    yield put({
      type: SET_TEST_LOADING_STATUS,
      payload: false
    });
  } catch (err) {
    console.error(err);
  }
}

// load users previous responses for a particular test
function* loadPreviousResponses() {
  try {
    const testActivityId = yield select(state => state.test && state.test.testActivityId);
    const answers = yield testActivityApi.previousResponses(testActivityId);
    yield put({
      type: LOAD_ANSWERS,
      payload: { ...answers }
    });
  } catch (err) {
    console.log(err);
  }
}

function* submitTest() {
  try {
    const testActivityId = yield select(state => state.test && state.test.testActivityId);
    const groupId = yield select(getCurrentGroup);
    if (testActivityId === "test") {
      return;
    }
    yield testActivityApi.submit(testActivityId, groupId);
    yield put(push("/home/reports"));
  } catch (err) {
    console.log(err);
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(LOAD_TEST, loadTest),
    yield takeEvery(FINISH_TEST, submitTest),
    yield takeEvery(LOAD_PREVIOUS_RESPONSES, loadPreviousResponses)
  ]);
}
