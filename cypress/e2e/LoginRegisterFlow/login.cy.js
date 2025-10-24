/// <reference types = 'cypress' />
import loginPage from "../../pages/loginPage";
import testdata from "../../fixtures/loginRegisterData.json";

describe("Login Related TestCases", () => {
  beforeEach(() => {
    loginPage.visitLogin();
  });

  it("Successful Login", () => {
    loginPage.enteremail(testdata.loginUser.email);
    loginPage.enterPassword(testdata.loginUser.password);
    loginPage.clickLoginButton();
    cy.url().should("include", "/iot-dashboard");
  });

  it("Verify login button is disabled when fields are empty", () => {
    loginPage.verifyLoginButtonDisabled();
  });
});
