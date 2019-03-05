import { createSelector } from "reselect";
import { createAction } from "redux-starter-kit";
import { call, put, all, takeEvery } from "redux-saga/effects";
import { message } from "antd";
import { testsApi } from "@edulastic/api";
import { CREATE_TEST_SUCCESS, UPDATE_TEST_SUCCESS } from "../src/constants/actions";

// types
export const RECEIVE_TESTS_REQUEST = "[tests] receive list request";
export const RECEIVE_TESTS_SUCCESS = "[tests] receive list success";
export const RECEIVE_TESTS_ERROR = "[tests] receive list error";

// actions
export const receiveTestsAction = createAction(RECEIVE_TESTS_REQUEST);
export const receiveTestSuccessAction = createAction(RECEIVE_TESTS_SUCCESS);
export const receiveTestErrorAction = createAction(RECEIVE_TESTS_ERROR);

function* receiveTestsSaga({ payload: { search = {}, page = 1, limit = 10 } }) {
  try {
    const { items, count } = yield call(testsApi.getAll, {
      search,
      page,
      limit
    });

    yield put(
      receiveTestSuccessAction({
        entities: items,
        count,
        page,
        limit
      })
    );
  } catch (err) {
    const errorMessage = "Receive tests is failing";
    yield call(message.error, errorMessage);
    yield put(receiveTestErrorAction({ error: errorMessage }));
  }
}

export function* watcherSaga() {
  yield all([yield takeEvery(RECEIVE_TESTS_REQUEST, receiveTestsSaga)]);
}

// reducer
const initialState = {
  entities: [],
  error: null,
  page: 1,
  limit: 20,
  count: 0,
  loading: false
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_TESTS_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_TESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: payload.entities,
        page: payload.page,
        limit: payload.limit,
        count: payload.count
      };
    case RECEIVE_TESTS_ERROR:
      return { ...state, loading: false, error: payload.error };
    case CREATE_TEST_SUCCESS:
    case UPDATE_TEST_SUCCESS:
      return {
        ...state,
        entities: [payload.entity, ...state.entities]
      };
    default:
      return state;
  }
};

// selectors
export const stateSelector = state => state.testList;

export const getTestsSelector = createSelector(
  stateSelector,
  state => state.entities
);
export const getTestsLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const getTestsPageSelector = createSelector(
  stateSelector,
  state => state.page
);
export const getTestsLimitSelector = createSelector(
  stateSelector,
  state => state.limit
);
export const getTestsCountSelector = createSelector(
  stateSelector,
  state => state.count
);
