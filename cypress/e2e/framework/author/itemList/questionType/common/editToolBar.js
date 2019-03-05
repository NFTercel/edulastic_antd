class EditToolBar {

    stimulus() {
        return cy.get('#stimulus');
    }

    fontSelect() {
        return cy.get('#stimulus').find('.ql-font').should('be.visible');
    }

    sizeSelect() {
        return cy.get('#stimulus').find('.ql-size').should('be.visible');
    }

    bold() {
        return cy.get('#stimulus').find('.ql-bold').should('be.visible');
    }

    italic() {
        return cy.get('#stimulus').find('.ql-italic').should('be.visible');
    }

    underline() {
        return cy.get('#stimulus').find('.ql-underline').should('be.visible');
    }

    strike() {
        return cy.get('#stimulus').find('.ql-strike').should('be.visible');
    }

    color() {
        return cy.get('#stimulus').find('.ql-color').color('be.visible');
    }

    background() {
        return cy.get('#stimulus').find('.ql-background').should('be.visible');
    }

    subScript() {
        return cy.get('#stimulus').find('.ql-script').find('[value="sub"]').should('be.visible');
    }

    superScript() {
        return cy.get('#stimulus').find('.ql-script').find('[value="super"]').should('be.visible');
    }

    headerh1() {
        return cy.get('#stimulus').find('.ql-header').find('[value="1"]').should('be.visible');
    }

    headerh2() {
        return cy.get('#stimulus').find('.ql-header').find('[value="2"]').should('be.visible');
    }

    blockquote() {
        return cy.get('#stimulus').find('.ql-blockquote').should('be.visible');
    }

    codeBlock() {
        return cy.get('#stimulus').find('.ql-code-block').should('be.visible');
    }

    listOrder() {
        return cy.get('#stimulus').find('.ql-list').find('[value="ordered"]').should('be.visible');
    }

    listBullet() {
        return cy.get('#stimulus').find('.ql-list').find('[value="bullet"]').should('be.visible');
    }

    indentPlus() {
        return cy.get('#stimulus').find('.ql-header').find('[value="+1"]').should('be.visible');
    }

    indentMinus() {
        return cy.get('#stimulus').find('.ql-header').find('[value="-1"]').should('be.visible');
    }

    direction() {
        return cy.get('#stimulus').find('.ql-code-direction').should('be.visible');
    }

    align() {
        return cy.get('#stimulus').find('.ql-align').should('be.visible');
    }

    link() {
        return cy.get('#stimulus').find('.ql-link').should('be.visible');
    }

    image() {
        return cy.get('#stimulus').find('.ql-image').should('be.visible');
    }

    video() {
        return cy.get('#stimulus').find('.ql-video').should('be.visible');
    }

    formula() {
        return cy.get('#stimulus').find('.ql-formula').should('be.visible');
    }

    // tooltip for link,video,formula

    toolTip() {
        return cy.get('.ql-editing').should('be.visible');
    }
}

export default EditToolBar;