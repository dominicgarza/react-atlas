describe('Login', () => {
  it('Should not login with invalid email', () => {

    cy.log(Cypress.config());

    cy.visit('/');
    
    // Open Login Navigation Item
    cy.get('[aria-label="Login"]').click();

    // Fill Email
    cy.get('input[name="email"]').type('Invalid Email');

    // Fill Password
    cy.get('input[name="password"]').type('InvalidPassword');

    // Click Submit
    cy.get('button[type="submit"]').click();

    // Confirm email error text
    cy.get('.MuiFormHelperText-root')
      .should('include.text', 'valid email');

  });
});
