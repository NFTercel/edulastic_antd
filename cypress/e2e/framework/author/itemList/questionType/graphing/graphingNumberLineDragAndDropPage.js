import GraphingStandardPage from "./graphingStandardPage";

class GraphingNumberLineDragAndDropPage extends GraphingStandardPage {
  constructor() {
    super();
  }

  getTitleParameter() {
    return cy.get('input[name="title"]');
  }
}
export default GraphingNumberLineDragAndDropPage;
