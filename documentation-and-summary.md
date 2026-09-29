# Documentation and Summary — QA AI Practical Assessment

Reflection on the AI-assisted testing workflow for the Practice Software Testing Toolshop project.

---

## What worked well

### 1. Phased AI prompting

Breaking the assessment into focused chats (requirements → manual CSV → UI automation → API automation → docs) kept prompts short and outputs reviewable. Each phase produced one artifact before moving on.

### 2. Prism framework reuse

Starting from the `prism_playwright` template gave a proven structure: `POManager`, `apiHelper`, `SharedTestData`, and curl logging. AI extended existing patterns instead of inventing a new framework.

### 3. Requirement traceability

Every test case has an ID (`UI-01` … `API-08`) mapped to acceptance criteria (AC1-UI, AC2-UI, AC1-API, AC2-API). Manual CSV, automation specs, and `testCasesMeta.json` stay aligned.

### 4. Smoke-first execution

Running `npm run test:smoke` before the full suite caught API auth issues early. UI smoke validated the critical path: register → login → COD checkout → double-confirm invoice.

### 5. Dynamic test data

`testDataGenerator.js` with Faker avoids hardcoded users and duplicate-email failures on repeat runs.

---

## What needed refinement

### 1. Invoice double-confirm on UI

The assessment states invoice generation requires **Confirm clicked twice**. First AI draft used a single click. Fix: `checkoutPage.confirmOrderTwice()` waits for "Payment was successful", then clicks Finish again until "Thanks for your order" appears.

### 2. Billing address field timing

Checkout `house_number` sometimes cleared after postal code autofill. Added `ensureBillingReady()` with Tab blur and re-fill before proceeding.

### 3. API status code flexibility

Login failure and unauthorized invoice endpoints return 401, 400, or 422 depending on API version. Assertions use `expect([401, 400, 422]).toContain(status)` instead of a single hardcoded code.

### 4. Selector verification

AI-generated locators must be checked on the live Angular app. All UI selectors use `data-test` attributes verified manually on practicesoftwaretesting.com.

### 5. Token usage

Used Cursor **Auto** for planning, CSV, and docs; reserved premium models for page objects and debugging. Saved prompts to `ai-prompts/` after each session.

---

## How to reuse this workflow

| Step | Action | Output |
|------|--------|--------|
| 1 | Attach assessment doc + framework folder to Cursor | Requirements understanding |
| 2 | Prompt: extract ACs, risks, smoke vs regression | Test plan in `project-info.md` |
| 3 | Prompt: generate manual cases (one module at a time) | `FunctionalTestCase.csv` |
| 4 | Scaffold page objects following Prism patterns | `PrismStructure/UI` + `API` |
| 5 | Run smoke → fix failures → run regression | `execution-evidence/` |
| 6 | Summarize each chat to `ai-prompts/*.md` | Prompt history for reviewers |
| 7 | Iterative git commits per phase | Clean commit history |

### Recommended npm workflow

```bash
cd PrismStructure
npm run test:smoke       # fast feedback
npm run test:regression  # full coverage
npm run report           # HTML evidence
```

### Model strategy (from assessment)

- **70% Auto / Composer** — requirements, CSV, readme, ai-prompts
- **30% Sonnet / coding model** — page objects, spec files, hard debugging
- **One task per chat** — easier to copy into prompt history

---

## Submission checklist

| Item | Status |
|------|--------|
| `README.md` + `readme.md` | Done |
| `project-info.md` (Part A workflow) | Done |
| `FunctionalTestCase.csv` (14 cases) | Done |
| `ai-prompts/` (5 files) | Done |
| `PrismStructure/` UI + API automation | Done |
| `execution-evidence/` | Done |
| All automated tests passing | Done (15/15 regression) |
| Public git URL | Push to GitHub when ready |

---

## Reference

- **SUT UI:** https://practicesoftwaretesting.com
- **SUT API:** https://api.practicesoftwaretesting.com/api/documentation
- **Framework base:** `prism_playwright` (Prism + Playwright)
