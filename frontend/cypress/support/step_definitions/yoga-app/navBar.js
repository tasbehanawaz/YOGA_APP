// cypress/support/step_definitions/yoga-app/navBar.js

import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the user should be on the {string} page', (pageName) => {
  const pageUrls = {
    categories: '/categories',
    landing: '/',
    generate: '/sequence',
    saved: '/save',
    'Sign Up': '/logins',
    'Sign In': '/SignIn',
  };

  cy.url().should('include', pageUrls[pageName]);
});
