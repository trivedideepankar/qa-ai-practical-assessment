# QA AI Practical Assessment

AI-assisted QA delivery for **Practice Software Testing Toolshop** using the **Prism Playwright** framework.

## Project Information

| Item | Location |
|------|----------|
| Framework | `PrismStructure/` (Prism + Playwright) |
| Manual tests | `FunctionalTestCase.csv` |
| AI workflow doc | `project-info.md` |
| Prompt history | `ai-prompts/` |
| UI page objects | `PrismStructure/UI/pageobjects/` |
| API page objects | `PrismStructure/API/pageobjects/` |
| Test data | `PrismStructure/API/utilities/testDataGenerator.js`, `PrismStructure/UI/resources/data/` |
| Environment | `PrismStructure/.env` |

**Application Under Test**

- UI: https://practicesoftwaretesting.com
- API: https://api.practicesoftwaretesting.com

**Note:** Invoice generation on UI requires clicking **Confirm twice**.

## Setup

```bash
cd PrismStructure
npm install
cp .env.example .env   # if .env missing
npx playwright install chromium
```

Edit `PrismStructure/.env` if needed:

```env
BASE_URL=https://practicesoftwaretesting.com
URL=https://api.practicesoftwaretesting.com
TEST_USER_PASSWORD=welcome01
```

## Run Tests

From `PrismStructure/`:

```bash
# All tests
npm test

# Smoke (@smoke tag)
npm run test:smoke

# Regression (@regression tag)
npm run test:regression

# UI only
npm run test:ui

# API only
npm run test:api

# Headed mode (debugging)
npm run test:headed
```

## Reports and Evidence

| Report | Path |
|--------|------|
| HTML report | `PrismStructure/playwright-report/index.html` |
| Open report | `npm run report` |
| API curl log | `PrismStructure/API/testdata/api_requests.log` |
| Stored API JSON | `PrismStructure/API/testdata/*.json` |
| Videos/traces | `PrismStructure/test-results/` (on failure) |

## Test Coverage Summary

| Layer | Count | Smoke | Regression |
|-------|-------|-------|------------|
| Manual (CSV) | 14 | UI-01,02,05,06 + API-01,02,07 | All @Regression rows |
| UI automation | 7 | UI-01,02,05,06 | UI-03,04,06,07 |
| API automation | 8 | API-01,02,07 | API-03–08 |

## Repository Structure

```
qa-ai-practical-assessment/
├── FunctionalTestCase.csv
├── PrismStructure/
├── project-info.md
├── readme.md
└── ai-prompts/
```

## Next Steps (after scaffold)

1. Run smoke suite and fix selectors against live app
2. Ensure all tests **Passed** before submission
3. Capture execution screenshots for evidence
4. Fill `ai-prompts/` with real Cursor prompt history
5. Push iteratively to public GitHub
