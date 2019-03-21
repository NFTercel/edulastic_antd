import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import ClozeDragDropPage from "../../../../framework/author/itemList/questionType/fillInBlank/clozeWithDragDropPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Cloze with Drag & Drop" type question`, () => {
  const queData = {
    group: "Fill in the Blanks",
    queType: "Cloze with Drag & Drop",
    queText: "Select the correct option?",
    template: " is the world's largest democracy",
    correctAns: "India",
    choices: ["China", "India", "US"],
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2"
  };

  const question = new ClozeDragDropPage();
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

    context("TC_2 => Enter the text/inputs to Template Markup", () => {
      it("Write text in textbox", () => {
        question
          .getTemplateEditor()
          .clear()
          .type(queData.testtext)
          .should("contain", queData.testtext);

        question.templateMarkupBar
          .response()
          .click()
          .then(() => {
            question.getTemplateEditor().contains("span", "Response");
          });
      });
    });

    context("TC_3 => Use Group possible responses block", () => {
      it("Check the group possible responses checkbox", () => {
        question
          .getGroupResponsesCheckbox()
          .click()
          .then($el => {
            cy.wrap($el)
              .prev()
              .should("be.checked");
            question
              .getAddedGroupTitle()
              .should("be.visible")
              .next()
              .click()
              .should("not.exist");
          });
        question
          .getGroupResponsesCheckbox()
          .click()
          .prev()
          .should("not.checked");
      });

      it("Delete choices", () => {
        question
          .getChoiceResponseContainer()
          .each(($el, index, $list) => {
            const cusIndex = $list.length - (index + 1);
            cy.wrap($list[cusIndex])
              .should("be.visible")
              .find(".main")
              .next()
              .click();
          })
          .should("have.length", 0);
      });

      it("Add new choices", () => {
        queData.choices.forEach((ch, index) => {
          question
            .getAddChoiceButton()
            .click()
            .then(() => {
              question
                .getChoiceInputByIndex(index)
                .should("be.visible")
                .focus()
                .clear()
                .type(ch)
                .should("have.value", ch);
              question.getResponseItemByIndex(index).should("be.visible");
            });
        });
      });
    });

    context("TC_4 => Set Correct Answer(s)", () => {
      it("Update Points", () => {
        question
          .getPontsInput()
          .focus()
          .clear()
          .type("{selectall}1")
          .should("have.value", "1")
          .type("{uparrow}")
          .type("{uparrow}")
          .should("have.value", "2")
          .blur();
      });

      it("Drag and drop the responses", () => {
        question
          .getResponseItemByIndex(0)
          .customDragDrop(`#response-container-${0}`)
          .then(() => {
            question.getResponseContainerByIndex(0).contains("div", queData.choices[0]);
          });
      });

      it("Check/Uncheck duplicate response checkbox", () => {
        question.getDuplicatedResposneCheck().click();
        question
          .getDuplicatedResposneCheck()
          .find("input")
          .should("be.checked")
          .then(() => {
            question.getResponseItemByIndex(0).contains("div", queData.choices[0]);
          });

        question.getDuplicatedResposneCheck().click();
        question
          .getDuplicatedResposneCheck()
          .find("input")
          .should("not.checked")
          .then(() => {
            question.getResponseItemByIndex(0).contains("div", queData.choices[1]);
          });
      });

      it("Check/Uncheck Show Drag Handle", () => {
        question.getDraghandleCheck().click();
        question
          .getDraghandleCheck()
          .find("input")
          .should("be.checked");
        question
          .getResponseItemByIndex(0)
          .find("i")
          .should("be.visible");

        question.getDraghandleCheck().click();
        question
          .getDraghandleCheck()
          .find("input")
          .should("not.checked");
        question
          .getResponseItemByIndex(0)
          .find("i")
          .should("not.exist");
      });

      it("Check/uncheck Shuffle Options", () => {
        question.getShuffleOptionCheck().click();
        question
          .getShuffleOptionCheck()
          .find("input")
          .should("be.checked");

        question
          .getResponseItemByIndex(0)
          .parent()
          .contains("div", queData.choices[1]);

        question
          .getResponseItemByIndex(0)
          .parent()
          .contains("div", queData.choices[2]);

        question.getShuffleOptionCheck().click();
        question
          .getShuffleOptionCheck()
          .find("input")
          .should("not.checked");

        question
          .getResponseItemByIndex(1)
          .parent()
          .contains("div", queData.choices[1]);

        question
          .getResponseItemByIndex(0)
          .parent()
          .contains("div", queData.choices[2]);
      });

      it("Click on + symbol", () => {
        question
          .getAddAlternative()
          .click()
          .then(() => {
            question
              .getAddedAlternateTab()
              .should("be.visible")
              .next()
              .click()
              .should("not.exist");
          });
      });
    });

    context("TC_5 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("TC_6 => Preview Items", () => {
      it("Click on preview", () => {
        preview = editItem.header.preview();
        cy.get("body").contains("span", "Check Answer");

        question.getResponseItemByIndex(0).customDragDrop("#response-container-0");
        question.getResponseContainerByIndex(0).contains("div", queData.choices[0]);
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
              .contains("h2", "Correct Answer")
              .next()
              .contains("span", queData.choices[0]);
          });
      });

      it("Click on Clear", () => {
        preview
          .getClear()
          .click()
          .then(() => {
            question.getResponseContainerByIndex(0).should("not.contain", queData.choices[0]);
            queData.choices.forEach((ch, index) => {
              question.getResponseItemByIndex(index).should("contain", ch);
            });
            cy.get("body")
              .children()
              .should("not.contain", "Correct Answer");
          });

        preview.header.edit();
      });
    });
  });

  context("Edit the question created", () => {
    before("delete old question and create dummy que to edit", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      // create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
      question.header.save();
      // edit
      editItem.getEditButton().click();
    });

    context("TC_8 => Enter the text/inputs to Template Markup", () => {
      it("Write text in textbox", () => {
        question
          .getTemplateEditor()
          .clear()
          .type(queData.testtext)
          .should("contain", queData.testtext);

        question.templateMarkupBar
          .response()
          .click()
          .then(() => {
            question.getTemplateEditor().contains("span", "Response");
          });
      });
    });

    context("TC_9 => Use Group possible responses block", () => {
      it("Check the group possible responses checkbox", () => {
        question
          .getGroupResponsesCheckbox()
          .click()
          .then($el => {
            cy.wrap($el)
              .prev()
              .should("be.checked");
            question
              .getAddedGroupTitle()
              .should("be.visible")
              .next()
              .click()
              .should("not.exist");
          });
        question
          .getGroupResponsesCheckbox()
          .click()
          .prev()
          .should("not.checked");
      });

      it("Delete choices", () => {
        question
          .getChoiceResponseContainer()
          .each(($el, index, $list) => {
            const cusIndex = $list.length - (index + 1);
            cy.wrap($list[cusIndex])
              .should("be.visible")
              .find(".main")
              .next()
              .click();
          })
          .should("have.length", 0);
      });

      it("Add new choices", () => {
        queData.choices.forEach((ch, index) => {
          question
            .getAddChoiceButton()
            .click()
            .then(() => {
              question
                .getChoiceInputByIndex(index)
                .should("be.visible")
                .focus()
                .clear()
                .type(ch)
                .should("have.value", ch);
              question.getResponseItemByIndex(index).should("be.visible");
            });
        });
      });
    });

    context("TC_10 => Set Correct Answer(s)", () => {
      it("Update Points", () => {
        question
          .getPontsInput()
          .focus()
          .clear()
          .type("{selectall}1")
          .should("have.value", "1")
          .type("{uparrow}")
          .type("{uparrow}")
          .should("have.value", "2")
          .blur();
      });

      it("Drag and drop the responses", () => {
        question
          .getResponseItemByIndex(0)
          .customDragDrop(`#response-container-${0}`)
          .then(() => {
            question.getResponseContainerByIndex(0).contains("div", queData.choices[0]);
          });
      });

      it("Check/Uncheck duplicate response checkbox", () => {
        question.getDuplicatedResposneCheck().click();
        question
          .getDuplicatedResposneCheck()
          .find("input")
          .should("be.checked")
          .then(() => {
            question.getResponseItemByIndex(0).contains("div", queData.choices[0]);
          });

        question.getDuplicatedResposneCheck().click();
        question
          .getDuplicatedResposneCheck()
          .find("input")
          .should("not.checked")
          .then(() => {
            question.getResponseItemByIndex(0).contains("div", queData.choices[1]);
          });
      });

      it("Check/Uncheck Show Drag Handle", () => {
        question.getDraghandleCheck().click();
        question
          .getDraghandleCheck()
          .find("input")
          .should("be.checked");
        question
          .getResponseItemByIndex(0)
          .find("i")
          .should("be.visible");

        question.getDraghandleCheck().click();
        question
          .getDraghandleCheck()
          .find("input")
          .should("not.checked");
        question
          .getResponseItemByIndex(0)
          .find("i")
          .should("not.exist");
      });

      it("Check/uncheck Shuffle Options", () => {
        question.getShuffleOptionCheck().click();
        question
          .getShuffleOptionCheck()
          .find("input")
          .should("be.checked");

        question
          .getResponseItemByIndex(0)
          .parent()
          .contains("div", queData.choices[1]);

        question
          .getResponseItemByIndex(0)
          .parent()
          .contains("div", queData.choices[2]);

        question.getShuffleOptionCheck().click();
        question
          .getShuffleOptionCheck()
          .find("input")
          .should("not.checked");

        question
          .getResponseItemByIndex(1)
          .parent()
          .contains("div", queData.choices[1]);

        question
          .getResponseItemByIndex(0)
          .parent()
          .contains("div", queData.choices[2]);
      });

      it("Click on + symbol", () => {
        question
          .getAddAlternative()
          .click()
          .then(() => {
            question
              .getAddedAlternateTab()
              .should("be.visible")
              .next()
              .click()
              .should("not.exist");
          });
      });
    });

    context("TC_11 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("TC_12 => Delete options", () => {
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
