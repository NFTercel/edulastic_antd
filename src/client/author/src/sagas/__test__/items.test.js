import { expectSaga } from "redux-saga-test-plan";
import items from "../items";
import { itemsReducer, itemReducer } from "../../reducers/items";

import {
  RECEIVE_ITEMS_REQUEST,
  RECEIVE_ITEMS_SUCCESS,
  RECEIVE_ITEMS_ERROR,
  RECEIVE_ITEM_REQUEST,
  RECEIVE_ITEM_SUCCESS,
  RECEIVE_ITEM_ERROR
} from "../../constants/actions";

describe("items", () => {
  it("should have the expected watchers", done =>
    expectSaga(items)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      }));

  it(`should handle ${RECEIVE_ITEMS_REQUEST}`, () => {
    expect(
      itemsReducer(undefined, {
        type: RECEIVE_ITEMS_REQUEST,
        payload: { page: 1, limit: 10, count: 0 }
      })
    ).toMatchSnapshot();
  });

  it(`should handle ${RECEIVE_ITEMS_SUCCESS}`, () => {
    expect(
      itemsReducer(undefined, {
        type: RECEIVE_ITEMS_SUCCESS,
        payload: { page: 1, limit: 10, count: 0 }
      })
    ).toMatchSnapshot();
  });

  it(`should handle ${RECEIVE_ITEMS_ERROR}`, () => {
    expect(
      itemsReducer(undefined, {
        type: RECEIVE_ITEMS_ERROR,
        payload: { error: "something went wrong" }
      })
    ).toMatchSnapshot();
  });

  it(`should handle ${RECEIVE_ITEM_REQUEST}`, () => {
    expect(
      itemReducer(undefined, {
        type: RECEIVE_ITEM_REQUEST,
        payload: { id: 1 }
      })
    ).toMatchSnapshot();
  });

  it(`should handle ${RECEIVE_ITEM_SUCCESS}`, () => {
    expect(
      itemReducer(undefined, {
        type: RECEIVE_ITEM_SUCCESS,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it(`should handle ${RECEIVE_ITEM_ERROR}`, () => {
    expect(
      itemReducer(undefined, {
        type: RECEIVE_ITEM_ERROR,
        payload: { error: "something went wrong" }
      })
    ).toMatchSnapshot();
  });
});
