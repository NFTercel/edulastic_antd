/* eslint-disable class-methods-use-this */
import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";
import Helpers from "../../../../util/Helpers";

class ClassificationPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  // question content
  getQuestionEditor = () => cy.get('[data-placeholder="Enter question"');

  getDropDownColumn = () => cy.get('[data-cy="classification-column-dropdown"]');

  getDropDownListColumn = index => cy.get(`[data-cy="coloumn-dropdown-list-${index}"]`);

  getDropDownRow = () => cy.get('[data-cy="classification-row-dropdown"]');

  getDropDownListRow = index => cy.get(`[data-cy="row-dropdown-list-${index}"]`);

  getColumnTitleInptuList = () => cy.get('[data-cy="column-container"]').find("div .ql-editor");

  getColumnAddButton = () =>
    cy
      .get('[data-cy="column-container"]')
      .contains("span", "Add new column")
      .parent()
      .should("be.visible");

  getColumnDeleteByIndex = index => cy.get(`[data-cy="deletecolumns${index}"]`);

  getRowTitleInptuList = () => cy.get('[data-cy="row-container"]').find("div .ql-editor");

  getRowAddButton = () =>
    cy
      .get('[data-cy="row-container"]')
      .contains("span", "Add new row")
      .parent()
      .should("be.visible");

  getRowDeleteByIndex = index => cy.get(`[data-cy="deleterows${index}"]`);

  getGroupResponsesCheckbox = () =>
    cy
      .contains("span", "Group possible responses")
      .closest("label")
      .should("be.visible");

  getGroupContainerByIndex = index => cy.get(`[data-cy="group-container-${index}"]`);

  getTitleInputByIndex = index => {
    const group = this.getGroupContainerByIndex(index);
    return group
      .contains("div", "Title")
      .next()
      .should("be.visible");
  };

  getAddNewChoiceByIndex = index => {
    const group = this.getGroupContainerByIndex(index);
    return group.contains("span", "Add new choice").closest("button");
  };

  getChoiceListByGroup = index => {
    const group = this.getGroupContainerByIndex(index);
    return group
      .find('[data-cy="group-choices"]')
      .children()
      .first()
      .children();
  };

  deleteChoiceByGroup = (gIndex, index) => {
    cy.get(`[data-cy="deletegroup${gIndex}${index}"]`).click();
    return this;
  };

  getChoiceEditorByGroup = (gIndex, index) => cy.get(`#idgroup${gIndex}${index}`);

  getDragDropBox = () => cy.contains("h3", "Drag & Drop the answer").next();

  getAddNewGroupButton = () =>
    cy
      .contains("span", "ADD NEW GROUP")
      .closest("button")
      .should("be.visible");

  getPontsInput = () => cy.get('[data-cy="points"]');

  getDragDropItemByIndex = index => cy.get(`[data-cy="drag-drop-item-${index}"]`);

  getDragDropBoardByIndex = index => cy.get(`[data-cy="drag-drop-board-${index}"]`).find(">div");

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

  getHugeFontSizeOption() {
    return Helpers.getElement("xxlarge");
  }

  getClassificationPreview() {
    return Helpers.getElement("classificationPreview");
  }

  getClassificationPreviewWrapper() {
    return this.getClassificationPreview().find('[data-cy="classificationPreviewWrapper"]');
  }

  getResponseContainerPositionSelect() {
    return Helpers.getElement("responseContainerPositionSelect");
  }

  getTopResContainerOption() {
    return Helpers.getElement("top");
  }

  getBottomResContainerOption() {
    return Helpers.getElement("bottom");
  }

  getLeftResContainerOption() {
    return Helpers.getElement("left");
  }

  getRightResContainerOption() {
    return Helpers.getElement("right");
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

  getRowTitlesWidthInput() {
    return Helpers.getElement("rowTitlesWidthInput");
  }

  getRowHeaderInput() {
    return Helpers.getElement("rowHeaderInput")
      .next()
      .find(".ql-editor");
  }

  getMaximumResponsesPerCellInput() {
    return Helpers.getElement("maximumResponsesPerCellInput");
  }

  getRowMinHeightInput() {
    return Helpers.getElement("rowMinHeightInput");
  }

  checkFontSize(fontSize) {
    this.header.preview();

    this.getClassificationPreview()
      .should("have.css", "font-size")
      .and("eq", fontSize);

    this.header.edit();
  }

  checkRowTitlesWidth(width) {
    this.header.preview();

    this.getClassificationPreview()
      .find('div[data-cy="drag-drop-board-0"]')
      .should("have.css", "width")
      .and("eq", width);

    this.getClassificationPreview()
      .find('div[data-cy="drag-drop-board-1"]')
      .should("have.css", "width")
      .and("eq", width);

    this.header.edit();
  }

  checkRowTitlesMinHeight(height) {
    this.header.preview();

    this.getClassificationPreview()
      .find('div[data-cy="drag-drop-board-0"]')
      .should("have.css", "min-height")
      .and("eq", height);

    this.getClassificationPreview()
      .find('div[data-cy="drag-drop-board-1"]')
      .should("have.css", "min-height")
      .and("eq", height);

    this.header.edit();
  }

  checkRowHeader(text) {
    this.header.preview();

    this.getClassificationPreview()
      .find('[data-cy="rowHeader"]')
      .should("contain", text);

    this.header.edit();
  }

  checkResponseContainerPosition(position) {
    this.header.preview();

    switch (position) {
      case "top":
        this.getClassificationPreviewWrapper()
          .should("have.css", "flex-direction")
          .and("eq", "column-reverse");
        break;
      case "bottom":
        this.getClassificationPreviewWrapper()
          .should("have.css", "flex-direction")
          .and("eq", "column");
        break;
      case "left":
        this.getClassificationPreviewWrapper()
          .should("have.css", "flex-direction")
          .and("eq", "row-reverse");
        break;
      case "right":
        this.getClassificationPreviewWrapper()
          .should("have.css", "flex-direction")
          .and("eq", "row");
        break;
      default:
        break;
    }

    this.header.edit();
  }
}

export default ClassificationPage;
