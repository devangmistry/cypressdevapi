/// <reference types="cypress" />

//test hooks before and after
beforeEach("Open the test application", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it("LocatorsExample", () => {
  //by Tag anme
  cy.get("input");

  //by ID value
  cy.get("#inputEmail1");

  //by Class value
  cy.get(".input-full-width");

  // by attributes
  cy.get("[fullwidth]");

  // attributes with value
  cy.get('[placeholder="Email"]');

  // by entire class value
  cy.get(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  // how to combine several attributes
  cy.get('[placeholder="Email"][fullwidth]');
  cy.get('input[placeholder="Email"]');

  //find by data cy attribute
  cy.get('[data-cy="inputEmail1"]');
});

it("Cypress Locators Method", () => {
  // cy. get -> used to find the elements on the page globally
  // find - to find only child elements
  // contains - to find web elements by text
  // matchcase is property present in cypress
  cy.contains("Sign in", { matchCase: false });
  cy.contains('[status="warning"]', "Sign in");
  cy.contains("nb-card", "Horizontal form").find("button"); // under nb-card will find the text 'Using the Grid' and find the button
  cy.contains("nb-card", "Horizontal form").contains("Sign in"); // under nb-card with find the text Sign in
  cy.contains("nb-card", "Horizontal form").get("button"); // under nb-card will get buttons
});

it("Child elements", () => {
  cy.contains("nb-card", "Using the Grid").find(".row").find("button");
  cy.get("nb-card").find("nb-radio-group").contains("Option 1");
  cy.get("nb-card nb-radio-group").contains("Option 1");
  cy.get('nb-card > nb-card-body [placeholder="Jane Doe"]');
});

it.only("ExtractingValues", () => {
  // 1. using JQuery method
  cy.get('[for="exampleInputEmail1"]').then((labelvar) => {
    const label = labelvar.text();
    console.log(label);
  });

  //2. Using invoke command
  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .then((label) => {
      console.log(label);
    });
  cy.get('[for="exampleInputEmail1"]').invoke("text").as("label"); // can be use using alias and later label can be used any where
  cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
  
  //3. Using invoke attribute value
 cy.get('#exampleInputEmail1').invoke('attr', 'class').then(classValue =>{
  console.log(classValue)
 })

 //4. Invoke input field value
 cy.get('#exampleInputEmail1').type('hellologtest.com')
 cy.get('#exampleInputEmail1').invoke('prop', 'value').then( value => { //Prop - is the property where value is containded.
  console.log(value)
 })

 // To assert compare
cy.get('#exampleInputEmail1').should('have.attr', 'class', 'input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused')

});
//test