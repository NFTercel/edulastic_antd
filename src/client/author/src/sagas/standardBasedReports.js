import { takeEvery, call, put, all } from "redux-saga/effects";
import { standardBasedReportApi } from "@edulastic/api";

import { GET_STANDARD_BASED_REPORTS, GET_STANDARD_BASED_REPORTS_SUCCESS } from "../constants/actions";

function* getStandardReportsSaga({ payload }) {
  try {
    const entities = yield call(standardBasedReportApi.fetchStandardReports, payload);
    yield put({
      type: GET_STANDARD_BASED_REPORTS_SUCCESS,
      payload: { entities }
    });
  } catch (err) {
    console.log("err", err);
  }
}

export default function* watcherSaga() {
  yield all([yield takeEvery(GET_STANDARD_BASED_REPORTS, getStandardReportsSaga)]);
}
