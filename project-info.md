# QA AI Practical Assessment — Project Info

**Primary AI Tool(s) Used:** Cursor (Auto for planning/docs, Sonnet for automation code)

**Application Under Test:** Practice Software Testing Toolshop — [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)

**API Documentation:** [https://api.practicesoftwaretesting.com/api/documentation](https://api.practicesoftwaretesting.com/api/documentation)

**Assessment Start Date:** 04-08-2026 / **Submission Date:** 07-08-2026

**Reference Repo:** [assessmentAI_Project](https://github.com/ritukumari1-a11y/assessmentAI_Project)

---

## Project Summary

End-to-end QA assessment covering user registration/login, cart management, Cash on Delivery checkout, and invoice verification (UI) plus register/login/cart/product/invoice API lifecycle. Framework: Prism Playwright inside `PrismStructure/`.

---

## Scope

### UI flows (AC1 + AC2)

| Flow | Coverage |
|------|----------|
| Registration & Login (AC1) | UI-01, UI-02, UI-03 |
| Cart management (AC2) | UI-04, UI-07 |
| Checkout & Invoice (AC2) | UI-05, UI-06 |

### API flows (AC1 + AC2)

| Flow | Coverage |
|------|----------|
| Auth & Cart (AC1) | API-01, API-02, API-03, API-04 |
| Products & Invoice (AC2) | API-05, API-06, API-07, API-08 |

### Test tiers

| Tier | Manual (CSV) | UI Auto | API Auto |
|------|--------------|---------|----------|
| Smoke | 6 cases | 4 tests | 3 tests |
| Regression | 8 cases | 3 tests | 5 tests |
| **Total** | **14** | **7** | **8** |

---

## Tools Used

| Category | Tools |
|----------|-------|
| UI Automation | Playwright, Prism page objects (POManager) |
| API Automation | Playwright request API via `apiHelper` |
| AI | Cursor (Auto for planning/docs, Sonnet for code) |
| Test Data | @faker-js/faker, `testDataGenerator.js` |
| Reports | Playwright HTML report, `API/testdata/api_requests.log` |
| Browser | Chromium (Chrome channel) |

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Invoice requires double Confirm on UI | Test fails if clicked once | `confirmOrderTwice()` in `checkoutPage.js` |
| Stale bearer token in API chain | Later API calls fail | `SharedTestData` + serial test mode |
| Dynamic address autofill clears fields | Checkout blocked | `ensureBillingReady()` re-fills house number |
| Out-of-stock products | Add to cart fails | `addInStockProductToCart()` skips unavailable items |
| Duplicate email on re-run | Registration fails | Faker generates unique email per test |
| Unauthorized API access | False pass on wrong status | Assert 401/403 for negative cases |
| AI-generated wrong selectors | UI tests flaky | Manual verification of `data-test` attributes |

---

## AI Workflow (Part A)

### 1. Project and SUT context

- Attach assessment PDF and `prism_playwright` framework folder to Cursor
- Point agent to live URLs for selector verification
- Reference `FunctionalTestCase.csv` and AC mapping when prompting

### 2. Requirement analysis

- Extract AC1/AC2 for UI and API from assessment
- Map risks: auth, cart state, payment method, **double-confirm invoice**
- Categorize smoke vs regression scope (5–8 cases per layer)

### 3. Test planning and strategy

- **Smoke:** register, login, COD checkout, invoice (UI + API auth + invoice)
- **Regression:** negatives, cart quantity, product list, unauthorized API
- UI-heavy E2E in browser; API lifecycle chained with `SharedTestData`

### 4. Manual test case design

- `FunctionalTestCase.csv` — positive, negative, edge cases with traceable IDs

### 5. Automation design

- Prism patterns: `POManager`, API page objects, `commonMethods`, `SharedTestData`
- Tags: `@smoke`, `@regression`
- Faker for dynamic users; store API responses in `API/testdata/`

### 6. Validating AI output

- Manual walk-through on live site before trusting selectors
- Run `npm run test:smoke` then full regression; fix selectors and API status codes
- Review AI-generated locators against `data-test` attributes

### 7. Test data generation

- `buildRegistrationData()` and `buildInvoicePayload()` in `testDataGenerator.js`
- No hardcoded production credentials; password from `.env` default `welcome01`

### 8. Debugging with AI

- Paste Playwright trace, screenshot, and `api_requests.log` curl into Cursor
- One failure per chat; document outcome in `ai-prompts/automation-and-debugging.md`

### 9. Information not shared with AI

- Internal credentials, API keys, personal data beyond test faker emails

### 10. Reuse in real projects

- Same repo structure, iterative commits, prompt history folder, smoke/regression npm scripts
- See `documentation-and-summary.md` for step-by-step reuse guide
