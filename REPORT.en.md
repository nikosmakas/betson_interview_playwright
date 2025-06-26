# Technical Report: E2E Testing Framework

## 1. Framework Architecture Choices

### 1.1 Technology Stack Selection

#### Playwright
- **Cross-browser Testing**: Supports Chromium, Firefox, and WebKit
- **Auto-waiting**: Built-in intelligent waiting
- **API Testing**: Built-in support for API testing
- **TypeScript Support**: First-class TypeScript support
- **Parallel Execution**: Supports parallel test execution
- **Trace Viewer**: Advanced debugging tool

#### Cucumber
- **BDD Approach**: Enables writing tests in Gherkin format
- **Business Readability**: Tests are readable by non-technical stakeholders
- **Reusability**: Step definitions can be reused
- **Documentation**: Feature files serve as living documentation

#### TypeScript
- **Type Safety**: Provides static type checking
- **Better IDE Support**: Autocomplete and error detection
- **Maintainability**: Better code maintainability in large projects
- **Interface Definitions**: Enables defining contracts via interfaces

### 1.2 Project Structure

```
├── config/             # Centralized configuration management
├── data/               # Test data in JSON format
├── features/           # Cucumber feature files
├── pages/              # Page Object Models
├── step-definitions/   # Cucumber step definitions
├── support/            # Cucumber support files
├── tests/              # Playwright test files
└── utils/              # Utility functions
```

#### Rationale
- **Separation of Concerns**: Each folder has a specific role
- **Maintainability**: Easy navigation and code maintenance
- **Scalability**: Structure supports large projects
- **Test Organization**: Clear separation between UI and API tests

### 1.3 Design Patterns

#### Page Object Model (POM)
- **Encapsulation**: Each page object hides implementation details
- **Reusability**: Page objects can be reused
- **Maintainability**: UI changes only affect the corresponding page object
- **Type Safety**: TypeScript interfaces for page elements

#### Behavior Driven Development (BDD)
- **Feature Files**: Written in Gherkin syntax
- **Step Definitions**: Steps implemented in TypeScript
- **Business Readability**: Tests are readable by all stakeholders
- **Living Documentation**: Feature files serve as living documentation

#### API Client Pattern
- **Request Fixture**: Playwright's request fixture as API client
- **Centralized Configuration**: `configLoader` for endpoint management
- **Type Safety**: TypeScript interfaces for request/response objects
- **Retry Logic**: Built-in retry logic for eventual consistency

### 1.4 Centralized Configuration

#### ConfigLoader Singleton
- **Single Source of Truth**: All configuration is managed from a single place
- **Type Safety**: TypeScript interfaces for configuration objects
- **Environment Agnostic**: No .env files required
- **Easy Maintenance**: All configuration changes in one place

#### JSON Configuration
- **Readability**: Human-readable format
- **Version Control**: Easy to track changes
- **No Sensitive Data**: Only demo/playground APIs
- **Easy to Modify**: Simple format for changes

## 2. Test Implementation

### 2.1 UI Testing

#### Selected Features
1. **Login Functionality**
   - Valid login
   - Invalid credentials
   - Locked out user
   - Empty fields validation

2. **Shopping Cart**
   - Add items to cart
   - Remove items from cart
   - Update quantities

#### Test Cases
```gherkin
Feature: Login Functionality
  Scenario: Valid login
    Given the standard_user enters valid credentials
    When they click the Login button
    Then they should be redirected to the Inventory page

  Scenario: Invalid credentials
    Given the invalid_credentials_user has entered incorrect credentials
    When they click the Login button
    Then the error message "Epic sadface: Username and password do not match" should be displayed
```

### 2.2 API Testing

#### Selected APIs
1. **Pet API**
   - POST /pet (Create pet)
   - GET /pet/{petId} (Get pet)
   - PUT /pet (Update pet)
   - DELETE /pet/{petId} (Delete pet)

#### Test Cases
```typescript
test('should create a new pet (POST)', async ({ request }) => {
  const response = await request.post(configLoader.getApiEndpoint('pet'), {
    data: petData
  });
  expect(response.status()).toBe(200);
});
```

## 3. Technical Decisions & Challenges

### 3.1 Retry Logic for Eventual Consistency
- **Implementation**: Custom retry mechanism with configurable attempts and delay
- **Use Cases**: GET requests after POST/PUT operations
- **Benefits**: Increased test reliability
- **Configuration**: Configurable attempts and delay

### 3.2 TypeScript Integration
- **Interfaces**: Define types for all objects
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced development experience
- **Documentation**: Types serve as documentation

### 3.3 Request/Response Handling
- **Response Validation**: Type-safe response handling
- **Error Handling**: Structured error handling
- **Logging**: Detailed request/response logging
- **Assertions**: Type-safe assertions

### 3.4 Environment Configuration
- **No .env Files**: Configuration via JSON files
- **Rationale**: Demo/playground APIs do not require sensitive data
- **Benefits**: Simpler setup, better version control
- **Maintenance**: Easy configuration management

## 4. Additional Information

For more information, refer to:
- `README.md`: Setup and usage instructions
- `TEST_PLAN.md`: Detailed test plan 