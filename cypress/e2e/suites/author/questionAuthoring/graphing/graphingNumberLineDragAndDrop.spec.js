import GraphingNumberLineDragAndDropPage from "../../../../framework/author/itemList/questionType/graphing/graphingNumberLineDragAndDropPage";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import Header from "../../../../framework/author/itemList/itemDetail/header";

describe("Test Graphing - number line with drag and drop", () => {
  const queData = {
    group: "Graphing",
    queType: "Number line with drag & drop",
    queText: "Type a question",
    title: "Type a title"
  };

  const question = new GraphingNumberLineDragAndDropPage(1100, 200);
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
      .type(-15);

    question
      .getXMaxParameter()
      .clear()
      .type(15);

    question
      .getTitleParameter()
      .clear()
      .type(queData.title);
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
