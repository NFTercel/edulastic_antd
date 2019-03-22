/* eslint-disable class-methods-use-this */
import EditItemPage from "./editPage";
import PreviewItemPage from "./previewPage";
import MetadataPage from "./metadataPage";

class Header {
  edit() {
    cy.get('[data-cy="editButton"]')
      .should("be.visible")
      .click();

    return new EditItemPage();
  }

  preview() {
    cy.get('[data-cy="previewButton"]')
      .should("be.visible")
      .click();

    return new PreviewItemPage();
  }

  metadata() {
    cy.get('[data-cy="metadataButton"]')
      .should("be.visible")
      .click();

    return new MetadataPage();
  }

  save() {
    cy.server();
    cy.route("PUT", "**/testitem/**").as("saveItem");
    cy.route("GET", "**/testitem/**").as("reload");

    cy.contains("div", "SAVE")
      .should("be.visible")
      .click();

    cy.wait("@saveItem");
    cy.wait("@reload");

    return new EditItemPage();
  }
}

export default Header;
