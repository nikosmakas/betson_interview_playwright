@ui @checkout @smoke
Feature: Checkout Process
  As a logged-in user
  I want to complete my purchase
  So that I can receive my items

  Background:
    Given I am on the home page
    And I am logged in with valid credentials
    And I have items in my cart

  Scenario: Successful checkout with valid information
    When I navigate to the cart page
    And I click "Checkout" button in cart page
    And I fill in first name "Nikolaos", last name "Makarounis" and postal code "12345"
    And I click "Continue" button in checkout page
    And I click "Finish" button in checkout page
    Then I should see the confirmation message "Thank you for your order!"
