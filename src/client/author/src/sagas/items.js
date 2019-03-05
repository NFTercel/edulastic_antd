import { takeEvery, takeLatest, call, put, all } from "redux-saga/effects";
import { itemsApi } from "@edulastic/api";
import { message } from "antd";

import {
  RECEIVE_ITEM_REQUEST,
  RECEIVE_ITEM_SUCCESS,
  RECEIVE_ITEM_ERROR,
  RECEIVE_ITEMS_REQUEST,
  RECEIVE_ITEMS_SUCCESS,
  RECEIVE_ITEMS_ERROR,
  CREATE_ITEM_REQUEST,
  UPDATE_ITEM_REQUEST
} from "../constants/actions";

export function* receiveItemsSaga({ payload }) {
  try {
    const { items, page, count } = yield call(itemsApi.receiveItems, payload);

    yield put({
      type: RECEIVE_ITEMS_SUCCESS,
      payload: { items, page, limit: payload.limit, count }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Receive items is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_ITEMS_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* receiveItemSaga({ payload }) {
  try {
    const item = yield call(itemsApi.receiveItemById, payload.id);

    yield put({
      type: RECEIVE_ITEM_SUCCESS,
      payload: { item }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Receive item by id is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_ITEM_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* createItemSaga({ payload }) {
  try {
    const item = yield call(itemsApi.createItem, payload);
    yield put({
      type: RECEIVE_ITEM_SUCCESS,
      payload: { item: item.data }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Create item is failed";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_ITEM_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* updateItemSaga({ payload }) {
  try {
    const item = yield call(itemsApi.updateItemById, payload);
    yield put({
      type: RECEIVE_ITEM_SUCCESS,
      payload: { item: item.data }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = "Update item is failed";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_ITEM_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_ITEM_REQUEST, receiveItemSaga),
    yield takeLatest(RECEIVE_ITEMS_REQUEST, receiveItemsSaga),
    yield takeLatest(CREATE_ITEM_REQUEST, createItemSaga),
    yield takeLatest(UPDATE_ITEM_REQUEST, updateItemSaga)
  ]);
}
