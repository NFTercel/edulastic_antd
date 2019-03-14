import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { classResponseApi } from "@edulastic/api";
import { message } from "antd";
import { getCurrentGroup } from "../src/selectors/user";

import {
  RECEIVE_CLASS_RESPONSE_REQUEST,
  RECEIVE_CLASS_RESPONSE_SUCCESS,
  RECEIVE_CLASS_RESPONSE_ERROR,
  RECEIVE_STUDENT_RESPONSE_REQUEST,
  RECEIVE_STUDENT_RESPONSE_SUCCESS,
  RECEIVE_STUDENT_RESPONSE_ERROR,
  RECEIVE_FEEDBACK_RESPONSE_REQUEST,
  RECEIVE_FEEDBACK_RESPONSE_SUCCESS,
  RECEIVE_FEEDBACK_RESPONSE_ERROR
} from "../src/constants/actions";

function* receiveClassResponseSaga({ payload }) {
  try {
    const classResponse = yield call(classResponseApi.classResponse, payload);

    yield put({
      type: RECEIVE_CLASS_RESPONSE_SUCCESS,
      payload: classResponse
    });
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_CLASS_RESPONSE_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* receiveStudentResponseSaga({ payload }) {
  try {
    const studentResponse = yield call(classResponseApi.studentResponse, payload);

    yield put({
      type: RECEIVE_STUDENT_RESPONSE_SUCCESS,
      payload: studentResponse
    });
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_STUDENT_RESPONSE_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* receiveFeedbackResponseSaga({ payload }) {
  try {
    const feedbackResponse = yield call(classResponseApi.feedbackResponse, payload);

    yield put({
      type: RECEIVE_FEEDBACK_RESPONSE_SUCCESS,
      payload: feedbackResponse
    });
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_FEEDBACK_RESPONSE_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_CLASS_RESPONSE_REQUEST, receiveClassResponseSaga),
    yield takeEvery(RECEIVE_STUDENT_RESPONSE_REQUEST, receiveStudentResponseSaga),
    yield takeEvery(RECEIVE_FEEDBACK_RESPONSE_REQUEST, receiveFeedbackResponseSaga)
  ]);
}
