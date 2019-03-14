import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class HighlightImage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  // get current question from Store

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

  clickAddColor = () => {
    cy.contains("span", "Add new color")
      .closest("button")
      .should("be.visible")
      .click();
    return this;
  };
}

export default HighlightImage;
