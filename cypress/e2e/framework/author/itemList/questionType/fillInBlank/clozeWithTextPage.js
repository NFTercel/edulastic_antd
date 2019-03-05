import EditToolBar from "../common/editToolBar";
import TemplateMarkupBar from "../common/templateMarkUpBar";
import Header from "../../itemDetail/header";

class ClozeWithTextPage {
    constructor() {
        this.editToolBar = new EditToolBar();
        this.header = new Header();
        this.TemplateMarkupBar = new TemplateMarkupBar();
    }

    // question content
    getQuestionEditor() {
        return cy.get('[data-placeholder="[This is the stem.]"');
    }

    // template content
    getTemplateEditor() {
        return cy.get('[data-placeholder="[This is the template markup]"');
    }

    // correct ans response box
    getResponseBoxByIndex(index) {
        return cy.get('.template_box')
            .find('input')
            .eq(index);
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

export default ClozeWithTextPage;