import login from './support/login.js';
describe('Test cart products', () => {
  beforeEach(() => {
    login();
  });
  it('check the url', () => {
    cy.visit('/cart');
    cy.url().should('include', '/cart');
  });
  it('should return cart data successfully', () => {
    cy.visit('/cart');
    cy.request({
      method: 'GET',
      url: '/api/cart',
    }).then((response) => {
      // Check if the response status is 200
      expect(response.status).to.eq(200);
      // Check if the cart is not empty
      if (response.body.cart.items.length > 0) {
        // Check if the response body contains cart product data
        expect(response.body.cart.items).to.be.an('array');
        // Check if each product in the cart has the expected properties
        response.body.cart.items.forEach((product) => {
          expect(product.productId).to.have.property('_id');
          expect(product.productId).to.have.property('name');
          expect(product.productId).to.have.property('price');
        });
        //check the texts
        cy.contains('.v-card-title', 'Shopping Cart').should('exist');
        cy.contains('.v-list .v-row .v-col', 'Quantity').should('exist');
        cy.contains('.v-list .v-row .v-col', 'Price').should('exist');
        cy.contains('.v-container>p', 'Total').should('exist');
        //Check the buttons
        cy.contains('button span', 'Remove').should('exist');
        cy.contains('button span', 'Order').should('exist');
        //Check the quantity stepper
        cy.get('.v-input .v-input__control').should('exist');
      } else {
        //Check the warning message when there are no products in the cart
        cy.contains('.v-container .v-row .text-red', 'No products in cart.');
      }
    });
  });
});
