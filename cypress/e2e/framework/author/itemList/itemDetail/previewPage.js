import Header from "./header";

class PreviewItemPage {

    constructor(){
        this.header = new Header();
    }

    getCheckAnswer() {
        return cy.get('body').contains('Check Answer').should('be.visible');
    }

    getShowAnswer() {
        return cy.get('body').contains('Show Answers').should('be.visible');
    }

    getClear() {
        return cy.get('body').contains('Clear').should('be.visible');
    }

    getAntMsg() {
        return cy.get('.ant-message-notice-content');
    }
}

export default PreviewItemPage;