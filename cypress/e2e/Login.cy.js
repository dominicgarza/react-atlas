describe('Login', () => {

  it('Should not login with invalid email', () => {

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

  it('Should login successfully', () => {

    cy.login();

    cy.visit('/');

    // Log Out
    cy.get('[aria-label="Avatar"]').click();
    cy.get('.popover-body')
      .contains('Logout')
      .click();

    // Ensure we are logged out 
    cy.get('[aria-label="Login"]')
      .should('exist');

  });

});
