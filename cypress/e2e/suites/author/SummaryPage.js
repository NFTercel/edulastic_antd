describe('Check Review Page', () => {
  beforeEach(() => {
    cy.setToken();
  });

  it('Summary Page UI Test', () => {
    cy.visit('/author/tests/create');

    // Review Tab Test
    cy.contains('Summary')
      .click();

    cy.get('button').contains('Source').should('be.visible');
    cy.get('span').contains('Created by:').should('be.visible');

    cy.get('span').contains('Liked:').should('be.visible');
    cy.get('span').contains('Shared:').should('be.visible');
    cy.get('span').contains('Collection:').should('be.visible');
    cy.get('span').contains('Grade').should('be.visible');
    cy.get('span').contains('Subject').should('be.visible');

    cy.get('div').contains('Assessment Name').should('be.visible');
    cy.get('div').contains('Description').should('be.visible');

    cy.contains('Source').click();

    cy.get('button').contains('Apply').should('be.visible');
    cy.get('button').contains('Cancel').should('be.visible');
  });
});
