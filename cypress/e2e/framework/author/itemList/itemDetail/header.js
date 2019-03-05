import EditItemPage from "./editPage";
import PreviewItemPage from "./previewPage";
import MetadataPage from "./metadataPage";

class Header {

    edit() {
        cy.contains('EDIT')
            .should('be.visible')
            .click();

        return new EditItemPage()
    }

    preview() {
        cy.contains('PREVIEW')
            .should('be.visible')
            .click();

        return new PreviewItemPage();
    }

    metadata() {
        cy.contains('METADATA')
            .should('be.visible')
            .click();

        return new MetadataPage() ;
    }

    save() {
        cy.server();
        cy.route('PUT','**/testitem/**').as('saveItem');
        cy.route('GET','**/testitem/**').as('reload');

        cy.contains('div','SAVE')
            .should('be.visible')   
            .click();

        cy.wait('@saveItem');
        cy.wait('@reload');

        return new EditItemPage();
    }
}

export default Header ;