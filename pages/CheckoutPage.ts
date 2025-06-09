import { Page } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    // Locators
    private firstNameInput = '[data-test="firstName"]';
    private lastNameInput = '[data-test="lastName"]';
    private postalCodeInput = '[data-test="postalCode"]';
    private continueButton = '[data-test="continue"]';
    private cancelButton = '[data-test="cancel"]';
    private finishButton = '[data-test="finish"]';
    private errorMessage = '[data-test="error"]';
    private summaryInfo = '[data-test="summary-info"]';
    private summarySubtotal = '[data-test="summary-subtotal"]';
    private summaryTax = '[data-test="summary-tax"]';
    private summaryTotal = '[data-test="summary-total"]';

    constructor(page: Page) {
        this.page = page;
    }

    async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
    }

    async continueToOverview() {
        const continueButton = await this.page.$(this.continueButton);
        if (!continueButton) {
            throw new Error('Continue button not found');
        }
        await continueButton.click();
    }

    async cancelCheckout() {
        const cancelButton = await this.page.$(this.cancelButton);
        if (!cancelButton) {
            throw new Error('Cancel button not found');
        }
        await cancelButton.click();
    }

    async finishCheckout() {
        const finishButton = await this.page.$(this.finishButton);
        if (!finishButton) {
            throw new Error('Finish button not found');
        }
        await finishButton.click();
    }

    async getErrorMessage() {
        const errorElement = await this.page.$(this.errorMessage);
        if (!errorElement) {
            return null;
        }
        return await errorElement.textContent();
    }

    async getSummaryInfo() {
        const summaryElement = await this.page.$(this.summaryInfo);
        if (!summaryElement) {
            throw new Error('Summary information not found');
        }
        return await summaryElement.textContent();
    }

    async getSummaryTotals() {
        const subtotalElement = await this.page.$(this.summarySubtotal);
        const taxElement = await this.page.$(this.summaryTax);
        const totalElement = await this.page.$(this.summaryTotal);

        if (!subtotalElement || !taxElement || !totalElement) {
            throw new Error('One or more summary total elements not found');
        }

        return {
            subtotal: await subtotalElement.textContent(),
            tax: await taxElement.textContent(),
            total: await totalElement.textContent()
        };
    }
} 