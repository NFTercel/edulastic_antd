import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage.js";
import EssayRichTextPage from "../../../../framework/author/itemList/questionType/writtenAndSpoken/essayRichTextPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Essay with rich text" type question`, () => {
  const queData = {
    group: "Written & Spoken",
    queType: "Essay with rich text",
    queText: "Describe yourself in one sentence?",
    extlink: "www.testdomain.com",
    testtext: "testtext",
    formula: "s=ar^2"
  };

  const question = new EssayRichTextPage();
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

    it("[essay_rich_s1] => user create question with default option and save", () => {
      // enter question
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("have.text", queData.queText);

      // save que
      question.header.save();
    });

    it("[essay_rich_s2] => preview - verify default formatting options", () => {
      preview = question.header.preview();
      // type text in ans
      question
        .getTextEditor()
        .clear()
        .type(queData.testtext);

      // verify all default formatting option
      question.selectedFormattingOptions.forEach(formate => {
        const text = queData.testtext;
        const { sel, tag } = formate;

        question
          .getTextEditor()
          .find("p")
          .makeSelection();

        question
          .getToobar()
          .find(sel)
          .click();

        question
          .getTextEditor()
          .contains(tag, text)
          .should("have.length", 1);

        question
          .getToobar()
          .find(sel)
          .click();

        question
          .getTextEditor()
          .find(tag)
          .should("not.be.exist");
      });
    });

    it("[essay_rich_s3] => preview - validate word limit on typing ans text", () => {
      question.getTextEditor().clear();

      // typing 5 words
      const words = [1, 2, 3, 4, 5];
      var i;
      for (i in words) {
        question
          .getTextEditor()
          .type(queData.testtext)
          .type(" ");

        question.getWordCount().should("have.text", words[i] + " Words");
      }

      // typing overlimit
      question.getTextEditor().type(queData.testtext);

      // validate
      question.getMainEditor().should("have.css", "background-color", "rgb(251, 223, 231)");

      question.getWordCount().should("have.text", "6 / 5 Word limit");
    });
  });
});
