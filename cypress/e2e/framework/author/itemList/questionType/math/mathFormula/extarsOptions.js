/* eslint-disable class-methods-use-this */
import EditToolBar from "../../common/editToolBar";
import Header from "../../../itemDetail/header";

class ExtrasOptions {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  getAcknowledgements() {
    return cy
      .get('[data-cy="acknowledgements"]')
      .next()
      .find(".ql-editor");
  }

  getDistractorRationale() {
    return cy
      .get('[data-cy="distractor_rationale"]')
      .next()
      .find(".ql-editor");
  }

  getRubricReference() {
    return cy
      .get('[data-cy="rubric_reference"]')
      .next()
      .find(".ql-editor");
  }

  getStimulusReview() {
    return cy
      .get('[data-cy="stimulus_review"]')
      .next()
      .find(".ql-editor");
  }

  getInstructorStimulus() {
    return cy
      .get('[data-cy="instructor_stimulus"]')
      .next()
      .find(".ql-editor");
  }

  getSampleAnswer() {
    return cy
      .get('[data-cy="sample_answer"]')
      .next()
      .find(".ql-editor");
  }

  /**
  |--------------------------------------------------
  | Distractors
  |--------------------------------------------------
  */

  getDistractorList() {
    return cy.get('[data-cy="distractorList"]');
  }

  getAddDistractorButton() {
    return this.getDistractorList()
      .find('[data-cy="addButton"]')
      .should("be.visible");
  }

  clickAddDistractorButton() {
    this.getAddDistractorButton()
      .should("be.visible")
      .click();

    return this;
  }

  deleteAllDistractors() {
    const distractors = Cypress.$('[data-cy="distractorList"]').find('[data-cy="deleteButton"]');

    if (distractors.length) {
      this.getDistractorList()
        .find('[data-cy="deleteButton"]')
        .each($el => {
          cy.wrap($el).click();
        });
    }

    return this;
  }

  /**
  |--------------------------------------------------
  | Hints
  |--------------------------------------------------
  */

  getHintsList() {
    return cy.get('[data-cy="hintsList"]');
  }

  getAddHintButton() {
    return this.getHintsList()
      .find('[data-cy="addButton"]')
      .should("be.visible");
  }

  clickAddHintButton() {
    this.getAddHintButton()
      .should("be.visible")
      .click();

    return this;
  }

  deleteAllHints() {
    const hints = Cypress.$('[data-cy="hintsList"]').find('[data-cypress="deleteButton"]');

    if (hints.length) {
      this.getHintsList()
        .find('[data-cypress="deleteButton"]')
        .each($el => {
          cy.wrap($el).click();
        });
    }

    return this;
  }
}

export default ExtrasOptions;
