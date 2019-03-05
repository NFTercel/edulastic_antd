import { loadAssessment } from "../assessment";

describe("Assessment", () => {
  it("assessment should return an action", () => {
    expect(
      loadAssessment({
        id: 1,
        name: "vasilev"
      })
    ).toMatchSnapshot();
  });
});
