import { createAction, createReducer } from "redux-starter-kit";
import { schema } from "normalizr";

import { takeLatest, put, call } from "redux-saga/effects";
import { questionsApi } from "@edulastic/api";

// assignments schema
export const assignmentSchema = new schema.Entity("assignments", {}, { idAttribute: "_id" });

// types
export const SET_LOADING = "[studentAssignment] fetch assignments";
export const SET_ASSIGNMENTS = "[studentAssignment] set assignments";
export const SET_ACTIVE_ASSIGNMENT = "[studentAssignments] set active assignment";
export const SET_FILTER = "[studentAssignment] set filter";

export const CHECK_ANSWER = "check answer";
export const ADD_EVALUATION = "add evaluation";

// action dispatchers
export const setAssignmentsLoadingAction = createAction(SET_LOADING);
export const setAssignmentsAction = createAction(SET_ASSIGNMENTS);
export const setActiveAssignmentAction = createAction(SET_ACTIVE_ASSIGNMENT);
export const setFilterAction = createAction(SET_FILTER);

// initial State
const initialState = {
  isLoading: false,
  byId: [],
  allIds: [],
  error: {},
  isStale: false,
  filter: "all"
};

// reducers

// fetching assignments
const setLoading = state => {
  state.isLoading = true;
};

// load assignments to store
const setAssignments = (state, { payload }) => {
  state.byId = payload.assignmentObj;
  state.allIds = payload.allAssignments;
  state.isLoading = false;
};

// filtering assignments
const setFilter = (state, { payload }) => {
  state.filter = payload;
};

export default createReducer(initialState, {
  [SET_LOADING]: setLoading,
  [SET_ASSIGNMENTS]: setAssignments,
  [SET_ACTIVE_ASSIGNMENT]: (state, { payload }) => {
    state.current = payload;
  },
  [SET_FILTER]: setFilter
});

function* addEvaluation(action) {
  try {
    const { answer, qid } = action.payload;
    const response = yield call(questionsApi.evaluateAnswer, qid, answer);
    yield put({
      type: ADD_EVALUATION,
      payload: {
        answer: response.answer,
        qid
      }
    });
  } catch (e) {
    console.log("error: ", e);
  }
}

export function* addEvaluationWatcherSaga() {
  yield takeLatest(CHECK_ANSWER, addEvaluation);
}
