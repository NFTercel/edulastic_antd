import { createAction, createReducer } from "redux-starter-kit";
import { createSelector } from "reselect";
import { message } from "antd";
import { call, put, all, takeLatest, select } from "redux-saga/effects";
import { push } from "react-router-redux";

import { fileApi, testsApi, testItemsApi } from "@edulastic/api";

import { initialTestState, getTestEntitySelector, setTestDataAction } from "../TestPage/ducks";
import { getUserSelector } from "../src/selectors/user";

export const CREATE_ASSESSMENT_REQUEST = "[assessmentPage] create assessment request";
export const CREATE_ASSESSMENT_SUCCESS = "[assessmentPage] create assessment success";
export const CREATE_ASSESSMENT_ERROR = "[assessmentPage] create assessment error";

export const createAssessmentRequestAction = createAction(CREATE_ASSESSMENT_REQUEST);
export const createAssessmentSuccessAction = createAction(CREATE_ASSESSMENT_SUCCESS);
export const createAssessmentErrorAction = createAction(CREATE_ASSESSMENT_ERROR);

const initialState = {
  creating: false,
  error: undefined
};

const createAssessmentRequest = state => ({
  ...state,
  creating: true,
  error: undefined
});

const createAssessmentSuccess = state => ({
  ...state,
  creating: false
});

const createAssessmentError = (state, { payload: { error } }) => ({
  ...state,
  creating: false,
  error
});

export const reducer = createReducer(initialState, {
  [CREATE_ASSESSMENT_REQUEST]: createAssessmentRequest,
  [CREATE_ASSESSMENT_SUCCESS]: createAssessmentSuccess,
  [CREATE_ASSESSMENT_ERROR]: createAssessmentError
});

const defaultTestItem = {
  columns: [],
  data: {
    questions: [],
    resources: []
  },
  rows: [
    {
      tabs: [],
      dimension: "100%",
      widgets: []
    }
  ]
};

function* createAssessmentSaga({ payload }) {
  let fileURI;
  let testItem;

  try {
    if (payload.file) {
      const { fileUri } = yield call(fileApi.upload, { file: payload.file });
      fileURI = fileUri;
    }
  } catch (error) {
    const errorMessage = "Upload PDF is failing";

    yield call(message.error, errorMessage);
    yield put(createAssessmentErrorAction({ error: errorMessage }));
    return;
  }

  try {
    if (!payload.assessmentId) {
      testItem = yield call(testItemsApi.create, defaultTestItem);
    }
  } catch (error) {
    const errorMessage = "Create test item is failing";

    yield call(message.error, errorMessage);
    yield put(createAssessmentErrorAction({ error: errorMessage }));
    return;
  }

  try {
    if (payload.assessmentId) {
      const assessment = yield select(getTestEntitySelector);

      const updatedAssessment = {
        ...assessment,
        docUrl: fileURI,
        annotations: [],
        updatedDate: undefined,
        createdDate: undefined,
        assignments: undefined
      };

      const updatePayload = {
        id: assessment._id,
        data: updatedAssessment
      };

      yield call(testsApi.update, updatePayload);

      yield put(setTestDataAction({ docUrl: fileURI }));
      yield put(createAssessmentSuccessAction());
      yield put(push(`/author/assessments/${assessment._id}`));
    } else {
      const { user } = yield select(getUserSelector);

      const newAssessment = {
        ...initialTestState,
        title: "New Assessment",
        createdBy: {
          id: user._id,
          firstName: user.firstName,
          lastName: "",
          email: user.email
        },
        testItems: [testItem._id],
        docUrl: fileURI,
        releaseScore: "DONT_RELEASE",
        assignments: undefined
      };

      const assessment = yield call(testsApi.create, newAssessment);

      yield put(createAssessmentSuccessAction());
      yield put(push(`/author/assessments/${assessment._id}`));
    }
  } catch (error) {
    const errorMessage = "Create assessment is failing";

    yield call(message.error, errorMessage);
    yield put(createAssessmentErrorAction({ error: errorMessage }));
  }
}

export function* watcherSaga() {
  yield all([yield takeLatest(CREATE_ASSESSMENT_REQUEST, createAssessmentSaga)]);
}

const getStateSelector = state => state.assessmentCreate;

export const getAssessmentCreatingSelector = createSelector(
  getStateSelector,
  state => state.creating
);

export const getAssessmentErrorSelector = createSelector(
  getStateSelector,
  state => state.error
);
