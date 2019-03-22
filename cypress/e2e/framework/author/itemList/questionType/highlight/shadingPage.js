/* eslint-disable class-methods-use-this */
import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";
import Helpers from "../../../../util/Helpers";

class ShadingPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  getStimulus() {
    return cy.get('[data-cy="stimulus"');
  }

  checkFontSize(fontSize) {
    this.header.preview();
    this.getStimulus()
      .should("have.css", "font-size")
      .and("eq", fontSize);
    this.header.edit();
  }

  // question content
  getQuestionEditor() {
    return cy.get('[data-placeholder="Enter question"');
  }

  // shading
  getShadingRowByIndex(index) {
    return cy
      .get("body")
      .contains("Shade cells")
      .siblings()
      .find("ul")
      .eq(index);
  }

  // correct ans
  getCorrectAnsRowByIndex(index) {
    return cy
      .get("body")
      .contains("Set Correct Answer(s)")
      .siblings()
      .find("ul")
      .eq(index);
  }

  // preview page

  getCorrectAnsRowByIndexOnPreview(que, index) {
    return cy
      .get("body")
      .contains(que)
      .parent()
      .siblings()
      .find("ul")
      .eq(index);
  }

  getLayout() {
    return Helpers.getElement("layout");
  }

  getMaxSelection() {
    return Helpers.getElement("maxSelectionOption");
  }

  getBorderTypeSelect() {
    return Helpers.getElement("borderTypeSelect");
  }

  getOuterOption() {
    return Helpers.getElement("outer");
  }

  getFullOption() {
    return Helpers.getElement("full");
  }

  getNoneOption() {
    return Helpers.getElement("none");
  }

  getHoverStateOption() {
    return Helpers.getElement("hoverStateOption");
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

  getShadesView() {
    return this.getLayout().find('[data-cy="shadesView"]');
  }

  getShadesViewItems() {
    return this.getShadesView().find('[data-cy="shadesViewItem"]');
  }
}

export default ShadingPage;
