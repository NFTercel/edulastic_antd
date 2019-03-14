import { createAction, createReducer } from "redux-starter-kit";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import { values, groupBy, last } from "lodash";
import { createSelector } from "reselect";
import { normalize } from "normalizr";
import { push } from "react-router-redux";
import { test } from "@edulastic/constants";
import { assignmentApi, reportsApi, testActivityApi } from "@edulastic/api";
import { getCurrentGroup, getCurrentSchool } from "../Login/ducks";

// external actions
import {
  assignmentSchema,
  setAssignmentsAction,
  setAssignmentsLoadingAction,
  setActiveAssignmentAction
} from "../sharedDucks/AssignmentModule/ducks";
import { setReportsAction, reportSchema } from "../sharedDucks/ReportsModule/ducks";

// constants
const { ASSESSMENT } = test.type;
export const FILTERS = {
  ALL: "all",
  NOT_STARTED: "notStarted",
  IN_PROGRESS: "inProgress"
};

// types
export const FETCH_ASSIGNMENTS_DATA = "[studentAssignments] fetch assignments";
export const START_ASSIGNMENT = "[studentAssignments] start assignments";
export const SET_TEST_ACTIVITY_ID = "[test] add test activity id";
export const SET_RESUME_STATUS = "[test] set resume status";
export const RESUME_ASSIGNMENT = "[studentAssignments] resume assignments";

// actions
export const fetchAssignmentsAction = createAction(FETCH_ASSIGNMENTS_DATA);
export const startAssignmentAction = createAction(START_ASSIGNMENT);
export const setTestActivityAction = createAction(SET_TEST_ACTIVITY_ID);
export const setResumeAssignment = createAction(SET_RESUME_STATUS);
export const resumeAssignmentAction = createAction(RESUME_ASSIGNMENT);

// sagas
// fetch and load assignments and reports for the student
function* fetchAssignments({ payload }) {
  try {
    yield put(setAssignmentsLoadingAction());
    const groupId = yield select(getCurrentGroup);
    const [assignments, reports] = yield all([
      call(assignmentApi.fetchAssigned, payload),
      call(reportsApi.fetchReports, groupId)
    ]);
    // normalize reports
    const {
      result: allReports,
      entities: { reports: reportsObj }
    } = normalize(reports, [reportSchema]);

    yield put(setReportsAction({ allReports, reportsObj }));
    // normalize assignments
    const {
      result: allAssignments,
      entities: { assignments: assignmentObj }
    } = normalize(assignments, [assignmentSchema]);

    yield put(setAssignmentsAction({ allAssignments, assignmentObj }));
  } catch (e) {
    console.log(e);
  }
}

/*
 * start assingment
 */
function* startAssignment({ payload }) {
  try {
    const { assignmentId, testId, testType } = payload;
    if (!assignmentId || !testId) {
      throw new Error("insufficient data");
    }
    yield put(setActiveAssignmentAction(assignmentId));
    const groupId = yield select(getCurrentGroup);
    const institutionId = yield select(getCurrentSchool);
    const groupType = "class";
    const { _id: testActivityId } = yield testActivityApi.create({
      assignmentId,
      groupId,
      institutionId,
      groupType
    });
    // set Activity id
    yield put(push(`/student/${testType}/${testId}/uta/${testActivityId}/qid/0`));

    // TODO:load previous responses if resume!!
  } catch (e) {
    console.log(e);
  }
}

/*
 * resume assignment
 */
function* resumeAssignment({ payload }) {
  try {
    const { assignmentId, testActivityId, testId, testType } = payload;
    if (!assignmentId || !testId || !testActivityId) {
      throw new Error("insufficient data");
    }
    yield put(setActiveAssignmentAction(assignmentId));
    yield put(setResumeAssignment(true));
    yield put(push(`/student/${testType}/${testId}/uta/${testActivityId}/qid/0`));
  } catch (e) {
    console.log(e);
  }
}

// set actions watcherss
export function* watcherSaga() {
  yield all([
    yield takeLatest(FETCH_ASSIGNMENTS_DATA, fetchAssignments),
    yield takeLatest(START_ASSIGNMENT, startAssignment),
    yield takeLatest(RESUME_ASSIGNMENT, resumeAssignment)
  ]);
}

// selectors
const assignmentsSelector = state => state.studentAssignment.byId;
const reportsSelector = state => state.studentReport.byId;

export const filterSelector = state => state.studentAssignment.filter;

const isLiveAssignment = assignment => {
  // max attempts should be less than total attempts made
  // and end Dtae should be greateer than current one :)
  let maxAttempts = (assignment.test && assignment.test.maxAttempts) || 5;
  let attempts = (assignment.reports && assignment.reports.length) || 0;
  let lastAttempt = last(assignment.reports) || [];

  const isLive = (maxAttempts > attempts || lastAttempt.status == "0") && new Date(assignment.endDate) > new Date();
  return isLive;
};

const statusFilter = filterType => assignment => {
  let attempts = (assignment.reports && assignment.reports.length) || 0;
  switch (filterType) {
    case FILTERS.NOT_STARTED:
      return attempts === 0;
    case FILTERS.IN_PROGRESS:
      return attempts > 0;
    default:
      return true;
  }
};

export const getAssignmentsSelector = createSelector(
  assignmentsSelector,
  reportsSelector,
  filterSelector,
  (assignmentsObj, reportsObj, filter) => {
    // group reports by assignmentsID
    let groupedReports = groupBy(values(reportsObj), "assignmentId");
    let assignments = values(assignmentsObj)
      .sort((a, b) => b.createdAt - a.createdAt)
      .map(assignment => ({
        ...assignment,
        reports: groupedReports[assignment._id] || []
      }))
      .filter(isLiveAssignment)
      .filter(statusFilter(filter));
    return assignments;
  }
);
