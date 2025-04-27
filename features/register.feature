Feature: User Registration

  Scenario: Successful user registration
    Given I am on the registration page
    When I enter valid registration details
    And I submit the registration form
    Then I should be redirected to enter OTP
    And I retrieve the OTP from my email and enter it
    Then I should see a success toast message

  Scenario: Registration with already registered email
    Given I am on the registration page
    When I enter a registered email address
    And I submit the registration form
    Then I should see an error toast message

  Scenario: Registration with missing required fields
    Given I am on the registration page
    When I leave mandatory fields empty
    And I submit the registration form
    Then I should see all required field error messages

  Scenario: Registration with invalid email format
    Given I am on the registration page
    When I enter an invalid email address
    And I submit the registration form
    Then I should see an error message