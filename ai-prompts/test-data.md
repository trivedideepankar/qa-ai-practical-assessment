# AI Prompts – Test Data

Prompts used to generate test data for UI + API.

---

### Entry 1 — Dynamic user registration data strategy

- **Prompt:**
  ```
  For Toolshop assessment, design test data approach:
  - UI register needs firstName, lastName, email, password, address fields
  - API register needs first_name, last_name, email, password, dob, address, postal_code, city, state, country, phone
  - Avoid duplicate email failures on re-runs
  - Use faker in Prism framework pattern

  Propose testDataGenerator.js functions and .env variables. No full code — structure only.
  ```

- **AI Response Summary:**
  Single `buildRegistrationData()` returns both UI user object and `apiPayload` nested object. Email from faker with unique provider. Password from `TEST_USER_PASSWORD` env default `welcome01`. Separate users per test via beforeEach — no shared static email in JSON files.

- **Validation Notes:**
  Rejected hardcoded `loginData.json` from original Prism sample. Implemented `API/utilities/testDataGenerator.js` with @faker-js/faker v8 API (`faker.person`, `faker.string.numeric` for postal/phone).

---

### Entry 2 — Invoice API payload from assessment example

- **Prompt:**
  ```
  Assessment provides example invoice POST body:
  billing_street, billing_city, billing_state, billing_country, billing_postal_code,
  payment_method: cash-on-delivery, cart_id, payment_details: {}

  Create buildInvoicePayload(cartId) using faker for billing fields.
  Keep payment_method fixed as cash-on-delivery. Add template JSON for documentation.
  ```

- **AI Response Summary:**
  `buildInvoicePayload(cartId)` in testDataGenerator.js. Template file `API/testdata/invoicePayload.template.json` with placeholder cart_id. billing_country set to `US` (assessment example used `TG` — faker uses valid country code for API).

- **Validation Notes:**
  Kept assessment example in template for reference; runtime invoice payload uses **static assessment billing** (Zoey Shore / Hesselbury / Florida / TG / 1234AA) — faker city+TG fails API validation ("city does not belong to selected country"). cart_id always from SharedTestData.

---

### Entry 6 — API password rules discovered during smoke run

- **Prompt:**
  ```
  API register returns 422 with welcome01 password. What does the API actually require?
  ```

- **AI Response Summary:**
  Password must include uppercase, lowercase, and symbol; common passwords like `Welcome01!` rejected as leaked. `generateStrongPassword()` → `Qa{8 alphanumeric}!1` per registration.

- **Validation Notes:**
  Removed `TEST_USER_PASSWORD=welcome01` default from `.env` — empty env now triggers generated passwords. UI register uses same helper for consistency.

---

### Entry 3 — SharedTestData vs DynamicData

- **Prompt:**
  ```
  Prism framework has createDynamicData.js with DynamicData class.
  For API chain tests needing token, cartId, productIds, invoiceId across specs —
  extend existing pattern vs new SharedTestData static class. Recommend one approach.
  ```

- **AI Response Summary:**
  Extended `createDynamicData.js` with `SharedTestData` static class: `setAuth`, `setCart`, `setProducts`, `setInvoice`, `getAuthHeader()`. Kept original `DynamicData` for backward compatibility. Token stored after login; cart after POST /carts; products after GET /products.

- **Validation Notes:**
  Chose static class over JSON file round-trip for speed and clarity in serial tests. API responses still stored to JSON via `storeFullAPIResponse` for execution evidence (AccessToken, createdCart, generatedInvoice).

---

### Entry 4 — Environment and secrets handling

- **Prompt:**
  ```
  Define .env and .env.example for PrismStructure:
  UI base URL, API base URL, optional test password.
  What should NOT go in .env or be sent to AI?
  ```

- **AI Response Summary:**
  `.env.example`: `BASE_URL`, `URL` (API base for apiHelper), `TEST_USER_PASSWORD`. apiHelper uses `process.env.URL`; UI page objects use `process.env.BASE_URL`. Do not commit `.env`; gitignore runtime API JSON artifacts.

- **Validation Notes:**
  Matched original Prism convention (`URL` for API, not `API_BASE_URL`) to avoid changing apiHelper. No real user credentials — only faker emails and shared practice password `welcome01` per SUT convention.

---

### Entry 5 — UI test data for checkout flow

- **Prompt:**
  ```
  UI checkout: payment method cash-on-delivery, quantity updates, empty cart state.
  Any static JSON needed or all dynamic? Cart/checkout billing — pre-filled from profile or manual entry?
  ```

- **AI Response Summary:**
  No static user JSON required — register flow fills profile. Checkout uses COD via `selectOption('cash-on-delivery')`. Cart quantity via locator fill. Empty cart test navigates to checkout without adding products.

- **Validation Notes:**
  If live app pre-fills billing from profile, checkout page object may only need proceed + payment + confirm — to validate on first smoke run. Documented as likely tuning item in automation-and-debugging.
