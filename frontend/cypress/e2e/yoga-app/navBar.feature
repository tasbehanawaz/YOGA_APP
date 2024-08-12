Feature:  Verify that users can navigate to different pages like the home page, categories page, and generate page of the navigation bar.

   User Story: 
    As a user I want to be able to navigate to different pages of the yoga app,
    

Feature: Navigation

  Background:
    Given the user is on the landing page

  Scenario Outline: Navigating to different pages
    When the user clicks on "<linkText>" link
    Then the user should be on the "<pageName>" page

    Examples:
      | linkText   | pageName   |
      | Categories | categories |
      | Home       | landing    |
      | Generate   | generate   |
      | Saved      | saved      |
      | Sign Up    | Sign Up    |
      | Sign In    | Sign In    |