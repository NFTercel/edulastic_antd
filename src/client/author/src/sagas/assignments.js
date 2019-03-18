import { takeEvery, takeLatest, call, put, all } from "redux-saga/effects";
import { assignmentApi } from "@edulastic/api";
import { message } from "antd";
import { omit } from "lodash";

import {
  RECEIVE_ASSIGNMENTS_REQUEST,
  RECEIVE_ASSIGNMENTS_SUCCESS,
  RECEIVE_ASSIGNMENTS_ERROR,
  FETCH_CURRENT_EDITING_ASSIGNMENT,
  UPDATE_CURRENT_EDITING_ASSIGNMENT,
  UPDATE_RELEASE_SCORE_SETTINGS,
  TOGGLE_RELEASE_GRADE_SETTINGS
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

function* receiveAssignmentByIdSaga({ payload }) {
  try {
    const data = yield call(assignmentApi.fetchAssignments, payload.testId);
    const getCurrent = data.filter(item => item._id === payload.assignmentId);
    yield put({
      type: UPDATE_CURRENT_EDITING_ASSIGNMENT,
      payload: getCurrent[0]
    });
    yield put({
      type: TOGGLE_RELEASE_GRADE_SETTINGS,
      payload: true
    });
  } catch (e) {
    yield put({
      type: UPDATE_CURRENT_EDITING_ASSIGNMENT,
      payload: {}
    });
    console.error(e);
  }
}

function* updateAssignmetSaga({ payload }) {
  try {
    const data = omit(
      {
        ...payload,
        updateTestActivities: true
      },
      ["_id", "__v", "createdAt", "updatedAt", "students", "scoreReleasedClasses", "termId", "reportKey"]
    );
    yield call(assignmentApi.update, payload._id, data);
    yield put({
      type: TOGGLE_RELEASE_GRADE_SETTINGS,
      payload: false
    });
    const successMessage = "Successfully updated release score settings";
    yield call(message.success, successMessage);
  } catch (e) {
    const errorMessage = "Update release score settings is failing";
    yield put({
      type: TOGGLE_RELEASE_GRADE_SETTINGS,
      payload: false
    });
    yield call(message.error, errorMessage);
    console.error(e);
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_ASSIGNMENTS_REQUEST, receiveAssignmentsSaga),
    yield takeEvery(FETCH_CURRENT_EDITING_ASSIGNMENT, receiveAssignmentByIdSaga),
    yield takeLatest(UPDATE_RELEASE_SCORE_SETTINGS, updateAssignmetSaga)
  ]);
}
