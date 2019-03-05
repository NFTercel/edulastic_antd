import testItemReducer from "../testItem";

import { CREATE_TEST_ITEM_REQUEST, CREATE_TEST_ITEM_SUCCESS, CREATE_TEST_ITEM_ERROR } from "../../constants/actions";

describe("test item", () => {
  const initialState = {
    item: [],
    createError: null,
    creating: false
  };

  it("should return the initial state", () => {
    expect(testItemReducer(initialState, {})).toMatchSnapshot();
  });

  it("should return the create test item request state", () => {
    expect(
      testItemReducer(initialState, {
        type: CREATE_TEST_ITEM_REQUEST
      })
    ).toMatchSnapshot();
  });

  it("should return the create test item success state", () => {
    expect(
      testItemReducer(initialState, {
        type: CREATE_TEST_ITEM_SUCCESS,
        payload: {
          item: [
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
          ]
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the create test item error state", () => {
    expect(
      testItemReducer(initialState, {
        type: CREATE_TEST_ITEM_ERROR,
        payload: { error: "unexpected error happened when create test item" }
      })
    ).toMatchSnapshot();
  });
});
