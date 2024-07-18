Feature: Generating a video sequence

    User Story: 
    As a user I want to be able to generate video sequences of selected yoga poses, 
    so that I can follow along with the poses and audio during my practice. For this user story,
    I want to create an end-to-end test which would give me confidence that my users would be able to navigate to this page by clicking the appropriate buttons.

Scenario: Generating a Video Sequence
    Given the user is on the landing page
    When the user clicks on "Generate a sequence" button
    And the user clicks on "Butterfly" text
    And the user clicks on "Cow" text
    And the user clicks on "Dolphin" text
    And the user clicks on "Generate Video" button
    Then the user should watch a video