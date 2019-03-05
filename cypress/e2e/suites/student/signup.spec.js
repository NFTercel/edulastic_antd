import SignupPage from '../../framework/student/signupPage';

describe('Test Signup Page', () => {
  before(() => {
    cy.visit('/login');
  });
  const signup = new SignupPage();
  it('(Tc_223)Verify Student Signup', () => {
    signup.onClickSignup();
    signup.onClickStudent();

    //creating random email
    const getRandomEmail = (domain, length) => {
      let text = '';
      let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text + domain;
    };

    let email = getRandomEmail('@snapwiz.com', 15);
    const login = signup.fillSignupForm('shdg', 'preetam', email, 'snapwiz');

    login.fillLoginForm(email, 'snapwiz');
    login.onClickSignin();
    signup.onClickUserInfo();
    login.fillLoginForm('auto.student3@snapwiz.com', 'snapwiz');
    login.onClickSignin();
  });
});
