import { Page } from '@playwright/test';
import urls from '../data/urls.json';

export class InventoryPage {
    private page: Page;
    private selectors = {
        // Header elements
        cartIcon: '[data-test="shopping-cart-link"]',
        cartBadge: '[data-test="shopping-cart-badge"]',
        
        // Product elements
        productContainer: '.inventory_item',
        addToCartButton: '[data-test^="add-to-cart"]',
        removeButton: '[data-test^="remove"]',
        productName: '[data-test="inventory-item-name"]',
        
        // Navigation
        inventoryContainer: '#inventory_container'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to the inventory page
     */
    async navigateToInventory() {
        await this.page.goto(urls.ui.baseUrl + urls.ui.endpoints.inventory);
    }

    /**
     * Check if we are on the inventory page
     */
    async isOnInventoryPage(): Promise<boolean> {
        return await this.page.isVisible(this.selectors.inventoryContainer);
    }

    /**
     * Get the number of items in the cart
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
     * Add a product to cart by its name
     */
    async addProductToCart(productName: string) {
        const product = this.page.locator(this.selectors.productContainer)
            .filter({ hasText: productName });
        await product.locator(this.selectors.addToCartButton).click();
    }

    /**
     * Navigate to cart
     */
    async goToCart() {
        await this.page.locator(this.selectors.cartIcon).click();
    }

    /**
     * Add all products to cart
     */
    async addAllProductsToCart() {
        const products = await this.page.$$(this.selectors.productContainer);
        for (const product of products) {
            const addButton = await product.$(this.selectors.addToCartButton);
            if (addButton) {
                await addButton.click();
                await this.page.waitForTimeout(500); // Wait for add animation
            }
        }
    }

    /**
     * Click on a product to view its details
     */
    async clickOnProduct(productName: string): Promise<void> {
        try {
            // Find all product names and click the one that matches exactly
            const productLinks = await this.page.$$('[data-test="inventory-item-name"]');
            for (const link of productLinks) {
                const text = await link.textContent();
                if (text?.trim() === productName) {
                    await link.click();
                    await this.page.waitForURL('**/inventory-item.html*', { timeout: 5000 });
                    return;
                }
            }
            throw new Error(`Product "${productName}" not found`);
        } catch (error) {
            throw new Error(`Failed to click on product '${productName}': ${error}`);
        }
    }

    /**
     * Remove a product from cart by its name
     */
    async removeFromCart(productName: string) {
        const product = this.page.locator(this.selectors.productContainer)
            .filter({ hasText: productName });
        await product.locator(this.selectors.removeButton).click();
        await this.page.waitForTimeout(500); // Wait for removal animation
    }
} 