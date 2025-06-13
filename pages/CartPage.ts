import { Page } from '@playwright/test';
import urls from '../data/urls.json';

interface CartItem {
    name: string;
    price: string;
    quantity: string;
}

export class CartPage {
    private page: Page;

    // Selectors using data-test attributes for better maintainability
    private readonly selectors = {
        cartItems: '[data-test="inventory-item"]',
        cartItemName: '[data-test="inventory-item-name"]',
        cartItemPrice: '[data-test="inventory-item-price"]',
        cartItemQuantity: '[data-test="item-quantity"]',
        removeButton: '[data-test^="remove-"]',
        checkoutButton: '[data-test="checkout"]',
        continueShoppingButton: '[data-test="continue-shopping"]',
        cartCount: '[data-test="shopping-cart-badge"]',
        cartContainer: '#cart_contents_container'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to the cart page
     * @throws {Error} If navigation fails
     */
    async navigateToCart(): Promise<void> {
        try {
            await this.page.goto(urls.ui.baseUrl + urls.ui.endpoints.cart);
            await this.page.waitForSelector(this.selectors.cartContainer);
        } catch (error) {
            throw new Error(`Failed to navigate to cart page: ${error}`);
        }
    }

    /**
     * Get all items in the cart
     * @returns Array of cart items with their details
     * @throws {Error} If getting cart items fails
     */
    async getCartItems(): Promise<CartItem[]> {
        try {
            const items = await this.page.$$(this.selectors.cartItems);
            const cartItems: CartItem[] = [];
            
            for (const item of items) {
                const nameElement = await item.$(this.selectors.cartItemName);
                if (!nameElement) throw new Error('Item name element not found');
                const name = await nameElement.textContent();
                if (!name) throw new Error('Item name is empty');

                const priceElement = await item.$(this.selectors.cartItemPrice);
                if (!priceElement) throw new Error('Item price element not found');
                const price = await priceElement.textContent();
                if (!price) throw new Error('Item price is empty');

                cartItems.push({ name, price, quantity: '1' }); // Default quantity is 1
            }
            
            return cartItems;
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error}`);
        }
    }

    /**
     * Remove an item from the cart
     * @param itemName - The name of the item to remove
     * @throws {Error} If removing the item fails
     */
    async removeItem(itemName: string): Promise<void> {
        try {
            const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
            const removeButton = this.page.locator(`[data-test="remove-${formattedName}"]`);
            if (!await removeButton.isVisible()) {
                throw new Error(`Remove button for item "${itemName}" not found`);
            }
            await removeButton.click();
            await this.page.waitForTimeout(500); // Wait for removal animation
        } catch (error) {
            throw new Error(`Failed to remove item: ${error}`);
        }
    }

    /**
     * Proceed to checkout
     * @throws {Error} If proceeding to checkout fails
     */
    async proceedToCheckout(): Promise<void> {
        try {
            const checkoutButton = this.page.locator(this.selectors.checkoutButton);
            await checkoutButton.waitFor({ state: 'visible', timeout: 5000 });
            await checkoutButton.click();
            await this.page.waitForURL('**/checkout-step-one.html', { timeout: 5000 });
        } catch (error) {
            throw new Error(`Failed to proceed to checkout: ${error}`);
        }
    }

    /**
     * Continue shopping
     * @throws {Error} If continuing shopping fails
     */
    async continueShopping(): Promise<void> {
        try {
            const continueButton = this.page.locator(this.selectors.continueShoppingButton);
            if (!await continueButton.isVisible()) {
                throw new Error('Continue Shopping button not found');
            }
            await continueButton.click();
            await this.page.waitForURL('**/inventory.html');
        } catch (error) {
            throw new Error(`Failed to continue shopping: ${error}`);
        }
    }

    /**
     * Check if an item is in the cart
     * @param productName - The name of the product to check
     * @returns true if the item is in the cart, false otherwise
     */
    async isItemInCart(productName: string): Promise<boolean> {
        try {
            const items = await this.getCartItems();
            return items.some(item => item.name === productName);
        } catch (error) {
            throw new Error(`Failed to check if item is in cart: ${error}`);
        }
    }

    /**
     * Get the number of items in the cart
     * @returns The number of items as a string
     */
    async getCartItemCount(): Promise<string> {
        try {
            const badge = this.page.locator(this.selectors.cartCount);
            if (await badge.isVisible()) {
                const count = await badge.textContent();
                return count || '0';
            }
            return '0';
        } catch (error) {
            throw new Error(`Failed to get cart item count: ${error}`);
        }
    }
} 