import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage.js";
import ClozeWithTextPage from "../../../../framework/author/itemList/questionType/fillInBlank/clozeWithTextPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Cloze with Text" type question`, () => {
  const queData = {
    group: "Fill in the Blanks",
    queType: "Cloze with Text",
    queText: "Fill in the blanks?",
    template: "Enter the capital of india = ",
    correctAns: "NEW DELHI",
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2"
  };

  const question = new ClozeWithTextPage();
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

    it("[clz_txt_s1] : user create question with default option and save", () => {
      // enter question
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("have.text", queData.queText);

      question
        .getTemplateEditor()
        .clear()
        .type(queData.template)
        .should("have.text", queData.template);

      question.TemplateMarkupBar.response().click();

      question.getResponseBoxByIndex(0).type(queData.correctAns);
      // save que
      question.header.save();
    });

    it("[clz_txt_s2] : preview and validate with right/wrong ans", () => {
      preview = editItem.header.preview();
      // enter right ans
      question.getResponseBoxByIndex(0).type(queData.correctAns);

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 1/1");

          question.getResponseOnPreview().should("have.class", "right");
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get(".right .wrong").should("have.length", 0);
        });

      // enter wrong ans
      question.getResponseBoxByIndex(0).type(queData.testtext);

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");

          question
            .getResponseOnPreview()
            .should("have.class", "wrong")
            .and("not.have.class", "right");
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get(".right .wrong").should("have.length", 0);
        });

      // show ans
      preview
        .getShowAnswer()
        .click()
        .then(() => {
          question
            .getShowAnsBoxOnPreview()
            .contains(queData.correctAns)
            .should("be.visible");
        });
    });
  });
});
