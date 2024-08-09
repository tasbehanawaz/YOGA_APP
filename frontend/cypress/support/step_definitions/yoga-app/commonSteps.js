import { Given, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is on the landing page', () => {
  cy.visit('/');
  cy.contains('Home');
});

When('the user clicks on {string} button', (buttonText) => {
  cy.get('button').contains(buttonText).click();
});

When('the user clicks on {string} link', (linkText) => {
  cy.get('a').contains(linkText).click();
});
