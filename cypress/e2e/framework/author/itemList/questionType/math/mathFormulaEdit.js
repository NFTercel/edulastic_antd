import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class MathFormulaEdit {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
    this.argumentMethods = ["linear", "quadratic"];
    this.virtualKeyBoardNumpad = [
      { value: "7", label: "7" },
      { value: "8", label: "8" },
      { value: "9", label: "9" },
      { value: "div", label: "÷" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "6", label: "6" },
      { value: "times", label: "×" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "-", label: "−" },
      { value: "0", label: "0" },
      { value: ".", label: "." },
      { value: ",", label: "," },
      { value: "+", label: "+" },
      { value: "=", label: "=" }
    ];
    this.virtualKeyBoardButtons = [
      {
        handler: "g",
        label: "g",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "kg",
        label: "kg",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "mg",
        label: "mg",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "µg",
        label: "µg",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "m",
        label: "m",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "km",
        label: "km",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "cm",
        label: "cm",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "mm",
        label: "mm",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "L",
        label: "L",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "mL",
        label: "mL",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "s",
        label: "s",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "ms",
        label: "ms",
        types: ["all", "units_si"],
        command: "cmd"
      },
      {
        handler: "oz",
        label: "oz",
        types: ["all", "units_us"],
        command: "cmd"
      },
      {
        handler: "lb",
        label: "lb",
        types: ["all", "units_us"],
        command: "cmd"
      },
      {
        handler: "in",
        label: "∈",
        types: ["all", "units_us"],
        command: "cmd"
      },
      {
        handler: "ft",
        label: "ft",
        types: ["all", "units_us"],
        command: "cmd"
      },
      {
        handler: "mi",
        label: "mi",
        types: ["all", "units_us"],
        command: "cmd"
      },
      {
        handler: "fl oz",
        label: "fl oz",
        types: ["all", "units_us"],
        command: "cmd"
      },
      {
        handler: "pt",
        label: "pt",
        types: ["all", "units_us"],
        command: "cmd"
      },
      {
        handler: "gal",
        label: "gal",
        types: ["all", "units_us"],
        command: "cmd"
      }
    ];
  }

  getTemplateInput = () =>
    cy
      .get('[data-cy="template-container"]')
      .wait(500)
      .next()
      .find("textarea");

  getTemplateOutput = () =>
    cy
      .get('[data-cy="template-container"]')
      .next()
      .get(".mq-root-block > [mathquill-command-id]");

  getVirtualKeyBoard = () =>
    cy
      .get('[data-cy="template-container"]')
      .next()
      .get(".input__absolute__keyboard")
      .get(".keyboard");

  removeLastValue = () =>
    cy
      .get('[data-cy="template-container"]')
      .next()
      .get(".input__absolute__keyboard")
      .first()
      .get(".keyboard")
      .find('button[data-cy="virtual-keyboard-Backspace"]')
      .click();

  getMathKeyBoardDropdown = () => cy.get('[data-cy="math-keyboard-dropdown"]');

  getMathKeyBoardDropdownList = index => cy.get(`[data-cy="math-keyboard-dropdown-list-${index}"]`);

  getPointsInput = () => cy.get('[data-cy="points"]');

  getAddNewMethod = () => cy.get('[data-cy="add-new-method"]');

  getMathFormulaAnswers = () => cy.get('[data-cy="math-formula-answer"]');

  addAlternateAnswer = () => {
    cy.get('[data-cy="alternate"]')
      .should("be.visible")
      .click();
    return this;
  };

  getAddedAlternateAnswer = () => cy.get('[data-cy="del-alter"]');

  returnToCorrectTab = () => {
    cy.get('[data-cy="correct"]')
      .should("be.visible")
      .click();
    return this;
  };

  clearAnswerValueInput = length => {
    for (let i = 0; i < length; i++) {
      this.getAnswerValueMathInput().type("{del}", { force: true });
    }
  };

  getAnswerMathInputField = () => cy.get('[data-cy="answer-math-input-field"]');

  checkCorrectAnswer = (expectedValue, preview, inputLength, isCorrect, score = false, scoreValuse = "2/2") => {
    preview.header.preview();
    this.getPreviewMathQuill().type(expectedValue, { force: true });
    preview
      .getCheckAnswer()
      .click()
      .then(() =>
        cy
          .get("body")
          .children()
          .should("contain", `score: ${isCorrect ? scoreValuse : `0/${score ? "2" : "1"}`}`)
      );

    this.checkAttr(isCorrect);
    preview
      .getClear()
      .click()
      .then(() => {
        cy.get("body")
          .children()
          .should("not.contain", "Correct Answers");
      });

    preview.header.edit();
    if (inputLength > 0) this.clearAnswerValueInput(inputLength);
  };

  checkAttr = isCorrect => {
    if (isCorrect) {
      this.getAnswerMathInputField().should("have.attr", "style", "background: rgb(225, 251, 242);");
    } else {
      this.getAnswerMathInputField().should("have.attr", "style", "background: rgb(252, 224, 232);");
    }
  };

  getMethodSelectionDropdow = () => cy.get('[data-cy="method-selection-dropdown"]');

  getMethodSelectionDropdowList = index => cy.get(`[data-cy="method-selection-dropdown-list-${index}"]`);

  getAnswerValueMathInput = () =>
    cy
      .get('[data-cy="answer-math-input"]')
      .wait(3000)
      .next()
      .find("textarea");

  getAnswerValueMathOutput = () =>
    cy
      .get('[data-cy="answer-math-input"]')
      .next()
      .get(".mq-root-block > [mathquill-command-id]");

  getAnswerAriaLabel = () => cy.get('[data-cy="answer-aria-label"]');

  getAnswerSignificantDecimalPlaces = () => cy.get('[data-cy="answer-significant-decimal-places"]');

  getAnswerIgnoreTextCheckox = () => cy.get('[data-cy="answer-ignore-text-checkbox"]');

  getAnswerCompareSides = () => cy.get('[data-cy="answer-compare-sides"]');

  getAnswerTreatEasEulersNumber = () => cy.get('[data-cy="answer-treat-eas-eulers-number"]');

  getAnswerAllowThousandsSeparator = () => cy.get('[data-cy="answer-allow-thousands-separator"]');

  getAnswerSetDecimalSeparatorDropdown = () => cy.get('[data-cy="answer-set-decimal-separator-dropdown"]');

  getAnswerSetDecimalSeparatorDropdownList = index =>
    cy.get(`[data-cy="answer-set-decimal-separator-dropdown-list-${index}"]`);

  getAddNewThousandsSeparator = () => cy.get('[data-cy="add-new-thousands-separator"]');

  getRemoveThousandsSeparator = () => cy.get('[data-cy="remove-thousands-separator"]');

  getThousandsSeparatorDropdown = () => cy.get('[data-cy="thousands-separator-dropdown"]');

  getThousandsSeparatorDropdownList = index => cy.get(`[data-cy="thousands-separator-dropdown-list-${index}"]`);

  getPreviewMathQuill = () =>
    cy
      .get('[data-cy="preview-header"]')
      .wait(500)
      .next()
      .next()
      .find("textarea");

  getAnswerIgnoreOrder = () => cy.get('[data-cy="answer-ignore-order"]');

  getAnswerAllowInterval = () => cy.get('[data-cy="answer-allow-interval"]');

  getAnswerIgnoreTrailingZeros = () => cy.get('[data-cy="answer-ignore-trailing-zeros"]');

  getAnswerIgnoreCoefficientOfOne = () => cy.get('[data-cy="answer-ignore-coefficient-of-one"]');

  getAnswerInverseResult = () => cy.get('[data-cy="answer-inverse-result"]');

  getAnswerTolerance = () => cy.get('[data-cy="answer-tolerance"]');

  getAnswerFieldDropdown = () => cy.get('[data-cy="answer-field-dropdown"]');

  getAnswerAllowedUnits = () => cy.get('[data-cy="answer-allowed-units"]');

  getAnswerIgnoreLeadingAndTrailingSpaces = () => cy.get('[data-cy="answer-ignore-leading-and-trailing-spaces"]');

  getAnswerTreatMultipleSpacesAsOne = () => cy.get('[data-cy="answer-treat-multipleSpacesAsOne"]');

  getAnswerRuleDropdown = () => cy.get('[data-cy="answer-rule-dropdown"]');

  // getComposeQuestionImageInput = () => cy.get('.ql-image .ql-stroke');
  getComposeQuestionImageInput = () => cy.get(".ql-image > svg");

  getCurrentStoreQuestion = () => {
    const storeValue = JSON.parse(window.localStorage.getItem("persist:root")).question;
    return JSON.parse(storeValue).entity.data;
  };

  getComposeQuestionTextBox = () => cy.get(".ql-editor");

  getComposeQuestionTextBoxLink = () => cy.get(".ql-editor p");

  getSaveLink = () => cy.get(".ql-action");

  getAnswerRuleDropdownByValue = val => cy.get(`[data-cy="answer-rule-dropdown-${val}"]`);

  getAnswerRuleArgumentInput = () => cy.get(`[data-cy="answer-rule-argument-input"]`);

  getAnswerRuleArgumentSelect = () => cy.get(`[data-cy="answer-rule-argument-select"]`);

  getAnswerArgumentDropdownByValue = val => cy.get(`[data-cy="answer-argument-dropdown-${val}"]`);

  getAnswerFieldDropdownListValue = val => cy.get(`[data-cy="answer-field-dropdown-list-${val}"]`);

  getAnswerInputMathTextarea = () => cy.get(`[data-cy="answer-input-math-textarea"]`);

  setMethod = (methods, setFunction = false, argument, setChecBox) => {
    this.getMethodSelectionDropdow()
      .click()
      .then(() => {
        this.getMethodSelectionDropdowList(methods).click();
      });
    if (setFunction instanceof Function) setFunction(argument);
    if (setChecBox instanceof Function) setChecBox();
  };

  setValue = input => {
    this.getMathFormulaAnswers()
      .find(`[data-cy="answer-input-math-textarea"]`)
      .then(element => {
        cy.get("[mathquill-block-id]").then(elements => {
          const { length } = elements[1].innerText;
          cy.wrap(element)
            .type("{del}".repeat(length === 0 ? 1 : length), { force: true })
            .type(input, { force: true });
        });
      });
  };

  setRule = rule => {
    this.getAnswerRuleDropdown()
      .click()
      .then(() => this.getAnswerRuleDropdownByValue(rule).click());
  };

  setSeparator = checBoxName => () => {
    cy.get("input[type='checkbox']").uncheck({ force: true });
    this[checBoxName]()
      .check({ force: true })
      .should("be.checked");
  };
}

export default MathFormulaEdit;
