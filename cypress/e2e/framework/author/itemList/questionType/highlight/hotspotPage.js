/* eslint-disable class-methods-use-this */
import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";
import Helpers from "../../../../util/Helpers";

class HotspotPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  // get current question from Store

  checkFontSize(fontSize) {
    this.header.preview();
    Helpers.getElement("stimulus")
      .should("have.css", "font-size")
      .and("eq", fontSize);

    this.header.edit();
  }

  getHotspotMap() {
    return Helpers.getElement("hotspotMap");
  }

  getCurrentStoreQuestion = () => {
    const storeValue = JSON.parse(window.localStorage.getItem("persist:root")).authorQuestions;
    const currentId = JSON.parse(storeValue).current;
    return JSON.parse(storeValue).byId[currentId];
  };

  getDropZoneImageContainer = () => cy.get('[data-cy="dropzone-image-container"]');

  changeImageWidth = width => {
    cy.get('[data-cy="image-width-input"]')
      .click()
      .clear()
      .type("{selectall}")
      .type(width)
      .should("have.value", width);
    return this;
  };

  changeImageHeight = height => {
    cy.get('[data-cy="image-height-input"]')
      .click()
      .clear()
      .type("{selectall}")
      .type(height)
      .should("have.value", height);
    return this;
  };

  addImageAlternative = altText => {
    cy.get('[data-cy="image-alternative-input"]')
      .click()
      .clear()
      .type(altText)
      .should("have.value", altText);
    return this;
  };

  clickDrawMode = () => {
    cy.get('[data-cy="area-draw-mode"]')
      .click()
      .then($el => {
        cy.wrap($el).should("have.css", "background-color", "rgb(255, 255, 255)");
      });
    return this;
  };

  clickDeleteMode = () => {
    cy.get('[data-cy="area-delete-mode"]')
      .click()
      .then($el => {
        cy.wrap($el).should("have.css", "background-color", "rgb(255, 255, 255)");
      });
    return this;
  };

  getDrawArea = () => cy.get("#svg-control-block");

  getAnswerContainer = () => cy.get('[data-cy="answer-container"]');

  clickAreaUndo = () =>
    cy
      .get('[data-cy="area-undo"]')
      .parent()
      .click();

  clickAreaRedo = () =>
    cy
      .get('[data-cy="area-redo"]')
      .parent()
      .click();

  clickAreaClear = () =>
    cy
      .get('[data-cy="area-clear"]')
      .parent()
      .click();

  addAlternate = () => {
    cy.get('[data-cy="alternate"]')
      .should("be.visible")
      .click();
    return this;
  };

  getAddedAlternate = () => cy.get('[data-cy="del-alter"]');

  getPontsInput = () => cy.get('[data-cy="points"]');

  getMultipleCheck = () => cy.contains("span", "Multiple responses").closest("label");

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

  getMaxWidth() {
    return Helpers.getElement("maxWidthOption");
  }

  getStemNumeration() {
    return Helpers.getElement("responseContainerPositionOption");
  }

  getNumericalStemOption() {
    return Helpers.getElement("numerical");
  }

  getUpperAlphaOption() {
    return Helpers.getElement("upper-alpha");
  }

  getLowerAlphaOption() {
    return Helpers.getElement("lower-alpha");
  }
}

export default HotspotPage;
