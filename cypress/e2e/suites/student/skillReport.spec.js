import SkillReportsPage from "../../framework/student/skillReportsPage";
import FileHelper from "../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Test SkillReport Page`, () => {
  before(() => {
    cy.setToken("student");
    cy.visit("/home/skill-report");
  });
  const skillReportsPage = new SkillReportsPage();
  it("Visit SkillReport Page", () => {
    skillReportsPage.isVisible();
    // skillReportsPage.onRatioClick();
  });
});
