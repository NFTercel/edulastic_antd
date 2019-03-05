import viewReducer from "../view";

import { CHANGE_VIEW, CHANGE_PREVIEW } from "../../constants/actions";

describe("view", () => {
  const initialState = {
    view: "edit",
    preview: "clear",
    showAnswers: false
  };

  it("should return the initial state", () => {
    expect(viewReducer(initialState, {})).toMatchSnapshot();
  });

  it("should return the change view state1", () => {
    expect(
      viewReducer(initialState, {
        type: CHANGE_VIEW,
        payload: { view: "edit" }
      })
    ).toMatchSnapshot();
  });

  it("should return the change view state2", () => {
    expect(
      viewReducer(initialState, {
        type: CHANGE_VIEW,
        payload: { view: "preview" }
      })
    ).toMatchSnapshot();
  });

  it("should return the change preview state1", () => {
    expect(
      viewReducer(initialState, {
        type: CHANGE_PREVIEW,
        payload: { view: "clear" }
      })
    ).toMatchSnapshot();
  });

  it("should return the change preview state2", () => {
    expect(
      viewReducer(initialState, {
        type: CHANGE_PREVIEW,
        payload: { view: "check" }
      })
    ).toMatchSnapshot();
  });
});
