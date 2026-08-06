# AI Prompts – Requirements and Planning

Record prompts used for understanding Toolshop flows, identifying risks, and drafting the test plan.

---

### Entry 1 — Assessment overview and execution plan

- **Prompt:**
  ```
  Act As senior Qa engineer, do QA Practical Assessment and give me plan how i can do it in best way and use attchement for understanding the Assessment also prims_playwright framework is acttched and give plan and prompts how i can do in best way
  /Users/deepankar.trivedi/Downloads/QA Practical Assessment.pdf
  /Users/deepankar.trivedi/Downloads/prism_playwright
  ```

- **AI Response Summary:**
  Parsed the assessment PDF (Part A 30% workflow docs, Part B 70% UI+API project). Identified SUT as practicesoftwaretesting.com (ecommerce) and api.practicesoftwaretesting.com. Proposed 5-phase plan: requirements → manual CSV → UI automation → API automation → execute/debug/docs. Defined 7 UI + 7 API test scope with @smoke/@regression tags, Prism patterns (POManager, apiHelper, SharedTestData), double-confirm invoice requirement, 5–8 cases per layer limit, iterative git commits, and Cursor model strategy (Auto 70% / Sonnet for code).

- **Validation Notes:**
  Confirmed assessment is capability exercise not pass/fail. Cross-checked required repo structure (`FunctionalTestCase.csv`, `PrismStructure/`, `project-info.md`, `ai-prompts/`). Accepted phased approach; noted 5–10 hour core scope so artifacts matter as much as automation breadth.

---

### Entry 2 — Extract acceptance criteria and test scope

- **Prompt:**
  ```
  Act as senior QA engineer. SUT: https://practicesoftwaretesting.com (ecommerce)
  and API docs: https://api.practicesoftwaretesting.com/api/documentation

  Given these acceptance criteria:
  AC1 UI: User Registration & Login — register, login, verify profile
  AC2 UI: E2E Purchase — browse, add multiple items, update qty, checkout COD,
  view invoice (invoice needs Confirm pressed TWICE)
  AC1 API: Register → login → bearer token → create cart
  AC2 API: Get products → add to cart → verify cart → generate invoice

  Tasks:
  1. List functional risks (auth, cart, payment, invoice double-confirm)
  2. Categorize flows as Smoke vs Regression
  3. Propose exactly 7 UI and 7 API test cases (positive/negative/edge)
  4. Map each test case to AC1 or AC2
  5. Output as markdown table with: ID, Title, Type, Tag, AC mapping, Priority

  Do NOT write automation code yet.
  ```

- **AI Response Summary:**
  Produced risk list: stale session/token, empty cart checkout, wrong payment method, single-click invoice confirm, API chain dependency (token → cart → invoice). Smoke = register, login, COD checkout, invoice (UI) + register, login, invoice (API). Regression = invalid login, cart quantity, empty cart, unauthorized API. Final scope: UI-01–07 and API-01–08 with explicit AC mapping.

- **Validation Notes:**
  Kept count at exactly 7 per layer per assessment rule. Elevated double-confirm invoice to explicit risk and test step in UI-05/06. Rejected adding browse/search flows to stay within scope limit.

---

### Entry 3 — Repository structure and submission requirements

- **Prompt:**
  ```
  From the QA Practical Assessment PDF, list the exact required repository structure,
  submission templates, what counts as complete, and tool-specific expectations
  (Playwright Prism + Cursor). Summarize constraints: test case limits, git commit style,
  execution report requirements, and ai-prompts folder file list.
  ```

- **AI Response Summary:**
  Required tree: `FunctionalTestCase.csv`, `PrismStructure/`, `project-info.md`, `readme.md`, `ai-prompts/` (5 files). Constraints: max 5–8 manual+UI+API each type, all automated tests Passed, iterative git pushes, public repo URL, prompt history showing thoughtful AI use not copy-paste.

- **Validation Notes:**
  Mapped PDF `readme.md` vs `readme.md` naming — used lowercase `readme.md` at root as in template. Planned `PrismStructure` as Playwright home rather than renaming framework internally.

---

### Entry 4 — Cursor token strategy for one-week assessment

- **Prompt:**
  ```
  Assessment must be done in Playwright using Cursor within monthly token limit.
  From assessment Quick Tips: when to use Auto vs Sonnet, Caveman prompting,
  summarize chat to ai-prompts. Give me a practical model-switching rule and
  which phases use which model.
  ```

- **AI Response Summary:**
  Rule: Auto/Composer for requirements, CSV, docs, ai-prompts (~70%); Sonnet for page objects, specs, playwright.config, hard debugging. One task per chat (Caveman). After each chat, summarize into matching `ai-prompts/*.md` file before starting next phase.

- **Validation Notes:**
  Adopted as working rule for this project. Planning and scaffold chats used Auto; scaffold automation used agent with code generation. This file itself is the summarize-chat output for Phase 1.

---

### Entry 5 — Scaffold full repo (planning → execution handoff)

- **Prompt:**
  ```
  Scaffold the full repo from your prism_playwright folder (structure, .env, npm scripts, starter page objects)
  ```

- **AI Response Summary:**
  Created `/Users/deepankar.trivedi/Projects/qa-ai-practical-assessment` with PrismStructure adapted for Toolshop: env vars, npm scripts (`test:smoke`, `test:regression`), 7 UI page objects + POManager, 4 API page objects, SharedTestData, testDataGenerator, 7 UI + 8 API starter specs, FunctionalTestCase.csv, project-info.md, readme.md, ai-prompts stubs.

- **Validation Notes:**
  Removed old district/login sample specs from framework copy. Flagged that selectors and API payloads need live SUT validation before submission. npm install could not run in agent environment — documented local setup steps in readme.
