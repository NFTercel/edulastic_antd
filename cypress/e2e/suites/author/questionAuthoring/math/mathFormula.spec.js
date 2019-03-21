import MathFormulaEdit from "../../../../framework/author/itemList/questionType/math/mathFormulaEdit";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Math formula" type question`, () => {
  const queData = {
    mockString: "10-5+8-4",
    group: "Math",
    queType: "Math formula",
    answer: {
      value: "1234",
      ariaLabel: "test"
    },
    symbols: ["units_si", "units_us"],
    decimalSeparators: ["Dot", "Comma"],
    thousandsSeparators: ["Space", "Dot", "Comma"]
  };

  const question = new MathFormulaEdit();
  const editItem = new EditItemPage();
  const numpadButtons = question.virtualKeyBoardNumpad;
  const buttons = question.virtualKeyBoardButtons;
  const methods = question.answersMethods;
  let preview;

  before(() => {
    cy.setToken();
  });

  context("User creates question", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();
      // create new que and select type

      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });

    context("TC_411 => Template", () => {
      it("Edit template textarea", () => {
        question.getTemplateInput().type(queData.mockString, { force: true });
        question.getTemplateOutput().should("have.length", queData.mockString.length);
        for (let i = 0; i < queData.mockString.length; i++) {
          question.getTemplateInput().type("{backspace}", { force: true });
        }
        question.getTemplateOutput().should("have.length", 0);
      });
      it("Edit template textarea from virtual keyboard", () => {
        question
          .getTemplateInput()
          .parent()
          .parent()
          .click();
        question
          .getVirtualKeyBoard()
          .find("span.response-embed")
          .click();
        question
          .getTemplateOutput()
          .last()
          .contains("Response");
        question.removeLastValue();
        numpadButtons.forEach(button => {
          const { value, label } = button;
          question
            .getVirtualKeyBoard()
            .find(`button[data-cy="virtual-keyboard-${value}"]`)
            .click();
          question
            .getTemplateOutput()
            .last()
            .contains(label);
          question.removeLastValue();
        });
        buttons
          .filter(item => item.types.includes(queData.symbols[0]))
          .forEach(button => {
            const { label } = button;
            question
              .getVirtualKeyBoard()
              .find(`button[data-cy="virtual-keyboard-${label}"]`)
              .click();
            question
              .getTemplateOutput()
              .last()
              .contains(label);
            question.removeLastValue();
          });
        question
          .getMathKeyBoardDropdown()
          .click()
          .then(() => {
            question
              .getMathKeyBoardDropdownList(1)
              .should("be.visible")
              .click();
          });
        question.getMathKeyBoardDropdown().contains("div", "Units (US Customary)");
        buttons
          .filter(item => item.types.includes(queData.symbols[1]))
          .forEach(button => {
            const { label, handler } = button;
            question
              .getVirtualKeyBoard()
              .find(`button[data-cy="virtual-keyboard-${handler}"]`)
              .click();
            question
              .getTemplateOutput()
              .last()
              .contains(label);
            question.removeLastValue();
          });
      });
    });

    context("TC_412 => Set Correct Answer(s)", () => {
      it("Update Points", () => {
        question
          .getPointsInput()
          .click({ force: true })
          .focus()
          .clear()
          .type("{selectall}1")
          .should("have.value", "1")
          .type("{uparrow}")
          .should("have.value", "2")
          .blur();
      });
      it("Add and remove new method", () => {
        question
          .getAddNewMethod()
          .click()
          .then(() => {
            question.getMathFormulaAnswers().should("have.length", 2);
          });
        question
          .getMathFormulaAnswers()
          .last()
          .find('[data-cy="delete-answer-method"]')
          .click()
          .then(() => {
            question.getMathFormulaAnswers().should("have.length", 1);
          });
      });
      it("Add and remove alternate answer", () => {
        question.addAlternateAnswer();
        question
          .getAddedAlternateAnswer()
          .then(element => {
            cy.wrap(element)
              .should("be.visible")
              .click();
          })
          .should("not.exist");
        question.returnToCorrectTab();
      });
      it("Change answer methods", () => {
        methods.forEach(item => {
          question
            .getMethodSelectionDropdow()
            .click()
            .then(() => {
              question.getMethodSelectionDropdowList(item).click();
            });
          question.getMethodSelectionDropdow().contains("div", item);
        });
      });
      it("Testing equivSymbolic method", () => {
        question.getAnswerValueMathInput().type(queData.answer.value, { force: true });
        question.getAnswerValueMathOutput().should("have.length", 4);
        question
          .getAnswerAriaLabel()
          .click()
          .type(queData.answer.ariaLabel)
          .should("contain", queData.answer.ariaLabel);
        question
          .getAnswerSignificantDecimalPlaces()
          .focus()
          .clear()
          .type("{selectall}10")
          .should("have.value", "10")
          .blur();
        question
          .getAnswerIgnoreTextCheckox()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });
        question
          .getAnswerCompareSides()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });
        question
          .getAnswerTreatEasEulersNumber()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });
        question
          .getAnswerAllowThousandsSeparator()
          .check({ force: true })
          .should("be.checked");
        queData.decimalSeparators.forEach(item => {
          question
            .getAnswerSetDecimalSeparatorDropdown()
            .click()
            .then(() => {
              question
                .getAnswerSetDecimalSeparatorDropdownList(item)
                .should("be.visible")
                .click();
            });
          question.getAnswerSetDecimalSeparatorDropdown().contains("div", item);
        });
        question
          .getAddNewThousandsSeparator()
          .click()
          .then(() => {
            question.getThousandsSeparatorDropdown().should("have.length", 2);
          });
        question
          .getRemoveThousandsSeparator()
          .last()
          .click()
          .then(() => {
            question.getThousandsSeparatorDropdown().should("have.length", 1);
          });
        queData.thousandsSeparators.forEach(item => {
          question
            .getThousandsSeparatorDropdown()
            .click()
            .then(() => {
              question
                .getThousandsSeparatorDropdownList(item)
                .should("be.visible")
                .click();
            });
        });
        question.getAnswerAllowThousandsSeparator().uncheck({ force: true });
      });
    });
  });

  context("TC_413 => Preview Items", () => {
    it("Click on preview", () => {
      preview = editItem.header.preview();
      cy.get("body").contains("span", "Check Answer");

      question.getPreviewMathQuill().type(queData.answer.value, { force: true });
    });

    it("Click on Check answer", () => {
      preview
        .getCheckAnswer()
        .click()
        .then(() =>
          cy
            .get("body")
            .children()
            .should("contain", "score: 2/2")
        );
    });

    it("Click on Show Answers", () => {
      preview
        .getShowAnswer()
        .click()
        .then(() => {
          cy.get('[data-cy="correct-answer-box"]').should("be.visible");
        });
    });

    it("Click on Clear", () => {
      preview
        .getClear()
        .click()
        .then(() => {
          cy.get("body")
            .children()
            .should("not.contain", "Correct Answers");
        });

      preview.header.edit();
    });
  });

  context("Edit the Math formula created", () => {
    before("delete old question and create dummy que to edit", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      //create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
      question.header.save();

      editItem.getEditButton().click();
    });

    context("TC_414 => Testing different answer methods", () => {
      it("Testing equivLiteral method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[0]).click();
          });
        question.getAnswerValueMathInput().should("be.visible");
        question.getAnswerAriaLabel().should("be.visible");
        question
          .getAnswerAllowInterval()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });
        question
          .getAnswerIgnoreOrder()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });
        question
          .getAnswerIgnoreTrailingZeros()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });
        question
          .getAnswerIgnoreCoefficientOfOne()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });
        question
          .getAnswerInverseResult()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });

        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });

      it("Testing equivValue method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[1]).click();
          });
        question.getAnswerValueMathInput().should("be.visible");
        question.getAnswerAriaLabel().should("be.visible");
        question.getAnswerInverseResult().should("be.visible");
        question.getAnswerIgnoreTextCheckox().should("be.visible");
        question.getAnswerSignificantDecimalPlaces().should("be.visible");
        question.getAnswerCompareSides().should("be.visible");
        question.getAnswerTolerance().should("be.visible");
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });

      it("Testing equivSimplified method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[2]).click();
          });
        question.getAnswerInverseResult().should("be.visible");
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });

      it("Testing isFactorised method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[3]).click();
          });
        question.getAnswerFieldDropdown().should("be.visible");
        question.getAnswerInverseResult().should("be.visible");
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });
      it("Testing isExpanded method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[4]).click();
          });
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });
      it("Testing isUnits method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[5]).click();
          });
        question.getAnswerValueMathInput().should("be.visible");
        question.getAnswerAriaLabel().should("be.visible");
        question.getAnswerAllowedUnits().should("be.visible");
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });
      it("Testing isTrue method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[6]).click();
          });
        question.getAnswerSignificantDecimalPlaces().should("be.visible");
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });
      it("Testing stringMatch method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[7]).click();
          });
        question.getAnswerValueMathInput().should("be.visible");
        question.getAnswerAriaLabel().should("be.visible");
        question.getAnswerIgnoreLeadingAndTrailingSpaces().should("be.visible");
        question.getAnswerTreatMultipleSpacesAsOne().should("be.visible");
      });
      it("Testing equivSyntax method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods[8]).click();
          });
        question.getAnswerRuleDropdown().should("be.visible");
        question.getAnswerIgnoreTextCheckox().should("be.visible");
      });
    });
  });
});
