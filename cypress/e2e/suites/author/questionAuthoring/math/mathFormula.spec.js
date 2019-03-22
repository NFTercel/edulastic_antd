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
    equivSymbolic: {
      ignoreText: {
        expected: "25m",
        input: "25"
      },
      compareSides: {
        expected: "3+4=7",
        input: "4+3=7"
      },
      setDecimalSeparator: {
        separator: "Comma",
        expected: "1,01",
        input: "1.01"
      },
      setThousandsSeparator: {
        separators: ["Space", "Comma"],
        expected: ["\\frac{1}{1 000}", "\\frac{1}{1,000}"],
        input: "0.001"
      },
      significantDecimalPlaces: {
        value: 3,
        expected: "5.0001",
        input: 5
      },
      significantDecimalAndIgnoreText: {
        expected: "7.0001m",
        input: 7
      },
      multipleDecimalSeparators: {
        separators: ["Space"],
        expected: "1,000001",
        input: "1.000001"
      }
    },
    equivLiteral: {
      simpleFractions: {
        expected: "\\frac{enter}1{downarrow}2",
        input: "\\frac{enter}1{downarrow}2"
      },
      inverseResult: {
        expected: "0.5",
        input: "0.5"
      },
      ignoreTrailingZeros: {
        expected: [".5", "0.5"],
        input: "0.5"
      },
      setDecimalSeparator: {
        separator: "Comma",
        expected: ["1,1", "1,1+1"],
        input: ["1.1", "1.1+1"]
      },
      setThousandsSeparator: {
        separators: ["Comma", "Space"],
        expected: ["1,000,000", "1 000 000"],
        input: "1000000"
      },
      ignoreOrder: {
        expected: "1+x",
        input: "x+1"
      },
      ignoreCoefficientOfOne: {
        expected: "1x+2",
        input: "x+2"
      },
      allowInterval: {
        expected: "[1, 2)",
        input: "[1, 2)"
      }
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
          .getAnswerIgnoreTextCheckox()
          .check({ force: true })
          .should("be.checked")
          .uncheck({ force: true });

        question
          .getAnswerSignificantDecimalPlaces()
          .focus()
          .clear()
          .type("{selectall}10")
          .should("have.value", "10")
          .blur();
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
      queData.answer.value.split("").forEach(() => {
        question.getAnswerValueMathInput().type("{del}", { force: true });
      });
      question.getAnswerValueMathOutput().should("have.length", 0);
    });
  });

  context("TC_417 => equivSymbolic method", () => {
    it("Testing with ignore text", () => {
      const { input, expected } = queData.equivSymbolic.ignoreText;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerIgnoreTextCheckox().check({ force: true });

      question.checkCorrectAnswer(expected, preview, input.length, true);

      question.getAnswerIgnoreTextCheckox().uncheck({ force: true });
    });
    it("Testing with compare sides", () => {
      const { input, expected } = queData.equivSymbolic.compareSides;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerCompareSides().check({ force: true });

      question.checkCorrectAnswer(expected, preview, input.length, true);

      question.getAnswerCompareSides().uncheck({ force: true });
    });
    it("Testing with decimal separator - Comma", () => {
      const { input, expected, separator } = queData.equivSymbolic.setDecimalSeparator;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerAllowThousandsSeparator().check({ force: true });
      question
        .getAnswerSetDecimalSeparatorDropdown()
        .click()
        .then(() => {
          question
            .getAnswerSetDecimalSeparatorDropdownList(separator)
            .should("be.visible")
            .click();
        });

      question.checkCorrectAnswer(expected, preview, input.length, false);

      question.getAnswerAllowThousandsSeparator().uncheck({ force: true });
    });
    it("Testing with significant decimal '3'", () => {
      const { input, expected, value } = queData.equivSymbolic.significantDecimalPlaces;
      question.getAnswerValueMathInput().type(input, { force: true });
      question
        .getAnswerSignificantDecimalPlaces()
        .click({ force: true })
        .focus()
        .clear()
        .type(`{selectall}${value}`)
        .blur();
      question.checkCorrectAnswer(expected, preview, 2, true);
    });
    it("Testing with significant decimal '3' and ignore text", () => {
      const { input, expected } = queData.equivSymbolic.significantDecimalAndIgnoreText;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerIgnoreTextCheckox().check({ force: true });

      question.checkCorrectAnswer(expected, preview, 2, true);

      question.getAnswerIgnoreTextCheckox().uncheck({ force: true });
      question
        .getAnswerSignificantDecimalPlaces()
        .focus()
        .clear();
    });
    it("Testing with multiple decimal separators", () => {
      const { input, expected, separators } = queData.equivSymbolic.multipleDecimalSeparators;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerAllowThousandsSeparator().check({ force: true });

      separators.forEach(item => {
        question
          .getAddNewThousandsSeparator()
          .click()
          .then(() => {
            question
              .getThousandsSeparatorDropdown()
              .last()
              .click()
              .then(() => {
                question
                  .getThousandsSeparatorDropdownList(item)
                  .last()
                  .click();
              });
          });
      });

      question.checkCorrectAnswer(expected, preview, input.length, false);

      question.getAnswerAllowThousandsSeparator().uncheck({ force: true });
    });
  });
  context("TC_418 => equivLiteral method", () => {
    before("Change to equivLiteral method", () => {
      question
        .getMethodSelectionDropdow()
        .click()
        .then(() => {
          question.getMethodSelectionDropdowList("equivLiteral").click();
        });
    });
    it("Testing simple fractions", () => {
      const { input, expected } = queData.equivLiteral.simpleFractions;
      question.getAnswerValueMathInput().type(input, { force: true });

      question.checkCorrectAnswer(expected, preview, 4, false, true);
    });
    it("Testing inverse result with decimal value", () => {
      const { input, expected } = queData.equivLiteral.inverseResult;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerInverseResult().check({ force: true });

      question.checkCorrectAnswer(expected, preview, input.length, false, true);

      question.getAnswerInverseResult().uncheck({ force: true });
    });
    it("Testing  with ignore trailing zeros", () => {
      const { input, expected } = queData.equivLiteral.ignoreTrailingZeros;
      question.getAnswerIgnoreTrailingZeros().check({ force: true });
      expected.forEach(item => {
        question.getAnswerValueMathInput().type(input, { force: true });

        question.checkCorrectAnswer(item, preview, input.length, true);
      });
      question.getAnswerIgnoreTrailingZeros().uncheck({ force: true });
    });
    it("Testing with decimal separator - Comma", () => {
      const { input, expected, separator } = queData.equivLiteral.setDecimalSeparator;
      question.getAnswerAllowThousandsSeparator().check({ force: true });
      question
        .getAnswerSetDecimalSeparatorDropdown()
        .click()
        .then(() => {
          question
            .getAnswerSetDecimalSeparatorDropdownList(separator)
            .should("be.visible")
            .click();
        });
      input.forEach((item, index) => {
        question.getAnswerValueMathInput().type(item, { force: true });
        question.checkCorrectAnswer(expected[index], preview, item.length, false);
      });

      question.getAnswerAllowThousandsSeparator().uncheck({ force: true });
    });
    it("Testing with ignoring order", () => {
      const { input, expected } = queData.equivLiteral.ignoreOrder;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerIgnoreOrder().check({ force: true });

      question.checkCorrectAnswer(expected, preview, input.length, true);

      question.getAnswerIgnoreOrder().uncheck({ force: true });
    });
    it("Testing with ignore coefficient of 1", () => {
      const { input, expected } = queData.equivLiteral.ignoreCoefficientOfOne;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerIgnoreCoefficientOfOne().check({ force: true });

      question.checkCorrectAnswer(expected, preview, input.length, true);

      question.getAnswerIgnoreCoefficientOfOne().uncheck({ force: true });
    });

    it("Testing with allow Interval", () => {
      const { input, expected } = queData.equivLiteral.allowInterval;
      question.getAnswerValueMathInput().type(input, { force: true });
      question.getAnswerAllowInterval().check({ force: true });

      question.checkCorrectAnswer(expected, preview, input.length, true);

      question.getAnswerIgnoreCoefficientOfOne().uncheck({ force: true });
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
  context("TC_415 => Save question", () => {
    it("Click on save button", () => {
      question.header.save();
      cy.url().should("contain", "item-detail");
    });
  });

  context("TC_416 => Delete the question after creation", () => {
    it("Click on delete button in Item Details page", () => {
      editItem
        .getDelButton()
        .should("have.length", 1)
        .click()
        .should("have.length", 0);
    });
  });
});
