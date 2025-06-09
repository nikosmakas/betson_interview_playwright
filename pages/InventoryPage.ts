import { Page } from '@playwright/test';
import urls from '../data/urls.json';

export class InventoryPage {
    private page: Page;
    private selectors = {
        // Header elements
        cartIcon: '.shopping_cart_link',
        cartBadge: '.shopping_cart_badge',
        
        // Product elements
        productContainer: '.inventory_item',
        addToCartButton: '[data-test^="add-to-cart-"]',
        
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
    async getCartItemCount(): Promise<number> {
        const badge = this.page.locator(this.selectors.cartBadge);
        if (await badge.isVisible()) {
            const count = await badge.textContent();
            return parseInt(count || '0', 10);
        }
        return 0;
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
} 