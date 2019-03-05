import previewReducer from "../preview";

import { PREVIEW_UPDATE_LIST, CHANGE_PREVIEW_TAB } from "../../constants/actions";

describe("preview", () => {
  const initialState = {
    list: [], // array of indexes,
    previewTab: "clear"
  };

  it("should return the initial state", () => {
    expect(previewReducer(initialState, {})).toMatchSnapshot();
  });

  it("should return the preview update list state", () => {
    expect(
      previewReducer(initialState, {
        type: PREVIEW_UPDATE_LIST,
        payload: {
          list: [1, 3, 4, 5, 7]
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the change preview tab1 state", () => {
    expect(
      previewReducer(initialState, {
        type: CHANGE_PREVIEW_TAB,
        payload: {
          previewTab: "check"
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the change preview tab2 state", () => {
    expect(
      previewReducer(initialState, {
        type: CHANGE_PREVIEW_TAB,
        payload: {
          previewTab: "preview"
        }
      })
    ).toMatchSnapshot();
  });

  it("should return the change preview tab3 state", () => {
    expect(
      previewReducer(initialState, {
        type: CHANGE_PREVIEW_TAB,
        payload: {
          previewTab: "clear"
        }
      })
    ).toMatchSnapshot();
  });
});
