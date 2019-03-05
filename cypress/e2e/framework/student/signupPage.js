import LoginPage from './loginPage';
class SignupPage {
  onClickSignup() {
    cy.contains('SIGN UP')
      .should('be.visible')
      .click();
    cy.url().should('include', '/getstarted');
  }
  onClickStudent() {
    cy.get('[data-cy=student]')
      .should('be.visible')
      .click();
    cy.url().should('include', '/studentsignup');
  }

  fillSignupForm(code, name, email, password) {
    cy.get(`[data-cy=classCode]`)
      .clear()
      .type(code);
    cy.get(`[data-cy=name]`)
      .clear()
      .type(name);
    cy.get(`[data-cy=email]`)
      .clear()
      .type(email);
    cy.get(`[data-cy=password]`)
      .clear()
      .type(password);
    cy.get(`[data-cy=signup]`).click();

    cy.url().should('include', '/Login');
    return new LoginPage();
  }
  onClickUserInfo() {
    cy.get('[data-cy=userInfo]').click();
    cy.contains('SIGN OUT').click();
  }
}

export default SignupPage;
