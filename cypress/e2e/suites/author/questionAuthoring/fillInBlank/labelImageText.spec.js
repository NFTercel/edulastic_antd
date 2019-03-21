import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import TextPage from "../../../../framework/author/itemList/questionType/fillInBlank/textPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Label Image with Text" type question`, () => {
  const queData = {
    group: "Fill in the Blanks",
    queType: "Label Image with Text",
    queText: "Indian state known as garden spice is:",
    choices: ["Answer0", "Answer1", "Answer2"],
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

  const question = new TextPage();
  const editItem = new EditItemPage();

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

    context("[Tc_398]:Tc_2 => Upload image", () => {
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

    context("[Tc_399]:Tc_4 => Set Correct Answer(s)", () => {
      it("Update points", () => {
        question
          .getPointsEditor()
          .clear()
          .type(`${queData.points}`)
          .should("have.value", queData.points)
          .type("{uparrow}")
          .type("{uparrow}")
          .should("have.value", `${Number(queData.points) + 1}`);
      });

      it("Add correct Answers", () => {
        question.getAnswersFieldOnTextPage().each(($el, index) => {
          cy.wrap($el)
            .type(queData.choices[index])
            .should("have.value", queData.choices[index]);
        });
      });

      it("Add/Delete alternatives", () => {
        question.addAlternate();
        question.checkAndDeleteAlternates();
      });

      it("Check/uncheck Shuffle Possible responses", () => {
        question
          .getShuffleTextImage()
          .click()
          .find("input")
          .should("be.checked");

        question
          .getShuffleDropDown()
          .click()
          .find("input")
          .should("not.be.checked");
      });
    });

    context("[Tc_400]:Tc_5 => Save Question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("[Tc_401]:Tc_6 => Preview items", () => {
      it("Click on Preview, CheckAnswer", () => {
        const preview = editItem.header.preview();

        question.getAnswersFieldOnTextPage().each(($el, index) => {
          cy.wrap($el)
            .type(queData.choices[index])
            .should("have.value", queData.choices[index]);
        });

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
            cy.contains("h2", "Correct Answer")
              .next()
              .then($el => {
                queData.choices.forEach(ch => {
                  cy.wrap($el).contains(ch);
                });
              });
          });
      });

      it("Click on Clear, Edit", () => {
        const preview = editItem.header.preview();
        preview
          .getClear()
          .click()
          .then(() => {
            cy.contains("h2", "Correct Answer").should("not.exist");
          });

        preview.header.edit();
      });
    });
  });

  context("Edit the question created.", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();
      // create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });

    context("[Tc_403]:Tc_2 => Upload image", () => {
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

    context("[Tc_404]:Tc_4 => Set Correct Answer(s)", () => {
      it("Update points", () => {
        question
          .getPointsEditor()
          .clear()
          .type(`${queData.points}`)
          .should("have.value", queData.points)
          .type("{uparrow}")
          .type("{uparrow}")
          .should("have.value", `${Number(queData.points) + 1}`);
      });

      it("Add correct Answers", () => {
        question.getAnswersFieldOnTextPage().each(($el, index) => {
          cy.wrap($el)
            .type(queData.choices[index])
            .should("have.value", queData.choices[index]);
        });
      });

      it("Add/Delete alternatives", () => {
        question.addAlternate();
        question.checkAndDeleteAlternates();
      });

      it("Check/uncheck Shuffle Possible responses", () => {
        question
          .getShuffleTextImage()
          .click()
          .find("input")
          .should("be.checked");

        question
          .getShuffleDropDown()
          .click()
          .find("input")
          .should("not.be.checked");
      });
    });

    context("[Tc_406]:Tc_5 => Save Question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("[Tc_407]:Tc_6 => Preview items", () => {
      it("Click on Preview, CheckAnswer", () => {
        const preview = editItem.header.preview();

        question.getAnswersFieldOnTextPage().each(($el, index) => {
          cy.wrap($el)
            .type(queData.choices[index])
            .should("have.value", queData.choices[index]);
        });

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
            cy.contains("h2", "Correct Answer")
              .next()
              .then($el => {
                queData.choices.forEach(ch => {
                  cy.wrap($el).contains(ch);
                });
              });
          });
      });

      it("Click on Clear, Edit", () => {
        const preview = editItem.header.preview();
        preview
          .getClear()
          .click()
          .then(() => {
            cy.contains("h2", "Correct Answer").should("not.exist");
          });

        preview.header.edit();
      });
    });
  });

  context("[Tc_410]:Tc_1 => Delete option", () => {
    it("Click on delete button in Item Details page", () => {
      editItem
        .getDelButton()
        .should("have.length", 1)
        .click()
        .should("have.length", 0);
    });
  });
});
