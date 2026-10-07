# AI Prompts – Documentation and Summary

Prompts used for writing README, reports, and submission documentation.

---

### Entry 1 — Root readme and run instructions

- **Prompt:**
  ```
  Create readme.md for qa-ai-practical-assessment root with:
  - Framework location (PrismStructure)
  - Setup: npm install, .env, playwright install
  - Commands: smoke, regression, ui, api, headed, report
  - Where HTML report and api_requests.log are generated
  - Test coverage summary table (manual 14, UI 7, API 8)
  - Next steps after scaffold
  ```

- **AI Response Summary:**
  Root `readme.md` with setup block, npm script table, report paths (`playwright-report/`, `API/testdata/api_requests.log`), coverage matrix, repo tree, note on double-confirm invoice.

- **Edits You Made:**
  Kept assessment filename as `readme.md` (lowercase) per PDF template. Linked to `project-info.md` for Part A workflow detail instead of duplicating all 10 sections in readme.

- **Reason for Edits:**
  Separation of concerns — readme = how to run; project-info = AI workflow reflection for evaluators.

---

### Entry 2 — project-info.md Part A workflow

- **Prompt:**
  ```
  Fill project-info.md starter covering all 10 Part A sections from assessment:
  context to AI, requirement analysis, test planning, manual design, automation design,
  validating AI output, test data, debugging, what not to share, reuse in real projects.
  Use Cursor Auto + Sonnet strategy we planned.
  ```

- **AI Response Summary:**
  Ten subsection answers in project-info.md aligned to assessment template. Tools table, SUT URLs, SharedTestData/faker references, iterative prompting and smoke-first validation approach.

- **Edits You Made:**
  Left Assessment Start/Submission Date as _TBD_ for user to fill. Added concrete file paths (`testDataGenerator.js`, `ai-prompts/`) instead of generic descriptions.

- **Reason for Edits:**
  Evaluators look for specificity — paths prove artifacts exist in repo, not hypothetical workflow.

---

### Entry 3 — FunctionalTestCase.csv alignment with automation

- **Prompt:**
  ```
  Ensure FunctionalTestCase.csv TestCaseIDs (UI-01–07, API-01–08) match
  automation test names and testCasesMeta.json. List any intentional differences.
  ```

- **AI Response Summary:**
  IDs align 1:1. Automation adds `@smoke`/`@regression` tags; CSV uses Smoke/Regression column. Manual steps more granular than automated assertions (e.g., CSV lists numbered steps; specs use page object methods).

- **Edits You Made:**
  CSV Tag uses "Smoke" not "@smoke" — human-readable for manual suite export.

- **Reason for Edits:**
  CSV is for manual/functional reviewers; grep tags belong in Playwright specs per framework convention.

---

### Entry 4 — Git iterative commit plan

- **Prompt:**
  ```
  Assessment requires iterative git pushes not single commit.
  Propose commit sequence for this project from scaffold to submission.
  ```

- **AI Response Summary:**
  Suggested 10 commits: init framework → requirements docs → manual CSV → UI page objects (auth) → UI cart/checkout → UI specs → API objects → API specs → fix/debug pass → docs + evidence + ai-prompts.

- **Edits You Made:**
  Scaffold delivered as initial project creation; user should commit in chunks as they complete smoke fixes and fill prompt history.

- **Reason for Edits:**
  Single scaffold commit is acceptable as `chore: initialize assessment scaffold` then follow iterative plan for fixes — matches assessment intent.

---

### Entry 5 — Submission checklist summary

- **Prompt:**
  ```
  From assessment "What Counts as Complete" and "What Good Looks Like",
  create submission checklist for this repo. Mark done vs pending after scaffold.
  ```

- **AI Response Summary:**

  | Item | Status after scaffold |
  |------|------------------------|
  | Repo structure | Done |
  | FunctionalTestCase.csv | Done |
  | project-info.md | Done (dates TBD) |
  | readme.md | Done |
  | UI automation 5–8 @smoke/@regression | Done (7 tests) |
  | API automation 5–8 | Done (8 tests) |
  | ai-prompts/ 5 files | Done (this session) |
  | All tests Passed | **API smoke passed (3/3)**; UI smoke pending local Chrome run |
  | Execution reports/evidence | **Partial** — `generatedInvoice.json`, `api_requests.log`, playwright-report after API smoke |
  | Public git URL | **Pending** — user push |
  | Iterative commits | **Pending** |
  | Prompt history thoughtful review | Done (planning + scaffold documented) |

- **Edits You Made:**
  Added honest Pending items so submission checklist reflects scaffold vs finished assessment.

- **Reason for Edits:**
  Assessment values ownership and honesty — showing what's left is stronger than claiming complete before green test run.

---

### Entry 6 — Complete assessment project build

- **Prompt:**
  ```
  Act as Senior QA Automation engineer to prepare a QA assessment.
  Create complete project: README, project-info, FunctionalTestCase.csv,
  ai-prompts/, PrismStructure automation, documentation-and-summary.md,
  execution evidence. Reference assessment doc and prism_playwright framework.
  ```

- **AI Response Summary:**
  Built full repo: 14 manual cases, 7 UI + 8 API automated tests, Prism page objects, smoke/regression npm scripts, execution-evidence with pass logs. All 15 regression tests passed on live SUT.

- **Edits You Made:**
  Added root `documentation-and-summary.md` for reflection. Renamed smoke log to `.txt` to avoid gitignore. Enhanced README with step-by-step beginner guide.

- **Reason for Edits:**
  Assessment item 6 asks for reflection doc at root; assessment item 7 asks for execution evidence with passed status.

---

### Entry 7 — Summarize planning chats to ai-prompts (prior session)

- **Prompt:**
  ```
  generate the filled ai-prompts entries from our planning session
  ```

- **AI Response Summary:**
  Populated all five `ai-prompts/*.md` files with entries from: senior QA plan chat, phase prompts (requirements, CSV, UI/API design, test data, automation scaffold), validation notes, and submission checklist. Each entry follows Prompt → AI Response Summary → Validation/Debugging format from assessment template.

- **Edits You Made:**
  Included actual user prompts (lightly cleaned) and cross-referenced scaffolded file paths. Added Entry 5 debugging template for post-scaffold local runs.

- **Reason for Edits:**
  Evaluators assess prompting quality and iteration — real prompt text plus validation notes demonstrates review, not blind acceptance of AI output.
