import { changePreview } from "../view";

describe("View", () => {
  it("change preview should return an action", () => {
    expect(changePreview({ view: "check" })).toMatchSnapshot();
  });
});
