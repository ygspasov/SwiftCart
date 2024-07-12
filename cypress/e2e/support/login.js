export default function login() {
  const email = Cypress.env('userEmail');
  const password = Cypress.env('userPassword');
  cy.visit('/login');
  cy.get('.email input').type(email);
  cy.wait(1000);
  cy.get('.password input').type(password);
  cy.wait(1000);
  cy.get('button[type="submit"]').click();
  cy.wait(1000);
}
