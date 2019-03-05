import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class EssayPlainTextPage {
    constructor() {
        this.editToolBar = new EditToolBar();

        this.header = new Header();
    }

    // question content
    getQuestionEditor() {
        return cy.get('[data-placeholder="Enter question"');
    }

    // on preview
    getTextEditor() {
        return cy.get('.ant-input')
                .should('be.visible');
    }

    getCopy() {
        return cy.get('.ant-input')
                .prev()
                .contains('Copy')
                .should('be.visible');
    }

    getCut() {
        return cy.get('.ant-input')
                .prev()
                .contains('Cut')
                .should('be.visible');
    }
    
    getPaste() {
        return cy.get('.ant-input')
                .prev()
                .contains('Paste')
                .should('be.visible');
    }
    
    getWordCount() {
        return cy.get('.ant-input')
                .next()
                .children()
                .eq(1)
                .should('be.visible');
    }
}

export default EssayPlainTextPage;