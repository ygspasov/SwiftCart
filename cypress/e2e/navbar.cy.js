describe('Navbar', () => {
  it('Should check the existence of the header and the text "SwiftCart" in it', () => {
    cy.visit('/');
    cy.get('header').should('exist');
    cy.contains('header a', 'SwiftCart').should('exist');
  });
  it('Should check the existance of links in the header', () => {
    cy.visit('/');
    cy.contains('header span.v-btn__content', 'Products').should('exist');
    cy.contains('header span.v-btn__content', 'Add Product').should('exist');
    cy.contains('header span.v-btn__content', 'Admin Products').should('exist');
    cy.contains('header span.v-btn__content', 'Cart').should('exist');
    cy.contains('header span.v-btn__content', 'Orders').should('exist');
  });
});
