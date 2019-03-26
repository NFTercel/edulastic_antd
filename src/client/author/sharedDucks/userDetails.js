import { createSelector } from "reselect";
import { createAction, createReducer } from "redux-starter-kit";
import { userApi } from "@edulastic/api";
import { call, put, all, takeEvery } from "redux-saga/effects";
import { message } from "antd";

// constants

export const FETCH_USERS = "[test] fetch all users";
export const UPDATE_USERS_LIST = "[test] update users list";
export const LOADING_USER_LIST = "[test] loading users list";

// actions

export const fetchUsersListAction = createAction(FETCH_USERS);

export const updateUsersListAction = createAction(UPDATE_USERS_LIST);

export const getFetchingAction = createAction(LOADING_USER_LIST);

// reducer

const initialState = {
  usersList: [],
  fetching: false
};

const setUserListReducer = (state, { payload }) => ({
  ...state,
  usersList: payload.data,
  fetching: false
});

const setLoadingStateReducer = (state, { payload }) => ({
  ...state,
  fetching: payload
});

export default createReducer(initialState, {
  [UPDATE_USERS_LIST]: setUserListReducer,
  [LOADING_USER_LIST]: setLoadingStateReducer
});

function* fetchAllUsersSaga({ payload }) {
  try {
    yield put(getFetchingAction(true));
    const userList = yield call(userApi.fetchUsers, payload);
    yield put(updateUsersListAction(userList));
  } catch (e) {
    const errorMessage = "Search failed";
    yield call(message.error, errorMessage);
  }
}

export function* watcherSaga() {
  yield all([yield takeEvery(FETCH_USERS, fetchAllUsersSaga)]);
}
// selectors

export const stateSelector = state => state.authorUserList;

export const getUsersListSelector = createSelector(
  stateSelector,
  state => state.usersList
);

export const getFetchingSelector = createSelector(
  stateSelector,
  state => state.fetching
);
