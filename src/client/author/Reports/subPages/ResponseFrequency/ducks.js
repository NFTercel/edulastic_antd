import { takeEvery, call, put, all } from "redux-saga/effects";
import { createSelector } from "reselect";
import { reportsApi } from "@edulastic/api";
import { message } from "antd";
import { createAction, createReducer } from "redux-starter-kit";

const GET_REPORTS_RESPONSE_FREQUENCY_REQUEST = "[reports] get reports response frequency request";
const GET_REPORTS_RESPONSE_FREQUENCY_REQUEST_SUCCESS = "[reports] get reports response frequency request success";
const GET_REPORTS_RESPONSE_FREQUENCY_REQUEST_ERROR = "[reports] get reports response frequency request error";

// -----|-----|-----|-----| ACTIONS BEGIN |-----|-----|-----|----- //

export const getResponseFrequencyRequestAction = createAction(GET_REPORTS_RESPONSE_FREQUENCY_REQUEST);

// -----|-----|-----|-----| ACTIONS ENDED |-----|-----|-----|----- //

// =====|=====|=====|=====| =============== |=====|=====|=====|===== //

// -----|-----|-----|-----| SELECTORS BEGIN |-----|-----|-----|----- //

export const stateSelector = state => state.reportResponseFrequencyReducer;

export const getReportsResponseFrequency = createSelector(
  stateSelector,
  state => state.responseFrequency
);

// -----|-----|-----|-----| SELECTORS ENDED |-----|-----|-----|----- //

// =====|=====|=====|=====| =============== |=====|=====|=====|===== //

// -----|-----|-----|-----| REDUCER BEGIN |-----|-----|-----|----- //

const initialState = {
  responseFrequency: {}
};

export const reportResponseFrequencyReducer = createReducer(initialState, {
  [GET_REPORTS_RESPONSE_FREQUENCY_REQUEST]: (state, { payload }) => {
    state.loading = true;
  },
  [GET_REPORTS_RESPONSE_FREQUENCY_REQUEST_SUCCESS]: (state, { payload }) => {
    state.loading = false;
    state.responseFrequency = payload.responseFrequency;
  },
  [GET_REPORTS_RESPONSE_FREQUENCY_REQUEST_ERROR]: (state, { payload }) => {
    state.loading = false;
    state.error = payload.error;
  }
});

// -----|-----|-----|-----| REDUCER BEGIN |-----|-----|-----|----- //

// =====|=====|=====|=====| =============== |=====|=====|=====|===== //

// -----|-----|-----|-----| SAGAS BEGIN |-----|-----|-----|----- //

function* getReportsResponseFrequencyRequest({ payload }) {
  try {
    const responseFrequency = yield call(reportsApi.fetchResponseFrequency, payload);
    yield put({
      type: GET_REPORTS_RESPONSE_FREQUENCY_REQUEST_SUCCESS,
      payload: { responseFrequency }
    });
  } catch (error) {
    let msg = "Failed to fetch response frequency Please try again...";
    yield call(message.error, msg);
    yield put({
      type: GET_REPORTS_RESPONSE_FREQUENCY_REQUEST_ERROR,
      payload: { error: msg }
    });
  }
}

export function* reportResponseFrequencySaga() {
  yield all([yield takeEvery(GET_REPORTS_RESPONSE_FREQUENCY_REQUEST, getReportsResponseFrequencyRequest)]);
}

// -----|-----|-----|-----| SAGAS ENDED |-----|-----|-----|----- //
