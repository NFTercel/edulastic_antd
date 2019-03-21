import FileHelper from "../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Check Review Page`, () => {
  beforeEach(() => {
    cy.setToken();
    cy.visit("/author/tests/create");
  });

  it("Assign Page UI Test", () => {
    // Review Tab Test
    cy.visit("/author/tests/create");
    cy.contains("ASSIGN").click();

    cy.get("button")
      .find("span")
      .should("contain", "Add new assignment");

    cy.get("div").should("contain", "Class Name");
    cy.get("div").should("contain", "Open Policy");
    cy.get("div").should("contain", "Close Policy");
    cy.get("div").should("contain", "Open Date");
    cy.get("div").should("contain", "Close Date");
  });

  it("Assign Page Functional Test", () => {
    cy.contains("ASSIGN").click();

    cy.get("button")
      .contains("Add new assignment")
      .click();

    // check title
    cy.contains("New Assignment").should("be.visible");

    // select class
    cy.get("[data-cy=selectClass]").click();
    cy.get("[data-cy=class]")
      .contains("xmen")
      .click();
    cy.get("[data-cy=class]")
      .contains("mutant ninjas")
      .click();
    cy.get("[data-cy=class]")
      .contains("mutant ninjas")
      .click();
    cy.contains("Class/Group Section").click();

    // specific students
    // cy.get('[data-cy=specificStudent]').should('be.visible');
    // cy.get('[data-cy=specificStudent]').click();

    //select student

    // start date
    cy.get("[data-cy=startDate]").should("be.visible");
    cy.get("[data-cy=startDate]").click();
    cy.get("[data-cy=startDate]").click({ force: true });
    cy.wait(3000);

    //close date
    cy.get(".ant-calendar-today-btn ").click();

    //select open policy
    cy.get("[data-cy=openPolicy]").click();
    cy.get("[data-cy=open]")
      .contains("Automatically on Start Date")
      .click();

    //select close policy
    cy.get("[data-cy=closePolicy]").click();
    cy.get("[data-cy=close]")
      .contains("Automatically on Due Date")
      .click();

    //click on apply
    cy.get("[data-cy=apply]").click();
    cy.wait(2000);

    // edit assignment
    cy.get("[data-cy=edit]").click();

    // check title
    cy.contains("Edit Assignment").should("be.visible");

    //select class
    cy.get("[data-cy=selectClass]").click();
    cy.get("[data-cy=class]")
      .contains("mutant ninjas")
      .click();

    //click on apply
    cy.get("[data-cy=apply]").click();
    cy.wait(2000);
  });
});
