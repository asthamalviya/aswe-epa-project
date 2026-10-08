# S4: Initiate, design, code, test and debug a software component
**Assessment method**: AM2
**Module**: 6 (Multiverse Project 6: Cloud Computing and Scalable Architectures)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Two-person, ten-week build of a cloud AI governance and knowledge assistant on AWS for a UK government registry
**Status**: Draft
**Related drafts in this folder**: `K24-evidence.md` (requirements and design compliance), `S20-evidence.md` (three debugging stories in full), `S21-evidence.md` (evaluation methods). This piece follows the component through all five S4 stages and points to those files for detail.

## Criterion
**KSB:** Initiate, design, code, test and debug a software component for a digital and technology solution.
**Pass:** Demonstrates the use of core technical concepts for digital and technology solutions, including: Initiate, design, code, test and debug a software component for a digital and technology solution.
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** show initiation, design, coding, testing and debugging of a software component; show the core technical concepts and how you applied them; show it meets the solution's requirements; discuss challenges and how you overcame them.

> Guidance: Module 6 is your strongest S4 evidence: real code in the appendices, a 12-test suite, CI, and three debugging stories. Its weakness is voice: it talks about "the developer" rather than "I", so the assessor cannot tell what you did. Fill the Task section first. The component this piece follows is the FastAPI backend service.

## Situation
Staff at a UK government registry had no governed way to use AI on their documents, so some used consumer tools outside any audit trail. The backend service needed to let staff upload documents, get AI summaries and ask questions, while logging every AI interaction for governance.

## Task
[EVIDENCE NEEDED: which parts of the backend you wrote, and what your teammate did.]

## Action

### 1. Initiate
I turned the registry's problems into 7 functional, 6 non-functional and 6 security requirements (see `K24-evidence.md`), and prioritised them: the six core functions (upload, secure storage, summarise, ask, audit logging, REST API) as Must, health monitoring as Should. Setting measurable targets up front, such as 50 or more concurrent users and under 2,000 ms on non-AI endpoints, gave me something to test against later.

### 2. Design
- **Architecture.** A stateless FastAPI service in Docker on EC2 behind API Gateway, chosen over a monolith, microservices and Lambda (reasons in `K16-evidence.md`).
- **Layers.** Routes handle HTTP only; services (`ai_service.py`, `storage_service.py`) hold the logic; infrastructure is defined in Terraform. Separating them meant the upload route worked and was tested before the AI integration existed, and the AI provider can change without touching routes or storage.
- **Framework.** FastAPI over Flask (which needs separate validation libraries) and Django (whose ORM and sessions a stateless API does not need), for asynchronous handling, built-in Pydantic validation and automatic API documentation.

### 3. Code
| Part | What it does | Concept |
|---|---|---|
| `main.py` | Configures CORS, registers route modules, sets up structured logging | Composition at a single entry point |
| Upload route (Appendix D) | Checks the file against three allowed types, rejects others with HTTP 400, stores it under a UUID | Input validation; fail fast |
| `storage_service.py` | Sets AES-256 encryption on every S3 upload | Enforcing a security requirement in code, not only in configuration |
| `ai_service.py` (Appendix E) | Creates the OpenAI client on first use; caps responses at 500 tokens; uses temperature 0.3 for consistent summaries | Lazy initialisation; bounding cost and time |
| Ask route (Appendix F) | Logs each question with document ID, a 50-character excerpt and a UTC timestamp | Audit logging with data minimisation |
| Terraform and Docker | Nine AWS resources as code; a 187 MB `python:3.12-slim` image | Reproducible infrastructure and runtime |

### 4. Test
- **Unit and API tests.** 12 pytest tests, all passing in 1.69 seconds: upload (4: no file, unsupported type, text file, PDF), ask (3: empty question, missing document, answer returned), summarise (2: missing document, summary returned), health (1) and load (2).
- **Negative tests.** Five of the nine functional tests check that bad input is rejected (no file, unsupported type, empty question, missing document twice), not only that good input works.
- **Performance.** 100 sequential health-check requests (average 0.49 ms, P99 0.63 ms) and a 50-request concurrent burst (100% success).
- **Continuous integration.** Every push runs Ruff (linting), then pytest, then the Docker build; the build only runs if the tests pass, so untested code is never containerised. Over the project, Ruff caught 14 issues, pytest 3 regressions, the Docker build 1 environment problem and code review 2 logic issues.

### 5. Debug
Three problems stopped progress; the full stories are in `S20-evidence.md`:
1. **Python version mismatch.** Syntax from Python 3.10 failed in a 3.9 environment. I replaced it with `Optional[str]` and added a minimum version to Ruff so it cannot recur.
2. **Tests failing without an API key.** The OpenAI client was created at import time, so the whole test suite failed in CI before any test ran. I diagnosed it from the authentication error on import and moved client creation to first use.
3. **CORS blocking the frontend.** Browsers reject a wildcard origin when credentials are sent. I replaced it with an allowlist per environment rather than disabling CORS.

Code review also found a missing input sanitisation step on `/ask` that all the automated checks missed. [EVIDENCE NEEDED: what it was and how you fixed it.]

## Evaluating my component
1. **The load test is smaller than it sounds.** The "1,662 requests per second" figure comes from a burst of 50 requests to the health check, not sustained traffic to real endpoints. It shows the framework is fast, not that the service handles 50 users doing real work.
2. **AI input is not bounded.** The 500-token limit caps the **response**, but `generate_summary` sends the whole document to the model. A long document could exceed the model's context limit or cost far more than expected. Truncating or chunking input would fix this.
3. **Gaps in the tests.** No tests cover CORS configuration, encryption on upload, audit log content, AI timeouts or rate limits, very large files, or a file whose claimed type does not match its content.
4. **A stale comment.** The code comment says the token limit "prevents Lambda timeout risk", but the service runs on EC2. Comments that describe an earlier design mislead the next developer.

[EVIDENCE NEEDED: which of these you have fixed since, or would fix first.]

## Result
A working backend meeting all seven functional requirements, with 12 passing tests, a clean CI pipeline on the fourth run and no recorded defects reaching production. [EVIDENCE NEEDED: whether it was used by real staff.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Initiate | Action 1: requirements and targets |
| Design | Action 2: architecture, layers, framework choice |
| Code | Action 3 and Appendices D to F |
| Test | Action 4: unit, negative, performance and CI |
| Debug | Action 5 and `S20-evidence.md` |
| Meets requirements | Result; traceability in `K24-evidence.md` |
| Challenges overcome | Action 5; Evaluating my component |

## Assessor Notes
*Strength*: Every S4 stage has concrete evidence, including code and test output, and the draft finds real weaknesses in your own component.
*Gaps*: Your personal contribution; the `/ask` sanitisation fix.
*Watch for*: "Walk me through one bug from symptom to fix." Problem 2 in Action 5 is the clearest.
