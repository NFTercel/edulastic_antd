/* eslint-disable class-methods-use-this */
import Header from "../../itemDetail/header";
import Helpers from "../../../../util/Helpers";

class ChoiceMatrixStandardPage {
  constructor() {
    this.header = new Header();

    this.numerationOption = {
      Numerical: "number",
      "Uppercase alphabet": "upper-alpha",
      "Lowercase alphabet": "lower-alpha"
    };

    this.fontSizeOption = {
      Small: "small",
      Normal: "normal",
      Large: "large",
      "Extra Large": "xlarge",
      Huge: "xxlarge"
    };

    this.matrixOption = {
      Inline: "inline",
      Table: "table"
    };

    this.stemNumerationOption = {
      Numerical: "number",
      "Uppercase alphabet": "upper-alpha",
      "Lowercase alphabet": "lower-alpha"
    };
  }

  // question content
  getQuestionEditor() {
    return cy.get('[data-placeholder="Enter question"]');
  }

  // choices
  getChoiceByIndex(index) {
    const selector = `#idlist1${index}`;
    return cy
      .get(selector)
      .next()
      .find(".ql-editor");
  }

  deleteChoiceByIndex(index) {
    const selector = `[data-cy=deletelist1${index}]`;
    cy.get(selector).click();
    return this;
  }

  getallChoices() {
    return cy
      .contains("div", "Multiple Choice Options")
      .next()
      .find(".ql-editor");
  }

  addNewChoice() {
    cy.contains("div", "Multiple Choice Options")
      .next()
      .next()
      .contains("Add new choice")
      .should("be.visible")
      .click({ force: true });
    return this;
  }

  // steams
  getSteamByIndex(index) {
    const selector = `#idlist2${index}`;
    return cy
      .get(selector)
      .next()
      .find(".ql-editor");
  }

  deleteSteamByIndex(index) {
    const selector = `[data-cy=deletelist2${index}]`;
    cy.get(selector).click();
    return this;
  }

  getallSteam() {
    return cy
      .contains("div", "Steams")
      .next()
      .find(".ql-editor");
  }

  addNewSteam() {
    cy.contains("div", "Steams")
      .next()
      .next()
      .contains("Add new choice")
      .should("be.visible")
      .click({ force: true });
    return this;
  }

  // correct ans
  getCorrectAnsTable() {
    return cy
      .get("table")
      .children()
      .get("tr.ant-table-row");
  }

  addAlternate() {
    cy.get('[data-cy="alternate"]')
      .should("be.visible")
      .click();
    return this;
  }

  getAlternates() {
    return cy
      .contains("div", "Set Correct Answer(s)")
      .next()
      .contains("span", "Alternate");
  }

  deleteAlternate() {
    cy.get('[data-cy="del-alter"]')
      .should("be.visible")
      .click();

    cy.contains("div", "Set Correct Answer(s)")
      .next()
      .contains("div", "Alternate")
      .should("not.be.visible");

    cy.contains("div", "Set Correct Answer(s)")
      .next()
      .contains("div", "Correct")
      .should("be.visible")
      .click();
    return this;
  }

  getMultipleResponse() {
    return cy.contains("Multiple responses").should("be.visible");
  }

  // advance options
  clickOnAdvancedOptions() {
    cy.get("body")
      .contains("span", "Advanced Options")
      .should("be.visible")
      .click();
    return this;
  }

  selectMatrixStyle(option) {
    const selectOp = `[data-cy="${this.matrixOption[option]}"]`;
    cy.get('[data-cy="matrixStyle"]')
      .should("be.visible")
      .click()
      .as("matrixStyle");

    cy.get(selectOp)
      .should("be.visible")
      .click();

    cy.get("@matrixStyle")
      .find(".ant-select-selection-selected-value")
      .should("contain", option);

    return this;
  }

  selectStemNumeration(option) {
    const selectOp = `[data-cy="${this.stemNumerationOption[option]}"]`;
    cy.get('[data-cy="stemNum"]')
      .should("be.visible")
      .click();

    cy.get(selectOp)
      .should("be.visible")
      .click();

    cy.get('[data-cy="stemNum"]')
      .find(".ant-select-selection-selected-value")
      .should("contain", option);

    return this;
  }

  selectFontSize(option) {
    const selectOp = `[data-cy="${this.fontSizeOption[option]}"]`;
    cy.get('[data-cy="fontSizeSelect"]')
      .should("be.visible")
      .click();

    cy.get(selectOp)
      .should("be.visible")
      .click();

    cy.get('[data-cy="fontSizeSelect"]')
      .find(".ant-select-selection-selected-value")
      .should("contain", option);

    return this;
  }

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

  getMatrixTable() {
    return Helpers.getElement("matrixTable")
      .find("table")
      .should("be.visible");
  }

  getStemNumerationSelect() {
    return Helpers.getElement("stemNum");
  }

  checkFontSize(fontSize) {
    this.header.preview();
    this.getMatrixTable()
      .should("have.css", "font-size")
      .and("eq", fontSize);

    this.header.edit();
  }

  checkMatrixStyle(option) {
    this.header.preview();

    if (option === "Inline") {
      this.getMatrixTable()
        .find("thead th div")
        .each($el => {
          cy.wrap($el).should("be.empty");
        });
    }

    if (option === "Table") {
      this.getMatrixTable()
        .find("thead tr")
        .eq(1)
        .find("div")
        .each($el => {
          cy.wrap($el).should("not.be.empty");
        });
    }

    this.header.edit();
  }

  checkDividers(checked) {
    this.header.preview();

    if (checked) {
      this.getMatrixTable()
        .find("tbody td")
        .each($el => {
          cy.wrap($el)
            .should("have.css", "border-top-width")
            .and("eq", "1px");

          cy.wrap($el)
            .should("have.css", "border-bottom-width")
            .and("eq", "1px");
        });
    } else {
      this.getMatrixTable()
        .find("tbody td")
        .each($el => {
          cy.wrap($el)
            .should("have.css", "border-top-width")
            .and("eq", "0px");

          cy.wrap($el)
            .should("have.css", "border-bottom-width")
            .and("eq", "0px");
        });
    }

    this.header.edit();
  }

  checkStemNumeration(type) {
    this.header.preview();
    const upperLetters = ["A", "B", "C", "D"];
    const lowerLetters = ["a", "b", "c", "d"];

    // eslint-disable-next-line default-case
    switch (type) {
      case "number":
        this.getMatrixTable()
          .find("tbody tr td:first-child")
          .each(($el, index) => {
            cy.wrap($el).should("contain", `${index + 1}`);
          });
        break;
      case "upper-alpha":
        this.getMatrixTable()
          .find("tbody tr td:first-child")
          .each(($el, index) => {
            cy.wrap($el).should("contain", upperLetters[index]);
          });
        break;
      case "lower-alpha":
        this.getMatrixTable()
          .find("tbody tr td:first-child")
          .each(($el, index) => {
            cy.wrap($el).should("contain", lowerLetters[index]);
          });
        break;
    }

    this.header.edit();
  }

  getStemColumnTitle() {
    return Helpers.getElement("stemColumnTitle")
      .next()
      .find(".ql-editor");
  }

  checkTableTitle(text) {
    this.header.preview();

    this.getMatrixTable()
      .find("thead")
      .should("contain", text);

    this.header.edit();
  }

  checkTableColumnWidth(columnIndex, width) {
    this.header.preview();

    this.getMatrixTable()
      .find("tbody tr")
      .eq(0)
      .find("td")
      .eq(columnIndex)
      .should("have.css", "width")
      .and("eq", `${width}px`);

    this.header.edit();
  }

  getOptionRowTitle() {
    return Helpers.getElement("optionRowTitle")
      .next()
      .find(".ql-editor");
  }

  getStemWidth() {
    return Helpers.getElement("stemWidth");
  }

  getOptionWidth() {
    return Helpers.getElement("optionWidth");
  }

  getDividersCheckbox() {
    return Helpers.getElement("dividersCheckbox");
  }
}

export default ChoiceMatrixStandardPage;
