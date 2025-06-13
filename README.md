# Playwright & Cucumber E2E Testing Framework

## Επισκόπηση
Αυτό το project είναι ένα ολοκληρωμένο E2E testing framework που χρησιμοποιεί Playwright για UI testing και API testing, σε συνδυασμό με Cucumber για BDD (Behavior Driven Development). Το framework έχει σχεδιαστεί για να ελέγχει το Sauce Demo Web Application και το Petstore API.

### Τεχνολογίες
- **Playwright**: Για UI και API testing
- **Cucumber**: Για BDD και feature files
- **TypeScript**: Για type safety και καλύτερη διαχείριση κώδικα
- **Page Object Model**: Για καλύτερη διαχείριση των UI elements
- **Centralized Configuration**: Για εύκολη διαχείριση ρυθμίσεων

## Προαπαιτούμενα
- Node.js (v14 ή νεότερη έκδοση)
- npm (v6 ή νεότερη έκδοση)

## Εγκατάσταση

1. Κλωνοποιήστε το repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Εγκαταστήστε τις εξαρτήσεις:
```bash
npm install
```

## Διαχείριση Ρυθμίσεων & Δεδομένων

Το framework χρησιμοποιεί ένα κεντρικοποιημένο σύστημα διαχείρισης ρυθμίσεων μέσω του `config/dataLoader.ts`. Όλα τα URLs, endpoints και user data διαχειρίζονται μέσω των παρακάτω αρχείων:

- `data/urls.json`: Περιέχει όλα τα base URLs και endpoints
- `data/users.json`: Περιέχει τα user credentials για testing

**Σημείωση**: Δεν χρησιμοποιούνται `.env` αρχεία καθώς τα δεδομένα δεν είναι ευαίσθητα (πρόκειται για "playgrounds").

## Εκτέλεση Tests

### Όλα τα Tests
```bash
npx playwright test
```

### UI Tests
```bash
# Όλα τα UI tests
npm run cucumber

# Desktop UI tests
npx playwright test --project="UI Tests - Desktop"

# Mobile UI tests
npx playwright test --project="UI Tests - Mobile"
```

### API Tests
```bash
# Όλα τα API tests
npx playwright test --project="API Tests"

# Συγκεκριμένο API test file
npx playwright test tests/petstore.test.ts
```

### Συγκεκριμένα Features
```bash
# Συγκεκριμένο feature file
npx cucumber-js features/ui/login.feature
```

## Αναφορές

### Playwright Report
```bash
npx playwright show-report
```

### Cucumber Report
```bash
# Το report δημιουργείται αυτόματα μετά την εκτέλεση των UI tests
# Βρίσκεται στο cucumber-report.html
```

## Επιπλέον Τεκμηρίωση

- `REPORT.md`: Λεπτομερής τεχνική αναφορά του framework
- `TEST_PLAN.md`: Σχέδιο testing και test cases

## Δομή Project

```
├── config/             # Ρυθμίσεις και configuration
├── data/              # Test data (URLs, users)
├── features/          # Cucumber feature files
├── pages/            # Page Object Models
├── step-definitions/ # Cucumber step definitions
├── support/          # Cucumber support files
├── tests/            # Playwright test files
└── utils/            # Βοηθητικές συναρτήσεις
```

## Best Practices

1. **Type Safety**: Χρησιμοποιήστε TypeScript για καλύτερη διαχείριση τύπων
2. **Page Objects**: Ακολουθήστε το Page Object Model για καλύτερη διαχείριση UI elements
3. **BDD**: Γράψτε tests σε μορφή BDD με Cucumber
4. **Configuration**: Χρησιμοποιήστε το `configLoader` για πρόσβαση στις ρυθμίσεις
5. **Retry Logic**: Χρησιμοποιήστε retry logic για API tests που απαιτούν eventual consistency 