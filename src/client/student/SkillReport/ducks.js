import { createAction, createReducer } from "redux-starter-kit";
import { skillReportApi } from "@edulastic/api";
import { takeEvery, call, all, put } from "redux-saga/effects";

// actions
export const GET_SKILL_REPORT_BY_CLASSID = "[reports] get skill reports by class id";
export const LOAD_SKILL_REPORT_BY_CLASSID = "[reports] load skill report by class id";

const initialState = null;

const reducer = createReducer(initialState, {
  [LOAD_SKILL_REPORT_BY_CLASSID]: (_, action) => action.payload
});

export default reducer;

// action creators
export const fetchSkillReportByClassID = createAction(GET_SKILL_REPORT_BY_CLASSID);

// sagas
function* fetchSkillReport(action) {
  const classId = action.payload;
  try {
    const reports = yield call(skillReportApi.fetchSkillReport, classId);
    yield put({ type: LOAD_SKILL_REPORT_BY_CLASSID, payload: { reports } });
  } catch (err) {
    console.error(err);
  }
}

export function* watcherSaga() {
  yield all([yield takeEvery(GET_SKILL_REPORT_BY_CLASSID, fetchSkillReport)]);
}

// selectors
export const classSelector = state => state.user.user.orgData.defaultClass;
