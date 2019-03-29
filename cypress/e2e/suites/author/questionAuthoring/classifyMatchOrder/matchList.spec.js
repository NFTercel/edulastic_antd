import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import MatchListPage from "../../../../framework/author/itemList/questionType/classifyMatchOrder/matchListPage";
import FileHelper from "../../../../framework/util/fileHelper";
import Helpers from "../../../../framework/util/Helpers";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Match list" type question`, () => {
  const queData = {
    group: "Classify, Match & Order",
    queType: "Match list",
    queText: "Select the correct option?",
    template: " is the world's largest democracy",
    correctAns: "India",
    list: ["List1", "List2", "List3"],
    choices: ["Choice1", "Choice2", "Choice3"],
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2",
    column: 2,
    row: 1,
    points: 2
  };

  const question = new MatchListPage();
  const editItem = new EditItemPage();
  let preview;

  before(() => {
    cy.setToken();
  });

  context("User creates question", () => {
    before("visit items page and select question type", () => {
      cy.selectQuestionType({ editItem, queData });
    });

    context("TC_74 => List", () => {
      it("Edit the list existing names", () => {
        question.getListInputs().each(($el, index) => {
          cy.wrap($el)
            .clear()
            .type(queData.list[index])
            .should("contain", queData.list[index]);
        });
        cy.get("body").click();
      });

      it("Add new list items", () => {
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

    context("TC_75 => Group possible responses", () => {
      it("Check the group possible responses checkbox", () => {
        question.getGroupResponsesCheckbox().click();

        question
          .getGroupResponsesCheckbox()
          .find("input")
          .should("be.checked");

        question.getGroupContainerByIndex(0).should("be.visible");
      });

      it("Enter the title of group", () => {
        question
          .getTitleInputByIndex(0)
          .clear()
          .type("Group1")
          .should("have.value", "Group1");
      });

      it("Add/Delete new choices", () => {
        question
          .getChoiceListByGroup(0)
          .each(($el, index, $list) => {
            const cusIndex = $list.length - (index + 1);
            question.deleteChoiceByGroup(0, cusIndex);
          })
          .should("have.length", 0);

        queData.choices.forEach((ch, index) => {
          question
            .getAddNewChoiceByIndex(0)
            .should("be.visible")
            .click();
          question
            .getChoiceEditorByGroup(0, index)
            .next()
            .find("div .ql-editor")
            .clear()
            .type(ch)
            .should("be.visible");
          question
            .getDragDropBox()
            .contains("p", ch)
            .should("be.visible");
        });
      });

      it("Add new group", () => {
        question
          .getAddNewGroupButton()
          .click()
          .then(() => {
            question.getGroupContainerByIndex(1).should("be.visible");
          });
      });

      it("Delete group", () => {
        question
          .getGroupContainerByIndex(1)
          .contains("div", "Group 2")
          .next()
          .should("be.visible")
          .click()
          .then(() => {
            question.getGroupContainerByIndex(1).should("not.exist");
          });
      });
    });

    context("TC_76 => Set Correct Answer(s)", () => {
      it("Update Points", () => {
        question
          .getPontsInput()
          .focus()
          .clear()
          .type("{selectall}1")
          .should("have.value", "1")
          .type("{uparrow}")
          .should("have.value", "2")
          .blur();
      });

      it("Drag and drop the answer choices inside the box", () => {
        queData.choices.forEach((ch, index) => {
          question.getDragDropItemByIndex(index).customDragDrop(`#drag-drop-board-${index}`);
          question.getDragDropBoardByIndex(index).contains("p", ch);
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

    context("TC_77 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("TC_78 => Preview Items", () => {
      it("Click on preview", () => {
        preview = editItem.header.preview();
        cy.get("body").contains("span", "Check Answer");

        queData.choices.forEach((ch, index) => {
          question.getDragDropItemByIndex(index).customDragDrop(`#drag-drop-board-${index}`);
          question.getDragDropBoardByIndex(index).contains("p", ch);
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
              .contains("h3", "Correct Answers");
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
  });

  context("Edit the questin created", () => {
    before("delete old question and create dummy que to edit", () => {
      cy.deleteOldQuestion({ editItem });
      cy.selectQuestionType({ editItem, queData });
    });

    context("TC_81 => List", () => {
      it("Edit the list existing names", () => {
        question.getListInputs().each(($el, index) => {
          cy.wrap($el)
            .clear()
            .type(queData.list[index])
            .should("contain", queData.list[index]);
        });
        cy.get("body").click();
      });

      it("Add new list items", () => {
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

    context("TC_81 => Group possible responses", () => {
      it("Check the group possible responses checkbox", () => {
        question.getGroupResponsesCheckbox().click();

        question
          .getGroupResponsesCheckbox()
          .find("input")
          .should("be.checked");

        question.getGroupContainerByIndex(0).should("be.visible");
      });

      it("Enter the title of group", () => {
        question
          .getTitleInputByIndex(0)
          .clear()
          .type("Group1")
          .should("have.value", "Group1");
      });

      it("Add/Delete new choices", () => {
        question
          .getChoiceListByGroup(0)
          .each(($el, index, $list) => {
            const cusIndex = $list.length - (index + 1);
            question.deleteChoiceByGroup(0, cusIndex);
          })
          .should("have.length", 0);

        queData.choices.forEach((ch, index) => {
          question
            .getAddNewChoiceByIndex(0)
            .should("be.visible")
            .click();
          question
            .getChoiceEditorByGroup(0, index)
            .next()
            .find("div .ql-editor")
            .clear()
            .type(ch)
            .should("be.visible");
          question
            .getDragDropBox()
            .contains("p", ch)
            .should("be.visible");
        });
      });

      it("Add new group", () => {
        question
          .getAddNewGroupButton()
          .click()
          .then(() => {
            question.getGroupContainerByIndex(1).should("be.visible");
          });
      });

      it("Delete group", () => {
        question
          .getGroupContainerByIndex(1)
          .contains("div", "Group 2")
          .next()
          .should("be.visible")
          .click()
          .then(() => {
            question.getGroupContainerByIndex(1).should("not.exist");
          });
      });
    });

    context("TC_82 => Set Correct Answer(s)", () => {
      it("Update Points", () => {
        question
          .getPontsInput()
          .focus()
          .clear()
          .type("{selectall}1")
          .should("have.value", "1")
          .type("{uparrow}")
          .should("have.value", "2")
          .blur();
      });

      it("Drag and drop the answer choices inside the box", () => {
        queData.choices.forEach((ch, index) => {
          question.getDragDropItemByIndex(index).customDragDrop(`#drag-drop-board-${index}`);
          question.getDragDropBoardByIndex(index).contains("p", ch);
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

    context("TC_83 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });
  });

  context("Delete the question after creation", () => {
    context("TC_84 => Delete option", () => {
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
      it("should be able to select top response container position", () => {
        const select = question.getResponseContainerPositionSelect();

        select.should("be.visible").click();

        question
          .getTopResContainerOption()
          .should("be.visible")
          .click();

        select.should("contain", "Top");
        question.checkResponseContainerPosition("top");
      });
      it("should be able to select bottom response container position", () => {
        const select = question.getResponseContainerPositionSelect();

        select.should("be.visible").click();

        question
          .getBottomResContainerOption()
          .should("be.visible")
          .click();

        select.should("contain", "Bottom");
        question.checkResponseContainerPosition("bottom");
      });
      it("should be able to select left response container position", () => {
        const select = question.getResponseContainerPositionSelect();

        select.should("be.visible").click();

        question
          .getLeftResContainerOption()
          .should("be.visible")
          .click();

        select.should("contain", "Left");
        question.checkResponseContainerPosition("left");
      });
      it("should be able to select right response container position", () => {
        const select = question.getResponseContainerPositionSelect();

        select.should("be.visible").click();

        question
          .getRightResContainerOption()
          .should("be.visible")
          .click();

        select.should("contain", "Right");
        question.checkResponseContainerPosition("right");
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
