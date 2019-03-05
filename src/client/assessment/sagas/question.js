import { takeLatest, call } from "redux-saga/effects";
import { assessmentApi } from "@edulastic/api";

import { AUTHOR_QUESTION } from "../constants/actions";

function* authorQuestion(action) {
  yield call(assessmentApi.addQuestion, action.payload);
}

export default function* watcherSaga() {
  yield takeLatest(AUTHOR_QUESTION, authorQuestion);
}
