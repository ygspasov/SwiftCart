import login from '../support/login.js';
describe('Test categories', () => {
  beforeEach(() => {
    cy.session('loginSession', () => {
      login();
    });
  });
  it('Check the url', () => {
    cy.visit('/admin/admin-products');
    cy.url().should('include', '/admin/admin-products');
  });

  it('View Categories', () => {
    cy.visit('/admin/admin-products');
    cy.contains('.v-btn__content', 'View categories').should('exist');
    cy.get('.v-btn__content').contains('View categories').click();
    cy.request({
      method: 'GET',
      url: '/api/categories',
    }).then((response) => {
      expect(response.status).to.eq(200);
      if (response.body.length > 0) {
        response.body.forEach((product) => {
          expect(product).to.have.property('description');
          expect(product).to.have.property('name');
          expect(product).to.have.property('userId');
          expect(product).to.have.property('_id');
        });
      }
    });
  });
  it('Check Select Category', () => {
    cy.visit('/admin/admin-products');
    cy.contains('.v-btn__content', 'Select category').should('exist');
    cy.get('.v-btn__content').contains('Select category').click();
    cy.get('.v-list-item-title').contains('Books').click();
    cy.contains('.text-subtitle-1', 'Books').should('exist');
  });
});
