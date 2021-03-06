import { createAction, createSelector as createSelectorator } from "redux-starter-kit";
import { maxBy as _maxBy } from "lodash";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import { values, groupBy, last } from "lodash";
import { createSelector } from "reselect";
import { normalize } from "normalizr";
import { push } from "react-router-redux";
import { assignmentApi, reportsApi, testActivityApi } from "@edulastic/api";
import { getCurrentSchool, fetchUserAction, fetchUser } from "../Login/ducks";

import { getCurrentGroup } from "../Reports/ducks";
import { partial } from "lodash";

// external actions
import {
  assignmentSchema,
  setAssignmentsAction,
  setAssignmentsLoadingAction,
  setActiveAssignmentAction
} from "../sharedDucks/AssignmentModule/ducks";
import { setReportsAction, reportSchema } from "../sharedDucks/ReportsModule/ducks";

// constants
export const FILTERS = {
  ALL: "all",
  NOT_STARTED: "notStarted",
  IN_PROGRESS: "inProgress"
};

export const getCurrentUserId = createSelectorator(["user.user._id"], r => r);

// types
export const FETCH_ASSIGNMENTS_DATA = "[studentAssignments] fetch assignments";
export const START_ASSIGNMENT = "[studentAssignments] start assignments";
export const SET_TEST_ACTIVITY_ID = "[test] add test activity id";
export const SET_RESUME_STATUS = "[test] set resume status";
export const RESUME_ASSIGNMENT = "[studentAssignments] resume assignments";
export const BOOTSTRAP_ASSESSMENT = "[assessment] bootstrap";
export const LAUNCH_ASSIGNMENT_FROM_LINK = "[studentAssignemnts] launch assignment from link";
// actions
export const fetchAssignmentsAction = createAction(FETCH_ASSIGNMENTS_DATA);
export const startAssignmentAction = createAction(START_ASSIGNMENT);
export const setTestActivityAction = createAction(SET_TEST_ACTIVITY_ID);
export const setResumeAssignment = createAction(SET_RESUME_STATUS);
export const resumeAssignmentAction = createAction(RESUME_ASSIGNMENT);
export const bootstrapAssessmentAction = createAction(BOOTSTRAP_ASSESSMENT);
export const launchAssignmentFromLinkAction = createAction(LAUNCH_ASSIGNMENT_FROM_LINK);

/**
 * get current redirect status of the assignment
 * @param {Object} assignment
 * @param {string} groupId
 * @param {string} userId
 */
export const getRedirect = (assignment, groupId, userId) => {
  /**
   * @type {[]}
   */
  const classes = assignment.class || [];
  const redirects = classes.filter(
    x =>
      x.redirect && ((x.specificStudents && x.students.includes(userId)) || (!x.specificStudents && x._id === groupId))
  );
  if (redirects.length === 0) {
    return false;
  }
  const attempts = redirects.length;

  const dueDate = Math.max.apply(Math, redirects.map(x => x.endDate));

  return { attempts, dueDate };
};

const transformAssignmentForRedirect = (groupId, userId, assignment) => {
  const redirect = getRedirect(assignment, groupId, userId);
  if (!redirect) {
    return assignment;
  }

  let maxAttempts = (assignment && assignment.maxAttempts) || 1;
  let { endDate } = assignment;
  endDate = redirect.dueDate;
  maxAttempts += redirect.attempts;
  return { ...assignment, endDate, maxAttempts };
};

// sagas
// fetch and load assignments and reports for the student
function* fetchAssignments({ payload }) {
  try {
    yield put(setAssignmentsLoadingAction());
    const groupId = yield select(getCurrentGroup);
    const userId = yield select(getCurrentUserId);
    const [assignments, reports] = yield all([
      call(assignmentApi.fetchAssigned, payload),
      call(reportsApi.fetchReports, groupId)
    ]);
    //transform to handle redirect
    const transformFn = partial(transformAssignmentForRedirect, groupId, userId);
    const assignmentsProcessed = assignments.map(transformFn);

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
    } = normalize(assignmentsProcessed, [assignmentSchema]);

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
      groupType,
      testId
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

/**
 * for loading deeplinking assessment created for SEB. But can be used for others
 * @param {{payload: {assignmentId: string, testActivityId?: string, testId:string}}} param
 */
function* bootstrapAssesment({ payload }) {
  try {
    const { testType, assignmentId, testActivityId, testId } = payload;
    yield fetchUser();
    if (testActivityId) {
      yield put(resumeAssignmentAction({ testType, assignmentId, testActivityId, testId }));
    } else {
      yield put(startAssignmentAction({ testType, assignmentId, testId }));
    }
  } catch (e) {
    console.log(e);
  }
}

// launch assignment
function* launchAssignment({ payload }) {
  try {
    const { assignmentId, groupId } = payload;
    const [assignment, testActivities] = yield Promise.all([
      assignmentApi.getById(assignmentId),
      assignmentApi.fetchTestActivities(assignmentId, groupId)
    ]);
    const lastActivity = _maxBy(testActivities, "createdAt");
    const { testId, testType = "assessment" } = assignment;

    if (lastActivity) {
      yield put(resumeAssignmentAction({ testId, testType, assignmentId, testActivityId: lastActivity._id }));
    } else {
      yield put(startAssignmentAction({ testId, assignmentId, testType }));
    }
  } catch (e) {
    console.log(e);
  }
}

// set actions watcherss
export function* watcherSaga() {
  yield all([
    yield takeLatest(FETCH_ASSIGNMENTS_DATA, fetchAssignments),
    yield takeLatest(START_ASSIGNMENT, startAssignment),
    yield takeLatest(RESUME_ASSIGNMENT, resumeAssignment),
    yield takeLatest(BOOTSTRAP_ASSESSMENT, bootstrapAssesment),
    yield takeLatest(LAUNCH_ASSIGNMENT_FROM_LINK, launchAssignment)
  ]);
}

// selectors
const assignmentsSelector = state => state.studentAssignment.byId;
const reportsSelector = state => state.studentReport.byId;

export const filterSelector = state => state.studentAssignment.filter;

const isLiveAssignment = assignment => {
  // max attempts should be less than total attempts made
  // and end Dtae should be greateer than current one :)
  let maxAttempts = (assignment && assignment.maxAttempts) || 1;
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
