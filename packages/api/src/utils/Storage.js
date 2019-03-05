export default class Storage {
  constructor(tokenName = 'access_token') {
    this.tokenName = tokenName;
  }

  get token() {
    let token = null;

    try {
      token = localStorage.getItem(this.tokenName);
    } catch (err) {
      console.error(err);
    }

    return token;
  }

  set token(token) {
    try {
      localStorage.setItem(this.tokenName, token);
    } catch (err) {
      console.error(err);
    }
  }
}
