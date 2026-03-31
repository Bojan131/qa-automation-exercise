# QA Automation - automationexercise.com

Automated test suite for [automationexercise.com](https://automationexercise.com) using Playwright with TypeScript.

## Setup

### Prerequisites

- Node.js 18+ installed
- npm

### Install

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
# Run everything
npm test

# Run only API tests
npm run test:api

# Run only E2E tests
npm run test:e2e

# Open the HTML report after a run
npm run report
```

## Project Structure

```
tests/
  api/
    products.spec.ts        # Products API: list, search, negative cases
    brands.spec.ts          # Brands API: list, unsupported methods
    user-account.spec.ts    # User lifecycle: create, login, get detail, update, delete
  e2e/
    auth.spec.ts            # Register, login, invalid login
    cart-checkout.spec.ts   # Add to cart, verify prices, full checkout
pages/
  login.page.ts
  signup.page.ts
  products.page.ts
  cart.page.ts
  checkout.page.ts
  payment.page.ts
  order-placed.page.ts
  account-created.page.ts
  components/
    navbar.component.ts
fixtures/
  auth.fixture.ts           # Provides a logged-in page with cleanup
utils/
  test-data.ts              # User data, card details, email generator
docs/
  test-strategy.md
  exploratory-testing-report.md
```

## What I Covered

### API Tests (13 tests)

Full coverage of the public API surface:
- **Products**: GET all, search, search without param, unsupported POST method
- **Brands**: GET all, unsupported PUT method
- **User account**: Create, login (valid/invalid/missing params), get detail, update, delete

Covers positive flows, negative flows, missing parameters, and unsupported HTTP methods.

### E2E Tests (5 tests)

The two most critical user journeys:
- **Authentication**: Register, login with valid credentials, login with invalid credentials
- **Cart and Checkout**: Add products and verify prices, complete full checkout flow

### Exploratory Testing

Documented in `docs/exploratory-testing-report.md`. Found 4 issues including aggressive ad overlays that cause flakiness and missing password validation on registration.

## What I Didn't Cover and Why

I had limited time, so I focused on what matters most. Here's what I skipped and what I'd do next:

| Skipped | Reason |
|---------|--------|
| Subscription form | Low business risk -- it's a newsletter signup |
| Scroll behavior tests | Pure UI cosmetics, low risk |
| Category/brand navigation | Products are accessible via search and direct links |
| Contact form | Standard form, low complexity |
| Test tagging (@smoke, @regression) | Would add in a second pass for CI optimization |
| HTML reporting customization | Default Playwright report is good enough for now |
| Cross-browser testing | Focused on Chromium; would add Firefox/WebKit with more time |

## CI/CD

GitHub Actions workflow is included at `.github/workflows/tests.yml`. It:
1. Installs dependencies and Chromium
2. Runs API tests first (fast, catch data issues early)
3. Runs E2E tests
4. Uploads the HTML report as an artifact

## Assumptions

- Tests run against the live public site (no staging environment)
- Each test creates its own user data with unique emails to avoid collisions
- Tests clean up after themselves (delete created accounts)
- The API docs on the site accurately represent the available endpoints
- Chromium-only is sufficient for this exercise
- Test credentials (password, card number) are hardcoded because this is a public demo site. In a real project, these would live in environment variables or a secrets manager and never be committed to the repo

## Known Flakiness

The site serves aggressive Google ads (including full-screen vignette overlays) that can interfere with navigation and clicks. The E2E tests may occasionally flake due to ad timing. The Playwright config includes 1 retry to handle this. A more robust solution would be to block ad domains at the network level, but I kept the tests running against the unmodified site to reflect real user conditions.
