import * as dotenv from 'dotenv';
dotenv.config();

// Environment
const ENV = process.env.NODE_ENV || 'dev';

// Base URLs
const BASE_URLS = {
    dev: process.env.BASE_URL_DEV || 'https://www.saucedemo.com',
    staging: process.env.BASE_URL_STAGING || 'https://staging.saucedemo.com',
    prod: process.env.BASE_URL_PROD || 'https://www.saucedemo.com'
};

// Browser Settings
const BROWSER = {
    headless: process.env.HEADLESS === 'true',
    slowMo: parseInt(process.env.SLOW_MO || '50'),
    viewport: {
        width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
        height: parseInt(process.env.VIEWPORT_HEIGHT || '720')
    }
};

// Timeouts (in milliseconds)
const TIMEOUTS = {
    defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    assertionTimeout: parseInt(process.env.ASSERTION_TIMEOUT || '5000')
};

// Retry Settings
const RETRY = {
    retries: parseInt(process.env.RETRY_COUNT || '2'),
    maxTimeout: parseInt(process.env.MAX_TIMEOUT || '30000')
};

// Screenshot Settings
const SCREENSHOT = {
    onFailure: process.env.SCREENSHOT_ON_FAILURE === 'true',
    path: process.env.SCREENSHOT_PATH || './test-results/screenshots'
};

// Video Settings
const VIDEO = {
    onFailure: process.env.VIDEO_ON_FAILURE === 'true',
    path: process.env.VIDEO_PATH || './test-results/videos'
};

export const testConfig = {
    env: ENV,
    baseUrl: BASE_URLS[ENV as keyof typeof BASE_URLS],
    browser: BROWSER,
    timeouts: TIMEOUTS,
    retry: RETRY,
    screenshot: SCREENSHOT,
    video: VIDEO
}; 