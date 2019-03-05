import EditToolBar from "../common/editToolBar";
import TemplateMarkupBar from "../common/templateMarkUpBar";
import Header from "../../itemDetail/header";

class ClozeDropDownPage {
    constructor() {
        this.editToolBar = new EditToolBar();
        this.header = new Header();
        this.templateMarkupBar = new TemplateMarkupBar();
    }

    // question content
    getQuestionEditor() {
        return cy.get('[data-placeholder="[This is the stem.]"');
    }

     // template content
    getTemplateEditor() {
        return cy.get('[data-placeholder="[This is the template markup]"');
    }

    // choices
    getChoiceByIndexAndResponseIndex(responseIndex,choiceIndex){
        const response = `Choices for Response ${responseIndex+1}`
        return cy.contains(response)
            .next()
            .find('input')
            .eq(choiceIndex)
            .should('be.visible');
    }

    // correct ans response box
    setChoiceForResponseIndex(index,choice) {
        cy.get('.template_box > .ant-select')
            .eq(index)
            .click();

        cy.contains(choice)
            .should('be.visible')
            .click();
        
        cy.get('.ant-select-selection-selected-value')
            .should('have.text',choice);
    }

    // on preview 
    getResponseOnPreview(){
        return cy.get('.response-btn')
            .should('be.visible');
    }

    getShowAnsBoxOnPreview(){
        return cy.get('.correctanswer-box')
                .should('be.visible');
    }
}

export default ClozeDropDownPage;