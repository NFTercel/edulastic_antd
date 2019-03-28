import GraphingNumberLineDragAndDropPage from "../../../../framework/author/itemList/questionType/graphing/graphingNumberLineDragAndDropPage";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import Header from "../../../../framework/author/itemList/itemDetail/header";
import PreviewItemPage from "../../../../framework/author/itemList/itemDetail/previewPage";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Number line with drag & drop" type question`, () => {
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
      width: 700,
      height: 300,
      lineMargin: "30",
      linePosition: "40",
      titlePosition: "10",
      pointBoxPosition: "75",
      pointSeparationDistanceX: "20",
      pointSeparationDistanceY: "20",
      fontSize: "Small"
    },
    labels: {
      frequency: "2",
      specificPoints: "6.5, 7.5"
    },
    correctAnswers: {
      points: "2",
      alternatePoints: "3"
    }
  };

  const question = new GraphingNumberLineDragAndDropPage();
  const editItemPage = new EditItemPage();
  const previewItemPage = new PreviewItemPage();
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

      question.selectFontSizeOption(queData.layout.fontSize);

      question
        .getBoard()
        .find("svg")
        .invoke("width")
        .should("be.equal", queData.layout.width);

      question
        .getBoard()
        .find("svg")
        .invoke("height")
        .should("be.equal", queData.layout.height);
      question.getLineOnBoard().should("have.attr", "y1", "119");
      question.getLineOnBoard().should("have.attr", "y2", "119");
      question.getLineOnBoard().should("have.attr", "marker-start");

      question.getLineOnBoard().should("have.attr", "marker-end");

      question.getTitleOnBoard().should("have.css", "top", "21px");

      question
        .getVisibleTickLabelsOnBoard()
        .its("length")
        .then(length => {
          for (let i = 0; i < length; i++) {
            question
              .getVisibleTickLabelsOnBoard()
              .eq(i)
              .should("have.css", "font-size", "10px");
          }
        });

      // todo: add tests for:
      // Line margin,
      // Point box position

      // todo: worked incorrect:
      // Point Separation distance X,
      // Point Separation distance Y
    });

    it("Edit ticks", () => {
      question
        .getTicksDistance()
        .clear()
        .type("2")
        .should("have.value", "2");
      question.getVisibleTickLabelsOnBoard().should("have.length", 6);

      question
        .getTicksDistance()
        .clear()
        .type("1")
        .should("have.value", "1");
      question.getVisibleTickLabelsOnBoard().should("have.length", 10);

      // todo: add tests for:
      // Snap to ticks

      // todo: worked incorrect:
      // Show ticks

      // todo: not implemented
      // Fractions format
      // Rendering base
    });

    it("Edit labels", () => {
      question
        .getLabelsFrequency()
        .clear()
        .type(queData.labels.frequency);

      question
        .getLabelsSpecificPoints()
        .clear()
        .type(queData.labels.specificPoints);

      question.clickOnShowMin();
      question.clickOnShowMax();

      question.getVisibleTickLabelsOnBoard().should("have.length", 6);
    });

    it("Edit correct answers", () => {
      question
        .getPointsParameter()
        .clear()
        .type(queData.correctAnswers.points);

      question.clickOnPossibleResponsesDeleteButton(2);
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

      question.invokeBoardDragDrop(0, 0.1, 0.9, 0.2, 0.4);
      question.invokeBoardDragDrop(0, 0.3, 0.9, 0.8, 0.4);
      question.invokeBoardDragDrop(0, 0.5, 0.9, 0.5, 0.4);

      question.getMountedMark(queData.possibleResponses.respA).should("be.exist");
      question.getMountedMark(queData.possibleResponses.respB).should("be.exist");
      question.getMountedMark(queData.possibleResponses.respC).should("be.exist");

      // alternate answers
      question.clickOnTabsPlusButton();
      question
        .getPointsParameter()
        .clear()
        .type(queData.correctAnswers.alternatePoints);

      question.clickOnTab(0);
      question.getPointsParameter().should("have.value", queData.correctAnswers.points);
      question.clickOnTab(1);
      question.getPointsParameter().should("have.value", queData.correctAnswers.alternatePoints);

      question.clickOnAlternateAnswerDeleteButton(0);
      question.getPointsParameter().should("have.value", queData.correctAnswers.points);
    });

    it("Check preview", () => {
      question.clickOnPossibleResponsesDeleteButton(2);
      question.clickOnPossibleResponsesDeleteButton(1);
      question.clickOnPossibleResponsesDeleteButton(0);
      question.clickOnPossibleResponsesAddButton();
      question
        .getPossibleResponsesOption(0)
        .clear()
        .type(queData.possibleResponses.respA);

      question.invokeBoardDragDrop(0, 0.1, 0.9, 0.2, 0.4);

      question.getMountedMark(queData.possibleResponses.respA).should("be.exist");

      header.save();
      header.preview();

      previewItemPage.getShowAnswer().click();
      question.getMountedMark(queData.possibleResponses.respA).should("have.class", "show");

      previewItemPage.getClear().click();
      question.invokeBoardDragDrop(0, 0.1, 0.9, 0.8, 0.4);
      previewItemPage.getCheckAnswer().click();
      question.getMountedMark(queData.possibleResponses.respA).should("have.class", "incorrect");

      previewItemPage.getClear().click();
      question.invokeBoardDragDrop(0, 0.1, 0.9, 0.2, 0.4);
      previewItemPage.getCheckAnswer().click();
      question.getMountedMark(queData.possibleResponses.respA).should("have.class", "correct");
    });
  });
});
