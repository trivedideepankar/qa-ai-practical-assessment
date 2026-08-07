# Execution Evidence

Sample logs and artifacts proving automated tests ran successfully.

## How to reproduce

```bash
cd PrismStructure
npm install
cp .env.example .env
npx playwright install chromium
npm run test:smoke      # 7 tests — critical path
npm run test:regression # 15 tests — full suite
npm run report          # open HTML report
```

## Files in this folder

| File | Description |
|------|-------------|
| `smoke-run-output.txt` | Console output from `npm run test:smoke` — **7 passed** |
| `test-results-summary.md` | Pass/fail matrix for all automated tests |
| `sample-generated-invoice.json` | API invoice response saved after API-07 |
| `sample-api-requests.log` | Redacted curl log (tokens removed) |

## HTML report

After running tests, open:

```
PrismStructure/playwright-report/index.html
```

Or run `npm run report` from `PrismStructure/`.

## Last verified run

| Suite | Date | Result |
|-------|------|--------|
| Smoke (`@smoke`) | 2026-08-07 | 7 / 7 passed |
| UI (`test:ui`) | 2026-08-07 | 11 / 11 passed |
| API (`test:api`) | 2026-08-07 | 11 / 11 passed |
| Full regression | 2026-08-07 | 15 / 15 passed |
