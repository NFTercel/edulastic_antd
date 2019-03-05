import Header from "../../itemDetail/header";

class ChoiceMatrixStandardPage {

    constructor() {
        this.header = new Header();

        this.numerationOption = {   'Numerical': 'number',
                                    'Uppercase alphabet' : 'upper-alpha',
                                    'Lowercase alphabet' : 'lower-alpha'
        };

        this.fontSizeOption = {  'Small':'small',
                                'Normal':'normal',
                                'Large':'large',
                                'Extra Large':'xlarge',
                                'Huge':'xxlarge'
        };
    }

    // question content
    getQuestionEditor() {
        return cy.get('[data-placeholder="Enter question"]');
    }

    // choices
    getChoiceByIndex(index) {
        const selector = '#idlist1'+index;
        return cy.get(selector)
                    .next()
                    .find('.ql-editor');
    }

    deleteChoiceByIndex(index) {
        const selector = '[data-cy=deletelist1'+index+']';
        cy.get(selector)
            .click();
        return this;
    }

    getallChoices() {
        return cy.contains('div','Multiple Choice Options')
                    .next()
                    .find('.ql-editor');
                }
                
    addNewChoice() {
        cy.contains('div','Multiple Choice Options')
            .next()
            .next()
            .contains('Add new choice')
            .should('be.visible')
            .click({force:true});
        return this;
    }
                
    // steams
    getSteamByIndex(index) {
        const selector = '#idlist2'+index;
        return cy.get(selector)
                    .next()
                    .find('.ql-editor');
    }

    deleteSteamByIndex(index) {
        const selector = '[data-cy=deletelist2'+index+']';
        cy.get(selector)
                    .click();
        return this;
    }

    getallSteam() {
        return cy.contains('div','Steams')
                    .next()
                    .find('.ql-editor');
    }

    addNewSteam() {
        cy.contains('div','Steams')
            .next()
            .next()
            .contains('Add new choice')
            .should('be.visible')
            .click({force:true});
        return this;
    }

    // correct ans
    getCorrectAnsTable() {
        return cy.get('table')
                    .children()
                    .get('tr.ant-table-row');
    }

    addAlternate() {

        cy.get('[data-cy="alternate"]')
            .should('be.visible')
            .click();
        return this;
    }

    getAlternates() {
        return cy.contains('div','Set Correct Answer(s)')
                    .next()
                    .contains('span','Alternate');
    }

    deleteAlternate() {
        cy.get('[data-cy="del-alter"]')
            .should('be.visible')
            .click();

        cy.contains('div','Set Correct Answer(s)')
            .next().contains('div','Alternate')
            .should('not.be.visible');

        cy.contains('div','Set Correct Answer(s)')
            .next().contains('div','Correct')
            .should('be.visible')
            .click();
        return this;

    }

    getMultipleResponse() {
        return cy.contains('Multiple responses')
                    .should('be.visible');
        
    } 

    // advance options
    clickOnAdvancedOptions() {
        cy.get('body').contains('span','Advanced Options')
            .should('be.visible')
            .click();
        return this;
    }

    selectMatrixStyle(option) {
        const selectOp = `[data-cy="${this.fontSizeOption[option]}"]`;
        cy.get('[data-cy="matrixStyle"]')
            .should('be.visible')
            .click()

        cy.get(selectOp)
            .should('be.visible')
            .click()
        
        cy.get('[data-cy="matrixStyle"]')
            .find('.ant-select-selection-selected-value')
            .should('contain',option);

        return this;
    }

    selectStemNumeration(option) {
        const selectOp = `[data-cy="${this.fontSizeOption[option]}"]`;
        cy.get('[data-cy="stemNum"]')
            .should('be.visible')
            .click()

        cy.get(selectOp)
            .should('be.visible')
            .click()
        
        cy.get('[data-cy="stemNum"]')
            .find('.ant-select-selection-selected-value')
            .should('contain',option);

        return this;
    }

    selectFontSize(option) {
        const selectOp = `[data-cy="${this.fontSizeOption[option]}"]`;
        cy.get('[data-cy="fontSizeSelect"]')
            .should('be.visible')
            .click()

        cy.get(selectOp)
            .should('be.visible')
            .click()
        
        cy.get('[data-cy="fontSizeSelect"]')
            .find('.ant-select-selection-selected-value')
            .should('contain',option);

        return this;
    }
}

export default ChoiceMatrixStandardPage;