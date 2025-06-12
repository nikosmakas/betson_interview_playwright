# Οδηγίες Συμμετοχής στο Project

## Page Objects

### 1. Δομή Page Objects
```typescript
import { Page } from '@playwright/test';
import urls from '../data/urls.json';

export class ExamplePage {
    private page: Page;

    // Οι selectors πρέπει να είναι οργανωμένοι σε ένα object
    private readonly selectors = {
        mainContainer: '[data-test="main-container"]',
        button: '[data-test="action-button"]',
        // ...
    };

    constructor(page: Page) {
        this.page = page;
    }
}
```

### 2. Selectors
- Χρησιμοποιούμε πάντα `data-test` attributes για τους selectors
- Οι selectors πρέπει να είναι `readonly`
- Οι selectors πρέπει να είναι οργανωμένοι σε ένα object
- Αποφεύγουμε CSS selectors όπου είναι δυνατόν

### 3. URL Management
```typescript
// Σωστό
await this.page.goto(urls.ui.baseUrl + urls.ui.endpoints.example);

// Λάθος
await this.page.goto('/example.html');
```

### 4. Element Interaction
```typescript
// Σωστό
const element = this.page.locator(this.selectors.button);
await element.waitFor({ state: 'visible' });
await element.click();

// Λάθος
await this.page.$eval(this.selectors.button, (el: any) => el.click());
```

### 5. Error Handling
```typescript
async someMethod(): Promise<void> {
    try {
        const element = this.page.locator(this.selectors.button);
        if (!await element.isVisible()) {
            throw new Error('Button not found');
        }
        await element.click();
    } catch (error) {
        throw new Error(`Failed to perform action: ${error}`);
    }
}
```

### 6. Documentation
```typescript
/**
 * Περιγραφή της μεθόδου
 * @param paramName - Περιγραφή παραμέτρου
 * @returns Περιγραφή τιμής επιστροφής
 * @throws {Error} Περιγραφή πιθανού error
 */
```

## Step Definitions

### 1. Δομή Step Definitions
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ExamplePage } from '../../pages/ExamplePage';

Given('I am on the example page', async function(this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    const examplePage = new ExamplePage(this.page);
    await examplePage.navigateToPage();
});
```

### 2. World Type Checking
- Πάντα ελέγχουμε αν το `this.page` είναι initialized
- Χρησιμοποιούμε το `CustomWorld` type

### 3. Assertions
```typescript
// Σωστό
expect(await page.getText()).toBe('expected text');

// Λάθος
expect(await page.getText() === 'expected text').toBe(true);
```

## Feature Files

### 1. Δομή Feature Files
```gherkin
Feature: Example Feature
  As a user
  I want to perform some action
  So that I can achieve some goal

  Scenario: Basic scenario
    Given I am on the example page
    When I perform some action
    Then I should see some result
```

### 2. Best Practices
- Χρησιμοποιούμε σαφή και περιγραφική γλώσσα
- Ακολουθούμε το pattern "Given-When-Then"
- Οι scenarios πρέπει να είναι ανεξάρτητα μεταξύ τους

## Test Data

### 1. Διαχείριση Test Data
- Χρησιμοποιούμε το `users.json` για credentials
- Χρησιμοποιούμε το `urls.json` για endpoints
- Αποφεύγουμε hardcoded values

### 2. Environment Variables
- Χρησιμοποιούμε το `.env` μόνο για configuration
- Δεν αποθηκεύουμε sensitive data στο `.env`

## General Guidelines

### 1. Code Organization
- Κάθε page object σε ξεχωριστό αρχείο
- Κάθε step definition σε ξεχωριστό αρχείο
- Κάθε feature σε ξεχωριστό αρχείο

### 2. Naming Conventions
- Page Objects: `ExamplePage.ts`
- Step Definitions: `example.steps.ts`
- Feature Files: `example.feature`

### 3. Error Handling
- Πάντα χρησιμοποιούμε try/catch blocks
- Προσθέτουμε περιγραφικά error messages
- Δεν αφήνουμε errors unhandled

### 4. Stability
- Περιμένουμε elements να είναι visible πριν αλληλεπιδράσουμε
- Χρησιμοποιούμε appropriate waits
- Αποφεύγουμε flaky selectors

### 5. Type Safety
- Χρησιμοποιούμε TypeScript types
- Αποφεύγουμε `any` type
- Προσθέτουμε return types στις μεθόδους 