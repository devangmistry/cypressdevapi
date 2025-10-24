/// <reference types="cypress" />

describe("Cart API Chained Tests", () => {
  const baseUrl = 'https://dummyjson.com/carts/add';
  let cartId; // 👈 variable to store created cart ID

  it('Step 1: Create a new cart successfully', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: {
        userId: 5,
        products: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 1 }
        ]
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Validate status
      expect(response.status).to.eq(200);

      // Store cart ID for later use
      cartId = response.body.id;
      cy.log(`🆔 New Cart Created with ID: ${cartId}`);

      // Validate user and totals
      expect(response.body.userId).to.eq(5);
      expect(response.body.products).to.have.length(2);
    });
  });

  it('Step 2: Retrieve the created cart using stored ID', () => {
    // Ensure cartId is available
    expect(cartId, 'Cart ID should be available').to.not.be.undefined;

    cy.request({
      method: 'GET',
      url: `https://dummyjson.com/carts/${cartId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', cartId);
      expect(response.body).to.have.property('userId', 5);

      // Log key details
      cy.log(`📦 Cart for User ID: ${response.body.userId}`);
      cy.log(`💰 Total: ${response.body.total}`);
    });
  });

  it('Step 3: (Optional) Delete the created cart', () => {
    if (cartId) {
      cy.request({
        method: 'DELETE',
        url: `https://dummyjson.com/carts/${cartId}`,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 204]);
        cy.log(`🗑️ Deleted Cart ID: ${cartId}`);
      });
    } else {
      cy.log('⚠️ No cart ID found to delete');
    }
  });
});
