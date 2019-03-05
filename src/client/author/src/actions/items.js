import {
  RECEIVE_ITEMS_REQUEST,
  RECEIVE_ITEM_REQUEST,
  CREATE_ITEM_REQUEST,
  UPDATE_ITEM_REQUEST
} from "../constants/actions";

export const receiveItemsAction = ({ page, limit, search }) => ({
  type: RECEIVE_ITEMS_REQUEST,
  payload: { page, limit, search }
});

export const receiveItemByIdAction = id => ({
  type: RECEIVE_ITEM_REQUEST,
  payload: { id }
});

export const createItemAction = payload => ({
  type: CREATE_ITEM_REQUEST,
  payload: { payload }
});

export const updateItemByIdAction = payload => ({
  type: UPDATE_ITEM_REQUEST,
  payload: { payload }
});
