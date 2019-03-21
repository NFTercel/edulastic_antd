import FileHelper from "../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Check Create Test Flow`, () => {
  beforeEach(() => {
    cy.setToken();
    cy.visit("/author/tests/create");
  });

  it("Visit Create Test Page", () => {
    /* eslint-disable */
    cy.wait(5000);

    // Add test items
    cy.get("button")
      .eq(4)
      .find("span")
      .should("contain", "ADD");
    cy.get("button")
      .eq(4)
      .click();

    cy.get("button")
      .eq(5)
      .find("span")
      .should("contain", "ADD");
    cy.get("button")
      .eq(5)
      .click();

    cy.get("button")
      .eq(6)
      .find("span")
      .should("contain", "ADD");
    cy.get("button")
      .eq(6)
      .click();
    cy.get("button")
      .eq(7)
      .find("span")
      .should("contain", "ADD");
    cy.get("button")
      .eq(7)
      .click();
    cy.get("button")
      .eq(8)
      .find("span")
      .should("contain", "ADD");
    cy.get("button")
      .eq(8)
      .click();

    //remove test item
    cy.get("button")
      .eq(8)
      .find("span")
      .should("contain", "REMOVE");
    cy.get("button")
      .eq(8)
      .click();

    //click on save
    cy.contains("Save changes").click();

    // Summary Tab Test

    cy.contains("Summary").click();

    cy.get("[data-cy=inputTest]")
      .clear()
      .type("Nice Product!");

    cy.get("textarea")
      .eq(0)
      .focus()
      .clear()
      .type("This is a description for test!");

    // Review Tab Test

    cy.contains("Review").click();

    // Review tab should contain expected buttons

    cy.get("button")
      .eq(3)
      .find("span")
      .should("contain", "Remove Selected");
    cy.get("button")
      .eq(4)
      .find("span")
      .should("contain", "Move to");
    cy.get("button")
      .eq(6)
      .find("span")
      .should("contain", "Collapse Rows");

    cy.contains("Save changes").click();
  });
});
