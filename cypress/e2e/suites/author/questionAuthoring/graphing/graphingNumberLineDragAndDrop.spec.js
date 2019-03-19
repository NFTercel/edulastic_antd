import GraphingNumberLineDragAndDropPage from "../../../../framework/author/itemList/questionType/graphing/graphingNumberLineDragAndDropPage";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import Header from "../../../../framework/author/itemList/itemDetail/header";

describe("Test Graphing - number line with drag and drop", () => {
  const queData = {
    group: "Graphing",
    queType: "Number line with drag & drop",
    queText: "Type a question",
    title: "Type a title",
    line: {
      minValue: "3",
      maxValue: "12"
    },
    possibleResponses: {
      respA: "resp A",
      respB: "resp B",
      respC: "resp C"
    },
    layout: {
      width: "700",
      height: "300",
      lineMargin: "30",
      linePosition: "40",
      titlePosition: "10",
      pointBoxPosition: "75",
      pointSeparationDistanceX: "20",
      pointSeparationDistanceY: "20",
      fontSize: "Small"
    }
  };

  const question = new GraphingNumberLineDragAndDropPage(+queData.layout.width, +queData.layout.height);
  const editItemPage = new EditItemPage();
  const header = new Header();

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

    it("Edit question text", () => {
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

    it("Edit line", () => {
      question
        .getXMinParameter()
        .clear()
        .type(queData.line.minValue);

      question
        .getXMaxParameter()
        .clear()
        .type(queData.line.maxValue);

      question.getVisibleTickLabelsOnBoard().should("have.length", 10);
    });

    it("Edit title", () => {
      question
        .getTitleParameter()
        .clear()
        .type(queData.title);

      question.getTitleOnBoard().should("be.contain", queData.title);
    });

    it("Edit possible responses", () => {
      question.clickOnPossibleResponsesDeleteButton(1);
      question.clickOnPossibleResponsesDeleteButton(0);

      question.clickOnPossibleResponsesAddButton();
      question.clickOnPossibleResponsesAddButton();
      question.clickOnPossibleResponsesAddButton();

      question
        .getPossibleResponsesOption(0)
        .clear()
        .type(queData.possibleResponses.respA);
      question
        .getPossibleResponsesOption(1)
        .clear()
        .type(queData.possibleResponses.respB);
      question
        .getPossibleResponsesOption(2)
        .clear()
        .type(queData.possibleResponses.respC);

      question.getMarksOnBoard().should("have.length", 3);
      question
        .getMarksOnBoard()
        .contains(queData.possibleResponses.respA)
        .should("have.length", 1);
      question
        .getMarksOnBoard()
        .contains(queData.possibleResponses.respB)
        .should("have.length", 1);
      question
        .getMarksOnBoard()
        .contains(queData.possibleResponses.respC)
        .should("have.length", 1);
    });

    it("Edit layout", () => {
      question
        .getLayoutWidth()
        .clear()
        .type(queData.layout.width);

      question
        .getLayoutHeight()
        .clear()
        .type(queData.layout.height);

      question
        .getLayoutLineMargin()
        .clear()
        .type(queData.layout.lineMargin);

      question
        .getLayoutLinePosition()
        .clear()
        .type(queData.layout.linePosition);

      question
        .getLayoutTitlePosition()
        .clear()
        .type(queData.layout.titlePosition);

      question
        .getLayoutPointBoxPosition()
        .clear()
        .type(queData.layout.pointBoxPosition);

      question
        .getLayoutPointSeparationDistanceX()
        .clear()
        .type(queData.layout.pointSeparationDistanceX);

      question
        .getLayoutPointSeparationDistanceY()
        .clear()
        .type(queData.layout.pointSeparationDistanceY);

      question.clickOnShowLeftArrow();

      question.clickOnShowRightArrow();

      question
        .getBoard()
        .find("svg")
        .should("have.attr", "width", queData.layout.width)
        .and("have.attr", "height", queData.layout.height);
    });
  });
});
