/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// Add Login to session
Cypress.Commands.add('login', (email, password) => {

  cy.session([email, password], () => {
    const emailVal = email || Cypress.env('LOGIN_EMAIL');
    const passwordVal = password || Cypress.env('LOGIN_PASSWORD');

    cy.visit('/');

    // Open Login Navigation Item
    cy.get('[aria-label="Login"]').click();

    // Fill Email
    cy.get('input[name="email"]').type(emailVal);

    // Fill Password
    cy.get('input[name="password"]').type(passwordVal);

    // Click Submit
    cy.get('button[type="submit"]').click();

    // Ensure we are logged in
    cy.get('[aria-label="Settings"]')
      .should('exist');

  });

})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
