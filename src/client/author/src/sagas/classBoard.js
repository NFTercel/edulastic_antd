import { takeEvery, call, put, all } from "redux-saga/effects";
import { classBoardApi } from "@edulastic/api";
import { message } from "antd";

import {
  RECEIVE_GRADEBOOK_REQUEST,
  RECEIVE_GRADEBOOK_SUCCESS,
  RECEIVE_GRADEBOOK_ERROR,
  RECEIVE_TESTACTIVITY_REQUEST,
  RECEIVE_TESTACTIVITY_SUCCESS,
  RECEIVE_TESTACTIVITY_ERROR
} from "../constants/actions";

function* receiveGradeBookSaga({ payload }) {
  try {
    const entities = yield call(classBoardApi.gradebook, payload);

    yield put({
      type: RECEIVE_GRADEBOOK_SUCCESS,
      payload: { entities }
    });
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_GRADEBOOK_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* receiveTestActivitySaga({ payload }) {
  try {
    const entities = yield call(classBoardApi.testActivity, payload);
    yield put({
      type: RECEIVE_TESTACTIVITY_SUCCESS,
      payload: { entities }
    });
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_TESTACTIVITY_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_GRADEBOOK_REQUEST, receiveGradeBookSaga),
    yield takeEvery(RECEIVE_TESTACTIVITY_REQUEST, receiveTestActivitySaga)
  ]);
}
