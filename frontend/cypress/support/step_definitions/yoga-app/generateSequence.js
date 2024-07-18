import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
Given('the user is on the landing page', () => {
  cy.visit('/');
  cy.contains('Home');
});

When('the user clicks on {string} button', (text) => {
  cy.get('button').contains(text).click();
});

When('the user clicks on {string} text', (text) => {
  cy.get('h5').contains(text).click();
});

Then('the user should watch a video', () => {
  // wait 10 seconds for video appear
  cy.get('video', { timeout: 10000 });
});
