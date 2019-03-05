import { takeEvery, call, put, all } from "redux-saga/effects";
import { assignmentApi } from "@edulastic/api";
import { message } from "antd";

import {
  RECEIVE_ASSIGNMENTS_REQUEST,
  RECEIVE_ASSIGNMENTS_SUCCESS,
  RECEIVE_ASSIGNMENTS_ERROR
} from "../constants/actions";

function* receiveAssignmentsSaga() {
  try {
    const entities = yield call(assignmentApi.fetchAssigned);
    const sort_entities = {};
    entities.forEach(entitiy => {
      if (sort_entities[entitiy._id] == undefined) {
        sort_entities[entitiy._id] = [];
      }
      sort_entities[`${entitiy._id}`].push(entitiy);
    });

    yield put({
      type: RECEIVE_ASSIGNMENTS_SUCCESS,
      payload: { entities: Object.values(sort_entities) }
    });
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_ASSIGNMENTS_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export default function* watcherSaga() {
  yield takeEvery(RECEIVE_ASSIGNMENTS_REQUEST, receiveAssignmentsSaga);
}
