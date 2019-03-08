import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class OrderListPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  // question content
  getListInputs = () =>
    cy
      .get('[data-cy="list-container"]')
      .next()
      .find("div .ql-editor");

  getAddInputButton = () =>
    cy
      .contains("span", "Add new choice")
      .closest("button")
      .first();

  getListDeleteByIndex = index => cy.get(`[data-cy="deleteprefix${index}"]`);

  getPonitsInput = () => cy.get('[data-cy="points"]');

  getAnswerLists = () => cy.get(`[data-cy="sortable-list-container"]`).last();

  getPreviewList = () => cy.get('[data-cy="order-preview-container"]');

  addAlternate = () => {
    cy.get('[data-cy="alternate"]')
      .should("be.visible")
      .click();
    return this;
  };

  getAddedAlternate = () => cy.get('[data-cy="del-alter"]');
}

export default OrderListPage;
