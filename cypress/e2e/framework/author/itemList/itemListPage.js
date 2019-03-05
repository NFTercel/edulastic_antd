import EditItemPage from './itemDetail/editPage.js';

class ItemListPage {
    clickOnCreate() {
        cy.server();
        cy.route('POST','**/testitem**').as('saveItem');
        cy.route('GET','**/testitem/**').as('reload');

        cy.contains('Create')
            .should('be.visible')
            .click();

        cy.wait('@saveItem');
        cy.wait('@reload');

        return new EditItemPage();
    }
}

export default ItemListPage;