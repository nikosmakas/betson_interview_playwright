import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CustomWorld } from '../../support/world';
import { config } from '../../config';


When('I fill in first name {string}, last name {string} and postal code {string}', async function(this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
});


When('I click {string} button in checkout page', async function(this: CustomWorld, button: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const checkoutPage = new CheckoutPage(this.page);
    if (button === 'Continue') {
        await checkoutPage.continueToOverview();
    } else if (button === 'Finish') {
        await checkoutPage.finishCheckout();
    }
});

Then('I should see the confirmation message {string}', async function(this: CustomWorld, message: string) {
    if (!this.page) throw new Error('Page is not initialized');
    const checkoutPage = new CheckoutPage(this.page);
    const actualMessage = await checkoutPage.getSummaryInfo();
    expect(actualMessage).toContain(message);
});
