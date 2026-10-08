# S20: Respond to changing priorities and adapt plans
**Assessment method**: AM2
**Module**: 6 (Multiverse Project 6: Cloud Computing and Scalable Architectures)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Two-person, ten-week build of a cloud AI governance and knowledge assistant on AWS for a UK government registry
**Status**: Draft
**Related**: `../../by-ksb/changing-priorities.md` is the cross-module S20 scaffold for a change of **priorities**. This file covers **problems arising** in Module 6. The strongest S20 evidence uses both.

## Criterion
**Pass:** Describes how they respond to changing priorities and problems arising within software engineering projects by making revised recommendations, and adapting plans as necessary, to fit the scenario being investigated. (S20/SES5)
**Distinction:** Demonstrates how their actions have influenced the creation of appropriate plans within teams and contributed to project outcomes. Compares and contrasts how they respond to changing priorities and problems arising within software engineering projects by making revised recommendations, and adapting plans as necessary, to fit the scenario being investigated. (S20/SES5) [Column placement inferred from the EPA guidance PDF; confirm with your coach.]

> Guidance: the Module 6 report calls its CI debugging "precisely the evidence S20 requires". Only part of that holds. The three changes below are **problems arising**, which the criterion does cover, but S20 also needs **revised recommendations** and **adapted plans**. This draft reframes each fix around the decision you made and what it changed in how the team worked, not the code change itself. A real change of **priorities** is still missing: see the gap at the end.

## Situation
I was building a cloud AI governance and knowledge assistant for a UK government registry: a FastAPI service on EC2 behind API Gateway, with S3 storage, infrastructure defined in Terraform and a GitHub Actions pipeline. It was a two-person project over ten weeks. Three problems emerged during delivery, each blocking progress at a different stage: running tests, running the pipeline and connecting the frontend.

## Task
[EVIDENCE NEEDED: your role on the two-person team, and who decided how to respond to each problem. The report is written in the third person ("the developer's machine"), so say plainly which decisions were yours.]

## Action

### Problem 1: Python version mismatch blocked the team's tests
**What happened.** The code used Python 3.10 union-type syntax, but CI ran Python 3.9, so imports failed in CI and in deployment while passing locally. [EVIDENCE NEEDED: confirm which versions ran where. The report also gives the development environment as 3.9 and the Docker image as 3.12; see the fix list.]
**Options I weighed.** Upgrading Python system-wide (risked breaking other projects on a shared environment), switching to `Optional[str]`, deferring annotation evaluation, or conditional imports (which break Pydantic parsing or static analysis).
**Revised recommendation.** Switch to `Optional[str]`, because it kept full type safety, worked across Python 3.9 and later, and needed no environment change: I put CI compatibility ahead of syntax preference.
**How the plan adapted.** I added a minimum Python version to the Ruff configuration, so the pipeline now rejects incompatible syntax for every future contributor. That turned a one-off fix into a quality gate in the team's workflow.
**Outcome.** The next commit passed CI, unblocking two team members who could not run tests. The fix took 12 minutes and avoided an estimated 45 minutes of environment debugging per person per occurrence. [EVIDENCE NEEDED: the project had two people; were both "team members" blocked, or were others involved?]

### Problem 2: CI could not run without production credentials
**What happened.** The OpenAI client was created at import time, so without an API key in CI the whole test suite failed with an authentication error before any test ran.
**Options I weighed.** Mocking OpenAI in every test (brittle), lazy initialisation, dependency injection (cleanest, but meant refactoring every route handler), or conditional imports.
**Revised recommendation.** Lazy initialisation: create the client on first use. It let CI run without secrets management, let non-AI endpoints start without credentials, and kept one reusable connection. I chose it over dependency injection because a full refactor did not fit a ten-week timeline.
**How the plan adapted.** The team's feedback loop changed from deploy-wait-check (about 10 minutes per iteration) to commit-and-let-CI-check (about 90 seconds), saving an estimated 2 hours over the project and moving defect detection from after deployment to commit time.

### Problem 3: CORS blocked the frontend during integration testing
**What happened.** The browser rejected a wildcard CORS origin once credentials were sent, blocking all frontend access. Unit tests had passed; the problem only appeared in integration testing.
**Options I weighed.** Disabling CORS (5 minutes, but exposes the API to any origin), wildcard with credentials (browsers reject it), an explicit origin allowlist per environment, or serving frontend and API from the same domain (adds infrastructure).
**Revised recommendation.** An explicit allowlist set by environment variable. It met security requirement SR1 by restricting access to known origins. It took 30 minutes instead of 5: I chose to keep the security requirement under time pressure rather than take the shortcut.
**How the plan adapted.** Allowed origins are now configured per environment and documented in the README, so future developers can change them without touching code, and so extra regional domains can be added if the tool expands to more regions.

## Result
All three problems were resolved within the ten-week build, and CI reached a passing run in 34 seconds on the fourth run. [EVIDENCE NEEDED: did the project finish on time and in scope? Was anything in the plan dropped or moved because of these problems?]

## Distinction 1: How my actions shaped the team's plans
Two of my responses changed how the team worked, not just the code: the Ruff minimum-version gate now blocks incompatible syntax for every contributor, and the switch to CI-first feedback changed the team's development loop from deploy-and-check to commit-and-check. [EVIDENCE NEEDED: evidence the other team member worked differently as a result, e.g. they adopted the CI-first loop, or the README change was used. Name an artefact you can describe: the Ruff config commit, the pipeline history in Figure 10 or the README section.]

## Distinction 2: Comparing my responses
| | Problem 1: Python version | Problem 2: credentials in CI | Problem 3: CORS |
|---|---|---|---|
| Where it surfaced | CI and deployment | CI, before any test ran | Integration testing |
| Pressure | Two people blocked | Slow feedback loop | Frontend fully blocked |
| Fastest option rejected | System-wide upgrade | Mock everywhere | Disable CORS (5 min) |
| What I optimised for | Compatibility, no environment change | Testability without secrets | Security requirement SR1 |
| Lasting change | Ruff version gate | CI-first feedback loop | Per-environment config, documented |

In all three I followed the same pattern: find the root cause, compare several options, and choose the one that kept the requirements rather than the quickest. The difference was what each problem put at risk. Problem 1 threatened the team's ability to work, so I chose the least disruptive fix. Problem 2 threatened speed of feedback, so I accepted a small architectural change for a lasting benefit. Problem 3 set security against speed, and I accepted six times the effort to keep security intact.

> Guidance: the report says "each adaptation was faster to resolve than the one before", but it also gives 12 minutes for Problem 1 and 30 minutes for Problem 3. Drop that claim unless you can support it with different figures.

## Gap: a real change of priorities
None of the three is a change of **priorities**: each is a technical problem inside a fixed plan. Section 2.5 of the report describes priority changes (stricter security requirements, a cost-reduction mandate, multi-region expansion), but only as scenarios the design could absorb, not events that happened. [EVIDENCE NEEDED: did any priority change during the ten weeks, e.g. a requirement added, a feature cut, or a deadline moved? If so, add it here using the structure in `../../by-ksb/changing-priorities.md`. If not, use a real example from your wider work in that file.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Responds to problems arising | Problems 1 to 3 |
| Responds to changing priorities | Gap section [EVIDENCE NEEDED] |
| Makes revised recommendations | "Revised recommendation" in each problem |
| Adapts plans as necessary | "How the plan adapted" in each problem |
| Fits the scenario | Options weighed against each problem's specific constraint |
| Distinction: influenced team plans and outcomes | Distinction 1 [EVIDENCE NEEDED: artefact and team effect] |
| Distinction: compares and contrasts | Distinction 2 table and paragraph |

## Assessor Notes
*Strength*: Each response shows options, a reasoned choice and a lasting process change. The comparison table is real compare-and-contrast material.
*Gaps*: No change of priorities; the third-person voice hides whose decisions these were; version and team-size details conflict in the report.
*To reach Distinction*: Show the other team member's work changing because of your decisions, and add one genuine priority change.
