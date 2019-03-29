import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { message } from "antd";
import { isArray, isNull, isBoolean } from "lodash";
import { testItemsApi } from "@edulastic/api";
import { evaluateItem } from "../utils/evalution";
import createShowAnswerData from "../utils/showAnswer";

import {
  CREATE_TEST_ITEM_REQUEST,
  CREATE_TEST_ITEM_ERROR,
  CREATE_TEST_ITEM_SUCCESS,
  UPDATE_TEST_ITEM_REQUEST,
  UPDATE_TEST_ITEM_SUCCESS,
  UPDATE_TEST_ITEM_ERROR,
  SHOW_ANSWER,
  CHECK_ANSWER,
  ADD_ITEM_EVALUATION,
  CHANGE_VIEW
} from "../constants/actions";

import { history } from "../../../configureStore";
import { getQuestionsSelector } from "../../sharedDucks/questions";
import { SET_ANSWER } from "../../../assessment/constants/actions";

function* createTestItemSaga({ payload }) {
  try {
    const item = yield call(testItemsApi.create, payload);
    yield put({
      type: CREATE_TEST_ITEM_SUCCESS,
      payload: { item: item.data }
    });
    yield call(history.push, `/author/items/${item._id}/item-detail`);
  } catch (err) {
    console.error(err);
    const errorMessage = "Create item is failed";
    yield call(message.error, errorMessage);
    yield put({
      type: CREATE_TEST_ITEM_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* updateTestItemSaga({ payload }) {
  try {
    const item = yield call(testItemsApi.update, payload);
    yield put({
      type: UPDATE_TEST_ITEM_SUCCESS,
      payload: { item }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Update item is failed";
    yield call(message.error, errorMessage);
    yield put({
      type: UPDATE_TEST_ITEM_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* evaluateAnswers() {
  try {
    const oldAnswers = yield select(state => state.answers);
    const id = yield select(state => state.question.entity.data.id);

    if (!oldAnswers[id]) {
      yield put({
        type: SET_ANSWER,
        payload: {
          id,
          data: []
        }
      });
    }

    const answers = yield select(state => state.answers);
    const validations = yield select(getQuestionsSelector);
    const { evaluation, score, maxScore } = yield evaluateItem(answers, validations);

    yield put({
      type: ADD_ITEM_EVALUATION,
      payload: {
        ...evaluation
      }
    });
    message.config({
      maxCount: 1
    });
    message.success(`score: ${score}/${maxScore}`);
  } catch (err) {
    console.error(err);
    const errorMessage = "Answer Evaluation Failed";
    yield call(message.error, errorMessage);
  }
}

function* showAnswers() {
  try {
    const answers = yield select(state => state.answers);
    const validations = yield select(getQuestionsSelector);
    const { evaluation } = createShowAnswerData(validations, answers);
    yield put({
      type: ADD_ITEM_EVALUATION,
      payload: {
        ...evaluation
      }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Show Answer Failed";
    yield call(message.error, errorMessage);
  }
}

function* setAnswerSaga() {
  const answers = yield select(state => state.answers);
  const id = yield select(state => state.question.entity.data.id);

  if (!answers[id]) {
    yield put({
      type: SET_ANSWER,
      payload: {
        id,
        data: []
      }
    });
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(CREATE_TEST_ITEM_REQUEST, createTestItemSaga),
    yield takeEvery(UPDATE_TEST_ITEM_REQUEST, updateTestItemSaga),
    yield takeEvery(CHECK_ANSWER, evaluateAnswers),
    yield takeEvery(CHANGE_VIEW, setAnswerSaga),
    yield takeEvery(SHOW_ANSWER, showAnswers)
  ]);
}
