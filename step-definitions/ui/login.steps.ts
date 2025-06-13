import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { config } from '../../config';

// Using keyof typeof config.ui.users ensures type safety:
// - typeof config.ui.users gets the type of the users object
// - keyof gets all possible keys of that type
// This means userType can only be one of the actual keys in users.json
// (e.g., 'standard_user', 'locked_out_user', 'invalid_credentials_user')
Given('the {string} user enters valid credentials', async function(userType: keyof typeof config.ui.users) {
    const loginPage = new LoginPage(this.page);
    const user = config.ui.users[userType];
    
    await loginPage.navigateToLogin();
    await loginPage.fillLoginFields(user.username, user.password);
});

Given('the user {string} has entered incorrect credentials', async function(userType: keyof typeof config.ui.users) {
    const loginPage = new LoginPage(this.page);
    const user = config.ui.users[userType];
    
    await loginPage.navigateToLogin();
    await loginPage.fillLoginFields(user.username, user.password);
});

Given('the {string} user enters their credentials', async function(userType: keyof typeof config.ui.users) {
    const loginPage = new LoginPage(this.page);
    const user = config.ui.users[userType];
    
    await loginPage.navigateToLogin();
    await loginPage.fillLoginFields(user.username, user.password);
});

Given('the user submits the login form with empty username', async function() {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigateToLogin();
    await loginPage.fillLoginFields('', 'any_password');
});

Given('the user submits the login form with empty password', async function() {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigateToLogin();
    await loginPage.fillLoginFields('standard_user', '');
});

Given('the user has not logged in', async function() {
    // No action needed as we're testing direct access
});

// Separate step for clicking login button to:
// 1. Make the test flow more explicit
// 2. Allow for potential pre-click validations
// 3. Make it easier to debug login issues
When('they click the Login button', async function() {
    const loginPage = new LoginPage(this.page);
    await loginPage.clickLoginButton();
});

When('they navigate directly to the inventory page', async function() {
    const inventoryPage = new (require('../../pages/InventoryPage').InventoryPage)(this.page);
    await inventoryPage.navigateToInventory();
});

// Using toContain instead of toEqual for the URL check because:
// 1. The base URL might be different in different environments
// 2. There might be query parameters we don't care about
// 3. It's more resilient to minor URL changes
Then('they should be redirected to the Inventory page', async function() {
    const inventoryPage = new InventoryPage(this.page);
    const isOnInventory = await inventoryPage.isOnInventoryPage();
    expect(isOnInventory).toBe(true);
});

Then('the error message {string} should be displayed', async function(errorMessage: string) {
    const loginPage = new LoginPage(this.page);
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toBe(errorMessage);
});

Then('both input fields should be marked with red X icons', async function() {
    const loginPage = new LoginPage(this.page);
    const hasErrorIcons = await loginPage.hasErrorIcons();
    expect(hasErrorIcons).toBe(true);
});

Then('the corresponding input fields should be highlighted with red X icons', async function() {
    const loginPage = new LoginPage(this.page);
    const hasErrorIcons = await loginPage.hasErrorIcons();
    expect(hasErrorIcons).toBe(true);
});

Then('they should be redirected to the login page', async function() {
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(config.ui.endpoints.login);
});

Then('both fields should show the red X icons', async function() {
    const loginPage = new LoginPage(this.page);
    const hasErrorIcons = await loginPage.hasErrorIcons();
    expect(hasErrorIcons).toBe(true);
});
