/ <reference types = 'Cypress' />

describe("Carts API - GET Scenarios", () => {
  const baseUrl = 'https://dummyjson.com/carts';

  const reqOptions = (url, method = "GET", qs = {}) => ({
    method,
    url,
    qs,
    failOnStatusCode: false, 
    headers: { Accept: "application/json" },
  });

  it("GET /carts - should return list of carts with pagination fields", () => {
    cy.request("GET", baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("carts");
      expect(response.body).to.have.property("skip");
      expect(response.body).to.have.property("total");
      expect(response.body).to.have.property("limit");
      expect(response.body.carts).to.be.an("array");
      const { skip, total } = response.body;
      cy.log("Skip value: " + skip);
      cy.log("Total value: " + total);
    });
  });

  // 2. Get all carts with pagination
  it("GET /carts?limit=10 - should return max 10 items", () => {
    cy.request({
      method: "GET",
      url: baseUrl,
      qs: {
        limit: 10,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.limit).to.eq(10);
      expect(response.body.carts.length).to.be.at.most(10);
    });
  });

  it("GET /carts?skip=5&limit=5 - should respect skip and limit", () => {
    cy.request(reqOptions(baseUrl, "GET", { skip: 5, limit: 5 })).then(
      (resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.skip).to.eq(5);
        expect(resp.body.limit).to.eq(5);
        expect(resp.body.carts.length).to.be.at.most(5);
      }
    );
  });

  // 3. Get single cart by valid id
  it("GET /carts/{id} - should return cart with matching id", () => {
    cy.request(reqOptions(baseUrl)).then((listResp) => {
      const id = listResp.body.carts[0].id;
      cy.request(reqOptions(`/carts/${id}`)).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.id).to.eq(id);
        expect(resp.body.products).to.be.an("array");
      });
    });
  });

  // 4. Get single cart by invalid id
  it("GET /carts/9999 - should return 404 or error", () => {
    cy.request(reqOptions(`${baseUrl}/9999`)).then((resp) => {
      expect(resp.status).to.be.within(400, 499);
    });
  });

  // 5. Get carts by user id
  it("GET /carts/user/{userId} - all returned carts must have same userId", () => {
    cy.request(reqOptions(baseUrl)).then((listResp) => {
      const userId = listResp.body.carts[0].userId;
      cy.request(reqOptions(`/carts/user/${userId}`)).then((resp) => {
        expect(resp.status).to.eq(200);
        resp.body.carts.forEach((cart) => {
          expect(cart.userId).to.eq(userId);
        });
      });
    });
  });

  // 6. Edge / boundary cases
  it("GET /carts?limit=0 - should return empty list or default", () => {
    cy.request(reqOptions(baseUrl, "GET", { limit: 0 })).then((resp) => {
      expect(resp.status).to.be.lessThan(500);
      expect(resp.body).to.have.property("carts");
    });
  });

  it("GET /carts?skip=999999 - should return empty list", () => {
    cy.request(reqOptions(baseUrl, "GET", { skip: 999999 })).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.carts).to.be.an("array");
      expect(resp.body.carts.length).to.eq(0);
    });
  });

  it("GET /carts?limit=-1 - should return error or sanitize value", () => {
    cy.request(reqOptions(baseUrl, "GET", { limit: -1 })).then((resp) => {
      expect(resp.status).to.be.lessThan(500);
    });
  });

  it("GET /carts?limit=abc - non-integer param should fail gracefully", () => {
    cy.request(reqOptions(baseUrl, "GET", { limit: "abc" })).then((resp) => {
      expect(resp.status).to.be.lessThan(500);
    });
  });

  // 7. Incorrect HTTP method
  it("POST /carts (without /add) - should return 405 or error", () => {
    cy.request(reqOptions(baseUrl, "POST")).then((resp) => {
      expect(resp.status).to.be.within(400, 405);
    });
  });
});
