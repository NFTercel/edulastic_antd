import { takeEvery, put, all, select, call } from "redux-saga/effects";
import { message } from "antd";
import { testItemsApi } from "@edulastic/api";

// actions
import { CHECK_ANSWER_EVALUATION, ADD_ITEM_EVALUATION, CHANGE_PREVIEW } from "../constants/actions";
import { itemQuestionsSelector, answersForCheck } from "../selectors/test";

function* evaluateAnswers() {
  try {
    const questionIds = yield select(itemQuestionsSelector);
    const allAnswers = yield select(answersForCheck);
    const answerIds = Object.keys(allAnswers);
    const userResponse = {};

    answerIds.forEach(id => {
      if (questionIds.includes(id)) {
        userResponse[id] = allAnswers[id];
      }
    });

    const { items, currentItem } = yield select(state => state.test);
    const id = items[currentItem]._id;
    const result = yield call(testItemsApi.evaluation, id, userResponse);

    yield put({
      type: CHANGE_PREVIEW,
      payload: {
        view: "check"
      }
    });

    yield put({
      type: ADD_ITEM_EVALUATION,
      payload: {
        ...result
      }
    });

    yield put({
      type: ADD_ITEM_EVALUATION,
      payload: {
        ...result.evaluations
      }
    });
    const msg = `score: ${result.score} / ${result.maxScore}`;
    yield call(message.success, msg, 0.5);
  } catch (err) {
    console.log(err);
  }
}

export default function* watcherSaga() {
  yield all([yield takeEvery(CHECK_ANSWER_EVALUATION, evaluateAnswers)]);
}
