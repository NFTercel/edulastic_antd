import itemDetailReducer from "../itemDetail";

import {
  RECEIVE_ITEM_DETAIL_REQUEST,
  RECEIVE_ITEM_DETAIL_SUCCESS,
  RECEIVE_ITEM_DETAIL_ERROR,
  UPDATE_ITEM_DETAIL_REQUEST,
  UPDATE_ITEM_DETAIL_SUCCESS,
  UPDATE_ITEM_DETAIL_ERROR,
  SET_ITEM_DETAIL_DATA,
  UPDATE_ITEM_DETAIL_DIMENSION,
  SET_DRAGGING,
  DELETE_ITEM_DETAIL_WIDGET,
  UPDATE_TAB_TITLE,
  USE_TABS,
  MOVE_WIDGET
} from "../../constants/actions";

describe("item detail", () => {
  const initialState = {
    item: {
      rows: [
        {
          widgets: [],
          dimension: "100%",
          tabs: []
        }
      ]
    },
    error: null,
    loading: false,
    updating: false,
    updateError: null,
    dragging: false
  };

  it("should return the initial state", () => {
    expect(itemDetailReducer(initialState, {})).toMatchSnapshot();
  });

  it("should return the receive item detail request state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: RECEIVE_ITEM_DETAIL_SUCCESS,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the receive item detail success state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: RECEIVE_ITEM_DETAIL_REQUEST,
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

  it("should return the receive item detail error state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: RECEIVE_ITEM_DETAIL_ERROR,
        payload: {
          error: "receive item detail error"
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the update item detail request state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: UPDATE_ITEM_DETAIL_REQUEST,
        payload: {}
      })
    ).toMatchSnapshot();
  });

  it("should return the update item detail success state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: UPDATE_ITEM_DETAIL_SUCCESS,
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

  it("should return the update item detail error state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: UPDATE_ITEM_DETAIL_ERROR,
        payload: {
          error: "update item detail error"
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the set item detail data state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: SET_ITEM_DETAIL_DATA,
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

  it("should return the update item detail dimension state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: UPDATE_ITEM_DETAIL_DIMENSION,
        payload: {
          left: 10,
          right: 20
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the set dragging state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: SET_DRAGGING,
        payload: {
          dragging: 5
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the delete item detail widget state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: DELETE_ITEM_DETAIL_WIDGET,
        payload: {
          rowIndex: 0,
          widgetIndex: 5
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the delete item detail widget state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: UPDATE_TAB_TITLE,
        payload: {
          rowIndex: 0,
          tabIndex: 2,
          value: "tab1"
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the use tabs state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: USE_TABS,
        payload: {
          rowIndex: 3,
          isUseTabs: true
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the move widget state", () => {
    expect(
      itemDetailReducer(initialState, {
        type: MOVE_WIDGET,
        payload: {
          from: 0,
          to: 1
        }
      })
    ).toMatchSnapshot();
  });
});
