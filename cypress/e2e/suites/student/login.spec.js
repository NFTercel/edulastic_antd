import LoginPage from "../../framework/student/loginPage";
import FileHelper from "../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Test Login Page`, () => {
  before(() => {
    cy.visit("/login");
  });
  const login = new LoginPage();
  it("(tc_231)Verify Student Login with invalild username", () => {
    login.fillLoginForm("juli3@snapwiz.com", "snapwiz");
    login.onClickSignin();
    login.emailErrormssg();
  });
  it("(tc_230)Verify Student Login", () => {
    login.fillLoginForm("auto.student3@snapwiz.com", "snapwiz");
    login.onClickSignin();
    login.checkUrl();
  });
});
