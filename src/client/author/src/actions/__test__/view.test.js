import { changeViewAction, changePreviewAction } from "../view";

describe("View", () => {
  it("change view should return an action", () => {
    expect(changeViewAction("edit")).toMatchSnapshot();
    expect(changeViewAction("metadata")).toMatchSnapshot();
    expect(changeViewAction("preview")).toMatchSnapshot();
  });

  it("change preview should return an action", () => {
    expect(changePreviewAction("check")).toMatchSnapshot();
    expect(changePreviewAction("show")).toMatchSnapshot();
  });
});
