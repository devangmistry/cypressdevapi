import registerPage from "../../pages/registerPage";
import testData from "../../fixtures/loginRegisterData.json";

describe("User Registration - Bondar Academy", () => {
  beforeEach(() => {
    registerPage.visit();
  });

  it("TC01 - Register successfully with valid details", () => {
    const randomEmail = `user${Date.now()}@test.com`;
    registerPage.registerUser(
      testData.validUser.fullName,
      randomEmail,
      testData.validUser.password,
      testData.validUser.confirmPassword
    );
    cy.get('button[status="primary"]').click();
    cy.url().should("include", "/iot-dashboard");
  });

  it("TC02 - Show error for invalid email", () => {
    registerPage.registerUser(
      testData.invalidEmailUser.fullName,
      testData.invalidEmailUser.email,
      testData.invalidEmailUser.password,
      testData.invalidEmailUser.confirmPassword
    );
    cy.contains("Email should be the real one!").should("be.visible");
  });

  it("TC03 - Show error when password and confirm password do not match", () => {
    registerPage.elements.fullName().type("Alex");
    registerPage.elements.email().type(`alex${Date.now()}@test.com`);
    registerPage.elements.password().type("Password123");
    registerPage.elements.confirmPassword().type("WrongPass");
    cy.get('input[name="password"]').should(
      "have.css",
      "border-color",
      "rgb(0, 214, 143)"
    ); // green
    cy.get('input[name="rePass"]').should(
      "have.css",
      "border-color",
      "rgb(184, 29, 91)"
    ); // red
  });

  it("TC04 - Validation for each field", () => {
    registerPage.elements.fullName().type("Tes");
    registerPage.elements.email().type("E");
    registerPage.elements.password().type("P");
    registerPage.elements.confirmPassword().type("C");

    cy.contains("Full name should contains from 4 to 50 characters").should(
      "be.visible"
    );
    cy.contains("Email should be the real one!").should("be.visible");
    cy.contains("Password should contain from 4 to 50 characters").should(
      "be.visible"
    );
    cy.get('input[name="rePass"]').should(
      "have.css",
      "border-color",
      "rgb(184, 29, 91)"
    ); // red
  });

  it.only("TC05 - registration using register command", () => {
    cy.fixture("loginRegisterData").then((data) => {
      // Use of timestamp
      // const uniqueEmail = `john${Date.now()}@test.com`;
      // const user = { ...data.validUser, email: uniqueEmail };

      // build date-based email: johnDDMMYYYY@test.com
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const yyyy = now.getFullYear();
      const uniqueEmail = `john${dd}${mm}${yyyy}@test.com`;

      // create a new user object based on fixture, but override email
      const user = { ...data.validUser, email: uniqueEmail };

      // call custom command with updated user
      cy.register(user);

      // submit and then assert
      cy.get('button[status="primary"]').click();
      cy.url().should("include", "/iot-dashboard");
    });
  });
});
