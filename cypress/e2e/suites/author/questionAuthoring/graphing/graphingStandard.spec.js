import GraphingStandardPage from "../../../../framework/author/itemList/questionType/graphing/graphingStandardPage";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";

describe("Author - Graphing - Standard quadrants type question", () => {
  const queData = {
    group: "Graphing",
    queType: "Graphing",
    queText: "Draw a point",
    bgImageSrc: "https://www.cypress.io/img/logo-dark.36f3e062.png"
  };

  const question = new GraphingStandardPage(600, 600);
  const editItemPage = new EditItemPage();

  before(() => {
    cy.setToken();
  });

  context("User creates question.", () => {
    before("visit items page and select question type", () => {
      editItemPage.getItemWithId("5c358b480c8e6f22190d5ce0");
      editItemPage.deleteAllQuestion();

      // create new que and select type
      editItemPage.addNew().chooseQuestion(queData.group, queData.queType);
    });

    it("Enter question text", () => {
      question
        .getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should("contain", queData.queText);

      question.getStimulus().should("be.visible");

      question.clickOnStimulusH2Button();

      question
        .getQuestionEditor()
        .find("h2")
        .should("contain", queData.queText);

      question
        .getQuestionHeader()
        .find("h2")
        .should("contain", queData.queText);
    });

    it("Enter graph parameters", () => {
      question
        .getXMinParameter()
        .clear()
        .type(-5);

      question
        .getXMaxParameter()
        .clear()
        .type(10);

      question
        .getYMinParameter()
        .clear()
        .type(-9);

      question
        .getYMaxParameter()
        .clear()
        .type(4);

      question.getBoards().each(board => {
        question.getVisibleTickLabelsOnBoard(board).should("have.length", 25);
      });
    });

    it("Enter tools", () => {
      question.getGroups().should("have.length", 1);
      question.getGroupTools("Default Group").should("have.length", 2);
    });
  });
});
