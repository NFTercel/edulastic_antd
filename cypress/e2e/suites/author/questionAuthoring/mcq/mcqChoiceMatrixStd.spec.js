import ChoiceMatrixStandardPage from "../../../../framework/author/itemList/questionType/mcq/choiceMatrixStandardPage.js";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage.js";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Choice matrix - standard" type question`, () => {
  const editItem = new EditItemPage();
  const question = new ChoiceMatrixStandardPage();
  const queData = {
    group: "Multiple Choice",
    queType: "Choice matrix - standard",
    queText: "Choose the correct number of days in following month",
    ansChoice: ["JAN", "APR", "MAY", "JUN"],
    steams: ["30", "31"],
    extlink: "www.testdomain.com",
    formattext: "formattedtext",
    formula: "s=ar^2"
  };

  before(() => {
    cy.setToken();
  });

  context("User creates question", () => {
    before("visit items list page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      // add new question
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });

    it("[Tc_318] => edit question text", () => {
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);
    });

    it("[Tc_319] => edit/delete multiple choice options", () => {
      // edit the 1st ans choice
      question
        .getChoiceByIndex(0)
        .clear()
        .type(queData.formattext)
        .should("contain", queData.formattext);

      // delete the 1st ans choice
      question.deleteChoiceByIndex(0);

      question.getChoiceByIndex(0).should("not.contain", queData.formattext);

      // add new choice
      question.addNewChoice();

      question
        .getChoiceByIndex(3)
        .type(queData.formattext)
        .should("contain", queData.formattext);

      question.getallChoices().should("be.have.length", 4);
    });

    it("[Tc_320] => edit/delete steam options", () => {
      // edit the 1st steam
      question
        .getSteamByIndex(0)
        .clear()
        .type(queData.formattext)
        .should("contain", queData.formattext);

      // delete the 1st steam
      question.deleteSteamByIndex(0);

      question.getSteamByIndex(0).should("not.contain", queData.formattext);

      // add new steam
      question.addNewSteam();

      question
        .getSteamByIndex(1)
        .type(queData.formattext)
        .should("contain", queData.formattext);

      question.getallSteam().should("be.have.length", 2);
    });

    it("[Tc_321] => set correct ans,multiple response,alternate", () => {
      // setting correct ans
      question.getCorrectAnsTable().each(($ele, index, $list) => {
        cy.wrap($ele)
          .find("input")
          .eq(index % 2)
          .click();
      });

      // points

      // add alternate
      question.addAlternate();

      question.getAlternates().should("have.length", 1);

      // delete alternate
      question.deleteAlternate();

      question.getAlternates().should("not.exist");

      // check muplti response
      question.getMultipleResponse().click();
      question.getCorrectAnsTable().each($ele => {
        cy.wrap($ele)
          .find("input")
          .should("have.attr", "type", "checkbox");
      });
    });
  });

  context("[sanity-test] => create basic question and validate", () => {
    before("visit items list page and select question type", () => {
      editItem.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItem.deleteAllQuestion();

      // add new question
      editItem.addNew().chooseQuestion(queData.group, queData.queType);
    });

    it("[choice_std_s1] => create basic question and save", () => {
      // question
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);

      // add choices
      question
        .getallChoices()
        .each(($el, index, $list) => {
          const cusIndex = $list.length - (index + 1);
          question.deleteChoiceByIndex(cusIndex);
        })
        .should("have.length", 0);

      queData.ansChoice.forEach((ch, index) => {
        question
          .addNewChoice()
          .getChoiceByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });

      // add steam
      question
        .getallSteam()
        .each(($el, index, $list) => {
          const cusIndex = $list.length - (index + 1);
          question.deleteSteamByIndex(cusIndex);
        })
        .should("have.length", 0);

      queData.steams.forEach((ch, index) => {
        question
          .addNewSteam()
          .getSteamByIndex(index)
          .clear()
          .type(ch)
          .should("contain", ch);
      });

      // set correct ans
      question.getCorrectAnsTable().each(($ele, index, $list) => {
        cy.wrap($ele)
          .find("input")
          .eq((index + 1) % 2)
          .click();
      });
      // save question
      question.header.save();
    });

    it("[choice_std_s1] => validate basic question with default setting", () => {
      // preview
      const preview = editItem.header.preview();

      // give correct ans and validate
      question.getCorrectAnsTable().each(($ele, index, $list) => {
        cy.wrap($ele)
          .find("input")
          .eq((index + 1) % 2)
          .click();
      });

      preview.getCheckAnswer().click({ force: true });

      preview.getAntMsg().should("contain", "score: 1/1");

      preview.getClear().click();

      // give wrong ans and validate
      question.getCorrectAnsTable().each(($ele, index, $list) => {
        cy.wrap($ele)
          .find("input")
          .eq(index % 2)
          .click();
      });

      preview.getCheckAnswer().click({ force: true });

      preview.getAntMsg().should("contain", "score: 0/1");
    });
  });
});
