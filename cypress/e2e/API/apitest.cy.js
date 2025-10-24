describe('API Validation', () => {
  it('Validate user details from API', () => {
    cy.request('GET', '/api/users/1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('name');
    });
  });
});


describe('POST API Example', () => {
  it('Create a new user', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: {
        name: 'Durgesh',
        job: 'QA Manager'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);         // check status code
      expect(response.body).to.have.property('name', 'Durgesh');
      expect(response.body).to.have.property('job', 'QA Manager');
    });
  });
});