import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When(
  'the user enters a valid {string}, {string} and {string}',
  (email, name, password) => {
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="password"]').type(password);
  }
);

When('the user clicks on "checkbox"', () => {
  cy.get('input[type="checkbox"]').click();
});

Then('the user should be redirected to the Home page', () => {
  cy.url().should('include', '/home');
});
