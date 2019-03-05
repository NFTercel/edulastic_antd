import SkillReportsPage from '../../framework/student/skillReportsPage';

describe('Test SkillReport Page', () => {
  before(() => {
    cy.setToken('student');
    cy.visit('/home/skill-report');
  });
  const skillReportsPage = new SkillReportsPage();
  it('Visit SkillReport Page', () => {
    skillReportsPage.isVisible();
    // skillReportsPage.onRatioClick();
  });
});
