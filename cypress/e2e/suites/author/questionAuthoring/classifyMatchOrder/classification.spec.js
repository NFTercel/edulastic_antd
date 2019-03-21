import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import ClassificationPage from "../../../../framework/author/itemList/questionType/classifyMatchOrder/classificationPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Classification" type question`, () => {
  const queData = {
    group: "Classify, Match & Order",
    queType: "Classification",
    queText: "Select the correct option?",
    template: " is the world's largest democracy",
    correctAns: "India",
    choices: ["China", "India"],
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2",
    column: 2,
    row: 1,
    columnTitles: ["Column1", "Column2"],
    rowTitles: ["Row1"],
    points: 2
  };

  const question = new ClassificationPage();
  const editItem = new EditItemPage();
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

    context("TC_57 => Enter the column and row", () => {
      it("Enter only numbers", () => {
        question
          .getDropDownColumn()
          .click()
          .then(() => {
            question
              .getDropDownListColumn(queData.column - 1)
              .should("be.visible")
              .click();
          });

        question.getDropDownColumn().contains("div", queData.column);

        question
          .getDropDownRow()
          .click()
          .then(() => {
            question
              .getDropDownListRow(queData.row - 1)
              .should("be.visible")
              .click();
          });

        question.getDropDownRow().contains("div", queData.row);
      });
    });

    context("TC_58 => Column titles", () => {
      before("Should have existing titles", () => {
        question.getColumnTitleInptuList().should("have.length", queData.columnTitles.length);
      });

      it("Edit the column names", () => {
        question.getColumnTitleInptuList().each(($el, index) => {
          cy.wrap($el)
            .click()
            .clear()
            .type(queData.columnTitles[index])
            .should("contain", queData.columnTitles[index]);
        });
      });

      it("Add new column", () => {
        question
          .getColumnAddButton()
          .click()
          .then(() => {
            question
              .getColumnTitleInptuList()
              .should("have.length", queData.columnTitles.length + 1)
              .last()
              .click()
              .clear()
              .type("Last")
              .should("contain", "Last");
          });
      });

      it("Delete existing column", () => {
        question
          .getColumnDeleteByIndex(queData.columnTitles.length)
          .click()
          .should("not.exist");

        question.getColumnTitleInptuList().should("have.length", queData.columnTitles.length);
      });
    });

    context("TC_59 => Row titles", () => {
      before("Should have existing titles", () => {
        question.getRowTitleInptuList().should("have.length", queData.rowTitles.length);
      });

      it("Edit the row names for existing", () => {
        question.getRowTitleInptuList().each(($el, index) => {
          cy.wrap($el)
            .click()
            .clear()
            .type(queData.rowTitles[index])
            .should("contain", queData.rowTitles[index]);
        });
      });

      it("Add new row", () => {
        question
          .getRowAddButton()
          .click()
          .then(() => {
            question
              .getRowTitleInptuList()
              .should("have.length", queData.rowTitles.length + 1)
              .last()
              .click()
              .clear()
              .type("Last")
              .should("contain", "Last");
          });
      });

      it("Delete existing / newly created rows", () => {
        question
          .getRowDeleteByIndex(queData.rowTitles.length)
          .click()
          .should("not.exist");

        question.getRowTitleInptuList().should("have.length", queData.rowTitles.length);
      });
    });

    context("TC_60 => Group possible responses", () => {
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

    context("TC_61 => Set Correct Answer(s)", () => {
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
          question.getDragDropItemByIndex(0).customDragDrop(`#drag-drop-board-${index}`);
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

    context("TC_62 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("TC_63 => Preview Items", () => {
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
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      // create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
      question.header.save();
      // edit
      editItem.getEditButton().click();
    });

    context("TC_65 => Enter the column and row", () => {
      it("Enter only numbers", () => {
        question
          .getDropDownColumn()
          .click()
          .then(() => {
            question
              .getDropDownListColumn(queData.column - 1)
              .should("be.visible")
              .click();
          });

        question.getDropDownColumn().contains("div", queData.column);

        question
          .getDropDownRow()
          .click()
          .then(() => {
            question
              .getDropDownListRow(queData.row - 1)
              .should("be.visible")
              .click();
          });

        question.getDropDownRow().contains("div", queData.row);
      });
    });

    context("TC_66 => Column titles", () => {
      before("Should have existing titles", () => {
        question.getColumnTitleInptuList().should("have.length", queData.columnTitles.length);
      });

      it("Edit the column names", () => {
        question.getColumnTitleInptuList().each(($el, index) => {
          cy.wrap($el)
            .click()
            .clear()
            .type(queData.columnTitles[index])
            .should("contain", queData.columnTitles[index]);
        });
      });

      it("Add new column", () => {
        question
          .getColumnAddButton()
          .click()
          .then(() => {
            question
              .getColumnTitleInptuList()
              .should("have.length", queData.columnTitles.length + 1)
              .last()
              .click()
              .clear()
              .type("Last")
              .should("contain", "Last");
          });
      });

      it("Delete existing column", () => {
        question
          .getColumnDeleteByIndex(queData.columnTitles.length)
          .click()
          .should("not.exist");

        question.getColumnTitleInptuList().should("have.length", queData.columnTitles.length);
      });
    });

    context("TC_67 => Row titles", () => {
      before("Should have existing titles", () => {
        question.getRowTitleInptuList().should("have.length", queData.rowTitles.length);
      });

      it("Edit the row names for existing", () => {
        question.getRowTitleInptuList().each(($el, index) => {
          cy.wrap($el)
            .click()
            .clear()
            .type(queData.rowTitles[index])
            .should("contain", queData.rowTitles[index]);
        });
      });

      it("Add new row", () => {
        question
          .getRowAddButton()
          .click()
          .then(() => {
            question
              .getRowTitleInptuList()
              .should("have.length", queData.rowTitles.length + 1)
              .last()
              .click()
              .clear()
              .type("Last")
              .should("contain", "Last");
          });
      });

      it("Delete existing / newly created rows", () => {
        question
          .getRowDeleteByIndex(queData.rowTitles.length)
          .click()
          .should("not.exist");

        question.getRowTitleInptuList().should("have.length", queData.rowTitles.length);
      });
    });

    context("TC_68 => Group possible responses", () => {
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

    context("TC_69 => Set Correct Answer(s)", () => {
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
          question.getDragDropItemByIndex(0).customDragDrop(`#drag-drop-board-${index}`);
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

    context("TC_70 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });
  });

  context("Delete the question after creation", () => {
    context("TC_70 => Delete option", () => {
      it("Click on delete button in Item Details page", () => {
        editItem
          .getDelButton()
          .should("have.length", 1)
          .click()
          .should("have.length", 0);
      });
    });
  });
});
