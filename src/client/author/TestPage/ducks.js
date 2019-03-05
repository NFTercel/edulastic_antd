import { createSelector } from "reselect";
import { test } from "@edulastic/constants";
import { call, put, all, takeEvery } from "redux-saga/effects";
import { message } from "antd";
import { keyBy as _keyBy } from "lodash";
import { testsApi } from "@edulastic/api";

import { SET_MAX_ATTEMPT, UPDATE_TEST_IMAGE } from "../src/constants/actions";
import { SET_ASSIGNMENT } from "./components/Assign/ducks";
import { loadQuestionsAction } from "../sharedDucks/questions";

// constants
export const CREATE_TEST_REQUEST = "[tests] create test request";
export const CREATE_TEST_SUCCESS = "[tests] create test success";
export const CREATE_TEST_ERROR = "[tests] create test error";

export const UPDATE_TEST_REQUEST = "[tests] update test request";
export const UPDATE_TEST_SUCCESS = "[tests] update test success";
export const UPDATE_TEST_ERROR = "[tests] update test error";

export const RECEIVE_TEST_BY_ID_REQUEST = "[tests] receive test by id request";
export const RECEIVE_TEST_BY_ID_SUCCESS = "[tests] receive test by id success";
export const RECEIVE_TEST_BY_ID_ERROR = "[tests] receive test by id error";

export const SET_TEST_DATA = "[tests] set test data";
export const SET_DEFAULT_TEST_DATA = "[tests] set default test data";

// actions

export const receiveTestByIdAction = id => ({
  type: RECEIVE_TEST_BY_ID_REQUEST,
  payload: { id }
});

export const receiveTestByIdSuccess = entity => ({
  type: RECEIVE_TEST_BY_ID_SUCCESS,
  payload: { entity }
});

export const receiveTestByIdError = error => ({
  type: RECEIVE_TEST_BY_ID_SUCCESS,
  payload: { error }
});

export const createTestAction = data => ({
  type: CREATE_TEST_REQUEST,
  payload: { data }
});

export const createTestSuccessAction = entity => ({
  type: CREATE_TEST_SUCCESS,
  payload: { entity }
});

export const createTestErrorAction = error => ({
  type: CREATE_TEST_ERROR,
  payload: { error }
});

export const updateTestAction = (id, data) => ({
  type: UPDATE_TEST_REQUEST,
  payload: { id, data }
});

export const updateTestSuccessAction = entity => ({
  type: UPDATE_TEST_SUCCESS,
  payload: { entity }
});

export const updateTestErrorAction = error => ({
  type: UPDATE_TEST_ERROR,
  payload: { error }
});

export const setTestDataAction = data => ({
  type: SET_TEST_DATA,
  payload: { data }
});

export const setDefaultTestDataAction = () => ({
  type: SET_DEFAULT_TEST_DATA
});

// reducer

const initialTestState = {
  title: "New Test",
  description: "",
  releaseScore: test.releaseGradeKeys[0],
  maxAttempts: 1,
  testType: test.type.ASSESSMENT,
  activityReview: true,
  renderingType: "assessment",
  status: "draft",
  thumbnail: "https://fakeimg.pl/500x135/",
  createdBy: {
    id: "",
    firstName: "",
    lastName: "",
    email: ""
  },
  tags: [],
  scoring: {
    total: 0,
    testItems: []
  },
  testItems: [],
  standardsTag: {
    curriculum: "",
    standards: []
  },
  grades: [],
  subjects: [],
  courses: [],
  assignments: [],
  collections: "",
  analytics: {
    usage: "0",
    likes: "0"
  }
};

const initialState = {
  entity: initialTestState,
  error: null,
  page: 1,
  limit: 20,
  count: 0,
  loading: false,
  creating: false
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DEFAULT_TEST_DATA:
      return { ...state, entity: initialTestState };
    case SET_ASSIGNMENT:
      return {
        ...state,
        entity: {
          ...state.entity,
          assignments: [...state.entity.assignments, payload.obj]
        }
      };
    case RECEIVE_TEST_BY_ID_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_TEST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        entity: {
          // TODO: someone Fix this shit!!!
          assignments: [],
          ...payload.entity
        }
      };
    case RECEIVE_TEST_BY_ID_ERROR:
      return { ...state, loading: false, error: payload.error };

    case CREATE_TEST_REQUEST:
    case UPDATE_TEST_REQUEST:
      return { ...state, creating: true };
    case CREATE_TEST_SUCCESS:
    case UPDATE_TEST_SUCCESS:
      return {
        ...state,
        creating: false
      };
    case CREATE_TEST_ERROR:
    case UPDATE_TEST_ERROR:
      return { ...state, creating: false, error: payload.error };
    case SET_TEST_DATA:
      return {
        ...state,
        entity: {
          assignments: [],
          ...state.entity,
          ...payload.data
        }
      };
    case UPDATE_TEST_IMAGE:
      return {
        ...state,
        entity: {
          ...state.entity,
          thumbnail: payload.fileUrl
        }
      };
    case SET_MAX_ATTEMPT:
      return {
        ...state,
        entity: {
          ...state.entity,
          maxAttempts: payload.data
        }
      };
    default:
      return state;
  }
};

/**
 * Return all question of a test.
 * @param {Object} testItems - list of test items
 *
 */
const getQuestions = (testItems = []) => {
  const allQuestions = [];
  for (const item of testItems) {
    const { questions = [] } = item.data || {};
    allQuestions.push(...questions);
  }
  return allQuestions;
};

// saga
function* receiveTestByIdSaga({ payload }) {
  try {
    const entity = yield call(testsApi.getById, payload.id, { data: true });
    const questions = getQuestions(entity.testItems);
    yield put(loadQuestionsAction(_keyBy(questions, "id")));
    yield put(receiveTestByIdSuccess(entity));
  } catch (err) {
    const errorMessage = "Receive test by id is failing";
    yield call(message.error, errorMessage);
    yield put(receiveTestByIdError(errorMessage));
  }
}

function* createTestSaga({ payload }) {
  try {
    delete payload.data.assignments;
    const entity = yield call(testsApi.create, payload.data);

    yield put(createTestSuccessAction(entity));
    yield call(message.success, "Success create");
  } catch (err) {
    const errorMessage = "Create test is failing";
    yield call(message.error, errorMessage);
    yield put(createTestErrorAction(errorMessage));
  }
}

function* updateTestSaga({ payload }) {
  try {
    // remove createdDate and updatedDate
    delete payload.data.updatedDate;
    delete payload.data.createdDate;
    delete payload.data.assignments;

    const entity = yield call(testsApi.update, payload);

    yield put(updateTestSuccessAction(entity));
    yield call(message.success, "Success update");
  } catch (err) {
    const errorMessage = "Update test is failing";
    yield call(message.error, errorMessage);
    yield put(updateTestErrorAction(errorMessage));
  }
}

export function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_TEST_BY_ID_REQUEST, receiveTestByIdSaga),
    yield takeEvery(CREATE_TEST_REQUEST, createTestSaga),
    yield takeEvery(UPDATE_TEST_REQUEST, updateTestSaga)
  ]);
}

// selectors

export const stateSelector = state => state.tests;

export const getTestSelector = createSelector(
  stateSelector,
  state => state.entity
);

export const getTestEntitySelector = createSelector(
  stateSelector,
  state => state.entity
);

export const getTestIdSelector = createSelector(
  stateSelector,
  state => state.entity && state.entity._id
);

export const getTestsCreatingSelector = createSelector(
  stateSelector,
  state => state.creating
);

export const getTestItemsRowsSelector = createSelector(
  getTestSelector,
  state =>
    state.testItems.map(item => {
      if (!item || !item.rows) return [];
      return item.rows.map(row => ({
        ...row,
        widgets: row.widgets.map(widget => {
          let referencePopulate = {
            data: null
          };

          if (item.data && item.data.questions && item.data.questions.length) {
            referencePopulate = item.data.questions.find(q => q._id === widget.reference);
          }

          if (!referencePopulate && item.data && item.data.resources && item.data.resources.length) {
            referencePopulate = item.data.resources.find(r => r._id === widget.reference);
          }

          return {
            ...widget,
            referencePopulate
          };
        })
      }));
    })
);
