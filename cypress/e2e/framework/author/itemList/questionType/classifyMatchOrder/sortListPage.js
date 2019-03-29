/* eslint-disable class-methods-use-this */
import Header from "../../itemDetail/header";
import Helpers from "../../../../util/Helpers";

class SortListPage {
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

  // advance options
  clickOnAdvancedOptions() {
    cy.get("body")
      .contains("span", "Advanced Options")
      .should("be.visible")
      .click();
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

  getSortListPreview() {
    return Helpers.getElement("sortListPreview");
  }

  getSortListComponent() {
    return Helpers.getElement("sortListComponent");
  }

  getOrientationSelect() {
    return Helpers.getElement("orientationSelect");
  }

  getHorizontalOption() {
    return Helpers.getElement("horizontal");
  }

  getVerticalOption() {
    return Helpers.getElement("vertical");
  }

  checkFontSize(fontSize) {
    this.header.preview();

    this.getSortListPreview()
      .should("have.css", "font-size")
      .and("eq", fontSize);

    this.header.edit();
  }

  checkOrientation(orientation) {
    this.header.preview();

    if (orientation === "horizontal") {
      this.getSortListComponent()
        .should("have.css", "flex-direction")
        .and("eq", "row");
    }

    if (orientation === "vertical") {
      this.getSortListComponent()
        .should("have.css", "flex-direction")
        .and("eq", "column");
    }

    this.header.edit();
  }
}

export default SortListPage;
