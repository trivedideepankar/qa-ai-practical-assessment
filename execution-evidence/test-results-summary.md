# Test Results Summary

**Application:** Practice Software Testing Toolshop  
**Framework:** Prism Playwright (`PrismStructure/`)  
**Last run:** 2026-08-07

## Smoke tests (@smoke) — 7 passed

| ID | Test | Layer | Status |
|----|------|-------|--------|
| UI-01 | Register new user with valid details | UI | Passed |
| UI-02 | Login and verify profile | UI | Passed |
| UI-05 | Checkout with Cash on Delivery | UI | Passed |
| UI-06 | Generate invoice (confirm twice) and verify in My Invoices | UI | Passed |
| API-01 | Register user via API | API | Passed |
| API-02 | Login and obtain bearer token | API | Passed |
| API-07 | Generate invoice with billing payload | API | Passed |

## Regression tests (@regression) — additional 8 passed

| ID | Test | Layer | Status |
|----|------|-------|--------|
| UI-03 | Login with invalid password shows error | UI | Passed |
| UI-04 | Add multiple products and update cart quantity | UI | Passed |
| UI-07 | Checkout with empty cart shows appropriate state | UI | Passed |
| API-03 | Login with invalid credentials returns error | API | Passed |
| API-04 | Create cart with bearer token | API | Passed |
| API-05 | Retrieve products list | API | Passed |
| API-06 | Add products to cart and verify cart contents | API | Passed |
| API-08 | Generate invoice without token returns unauthorized | API | Passed |

## Manual test cases (FunctionalTestCase.csv)

14 manual cases documented (UI-01–07, API-01–08). Automated coverage maps 1:1 to these IDs.

## Key validation points

- **Double confirm:** UI checkout clicks Finish/Confirm twice before invoice appears
- **API chain:** register → login → cart → products → invoice uses `SharedTestData`
- **Dynamic data:** Faker generates unique users per run — no shared production credentials
