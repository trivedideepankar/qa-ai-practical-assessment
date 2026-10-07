# AI Prompts – Test Design

Prompts used to generate or refine test scenarios and test cases for UI + API.

---

### Entry 1 — Manual functional test CSV

- **Prompt:**
  ```
  Using our agreed 7 UI + 7 API test cases from requirements analysis,
  generate FunctionalTestCase.csv rows.

  Rules:
  - Steps must be numbered and actionable
  - Include negative cases (invalid login, empty cart, missing token)
  - UI-06 must explicitly mention "click Confirm twice for invoice"
  - Type: Positive | Negative | Edge
  - Tag: Smoke | Regression
  - Max 7 UI + 7 API rows (14 total manual cases covering both layers)

  Output only valid CSV content, no code.
  ```

- **AI Response Summary:**
  Generated 14-row CSV with columns: TestCaseID, Module, Title, Preconditions, Steps, ExpectedResult, Type, Tag, Priority, AC_Mapping. UI-06 steps include confirm twice and My Invoices verification. API-08 covers invoice without token.

- **Validation Notes:**
  Reviewed each row for traceability to AC1-UI, AC2-UI, AC1-API, AC2-API. Adjusted Tag column to Smoke/Regression (assessment uses @smoke in automation; manual CSV uses Smoke for parity). UI-07 empty cart kept as negative regression, not smoke.

---

### Entry 2 — UI automation test file breakdown

- **Prompt:**
  ```
  Split 7 UI tests into logical Playwright spec files following Prism framework.
  Map: registration/login → cart → checkout/invoice.
  Which tests share beforeEach setup? Which need @smoke vs @regression only?
  Output file names and test titles only, no code.
  ```

- **AI Response Summary:**
  Three spec files: `01_registrationLogin.spec.js` (UI-01–03), `02_cartManagement.spec.js` (UI-04), `03_checkoutInvoice.spec.js` (UI-05–07). Shared pattern: register + login in beforeEach for cart/checkout specs. Smoke tags on UI-01, UI-02, UI-05, UI-06.

- **Validation Notes:**
  Accepted 3-file split to mirror user journey and reduce duplicate registration logic. UI-03 negative login placed in first file with own register prerequisite — avoids depending on prior test order.

---

### Entry 3 — API automation test chain design

- **Prompt:**
  ```
  Design API test chain for Toolshop using Prism apiHelper pattern:
  register → login → cart → products → add to cart → invoice.
  How should SharedTestData pass token and cart_id across tests?
  Should API-05–08 run standalone or depend on 01_authCartApi.spec.js?
  ```

- **AI Response Summary:**
  Two spec files with `test.describe.serial` inside each. File 1: API-01–04 (auth + cart). File 2: API-05–08 (products, cart verify, invoice, unauthorized). SharedTestData static class for accessToken, cartId, productIds. File 2 includes self-contained beforeAll (register/login/cart) if run alone via `npm run test:api`.

- **Validation Notes:**
  Added self-contained beforeAll in `02_productInvoiceApi.spec.js` so `test:api` works without ordering dependency — important for CI and README “run without manual intervention” requirement.

---

### Entry 4 — Negative and edge case coverage review

- **Prompt:**
  ```
  Review our 7 UI + 8 API cases against assessment core criteria:
  valid/invalid transitions, create/list/view/update, error handling.
  What gaps remain within the 5-8 per type limit? Do not add more tests — suggest if swap needed.
  ```

- **AI Response Summary:**
  Coverage OK for create (register, cart, invoice), list (products, invoices), view (profile, cart contents), update (cart quantity), error handling (invalid login UI/API, empty cart, no token). No dedicated search/comment flows — acceptable within scope cap. Assessment “comment” criterion mapped to invoice/order confirmation flow.

- **Validation Notes:**
  No test count increase. Documented in project-info that scope is checkout-focused E2E, not full ecommerce surface area — aligns with “smaller well-tested Core beats large superficial surface” guidance.

---

### Entry 5 — Traceability metadata for Xray/JIRA annotations

- **Prompt:**
  ```
  Update testCasesMeta.json keywords to map automation tests to manual TestCaseIDs
  (UI-01 through API-08) for utils.addTestAnnotationsByKeyword() in Prism framework.
  ```

- **AI Response Summary:**
  Keywords: `registration`, `login`, `cart`, `checkout`, `invoice`, `api-auth`, `api-cart`, `api-invoice` each mapped to relevant ID arrays in `UI/resources/data/testCasesMeta.json`.

- **Validation Notes:**
  Verified each spec calls `addTestAnnotationsByKeyword` with matching keyword. Enables optional Xray pipeline (`post:xray:xml`) if team extends later.
