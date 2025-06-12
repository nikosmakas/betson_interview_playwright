Feature: Shopping Cart Functionality
  As a user
  I want to manage items in my shopping cart
  So that I can complete my purchase

  Background:
    Given I am on the home page
    And I am logged in with valid credentials

@smoke
  Scenario: Add all items to cart from the inventory page
    When I add all products to cart
    Then the cart icon should show "6" items
    And the cart should contain all 6 products with correct names and prices

@smoke
  Scenario: Add item from item details page
    When I click on "Sauce Labs Backpack" product
    And I add the product to cart from details page
    Then the cart icon should show "1" item
    And the cart should contain "Sauce Labs Backpack" with price "$29.99"

@smoke
  Scenario: Proceed to checkout
    Given I have items in my cart
    When I navigate to the cart page
    And I click "Checkout"
    Then I should be redirected to the checkout page 

  Scenario: Remove item from cart from inventory page
    Given I have "Sauce Labs Backpack" in my cart
    When I click "Remove" on "Sauce Labs Backpack" from inventory page
    And I navigate to the cart page
    Then the cart icon should update 
    And "Sauce Labs Backpack" should not appear in the cart


  Scenario: Remove item from cart page
    Given I have multiple items in my cart
    When I navigate to the cart page
    And I click "Remove" on "Sauce Labs Onesie"
    Then "Sauce Labs Onesie" should be removed from the list
    And the cart count should decrease by 1

  Scenario: Continue shopping from cart page
    Given I am on the cart page
    When I click "Continue Shopping"
    Then I should be redirected to the inventory page