import { itemsReducer, itemReducer } from "../items";

import {
  RECEIVE_ITEMS_REQUEST,
  RECEIVE_ITEMS_SUCCESS,
  RECEIVE_ITEMS_ERROR,
  RECEIVE_ITEM_REQUEST,
  RECEIVE_ITEM_SUCCESS,
  RECEIVE_ITEM_ERROR
} from "../../constants/actions";

describe("items", () => {
  const initialItemsState = {
    items: [],
    error: null,
    loading: false,
    page: 1,
    limit: 5,
    count: 0
  };

  const initialItemState = {
    item: null,
    error: null,
    loading: false
  };

  it("should return the initial state", () => {
    expect(itemsReducer(initialItemsState, {})).toMatchSnapshot();
  });

  it("should return the receive items request state", () => {
    expect(
      itemsReducer(initialItemsState, {
        type: RECEIVE_ITEMS_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the receive items success state", () => {
    expect(
      itemsReducer(initialItemsState, {
        type: RECEIVE_ITEMS_SUCCESS,
        payload: {
          items: [
            {
              rows: [
                {
                  tabs: [],
                  dimension: "100%",
                  widgets: [
                    {
                      widgetType: "question",
                      type: "multipleChoice",
                      title: "Multiple choice",
                      reference: "5c0f0c9ed8c7f4453f5bb51f",
                      tabIndex: 0
                    }
                  ]
                }
              ],
              columns: []
            },
            {
              rows: [
                {
                  tabs: [],
                  dimension: "100%",
                  widgets: [
                    {
                      widgetType: "question",
                      type: "graphing",
                      title: "GRAPHING TEST",
                      reference: "5c0f0c9ed8c7f4453f5ba234",
                      tabIndex: 2
                    }
                  ]
                }
              ],
              columns: []
            }
          ],
          page: 5,
          limit: 10,
          count: 50
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the receive items error state", () => {
    expect(
      itemsReducer(initialItemsState, {
        type: RECEIVE_ITEMS_ERROR,
        payload: {
          error: "unexpected issues happened when receive items"
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the item initial state", () => {
    expect(itemReducer(initialItemState, {})).toMatchSnapshot();
  });

  it("should return the receive item request state", () => {
    expect(
      itemReducer(initialItemState, {
        type: RECEIVE_ITEM_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the receive item success state", () => {
    expect(
      itemReducer(initialItemState, {
        type: RECEIVE_ITEM_SUCCESS,
        payload: {
          item: {
            rows: [
              {
                tabs: [],
                dimension: "100%",
                widgets: [
                  {
                    widgetType: "question",
                    type: "multipleChoice",
                    title: "Multiple choice",
                    reference: "5c0f0c9ed8c7f4453f5bb51f",
                    tabIndex: 0
                  }
                ]
              }
            ],
            columns: []
          }
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the receive item error state", () => {
    expect(
      itemReducer(initialItemState, {
        type: RECEIVE_ITEM_ERROR,
        payload: {
          error: "unexpected error happend when receive item"
        }
      })
    ).toMatchSnapshot();
  });
});
