import { createAction, createSelector as createSelectorator } from "redux-starter-kit";
import { takeEvery, put, call, all, select } from "redux-saga/effects";
import { values, groupBy, last } from "lodash";
import { createSelector } from "reselect";
import { normalize } from "normalizr";
import { assignmentApi, reportsApi } from "@edulastic/api";

// external actions
import {
  assignmentSchema,
  setAssignmentsAction,
  setAssignmentsLoadingAction
} from "../sharedDucks/AssignmentModule/ducks";
import { setReportsAction, reportSchema } from "../sharedDucks/ReportsModule/ducks";

// constants
export const getCurrentGroup = createSelectorator(["user.user.orgData.defaultClass"], r => r);
export const FILTERS = {
  ALL: "all",
  SUBMITTED: "submitted",
  GRADED: "graded",
  MISSED: "missed"
};

// types
export const FETCH_ASSIGNMENTS_DATA = "[studentAssignments] fetch assignments";

// actions
export const fetchAssignmentsAction = createAction(FETCH_ASSIGNMENTS_DATA);

// sagas
// fetch and load assignments and reports for the student
function* fetchAssignments({ payload }) {
  try {
    const groupId = yield select(getCurrentGroup);
    console.log("groupIdaksdfjadf a", groupId);
    yield put(setAssignmentsLoadingAction());
    const [assignments, reports] = yield all([
      call(assignmentApi.fetchAssigned, payload),
      call(reportsApi.fetchReports, groupId)
    ]);

    // normalize assignments
    const {
      result: allAssignments,
      entities: { assignments: assignmentObj }
    } = normalize(assignments, [assignmentSchema]);

    yield put(setAssignmentsAction({ allAssignments, assignmentObj }));

    // normalize reportsx``
    const {
      result: allReports,
      entities: { reports: reportsObj }
    } = normalize(reports, [reportSchema]);

    yield put(setReportsAction({ allReports, reportsObj }));
  } catch (e) {
    console.log(e);
  }
}

// set actions watcherss
export function* watcherSaga() {
  yield all([yield takeEvery(FETCH_ASSIGNMENTS_DATA, fetchAssignments)]);
}

// selectors

const assignmentsSelector = state => state.studentAssignment.byId;
const reportsSelector = state => state.studentReport.byId;
export const filterSelector = state => state.studentReport.filter;

const isReport = assignment => {
  // either user has ran out of attempts
  // or assigments is past dueDate
  let maxAttempts = (assignment && assignment.maxAttempts) || 1;
  let attempts = (assignment.reports && assignment.reports.length) || 0;
  const isExpired = maxAttempts <= attempts || new Date(assignment.endDate) < new Date();
  return isExpired;
};

const statusFilter = filterType => assignment => {
  const lastAttempt = last(assignment.reports) || {};
  const isSubmitted = (assignment.reports.length === 1 && lastAttempt.status != 0) || assignment.reports.length > 1;
  const isGraded = false; // need to impliment graded status from API
  switch (filterType) {
    case FILTERS.MISSED:
      return !isSubmitted;
    case FILTERS.SUBMITTED:
      return isSubmitted;
    case FILTERS.GRADED:
      return isGraded;
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
    const groupedReports = groupBy(values(reportsObj), "assignmentId");
    const assignments = values(assignmentsObj)
      .sort((a, b) => a.createdAt > b.createdAt)
      .map(assignment => ({
        ...assignment,
        reports: groupedReports[assignment._id] || []
      }))
      .filter(isReport)
      .filter(statusFilter(filter));
    return assignments;
  }
);
