Feature: Search Functionality

User Story:
    As a user, I want to be able to search for yoga poses by their name so that I can quickly find the poses I am looking for.

Scenario Outline: Searching for yoga poses by name
    Given the user is on the landing page
    When the user enters "<poseName>" in the search bar
    And the user clicks on the search button
    Then the user should see search results for "<poseName>"

Examples:
      | poseName         |
      | Bridge           |
      | Tree             |
      | Warrior One      |
      | Wheel            |
      | Upward-Facing Dog |
      | Child's Pose      |

