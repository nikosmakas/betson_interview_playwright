# Playwright & Cucumber E2E Testing Framework

## Overview
This project is a complete E2E testing framework that uses Playwright for UI and API testing, combined with Cucumber for BDD (Behavior Driven Development). The framework is designed to test the Sauce Demo Web Application and the Petstore API.

### Technologies
- **Playwright**: For UI and API testing
- **Cucumber**: For BDD and feature files
- **TypeScript**: For type safety and better code management
- **Page Object Model**: For better management of UI elements
- **Centralized Configuration**: For easy configuration management

## Prerequisites
- Node.js (v14 or newer)
- npm (v6 or newer)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

## Configuration & Data Management

The framework uses a centralized configuration system via `config/dataLoader.ts`. All URLs, endpoints, and user data are managed through the following files:

- `data/urls.json`: Contains all base URLs and endpoints
- `data/users.json`: Contains user credentials for testing

**Note**: `.env` files are not used since the data is not sensitive (these are playgrounds).

## Running Tests

### UI Tests (Cucumber)

- **All UI tests (Cucumber):**
```bash
npm run test:cucumber
```
or directly:
```bash
npx cucumber-js
```

### API Tests (Playwright)

- **All API tests (Playwright):**
```bash
npm run test:api
```
or directly:
```bash
npx playwright test --project="API Tests"
```

### Debug mode (API tests):
```bash
npm run test:debug
```

## Reports

### Playwright Report
```bash
npx playwright show-report
```

### Cucumber Report
```bash
# The report is automatically generated after running the UI tests
# It is located at cucumber-report.html
```

## Additional Documentation

- `REPORT.md`: Detailed technical report of the framework
- `TEST_PLAN.md`: Test plan and test cases

## Project Structure

```
├── config/             # Configuration files
├── data/               # Test data (URLs, users)
├── features/           # Cucumber feature files
├── pages/              # Page Object Models
├── step-definitions/   # Cucumber step definitions
├── support/            # Cucumber support files
├── tests/              # Playwright test files
└── utils/              # Utility functions
```

## Best Practices

1. **Type Safety**: Use TypeScript for better type management
2. **Page Objects**: Follow the Page Object Model for better UI element management
3. **BDD**: Write tests in BDD format with Cucumber
4. **Configuration**: Use `configLoader` for accessing configuration
5. **Retry Logic**: Use retry logic for API tests that require eventual consistency 