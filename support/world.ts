import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

// Επεκτείνουμε το default World του Cucumber
export class CustomWorld extends World {
    // Προσθέτουμε τις ιδιότητες που χρειαζόμαστε
    private browser: Browser | undefined;
    private context: BrowserContext | undefined;
    public page: Page | undefined;

    // Constructor που καλεί τον parent constructor
    constructor(options: IWorldOptions) {
        super(options);
    }

    // Μέθοδος για να αρχικοποιήσουμε το browser
    async init() {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    // Μέθοδος για να καθαρίσουμε τα resources
    async cleanup() {
        if (this.page) await this.page.close();
        if (this.context) await this.context.close();
        if (this.browser) await this.browser.close();
    }
}

// Εγγράφουμε το custom World στο Cucumber
setWorldConstructor(CustomWorld); 