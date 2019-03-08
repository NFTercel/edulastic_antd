import { createAction, createReducer } from "redux-starter-kit";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import { groupApi, enrollmentApi } from "@edulastic/api";

// actions
export const FETCH_GROUPS = "[author groups] fetch owned groups";
export const FETCH_GROUP_MEMBERS = "[author groups] fetch students of the group";
export const SET_GROUPS = "[author groups] set groups";
export const SET_GROUP_MEMBERS = "[author groups] add students to groups";
export const SET_MULTIPLE_GROUP_MEMBERS = "[author groups] set multiple group members";
export const SET_LOADED_GROUPS = "[author groups] set loaded groups";

// actions
export const fetchGroupsAction = createAction(FETCH_GROUPS);
export const fetchGroupMembersAction = createAction(FETCH_GROUP_MEMBERS);
export const setGroupsAction = createAction(SET_GROUPS);
export const setGroupMemebersAction = createAction(SET_GROUP_MEMBERS);
export const fetchMultipleGroupMembersAction = createAction(SET_MULTIPLE_GROUP_MEMBERS);
export const setLoadedGroupsAction = createAction(SET_LOADED_GROUPS);

// initial state
const initialState = {
  isLoading: false,
  groups: [],
  students: [],
  loadedGroups: []
};

// set groups
const setGroups = (state, { payload }) => {
  state.groups = payload;
  state.isLoading = false;
};

// set loading to true
const setLoading = state => {
  state.isLoading = true;
};

// populate groups
const populateGroups = (state, { payload }) => {
  state.students = [...state.students, ...payload];
};

const setLoadedGroups = (state, { payload }) => {
  state.loadedGroups = payload;
};

// default reducer
export default createReducer(initialState, {
  [FETCH_GROUPS]: setLoading,
  [SET_GROUPS]: setGroups,
  [SET_GROUP_MEMBERS]: populateGroups,
  [SET_LOADED_GROUPS]: setLoadedGroups
});

// selectors
const module = "authorGroups";
export const getGroupsSelector = state => (state[module].isLoading ? [] : state[module].groups);

export const getStudentsSelector = state => (state[module].isLoading ? [] : state[module].students);

export const getLoadedGroupsSelector = state => state[module].loadedGroups;

// fetch groups of that user
function* fetchGroups() {
  try {
    const data = yield call(groupApi.fetchMyGroups);
    yield put(setGroupsAction(data));
  } catch (err) {
    console.log(err);
  }
}

// fetch members of a particular group
function* fetchMembers({ payload }) {
  try {
    const { classId = [] } = payload;
    const loadedGroups = yield select(getLoadedGroupsSelector);
    if (loadedGroups.includes(classId)) {
      return;
    }
    let students = yield call(enrollmentApi.fetch, classId);
    students = students.map(student => {
      student.groupId = classId;
      return student;
    });
    setLoadedGroupsAction([...loadedGroups, classId]);
    yield put(setGroupMemebersAction(students));
  } catch (err) {
    console.log(err);
  }
}

function* fetchMultipleGroupMembers({ payload }) {
  try {
    const groupIds = payload || [];
    const loadedGroups = yield select(getLoadedGroupsSelector);
    let newGroups = groupIds.filter(id => !loadedGroups.includes(id));
    if (!newGroups.length) {
      return;
    }
    let allStudents = yield call(enrollmentApi.fetchByIds, groupIds);
    yield put(setGroupMemebersAction(allStudents));
    setLoadedGroupsAction([...groupIds, ...newGroups]);
  } catch (err) {
    console.log(err);
  }
}

export function* authorGroupsWatcherSaga() {
  yield takeLatest(FETCH_GROUPS, fetchGroups);
  yield takeLatest(FETCH_GROUP_MEMBERS, fetchMembers);
  yield takeLatest(SET_MULTIPLE_GROUP_MEMBERS, fetchMultipleGroupMembers);
}
