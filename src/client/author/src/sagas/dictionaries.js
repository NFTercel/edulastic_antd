import { takeLatest, call, put, all } from "redux-saga/effects";
import { dictionariesApi } from "@edulastic/api";
import { message } from "antd";
import {
  RECEIVE_DICT_CURRICULUMS_REQUEST,
  RECEIVE_DICT_CURRICULUMS_SUCCESS,
  RECEIVE_DICT_CURRICULUMS_ERROR,
  RECEIVE_DICT_STANDARDS_REQUEST,
  RECEIVE_DICT_STANDARDS_SUCCESS,
  RECEIVE_DICT_STANDARDS_ERROR
} from "../constants/actions";

function* receiveCurriculumsSaga() {
  try {
    const items = yield call(dictionariesApi.receiveCurriculums);

    yield put({
      type: RECEIVE_DICT_CURRICULUMS_SUCCESS,
      payload: { items }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Receive curriculums is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_DICT_CURRICULUMS_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* receiveStandardsSaga({ payload }) {
  try {
    const items = yield call(dictionariesApi.receiveStandards, payload);

    yield put({
      type: RECEIVE_DICT_STANDARDS_SUCCESS,
      payload: { items }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Receive standards is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_DICT_STANDARDS_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeLatest(RECEIVE_DICT_CURRICULUMS_REQUEST, receiveCurriculumsSaga),
    yield takeLatest(RECEIVE_DICT_STANDARDS_REQUEST, receiveStandardsSaga)
  ]);
}
