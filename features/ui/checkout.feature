Feature: Checkout Functionality
  As a user
  I want to complete my purchase
  So that I can receive my ordered items

  Background:
    Given I am on the home page
    And I am logged in with valid credentials

@smoke
  Scenario: Successful checkout with items in cart
    Given I have items in my cart
    And I navigate to the cart page
    And I click "Checkout"
    When I enter first name "John"
    And I enter last name "Doe"
    And I enter postal code "12345"
    And I click "Continue"
    Then I should see the checkout overview page
    And I should see the total price
    And I click "Finish"
    Then I should see the order confirmation message
    And I should be redirected to the inventory page

@smoke 
  Scenario: Attempt to checkout with empty cart
    Given I have no items in my cart
    And I navigate to the cart page
    When I click "Checkout"
    Then I should see the error message "Your cart is empty"
    And I should not be able to proceed to checkout

@regression
  Scenario: Attempt to checkout with invalid shipping information
    Given I have items in my cart
    And I navigate to the cart page
    And I click "Checkout"
    When I click "Continue"
    Then I should see the error message "Error: First Name is required"
    When I enter first name "John"
    And I click "Continue"
    Then I should see the error message "Error: Last Name is required"
    When I enter last name "Doe"
    And I click "Continue"
    Then I should see the error message "Error: Postal Code is required"

@regression
  Scenario: Direct navigation to checkout without login
    Given the user has not logged in
    When they navigate directly to the checkout page
    Then they should be redirected to the login page
    And both fields should show the red X icons
    And the error message "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in." should be displayed

@regression
  Scenario: Price consistency across checkout steps
    Given I have items in my cart
    And I navigate to the cart page
    And I click "Checkout"
    When I enter first name "John"
    And I enter last name "Doe"
    And I enter postal code "12345"
    And I click "Continue"
    Then I should see the checkout overview page
    And I should see the subtotal price
    And I should see the tax amount
    And I should see the total price
    When I click "Finish"
    Then I should see the order confirmation page
    And the prices should match the overview page

