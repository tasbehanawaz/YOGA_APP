Feature: Successful Login

    User Story: 
    As a user I want to be able to login to the application with valid credentials so that I can access the application
    
Scenario Outline: User logs in with valid credentials
    Given the user is on the landing page
    When the user clicks on "Sign Up" link
    When the user enters a valid "<email>", "<name>" and "<password>"
    And the user clicks on "checkbox" 
    And the user clicks on "Sign Up" button
    Then the user should be redirected to the Home page

 Examples:
    | email                  | name          | password      |
    | joedavid@gmail.com     | Joe David     |  password123  |
    | thompsonjane@yahoo.com | Thompson Jane |  lima1968     |