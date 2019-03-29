import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import OrderListPage from "../../../../framework/author/itemList/questionType/classifyMatchOrder/orderListPage";
import FileHelper from "../../../../framework/util/fileHelper";
import Helpers from "../../../../framework/util/Helpers";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "OrderList" type question`, () => {
  const queData = {
    group: "Classify, Match & Order",
    queType: "OrderList",
    queText: "Select the correct option?",
    template: " is the world's largest democracy",
    correctAns: "India",
    list: ["List1", "List2", "List3"],
    correctList: ["List3", "List2", "List1"],
    choices: ["Choice1", "Choice2", "Choice3"],
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2",
    column: 2,
    row: 1,
    points: 2
  };

  const question = new OrderListPage();
  const editItem = new EditItemPage();
  let preview;

  before(() => {
    cy.setToken();
  });

  context("User creates question", () => {
    before("visit items page and select question type", () => {
      cy.selectQuestionType({ editItem, queData });
    });

    context("TC_87 => List", () => {
      it("Edit the list existing names", () => {
        question.getListInputs().each(($el, index) => {
          cy.wrap($el)
            .clear()
            .type(queData.list[index])
            .should("contain", queData.list[index]);
        });
        cy.get("body").click();
      });

      it("Add/Delete new list items", () => {
        question
          .getAddInputButton()
          .click()
          .then(() => {
            question.getListInputs().should("have.length", queData.list.length + 1);
            question
              .getListDeleteByIndex(queData.list.length)
              .click()
              .then(() => {
                question.getListInputs().should("have.length", queData.list.length);
              });
          });
      });
    });

    context("TC_88 => Set Correct Answer(s)", () => {
      it("Update Points", () => {
        question
          .getPonitsInput()
          .focus()
          .clear()
          .type("{selectall}1")
          .should("have.value", "1")
          .type("{uparrow}")
          .should("have.value", "2")
          .blur();
      });

      it("Provide the order of answers list", () => {
        cy.get("#drag-handler-options20")
          .customDragDrop("#drag-handler-options22")
          .then(() => {
            question.getAnswerLists().each(($el, index) => {
              cy.wrap($el).contains("p", queData.correctList[index]);
            });
          });
      });

      it("Click on + symbol", () => {
        question.addAlternate();
        question
          .getAddedAlternate()
          .then($el => {
            cy.wrap($el)
              .should("be.visible")
              .click();
          })
          .should("not.exist");
      });
    });

    context("TC_89 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("TC_90 => Preview Items", () => {
      it("Click on preview", () => {
        preview = editItem.header.preview();
        cy.get("body").contains("span", "Check Answer");

        question.getPreviewList().each(($el, index) => {
          cy.wrap($el).contains(queData.list[index]);
        });
      });

      it("Click on Check answer", () => {
        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            cy.get("body")
              .children()
              .should("contain", "score: 2/2");
          });
      });

      it("Click on Show Answers", () => {
        preview
          .getShowAnswer()
          .click()
          .then(() => {
            cy.get("body")
              .children()
              .contains("div", queData.list[0]);
          });
      });

      it("Click on Clear", () => {
        preview
          .getClear()
          .click()
          .then(() => {
            cy.get("body")
              .children()
              .should("not.contain", "Correct Answer:");
          });

        preview.header.edit();
      });
    });
  });

  context("Edit the questin created", () => {
    before("delete old question and create dummy que to edit", () => {
      cy.deleteOldQuestion({ editItem });
      cy.selectQuestionType({ editItem, queData });
    });

    context("TC_92 => List", () => {
      it("Edit the list existing names", () => {
        question.getListInputs().each(($el, index) => {
          cy.wrap($el)
            .clear()
            .type(queData.list[index])
            .should("contain", queData.list[index]);
        });
        cy.get("body").click();
      });

      it("Add/Delete new list items", () => {
        question
          .getAddInputButton()
          .click()
          .then(() => {
            question.getListInputs().should("have.length", queData.list.length + 1);
            question
              .getListDeleteByIndex(queData.list.length)
              .click()
              .then(() => {
                question.getListInputs().should("have.length", queData.list.length);
              });
          });
      });
    });

    context("TC_93 => Set Correct Answer(s)", () => {
      it("Update Points", () => {
        question
          .getPonitsInput()
          .focus()
          .clear()
          .type("{selectall}1")
          .should("have.value", "1")
          .type("{uparrow}")
          .should("have.value", "2")
          .blur();
      });

      it("Provide the order of answers list", () => {
        cy.get("#drag-handler-options20")
          .customDragDrop("#drag-handler-options22")
          .then(() => {
            question.getAnswerLists().each(($el, index) => {
              cy.wrap($el).contains("p", queData.correctList[index]);
            });
          });
      });

      it("Click on + symbol", () => {
        question.addAlternate();
        question
          .getAddedAlternate()
          .then($el => {
            cy.wrap($el)
              .should("be.visible")
              .click();
          })
          .should("not.exist");
      });
    });

    context("TC_94 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });
  });

  context("Delete the question after creation", () => {
    context("Tc_95 => Delete option", () => {
      it("Click on delete button in Item Details page", () => {
        editItem
          .getDelButton()
          .should("have.length", 1)
          .click()
          .should("have.length", 0);
      });
    });
  });

  context("Advanced Options", () => {
    before("visit items page and select question type", () => {
      cy.selectQuestionType({ editItem, queData });
    });

    beforeEach(() => {
      editItem.header.edit();
      editItem.showAdvancedOptions();
    });

    afterEach(() => {
      editItem.header.edit();
    });

    describe("Layout", () => {
      it("should be able to select button list style and change layout", () => {
        question.getListStyleSelect().as("select");

        cy.get("@select")
          .should("be.visible")
          .click();

        question
          .getButtonListStyleOption()
          .should("be.visible")
          .click();

        cy.get("@select").should("contain", "Button");
      });
      it("should be able to select list style and change layout", () => {
        question.getListStyleSelect().as("select");

        cy.get("@select")
          .should("be.visible")
          .click();

        question
          .getListStyleOption()
          .should("be.visible")
          .click();

        cy.get("@select").should("contain", "List");
      });
      it("should be able to select inline style and change layout", () => {
        question.getListStyleSelect().as("select");

        cy.get("@select")
          .should("be.visible")
          .click();

        question
          .getInlineStyleOption()
          .should("be.visible")
          .click();

        cy.get("@select").should("contain", "Inline");
        question.checkListStyle("inline");
      });
      it("should be able to select numerical stem numeration", () => {
        const select = question.getStemNumerationSelect();

        select.should("be.visible").click();

        question
          .getNumericalOption()
          .should("be.visible")
          .click();

        select.should("contain", "Numerical");
      });
      it("should be able to select Uppercase Alphabet stem numeration", () => {
        const select = question.getStemNumerationSelect();

        select.should("be.visible").click();

        question
          .getUppercaseAlphabetOption()
          .should("be.visible")
          .click();

        select.should("contain", "Uppercase Alphabet");
      });
      it("should be able to select Lowercase Alphabet stem numeration", () => {
        const select = question.getStemNumerationSelect();

        select.should("be.visible").click();

        question
          .getLowercaseAlphabetOption()
          .should("be.visible")
          .click();

        select.should("contain", "Lowercase Alphabet");
      });
      it("should be able to select small font size", () => {
        const select = question.getFontSizeSelect();
        const { name, font } = Helpers.fontSize("small");

        select.should("be.visible").click();

        question
          .getSmallFontSizeOption()
          .should("be.visible")
          .click();

        select.should("contain", name);
        question.checkFontSize(font);
      });
      it("should be able to select normal font size", () => {
        const select = question.getFontSizeSelect();
        const { name, font } = Helpers.fontSize("normal");

        select.should("be.visible").click();

        question
          .getNormalFontSizeOption()
          .should("be.visible")
          .click();

        select.should("contain", name);
        question.checkFontSize(font);
      });
      it("should be able to select large font size", () => {
        const select = question.getFontSizeSelect();
        const { name, font } = Helpers.fontSize("large");

        select.should("be.visible").click();

        question
          .getLargeFontSizeOption()
          .should("be.visible")
          .click();

        select.should("contain", name);
        question.checkFontSize(font);
      });
      it("should be able to select extra large font size", () => {
        const select = question.getFontSizeSelect();
        const { name, font } = Helpers.fontSize("xlarge");

        select.should("be.visible").click();

        question
          .getExtraLargeFontSizeOption()
          .should("be.visible")
          .click();

        select.should("contain", name);
        question.checkFontSize(font);
      });
      it("should be able to select huge font size", () => {
        const select = question.getFontSizeSelect();
        const { name, font } = Helpers.fontSize("xxlarge");

        select.should("be.visible").click();

        question
          .getHugeFontSizeOption()
          .should("be.visible")
          .click();

        select.should("contain", name);
        question.checkFontSize(font);
      });
    });
  });
});
