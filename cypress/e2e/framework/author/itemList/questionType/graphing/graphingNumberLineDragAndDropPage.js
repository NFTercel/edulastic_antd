import GraphingStandardPage from "./graphingStandardPage";

class GraphingNumberLineDragAndDropPage extends GraphingStandardPage {
  constructor() {
    super();
  }

  // elements ---------------------------------------------------------------

  getPossibleResponsesContainer() {
    return cy.contains("section", "Possible responses");
  }

  getTitleParameter() {
    return cy.get('input[name="title"]');
  }

  getBoard() {
    return cy.get('[data-cy="axis-labels-container"]');
  }

  getVisibleTickLabelsOnBoard(containText = null) {
    if (containText !== null) {
      return this.getBoard()
        .find("div.numberline-fraction:not(:empty)")
        .filter(":visible")
        .filter(`:contains('${containText}')`);
    }
    return this.getBoard()
      .find("div.numberline-fraction:not(:empty)")
      .filter(":visible");
  }

  getTitleOnBoard() {
    return this.getBoard()
      .find("div.title:not(:empty)")
      .filter(":visible");
  }

  getPointBoxOnBoard() {
    return this.getBoard().find('polygon[fill="#efefef"]');
  }

  getPossibleResponsesOption(index) {
    return this.getPossibleResponsesContainer()
      .find(".ql-editor")
      .eq(index);
  }

  getMarksOnBoard() {
    return this.getBoard()
      .find("div.mark:not(:empty)")
      .filter(":visible");
  }

  getLineOnBoard() {
    return this.getBoard().find('line[stroke="#d6d6d6"]');
  }

  getLayoutLineMargin() {
    return cy.get('input[name="margin"]');
  }

  getLayoutLinePosition() {
    return cy.get('input[name="line_position"]');
  }

  getLayoutTitlePosition() {
    return cy.get('input[name="title_position"]');
  }

  getLayoutPointBoxPosition() {
    return cy.get('input[name="point_box_position"]');
  }

  getLayoutPointSeparationDistanceX() {
    return cy.get('input[name="separationDistanceX"]');
  }

  getLayoutPointSeparationDistanceY() {
    return cy.get('input[name="separationDistanceY"]');
  }

  getLabelsFrequency() {
    return cy.get('input[name="frequency"]');
  }

  getLabelsSpecificPoints() {
    return cy.get('input[name="specificPoints"]');
  }

  // actions ---------------------------------------------------------------

  clickOnPossibleResponsesDeleteButton(index) {
    cy.get(`[data-cypress="deleteButton"][data-cy="deleteprefix${index}"]`).click();
    return this;
  }

  clickOnPossibleResponsesAddButton() {
    this.getPossibleResponsesContainer()
      .contains("Add")
      .click();
    return this;
  }

  clickOnShowLeftArrow() {
    cy.contains("Show left arrow").click();
    return this;
  }

  clickOnShowRightArrow() {
    cy.contains("Show right arrow").click();
    return this;
  }

  clickOnShowMin() {
    cy.contains("Show min").click();
    return this;
  }

  clickOnShowMax() {
    cy.contains("Show max").click();
    return this;
  }
}
export default GraphingNumberLineDragAndDropPage;
