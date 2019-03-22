/* eslint-disable class-methods-use-this */
import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";
import Helpers from "../../../../util/Helpers";

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

  getLayout() {
    return Helpers.getElement("layout");
  }

  getFontSizeSelect() {
    return Helpers.getElement("fontSizeSelect");
  }

  getSmallFontSizeOption() {
    return Helpers.getElement("small");
  }

  getNormalFontSizeOption() {
    return Helpers.getElement("normal");
  }

  getLargeFontSizeOption() {
    return Helpers.getElement("large");
  }

  getExtraLargeFontSizeOption() {
    return Helpers.getElement("xlarge");
  }

  getHugeFontSizeOption() {
    return Helpers.getElement("xxlarge");
  }

  getMaxSelection() {
    return Helpers.getElement("maxSelectionOption").should("be.visible");
  }

  getPreviewWrapper() {
    return Helpers.getElement("previewWrapper").should("be.visible");
  }

  checkFontSize(fontSize) {
    this.header.preview();
    this.getPreviewWrapper()
      .should("have.css", "font-size")
      .and("eq", fontSize);

    this.header.edit();
  }
}

export default TokenhighLightPage;
