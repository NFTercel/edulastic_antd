import AssignmentsPage from "./assignmentsPage";
import ReportsPage from "./reportsPage";

class SidebarPage {
  onClickMenuItems() {
    let menuItems = [
      {
        label: 'Dashboard',
        path: 'home/dashboard'
      },
      {
        label: 'Assignments',
        path: 'home/assignments'
      },
      {
        label: 'Reports',
        path: 'home/reports'
      },
      {
        label: 'Skill Report',
        path: 'home/skill-report'
      },
      {
        label: 'Manage Class',
        path: 'home/manage'
      }
    ];
    menuItems.forEach(data => {
      cy.contains(data.label).click();
      cy.url().should('include', data.path);
    });
  }

  onClickCollapse() {
    // cy.get('.anticon-left').click();
    // cy.get('.anticon-right').click();
  }
  isVisible() {
    cy.contains('Help Center').should('be.visible');
  }

  onClickUserInfo() {
    cy.get('[data-cy=userInfo]').click();
    cy.contains('MY PROFILE').click();
    cy.get('[data-cy=userInfo]').click();
    cy.contains('SIGN OUT').click();
  }

  clickOnDashboard(){
    cy.get('[data-cy="label0"]')
            .should('be.visible')
            .click();
  }

  clickOnAssignment(){
    cy.get('[data-cy="label1"]')
            .should('be.visible')
            .click();
    return new AssignmentsPage();
  }

  clickOnReport(){
    cy.get('[data-cy="label2"]')
            .should('be.visible')
            .click();
    return new ReportsPage();
  }

  clickOnskillReport(){
    return cy.get('[data-cy="label3"]')
            .should('be.visible')
            .click();
  }

  clickOnManageClass(){
    return cy.get('[data-cy="label4"]')
            .should('be.visible')
            .click();
  }
}
export default SidebarPage;
