import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage.js";
import ClozeDropDownPage from "../../../../framework/author/itemList/questionType/fillInBlank/clozeWithDropDownPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Cloze with Drop Down" type question`, () => {
  const queData = {
    group: "Fill in the Blanks",
    queType: "Cloze with Drop Down",
    queText: "Select the correct option?",
    template: " is the world's largest democracy",
    correctAns: "India",
    choices: ["China", "India"],
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2"
  };

  const question = new ClozeDropDownPage();
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

    it("[clz_dropdown_s1] : user create basic question with default option and save", () => {
      // enter question
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("have.text", queData.queText);

      // edit template
      question
        .getTemplateEditor()
        .clear()
        .type(" ");

      question.templateMarkupBar.response().click();

      question
        .getTemplateEditor()
        .type(queData.template)
        .should("contain", queData.template);

      // edit choice option for response1
      queData.choices.forEach((ch, index) => {
        question
          .getChoiceByIndexAndResponseIndex(0, index)
          .clear()
          .type(ch)
          .should("have.value", ch);
      });

      // set correct ans
      question.setChoiceForResponseIndex(0, queData.correctAns);

      // save que
      question.header.save();
    });

    it("[clz_dropdown_s2] : preview and validate with right/wrong ans", () => {
      preview = editItem.header.preview();
      // enter right ans and validate
      question.setChoiceForResponseIndex(0, queData.correctAns);

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
      // enter wrong ans and validate
      question.setChoiceForResponseIndex(0, queData.choices[0]);

      preview
        .getCheckAnswer()
        .click()
        .then(() => {
          preview.getAntMsg().should("contain", "score: 0/1");

          question.getResponseOnPreview().should("have.class", "wrong");
        });

      preview
        .getClear()
        .click()
        .then(() => {
          cy.get(".right .wrong").should("have.length", 0);
        });
      // show ans and verify
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
