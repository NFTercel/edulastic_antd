import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import HightlightImagePage from "../../../../framework/author/itemList/questionType/highlight/highlightImagePage";

describe('Author - "Cloze with Text" type question', () => {
  const queData = {
    group: "Highlight",
    queType: "Highlight Image",
    queText: "Highlight image test",
    imageWidth: "600",
    imageHeight: "400",
    altText: "Image Alt Text",
    color1: "rgb(0, 255, 0)",
    color2: "rgb(0, 0, 0)"
  };

  const question = new HightlightImagePage();
  const editItem = new EditItemPage();
  let preview;

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

    context("TC_238 => Image upload area", () => {
      it("Upload image to server", () => {
        // cy.fixture("testImages/sample.jpg").then(logo => {
        //   Cypress.Blob.base64StringToBlob(logo, "image/jpg").then(blob => {
        //     cy.uploadImage(blob).then(result => {
        //       // update uploaded image link to store
        //       const imageUrl = result.response.body.result.fileUri;
        //       const currentQuestion = question.getCurrentStoreQuestion();
        //       currentQuestion.image.source = imageUrl;
        //       cy.window()
        //         .its("store")
        //         .invoke("dispatch", { type: "[author questions] update questions", payload: currentQuestion });
        //       question
        //         .getDropZoneImageContainer()
        //         .find("img")
        //         .should("have.attr", "src", imageUrl);
        //     });
        //   });
        // });

        // test with local image
        const testImageUrl = "https://edureact-dev.s3.amazonaws.com/1551154644960_blob";
        const currentQuestion = question.getCurrentStoreQuestion();
        currentQuestion.image.source = testImageUrl;
        cy.window()
          .its("store")
          .invoke("dispatch", { type: "[author questions] update questions", payload: currentQuestion });
        question
          .getDropZoneImageContainer()
          .find("img")
          .should("have.attr", "src", testImageUrl);
      });

      it("Enter Width (px)", () => {
        question.changeImageWidth(queData.imageWidth);
        question
          .getDropZoneImageContainer()
          .find("img")
          .should("have.attr", "width", queData.imageWidth);
      });

      it("Enter Height (px)", () => {
        question.changeImageHeight(queData.imageHeight);
        question
          .getDropZoneImageContainer()
          .find("img")
          .should("have.attr", "height", queData.imageHeight);
      });

      it("Image alternative text", () => {
        question.addImageAlternative(queData.altText);
        question
          .getDropZoneImageContainer()
          .find("img")
          .should("have.attr", "alt", queData.altText);
      });
    });

    context("TC_239 => Line color options", () => {
      it("Click on color", () => {
        const currentQuestion = question.getCurrentStoreQuestion();
        currentQuestion.line_color[0] = queData.color1;
        cy.window()
          .its("store")
          .invoke("dispatch", { type: "[author questions] update questions", payload: currentQuestion });
        cy.contains("div", "Line color 1")
          .next()
          .find(".rc-color-picker-trigger")
          .should("be.visible")
          .should("have.css", "background-color", queData.color1);
      });

      it("Add new color", () => {
        question.clickAddColor();
        cy.contains("div", "Line color 2").should("be.visible");
      });

      it("Delete Color", () => {
        cy.contains("div", "Line color 2")
          .next()
          .children()
          .last()
          .click()
          .then(() => {
            cy.contains("div", "Line color 2").should("not.exist");
          });
      });
    });

    context("TC_240 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("TC_241 => Preview items", () => {
      it("Click on preview", () => {
        preview = editItem.header.preview();
        cy.get("body").contains("span", "Clear");
        cy.get("canvas")
          .trigger("mousedown", 100, 100)
          .trigger("mousemove", 150, 150)
          .trigger("mousemove", 200, 200)
          .trigger("mouseup", 200, 200);
      });

      it("Shoudn't Visible Check Answer, Show Answer button", () => {
        cy.contains("span", "Check Answer").should("not.visible");
        cy.contains("span", "Show Answers").should("not.visible");
      });

      it("Click on Clear", () => {
        preview
          .getClear()
          .should("be.visible")
          .click();

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

    context("TC_243 => Image upload area", () => {
      it("Upload image to server", () => {
        cy.fixture("testImages/sample.jpg").then(logo => {
          Cypress.Blob.base64StringToBlob(logo, "image/jpg").then(blob => {
            cy.uploadImage(blob).then(result => {
              // update uploaded image link to store
              const imageUrl = result.response.body.result.fileUri;
              const currentQuestion = question.getCurrentStoreQuestion();
              currentQuestion.image.source = imageUrl;
              cy.window()
                .its("store")
                .invoke("dispatch", { type: "[author questions] update questions", payload: currentQuestion });
              question
                .getDropZoneImageContainer()
                .find("img")
                .should("have.attr", "src", imageUrl);
            });
          });
        });

        // test with local image
        // const testImageUrl = 'https://edureact-dev.s3.amazonaws.com/1551154644960_blob';
        // const currentQuestion = question.getCurrentStoreQuestion()
        // currentQuestion.image.source = testImageUrl;
        // cy.window()
        //   .its('store')
        //   .invoke('dispatch', { type: '[author questions] update questions', payload: currentQuestion });
        // question.getDropZoneImageContainer().find('img').should("have.attr", "src", testImageUrl);
      });

      it("Enter Width (px)", () => {
        question.changeImageWidth(queData.imageWidth);
        question
          .getDropZoneImageContainer()
          .find("img")
          .should("have.attr", "width", queData.imageWidth);
      });

      it("Enter Height (px)", () => {
        question.changeImageHeight(queData.imageHeight);
        question
          .getDropZoneImageContainer()
          .find("img")
          .should("have.attr", "height", queData.imageHeight);
      });

      it("Image alternative text", () => {
        question.addImageAlternative(queData.altText);
        question
          .getDropZoneImageContainer()
          .find("img")
          .should("have.attr", "alt", queData.altText);
      });
    });

    context("TC_244 => Line color options", () => {
      it("Click on color", () => {
        const currentQuestion = question.getCurrentStoreQuestion();
        currentQuestion.line_color[0] = queData.color1;
        cy.window()
          .its("store")
          .invoke("dispatch", { type: "[author questions] update questions", payload: currentQuestion });
        cy.contains("div", "Line color 1")
          .next()
          .find(".rc-color-picker-trigger")
          .should("be.visible")
          .should("have.css", "background-color", queData.color1);
      });

      it("Add new color", () => {
        question.clickAddColor();
        cy.contains("div", "Line color 2").should("be.visible");
      });

      it("Delete Color", () => {
        cy.contains("div", "Line color 2")
          .next()
          .children()
          .last()
          .click()
          .then(() => {
            cy.contains("div", "Line color 2").should("not.exist");
          });
      });
    });

    context("TC_245 => Save question", () => {
      it("Click on save button", () => {
        question.header.save();
        cy.url().should("contain", "item-detail");
      });
    });

    context("TC_246 => Preview Items", () => {
      it("Click on preview", () => {
        preview = editItem.header.preview();
        cy.get("body").contains("span", "Clear");
        cy.get("canvas")
          .trigger("mousedown", 100, 100)
          .trigger("mousemove", 150, 150)
          .trigger("mousemove", 200, 200)
          .trigger("mouseup", 200, 200);
      });

      it("Shoudn't Visible Check Answer, Show Answer button", () => {
        cy.contains("span", "Check Answer").should("not.visible");
        cy.contains("span", "Show Answers").should("not.visible");
      });

      it("Click on Clear", () => {
        preview
          .getClear()
          .should("be.visible")
          .click();

        preview.header.edit();
      });
    });

    context("TC_247 => Delete option", () => {
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
