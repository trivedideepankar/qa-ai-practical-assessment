# QA AI Practical Assessment — Project Info

Primary AI Tool(s) Used: Cursor (Auto + Sonnet for automation)

Application Under Test: Practice Software Testing Toolshop — [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)

API Documentation: [https://api.practicesoftwaretesting.com/api/documentation](https://api.practicesoftwaretesting.com/api/documentation)

Assessment Start Date: _TBD_ / Submission Date: _TBD_

## Project Summary

End-to-end QA assessment covering user registration/login, cart management, Cash on Delivery checkout, and invoice verification (UI) plus register/login/cart/product/invoice API lifecycle. Framework: Prism Playwright inside `PrismStructure/`.

## Tools Used

| Category | Tools |
|----------|-------|
| UI Automation | Playwright, Prism page objects (POManager) |
| API Automation | Playwright request API via `apiHelper` |
| AI | Cursor (Auto for planning/docs, Sonnet for code) |
| Test Data | @faker-js/faker, `testDataGenerator.js` |
| Reports | Playwright HTML report, `API/testdata/api_requests.log` |
| Browser | Chromium |

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
