import { getDictCurriculumsAction, getDictStandardsForCurriculumAction } from "../dictionaries";

describe("Dictionaries", () => {
  it("get DicCurriculums should return an action", () => {
    expect(getDictCurriculumsAction()).toMatchSnapshot();
  });

  it("get DicStandardsForCurriculum should return an action", () => {
    expect(getDictStandardsForCurriculumAction("5e26tw6q21", 5, "search")).toMatchSnapshot();
  });
});
