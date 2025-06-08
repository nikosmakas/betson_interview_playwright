Technologies Used:

Framework: Playwright

Language: TypeScript

Package Manager: npm

Test Runner: Playwright Test (built-in)

Assertion Library: Playwright expect

=========================================================

Project Structure & Architecture

The repository is structured in a modular way to clearly separate UI and API test concerns:


UI Tests use the Page Object Model for abstraction.

API Tests utilize Playwright’s built-in request API.

Utilities and test data are extracted into their own folders to keep tests clean and maintainable.


=========================================================

--UI Testing Plan (for https://www.saucedemo.com)

-Major Feature 1: Login

Test Scenarios:

1.Login with valid credentials

2.Login with invalid credentials (wrong password)

3.Login with empty username and/or password fields

4.Attempt to access inventory while logged out.

-Major Feature 2: Add to Cart
Test Scenarios:

1.Add all products to cart
(recursively add everything to cart and assert that there are as many items are recursions(?) , and that the total is accurate.)

2.Add individual item from item page
(Recursively-optional) Open an item page and add to cart. assert that it has been added to cart with the correct information (cross check main page info with item page info and cart page item info using scenarioContext)

3.Remove items from main page / item page / cart
Remove an item from cart (main page)
Remove an item from cart (item page)
Remove an item from cart (cart page)


-Major Feature 3: Check-Out
Test scenarios:

1.Checkout with products
proceed to checkout with one or more items in cart, assert that the data (prices, names etc.) are accurate

2.Checkout with empty cart
proceed to checkout with no items in cart (expect error)

3.Invalid shipping info
proceed to check out with invalid shipping info. (expect error)


--API Testing Plan (https://petstore.swagger.io)

Endpoint 1: /PET
Test Scenarios:

1. POST /pet   Successfully create a pet with valid data
               Fail to create pet with invalid schema

2. GET /pet    Fetch an existing pet by ID
               Return 404 when pet does not exist

3. PUT /pet    Update existing pet
(After getting an existing pet by id e.g. status: available -> sold)

Endpoint 2: store
Test Scenarios:

GET /store/inventory    Returns a map of status codes to quantities

POST /store/order   Place an order for a pet

GET /store/order/{orderId}  Find purchace order by ID 
(maybe find the one I created in the post scenario)

DELETE /store/order/{orderId}   Delete purchace order by ID 
(maybe delete the one i created in the post scenario)
