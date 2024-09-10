import login from '../support/login.js';
describe('Test single product', () => {
  beforeEach(() => {
    cy.session('loginSession', () => {
      login();
    });
  });
  it('check the url', () => {
    cy.visit('/cart');
    cy.url().should('include', '/cart');
  });
  it('should return cart data successfully', () => {
    cy.visit('/');
    cy.request({
      method: 'GET',
      url: '/api/products?page=1&limit=6',
    }).then((response) => {
      // Check if the response status is 200
      expect(response.status).to.eq(200);
      // Check if the cart is not empty
      if (response.body.products.length > 0) {
        // Check if the response body contains cart product data
        expect(response.body.products).to.be.an('array');
        // Click on the first product
        cy.contains('button span', 'View Details').first().click();
        //Check if the url matches /products/:id
        cy.url().should('match', /\/products\/[a-zA-Z0-9]+$/);
        //Check the texts
        cy.get('div.text-h6').should('exist');
        cy.contains('div.text-right', '$').should('exist');
        cy.contains('p.text-left', 'Description').should('exist');
        //Check the button
        cy.contains('button span', 'Add to Cart').should('exist');
      }
    });
  });
});
