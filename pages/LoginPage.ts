import { Page } from '@playwright/test';
import { config } from '../config';

/**
 * LoginPage class represents the login page of the application.
 * It encapsulates all the interactions and validations related to the login functionality.
 */
export class LoginPage {
    private page: Page;

    // Selectors using data-test attributes for better maintainability
    private readonly selectors = {
        usernameInput: '[data-test="username"]',
        passwordInput: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        errorMessage: '[data-test="error"]',
        errorIcon: '.error_icon'
    };

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the login page
     * @throws {Error} If navigation fails
     */
    async navigateToLogin(): Promise<void> {
        try {
            await this.page.goto(`${config.ui.baseUrl}${config.ui.endpoints.login}`);
        } catch (error) {
            throw new Error(`Failed to navigate to login page: ${error}`);
        }
    }

    /**
     * Fills in the login form with the provided credentials
     * @param username - The username to enter
     * @param password - The password to enter
     * @throws {Error} If filling the form fails
     */
    async fillLoginFields(username: string, password: string): Promise<void> {
        try {
            await this.page.fill(this.selectors.usernameInput, username);
            await this.page.fill(this.selectors.passwordInput, password);
        } catch (error) {
            throw new Error(`Failed to fill login fields: ${error}`);
        }
    }

    /**
     * Clicks the login button
     * @throws {Error} If clicking the button fails
     */
    async clickLoginButton(): Promise<void> {
        try {
            await this.page.click(this.selectors.loginButton);
        } catch (error) {
            throw new Error(`Failed to click login button: ${error}`);
        }
    }

    /**
     * Gets the error message text if present
     * @returns The error message text or null if no error is present
     */
    async getErrorMessage(): Promise<string | null> {
        const errorElement = this.page.locator(this.selectors.errorMessage);
        return await errorElement.textContent() || null;
    }

    /**
     * Checks if the user is on the login page
     * @returns true if the login button is visible, false otherwise
     */
    async isOnLoginPage(): Promise<boolean> {
        return await this.page.isVisible(this.selectors.loginButton);
    }

    /**
     * Checks if there are error icons present
     * @returns true if error icons are present, false otherwise
     */
    async hasErrorIcons(): Promise<boolean> {
        const errorIcons = this.page.locator(this.selectors.errorIcon);
        return await errorIcons.count() > 0;
    }

    /**
     * Performs a complete login action
     * @param username - The username to enter
     * @param password - The password to enter
     * @throws {Error} If login fails
     */
    async login(username: string, password: string): Promise<void> {
        await this.navigateToLogin();
        await this.fillLoginFields(username, password);
        await this.clickLoginButton();
    }
} 