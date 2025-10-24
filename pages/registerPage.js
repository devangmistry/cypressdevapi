class RegisterPage {
  elements = {
    fullName: () => cy.get("#input-name"),
    email: () => cy.get("#input-email"),
    password: () => cy.get("#input-password"),
    confirmPassword: () => cy.get("#input-re-password"),
    checkbox: () => cy.get('input[type="checkbox"]'),
  };

  visit() {
    cy.visit("https://playground.bondaracademy.com/");
    cy.contains("Auth").click();
    cy.contains("Register").click();
  }

  registerUser(fullName, email, password, confirmPassword) {
    this.elements.fullName().type(fullName);
    this.elements.email().type(email);
    this.elements.password().type(password);
    this.elements.confirmPassword().type(confirmPassword);
    this.elements.checkbox().check({ force: true });
  }
}

export default new RegisterPage();
