/* eslint-disable class-methods-use-this */
import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";
import Helpers from "../../../../util/Helpers";

class OrderListPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  // question content
  getListInputs = () =>
    cy
      .get('[data-cy="list-container"]')
      .next()
      .find("div .ql-editor");

  getAddInputButton = () =>
    cy
      .contains("span", "Add new choice")
      .closest("button")
      .first();

  getListDeleteByIndex = index => cy.get(`[data-cy="deleteprefix${index}"]`);

  getPonitsInput = () => cy.get('[data-cy="points"]');

  getAnswerLists = () => cy.get(`[data-cy="sortable-list-container"]`).last();

  getPreviewList = () => cy.get('[data-cy="order-preview-container"]');

  addAlternate = () => {
    cy.get('[data-cy="alternate"]')
      .should("be.visible")
      .click();
    return this;
  };

  getAddedAlternate = () => cy.get('[data-cy="del-alter"]');

  getLayout() {
    return Helpers.getElement("layout").should("be.visble");
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

  getListStyleSelect() {
    return Helpers.getElement("listStyleOption");
  }

  getButtonListStyleOption() {
    return Helpers.getElement("button");
  }

  getListStyleOption() {
    return Helpers.getElement("list");
  }

  getInlineStyleOption() {
    return Helpers.getElement("inline");
  }

  getHugeFontSizeOption() {
    return Helpers.getElement("xxlarge");
  }

  getPreview() {
    return Helpers.getElement("order-preview-container");
  }

  getStemNumerationSelect() {
    return Helpers.getElement("stemNumerationSelect");
  }

  getNumericalOption() {
    return Helpers.getElement("numerical");
  }

  getUppercaseAlphabetOption() {
    return Helpers.getElement("upper-alpha");
  }

  getLowercaseAlphabetOption() {
    return Helpers.getElement("lower-alpha");
  }

  getSortableListContainer() {
    return Helpers.getElement("order-preview-container");
  }

  checkListStyle(type) {
    this.header.preview();

    // eslint-disable-next-line default-case
    switch (type) {
      case "button":
      case "list":
        this.getSortableListContainer()
          .children("div")
          .each($el => {
            cy.wrap($el)
              .should("have.css", "width")
              .and("gt", "400px");
          });
        break;
      case "inline":
        this.getSortableListContainer()
          .children("div")
          .each($el => {
            cy.wrap($el)
              .should("have.css", "width")
              .and("lt", "400px");
          });
    }

    this.header.edit();
  }

  checkFontSize(fontSize) {
    this.header.preview();

    this.getPreview()
      .should("have.css", "font-size")
      .and("eq", fontSize);

    this.header.edit();
  }
}

export default OrderListPage;
