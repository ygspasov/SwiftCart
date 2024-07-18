import login from './support/login.js';
describe('Get the orders', () => {
  beforeEach(() => {
    login();
  });
  it('check the url', () => {
    cy.visit('/orders');
    cy.url().should('include', '/orders');
  });
  it('should return orders data successfully', () => {
    cy.visit('/orders');
    cy.request({
      method: 'GET',
      url: '/api/orders',
    }).then((response) => {
      // Check if the response status is 200
      expect(response.status).to.eq(200);
      // Check if the cart is not empty
      if (response.body.length > 0) {
        // Check if the response body contains orders data
        expect(response.body).to.be.an('array');
        // Check if each product in an order has the expected properties
        response.body.forEach((order) => {
          expect(order).to.have.property('createdAt');
          expect(order).to.have.property('products');
          expect(order).to.have.property('totalPrice');
          expect(order).to.have.property('user');
        });
        //check the texts
        cy.contains('h2', 'Orders').should('exist');
        cy.contains('p', 'Order # ').should('exist');
        cy.contains('p a', 'Invoice').should('exist');
        cy.contains('.v-card-subtitle', 'Description:').should('exist');
        cy.contains('.v-card-text', '$').should('exist');
        cy.contains('p', 'Оrder price:').should('exist');

        //Check the button
        cy.contains('button span', 'Cancel Order').should('exist');
      } else {
        //Check the warning message when there are no orders
        cy.contains('h2', 'No orders found.');
      }
    });
  });
});
