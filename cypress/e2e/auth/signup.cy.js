describe('Check the signup form', () => {
  it('Check the fields of the form', () => {
    cy.visit('/signup');
    cy.contains('label', 'User name').should('exist');
    cy.contains('label', 'Email').should('exist');
    cy.contains('label', 'Password').should('exist');
    cy.contains('label', 'Confirm password').should('exist');
  });
  it('Check the signup button', () => {
    cy.visit('/signup');
    cy.contains('button[type="submit"] span', 'Signup').should('exist');
  });
  it('Check the texts below the form', () => {
    cy.visit('/signup');
    cy.contains('p', 'Already have an account?').should('exist');
    cy.contains('p a', 'Sign in').should('exist');
  });
});
