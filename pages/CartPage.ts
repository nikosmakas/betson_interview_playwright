import { Page } from '@playwright/test';

export class CartPage {
    private page: Page;

    // Locators
    private cartItems = '[data-test="inventory-item"]';
    private cartItemName = '[data-test="inventory-item-name"]';
    private cartItemPrice = '[data-test="inventory-item-price"]';
    private cartItemQuantity = '[data-test="item-quantity"]';
    private removeButton = '[data-test="remove-sauce-labs-backpack"]';
    private checkoutButton = '[data-test="checkout"]';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCart() {
        await this.page.goto('/cart.html');
    }

    // $$ returns all matching elements as an array
    async getCartItems() {
        return await this.page.$$(this.cartItems);
    }

    async removeItem(itemName: string) {
        // Μετατρέπει το όνομα του προϊόντος σε μορφή που ταιριάζει με το data-test attribute
        // Παράδειγμα: "Sauce Labs Backpack" -> "sauce-labs-backpack"
        const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
        const removeButton = await this.page.$(`[data-test="remove-${formattedName}"]`);
        if (!removeButton) {
            throw new Error(`Remove button for item "${itemName}" not found`);
        }
        await removeButton.click();
    }

    async getItemDetails(itemName: string) {
        // Βρίσκουμε το όνομα του προϊόντος
        const nameElement = await this.page.$(`[data-test="inventory-item-name"]`);
        if (!nameElement) {
            throw new Error(`Item "${itemName}" not found in cart`);
        }
        const name = await nameElement.textContent();
        if (!name) {
            throw new Error(`Item name is empty for "${itemName}"`);
        }

        // Βρίσκουμε την τιμή του προϊόντος
        const priceElement = await this.page.$(`[data-test="inventory-item-price"]`);
        if (!priceElement) {
            throw new Error(`Price element not found for item "${itemName}"`);
        }
        const price = await priceElement.textContent();
        if (!price) {
            throw new Error(`Price is empty for item "${itemName}"`);
        }

        // Βρίσκουμε την ποσότητα του προϊόντος
        const quantityElement = await this.page.$(`[data-test="item-quantity"]`);
        if (!quantityElement) {
            throw new Error(`Quantity element not found for item "${itemName}"`);
        }
        const quantity = await quantityElement.textContent();
        if (!quantity) {
            throw new Error(`Quantity is empty for item "${itemName}"`);
        }

        return { name, price, quantity };
    }

    async proceedToCheckout() {
        const checkoutButton = await this.page.$(this.checkoutButton);
        if (!checkoutButton) {
            throw new Error('Checkout button not found');
        }
        await checkoutButton.click();
    }
} 