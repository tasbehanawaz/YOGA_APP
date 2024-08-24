import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('the user enters {string} in the search bar', (poseName) => {
  cy.get('input[placeholder="Search"]:visible').type(poseName);

  // cy.get('input[placeholder="Search"]').type(poseName);
});

When('the user clicks on the search button', () => {
  cy.get('button[type="submit"]').contains('Search').click();
});

Then('the user should see search results for {string}', (poseName) => {
  cy.contains(poseName);
});
