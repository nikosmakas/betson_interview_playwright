# Sauce Demo Test Automation

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Environment
NODE_ENV=dev

# Base URLs
BASE_URL_DEV=https://www.saucedemo.com
BASE_URL_STAGING=https://staging.saucedemo.com
BASE_URL_PROD=https://www.saucedemo.com

# Browser Settings
HEADLESS=false
SLOW_MO=50
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720

# Timeouts (in milliseconds)
DEFAULT_TIMEOUT=30000
NAVIGATION_TIMEOUT=30000
ASSERTION_TIMEOUT=5000

# Retry Settings
RETRY_COUNT=2
MAX_TIMEOUT=30000

# Screenshot Settings
SCREENSHOT_ON_FAILURE=true
SCREENSHOT_PATH=./test-results/screenshots

# Video Settings
VIDEO_ON_FAILURE=true
VIDEO_PATH=./test-results/videos
```

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm run test:cucumber

# Run specific feature
npm run test:cucumber features/ui/login.feature

# Run tests with specific tag
npm run test:cucumber -- --tags @smoke
``` 