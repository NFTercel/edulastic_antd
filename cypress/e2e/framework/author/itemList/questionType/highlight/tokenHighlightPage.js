import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class TokenhighLightPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  // question content
  getQuestionEditor() {
    return cy.get('[data-placeholder="Enter question"');
  }

  // template
  editTemplate() {
    return cy.get("body").contains("Edit template");
  }

  getTemplateEditor() {
    return cy
      .get("#template")
      .next()
      .find(".ql-editor");
  }

  // token
  editToken() {
    return cy.get("body").contains("Edit token");
  }

  paragraph() {
    return cy.get("body").contains("button", "Paragraph");
  }

  sentence() {
    return cy.get("body").contains("button", "Sentence");
  }

  word() {
    return cy.get("body").contains("button", "Word");
  }

  getAllTokens() {
    return this.editToken()
      .parent()
      .siblings()
      .filter(".token");
  }

  // correct
  getPoint() {
    return cy.get('[data-cy="points"]');
  }

  getAllTokenAnswer() {
    return cy
      .contains("Set Correct Answer(s)")
      .siblings()
      .find(".answer");
  }

  goToEditToken() {
    this.editToken().click();
  }

  goToEditTemplate() {
    this.editTemplate().click();
  }

  // preview
  getAllTokenOnPreview() {
    return cy.get(".token.answer");
  }
}

export default TokenhighLightPage;
