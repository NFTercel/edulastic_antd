import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class ShadingPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
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
}

export default ShadingPage;
