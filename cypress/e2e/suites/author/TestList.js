import FileHelper from "../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Create a new test`, () => {
  beforeEach(() => {
    cy.setToken();
  });

  it("Visit Create Test Page", () => {
    cy.visit("/author/tests");
    cy.contains("Create").click({ force: true });
    cy.contains("Create new Item").click();
    cy.contains("Create").click();
    cy.contains("Add New").click();
    cy.contains("Fill in the Blanks").click();
    cy.contains("Label Image with Drop Down").click();
  });
});
