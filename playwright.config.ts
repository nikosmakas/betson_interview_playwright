import { defineConfig, devices } from '@playwright/test';
import { configLoader } from './config/dataLoader';

/**
 * Playwright Configuration
 * 
 * Αυτό το αρχείο ρυθμίζει:
 * 1. Τα projects για UI και API tests
 * 2. Τις παραμέτρους εκτέλεσης των tests
 * 3. Τις ρυθμίσεις περιβάλλοντος
 * 
 * Χρησιμοποιεί το ConfigLoader για πρόσβαση στις ρυθμίσεις
 */

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: configLoader.uiBaseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'UI Tests - Desktop',
      testMatch: /.*\.feature$/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'API Tests',
      testMatch: /.*\.test\.ts$/,
      use: {
        baseURL: configLoader.apiBaseUrl,
      },
    },
  ],
}); 