class LoginPage {
  fillLoginForm(email, password) {
    cy.get(`[data-cy=email]`)
      .clear()
      .type(email);
    cy.get(`[data-cy=password]`)
      .clear()
      .type(password);
  }

  onClickSignin() {
   return cy.get(`[data-cy=login]`)
      .should('be.visible')
      .click();
  }
  emailErrormssg() {
    cy.contains('Invalid username or password').should('be.visible');
  }
  checkUrl() {
    cy.url().should('include', '/home/assignments');
  }
}

export default LoginPage;
