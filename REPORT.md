# Technical Task Report: UI & API Testing Framework

## Part 1: UI Testing Report

### Framework Architecture Choices

#### Technology Stack
- **Playwright**: Επιλέχθηκε ως το βασικό εργαλείο για UI testing λόγω:
  - Εγγενής υποστήριξη για TypeScript
  - Αυτόματη αναμονή για στοιχεία (auto-waiting)
  - Cross-browser testing (Chromium, Firefox, WebKit)
  - Ενσωματωμένη υποστήριξη για API testing
  - Καλύτερη απόδοση σε σχέση με το Selenium

#### Project Structure
```
├── features/
│   ├── ui/
│   │   ├── login.feature
│   │   └── inventory.feature
│   └── api/
│       └── pet.feature
├── step-definitions/
│   ├── ui/
│   │   ├── login.steps.ts
│   │   └── inventory.steps.ts
│   └── api/
│       └── pet.steps.ts
├── pages/
│   ├── login.page.ts
│   └── inventory.page.ts
├── utils/
│   └── apiClient.ts
└── data/
    └── urls.json
```

#### Design Patterns
1. **Page Object Model (POM)**
   - Χωρισμός της UI λογικής από τα test steps
   - Επανάχρηση κώδικα και ευκολότερη συντήρηση
   - Καλύτερη οργάνωση των selectors

2. **Cucumber BDD**
   - Αναγνώσιμα test scenarios σε Gherkin syntax
   - Καλύτερη επικοινωνία με μη-τεχνικούς stakeholders
   - Ευκολότερη διαχείριση test data

### Test Implementation

#### Selected Features
1. **Login Functionality**
   - Valid login
   - Invalid credentials
   - Locked out user

2. **Inventory Management**
   - Add items to cart
   - Remove items from cart
   - Sort products

### Technical Decisions & Challenges

1. **TypeScript Integration**
   - Προστέθηκε για καλύτερο type checking
   - Βελτίωση της IDE υποστήριξης
   - Αυτόματη τεκμηρίωση

2. **Environment Configuration**
   - Χρήση `.env` για διαχείριση credentials
   - Διαχωρισμός test environments
   - Ασφαλής διαχείριση sensitive data

3. **Reporting**
   - Cucumber HTML reports
   - Screenshots on failure
   - Video recording για failed tests

## Part 2: API Testing Report

### Framework Architecture Choices

#### Technology Stack
- **Playwright API Testing**
  - Ενσωματωμένη υποστήριξη για HTTP requests
  - TypeScript integration
  - Καλύτερη διαχείριση responses

#### Project Structure
```
├── features/
│   └── api/
│       └── pet.feature
├── step-definitions/
│   └── api/
│       └── pet.steps.ts
└── utils/
    └── apiClient.ts
```

#### Design Patterns
1. **API Client Pattern**
   - Κεντρική διαχείριση HTTP requests
   - Επανάχρηση κώδικα
   - Καλύτερη διαχείριση headers και authentication

2. **Cucumber BDD**
   - Ίδια προσέγγιση με UI testing
   - Αναγνώσιμα API test scenarios
   - Ευκολότερη διαχείριση test data

### Test Implementation

#### Selected APIs
1. **Pet API**
   - POST /pet (Create)
   - GET /pet/{petId} (Get)
   - PUT /pet (Update)
   - DELETE /pet/{petId} (Delete)

### Technical Decisions & Challenges

1. **Request/Response Handling**
   - JSON schema validation
   - Dynamic test data generation
   - Error handling

2. **Environment Configuration**
   - Base URL management
   - API keys handling
   - Test data separation

3. **Reporting**
   - Request/Response logging
   - Error details
   - Test execution time

## Additional Information

### Installation & Setup
Για λεπτομερείς οδηγίες εγκατάστασης και εκτέλεσης των tests, ανατρέξτε στο `README.md`.

### Contributing
Για οδηγίες συνεισφοράς στο project, ανατρέξτε στο `CONTRIBUTING.md`.

### Test Plan
Για το πλήρες test plan και τα επιλεγμένα test cases, ανατρέξτε στο `TEST_PLAN.md`.
