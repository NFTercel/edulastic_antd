import GraphingNumberLinePlotPage from "../../../../framework/author/itemList/questionType/graphing/graphingNumberLinePlotPage";
import EditItemPage from "../../../../framework/author/itemList/itemDetail/editPage";
import Header from "../../../../framework/author/itemList/itemDetail/header";
import FileHelper from "../../../../framework/util/fileHelper";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Number line with plot" type question`, () => {
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
});
