describe('Check Review Page', () => {
  beforeEach(() => {
    cy.setToken();
  });

  it('Review Page UI Test', () => {
    cy.visit('/author/tests/create');

    // Review Tab Test
    cy.contains('Review')
      .click();

    // Review tab should contain expected buttons
    cy.get('button').eq(3).find('span').should('contain', 'Remove Selected');
    cy.get('button').eq(4).find('span').should('contain', 'Move to');
    cy.get('button').eq(6).find('span').should('contain', 'Collapse Rows');
  });
});
