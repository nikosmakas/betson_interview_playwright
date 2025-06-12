import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { CustomWorld } from '../../support/world';
import users from '../../data/users.json';

Given('I am on the home page', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.navigateToInventory();
});

Given('I am logged in with valid credentials', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const loginPage = new LoginPage(this.page);
    const user = users.standard_user;
    await loginPage.login(user.username, user.password);
});

When('I add all products to cart', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addAllProductsToCart();
});

Then('the cart icon should show {string} item', async function(this: CustomWorld, expectedCount: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(expectedCount);
});

Then('the cart should contain all 6 products with correct names and prices', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    await cartPage.navigateToCart();
    const items = await cartPage.getCartItems();
    expect(items.length).toBe(6);
    
    const expectedProducts = [
        { name: 'Sauce Labs Bike Light', price: '$9.99' },
        { name: 'Sauce Labs Backpack', price: '$29.99' },
        { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' },
        { name: 'Sauce Labs Fleece Jacket', price: '$49.99' },
        { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99' },
        { name: 'Sauce Labs Onesie', price: '$7.99' }
    ];

    for (const expected of expectedProducts) {
        const isInCart = await cartPage.isItemInCart(expected.name);
        expect(isInCart).toBeTruthy();
    }
});

When('I click on {string} product', async function(this: CustomWorld, productName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.clickOnProduct(productName);
});

When('I add the product to cart from details page', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const productDetailsPage = new ProductDetailsPage(this.page);
    await productDetailsPage.addToCart();
});

Then('the cart should contain {string} with price {string}', async function(this: CustomWorld, productName: string, expectedPrice: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    await cartPage.navigateToCart();
    const isInCart = await cartPage.isItemInCart(productName);
    expect(isInCart).toBeTruthy();
});

When('I navigate to the cart page', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    await cartPage.navigateToCart();
});

When('I navigate to {string} details page', async function(this: CustomWorld, productName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.clickOnProduct(productName);
});

When('I click {string} from details page', async function(this: CustomWorld, action: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const productDetailsPage = new ProductDetailsPage(this.page);
    if (action.toLowerCase() === 'remove') {
        await productDetailsPage.removeFromCart();
    } else {
        throw new Error(`Unknown action: ${action}`);
    }
});

Then('the product name should be {string}', async function(this: CustomWorld, expectedName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const productDetailsPage = new ProductDetailsPage(this.page);
    const name = await productDetailsPage.getProductName();
    expect(name).toBe(expectedName);
});

Then('the product price should be {string}', async function(this: CustomWorld, expectedPrice: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const productDetailsPage = new ProductDetailsPage(this.page);
    const price = await productDetailsPage.getProductPrice();
    expect(price).toBe(expectedPrice);
});

Then('the product description should match the inventory page', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const productDetailsPage = new ProductDetailsPage(this.page);
    const description = await productDetailsPage.getProductDescription();
    expect(description).toBeTruthy();
});

Given('I have {string} in my cart', async function(this: CustomWorld, productName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addProductToCart(productName);
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe('1');
});

When('I click {string} on {string} from inventory page', async function(this: CustomWorld, action: string, productName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.removeFromCart(productName);
});

Then('the cart icon should update', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe('0');
});

Then('{string} should be removed from the cart', async function(this: CustomWorld, productName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    await cartPage.navigateToCart();
    const isInCart = await cartPage.isItemInCart(productName);
    expect(isInCart).toBeFalsy();
});

Given('I have multiple items in my cart', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addAllProductsToCart();
    const count = await inventoryPage.getCartItemCount();
    expect(parseInt(count)).toBeGreaterThan(0);
});

When('I click {string} on {string}', async function(this: CustomWorld, action: string, productName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    await cartPage.removeItem(productName);
});

Then('{string} should be removed from the list', async function(this: CustomWorld, productName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    const isInCart = await cartPage.isItemInCart(productName);
    expect(isInCart).toBeFalsy();
});

Then('the cart count should decrease by 1', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    const count = await cartPage.getCartItemCount();
    expect(parseInt(count)).toBe(5);
});

Given('I am on the cart page', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    await cartPage.navigateToCart();
});

When('I click {string}', async function(this: CustomWorld, button: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    if (button === 'Continue Shopping') {
        await cartPage.continueShopping();
    } else if (button === 'Checkout') {
        await cartPage.proceedToCheckout();
    }
});

Then('I should be redirected to the inventory page', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    await this.page.waitForURL('**/inventory.html');
});

Then('I should be redirected to the checkout page', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    await this.page.waitForURL('**/checkout-step-one.html');
});

Given('I have items in my cart', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addAllProductsToCart();
    const count = await inventoryPage.getCartItemCount();
    expect(count).not.toBe('0');
});

Then('{string} should not appear in the cart', async function(this: CustomWorld, productName: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const cartPage = new CartPage(this.page);
    const isInCart = await cartPage.isItemInCart(productName);
    expect(isInCart).toBe(false);
});

Then('the cart icon should show {string} items', async function(this: CustomWorld, expectedCount: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const inventoryPage = new InventoryPage(this.page);
    const count = await inventoryPage.getCartItemCount();
    expect(count).toBe(expectedCount);
}); 