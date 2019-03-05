import { createSelector } from "reselect";
import { message } from "antd";
import { call, put, all, takeEvery } from "redux-saga/effects";
import { testItemsApi } from "@edulastic/api";

// constants

export const RECEIVE_TEST_ITEMS_REQUEST = "[addItems] receive items request";
export const RECEIVE_TEST_ITEMS_SUCCESS = "[addItems] receive items success";
export const RECEIVE_TEST_ITEMS_ERROR = "[addItems] receive items error";
export const SET_TEST_ITEMS_REQUEST = "[addItems] set items request";

// actions

export const receiveTestItemsSuccess = (items, count, page, limit) => ({
  type: RECEIVE_TEST_ITEMS_SUCCESS,
  payload: {
    items,
    count,
    page,
    limit
  }
});

export const receiveTestItemsError = error => ({
  type: RECEIVE_TEST_ITEMS_ERROR,
  payload: {
    error
  }
});

export const receiveTestItemsAction = (search, page, limit) => ({
  type: RECEIVE_TEST_ITEMS_REQUEST,
  payload: {
    search,
    page,
    limit
  }
});

export const setTestItemsAction = data => ({
  type: SET_TEST_ITEMS_REQUEST,
  payload: { data }
});

// reducer

const initialState = {
  items: [],
  error: null,
  loading: false,
  page: 1,
  limit: 10,
  count: 0
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_TEST_ITEMS_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_TEST_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: payload.items,
        count: payload.count,
        page: payload.page,
        limit: payload.limit
      };
    case RECEIVE_TEST_ITEMS_ERROR:
      return { ...state, loading: false, error: payload.error };
    case SET_TEST_ITEMS_REQUEST:
      return {
        ...state,
        selectedItems: payload
      };
    default:
      return state;
  }
};

// saga

function* receiveTestItemsSaga({ payload: { search = {}, page = 1, limit = 10 } }) {
  try {
    const { items, count } = yield call(testItemsApi.getAll, {
      search,
      page,
      limit
    });
    yield put(receiveTestItemsSuccess(items, count, page, limit));
  } catch (err) {
    const errorMessage = "Receive items is failing";
    yield call(message.error, errorMessage);
    yield put(receiveTestItemsError(errorMessage));
  }
}

export function* watcherSaga() {
  yield all([yield takeEvery(RECEIVE_TEST_ITEMS_REQUEST, receiveTestItemsSaga)]);
}

// selectors

export const stateTestItemsSelector = state => state.testsAddItems;

export const getTestItemsSelector = createSelector(
  stateTestItemsSelector,
  state => state.items
);

export const getTestItemsLoadingSelector = createSelector(
  stateTestItemsSelector,
  state => state.loading
);

export const getTestsItemsCountSelector = createSelector(
  stateTestItemsSelector,
  state => state.count
);

export const getTestsItemsLimitSelector = createSelector(
  stateTestItemsSelector,
  state => state.limit
);

export const getTestsItemsPageSelector = createSelector(
  stateTestItemsSelector,
  state => state.page
);

export const getSelectedItemSelector = createSelector(
  stateTestItemsSelector,
  state => state.selectedItems
);
