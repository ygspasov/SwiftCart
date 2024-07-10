describe('Check the login form', () => {
  it('Check the fields of the form', () => {
    cy.visit('/login');
    cy.contains('label', 'Email').should('exist');
    cy.contains('label', 'Password').should('exist');
  });
  it('Check the login button', () => {
    cy.visit('/login');
    cy.contains('button[type="submit"] span', 'Login').should('exist');
  });
  it('Check the texts below the form', () => {
    cy.visit('/login');
    cy.contains('p', 'New customer?').should('exist');
    cy.contains('p a', 'Start here.').should('exist');
  });
});
