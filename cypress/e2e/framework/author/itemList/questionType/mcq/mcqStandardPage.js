import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class MCQStandardPage {

    constructor() {
        this.orientationOption = {  'Horizontal': 'horizontal' ,
                                'Vertical': 'vertical' 
                            };

        this.styleOptions = {  'Standard': 'standard',
                                'Block' : 'block',
                                'Radio Button Below' : 'radioBelow'
        };
        
        this.labelOption = {    'Numerical': 'number',
                                'Uppercase alphabet' : 'upper-alpha',
                                'Lowercase alphabet' : 'lower-alpha'
                            };
    
        this.fontSizeOption = {   'Small':'small',
                            'Normal':'normal',
                            'Large':'large',
                            'Extra Large':'xlarge',
                            'Huge':'xxlarge'
        };
        
        this.scoringTypeOption = { 'Exact match' : 'exactMatch' ,
                                    'Partial match' : 'partialMatch'
        };
        
        this.editToolBar = new EditToolBar();

        this.formates = [{
            'sel': '.ql-bold',
            'tag': 'strong'
        },
        {
            'sel': '.ql-italic',
            'tag': 'em'
        },
        {
            'sel': '.ql-underline',
            'tag': 'u'
        },
        {
            'sel': '.ql-strike',
            'tag': 's'
        },
        {
            'sel': '[value="sub"]',
            'tag': 'sub'
        },
        {
            'sel': '[value="super"]',
            'tag': 'sup'
        },
        {
            'sel': '[value="1"]',
            'tag': 'h1'
        },
        {
            'sel': '[value="2"]',
            'tag': 'h2'
        },
        {
            'sel': '.ql-blockquote',
            'tag': 'blockquote'
        },
        {
            'sel': '.ql-code-block',
            'tag': 'pre'
        }
        ];

        this.header = new Header();
    }

    // question content
    getQuestionEditor() {
        return cy.get('[data-placeholder="[This is the stem.]"');
    }

    // choices
    getChoiceByIndex(index) {
        const selector = `#idprefix${index}`;
        return cy.get('.text-editor').find(selector)
                    .next()
                    .find('.ql-editor');
    }

    deleteChoiceByIndex(index) {
        const selector = `[data-cy=deleteprefix${index}]`;
        cy.get(selector)
            .click();
        return this;
    }

    getAllChoices() {
        return cy.contains('div','Multiple Choice Options')
                    .next()
                    .find('.ql-editor');
    }
    
    getAllAnsChoicesLabel() {
        return cy.get('[data-cy="points"]')
            .parent()
            .parent()
            .next()
            .find('label');
    }
                
    addNewChoice() {
        cy.get('[data-cy="add-new-ch"]')
            .should('be.visible')
            .click();
        return this;
    }
        
    // correct ans

    getPoints() {
        return cy.get('[data-cy="points"]')
            .should('be.visible');
    }

    getCorrectAnsOptions() {
        return cy.contains('div','Set Correct Answer(s)')
                    .next()
                    .children()
                    .contains('label');
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

        return this;

    }

    getMultipleResponse() {
        return cy.get('[data-cy="multi"]')
                    .closest('label');
        
    } 

    // advance options
    clickOnAdvancedOptions() {
        cy.contains('span','Advanced Options')
            .should('be.visible')
            .click();
        return this;
    }

    selectChoicesStyle(option) {
        cy.contains('label','Style')
            .next()
            .find('[data-cy="selectStyle"]')
            .select(option)
            .should('have.value',this.styleOptions[option]);
        return this;
    }

    selectLabelType(option) {
        cy.contains('label','Label type')
            .next()
            .find('[data-cy="selectStyle"]')
            .select(option)
            .should('have.value',this.labelOption[option]);
        return this;
    }

    selectOrientation(option) {
        const selectOp = `[data-cy="${this.orientationOption[option]}"]`;
        cy.get('[data-cy="orientationSelect"]')
            .should('be.visible')
            .click()

        cy.get(selectOp)
            .should('be.visible')
            .click()
        
        cy.get('[data-cy="orientationSelect"]')
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

    selectScoringType(option) {
        const selectOp = `[data-cy="${this.scoringTypeOption[option]}"]`;
        cy.get('[data-cy="scoringType"]')
            .should('be.visible')
            .click()

        cy.get(selectOp)
            .should('be.visible')
            .click()
        
        cy.get('[data-cy="scoringType"]')
            .find('.ant-select-selection-selected-value')
            .should('contain',option);

        return this;
    }

    getPanalty() {
        return cy.get('[data-cy="penalty"]')
                    .should('be.visible');
    }

    getCheckAnsAttempt() {
        return cy.get('[data-cy="feedback"]')
                    .should('be.visible');
    }

    getEnableAutoScoring() {
        return cy.contains('Enable auto scoring')
                    .children()
                    .eq(0)
                    .should('be.visible');
    }

    getMinScore() {
        return cy.get('[data-cy=minscore]')
            .should('be.visible');
    }

    getMaxScore() {
        return cy.get('[data-cy="maxscore"]')
                    .should('be.visible');
    }

    getCheckAnswerCheckbox() {
        return cy.contains('Check answer button')
                    .children()
                    .eq(0)
                    .should('be.visible');
    }

    getUnscore() {
        return cy.contains('Unscored')
                    .children()
                    .eq(0)
                    .should('be.visible');                
    }

    getNumofCol() { 
        return cy.get('[data-cy="columns"]');
    }

    getSource() {
        return cy.get('[data-cy="source"]')
            .should('be.visible');
    }

    getCancel() {
        return cy.contains('Cancel')
            .should('be.visible');
    }

}

export default MCQStandardPage;