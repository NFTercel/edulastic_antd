import testItemsReducer from "../testItems";

import {
  RECEIVE_TEST_ITEMS_REQUEST,
  RECEIVE_TEST_ITEMS_SUCCESS,
  RECEIVE_TEST_ITEMS_ERROR,
  SET_TEST_ITEMS_REQUEST
} from "../../constants/actions";

describe("test items", () => {
  const initialState = {
    items: [],
    error: null,
    loading: false,
    page: 1,
    limit: 5,
    count: 0
  };

  it("should return the initial state", () => {
    expect(testItemsReducer(initialState, {})).toMatchSnapshot();
  });

  it("should return the receive test items request state", () => {
    expect(
      testItemsReducer(initialState, {
        type: RECEIVE_TEST_ITEMS_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the receive test items success state", () => {
    expect(
      testItemsReducer(initialState, {
        type: RECEIVE_TEST_ITEMS_SUCCESS,
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
            }
          ],
          count: 2
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the receive test items error state", () => {
    expect(
      testItemsReducer(initialState, {
        type: RECEIVE_TEST_ITEMS_ERROR,
        payload: {
          error: "unexpected error happened when receive test items"
        }
      })
    ).toMatchSnapshot();
  });

  expect(
    testItemsReducer(initialState, {
      type: SET_TEST_ITEMS_REQUEST,
      payload: {}
    })
  ).toMatchSnapshot();
});
