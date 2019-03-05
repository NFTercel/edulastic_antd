import {
  RECEIVE_ITEM_DETAIL_REQUEST,
  UPDATE_ITEM_DETAIL_REQUEST,
  SET_ITEM_DETAIL_DATA,
  UPDATE_ITEM_DETAIL_DIMENSION,
  SET_DRAGGING,
  DELETE_ITEM_DETAIL_WIDGET,
  UPDATE_TAB_TITLE,
  USE_TABS,
  MOVE_WIDGET
} from "../constants/actions";

export const getItemDetailByIdAction = (id, params) => ({
  type: RECEIVE_ITEM_DETAIL_REQUEST,
  payload: { id, params }
});

export const setItemDetailDataAction = item => ({
  type: SET_ITEM_DETAIL_DATA,
  payload: { item }
});

export const updateItemDetailByIdAction = (id, data) => ({
  type: UPDATE_ITEM_DETAIL_REQUEST,
  payload: { id, data }
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
