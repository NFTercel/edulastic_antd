import GraphingStandardPage from "./graphingStandardPage";

class GraphingNumberLinePlotPage extends GraphingStandardPage {
  constructor() {
    super();
  }

  getTitleParameter() {
    return cy.get('input[name="title"]');
  }

  getResponsesAllowedParameter() {
    return cy.get('input[name="responsesAllowed"]');
  }

  getLayoutMargin() {
    return cy.get('input[name="margin"]');
  }

  getLayoutStackResponsesSpacing() {
    return cy.get('input[name="stackResponsesSpacing"]');
  }

  clickOnShowMaxArrow() {
    cy.contains("Show max arrow").click();
    return this;
  }

  clickOnShowMinArrow() {
    cy.contains("Show min arrow").click();
    return this;
  }

  getTicksContainer() {
    return cy.contains("section", "Ticks");
  }

  getTicksDistance() {
    return cy.get('input[name="ticksDistance"]');
  }

  getMinorTicks() {
    return cy.get('input[name="minorTicks"]');
  }

  selectRenderingBase(option) {
    cy.contains("div", "Rendering base")
      .parent()
      .find("select")
      .select(option);
    return this;
  }

  clickOnShowMax() {
    cy.contains("Show max").click();
    return this;
  }

  clickOnShowMin() {
    cy.contains("Show min").click();
    return this;
  }
}
export default GraphingNumberLinePlotPage;
