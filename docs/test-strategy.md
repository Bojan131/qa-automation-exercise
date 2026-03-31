# Test Strategy

## System Under Test

[automationexercise.com](https://automationexercise.com) -- a demo e-commerce app with a web UI and public APIs for user management, products, and brands.

## Approach

Risk-based testing. I prioritize flows that would break the business if they failed, and I push as much validation as possible to the API layer where tests are faster and more stable.

## What I Test and Why

### High priority -- automated

| Area | Layer | Why |
|------|-------|-----|
| User registration and login | API + E2E | Core auth. If users can't sign up or log in, nothing else matters. |
| Product search and listing | API | Revenue depends on users finding products. API tests cover data correctness fast. |
| Add to cart and checkout | E2E | The money flow. This is the most critical user journey on any e-commerce site. |
| Invalid inputs and error handling | API | Negative cases catch regressions that slip through happy-path testing. |

### Low priority -- not automated (would do next)

| Area | Why it's lower priority |
|------|------------------------|
| Subscription form | Low business risk. It's a newsletter signup, not a core function. |
| Scroll behavior | Pure UI cosmetics. If scrolling breaks, it's annoying but not blocking. |
| Category/brand navigation | Useful but not critical. Products are still accessible via search and direct links. |
| Contact form | Standard form submission. Low complexity, low risk. |

## API vs E2E Decision

**API tests** when I'm checking data, business logic, or error handling. They're fast, stable, and don't need a browser.

**E2E tests** only when the test requires real browser interaction -- clicking through a multi-step flow, verifying visual state, or testing something that only works in the DOM.

I don't duplicate coverage. If the API already proves the data is correct, I don't write an E2E test that checks the same thing through the UI.

## Risks and Constraints

- **Ads and popups**: The site serves aggressive Google ads (including full-screen vignettes) that can block clicks and cause flakiness. Tests need to handle or avoid these.
- **Shared environment**: This is a public demo site. Other testers may modify data at the same time. Tests use unique emails to avoid collisions.
- **No staging environment**: We're testing against production. Can't reset the database or control server state.
- **No auth tokens**: The API uses email/password params directly instead of tokens. This limits what we can test around session management.

## Assumptions

- Each test run creates its own user data and cleans up after itself.
- The API docs on the site are accurate and represent the full public API surface.
- Tests run on Chromium. Cross-browser testing is out of scope for this exercise.

## What I Would Do Next

Given more time, in this order:

1. Add test tagging (`@smoke`, `@regression`) for selective execution
2. Add HTML reporting with screenshots embedded in CI artifacts
3. Cover category navigation and brand filtering (E2E)
4. Add basic performance checks (page load times, API response times)
5. Investigate flakiness from ad overlays and build a reliable ad-dismissal strategy
