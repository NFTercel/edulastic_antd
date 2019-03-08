import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class ClassificationPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
  }

  // question content
  getQuestionEditor = () => cy.get('[data-placeholder="Enter question"');

  getDropDownColumn = () => cy.get('[data-cy="classification-column-dropdown"]');

  getDropDownListColumn = index => cy.get(`[data-cy="coloumn-dropdown-list-${index}"]`);

  getDropDownRow = () => cy.get('[data-cy="classification-row-dropdown"]');

  getDropDownListRow = index => cy.get(`[data-cy="row-dropdown-list-${index}"]`);

  getColumnTitleInptuList = () => cy.get('[data-cy="column-container"]').find("div .ql-editor");

  getColumnAddButton = () =>
    cy
      .get('[data-cy="column-container"]')
      .contains("span", "Add new column")
      .parent()
      .should("be.visible");

  getColumnDeleteByIndex = index => cy.get(`[data-cy="deletecolumns${index}"]`);

  getRowTitleInptuList = () => cy.get('[data-cy="row-container"]').find("div .ql-editor");

  getRowAddButton = () =>
    cy
      .get('[data-cy="row-container"]')
      .contains("span", "Add new row")
      .parent()
      .should("be.visible");

  getRowDeleteByIndex = index => cy.get(`[data-cy="deleterows${index}"]`);

  getGroupResponsesCheckbox = () =>
    cy
      .contains("span", "Group possible responses")
      .closest("label")
      .should("be.visible");

  getGroupContainerByIndex = index => cy.get(`[data-cy="group-container-${index}"]`);

  getTitleInputByIndex = index => {
    const group = this.getGroupContainerByIndex(index);
    return group
      .contains("div", "Title")
      .next()
      .should("be.visible");
  };

  getAddNewChoiceByIndex = index => {
    const group = this.getGroupContainerByIndex(index);
    return group.contains("span", "Add new choice").closest("button");
  };

  getChoiceListByGroup = index => {
    const group = this.getGroupContainerByIndex(index);
    return group
      .find('[data-cy="group-choices"]')
      .children()
      .first()
      .children();
  };

  deleteChoiceByGroup = (gIndex, index) => {
    cy.get(`[data-cy="deletegroup${gIndex}${index}"]`).click();
    return this;
  };

  getChoiceEditorByGroup = (gIndex, index) => cy.get(`#idgroup${gIndex}${index}`);

  getDragDropBox = () => cy.contains("h3", "Drag & Drop the answer").next();

  getAddNewGroupButton = () =>
    cy
      .contains("span", "ADD NEW GROUP")
      .closest("button")
      .should("be.visible");

  getPontsInput = () => cy.get('[data-cy="points"]');

  getDragDropItemByIndex = index => cy.get(`[data-cy="drag-drop-item-${index}"]`);

  getDragDropBoardByIndex = index => cy.get(`[data-cy="drag-drop-board-${index}"]`).find(">div");

  addAlternate = () => {
    cy.get('[data-cy="alternate"]')
      .should("be.visible")
      .click();
    return this;
  };

  getAddedAlternate = () => cy.get('[data-cy="del-alter"]');
}

export default ClassificationPage;
