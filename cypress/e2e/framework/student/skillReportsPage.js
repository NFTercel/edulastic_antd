class SkillReportsPage {
  isVisible() {
    cy.contains('Skill Report').should('be.visible');
    // cy.get('[data-cy=skillReport]').should('be.visible');
    cy.contains('Skill Summary').should('be.visible');
  }
  onRatioClick() {
    cy.get('[data-cy=ratio]')
      .should('be.visible')
      .each($table => {
        cy.wrap($table).click();
      });
  }
}
export default SkillReportsPage;
