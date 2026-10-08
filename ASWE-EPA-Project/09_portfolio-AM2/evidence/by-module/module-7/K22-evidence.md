# K22: Development techniques for each lifecycle stage, their artefacts and contexts
**Assessment method**: AM2
**Module**: 7 (Multiverse Project 7: Software Testing and Design Patterns), with deployment-stage examples from Module 6
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Refactoring the QuickQuote pricing service from a monolithic handler to a layered design
**Status**: Draft

## Criterion
**KSB:** [EVIDENCE NEEDED: the K22 standard wording is not saved in the repo. Save the Multiverse K22 page and paste it here.]
**Pass:** Explains the principles of a range of development techniques, for each stage of the software development cycle that produce artefacts and the contexts in which they can be applied. (K22/SEK2)
**Distinction:** None for this KSB.

> Guidance: the criterion has four parts: **principles**, **each stage** of the lifecycle, the **artefacts** each technique produces, and the **contexts** where each applies. Module 7 is rated Strong for K22 and already includes the hardest part, context ("if it won't change, v0's simplicity would suffice"). This draft organises the report by lifecycle stage and makes the artefacts and contexts explicit. Module 7 stops before deployment, so that stage draws on Module 6.

## Situation
The QuickQuote pricing service calculated quotes in one 90-line HTTP handler that also read configuration files, applied discount and tax rules, read the system clock and wrote invoices. It contained a real pricing anomaly: 25 Pro seats cost £675 while 24 cost £684. The structure made the anomaly hard to find and risky to change.

## Task
[EVIDENCE NEEDED: your role, in the first person. The report is written impersonally.]

## Action: techniques by lifecycle stage

### 1. Analysis: understanding the existing system
| Technique | Principle | Artefact | Context where it applies |
|---|---|---|---|
| Structured code review against quality attributes | Find the root cause behind symptoms, not a list of faults | Quality diagnosis: seven gaps with line references and business impact | Legacy code with no specification or tests |
| Technical debt framing (SEI) | Make the future cost of expedient code visible, so it can be prioritised | Gap-to-impact mapping (e.g. multi-stage rounding causes reconciliation risk) | When arguing for refactoring time to non-technical stakeholders |

The diagnosis found that the seven gaps (high coupling, file I/O, embedded rules, non-deterministic time, rounding at several stages, weak validation, magic numbers) were symptoms of one cause: a single function doing six jobs. That shaped the design stage: fixing one gap alone would leave the rest.

### 2. Design: deciding the structure
| Technique | Principle | Artefact | Context where it applies |
|---|---|---|---|
| Service Layer | Separate business logic from delivery mechanisms (HTTP) | `PricingService` | Logic that must be tested or reused without the web framework |
| Repository pattern | Hide persistence behind an interface | `ConfigRepository`, `InvoiceRepository` | Storage likely to change (files now, a database later), or tests that must not touch the filesystem |
| Strategy pattern | Make varying rules interchangeable | `PlanPricer`, `VolumeDiscountStrategy`, `TaxCalculator` | Rules that change independently and often. Not worth it for rules that never change |
| Dependency injection | Pass dependencies in rather than creating them inside | `Clock` interface with `SystemClock` and `FixedClock` | Anything non-deterministic (time, randomness, external services) that tests must control |
| Architecture decision records | Record the problem, options, trade-offs and reason for each decision | Four decision records in section 2 | Decisions with long-lived consequences that later developers will question |
| Deliberate restraint | Apply only the abstractions the problem needs | Rejected Abstract Factory, Observer and Builder | Always: over-engineering is also a design fault |

**Context matters most here.** v1 is 252 lines against v0's 90 and needs more upfront design. I judged that worthwhile only because the service is expected to change (new plans, regional tax rules). For a service that will not change, the simpler v0 structure would be the right choice.

### 3. Implementation: writing the code
| Technique | Principle | Artefact | Context where it applies |
|---|---|---|---|
| SOLID principles, especially single responsibility and dependency inversion | Each component has one reason to change; depend on abstractions | Service function of 48 lines, against v0's 88-line handler (section 4); magic numbers replaced by named rules | Code expected to be maintained by others over time |
| Refactoring under test | Change structure only once behaviour is locked by tests | Characterisation suite written **before** the refactor | Changing working code whose behaviour must be preserved |

### 4. Testing: proving it works
| Technique | Principle | Artefact | Context where it applies |
|---|---|---|---|
| Characterisation tests (34) | Record what the system **does** now, before changing it | Tests capturing v0 behaviour, including the 24/25 seat anomaly | Legacy code with no specification; refactoring |
| Test pyramid: unit (23), service (19), integration (14) | Many fast, isolated tests at the base; fewer, slower end-to-end tests at the top | 90 tests running in 0.21 seconds | Any codebase with clear internal boundaries |
| Boundary value analysis | Defects cluster at decision points | Tests at 9/10, 24/25, 49/50 and 99/100 seats | Rules with thresholds, such as discount tiers |
| Test doubles | Replace slow or unpredictable dependencies | In-memory repositories; `FixedClock` | Tests that must be fast and repeatable |
| Coverage measurement | Measure what code ran, then ask what that proves | 99% line and 92% branch coverage | Useful as a gap-finder, never as proof of correctness |
| "Proved and not proved" statement | State the limits of the evidence | Section 3.3: equivalence and rule isolation proved; concurrency, performance and business correctness not proved | Any report of test results to decision-makers |

### 5. Deployment and operation (from Module 6)
Module 7 stops at testing; its production readiness roadmap lists logging, monitoring, resilience and security hardening as the next stage. In Module 6 I used the techniques for that stage:
| Technique | Artefact | Context |
|---|---|---|
| Continuous integration with gated stages | `ci.yml`: lint, then tests, then container build | Any team codebase; catches faults at commit time |
| Infrastructure as code | Terraform configuration | Environments that must be reproducible and reviewable |
| Containerisation | Docker image pinned to one Python version | When environment differences cause "works on my machine" faults |
| Observability | CloudWatch dashboards and error-rate alarm | Live services where failures must be detected quickly |

### 6. Communicating results: an artefact for every audience
For technical stakeholders, the decision records and test suite are the evidence. For non-technical stakeholders, I presented the 24/25 seat anomaly as a **pricing policy decision** for the business, not a bug for developers to fix silently, because testing can show that it happens but not whether it is intended.

## Evaluating the techniques
1. **Coverage can mislead.** 99% coverage did not reveal whether the 24/25 pricing is correct; only a business decision can. Coverage shows what ran, not what is right.
2. **One gap was left unresolved.** Rounding at several stages (Gap 5) is "not addressed", and the executive summary's "0 critical gaps remaining" should say one medium gap was deferred.
3. **Figures conflict.** v0 is 90 lines in the summary, 106 in the trade-off section and 88 in section 4. Use one measured figure.
4. **Rejected patterns are asserted, not explained.** Abstract Factory, Observer and Builder appear only in lessons learned. One line on why each did not fit would strengthen the "context" part of K22.

## Result
The service went from one untestable handler to six independently testable components, with behaviour preserved (34 characterisation tests passing) and 90 tests running in 0.21 seconds. [EVIDENCE NEEDED: whether the business decided on the 24/25 anomaly.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Principles of development techniques | "Principle" column in each table |
| A range of techniques | 20 techniques across sections 1 to 5 |
| Each stage of the lifecycle | Analysis, design, implementation, testing, deployment and operation |
| Artefacts produced | "Artefact" column in each table |
| Contexts where they apply | "Context" column; v1 versus v0 trade-off in section 2 |

## Assessor Notes
*Strength*: Techniques tied to real artefacts in a public repository, with an unusually honest account of when each is and is not worth using.
*Gaps*: Your role; the conflicting line counts; reasons for rejecting the three patterns.
*Watch for*: "When would you not use the Strategy pattern?" Section 2's context column answers it.
