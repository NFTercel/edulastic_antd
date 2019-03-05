import SidebarPage from '../../framework/student/sidebarPage';

describe('Test Sidebar Page', () => {
  before(() => {
    cy.visit('/home/dashboard');
  });
  const sidebar = new SidebarPage();
  it('Visit Sidebar Page', () => {
    sidebar.onClickMenuItems();
    sidebar.onClickCollapse();
    sidebar.isVisible();
    sidebar.onClickUserInfo();
  });
});
