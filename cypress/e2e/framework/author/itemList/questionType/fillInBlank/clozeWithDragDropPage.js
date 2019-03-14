import EditToolBar from "../common/editToolBar";
import TemplateMarkupBar from "../common/templateMarkUpBar";
import Header from "../../itemDetail/header";

class ClozeDragDropPage {
  constructor() {
    this.editToolBar = new EditToolBar();
    this.header = new Header();
    this.templateMarkupBar = new TemplateMarkupBar();
  }

  // template content
  getTemplateEditor = () => cy.get('[data-placeholder="[This is the template markup]"');

  getGroupResponsesCheckbox = () =>
    cy
      .get("#groupResponseCheckbox")
      .should("be.visible")
      .next();

  getAddedGroupTitle = () => cy.contains("legend", "Group");

  getChoiceResponseContainer = () =>
    cy
      .contains("div", "Choices for Responses")
      .should("be.visible")
      .next()
      .children();

  getAddChoiceButton = () => cy.contains("a", "Add New Choice").should("be.visible");

  getChoiceInputByIndex = index => cy.get(`[data-cy="edit_prefix_${index}"`);

  getResponseItemByIndex = index => cy.get(`#response-item-${index}`);

  getResponseContainerByIndex = index => cy.get(`#response-container-${index}`);

  getPontsInput = () => cy.get('[data-cy="points"]');

  getDuplicatedResposneCheck = () => cy.contains("span", "Duplicated responses").parent();

  getDraghandleCheck = () => cy.contains("span", "Show Drag Handle").parent();

  getShuffleOptionCheck = () => cy.contains("span", "Shuffle Options").parent();

  getAddAlternative = () => cy.get('[data-cy="alternative"]');

  getAddedAlternateTab = () => cy.contains("span", "Alternate 1");
}

export default ClozeDragDropPage;
