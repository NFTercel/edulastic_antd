import GraphingNumberLinePlotPage from "../../../../framework/author/itemList/questionType/graphing/graphingNumberLinePlotPage";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import Header from "../../../../framework/author/itemList/itemDetail/header";

describe("Test Graphing - number line", () => {
  const queData = {
    group: "Graphing",
    queType: "Number line with plot",
    queText: "Type a question",
    title: "Type a title"
  };

  const question = new GraphingNumberLinePlotPage(600, 150);
  const editItemPage = new EditItemPage();
  const header = new Header();

  before(() => {
    cy.setToken();

    editItemPage.getItemWithId("5c358b480c8e6f22190d5ce0");
    editItemPage.deleteAllQuestion();

    // create new que and select type
    editItemPage.addNew().chooseQuestion(queData.group, queData.queType);
  });

  it("Graphing - Number line with plot", () => {
    question
      .getQuestionEditor()
      .focus()
      .clear()
      .type(queData.queText);

    question
      .getXMinParameter()
      .clear()
      .type(-5);

    question
      .getXMaxParameter()
      .clear()
      .type(15);

    question
      .getTitleParameter()
      .clear()
      .type(queData.title);

    question
      .getResponsesAllowedParameter()
      .clear()
      .type(3);
  });

  it("Set Advanced Options", () => {
    // Layout settings
    question
      .getLayoutMargin()
      .clear()
      .type("30");

    question
      .getLayoutStackResponsesSpacing()
      .clear()
      .type("50");

    question.clickOnShowMaxArrow();

    question.clickOnShowMinArrow();

    question.selectFontSizeOption("Large");

    // Grid
    question.getTicksContainer().within(() => {
      question
        .getTicksDistance()
        .clear()
        .type(3);

      question
        .getMinorTicks()
        .clear()
        .type("5");

      question.selectRenderingBase("Zero");

      question.clickOnShowMax();

      question.clickOnShowMin();
    });
  });

  function DrawPoints(points) {
    for (let i = 0; i < points.length; i++) {
      question.invokeBoardTrigger(points[i][0], points[i][1]).then(result => {
        assert.isTrue(result, "invoke board trigger");
      });
    }
  }

  function TestDraw(points, selector, save = false) {
    DrawPoints(points);

    question
      .getBoard()
      .find(selector)
      .should("exist");

    if (!save) {
      cy.get("@ClearTool").click();

      DrawPoints(points);

      question
        .getBoard()
        .find(selector)
        .should("not.exist");
    }
  }

  it("Visit Preview Page", () => {
    header.save();

    header.preview();
  });
});
