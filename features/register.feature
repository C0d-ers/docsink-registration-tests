Feature file
Feature: User Registration

  Scenario: Successful user registration
    Given I am on the registration page
    When I enter valid registration details
    And I submit the registration form
    Then I should be redirected to enter OTP
    And I retrieve the OTP from my email and enter it
    Then I should see a success toast message