| User                     | Description                                  | Problems                                      |
|--------------------------|----------------------------------------------|-----------------------------------------------|
| `standard_user`          | Canonical user                               | none                                          |
| `locked_out_user`        | Should be locked out                         | Error message shown                           |
| `problem_user`           | Problematic user profile                     | Wrong images, redirect bugs, cart issues      |
| `performance_glitch_user`| Performance issues                           | 5s delay on login and sorting                 |
| `error_user`             | Issues with error handling                   | Console + network errors                      |
| `visual_user`            | UI/UX issues                                | Misaligned icons, random prices, rotated burger |

### Feature: Login Functionality

# Scenario 1: Valid login
Given the "<user_type>" user enters valid credentials
When they click the Login button
Then they should be redirected to the Inventory page

# Scenario 2: Invalid Credentials
Given the user "<user_type>" has entered incorrect credentials
When they click the Login button
Then an error message "Epic sadface: Username and password do not match any user in this service." should be displayed
And both input fields should be marked with red X icons

# Scenario 3: Empty username field
Given the user submits the login form with empty username
When they click the Login button
Then the error message "Epic sadface: Username is required" should be displayed
And the corresponding input fields should be highlighted with red X icons

# Scenario 4: Empty password field
Given the user submits the login form with empty password
When they click the Login button
Then the error message "Epic sadface: Password is required" should be displayed
And the corresponding input fields should be highlighted with red X icons

# Scenario 5: Locked out user
Given the "<locked_out_user>" user enters their credentials
When they click the Login button
Then the error message "Epic sadface: Sorry, this user has been locked out." should be shown
And both fields should show the red X icons

# Scenario 6: Access inventory without logging in
Given the user has not logged in
When they navigate directly to /inventory.html
Then they should be redirected to the login page
And both fields should show the red X icons
And the error message "Epic sadface: You can only access '/inventory.html' when you are logged in." should be displayed

### Feature: Add to Cart Functionality

# Scenario 1: Add all items to cart from the inventory page
Given the "<user_type>" user has logged in
When they click "Add to cart" on all products in the inventory
Then the cart icon should display the correct item count
And each added item should appear in the cart page with the correct name, price, and image

# Scenario 2: Add item from item details page
Given the "<user_type>" user has logged in
And the user has navigated to a product details page
When they click "Add to cart"
Then the cart icon should update to show 1 item
And the cart should contain that item with correct name, price, and quantity

# Scenario 3: Cross-validate item info across pages
Given the "<user_type>" user has logged in
And the user has selected a product from the inventory page
When they open the item from the inventory page
And they open the item from the item details page
And they open the item from the cart page
Then all information should match exactly

# Scenario 4: Remove item from cart from inventory page
Given the "<user_type>" user has logged in
And the user has added an item to the cart
When they click "Remove" on the same item on the inventory page
Then the cart icon should update accordingly
And the item should no longer appear in the cart

# Scenario 5: Remove item from cart from item details page
Given the "<user_type>" user has logged in
And the user has added an item to the cart
And they navigate to that item detail page
When they click "Remove"
Then the cart icon should update
And the item should be removed from the cart

# Scenario 6: Remove item from cart page
Given the "<user_type>" user has logged in
And the user has one or more items in their cart
When they navigate to the cart page and click "Remove"
Then the item should be removed from the list
And the item count should decrease accordingly

### Feature: Checkout Functionality

# Scenario 1: Successful checkout with items in cart
Given the "<user_type>" user has logged in
And the user has added items to the cart
When they proceed to checkout
And they fill in valid shipping information
Then they should reach the confirmation page
And the product data (names, prices, totals) should be accurate
And the order should be marked as complete

# Scenario 2: Attempt to checkout with empty cart
Given the "<user_type>" user has logged in
And the user has no items in the cart
And their cart is empty
When they try to proceed to checkout
Then they should receive an error
And checkout should be blocked

# Scenario 3: Attempt to checkout with invalid shipping information
Given the "<user_type>" user has logged in
And the user has added items to the cart
And they have reached the checkout form
When they leave one or more required fields empty
Then an appropriate error message should be displayed
And the user should not be able to proceed to the final step

# Scenario 4: Navigate back during checkout
Given the "<user_type>" user has logged in
And the user has added items to the cart
Given the user is in the middle of the checkout process
When they click the "Cancel" or "Back" button
Then they should return to the cart without losing data
And the cart should still reflect the selected items correctly


API TESTING

## Endpoint Group 1: /pet
# Test Case 1.1 — Create Pet (POST /pet)
Goal: Successfully create a new pet with valid schema
Method: POST /pet
Request Body:
{
  "id": 10001,
  "name": "Fluffy",
  "category": { "id": 1, "name": "cat" },
  "photoUrls": ["https://example.com/fluffy.jpg"],
  "tags": [{ "id": 1, "name": "cute" }],
  "status": "available"
}
Expected Result: HTTP 200 OK and response contains the same id and name.

# Test Case 1.2 — Fail to Create Pet with Invalid Schema
Goal: Verify API returns an error for invalid data
Method: POST /pet
Request Body: Missing required fields (e.g., no name)
Expected Result: HTTP 400 Bad Request or validation error (behavior may vary based on implementation)

# Test Case 1.3 — Get Pet by ID (GET /pet/{petId})
Goal: Retrieve a pet that was previously created
Steps:
Create a pet with known ID
Use that ID to GET /pet/{id}
Expected Result: HTTP 200 OK and matching pet data

# Test Case 1.4 — Get Non-Existing Pet
Goal: Verify that requesting a nonexistent pet returns 404
Method: GET /pet/99999999
Expected Result: HTTP 404 Not Found

# Test Case 1.5 — Update Existing Pet (PUT /pet)
Goal: Update the status of an existing pet
Steps:
Create a pet with status: available
Send PUT /pet with updated status: sold
Expected Result: HTTP 200 OK, updated pet reflects new status

## Endpoint Group 2: /store
# Test Case 2.1 — Get Inventory (GET /store/inventory)
Goal: Retrieve pet status inventory
Method: GET /store/inventory
Expected Result: HTTP 200 OK and a JSON map like:
{
  "available": 5,
  "pending": 2,
  "sold": 1
}

# Test Case 2.2 — Place Order (POST /store/order)
Goal: Successfully create a new order
Request Body:
{
  "id": 5001,
  "petId": 10001,
  "quantity": 1,
  "shipDate": "2025-06-08T10:00:00.000Z",
  "status": "placed",
  "complete": true
}
Expected Result: HTTP 200 OK with matching order details

# Test Case 2.3 — Get Order by ID (GET /store/order/{orderId})
Goal: Retrieve an order that was placed in the previous test
Steps:
Create an order
Fetch it by ID
Expected Result: HTTP 200 OK, order data matches creation

# Test Case 2.4 — Delete Order by ID (DELETE /store/order/{orderId})
Goal: Delete a previously created order
Steps:
Place an order
Delete it using DELETE /store/order/{orderId}
Verify deletion by trying to GET the order again
Expected Result: HTTP 200 OK on delete, then 404 Not Found on fetch 