# QA AI Practical Assessment

Beginner-friendly guide for the **Practice Software Testing Toolshop** QA assessment using **Prism Playwright** and **Cursor AI**.

> Reference submission: [assessmentAI_Project](https://github.com/ritukumari1-a11y/assessmentAI_Project)

---

## What is this project?

This repo demonstrates AI-assisted QA delivery:

| Layer | What it covers |
|-------|----------------|
| **Manual tests** | 14 test cases in `FunctionalTestCase.csv` |
| **UI automation** | Registration, login, cart, checkout, invoice (Playwright) |
| **API automation** | Auth, cart, products, invoice (Playwright request API) |
| **AI workflow** | Prompt history in `ai-prompts/` + reflection in `documentation-and-summary.md` |

**Application under test**

- UI: https://practicesoftwaretesting.com
- API: https://api.practicesoftwaretesting.com

**Important:** On UI checkout, click **Confirm / Finish twice** to generate an invoice.

---

## Step 1 — Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)
- Google Chrome (tests use Chrome channel)

---

## Step 2 — Clone and setup

```bash
git clone <your-repo-url>
cd qa-ai-practical-assessment/PrismStructure
npm install
cp .env.example .env
npx playwright install chromium
```

The `.env` file should contain:

```env
BASE_URL=https://practicesoftwaretesting.com
URL=https://api.practicesoftwaretesting.com
TEST_USER_PASSWORD=welcome01
```

No manual test user is required — tests create users automatically with Faker.

---

## Step 3 — Run tests

All commands run from the `PrismStructure/` folder.

### Quick smoke check (recommended first)

```bash
npm run test:smoke
```

Runs 7 critical tests: register, login, checkout, invoice (UI + API).

### Full regression

```bash
npm run test:regression
```

Runs all 15 automated tests including negative cases.

### Run by layer

```bash
npm run test:ui     # UI only (7 unique tests)
npm run test:api    # API only (8 unique tests)
npm test            # Full suite
```

### Debug in browser

```bash
npm run test:headed
```

---

## Step 4 — View reports

| Report | How to open |
|--------|-------------|
| HTML report | `npm run report` (opens `playwright-report/index.html`) |
| API curl log | `PrismStructure/API/testdata/api_requests.log` |
| Execution evidence | `execution-evidence/` folder |
| Pass/fail summary | `execution-evidence/test-results-summary.md` |

---

## Repository structure

```
qa-ai-practical-assessment/
├── readme.md                    ← Setup guide (this file)
├── project-info.md              ← Part A: AI workflow + scope
├── documentation-and-summary.md ← Reflection and reuse guide
├── FunctionalTestCase.csv       ← Manual test cases
├── execution-evidence/          ← Sample logs and pass summary
├── ai-prompts/                  ← AI prompt history (5 files)
└── PrismStructure/              ← Playwright automation
    ├── UI/pageobjects/          ← Page Object Model
    ├── API/pageobjects/         ← API endpoints and payloads
    ├── tests/UI Test/           ← UI specs (smoke + regression)
    ├── tests/API Test/          ← API specs (smoke + regression)
    ├── playwright.config.js
    └── package.json
```

---

## Test coverage

### Smoke (@smoke) — 7 tests

| ID | Flow |
|----|------|
| UI-01 | Register new user |
| UI-02 | Login and verify profile |
| UI-05 | Checkout with Cash on Delivery |
| UI-06 | Invoice (confirm twice) + My Invoices |
| API-01 | Register via API |
| API-02 | Login and get bearer token |
| API-07 | Generate invoice via API |

### Regression (@regression) — 8 additional tests

| ID | Flow |
|----|------|
| UI-03 | Invalid login |
| UI-04 | Add multiple products to cart |
| UI-07 | Empty cart checkout |
| API-03 | Invalid API login |
| API-04 | Create cart |
| API-05 | List products |
| API-06 | Add to cart and verify |
| API-08 | Invoice without token (401) |

---

## Related documents

| Document | Purpose |
|----------|---------|
| `project-info.md` | AI workflow, tools, risks, scope |
| `documentation-and-summary.md` | What worked, what was refined, reuse steps |
| `ai-prompts/` | Full prompt history for evaluators |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `BASE_URL` undefined | Copy `.env.example` to `.env` |
| Browser not found | Run `npx playwright install chromium` |
| Checkout fails on billing | Re-run — address fields may need a retry |
| Invoice not generated | Ensure Confirm is clicked **twice** on UI |
| Duplicate email error | Tests use Faker — re-run should create new user |
