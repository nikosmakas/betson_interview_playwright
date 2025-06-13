import { Page } from '@playwright/test';
import { config } from '../config';

export class ProductDetailsPage {
    private page: Page;

    private readonly selectors = {
        addToCartButton: '[data-test="add-to-cart"]',
        cartBadge: '[data-test="shopping-cart-badge"]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Add product to cart
     */
    async addToCart(): Promise<void> {
        try {
            const addButton = this.page.locator(this.selectors.addToCartButton);
            await addButton.waitFor({ state: 'visible' });
            await addButton.click();
        } catch (error) {
            throw new Error(`Failed to add product to cart: ${error}`);
        }
    }

    /**
     * Get cart item count
     * @returns The number of items in cart
     */
    async getCartItemCount(): Promise<string> {
        try {
            const badge = this.page.locator(this.selectors.cartBadge);
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