import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class LabelImageStandardPage {
  constructor() {
    this.orientationOption = {
      Horizontal: "horizontal",
      Vertical: "vertical"
    };

    this.styleOptions = {
      Standard: "standard",
      Block: "block",
      "Radio Button Below": "radioBelow"
    };

    this.labelOption = {
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

    this.scoringTypeOption = {
      "Exact match": "exactMatch",
      "Partial match": "partialMatch"
    };

    this.formates = [
      {
        sel: ".ql-bold",
        tag: "strong"
      },
      {
        sel: ".ql-italic",
        tag: "em"
      },
      {
        sel: ".ql-underline",
        tag: "u"
      },
      {
        sel: ".ql-strike",
        tag: "s"
      },
      {
        sel: '[value="sub"]',
        tag: "sub"
      },
      {
        sel: '[value="super"]',
        tag: "sup"
      },
      {
        sel: '[value="1"]',
        tag: "h1"
      },
      {
        sel: '[value="2"]',
        tag: "h2"
      },
      {
        sel: ".ql-blockquote",
        tag: "blockquote"
      },
      {
        sel: ".ql-code-block",
        tag: "pre"
      }
    ];

    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  // get current question from Store

  getCurrentStoreQuestion() {
    const storeValue = JSON.parse(window.localStorage.getItem("persist:root")).question;
    return JSON.parse(storeValue).entity.data;
  }

  // question content
  getQuestionEditor() {
    return cy.get('[data-placeholder="[This is the stem.]"');
  }

  addImageOnEditor(base64Data) {
    cy.document().then(doc => {
      // work with document element
      const elem = doc.createElement("img");
      elem.setAttribute("src", `data:image/jpeg;base64,${base64Data}`);
      const qlEditor = doc.getElementsByClassName("ql-editor")[0].getElementsByTagName("p");
      qlEditor[0].appendChild(elem);
    });
    return this;
  }

  checkImageOnEditor() {
    return this.getQuestionEditor()
      .get("img")
      .should("be.visible");
  }

  // upload image

  changeImageWidth(width) {
    cy.get('[data-cy="image-width-input"]')
      .click()
      .clear()
      .type(width)
      .should("have.value", width);
    return this;
  }

  getImageWidth() {
    return cy.get('[data-cy="drag-drop-image-panel"]');
  }

  // image alternate

  inputImageAlternate(text) {
    cy.get('[data-cy="image-alternate-input"]')
      .click()
      .clear()
      .type(text)
      .should("have.value", text);
    return this;
  }

  checkImageAlternate(text) {
    cy.get('[data-cy="drag-drop-image-panel"]')
      .find("img")
      .should("have.attr", "alt", text);
    return this;
  }

  // color picker

  updateColorPicker(color) {
    cy.get('[data-cy="image-text-box-color-picker"]').click();
    cy.get('[data-cy="image-text-box-color-panel"]')
      .find("input")
      .click()
      .clear()
      .type(color)
      .should("have.value", color);
    cy.get("body").click();
    return this;
  }

  getAllInputPanel() {
    return cy
      .get('[data-cy="drag-drop-image-panel"]')
      .find("img")
      .next()
      .children(".react-draggable");
  }

  // max response

  getMaxResponseInput() {
    return cy.get('[data-cy="drag-drop-image-max-res"]');
  }

  // dashboard border

  getDashboardBorderCheck() {
    return cy
      .get('[data-cy="drag-drop-image-dashboard-check"]')
      .closest("label")
      .should("be.visible");
  }

  // edit ARIA labels

  getAriaLabelCheck() {
    return cy
      .get('[data-cy="drag-drop-image-aria-check"]')
      .closest("label")
      .should("be.visible");
  }

  // choices
  getChoiceByIndex(index) {
    return cy.get(`[data-cy=edit_prefix_${index}]`);
  }

  deleteChoiceByIndex(index) {
    const selector = `[data-cy=delete_prefix_${index}]`;
    cy.get(selector).click();
    return this;
  }

  getAllChoices() {
    return cy
      .contains("div", "Possible responses")
      .next()
      .find("input");
  }

  addNewChoice() {
    cy.get('[data-cy="add-new-ch"]')
      .should("be.visible")
      .click();
    return this;
  }

  checkAddedAnswers(text) {
    return cy
      .get(".draggable_box")
      .children()
      .contains("div", text)
      .should("be.visible");
  }

  getPointsEditor() {
    return cy.get('[data-cy="point-field"]').should("be.visible");
  }

  getCorrectAnsOptions() {
    return cy
      .contains("div", "Set Correct Answer(s)")
      .next()
      .children()
      .contains("label");
  }

  addAlternate() {
    cy.get('[data-cy="alternate"]')
      .should("be.visible")
      .click();
    return this;
  }

  checkAndDeleteAlternates() {
    return cy
      .contains("div", "Set Correct Answer(s)")
      .next()
      .children()
      .first()
      .children()
      .first()
      .next()
      .contains("Alternate")
      .should("be.visible")
      .first()
      .children()
      .first()
      .click()
      .should("not.exist");
  }

  getResponsesBox() {
    return cy
      .get('[data-cy="responses-box"]')
      .find(".draggable_box")
      .children()
      .should("be.visible");
  }

  getResponsesBoxTransparent() {
    return cy
      .get('[data-cy="responses-box"]')
      .find(".draggable_box_transparent")
      .children();
  }

  getResponsesBoard() {
    return cy.get('[data-cy="drag-drop-board"]').find("div .container");
  }

  dragAndDropResponseToBoard() {
    const MyDataTransfer = function() {};
    const dt = new MyDataTransfer();
    dt.types = [];
    this.getResponsesBox()
      .first()
      .trigger("mousedown", { which: 1, button: 0 })
      .trigger("dragstart", { dataTransfer: dt })
      .trigger("mousemove");
    this.getResponsesBoard()
      .first()
      .trigger("drop", { force: true })
      .trigger("mouseup", { which: 1, button: 0 });
    return this;
  }

  dragAndDropBoardToBoard() {
    const MyDataTransfer = function() {};
    const dt = new MyDataTransfer();
    dt.types = [];
    this.getResponsesBoard()
      .first()
      .should("be.visible")
      .find("div")
      .trigger("mousedown", { which: 1, button: 0 })
      .trigger("dragstart", { dataTransfer: dt })
      .trigger("mousemove");
    this.getResponsesBoard()
      .eq(1)
      .trigger("drop", { force: true })
      .trigger("mouseup", { which: 1, button: 0 })
      .children()
      .should("be.visible");
    return this;
  }

  getMultipleResponse() {
    return cy
      .get('[data-cy="multi-check"]')
      .closest("label")
      .should("be.visible");
  }

  getDragHandle() {
    return cy
      .get('[data-cy="drag-check"]')
      .closest("label")
      .should("be.visible");
  }

  getShuffleResponse() {
    return cy
      .get('[data-cy="shuffle-check"]')
      .closest("label")
      .should("be.visible");
  }

  getShuffleDropDown() {
    return cy.get('[data-cy="multi"]').should("be.visible");
  }

  getTransparentResponse() {
    return cy
      .get('[data-cy="transparent-check"]')
      .closest("label")
      .should("be.visible");
  }

  // Label Image Drop Down

  addNewChoiceOnResponse(resIndex) {
    const selector = `[data-cy=add-new-ch-res-${resIndex}]`;
    cy.get(selector)
      .should("be.visible")
      .click();
    return this;
  }

  getChoiceByIndexRes(resIndex, choiceIndex) {
    const selector = `[data-cy=choice-response-${resIndex}]`;
    return cy
      .get(selector)
      .children()
      .find(`[data-cy=edit_prefix_${choiceIndex}]`);
  }

  getAllChoicesRes(resIndex) {
    const selector = `[data-cy=choice-response-${resIndex}]`;
    return cy
      .get(selector)
      .children()
      .first()
      .next()
      .children();
  }

  deleteChoiceIndexRes(resIndex, choiceIndex) {
    const selector = `[data-cy=choice-response-${resIndex}]`;
    return cy
      .get(selector)
      .find(`[data-cy=delete_prefix_${choiceIndex}]`)
      .click();
  }

  checkAddedAnswersRes(resIndex, value) {
    const selector = `[data-cy=dropdown-board-${resIndex}]`;
    cy.get(selector)
      .next()
      .should("be.visible")
      .click()
      .click();
    cy.contains("li", value);
    return this;
  }

  getDropDownByRes(resIndex) {
    const selector = `[data-cy=dropdown-board-${resIndex}]`;
    return cy
      .get(selector)
      .next()
      .should("be.visible");
  }

  getDropDownMenuItem(resIndex, itemIndex) {
    const selector = `[data-cy=dropdown-res-item-${resIndex}-${itemIndex}]`;
    return cy.get(selector).should("be.visible");
  }

  checkShuffled(resIndex, content) {
    const selector = `[data-cy=dropdown-res-item-${resIndex}-0]`;
    return cy
      .get(selector)
      .parent()
      .children()
      .contains("li", content);
  }

  setAnswerOnBoard(resIndex, itemIndex) {
    this.getDropDownByRes(resIndex).click();

    this.getDropDownMenuItem(resIndex, itemIndex).click();
  }

  // Text Page

  getAnswersFieldOnTextPage() {
    const selector = `[data-cy="image-text-answer-board"]`;
    return cy.get(selector).find("input");
  }

  getShuffleTextImage() {
    return cy.get('[data-cy="multi"]').should("be.visible");
  }
}

export default LabelImageStandardPage;
