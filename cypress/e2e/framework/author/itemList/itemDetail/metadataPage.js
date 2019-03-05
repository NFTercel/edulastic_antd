import Header from "./header";

class MetadataPage {

    constructor(){
        this.header = new Header();
    }

    clickCheckAnswer() {
        cy.contains('Check Answer').should('be.visible')
            .click();
        return this;
    }

    clickShowAnswer() {
        cy.constains('Show Answers').should('be.visible')
             .click();
        return this;
    }

    clickClear() {
        cy.constains('Clear').should('be.visible')
             .click();
        return this;
    }
}

export default MetadataPage;