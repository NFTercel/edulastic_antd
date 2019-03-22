import { takeEvery, takeLatest, call, put, all } from "redux-saga/effects";
import { createSelector } from "reselect";
import { reportsApi } from "@edulastic/api";
import { message } from "antd";
import { createAction, createReducer } from "redux-starter-kit";

const GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST = "[reports] get reports assessment summary request";
const GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST_SUCCESS = "[reports] get reports assessment summary success";
const GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST_ERROR = "[reports] get reports assessment summary error";

// -----|-----|-----|-----| ACTIONS BEGIN |-----|-----|-----|----- //

export const getAssessmentSummaryRequestAction = createAction(GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST);

// -----|-----|-----|-----| ACTIONS ENDED |-----|-----|-----|----- //

// =====|=====|=====|=====| =============== |=====|=====|=====|===== //

// -----|-----|-----|-----| SELECTORS BEGIN |-----|-----|-----|----- //

export const stateSelector = state => state.reportAssessmentSummaryReducer;

export const getReportsAssessmentSummary = createSelector(
  stateSelector,
  state => state.assessmentSummary
);

// -----|-----|-----|-----| SELECTORS ENDED |-----|-----|-----|----- //

// =====|=====|=====|=====| =============== |=====|=====|=====|===== //

// -----|-----|-----|-----| REDUCER BEGIN |-----|-----|-----|----- //

const initialState = {
  assessmentSummary: {}
};

export const reportAssessmentSummaryReducer = createReducer(initialState, {
  [GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST]: (state, { payload }) => {
    state.loading = true;
  },
  [GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST_SUCCESS]: (state, { payload }) => {
    state.loading = false;
    state.assessmentSummary = payload.assessmentSummary;
  },
  [GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST_ERROR]: (state, { payload }) => {
    state.loading = false;
    state.error = payload.error;
  }
});

// -----|-----|-----|-----| REDUCER BEGIN |-----|-----|-----|----- //

// =====|=====|=====|=====| =============== |=====|=====|=====|===== //

// -----|-----|-----|-----| SAGAS BEGIN |-----|-----|-----|----- //

function* getReportsAssessmentSummaryRequest({ payload }) {
  try {
    const assessmentSummary = yield call(reportsApi.fetchAssessmentSummaryReport, payload);
    yield put({
      type: GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST_SUCCESS,
      payload: { assessmentSummary }
    });
  } catch (error) {
    console.log("err", error.stack);
    let msg = "Failed to fetch assessment Summary Please try again...";
    yield call(message.error, msg);
    yield put({
      type: GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST_ERROR,
      payload: { error: msg }
    });
  }
}

export function* reportAssessmentSummarySaga() {
  yield all([yield takeEvery(GET_REPORTS_ASSESSMENT_SUMMARY_REQUEST, getReportsAssessmentSummaryRequest)]);
}

// -----|-----|-----|-----| SAGAS ENDED |-----|-----|-----|----- //
