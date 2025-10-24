/// <reference types="cypress" />

//test hooks before and after
beforeEach("Open the test application", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it.skip("Asseertions", () => {
  cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");
  cy.get('[for="exampleInputEmail1"]').then((label) => {
    expect(label).to.contain("Email address"); // expect can only be called within then block
  });

  // this is to check exact text path
  cy.get('[for="exampleInputEmail1"]').should("have.text", "Email address");
  cy.get('[for="exampleInputEmail1"]').then((label) => {
    expect(label).to.have.text("Email address");
  });

  //using invoke method to we can assert
  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .then((emaillabel) => {
      expect(emaillabel).to.equal("Email address");
      cy.wrap(emaillabel).should("equal", "Email address");
    });

    });

  // TimeOut
  it.only('TimeOutTest', () => {
    // fetch
    cy.contains("Modal & Overlays").click();
    cy.contains("Dialog").click();

    cy.contains("Open with delay 10 seconds").click();
    cy.get("nb-dialog-container nb-card-header", { timeout: 11000 }).should(
      "have.text",
      "Friendly reminder"
    );
  });

