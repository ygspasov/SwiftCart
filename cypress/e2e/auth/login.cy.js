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
  it('Should login with valid credentials', () => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');
    cy.visit('/login');
    cy.get('.email input').type(email);
    cy.get('.password input').type(password);
    cy.get('button[type="submit"]').click();

    // Assert that login was successful and redirected to the main page '/'
    // Checks for exact matching with the base url '/'
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
