import { updatePreviewListAction, changePreviewTabAction } from "../preview";

describe("Preview", () => {
  it("update preview list should return an action", () => {
    expect(updatePreviewListAction({})).toMatchSnapshot();
  });

  it("change preview tab should return an action", () => {
    expect(changePreviewTabAction("check")).toMatchSnapshot();
    expect(changePreviewTabAction("show")).toMatchSnapshot();
    expect(changePreviewTabAction("clear")).toMatchSnapshot();
  });
});
