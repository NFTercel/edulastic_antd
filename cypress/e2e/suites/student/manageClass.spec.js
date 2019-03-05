import ManagePage from '../../framework/student/managePage';
import LoginPage from '../../framework/student/loginPage';

describe('Test ManageClass Page', () => {
  before(() => {
    const login = new LoginPage();
    cy.visit('/login');
    login.fillLoginForm('auto.student3@snapwiz.com', 'snapwiz');
    login.onClickSignin();
    login.checkUrl();
    cy.visit('/home/manage');
  });
  const managePage = new ManagePage();
  it('Visit manage Page', () => {});
});
