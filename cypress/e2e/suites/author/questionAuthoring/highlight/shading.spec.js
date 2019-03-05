import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage.js";
import ShadingPage from "../../../../framework/author/itemList/questionType/highlight/shadingPage";

describe('Author - "Cloze with Text" type question', () => {
  const queData = {
    group: "Highlight",
    queType: "Shading",
    queText: "Shade the first and last box?",
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2"
  };

  const question = new ShadingPage();
  const editItem = new EditItemPage();
  let preview;

  before(() => {
    cy.setToken();
  });

  context("Create basic question and validate.", () => {
    before("visit items page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();
      // create new que and select type
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });

    const RED = "rgb(238, 22, 88)";
    const GREEN = "rgb(31, 227, 161)";
    const CLEAR = "rgba(0, 176, 255, 0.19)";

    it("[shad_s1] : user create question with default option and save", () => {
      // enter question
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("have.text", queData.queText);

      // set correct ans
      question
        .getCorrectAnsRowByIndex(0)
        .find("li")
        .first()
        .click()
        .should("not.have.css", "background-color", "transparent");

      question
        .getCorrectAnsRowByIndex(0)
        .find("li")
        .last()
        .click()
        .should("not.have.css", "background-color", "transparent");

      // save que
      question.header.save();
    });

    it("[shad_s2] : preview and validate with right/wrong ans", () => {
      preview = editItem.header.preview();
      // enter right ans
      question
        .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
        .find("li")
        .first()
        .as("first")
        .click();
      question
        .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
        .find("li")
        .last()
        .as("last")
        .click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 1/1");

          cy.get("@first").should("have.css", "background-color", GREEN);

          cy.get("@last").should("have.css", "background-color", GREEN);
        });

      preview
        .getClear()
        .click()
        .then(() => {
          question
            .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
            .find("li")
            .then($cells => {
              cy.wrap($cells).each(ele => {
                expect(ele).to.have.css("background-color", CLEAR);
              });
            });
        });

      // enter partial correct ans
      question
        .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
        .find("li")
        .eq(0)
        .as("wrong")
        .click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");
          cy.get("@wrong").should("have.css", "background-color", GREEN);
        });

      preview.getClear().click();

      // enter wrong ans1
      question
        .getCorrectAnsRowByIndexOnPreview(queData.queText, 0)
        .find("li")
        .eq(1)
        .as("wrong1")
        .click();

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");

          cy.get("@wrong1").should("have.css", "background-color", RED);
        });

      preview.getClear().click();

      // show ans
      preview
        .getShowAnswer()
        .click()
        .then(() => {
          cy.get("@first").should("have.css", "background-color", GREEN);

          cy.get("@last").should("have.css", "background-color", GREEN);
        });
    });
  });
});
