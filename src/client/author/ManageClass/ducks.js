import { createAction, createReducer } from "redux-starter-kit";
import { all, takeEvery, call, put } from "redux-saga/effects";
import { message } from "antd";
import { googleApi } from "@edulastic/api";

import { fetchGroupsAction } from "../sharedDucks/groups";

// action types
export const FETCH_CLASS_LIST = "[manageClass] fetch google class";
export const SET_GOOGLE_COURSE_LIST = "[manageClass] set google classes";
export const SET_MODAL = "[manageClass] set modal";
export const SYNC_CLASS = "[manageClass] sync selected google classes";

// action creators
export const fetchClassListAction = createAction(FETCH_CLASS_LIST);
export const setGoogleCourseListAction = createAction(SET_GOOGLE_COURSE_LIST);
export const setModalAction = createAction(SET_MODAL);
export const syncClassAction = createAction(SYNC_CLASS);

// initial State
const initialState = {
  googleCourseList: [],
  showModal: false
};

// reducers
const setGoogleCourseList = (state, { payload }) => {
  state.googleCourseList = payload;
  state.showModal = true;
};

// toggle modal
const setModal = (state, { payload }) => {
  state.showModal = payload;
};
// main reducer
export default createReducer(initialState, {
  [SET_GOOGLE_COURSE_LIST]: setGoogleCourseList,
  [SET_MODAL]: setModal
});

// sagas boi
function* fetchClassList({ payload }) {
  try {
    const { code } = payload;
    const result = yield call(googleApi.getCourseList, { code });
    yield put(setGoogleCourseListAction(result.courseDetails));
  } catch (e) {
    const errorMessage = "fetching classlist failed";
    yield call(message.error, errorMessage);
    console.log(e);
  }
}

// sync google class
function* syncClass({ payload }) {
  try {
    yield call(googleApi.syncClass, { codes: payload });
    yield put(setModalAction(false));
    yield put(fetchGroupsAction());
  } catch (e) {
    yield call(message.error, "class sync failed");
    console.log(e);
  }
}
// watcher saga
export function* watcherSaga() {
  yield all([yield takeEvery(FETCH_CLASS_LIST, fetchClassList), yield takeEvery(SYNC_CLASS, syncClass)]);
}
