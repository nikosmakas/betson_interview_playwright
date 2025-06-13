import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Φόρτωση των environment variables
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'https://petstore.swagger.io/v2',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ui-tests-desktop',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL,
      },
      testMatch: /.*\.ui\.spec\.ts/,
    },
    {
      name: 'ui-tests-mobile',
      use: {
        ...devices['Pixel 5'],  // Google Pixel 5 mobile device
        baseURL: process.env.UI_BASE_URL,
      },
      testMatch: /.*\.ui\.spec\.ts/,
    },
    // Firefox configuration (commented out)
    // {
    //   name: 'ui-tests-firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     baseURL: process.env.UI_BASE_URL,
    //   },
    //   testMatch: /.*\.ui\.spec\.ts/,
    // },
    // WebKit configuration (commented out)
    // {
    //   name: 'ui-tests-webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     baseURL: process.env.UI_BASE_URL,
    //   },
    //   testMatch: /.*\.ui\.spec\.ts/,
    // },
    {
      name: 'api-tests',
      use: {
        baseURL: process.env.API_BASE_URL,
      },
      testMatch: /.*\.api\.spec\.ts/,
    },
  ],
}); 