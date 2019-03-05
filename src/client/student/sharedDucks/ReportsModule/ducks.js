import { createAction, createReducer } from "redux-starter-kit";
import { schema } from "normalizr";
import { createSelector } from "reselect";

// reports schema
export const reportSchema = new schema.Entity("reports", {}, { idAttribute: "_id" });

// types
export const SET_REPORTS = "[studentReport] fetch reports";
export const UPDATE_TEST_ACTIVITY = "[studentReport] update reports";
export const SET_CURRENT_REPORT = "[studentReport] set current testActivityId";
export const SET_FILTER = "[studentReport] set filter";

// actions
export const setReportsAction = createAction(SET_REPORTS);
export const updateTestActivityAction = createAction(UPDATE_TEST_ACTIVITY);
export const setCurrentReportAction = createAction(SET_CURRENT_REPORT);
export const setFilterAction = createAction(SET_FILTER);
// initialState
const initialState = {
  byId: {},
  allIds: [],
  current: "",
  filter: "all"
};

// reducers

// load reports to store.
const setReports = (state, { payload }) => {
  state.byId = payload.reportsObj;
  state.allIds = payload.allReports;
};

const updateReports = (state, { payload }) => {
  for (let id of Object.keys(payload)) {
    state.byId[id] = payload[id];
  }
};

// load current report to store
const setCurrentReport = (state, { payload }) => {
  state.current = payload.testActivityId;
};

// filtering reports
const setFilter = (state, { payload }) => {
  state.filter = payload;
};

export default createReducer(initialState, {
  [SET_REPORTS]: setReports,
  [SET_CURRENT_REPORT]: setCurrentReport,
  [UPDATE_TEST_ACTIVITY]: updateReports,
  [SET_FILTER]: setFilter
});

//selector
const stateSelector = state => state.studentReport;

const getAllReportsSelector = createSelector(
  stateSelector,
  state => state.byId
);

export const getReportByIdSelector = id =>
  createSelector(
    getAllReportsSelector,
    reportsobj => reportsobj[id]
  );
