import { test, expect } from '@playwright/test';

test('βασική δοκιμή', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Επιβεβαίωση ότι ο τίτλος περιέχει το "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
  
  // Επιβεβαίωση ότι υπάρχει ένας σύνδεσμος "Get Started"
  const getStarted = page.getByRole('link', { name: 'Get Started' });
  await expect(getStarted).toBeVisible();
}); 