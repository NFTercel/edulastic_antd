import StudentTestPage from './studentTestPage';
class AssignmentsPage {

  // page element on AssignmentPage
  getAssignmentButton() {
    return cy.get('[data-cy="assignmentButton"]');
  }

  getStatus() {
    return cy.get('[data-cy="status"]');
  }

  getAttemptCount() {
    return cy.get('[data-cy="attemptsCount"]');
  }

  getScore() {
    return cy.get('[data-cy="score"]');
  }

  getPercent() {
    return cy.get('[data-cy="percent"]');
  }

  getAttempts() {
    return cy.get('[data-cy="attemptClick"]');
  }

  getPercentage() {
    return cy.get('[data-cy="percentage"]');
  }

  // common actions on AssignmentPage

  clickOnAssignmentButton() {
    this.getAssignmentButton()
      .should('be.visible')
      .click({force:true});
    return new StudentTestPage();
  }

  validateAssignment(name,status, assignmentButtonValue) {
    cy.contains('div',name)
      .should('be.visible');
    this.getStatus()
      .should('have.text',status);
    this.getAssignmentButton()
      .should('have.text',assignmentButtonValue);
  }

  validateStats(attemptNum,attempt,score, percent) {
    this.getAttemptCount()
      .should('have.text',attempt);
    this.getScore()
      .should('have.text',score);
    this.getPercent()
      .should('have.text',percent);

    this.validateAttemptLinkStats(attemptNum,attemptNum,score, percent);
  }

  validateAttemptLinkStats(totalAttempt,attemptNum,score, percent) {
    this.getAttempts()
      .should('be.visible').click();

    this.getPercentage()
      .should('have.length',totalAttempt);

    this.getPercentage().eq(attemptNum-1)
      .parent()
      .parent()
      .find('[data-cy="score"]')
      .should('have.text',score);
    
    this.getPercentage().eq(attemptNum-1)
      .should('have.text',percent);

    this.getAttempts()
      .should('be.visible').click();

    this.getPercentage()
      .should('have.length',0);
  }
}

export default AssignmentsPage;
