import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import DragAndDropPage from "../../../../framework/author/itemList/questionType/fillInBlank/dragAndDropPage";

describe('Author - "Label Image with Drag & Drop" type question', () => {
  const queData = {
    group: "Fill in the Blanks",
    queType: "Label Image with Drag & Drop",
    queText: "Indian state known as garden spice is:",
    choices: ["Kerala", "Delhi", "KL"],
    correct: ["Kerala"],
    alterate: ["KL"],
    extlink: "www.testdomain.com",
    formattext: "formattedtext",
    formula: "s=ar^2",
    points: "2",
    imageWidth: "500",
    imageAlternate: "Background",
    testColor: "#d49c9c",
    maxRes: "1"
  };

  const question = new DragAndDropPage();
  const editItem = new EditItemPage();
  const text = "testtext";

  before(() => {
    cy.setToken();
  });

  context("User creates question.", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();
      // create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });

    context("[Tc_370]:Tc_2 => Upload image", () => {
      it("Upload image to server", () => {
        cy.fixture("testImages/sample.jpg").then(logo => {
          Cypress.Blob.base64StringToBlob(logo, "image/jpg").then(blob => {
            cy.uploadImage(blob).then(result => {
              // update uploaded image link to store
              const imageUrl = result.response.body.result.fileUri;
              const currentQuestion = question.getCurrentStoreQuestion();
              currentQuestion.imageUrl = imageUrl;
              cy.window()
                .its("store")
                .invoke("dispatch", { type: "[author questions] update questions", payload: currentQuestion });
              cy.get('[data-cy="drag-drop-image-panel"] img').should("have.attr", "src", imageUrl);
            });
          });
        });

        // test with local image
        // const testImageUrl = 'https://edureact-dev.s3.amazonaws.com/1551154644960_blob';
        // const currentQuestion = question.getCurrentStoreQuestion()
        // currentQuestion.imageUrl = testImageUrl;
        // cy.window()
        //   .its('store')
        //   .invoke('dispatch', { type: '[author questions] update questions', payload: currentQuestion });
        // cy.get('[data-cy="drag-drop-image-panel"] img').should('have.attr', 'src', testImageUrl);
      });

      it("Width(px)", () => {
        question.changeImageWidth(queData.imageWidth);
        question.getImageWidth().should("have.attr", "width", queData.imageWidth);
      });

      it("Image alternative text", () => {
        question.inputImageAlternate(queData.imageAlternate);
        question.checkImageAlternate(queData.imageAlternate);
      });

      it("Fill color", () => {
        question.updateColorPicker(queData.testColor);
        question.getAllInputPanel().each($el => {
          cy.wrap($el).should("have.attr", "background", queData.testColor);
        });
      });

      it("Maximum responses per container", () => {
        question
          .getMaxResponseInput()
          .click()
          .clear()
          .type(queData.maxRes)
          .should("have.value", queData.maxRes);
      });

      it("Show dashed border", () => {
        question
          .getDashboardBorderCheck()
          .click()
          .find("input")
          .should("be.checked");

        question.getAllInputPanel().each($el => {
          cy.wrap($el).should("have.css", "border", "2px dashed rgba(0, 0, 0, 0.65)");
        });

        question
          .getDashboardBorderCheck()
          .click()
          .find("input")
          .should("not.be.checked");

        question.getAllInputPanel().each($el => {
          cy.wrap($el).should("have.css", "border", "1px solid rgb(211, 211, 211)");
        });
      });

      it("Edit ARIA labels", () => {
        question
          .getAriaLabelCheck()
          .click()
          .find("input")
          .should("be.checked");

        cy.get("body")
          .find(".iseditablearialabel")
          .should("be.visible");

        question
          .getAriaLabelCheck()
          .click()
          .find("input")
          .should("not.be.checked");

        cy.get("body")
          .find(".iseditablearialabel")
          .should("not.be.visible");
      });
    });

    context("[Tc_371]:Tc_3 => Possible responses block", () => {
      it("Delete Choices", () => {
        question
          .getAllChoices()
          .each(($el, index, $list) => {
            const cusIndex = $list.length - (index + 1);
            question.deleteChoiceByIndex(cusIndex);
          })
          .should("have.length", 0);
      });

      it("Add new choices", () => {
        queData.choices.forEach((ch, index) => {
          question
            .addNewChoice()
            .getChoiceByIndex(index)
            .clear()
            .type(ch)
            .should("have.value", ch);

          // check added answers

          question.checkAddedAnswers(ch);
        });
      });

      it("Edit the default text", () => {
        question.addNewChoice();
        question
          .getChoiceByIndex(queData.choices.length)
          .click()
          .should("have.value", "");
        question.deleteChoiceByIndex(queData.choices.length);
      });
    });

    context("[Tc_372]:Tc_4 => Set Correct Answer(s)", () => {
      it("Update points", () => {
        question
          .getPointsEditor()
          .clear()
          .type(`${queData.points}`)
          .should("have.value", queData.points)
          .type("{uparrow}")
          .type("{uparrow}")
          .should("have.value", `${Number(queData.points) + 1}`)
          .blur();
      });

      it("Add/Delete alternatives", () => {
        question.addAlternate();
        question.checkAndDeleteAlternates();
      });

      it("Drag and drop the responses", () => {
        // box to board
        question.dragAndDropResponseToBoard(0);
        question.dragAndDropBoardToBoard(0, 1);
        // board to board
      });

      it("Check/uncheck duplicate response check box", () => {
        question
          .getMultipleResponse()
          .click()
          .find("input")
          .should("be.checked");

        question
          .getResponsesBox()
          .first()
          .invoke("text")
          .then(res => {
            question.dragAndDropResponseToBoard(0);
            question
              .getResponsesBox()
              .first()
              .should("have.text", res);
            question
              .getMultipleResponse()
              .click()
              .find("input")
              .should("not.be.checked");
            question
              .getResponsesBox()
              .first()
              .should("not.have.text", res);
            question
              .getResponsesBoard()
              .first()
              .contains(queData.choices[0])
              .should("not.exist");
          });
      });

      it("Check/uncheck Show Drag Handle", () => {
        question
          .getDragHandle()
          .click()
          .find("input")
          .should("be.checked");

        question.getResponsesBox().each($el => {
          cy.wrap($el)
            .find("i")
            .should("be.visible");
        });

        question
          .getDragHandle()
          .click()
          .find("input")
          .should("not.be.checked");

        question.getResponsesBox().each($el => {
          cy.wrap($el)
            .find("i")
            .should("not.be.visible");
        });
      });

      it("Check/uncheck Shuffle Possible responses", () => {
        question
          .getShuffleResponse()
          .click()
          .find("input")
          .should("be.checked");
        question.getResponsesBox().each($el => {
          cy.wrap($el).should("be.visible");
        });

        question
          .getShuffleResponse()
          .click()
          .find("input")
          .should("not.be.checked");
        question.getResponsesBox().each($el => {
          cy.wrap($el).should("be.visible");
        });
      });

      it("Check/uncheck Transparent possible responses", () => {
        question
          .getTransparentResponse()
          .click()
          .find("input")
          .should("be.checked");
        question.getResponsesBoxTransparent();

        question
          .getTransparentResponse()
          .click()
          .find("input")
          .should("not.be.checked");
        question.getResponsesBox();
      });
    });

    context("[Tc_373]:Tc_5 => Save Question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("[Tc_374]:Tc_6 => Preview items", () => {
      it("Click on Preview, CheckAnswer", () => {
        const preview = editItem.header.preview();
        question.dragAndDropResponseToBoard(1);
        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            cy.get("body")
              .children()
              .should("contain", "score: 3/3");
          });
      });

      it("Click on ShowAnswer", () => {
        const preview = editItem.header.preview();
        preview.getClear().click();

        preview
          .getShowAnswer()
          .click()
          .then(() => {
            cy.get(".correctanswer-box")
              .contains(queData.choices[0])
              .should("be.visible");
          });
      });

      it("Click on Clear, Edit", () => {
        const preview = editItem.header.preview();
        preview
          .getClear()
          .click()
          .then(() => {
            cy.get(".correctanswer-box").should("not.exist");
            question
              .getResponsesBoard()
              .children()
              .should("have.length", 0);
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

    context("[Tc_376]:Tc_2 => Upload image", () => {
      it("Upload image to server", () => {
        cy.fixture("testImages/sample.jpg").then(logo => {
          Cypress.Blob.base64StringToBlob(logo, "image/jpg").then(blob => {
            cy.uploadImage(blob).then(result => {
              // update uploaded image link to store
              const imageUrl = result.response.body.result.fileUri;
              const currentQuestion = question.getCurrentStoreQuestion();
              currentQuestion.imageUrl = imageUrl;
              cy.window()
                .its("store")
                .invoke("dispatch", { type: "[author questions] update questions", payload: currentQuestion });
              cy.get('[data-cy="drag-drop-image-panel"] img').should("have.attr", "src", imageUrl);
            });
          });
        });

        // test with local image
        // const testImageUrl = 'https://edureact-dev.s3.amazonaws.com/1551154644960_blob';
        // const currentQuestion = question.getCurrentStoreQuestion()
        // currentQuestion.imageUrl = testImageUrl;
        // cy.window()
        //   .its('store')
        //   .invoke('dispatch', { type: '[author questions] update questions', payload: currentQuestion });
        // cy.get('[data-cy="drag-drop-image-panel"] img').should('have.attr', 'src', testImageUrl);
      });

      it("Width(px)", () => {
        question.changeImageWidth(queData.imageWidth);
        question.getImageWidth().should("have.attr", "width", queData.imageWidth);
      });

      it("Image alternative text", () => {
        question.inputImageAlternate(queData.imageAlternate);
        question.checkImageAlternate(queData.imageAlternate);
      });

      it("Fill color", () => {
        question.updateColorPicker(queData.testColor);
        question.getAllInputPanel().each($el => {
          cy.wrap($el).should("have.attr", "background", queData.testColor);
        });
      });

      it("Maximum responses per container", () => {
        question
          .getMaxResponseInput()
          .click()
          .clear()
          .type(queData.maxRes)
          .should("have.value", queData.maxRes);
      });

      it("Show dashed border", () => {
        question
          .getDashboardBorderCheck()
          .click()
          .find("input")
          .should("be.checked");

        question.getAllInputPanel().each($el => {
          cy.wrap($el).should("have.css", "border", "2px dashed rgba(0, 0, 0, 0.65)");
        });

        question
          .getDashboardBorderCheck()
          .click()
          .find("input")
          .should("not.be.checked");

        question.getAllInputPanel().each($el => {
          cy.wrap($el).should("have.css", "border", "1px solid rgb(211, 211, 211)");
        });
      });

      it("Edit ARIA labels", () => {
        question
          .getAriaLabelCheck()
          .click()
          .find("input")
          .should("be.checked");

        cy.get("body")
          .find(".iseditablearialabel")
          .should("be.visible");

        question
          .getAriaLabelCheck()
          .click()
          .find("input")
          .should("not.be.checked");

        cy.get("body")
          .find(".iseditablearialabel")
          .should("not.be.visible");
      });
    });

    context("[Tc_377]:Tc_3 => Possible responses block", () => {
      it("Delete Choices", () => {
        question
          .getAllChoices()
          .each(($el, index, $list) => {
            const cusIndex = $list.length - (index + 1);
            question.deleteChoiceByIndex(cusIndex);
          })
          .should("have.length", 0);
      });

      it("Add new choices", () => {
        queData.choices.forEach((ch, index) => {
          question
            .addNewChoice()
            .getChoiceByIndex(index)
            .clear()
            .type(ch)
            .should("have.value", ch);

          // check added answers

          question.checkAddedAnswers(ch);
        });
      });

      it("Edit the default text", () => {
        question.addNewChoice();
        question
          .getChoiceByIndex(queData.choices.length)
          .click()
          .should("have.value", "");
        question.deleteChoiceByIndex(queData.choices.length);
      });
    });

    context("[Tc_378]:Tc_4 => Set Correct Answer(s)", () => {
      it("Update points", () => {
        question
          .getPointsEditor()
          .clear()
          .type(`${queData.points}`)
          .should("have.value", queData.points)
          .type("{uparrow}")
          .type("{uparrow}")
          .should("have.value", `${Number(queData.points) + 1}`)
          .blur();
      });

      it("Add/Delete alternatives", () => {
        question.addAlternate();
        question.checkAndDeleteAlternates();
      });

      it("Drag and drop the responses", () => {
        // box to board
        question.dragAndDropResponseToBoard(0);
        question.dragAndDropBoardToBoard(0, 1);
        // board to board
      });

      it("Check/uncheck duplicate response check box", () => {
        question
          .getMultipleResponse()
          .click()
          .find("input")
          .should("be.checked");

        question
          .getResponsesBox()
          .first()
          .invoke("text")
          .then(res => {
            question.dragAndDropResponseToBoard(0);
            question
              .getResponsesBox()
              .first()
              .should("have.text", res);
            question
              .getMultipleResponse()
              .click()
              .find("input")
              .should("not.be.checked");
            question
              .getResponsesBox()
              .first()
              .should("not.have.text", res);
            question
              .getResponsesBoard()
              .first()
              .contains(queData.choices[0])
              .should("not.exist");
          });
      });

      it("Check/uncheck Show Drag Handle", () => {
        question
          .getDragHandle()
          .click()
          .find("input")
          .should("be.checked");

        question.getResponsesBox().each($el => {
          cy.wrap($el)
            .find("i")
            .should("be.visible");
        });

        question
          .getDragHandle()
          .click()
          .find("input")
          .should("not.be.checked");

        question.getResponsesBox().each($el => {
          cy.wrap($el)
            .find("i")
            .should("not.be.visible");
        });
      });

      it("Check/uncheck Shuffle Possible responses", () => {
        question
          .getShuffleResponse()
          .click()
          .find("input")
          .should("be.checked");
        question.getResponsesBox().each($el => {
          cy.wrap($el).should("be.visible");
        });

        question
          .getShuffleResponse()
          .click()
          .find("input")
          .should("not.be.checked");
        question.getResponsesBox().each($el => {
          cy.wrap($el).should("be.visible");
        });
      });

      it("Check/uncheck Transparent possible responses", () => {
        question
          .getTransparentResponse()
          .click()
          .find("input")
          .should("be.checked");
        question.getResponsesBoxTransparent();

        question
          .getTransparentResponse()
          .click()
          .find("input")
          .should("not.be.checked");
        question.getResponsesBox();
      });
    });

    context("[Tc_379]:Tc_5 => Save questions", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("[Tc_380]:Tc_6 => Preview items", () => {
      it("Click on Preview, CheckAnswer", () => {
        const preview = editItem.header.preview();
        question.dragAndDropResponseToBoard(1);
        preview
          .getCheckAnswer()
          .click()
          .then(() => {
            cy.get("body")
              .children()
              .should("contain", "score: 3/3");
          });
      });

      it("Click on ShowAnswer", () => {
        const preview = editItem.header.preview();
        preview.getClear().click();

        preview
          .getShowAnswer()
          .click()
          .then(() => {
            cy.get(".correctanswer-box")
              .contains(queData.choices[0])
              .should("be.visible");
          });
      });

      it("Click on Clear, Edit", () => {
        const preview = editItem.header.preview();
        preview
          .getClear()
          .click()
          .then(() => {
            cy.get(".correctanswer-box").should("not.exist");
            question
              .getResponsesBoard()
              .children()
              .should("have.length", 0);
          });

        preview.header.edit();
      });
    });
  });

  context("Delete the question after creation", () => {
    context("[Tc_381]:Tc_1 => Delete option", () => {
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
