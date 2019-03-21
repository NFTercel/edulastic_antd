import SidebarPage from "../../framework/student/sidebarPage";
import FileHelper from "../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >>Test Sidebar Page`, () => {
  before(() => {
    cy.visit("/home/dashboard");
  });
  const sidebar = new SidebarPage();
  it("Visit Sidebar Page", () => {
    sidebar.onClickMenuItems();
    sidebar.onClickCollapse();
    sidebar.isVisible();
    sidebar.onClickUserInfo();
  });
});
