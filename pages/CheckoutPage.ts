import { Page } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    // Locators
    private firstNameInput = '[data-test="firstName"]';
    private lastNameInput = '[data-test="lastName"]';
    private postalCodeInput = '[data-test="postalCode"]';
    private continueButton = '[data-test="continue"]';
    private finishButton = '[data-test="finish"]';
    private summaryInfo = '[data-test="complete-header"]';

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

    async finishCheckout() {
        const finishButton = await this.page.$(this.finishButton);
        if (!finishButton) {
            throw new Error('Finish button not found');
        }
        await finishButton.click();
    }

    async getSummaryInfo() {
        const summaryElement = await this.page.$(this.summaryInfo);
        if (!summaryElement) {
            throw new Error('Summary information not found');
        }
        return await summaryElement.textContent();
    }
} 