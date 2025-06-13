import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables
dotenv.config();

// Load JSON configs
const urlsConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/urls.json'), 'utf-8'));
const usersConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

// Environment
const ENV = process.env.NODE_ENV || 'dev';

// Base URLs
const BASE_URLS = {
    ui: process.env.UI_BASE_URL || urlsConfig.ui.baseUrl,
    api: process.env.API_BASE_URL || urlsConfig.api.baseUrl
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

// API Settings
const API = {
    baseUrl: BASE_URLS.api,
    apiKey: urlsConfig.api.apiKey,
    endpoints: urlsConfig.api.endpoints
};

// UI Settings
const UI = {
    baseUrl: BASE_URLS.ui,
    endpoints: urlsConfig.ui.endpoints,
    users: usersConfig
};

// Export the complete configuration
export const config = {
    env: ENV,
    browser: BROWSER,
    timeouts: TIMEOUTS,
    retry: RETRY,
    screenshot: SCREENSHOT,
    video: VIDEO,
    api: API,
    ui: UI
} as const;

// Type definitions for better TypeScript support
export type Config = typeof config;
export type ApiConfig = typeof config.api;
export type UiConfig = typeof config.ui;
export type BrowserConfig = typeof config.browser;
export type TimeoutsConfig = typeof config.timeouts;
export type RetryConfig = typeof config.retry;
export type ScreenshotConfig = typeof config.screenshot;
export type VideoConfig = typeof config.video; 