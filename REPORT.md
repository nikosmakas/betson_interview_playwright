# Technical Report: E2E Testing Framework

## 1. Framework Architecture Choices

### 1.1 Technology Stack Selection

#### Playwright
- **Cross-browser Testing**: Υποστηρίζει Chromium, Firefox, και WebKit
- **Auto-waiting**: Ενσωματωμένη υποστήριξη για intelligent waiting
- **API Testing**: Ενσωματωμένη υποστήριξη για API testing
- **TypeScript Support**: Πρώτης τάξεως υποστήριξη για TypeScript
- **Parallel Execution**: Υποστήριξη για parallel test execution
- **Trace Viewer**: Εξαιρετικό debugging tool

#### Cucumber
- **BDD Approach**: Επιτρέπει τη συγγραφή tests σε μορφή Gherkin
- **Business Readability**: Tests είναι κατανοητά από non-technical stakeholders
- **Reusability**: Step definitions μπορούν να επαναχρησιμοποιηθούν
- **Documentation**: Feature files λειτουργούν ως ζωντανή τεκμηρίωση

#### TypeScript
- **Type Safety**: Παρέχει static type checking
- **Better IDE Support**: Autocomplete και error detection
- **Maintainability**: Καλύτερη διαχείριση κώδικα σε μεγάλα projects
- **Interface Definitions**: Επιτρέπει τον ορισμό σαφών contracts

### 1.2 Project Structure

```
├── config/             # Κεντρικοποιημένη διαχείριση ρυθμίσεων
├── data/              # Test data σε JSON format
├── features/          # Cucumber feature files
├── pages/            # Page Object Models
├── step-definitions/ # Cucumber step definitions
├── support/          # Cucumber support files
├── tests/            # Playwright test files
└── utils/            # Βοηθητικές συναρτήσεις
```

#### Rationale
- **Separation of Concerns**: Κάθε φάκελος έχει συγκεκριμένο ρόλο
- **Maintainability**: Εύκολη εύρεση και διαχείριση αρχείων
- **Scalability**: Δομή υποστηρίζει μεγάλα projects
- **Test Organization**: Σαφής διάκριση μεταξύ UI και API tests

### 1.3 Design Patterns

#### Page Object Model (POM)
- **Encapsulation**: Κάθε page object κρύβει τα implementation details
- **Reusability**: Page objects μπορούν να επαναχρησιμοποιηθούν
- **Maintainability**: Αλλαγές στο UI απαιτούν αλλαγές μόνο στο αντίστοιχο page object
- **Type Safety**: TypeScript interfaces για page elements

#### Behavior Driven Development (BDD)
- **Feature Files**: Περιγραφή συμπεριφοράς σε Gherkin syntax
- **Step Definitions**: Υλοποίηση των steps σε TypeScript
- **Business Readability**: Tests είναι κατανοητά από όλους τους stakeholders
- **Living Documentation**: Feature files λειτουργούν ως τεκμηρίωση

#### API Client Pattern
- **Request Fixture**: Playwright's request fixture ως API client
- **Centralized Configuration**: `configLoader` για πρόσβαση σε endpoints
- **Type Safety**: TypeScript interfaces για request/response objects
- **Retry Logic**: Ενσωματωμένη υποστήριξη για eventual consistency

### 1.4 Centralized Configuration

#### ConfigLoader Singleton
- **Single Source of Truth**: Όλες οι ρυθμίσεις διαχειρίζονται από ένα σημείο
- **Type Safety**: TypeScript interfaces για configuration objects
- **Environment Agnostic**: Δεν εξαρτάται από .env files
- **Easy Maintenance**: Αλλαγές στις ρυθμίσεις γίνονται σε ένα μέρος

#### JSON Configuration
- **Readability**: Human-readable format
- **Version Control**: Εύκολη παρακολούθηση αλλαγών
- **No Sensitive Data**: Κατάλληλο για demo/playground APIs
- **Easy to Modify**: Απλό format για αλλαγές

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
- **Implementation**: Custom retry mechanism με configurable attempts και delay
- **Use Cases**: GET requests μετά από POST/PUT operations
- **Benefits**: Αυξημένη αξιοπιστία tests
- **Configuration**: Εύκολη προσαρμογή attempts και delay

### 3.2 TypeScript Integration
- **Interfaces**: Σαφής ορισμός τύπων για όλα τα objects
- **Type Safety**: Catch errors κατά το compile time
- **Better IDE Support**: Enhanced development experience
- **Documentation**: Types λειτουργούν ως τεκμηρίωση

### 3.3 Request/Response Handling
- **Response Validation**: Type-safe response handling
- **Error Handling**: Structured error handling
- **Logging**: Detailed request/response logging
- **Assertions**: Type-safe assertions

### 3.4 Environment Configuration
- **No .env Files**: Configuration μέσω JSON files
- **Rationale**: Demo/playground APIs δεν χρειάζονται sensitive data
- **Benefits**: Simpler setup, better version control
- **Maintenance**: Εύκολη διαχείριση αλλαγών

## 4. Additional Information

Για περισσότερες πληροφορίες, ανατρέξτε στα:
- `README.md`: Οδηγίες εγκατάστασης και χρήσης
- `TEST_PLAN.md`: Λεπτομερές σχέδιο testing
