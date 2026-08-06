# PrismStructure — Toolshop Assessment

Playwright + Prism framework for **Practice Software Testing** QA assessment.

## Quick Start

```bash
npm install
npx playwright install chromium
cp .env.example .env
npm run test:smoke
npm run report
```

## Structure

| Folder | Purpose |
|--------|---------|
| `API/pageobjects/` | Endpoints, headers, payloads (`authApi`, `cartApi`, `productApi`, `invoiceApi`) |
| `API/utilities/` | `apiHelper`, `testDataGenerator`, `SharedTestData` |
| `UI/pageobjects/` | Page objects + `POManager` |
| `tests/UI Test/` | 7 UI specs (registration, cart, checkout, invoice) |
| `tests/API Test/` | 8 API specs (auth, cart, products, invoice) |

## Environment

- `BASE_URL` — UI (practicesoftwaretesting.com)
- `URL` — API base (api.practicesoftwaretesting.com)

## Tags

- `@smoke` — critical path
- `@regression` — extended coverage

See root `readme.md` for full assessment documentation.
