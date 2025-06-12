import { Page } from '@playwright/test';
import urls from '../data/urls.json';

export class ProductDetailsPage {
    private page: Page;

    private readonly selectors = {
        container: '[data-test="inventory-container"]',
        productContainer: '[data-test="inventory-item"]',
        productName: '[data-test="inventory-item-name"]',
        productDescription: '[data-test="inventory-item-desc"]',
        productPrice: '[data-test="inventory-item-price"]',
        productImage: '[data-test^="item-sauce-labs-"]',
        addToCartButton: '[data-test="add-to-cart"]',
        removeButton: '[data-test="remove"]',
        backButton: '[data-test="back-to-products"]',
        cartBadge: '[data-test="shopping-cart-badge"]'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to product details page
     * @param productId - The ID of the product to view
     */
    async navigateToProductDetails(productId: string): Promise<void> {
        try {
            await this.page.goto(`${urls.ui.baseUrl}${urls.ui.endpoints.inventoryItem}?id=${productId}`);
            await this.page.waitForSelector(this.selectors.container);
        } catch (error) {
            throw new Error(`Failed to navigate to product details: ${error}`);
        }
    }

    /**
     * Get product name
     * @returns The product name
     */
    async getProductName(): Promise<string> {
        try {
            const nameElement = this.page.locator(this.selectors.productName);
            await nameElement.waitFor({ state: 'visible' });
            const name = await nameElement.textContent();
            if (!name) throw new Error('Product name is empty');
            return name;
        } catch (error) {
            throw new Error(`Failed to get product name: ${error}`);
        }
    }

    /**
     * Get product description
     * @returns The product description
     */
    async getProductDescription(): Promise<string> {
        try {
            const descElement = this.page.locator(this.selectors.productDescription);
            await descElement.waitFor({ state: 'visible' });
            const description = await descElement.textContent();
            if (!description) throw new Error('Product description is empty');
            return description;
        } catch (error) {
            throw new Error(`Failed to get product description: ${error}`);
        }
    }

    /**
     * Get product price
     * @returns The product price
     */
    async getProductPrice(): Promise<string> {
        try {
            const priceElement = this.page.locator(this.selectors.productPrice);
            await priceElement.waitFor({ state: 'visible' });
            const price = await priceElement.textContent();
            if (!price) throw new Error('Product price is empty');
            return price;
        } catch (error) {
            throw new Error(`Failed to get product price: ${error}`);
        }
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
     * Remove product from cart
     */
    async removeFromCart(): Promise<void> {
        try {
            const removeButton = this.page.locator(this.selectors.removeButton);
            await removeButton.waitFor({ state: 'visible' });
            await removeButton.click();
        } catch (error) {
            throw new Error(`Failed to remove product from cart: ${error}`);
        }
    }

    /**
     * Navigate back to inventory page
     */
    async navigateBackToInventory(): Promise<void> {
        try {
            const backButton = this.page.locator(this.selectors.backButton);
            await backButton.waitFor({ state: 'visible' });
            await backButton.click();
            await this.page.waitForURL('**/inventory.html');
        } catch (error) {
            throw new Error(`Failed to navigate back to inventory: ${error}`);
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

    /**
     * Check if product is in cart
     * @returns true if product is in cart, false otherwise
     */
    async isProductInCart(): Promise<boolean> {
        try {
            const removeButton = this.page.locator(this.selectors.removeButton);
            return await removeButton.isVisible();
        } catch (error) {
            throw new Error(`Failed to check if product is in cart: ${error}`);
        }
    }
} 