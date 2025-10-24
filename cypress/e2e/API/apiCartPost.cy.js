/// <reference types="Cypress" />

describe("POST API Example", () => {
  const baseUrl = "https://dummyjson.com/carts/add";

  it("Should create a new cart successfully", () => {
    cy.request({
      method: "POST",
      url: baseUrl,
      failOnStatusCode: false, // prevents Cypress from failing on non-2xx codes
      body: {
        userId: 5,
        products: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 1 },
        ],
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(201);

      // Validate important response fields
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("userId", 5);
      expect(response.body).to.have.property("products");

      // Optional logs
      cy.log(JSON.stringify(response.body));
    });
  });

  it.only("To POST and get log for user id = 4", () => {
    const baseURL = "https://dummyjson.com/carts/add";
    cy.request({
      method: "Post",
      url: baseURL,
      failOnStatusCode: false,
      headers: {
        ContentTypes: "application/json",
      },
      body: {
        userId: 4,
        products: [
          { id: 23, quantity: 4 },
          { id: 55, quantity: 5 },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("userId");
      expect(response.body).to.have.property("products");
      expect(response.body.products).to.be.an("array");

      const userNumber = response.body.userId;

      if (userNumber == 4) {
        cy.log("User data is:", userNumber);
        cy.log(`Cart ID: ${response.body.id}`);
        cy.log(`Total Products: ${response.body.totalProducts}`);
        cy.log(`Total Amount: ${response.body.total}`);
        cy.log(JSON.stringify(response.body));
      } else {
        cy.log("UserId does not exist");
      }
    });
  });

  
});
