/// <reference types="Cypress"/>
import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class EssayShortTextPage {
    constructor() {
        this.editToolBar = new EditToolBar();

        this.header = new Header();
    }

    // question page
    getQuestionEditor() {
        return cy.get('[data-placeholder="Enter question"');
    }
    
    getPoints() {
        return cy.get('[data-cy="points"]')
        .should('exist');
    }

    selectAllowType(option) {
        cy.get('.ant-select-selection')
            .click();
        
        cy.contains(option)
            .click();
        
        cy.get('.ant-select-selection-selected-value')
            .should('have.text',option);
    }

    getCorrectValue() {
        return cy.get('.ant-input')
            .eq(1)
            .should('exist');
    }

    // on preview
    getTextEditor() {
        return cy.get('.ant-input')
                .should('be.visible');
    }

    ansHighLightAsRight() {
        this.getTextEditor()
            .should('have.css','background-color','rgb(225, 251, 242)');
    }

    ansHighLightAsWrong() {
        this.getTextEditor()
            .should('have.css','background-color','rgb(251, 223, 231)');
    }

}

export default EssayShortTextPage;