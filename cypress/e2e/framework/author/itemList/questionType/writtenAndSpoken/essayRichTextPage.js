import EditToolBar from "../common/editToolBar";
import Header from "../../itemDetail/header";

class EssayRichTextPage {
    constructor() {
        this.editToolBar = new EditToolBar();

        this.header = new Header();

        this.selectedFormattingOptions = [{
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
            'sel': '[value="ordered"]',
            'tag': 'ol > li'
        },
        {
            'sel': '[value="bullet"]',
            'tag': 'ul > li'
        }
        ];
    }

    // question content
    getQuestionEditor() {
        return cy.get('[data-placeholder="Enter question"');
    }

    // word limit
    selectWordLimit(option) {
        cy.contains('span','Word limit')
            .next()
            .should('be.visible')
            .click();

        cy.contains(option)
            .should('be.visible')
            .click();
        
        cy.contains('span','Word limit')
            .next()
            .find('.ant-select-selection-selected-value')
            .should('contain',option);

        return this;
    }

    // on preview
    getMainEditor() {
        return cy.get('#mainQuill');
    }

    getTextEditor() {
        return cy.get('#mainQuill')
                .find('.ql-editor')
                .should('be.visible');
    }

    getWordCount() {
        return cy.get('#mainQuill')
                .next()
                .children()
                .eq(1)
                .should('be.visible');
    }

    getToobar() {
        return cy.get('.ql-toolbar');
    }
}

export default EssayRichTextPage;