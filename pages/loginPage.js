class Login {
  inputEmail = "#input-email";
  inputPassword = "#input-password";
  loginButton = 'button[status="primary"]';

  visitLogin() {
    cy.visit("https://playground.bondaracademy.com/");
    cy.contains("Auth").click();
    cy.contains("Login").click();
  }

  enteremail(username) {
    cy.get(this.inputEmail).type(username);
    return this;
  }

  enterPassword(password) {
    cy.get(this.inputPassword).type(password);
    return this;
  }

  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  verifyLoginButtonDisabled() {
    cy.get(this.loginButton).should("be.disabled");
  }

  verifyLoginButtonEnabled() {
    cy.get(this.loginButton).should("not.be.disabled");
  }
}

export default new Login();
