import { createAction, createReducer, createSelector } from "redux-starter-kit";
import { pick, last } from "lodash";
import { takeLatest, call, put, select, all } from "redux-saga/effects";
import { push } from "react-router-redux";
import { authApi, userApi } from "@edulastic/api";
import { fetchAssignmentsAction } from "../Assignments/ducks";
import { fetchSkillReportByClassID as fetchSkillReportAction } from "../SkillReport/ducks";

import { message } from "antd";
import { roleuser } from "@edulastic/constants";

//types
export const LOGIN = "[auth] login";
export const SET_USER = "[auth] set user";
export const SIGNUP = "[auth] signup";
export const FETCH_USER = "[auth] fetch user";
export const LOGOUT = "[auth] logout";
export const CHANGE_CLASS = "[student] change class";
export const LOAD_SKILL_REPORT_BY_CLASSID = "[reports] load skill report by class id";

//actions
export const loginAction = createAction(LOGIN);
export const setUserAction = createAction(SET_USER);
export const signupAction = createAction(SIGNUP);
export const fetchUserAction = createAction(FETCH_USER);
export const logoutAction = createAction(LOGOUT);
export const changeClassAction = createAction(CHANGE_CLASS);

function* login({ payload }) {
  try {
    const result = yield call(authApi.login, payload);
    localStorage.setItem("access_token", result.token);
    const user = pick(result, ["_id", "firstName", "lastName", "email", "role", "orgData"]);
    yield put(setUserAction(user));
    const redirectUrl = localStorage.getItem("loginRedirectUrl");
    if (redirectUrl) {
      localStorage.removeItem("loginRedirectUrl");
      yield put(push(redirectUrl));
    } else if (user.role === roleuser.STUDENT) yield put(push("/home/assignments"));
    else if (user.role === roleuser.ADMIN) yield put(push("/author/items"));
    else if (user.role === roleuser.TEACHER) yield put(push("/author/items"));
  } catch (err) {
    console.error(err);
    const errorMessage = "Invalid username or password";
    yield call(message.error, errorMessage);
  }
}

function* signup({ payload }) {
  try {
    const { name, email, password, role } = payload;
    const nameList = name.split(" ");
    let firstName;
    let lastName;
    if (nameList.length > 1) {
      lastName = last(nameList);
      firstName = nameList.slice(0, -1).join(" ");
    } else {
      firstName = name;
    }
    const obj = {
      password,
      email,
      firstName,
      lastName,
      role
    };
    yield call(authApi.signup, obj);
    yield put(push("/Login"));
  } catch (err) {
    console.error(err);
    const errorMessage = "Email already exist";
    yield call(message.error, errorMessage);
  }
}

export function* fetchUser() {
  try {
    // TODO: handle the case of invalid token
    if (!localStorage.access_token) {
      return;
    }
    const user = yield call(userApi.getUser);
    yield put({
      type: SET_USER,
      payload: user
    });
  } catch (e) {
    console.log(e);
    yield call(message.error, "failed loading user data");
  }
}

function* logout() {
  try {
    delete localStorage.access_token;
    yield put(push("/Login"));
  } catch (e) {
    console.log(e);
  }
}

function* changeClass({ payload }) {
  try {
    const url = yield select(routeSelector);
    if (url.includes("/home/skill-report")) {
      yield put(fetchSkillReportAction(payload));
    } else {
      yield put(fetchAssignmentsAction(payload));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watcherSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(SIGNUP, signup);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(FETCH_USER, fetchUser);
  yield takeLatest(CHANGE_CLASS, changeClass);
}

const initialState = {
  isAuthenticated: false
};

const setUser = (state, { payload }) => {
  state.user = payload;
  state.isAuthenticated = true;
};

export default createReducer(initialState, {
  [SET_USER]: setUser,
  [CHANGE_CLASS]: (state, { payload }) => {
    if (!(state.user && state.user.orgData)) {
      return state;
    }
    state.user.orgData.defaultClass = payload;
  }
});

export const getClasses = createSelector(
  ["user.user.orgData.classList"],
  classes => classes
);

export const getCurrentGroup = createSelector(
  ["user.user.orgData.defaultClass"],
  r => r
);

export const getCurrentSchool = createSelector(
  ["user.user.orgData.defaultSchool"],
  r => r
);

const routeSelector = state => state.router.location.pathname;
