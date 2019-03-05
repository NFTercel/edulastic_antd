class TemplateMarkupBar {

    templatemarkup() {
        return cy.get('#templatemarkup');
    }

    fontSelect() {
        return cy.get('#templatemarkup').find('.ql-font').should('be.visible');
    }

    sizeSelect() {
        return cy.get('#templatemarkup').find('.ql-size').should('be.visible');
    }

    bold() {
        return cy.get('#templatemarkup').find('.ql-bold').should('be.visible');
    }

    italic() {
        return cy.get('#templatemarkup').find('.ql-italic').should('be.visible');
    }

    underline() {
        return cy.get('#templatemarkup').find('.ql-underline').should('be.visible');
    }

    strike() {
        return cy.get('#templatemarkup').find('.ql-strike').should('be.visible');
    }

    color() {
        return cy.get('#templatemarkup').find('.ql-color').color('be.visible');
    }

    background() {
        return cy.get('#templatemarkup').find('.ql-background').should('be.visible');
    }

    subScript() {
        return cy.get('#templatemarkup').find('.ql-script').find('[value="sub"]').should('be.visible');
    }

    superScript() {
        return cy.get('#templatemarkup').find('.ql-script').find('[value="super"]').should('be.visible');
    }

    headerh1() {
        return cy.get('#templatemarkup').find('.ql-header').find('[value="1"]').should('be.visible');
    }

    headerh2() {
        return cy.get('#templatemarkup').find('.ql-header').find('[value="2"]').should('be.visible');
    }

    blockquote() {
        return cy.get('#templatemarkup').find('.ql-blockquote').should('be.visible');
    }

    codeBlock() {
        return cy.get('#templatemarkup').find('.ql-code-block').should('be.visible');
    }

    listOrder() {
        return cy.get('#templatemarkup').find('.ql-list').find('[value="ordered"]').should('be.visible');
    }

    listBullet() {
        return cy.get('#templatemarkup').find('.ql-list').find('[value="bullet"]').should('be.visible');
    }

    indentPlus() {
        return cy.get('#templatemarkup').find('.ql-header').find('[value="+1"]').should('be.visible');
    }

    indentMinus() {
        return cy.get('#templatemarkup').find('.ql-header').find('[value="-1"]').should('be.visible');
    }

    direction() {
        return cy.get('#templatemarkup').find('.ql-code-direction').should('be.visible');
    }

    align() {
        return cy.get('#templatemarkup').find('.ql-align').should('be.visible');
    }

    link() {
        return cy.get('#templatemarkup').find('.ql-link').should('be.visible');
    }

    image() {
        return cy.get('#templatemarkup').find('.ql-image').should('be.visible');
    }

    video() {
        return cy.get('#templatemarkup').find('.ql-video').should('be.visible');
    }

    formula() {
        return cy.get('#templatemarkup').find('.ql-formula').should('be.visible');
    }

    response() {
        return cy.get('#templatemarkup').find('.ql-insertStar').should('be.visible');
    }
}

export default TemplateMarkupBar;