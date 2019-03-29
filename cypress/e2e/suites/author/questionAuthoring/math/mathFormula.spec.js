import { math } from "@edulastic/constants";
import MathFormulaEdit from "../../../../framework/author/itemList/questionType/math/mathFormulaEdit";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import FileHelper from "../../../../framework/util/fileHelper";
import EditToolBar from "../../../../framework/author/itemList/questionType/common/editToolBar";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Math formula" type question`, () => {
  const queData = {
    mockString: "10-5+8-4",
    group: "Math",
    queType: "Math formula",
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2",
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
        // expected: ["\\frac{1}{1 000}", "\\frac{1}{1,000}"],
        // expected: ["1/1000", "1/1,000"],
        expected: ["\\frac{enter}1{downarrow}1 000", "\\frac{enter}1{downarrow}1,000"],
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
    equivSyntax: {
      decimal: {
        expected: "5.000",
        input: "3"
      },
      simpleFraction: {
        expected: "2/4"
      },
      mixedFraction: {
        expected: "1+1/2"
      },
      exponent: {
        expected: "2^2"
      },
      standardFormLinear: {
        expected: "Ax+By=C"
      },
      standardFormQuadratic: {
        expected: "5x^2+3x=4"
      },
      slopeIntercept: {
        expected: "y=-x+1"
      },
      pointSlope: {
        expected: "(y-1)=2(x+3)"
      }
    },
    isSimplified: {
      simplifiedVersion: {
        expected: "4x+1"
      },
      decimalMarks: {
        expected: "23"
      }
    },
    isFactorised: {
      decimalMarks: {
        expected: "25"
      },
      inverseResult: {
        expected: "(x−1)(x−2)"
      }
    },
    isExpanded: {
      expandedForm: {
        expected: "x^2+5x+6"
      },
      decimalMarks: {
        expected: "24"
      }
    },
    isUnit: {
      expectedUnits: {
        expected: "5mi",
        input: "5mi",
        units: "mi"
      },
      allowedUnits: {
        expected: "12km",
        units: "km"
      },
      decimalMarks: {
        expected: "26"
      }
    },
    isTrue: {
      comparison: {
        expected: "5<6"
      },
      significantDecimal: {
        expected: "0.33",
        input: 2
      },
      decimalMarks: {
        expected: "25"
      }
    },
    stringMatch: {
      literalStringComparison: {
        expected: "abc",
        input: "abc"
      },
      leadingAndTrailing: {
        expected: " a ",
        input: "a"
      },
      multipleSpaces: {
        expected: "a   b",
        input: "a b"
      }
    },
    equivValue: {
      numericalForm: {
        input: "1m",
        expected: "100cm"
      },
      inverse: {
        expected: "44",
        input: "44"
      },
      ignoreText: {
        expected: "33sdf",
        input: "33"
      },
      significantDecimal: {
        input: "1\\div3",
        expected: "0.33",
        decimalPlaces: 2
      },
      compareSides: {
        expected: "4+5=9",
        input: "4+5=9"
      },
      tolerance: {
        input: "10",
        expected: "8.5",
        tolerance: "±1.5"
      },
      decimalMarks: {
        expected: "25"
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
  const { syntaxes, fields, methods } = math;
  const ruleArguments = question.argumentMethods;
  const editToolBar = new EditToolBar();
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

    context("TC_429 => Enter question text in Compose Question text box", () => {
      it("Write text in textbox", () => {
        question
          .getComposeQuestionTextBox()
          .clear()
          .type(queData.testtext)
          .then($input => {
            console.log("$input", $input[0].innerText);
            expect($input[0].innerText).to.contain(queData.testtext);
          });
      });

      it("give external link", () => {
        question
          .getComposeQuestionTextBox()
          .clear()
          .type(queData.testtext)
          .then($input => {
            expect($input[0].innerText).to.contain(queData.testtext);
          })
          .type("{selectall}");
        editToolBar.link().click();
        question.getSaveLink().click();
        question
          .getComposeQuestionTextBoxLink()
          .find("a")
          .should("have.attr", "href")
          .and("equal", queData.testtext)
          .then(href => {
            expect(href).to.equal(queData.testtext);
          });
      });

      it("insert formula", () => {
        question
          .getComposeQuestionTextBox()
          .clear()
          .type(queData.testtext)
          .then($input => {
            expect($input[0].innerText).to.contain(queData.testtext);
          })
          .clear();
      });
      it("Upload image to server", () => {
        question.getComposeQuestionTextBox().focus();

        cy.get(".ql-image").click();
        cy.uploadFile("testImages/sample.jpg", "input.ql-image[type=file]").then(() =>
          cy
            .get(".ql-editor p")
            .find("img")
            .should("be.visible")
        );

        question.getComposeQuestionTextBox().clear();
      });
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
        Object.values(methods).forEach(item => {
          question
            .getMethodSelectionDropdow()
            .click({ force: true })
            .then(() => {
              question.getMethodSelectionDropdowList(item).click({ force: true });
            });
          question.getMethodSelectionDropdow().contains("div", item);
        });
      });
      it("Testing equivSymbolic method", () => {
        question.getAnswerValueMathInput().type(queData.answer.value, { force: true });
        question.getAnswerValueMathOutput().should("have.length", 4);
        question
          .getAnswerAriaLabel()
          .click({ force: true })
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

    it("Testing with thousands separators - Space and Comma", () => {
      const { input, expected, separators } = queData.equivSymbolic.setThousandsSeparator;
      question.getAnswerValueMathInput().type(input, { force: true });
      separators.forEach((separator, index) => {
        question.getAnswerAllowThousandsSeparator().check({ force: true });
        question
          .getThousandsSeparatorDropdown()
          .click()
          .then(() => {
            question
              .getThousandsSeparatorDropdownList(separator)
              .should("be.visible")
              .click();
          });
        question.checkCorrectAnswer(expected[index], preview, index === 0 ? 0 : input.length, true);

        question.getAnswerAllowThousandsSeparator().uncheck({ force: true });
      });
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
    it("Testing with thousands separators - Comma, Space", () => {
      const { separators, input, expected } = queData.equivLiteral.setThousandsSeparator;
      question.getAnswerAllowThousandsSeparator().check({ force: true });
      question.getAnswerValueMathInput().type(input, { force: true });
      separators.forEach((item, index) => {
        question
          .getThousandsSeparatorDropdown()
          .click()
          .then(() => {
            question.getThousandsSeparatorDropdownList(item).click();
          });

        question.checkCorrectAnswer(expected[index], preview, index === 0 ? 0 : input.length, true);
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
            question.getMethodSelectionDropdowList(methods.EQUIV_LITERAL).click();
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
            question.getMethodSelectionDropdowList(methods.EQUIV_VALUE).click();
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
            question.getMethodSelectionDropdowList(methods.IS_SIMPLIFIED).click();
          });
        question.getAnswerInverseResult().should("be.visible");
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });

      it("Testing isFactorised method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods.IS_FACTORISED).click();
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
            question.getMethodSelectionDropdowList(methods.IS_EXPANDED).click();
          });
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });
      it("Testing isUnits method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods.IS_UNIT).click();
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
            question.getMethodSelectionDropdowList(methods.IS_TRUE).click();
          });
        question.getAnswerSignificantDecimalPlaces().should("be.visible");
        question.getAnswerAllowThousandsSeparator().should("be.visible");
      });
      it("Testing stringMatch method", () => {
        question
          .getMethodSelectionDropdow()
          .click()
          .then(() => {
            question.getMethodSelectionDropdowList(methods.STRING_MATCH).click();
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
            question.getMethodSelectionDropdowList(methods.EQUIV_SYNTAX).click();
          });
        question.getAnswerRuleDropdown().should("be.visible");
        question.getAnswerIgnoreTextCheckox().should("be.visible");
      });
    });
  });

  context("Testing equivSyntax methods", () => {
    before("delete old question and create dummy que to edit", () => {
      preview = editItem.header.preview();
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      editItem.addNew().chooseQuestion(queData.group, queData.queType);
      question.header.save();

      editItem.getEditButton().click();
    });

    it("Testing Rule : Decimal", () => {
      const { input, expected } = queData.equivSyntax.decimal;

      question.setMethod(methods.EQUIV_SYNTAX, question.setRule, syntaxes.DECIMAL);

      question
        .getAnswerRuleArgumentInput()
        .clear()
        .type("{uparrow}".repeat(input), { force: true });

      question.checkCorrectAnswer(expected, preview, 0, true, false, "1/1");
    });
    it("Testing Rule : Simple Fraction", () => {
      const { expected } = queData.equivSyntax.simpleFraction;

      question.setMethod(methods.EQUIV_SYNTAX, question.setRule, syntaxes.SIMPLE_FRACTION);

      question.checkCorrectAnswer(expected, preview, 0, true, false, "1/1");
    });
    it("Testing Rule : mixed Fraction", () => {
      const { expected } = queData.equivSyntax.mixedFraction;

      question.setMethod(methods.EQUIV_SYNTAX, question.setRule, syntaxes.MIXED_FRACTION);

      question.checkCorrectAnswer(expected, preview, 0, false, false, "1/1");
    });
    it("Testing Rule : Exponent", () => {
      const { expected } = queData.equivSyntax.exponent;

      question.setMethod(methods.EQUIV_SYNTAX, question.setRule, syntaxes.EXPONENT);

      question.checkCorrectAnswer(expected, preview, 0, false, false, "1/1");
    });
    it("Testing Rule : Standard form, Argument: linear", () => {
      const { expected } = queData.equivSyntax.standardFormLinear;

      question.setMethod(methods.EQUIV_SYNTAX, question.setRule, syntaxes.STANDARD_FORM);

      question
        .getAnswerRuleArgumentSelect()
        .click()
        .then(() => question.getAnswerArgumentDropdownByValue(ruleArguments[0]).click());
      question.checkCorrectAnswer(expected, preview, 0, true, false, "1/1");
    });
    it("Testing Rule : Standard form, Argument: quadratic", () => {
      const { expected } = queData.equivSyntax.standardFormQuadratic;

      question.setMethod(methods.EQUIV_SYNTAX, question.setRule, syntaxes.STANDARD_FORM);
      question
        .getAnswerRuleArgumentSelect()
        .click()
        .then(() => question.getAnswerArgumentDropdownByValue(ruleArguments[1]).click());
      question.checkCorrectAnswer(expected, preview, 0, false, false, "1/1");
    });
    it("Testing Rule : Slope intercept form", () => {
      const { expected } = queData.equivSyntax.slopeIntercept;

      question.setMethod(methods.EQUIV_SYNTAX, question.setRule, syntaxes.SLOPE_INTERCEPT_FORM);
      question.checkCorrectAnswer(expected, preview, 0, true, false, "1/1");
    });
    it("Testing Rule : point slope form", () => {
      const { expected } = queData.equivSyntax.pointSlope;

      question.setMethod(methods.EQUIV_SYNTAX, question.setRule, syntaxes.POINT_SLOPE_FORM);
      question.checkCorrectAnswer(expected, preview, 0, true, false, "1/1");
    });
  });

  context("Testing isSimplified method", () => {
    it("Testing simplified version", () => {
      const { expected } = queData.isSimplified.simplifiedVersion;

      question.setMethod(methods.IS_SIMPLIFIED);
      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });
    it("Testing inverse result", () => {
      const { expected } = queData.isSimplified.decimalMarks;

      question.setMethod(methods.IS_SIMPLIFIED, question.setSeparator("getAnswerInverseResult"));

      question.checkCorrectAnswer(expected, preview, 0, false);
    });

    it("Testing with allow decimal marks", () => {
      const { expected } = queData.isSimplified.decimalMarks;

      question.setMethod(methods.IS_SIMPLIFIED, question.setSeparator("getAnswerAllowThousandsSeparator"));

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });
  });

  context("Testing isFactorised method", () => {
    it("Testing that a mathematical expression is in factorised form", () => {
      const { expected } = queData.isSimplified.decimalMarks;

      question.setMethod(methods.IS_FACTORISED);

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
    it("Testing with field", () => {
      question.setMethod(methods.IS_FACTORISED);

      Object.values(fields).forEach(field =>
        question
          .getAnswerFieldDropdown()
          .click()
          .then(() =>
            question
              .getAnswerFieldDropdownListValue(field)
              .click()
              .should("be.visible")
          )
      );
    });
    it("Testing inverse result", () => {
      const { expected } = queData.isFactorised.inverseResult;

      question.setMethod(methods.IS_FACTORISED, question.setSeparator("getAnswerInverseResult"));

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
    it("Testing with allow decimal marks", () => {
      const { expected } = queData.isFactorised.decimalMarks;

      question.setMethod(methods.IS_FACTORISED, question.setSeparator("getAnswerAllowThousandsSeparator"));

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
  });

  context("Testing isExpanded method", () => {
    it("Testing that a mathematical expression is in factorised form", () => {
      const { expected } = queData.isExpanded.expandedForm;

      question.setMethod(methods.IS_EXPANDED);

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
    it("Testing with allow decimal marks", () => {
      const { expected } = queData.isFactorised.decimalMarks;

      question.setMethod(methods.IS_EXPANDED, question.setSeparator("getAnswerAllowThousandsSeparator"));

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });
  });

  context("Testing isTrue method", () => {
    it("Testing that an expression has a comparison, or equality", () => {
      const { expected } = queData.isTrue.comparison;

      question.setMethod(methods.IS_TRUE);

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });

    it("Testing significant decimal places", () => {
      const { input, expected } = queData.isTrue.significantDecimal;

      question.setMethod(methods.IS_TRUE);
      question
        .getAnswerSignificantDecimalPlaces()
        .clear()
        .type("{uparrow}".repeat(input), { force: true });
      question.checkCorrectAnswer(expected, preview, 0, false);
    });

    it("Testing with allow decimal marks", () => {
      const { expected } = queData.isTrue.decimalMarks;

      question.setMethod(methods.IS_TRUE, question.setSeparator("getAnswerAllowThousandsSeparator"));

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });
  });

  context("Testing stringMatch method", () => {
    it("Testing with literal string comparison", () => {
      const { input, expected } = queData.stringMatch.literalStringComparison;

      question.setMethod(methods.STRING_MATCH, question.setValue, input);

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });

    it("Testing ignores spaces before and after a value", () => {
      const { input, expected } = queData.stringMatch.leadingAndTrailing;

      question.setMethod(
        methods.STRING_MATCH,
        question.setValue,
        input,
        question.setSeparator("getAnswerIgnoreLeadingAndTrailingSpaces")
      );

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });

    it("Testing multiple spaces will be ignored and treated as one", () => {
      const { input, expected } = queData.stringMatch.multipleSpaces;

      question.setMethod(
        methods.STRING_MATCH,
        question.setValue,
        input,
        question.setSeparator("getAnswerTreatMultipleSpacesAsOne")
      );

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });
  });

  context("Testing isUnit method", () => {
    it("Testing with expression contains the expected units", () => {
      const { input, expected, units } = queData.isUnit.expectedUnits;

      question.setMethod(methods.IS_UNIT, question.setValue, input);

      question
        .getAnswerAllowedUnits()
        .clear({ force: true })
        .type(units, { force: true });

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
    it("Testing with allowed units", () => {
      const { expected, units } = queData.isUnit.allowedUnits;

      question.setMethod(methods.IS_UNIT);

      question
        .getAnswerAllowedUnits()
        .clear({ force: true })
        .type(units, { force: true });

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
    it("Testing with allow decimal marks", () => {
      const { expected } = queData.isUnit.decimalMarks;

      question.setMethod(methods.IS_UNIT, question.setSeparator("getAnswerAllowThousandsSeparator"));

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
  });

  context("Testing equivValue method", () => {
    it("Testing with evaluate the expression to a numerical form for comparison", () => {
      const { expected, input } = queData.equivValue.numericalForm;

      question.setMethod(methods.EQUIV_VALUE, question.setValue, input);

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
    it("Testing with inverse result", () => {
      const { expected, input } = queData.equivValue.inverse;

      question.setMethod(
        methods.EQUIV_VALUE,
        question.setValue,
        input,
        question.setSeparator("getAnswerInverseResult")
      );

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
    it("Testing with ignore text", () => {
      const { expected, input } = queData.equivValue.ignoreText;

      question.setMethod(
        methods.EQUIV_VALUE,
        question.setValue,
        input,
        question.setSeparator("getAnswerIgnoreTextCheckox")
      );

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
    });
    it("Testing with significant decimal places", () => {
      const { expected, input, decimalPlaces } = queData.equivValue.significantDecimal;

      question.setMethod(methods.EQUIV_VALUE, question.setValue, input);
      question
        .getAnswerSignificantDecimalPlaces()
        .clear({ force: true })
        .type("{uparrow}".repeat(decimalPlaces), { force: true });

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
      question.getAnswerSignificantDecimalPlaces().clear({ force: true });
    });
    it("Testing with compare sides", () => {
      const { expected, input } = queData.equivValue.compareSides;

      question.setMethod(methods.EQUIV_VALUE, question.setValue, input, question.setSeparator("getAnswerCompareSides"));

      question.checkCorrectAnswer(expected, preview, 0, false);
    });
    it("Testing with tolerance that will be deemed as correct", () => {
      const { expected, input, tolerance } = queData.equivValue.tolerance;

      question.setMethod(methods.EQUIV_VALUE, question.setValue, input);

      question
        .getAnswerTolerance()
        .clear({ force: true })
        .type(tolerance, { force: true });

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
      question.getAnswerTolerance().clear({ force: true });
    });
    it("Testing with allow decimal marks", () => {
      const { expected } = queData.equivValue.decimalMarks;

      question.setMethod(methods.EQUIV_VALUE, question.setSeparator("getAnswerAllowThousandsSeparator"));

      question.checkCorrectAnswer(expected, preview, 0, true, true, "1/1");
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
