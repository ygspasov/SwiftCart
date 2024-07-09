describe('GET homepage products', () => {
  it('should return product data successfully', () => {
    cy.request({
      method: 'GET',
      url: '/api/products?page=1&limit=6',
    }).then((response) => {
      // Check if the response status is 200
      expect(response.status).to.eq(200);

      // Check if the response body contains product data
      expect(response.body).to.have.property('products');
      expect(response.body.products).to.be.an('array');
      expect(response.body.products.length).to.be.at.most(6); // The set pagination limit is 6 products per page

      // Check if each product has the expected properties (example properties)
      response.body.products.forEach((product) => {
        expect(product).to.have.property('_id');
        expect(product).to.have.property('name');
        expect(product).to.have.property('price');
        // Add other properties as needed
      });
    });
  });
});
