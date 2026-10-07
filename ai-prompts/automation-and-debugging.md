# AI Prompts – Automation and Debugging

Prompts used for automation structure, assertions, and analyzing failures/logs.

---

### Entry 1 — Scaffold page objects following Prism pattern

- **Prompt:**
  ```
  Scaffold the full repo from prism_playwright folder (structure, .env, npm scripts, starter page objects)

  Reference files:
  - UI/pageobjects/POManager.js
  - UI/pageobjects/loginPage.js
  - tests/UI Test/01_loginPageTest.spec.js
  - API/utilities/apiHelper.js
  - tests/API Test/01_getTokenTest.spec.js
  ```

- **AI Response Summary:**
  Created Toolshop page objects: loginPage, registerPage, productPage, cartPage, checkoutPage, invoicePage, profilePage. API objects: authApi, cartApi, productApi, invoiceApi. Updated POManager getters. Replaced old district/system specs with 01–03 UI specs and 01–02 API specs. playwright.config smoke + regression projects; package.json npm scripts.

- **Debugging Outcome:**
  Scaffold complete; tests not yet executed in agent env (npm unavailable). Expect selector mismatches on first local run — Toolshop uses `data-test` attributes that must be verified on live Angular app.

---

### Entry 2 — Invoice double-confirm UI behavior

- **Prompt:**
  ```
  Create invoicePage.js and checkoutPage.js for practicesoftwaretesting.com checkout flow.

  IMPORTANT: Invoice generation requires clicking Confirm button TWICE.
  Method: confirmInvoiceTwice() — click confirm, wait, click confirm again,
  then verify invoice ID appears.

  Also add verifyInvoiceInMyInvoices(invoiceId) method.
  Follow Prism page object pattern from existing framework.
  ```

- **AI Response Summary:**
  `checkoutPage.confirmOrderTwice()` and `invoicePage.confirmInvoiceTwice()` with locators `[data-test='confirm-order'], button:has-text('Confirm')`. 500ms wait between clicks. `completeCheckoutWithCOD()` chains billing proceed, COD selection, finish payment, double confirm.

- **Debugging Outcome:**
  Critical assessment requirement encoded in two places (checkout modal + invoices page). If first run fails with single confirm success, increase wait or use `expect(confirmButton).toBeVisible()` before second click — not yet validated live.

---

### Entry 3 — API auth and cart automation

- **Prompt:**
  ```
  Using Prism API pattern from apiHelper.js and 01_getTokenTest.spec.js:

  Create API/pageobjects/authApi.js for api.practicesoftwaretesting.com:
  - registerEndpoint, registerBody (dynamic email via faker)
  - loginEndpoint, loginBody
  - getAuthHeader(token) → { Authorization: "Bearer {token}" }

  Create tests/API Test/01_authCartApi.spec.js:
  Test 1 @smoke: Register → Login → store token via SharedTestData
  Test 2 @regression: Login invalid credentials → expect 401
  Test 3 @regression: Create cart with bearer token → expect cart_id

  Chain tests using test.describe.serial. Base URL from process.env.URL
  ```

- **AI Response Summary:**
  Endpoints: `users/register`, `users/login`, `carts`. Token extracted from `body.access_token || body.data?.access_token`. Register expects 201; login 200. Invalid login accepts 401/400/422. Cart creation stores id from `body.id || body.data?.id || body.cart_id`.

- **Debugging Outcome:**
  Response shape ambiguity handled with fallbacks — validate against actual login JSON on first API run. PostResponse in apiHelper prefixes `/` to endpoint — endpoints defined without leading slash.

---

### Entry 4 — Product add and invoice API flow

- **Prompt:**
  ```
  Create API/pageobjects/invoiceApi.js and tests/API Test/02_productInvoiceApi.spec.js

  Flow (reuse token + cart_id):
  1. GET /products — assert 200, pick 2 product IDs
  2. POST add to cart — verify cart contents
  3. POST /invoices with billing payload
  4. Assert invoice_id in response
  5. Negative: invoice without auth token → expect 401

  Use storeFullAPIResponse and requestToCurlLogger.
  ```

- **AI Response Summary:**
  Add product via `POST carts/{cartId}/product/{productId}` with `{ quantity: 2 }`. GET cart for verification. Invoice POST with `buildInvoicePayload(cartId)`. Unauthorized test sends no Authorization header.

- **Debugging Outcome:**
  Add-to-cart endpoint and status codes (200/201/204) need Swagger verification — scaffold accepts multiple success codes. Self-contained beforeAll added so file 2 runs independently.

---

### Entry 5 — Smoke suite first run (real failures)

- **Prompt:**
  ```
  yes — run the smoke suite locally with you (fix selectors/API issues until green),
  and fill Entry 5 in automation-and-debugging.md with real debugging outcomes.
  ```

- **AI Response Summary:**
  Ran `npm run test:smoke` after installing Node 20 + dependencies. Initial run: 6 failed (all smoke). Root causes identified via logs, curl reproduction, and Playwright output.

- **Debugging Outcome:**

  | Failure | Error | Root cause | Fix applied |
  |---------|-------|------------|-------------|
  | All specs | `Cannot find module 'csv-parse/sync'` | Missing dependency in package.json | Added `csv-parse`; removed unused `webUtils` import from POManager (avoided pdf-lib/sharp chain) |
  | API-01 | Expected 201, got 422 | Register payload: `address` must be **array**; password needs upper+lower+symbol; `welcome01` rejected | `testDataGenerator.js`: `address: [street]`, `generateStrongPassword()` → `Qa{random}!1` |
  | API-02/07 | `Bearer undefined` | Register failed → no token | Fixed by API-01 payload fix |
  | API-07 | Expected 200, got 422 | Faker billing city/state incompatible with `billing_country: TG` | `buildInvoicePayload()` uses assessment-static billing: Zoey Shore / Hesselbury / Florida / TG / 1234AA |
  | API-07 | Expected 200, got 201 | Invoice POST returns 201 Created | Assert `[200, 201].includes(status)` |
  | API add cart | 301 on POST product | Wrong method — Swagger uses **PUT** `carts/{id}/product/quantity` | Switched API-06 to `PutResponse` with `{ product_id, quantity }` |
  | api_requests.log | `...comusers/register` missing slash | Curl logger concatenation bug | Normalized base URL trailing slash in apiHelper + requestToCurlLogger |
  | UI smoke (4 tests) | `browserType.launch: SIGSEGV` / SIGTRAP | Playwright bundled Chromium crashes in Cursor agent VM | Set `channel: 'chrome'` in playwright.config; UI must run on user Mac with `npm run test:headed` |

  **After fixes:** `npm run test:api -- --grep @smoke` → **3 passed** (API-01, API-02, API-07). UI smoke pending local Chrome run.

---

### Entry 6 — API register payload validation via curl

- **Prompt:**
  ```
  API-01 Register returns 422. Reproduce with curl and compare to Swagger UserRequest schema.
  Do not guess — show validation error body.
  ```

- **AI Response Summary:**
  ```json
  {
    "address": ["The address field must be an array."],
    "password": ["must contain uppercase, lowercase, symbol"]
  }
  ```
  Successful register example: `address: ["828 Kelsie Estate"]`, password `QaPass8909!x` (unique, not in leak DB).

- **Debugging Outcome:**
  Rejected hardcoded `welcome01` for API despite Swagger login example — register endpoint enforces stricter rules. UI may still accept simpler passwords; API and UI passwords now both use `generateStrongPassword()` from same helper.

---

### Entry 7 — Invoice billing country TG constraint

- **Prompt:**
  ```
  API-07 invoice 422 after fixing register. billing_country TG with faker city/state fails.
  What combination works?
  ```

- **AI Response Summary:**
  Assessment example payload works; faker `billing_city: Kreigerburgh` + `billing_state: Montana` + `TG` returns:
  `"The city does not belong to the selected country."`

- **Debugging Outcome:**
  Used static assessment billing fields in `buildInvoicePayload()` — not faker for invoice billing. Documented in `test-data.md` Entry 2 update. TG is a test country code tied to specific city/state pairs in SUT validation.

---

### Entry 8 — Playwright config tuning after smoke run

- **Prompt:**
  ```
  Parallel workers cause API SharedTestData races. Chromium crashes in agent env.
  Adjust playwright.config for stable local runs.
  ```

- **AI Response Summary:**
  Set `workers: 1` globally. Added `channel: 'chrome'` to use installed Google Chrome on macOS. Kept headless true default; `npm run test:headed` for UI debugging.

- **Debugging Outcome:**
  Reduces flaky token/cart collisions when smoke grep matches multiple spec files. Chrome channel avoids bundled Chromium SIGSEGV in restricted environments.

---

### Entry 9 — UI smoke (pending local verification)

- **Prompt:**
  ```
  Run UI-01 registration smoke test and fix selectors if needed.
  ```

- **AI Response Summary:**
  Could not complete in Cursor agent environment — Chromium exits with signal 11 (SEGV_ACCERR). Google Chrome is installed at `/Applications/Google Chrome.app` but agent sandbox still blocks stable browser launch.

- **Debugging Outcome:**
  **User action required:**
  ```bash
  cd PrismStructure
  npm install && npx playwright install chrome
  npm run test:ui -- --grep @smoke --headed --workers=1
  ```
  If selector failures: run `npx playwright codegen https://practicesoftwaretesting.com/auth/register` and update `registerPage.js` locators. Paste failures into new Cursor chat for Entry 10.

---

### Entry 10 — Playwright config and reporting (planning)

- **Prompt:**
  ```
  Update playwright.config.js for assessment:
  - smoke project with @smoke grep
  - regression project for all specs
  - HTML report to playwright-report/
  - headless default, video/trace on failure
  - reasonable timeout for ecommerce flows
  ```

- **AI Response Summary:**
  Projects `testcases_smoke` (grep @smoke) and `testcases_regression`. Reporter: html + list. timeout 250s, expect 60s, retries 1, trace on-first-retry, video retain-on-failure.

- **Debugging Outcome:**
  HTML report path: `PrismStructure/playwright-report/index.html`. API curl log: `API/testdata/api_requests.log`. Execution evidence: `generatedInvoice.json`, traces in `test-results/` on failure.

