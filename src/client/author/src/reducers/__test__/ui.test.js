import uiReducer from "../ui";

import { TOGGLE_MENU, RESPONSIVE_TOGGLE_MENU } from "../../constants/actions";

describe("ui", () => {
  const initialState = {
    flag: false,
    sidebar: false
  };

  it("should return the initial state", () => {
    expect(uiReducer(initialState, {})).toMatchSnapshot();
  });

  it("should return the toggle menu state", () => {
    expect(
      uiReducer(initialState, {
        type: TOGGLE_MENU
      })
    ).toMatchSnapshot();
  });

  it("should return the responsive toggle menu state", () => {
    expect(
      uiReducer(initialState, {
        type: RESPONSIVE_TOGGLE_MENU
      })
    ).toMatchSnapshot();
  });
});
