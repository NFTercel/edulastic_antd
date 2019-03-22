import GraphingNumberLinePlotPage from "../../../../framework/author/itemList/questionType/graphing/graphingNumberLinePlotPage";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import Header from "../../../../framework/author/itemList/itemDetail/header";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Number line with plot" type question`, () => {
  const queData = {
    group: "Graphing",
    queType: "Number line with plot",
    queText: "Type a question",
    title: "Type a title",
    line: {
      minValue: "3",
      maxValue: "12",
      allowedResponses: "3"
    },
    layout: {
      width: 600
    },
    ticks: {
      minorTicks: "2"
    },
    labels: {
      specificPoints: "6.5, 7.5"
    },
    correctAnswers: {
      points: "2",
      alternatePoints: "3"
    }
  };

  const question = new GraphingNumberLinePlotPage(queData.layout.width, 150);
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

      question
        .getResponsesAllowedParameter()
        .clear()
        .type(queData.line.allowedResponses);

      question.getVisibleTickLabelsOnBoard().should("have.length", 10);
    });

    it("Edit title", () => {
      question
        .getTitleParameter()
        .clear()
        .type(queData.title);

      question.getTitleOnBoard().should("be.contain", queData.title);
    });

    it("Edit layout", () => {
      // question
      //   .getLayoutWidth()
      //   .clear()
      //   .type(queData.layout.width);
      //
      // question
      //   .getBoard()
      //   .find("svg")
      //   .invoke("width")
      //   .should("be.equal", queData.layout.width);

      question.clickOnShowMinArrow();

      question.clickOnShowMaxArrow();

      question.getLineOnBoard().should("have.attr", "y1", "74");
      question.getLineOnBoard().should("have.attr", "y2", "74");
      question.getLineOnBoard().should("have.attr", "marker-start");
      question.getLineOnBoard().should("have.attr", "marker-end");

      // todo: add testing for other parameters
    });

    it("Edit toolbar", () => {
      question.clickOnAddToolButton();
      question.clickOnAddToolButton();
      question.clickOnAddToolButton();

      question.selectToolOnToolbar(1, "Segment");
      question.selectToolOnToolbar(2, "Left ray");

      question
        .getSegmentsToolbar()
        .children()
        .should("have.length", 4);

      question.clickOnDeleteToolOnToolbar(1);

      question
        .getSegmentsToolbar()
        .children()
        .should("have.length", 3);
    });

    it("Edit ticks", () => {
      question.getTicksContainer().within(() => {
        question.clickOnShowMin();
      });
      question.getVisibleTickLabelsOnBoard().should("have.length", 9);

      question.getTicksContainer().within(() => {
        question.clickOnShowMax();
      });
      question.getVisibleTickLabelsOnBoard().should("have.length", 8);

      question.getTicksContainer().within(() => {
        question.clickOnShowMin();
        question.clickOnShowMax();
      });
      question.getVisibleTickLabelsOnBoard().should("have.length", 10);

      question
        .getTicksDistance()
        .type("{uparrow}")
        .should("have.value", "2")
        .blur();
      question.getVisibleTickLabelsOnBoard().should("have.length", 6);

      question
        .getTicksDistance()
        .type("{downarrow}")
        .should("have.value", "1")
        .blur();
      question.getVisibleTickLabelsOnBoard().should("have.length", 10);

      question
        .getMinorTicks()
        .clear()
        .type(queData.ticks.minorTicks);

      // todo: add testing for:
      // Rendering base
      // Show ticks
      // Minor ticks
    });

    it("Edit labels", () => {
      question.clickOnShowLabels();
      question.getVisibleTickLabelsOnBoard().should("have.length", 2);

      question.getLabelsContainer().within(() => {
        question.clickOnShowMin();
      });
      question.getVisibleTickLabelsOnBoard().should("have.length", 1);

      question
        .getLabelsSpecificPoints()
        .clear()
        .type(queData.labels.specificPoints);
      question.getVisibleTickLabelsOnBoard().should("have.length", 3);

      question.getLabelsContainer().within(() => {
        question.clickOnShowMax();
      });
      question.getVisibleTickLabelsOnBoard().should("have.length", 2);
    });

    it("Edit correct answers", () => {
      question
        .getPointsParameter()
        .clear()
        .type(queData.correctAnswers.points);

      // question.invokeBoardTrigger(0, 0.2, 0.5).then(result => {
      //   assert.isTrue(result, "invoke board trigger");
      // });
      //
      // question.selectToolOnToolbar(0, "Segment");
      // question.invokeBoardTrigger(0, 0.5, 0.5).then(result => {
      //   assert.isTrue(result, "invoke board trigger");
      // });
      //
      // question.selectToolOnToolbar(0, "Left ray");
      // question.invokeBoardTrigger(0, 0.8, 0.5).then(result => {
      //   assert.isTrue(result, "invoke board trigger");
      // });

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
  });
});
