import { createSelector } from "reselect";
import { cloneDeep, keyBy as _keyBy, omit as _omit } from "lodash";
import { testItemsApi } from "@edulastic/api";
import { call, put, all, takeEvery } from "redux-saga/effects";
import { message } from "antd";
import { loadQuestionsAction } from "../sharedDucks/questions";

// constants

export const RECEIVE_ITEM_DETAIL_REQUEST = "[itemDetail] receive request";
export const RECEIVE_ITEM_DETAIL_SUCCESS = "[itemDetail] receive success";
export const RECEIVE_ITEM_DETAIL_ERROR = "[itemDetail] receive error";

export const UPDATE_ITEM_DETAIL_REQUEST = "[itemDetail] update by id request";
export const UPDATE_ITEM_DETAIL_SUCCESS = "[itemDetail] update by id success";
export const UPDATE_ITEM_DETAIL_ERROR = "[itemDetail] update by id error";

export const SET_ITEM_DETAIL_DATA = "[itemDetail] set data";
export const UPDATE_ITEM_DETAIL_DIMENSION = "[itemDetail] update dimension";

export const SET_DRAGGING = "[itemDetail] set dragging";

export const DELETE_ITEM_DETAIL_WIDGET = "[itemDetail] delete widget";
export const UPDATE_TAB_TITLE = "[itemDetail] update tab title";
export const USE_TABS = "[itemDetail] is use tabs";
export const MOVE_WIDGET = "[itemDetail] move widget";

// actions

export const getItemDetailByIdAction = (id, params) => ({
  type: RECEIVE_ITEM_DETAIL_REQUEST,
  payload: { id, params }
});

export const receiveItemDetailSuccess = item => ({
  type: RECEIVE_ITEM_DETAIL_SUCCESS,
  payload: { item }
});

export const receiveItemDetailError = error => ({
  type: RECEIVE_ITEM_DETAIL_ERROR,
  payload: { error }
});

export const setItemDetailDataAction = item => ({
  type: SET_ITEM_DETAIL_DATA,
  payload: { item }
});

export const updateItemDetailByIdAction = (id, data) => ({
  type: UPDATE_ITEM_DETAIL_REQUEST,
  payload: { id, data }
});

export const updateItemDetailSuccess = item => ({
  type: UPDATE_ITEM_DETAIL_SUCCESS,
  payload: { item }
});

export const updateItemDetailError = error => ({
  type: UPDATE_ITEM_DETAIL_ERROR,
  payload: { error }
});

export const updateItemDetailDimensionAction = (left, right) => ({
  type: UPDATE_ITEM_DETAIL_DIMENSION,
  payload: { left, right }
});

export const setItemDetailDraggingAction = dragging => ({
  type: SET_DRAGGING,
  payload: { dragging }
});

export const deleteWidgetAction = (rowIndex, widgetIndex) => ({
  type: DELETE_ITEM_DETAIL_WIDGET,
  payload: { rowIndex, widgetIndex }
});

export const updateTabTitleAction = ({ rowIndex, tabIndex, value }) => ({
  type: UPDATE_TAB_TITLE,
  payload: { rowIndex, tabIndex, value }
});

export const useTabsAction = ({ rowIndex, isUseTabs }) => ({
  type: USE_TABS,
  payload: { rowIndex, isUseTabs }
});

export const moveItemDetailWidgetAction = ({ from, to }) => ({
  type: MOVE_WIDGET,
  payload: { from, to }
});

// reducer

const initialState = {
  item: null,
  error: null,
  loading: false,
  updating: false,
  updateError: null,
  dragging: false
};

const deleteWidget = (state, { rowIndex, widgetIndex }) => {
  const newState = cloneDeep(state);
  newState.item.rows[rowIndex].widgets = newState.item.rows[rowIndex].widgets.filter((w, i) => i !== widgetIndex);

  return newState;
};

const updateDimension = (state, { left, right }) => {
  const newState = cloneDeep(state);
  newState.item.rows[0].dimension = left;

  if (left === "100%") {
    newState.item.rows[0].widgets = [...newState.item.rows[0].widgets, ...newState.item.rows[1].widgets];
    newState.item.rows.length = 1;
  } else if (!newState.item.rows[1]) {
    newState.item.rows[1] = {
      tabs: ["Tab 1", "Tab 2"],
      dimension: right,
      widgets: []
    };
  } else {
    newState.item.rows[1].dimension = right;
  }
  return newState;
};

const updateTabTitle = (state, { rowIndex, tabIndex, value }) => {
  const newState = cloneDeep(state);
  newState.item.rows[rowIndex].tabs[tabIndex] = value;
  return newState;
};

const useTabs = (state, { rowIndex, isUseTabs }) => {
  const newState = cloneDeep(state);
  if (isUseTabs) {
    newState.item.rows[rowIndex].tabs = ["Tab 1", "Tab 2"];
  }
  if (!isUseTabs) {
    newState.item.rows[rowIndex].tabs = [];
  }
  return newState;
};

const moveWidget = (state, { from, to }) => {
  const newState = cloneDeep(state);
  const [movedWidget] = newState.item.rows[from.rowIndex].widgets.splice(from.widgetIndex, 1);
  movedWidget.tabIndex = to.tabIndex || 0;
  newState.item.rows[to.rowIndex].widgets.splice(to.widgetIndex, 0, movedWidget);
  return newState;
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case RECEIVE_ITEM_DETAIL_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_ITEM_DETAIL_SUCCESS:
      return { ...state, item: payload, loading: false, error: null };
    case RECEIVE_ITEM_DETAIL_ERROR:
      return { ...state, loading: false, error: payload.error };

    case SET_ITEM_DETAIL_DATA:
      return { ...state, item: payload.item };

    case DELETE_ITEM_DETAIL_WIDGET:
      return deleteWidget(state, payload);

    case UPDATE_TAB_TITLE:
      return updateTabTitle(state, payload);

    case MOVE_WIDGET:
      return moveWidget(state, payload);

    case USE_TABS:
      return useTabs(state, payload);

    case SET_DRAGGING:
      return { ...state, dragging: payload.dragging };

    case UPDATE_ITEM_DETAIL_DIMENSION:
      return updateDimension(state, payload);

    case UPDATE_ITEM_DETAIL_REQUEST:
      return { ...state, updating: true };
    case UPDATE_ITEM_DETAIL_SUCCESS:
      return { ...state, item: payload.item, updating: false };
    case UPDATE_ITEM_DETAIL_ERROR:
      return { ...state, updating: false, updateError: payload.error };

    default:
      return state;
  }
}

// saga

function* receiveItemSaga({ payload }) {
  try {
    const data = yield call(testItemsApi.getById, payload.id, payload.params);
    let questions = (data.data && data.data.questions) || [];
    const resources = (data.data && data.data.resources) || [];
    questions = [...questions, ...resources];
    questions = _keyBy(questions, "id");
    const item = _omit(data, "data");
    yield put({
      type: RECEIVE_ITEM_DETAIL_SUCCESS,
      payload: item
    });
    yield put(loadQuestionsAction(questions));
  } catch (err) {
    console.log("err is", err);
    const errorMessage = "Receive item by id is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_ITEM_DETAIL_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* updateItemSaga({ payload }) {
  try {
    if (!payload.keepData) {
      // avoid data part being put into db
      delete payload.data.data;
    }

    const data = _omit(payload.data, ["authors"]);
    const item = yield call(testItemsApi.updateById, payload.id, data);

    yield put({
      type: UPDATE_ITEM_DETAIL_SUCCESS,
      payload: { item }
    });
    yield call(message.success, "Update item by id is success", "Success");
  } catch (err) {
    console.error(err);
    const errorMessage = "Update item by id is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: UPDATE_ITEM_DETAIL_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_ITEM_DETAIL_REQUEST, receiveItemSaga),
    yield takeEvery(UPDATE_ITEM_DETAIL_REQUEST, updateItemSaga)
  ]);
}

// selectors

export const stateSelector = state => state.itemDetail;

export const getItemDetailSelector = createSelector(
  stateSelector,
  state => state.item
);

export const getItemIdSelector = createSelector(
  getItemDetailSelector,
  item => item && item._id
);

export const getRows = item =>
  item.rows.map(row => ({
    ...row,
    widgets: row.widgets.map(widget => {
      let referencePopulate = {
        data: null
      };
      let activity = {
        timespent: null,
        qIndex: null
      };

      if (item.data && item.data.questions && item.data.questions.length) {
        referencePopulate = item.data.questions.find(q => q._id === widget.reference);
      }

      if (widget && widget.entity && widget.entity.activity) {
        const timespent = widget.entity.activity.timespent;
        const qIndex = widget.entity.activity.qIndex;
        activity = { timespent, qIndex };
      }

      if (!referencePopulate && item.data && item.data.resources && item.data.resources.length) {
        referencePopulate = item.data.resources.find(r => r._id === widget.reference);
      }

      return {
        ...widget,
        activity,
        referencePopulate
      };
    })
  }));

export const getItemDetailRowsSelector = createSelector(
  getItemDetailSelector,
  item => {
    if (!item) return [];
    return getRows(item);
  }
);

export const getItemDetailLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const getItemDetailUpdatingSelector = createSelector(
  stateSelector,
  state => state.updating
);
export const getItemDetailDraggingSelector = createSelector(
  stateSelector,
  state => state.dragging
);

export const getItemDetailDimensionTypeSelector = createSelector(
  getItemDetailSelector,
  state => {
    if (!state) return "";
    const left = state.rows[0].dimension.trim().slice(0, -1);
    const right = state.rows[1] ? state.rows[1].dimension.trim().slice(0, -1) : "100";
    return `${left}-${right}`;
  }
);

export const getItemDetailValidationSelector = createSelector(
  getItemDetailRowsSelector,
  rows => {
    const validations = {};
    rows.forEach(row => {
      row.widgets.forEach(({ entity }) => {
        validations[entity.id] = entity;
      });
    });
    return validations;
  }
);
