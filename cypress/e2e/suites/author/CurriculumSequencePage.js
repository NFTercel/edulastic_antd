/* eslint-disable-next-line */
/// <reference types="Cypress" />

describe("Check Curriculum Sequence Page", () => {
  beforeEach(() => {
    cy.setToken();
    cy.visit("/author/curriculum-sequence");
  });

  it("Should add a new unit", () => {
    // Remove cypress unit if exists
    cy.get("[data-cy=curriculumModuleRow]").then(el => {
      if (el.find(":contains(Module Cypress Unit)").length > 0) {
        el.find(":contains(Module Cypress Unit)")
          .find("[data-cy=removeUnit]")
          .click();
      }
    });

    cy.get("[data-cy=openAddUnit]")
      .eq(0)
      .click();

    cy.get("[data-cy=addNewUnitInputName]").type("Module Cypress Unit: Test Unit");

    cy.get("[data-cy=addUnitSave]").click();

    cy.get("[data-cy=curriculumModuleRow]").contains("Module Cypress Unit");
  });

  it("Should assign an item", () => {
    // Delete test unit if exists
    cy.get("[data-cy=curriculumModuleRow]").then(el => {
      // debugger;
      if (el.find(":contains(Module Cypress Unit)").length > 0) {
        el.find(":contains(Module Cypress Unit)")

          .find("[data-cy=removeUnit]")
          .click();

        cy.get("[data-cy=openAddUnit]")
          .eq(0)
          .click();

        cy.get("[data-cy=addNewUnitInputName]").type("Module Cypress Unit: Test Unit");

        cy.get("[data-cy=addUnitSave]").click();
        cy.get("[data-cy=curriculumModuleRow]").contains("Module Cypress Unit");
      } else {
        cy.get("[data-cy=openAddUnit]")
          .eq(0)
          .click();

        cy.get("[data-cy=addNewUnitInputName]").type("Module Cypress Unit: Test Unit");

        cy.get("[data-cy=addUnitSave]").click();

        // cy.wait(10000);
      }

      cy.get(".ant-message-notice").contains("Successfully saved");

      cy.contains("Module Cypress Unit");

      cy.log("sad bi trebalo da ima cypress unit");
      cy.debug();
      /* Add an item to make sure we have something to assign */
      cy.get("[data-cy=openAddContent]")
        .eq(0)
        .click();

      // expand content unit
      cy.get("[data-cy=expandCollapseContentUnit]")
        .eq(0)
        .click();

      // add content item to curriculum sequence first module
      cy.get("[data-cy=assignContentIcon]")
        .eq(0)
        .trigger("mouseover");

      cy.get("[data-cy=addContentMenuItem]")
        .eq(1)
        .click();

      // find module row, click expand collapse
      cy.get("[data-cy=curriculumModuleRow]")
        .eq(1)
        .find("[data-cy=expandCollapseAssignments]")
        .click();

      // Click on assing button inside module row and check if modal is showing
      cy.get("[data-cy=assignButton]").click();

      // Select class in modal
      cy.get("[data-cy=selectClass]")
        .click()
        .get("[data-cy=class]")
        .click();

      // Click apply button on modal
      cy.get("[data-cy=apply]").click();

      cy.get("[data-cy=curriculumModuleRow]")
        .eq(1)
        .contains("ASSIGNED");
    });
  });

  // Module assigment
  it("Should assign all items of the module (ones that have testIds)", () => {
    /* Add an item to make sure we have something to assign */
    cy.get("[data-cy=openAddContent]")
      .eq(0)
      .click();

    cy.get("[data-cy=expandCollapseContentUnit]")
      .eq(0)
      .click();

    // Expand and assign
    cy.get("[data-cy=assignContentIcon]")
      .eq(1)
      .trigger("mouseover");

    cy.get("[data-cy=addContentMenuItem]")
      .eq(1)
      .click();

    // Assign whole module
    cy.get("[data-cy=AssignWholeModule]")
      .eq(0)
      .click();

    // Select class in modal
    cy.get("[data-cy=selectClass]")
      .click()
      .get("[data-cy=class]")
      .click();

    // Click apply button on modal
    cy.get("[data-cy=apply]").click();
    cy.get(".ant-message-notice").contains("Successfully assigned");
  });

  it("Existing item should not be added to the module", () => {
    // openAddContent
    cy.get("[data-cy=openAddContent]")
      .eq(0)
      .click();

    // expand content unit
    cy.get("[data-cy=expandCollapseContentUnit]")
      .eq(0)
      .click();

    // add content item to curriculum sequence first module
    cy.get("[data-cy=assignContentIcon]")
      .eq(0)
      .trigger("mouseover");

    cy.get("[data-cy=addContentMenuItem]")
      .eq(0)
      .click();

    // test number of items in first module row
    cy.get("[data-cy=curriculumModuleRow]")
      .eq(0)
      .find("[data-cy=totalAssigned]")
      .then(el => Number(el.text()))
      .then(initialTotalAssigned => {
        cy.get("[data-cy=assignContentIcon]")
          .eq(0)
          .trigger("mouseover");

        cy.get("[data-cy=addContentMenuItem]")
          .eq(0)
          .click();

        cy.get("[data-cy=curriculumModuleRow]")
          .eq(0)
          .find("[data-cy=totalAssigned]")
          .then(el => {
            const totalAssignedAfter = Number(el.text());
            expect(initialTotalAssigned).to.equal(totalAssignedAfter);
          });
      });
  });

  it("Should add and remove first assigment", () => {
    cy.get("[data-cy=curriculumModuleRow]")
      .eq(0)
      .find("[data-cy=totalAssigned]")
      .then(el => Number(el.text()))
      .then(initialTotalAssigned => {
        /* Add first item */
        cy.get("[data-cy=openAddContent]")
          .eq(0)
          .click();

        // expand content unit
        cy.get("[data-cy=expandCollapseContentUnit]")
          .eq(0)
          .click();

        // add content item to curriculum sequence first module
        cy.get("[data-cy=assignContentIcon]")
          .eq(0)
          .trigger("mouseover");

        cy.get("[data-cy=addContentMenuItem]")
          .eq(0)
          .click();

        cy.get("[data-cy=curriculumModuleRow]")
          .eq(0)
          .find("[data-cy=totalAssigned]")
          .then(el => {
            const numberOfItemsAfterAdd = Number(el.text());
            // debugger;
            if (numberOfItemsAfterAdd !== initialTotalAssigned + 1) {
              // debugger;
              cy.get(".ant-message-notice").contains(/exists/gi);

              // See if the number of items match
              cy.get("[data-cy=curriculumModuleRow]")
                .eq(0)
                .find("[data-cy=totalAssigned]")
                .then(totalAssignedEl => {
                  const numberOfItemsAfterRemove = Number(totalAssignedEl.text());
                  expect(numberOfItemsAfterRemove, "After remove").to.equal(initialTotalAssigned);
                });
            } else {
              expect(numberOfItemsAfterAdd, "After trying to add duplicated item").to.equal(initialTotalAssigned + 1);

              /* remove added item */
              // find module row, click expand collapse
              cy.get("[data-cy=curriculumModuleRow]")
                .eq(0)
                .find("[data-cy=expandCollapseAssignments]")
                .click();

              // Click on more icon
              cy.get("[data-cy=curriculumModuleRow]")
                .eq(0)
                .find("[data-cy=assignmentMoreOptionsIcon]")
                .eq(0)
                .click();

              // Find Menu and make sure it's visible
              cy.get("[data-cy=moduleItemMoreMenu]")
                .parent()
                .should("not.have.class", "ant-dropdown-hidden");

              cy.get("[data-cy=moduleItemMoreMenuItem]").click();

              cy.get("[data-cy=curriculumModuleRow]")
                .eq(0)
                .find("[data-cy=totalAssigned]")
                .then(totalAssignedEl => {
                  const numberOfItemsAfterRemove = Number(totalAssignedEl.text());
                  expect(numberOfItemsAfterRemove, "After remove").to.equal(initialTotalAssigned);
                });
            }
            // expect(numberOfItemsAfterAdd, "After add").to.equal(initialTotalAssigned + 1);
          });
      });
  });

  it("Should assign an item NOW (add to misc)", () => {
    /* Add an item to make sure we have something to assign */
    cy.get("[data-cy=openAddContent]")
      .eq(0)
      .click();

    // expand content unit
    cy.get("[data-cy=expandCollapseContentUnit]")
      .eq(0)
      .click();

    // add content item to curriculum sequence first module
    cy.get("[data-cy=assignContentIcon]")
      .eq(0)
      .trigger("mouseover");

    cy.get("[data-cy=addContentMenuItemAssignNow]").click();

    cy.get("[data-cy=curriculumModuleRow]").then(el => {
      // debugger;
      // cy.debug();
      if (Cypress.$(el).text() === "Misc" && Cypress.$(el).find("> [data-cy=removeUnit]").length === 1) {
        const actualLength = el.find("[data-cy=moduleAssignment]").length;

        expect(actualLength).to.be.greaterThan(0);
      }
    });

    cy.get(".ant-message-notice").contains(/success|exists/gi);

    // Should not add more than one misc unit
    cy.get("[data-cy=curriculumModuleRow]")
      .contains("Misc")
      .should("have.length", 1);
  });

  it("Should save the curriculum sequence", () => {
    // Remove cypress unit if exists
    cy.get("[data-cy=curriculumModuleRow]").then(el => {
      if (el.find(":contains(Module Cypress Unit)").length > 0) {
        el.find(":contains(Module Cypress Unit)")
          .find("[data-cy=removeUnit]")
          .click();
      }
    });

    cy.get("[data-cy=saveCurriculumSequence]").click();
    cy.get(".ant-message-notice").contains("Success");
  });
  // Add item to module
});
