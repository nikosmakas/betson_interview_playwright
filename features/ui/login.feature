@ui @login @regression
Feature: Login Functionality
  As a user of the Sauce Demo application
  I want to be able to log in to my account
  So that I can access the inventory and make purchases

  @smoke
  Scenario: Valid login
    Given the "standard_user" user enters valid credentials
    When they click the Login button
    Then they should be redirected to the Inventory page

  Scenario: Invalid Credentials
    Given the user "invalid_credentials_user" has entered incorrect credentials
    When they click the Login button
    Then the error message "Epic sadface: Username and password do not match any user in this service" should be displayed
    And both input fields should be marked with red X icons

  Scenario: Empty username field
    Given the user submits the login form with empty username
    When they click the Login button
    Then the error message "Epic sadface: Username is required" should be displayed
    And the corresponding input fields should be highlighted with red X icons

  Scenario: Empty password field
    Given the user submits the login form with empty password
    When they click the Login button
    Then the error message "Epic sadface: Password is required" should be displayed
    And the corresponding input fields should be highlighted with red X icons

  Scenario: Locked out user
    Given the "locked_out_user" user enters their credentials
    When they click the Login button
    Then the error message "Epic sadface: Sorry, this user has been locked out." should be displayed
    And both fields should show the red X icons

  Scenario: Access inventory without logging in
    Given the user has not logged in
    When they navigate directly to the inventory page
    Then they should be redirected to the login page
    And both fields should show the red X icons
    And the error message "Epic sadface: You can only access '/inventory.html' when you are logged in." should be displayed

