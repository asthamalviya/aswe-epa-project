# B2: Reliable, objective, and capable of independent and team working
**Assessment method**: AM2
**Module**: 7 (Multiverse Project 7: Software Testing and Design Patterns), with team working from Modules 2 and 6
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Refactoring and evaluating the QuickQuote pricing service
**Status**: Draft

## Criterion
**KSB:** Reliable, objective and capable of both independent and team working.
**Pass:** Applies relevant legal, ethical, social and professional standards to digital and technology solutions considering both technical and non-technical audiences and in line with organisational guidelines. (K19, S15, B1, B2)
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** show you are reliable, objective and capable of both independent and team working; show that your application of standards considers technical and non-technical audiences and follows organisational guidelines.

> Guidance: B2 has four parts: **reliable**, **objective**, **independent** and **team** working. Module 7 is strong on objectivity: it states what the tests did not prove, withdrew a claim it could not support and handed a pricing anomaly to the business instead of "fixing" it. It says nothing about working with others, so team working comes from Modules 2 and 6. Because B2 shares its criterion with K19 and S15, this draft also shows professional standards applied for two audiences.

## Situation
The QuickQuote pricing service had a known anomaly (25 Pro seats cost £675, 24 cost £684) buried in a 90-line handler that mixed HTTP handling, file access, pricing rules and the system clock. The task was to improve its structure without changing what it did, and to report the result honestly.

## Task
[EVIDENCE NEEDED: confirm you did this project independently, and who you reported to.]

## Action

### 1. Objective
- **Separating evidence from claims.** I distinguished three things that are easy to blur: coverage (what code ran), behavioural evidence (what the tests prove) and business correctness (whether the behaviour is right). High coverage did not tempt me to claim the pricing was correct.
- **Stating limits.** I listed what testing did not prove: safe concurrent invoice writes, production-scale performance and whether the pricing policy is intended.
- **Withdrawing an unsupported claim.** I had no measured before-and-after data on development speed, so I did not claim a speed improvement, and used the change in testing boundaries as the evidence instead.
- **Judging my own decisions.** For each design decision I asked whether it was right, and said where it would not be: for a service that will not change, the simpler original would have been the better choice.

### 2. Reliable
- **Protecting what already worked.** Before changing anything, I wrote 34 characterisation tests recording the original behaviour, so the refactor could not silently change a price.
- **Repeatable results.** Injecting a fixed clock made date-dependent pricing deterministic, so the same request always gives the same quote in tests.
- **Complete delivery.** The refactor was delivered with 90 tests running in 0.21 seconds, decision records for each design choice, and a risk table showing what remained open, including one quality gap (rounding) I chose to defer rather than half-fix. [EVIDENCE NEEDED: did you deliver to a deadline? Say so if you did.]

### 3. Independent working
[EVIDENCE NEEDED: describe how you worked alone on this project: how you planned it, where you made decisions without guidance, and how you checked your own work. For example: "I set the order of work myself: characterisation tests first, then one pattern at a time, running the full suite after each change."]

### 4. Team working (Modules 2 and 6)
- **Module 6, a two-person build.** Code review caught two logic issues that no automated tool found, including a missing input sanitisation step. The shared pipeline gave us both the same view of every failure, and when a Python version mismatch blocked two team members from running tests, the fix took 12 minutes and was locked in for everyone through the linter configuration. [EVIDENCE NEEDED: your side of the code review, i.e. who reviewed whose code, and one comment you gave or received.]
- **Module 2, a team project.** I invited peer feedback on the model to check my own objectivity, and the team kept a shared audit trail of the pipeline. [EVIDENCE NEEDED: your role in the team and one example of working with a colleague.]

### 5. Professional standards for two audiences (shared with K19 and S15)
- **Technical audience.** Decision records set out each design choice's problem, trade-offs and reasons; the test suite and file structure show the architecture; I applied SOLID principles and a layered testing approach.
- **Non-technical audience.** I presented the pricing anomaly as a **policy decision for the business**, not a defect for developers to change quietly, and framed the refactor's value as reduced risk: changes are more isolated, behaviour is easier to verify and anomalies are visible before release.
- **Organisational guidelines.** [EVIDENCE NEEDED: any team or organisational standard you followed, e.g. coding standards, review rules or a definition of done.]

## Result
The refactor preserved every recorded behaviour, made each pricing rule testable on its own, and gave the business a clear decision to make on the 24/25 anomaly. [EVIDENCE NEEDED: what the business decided, if known.]

## Evaluating my behaviour
1. **Objectivity is the strongest part; team working is the weakest.** Module 7 was a solo project, so the team evidence comes from elsewhere. The assessor may ask for a team example from your real job.
2. **Some figures undermine the reliability message.** The report gives four different line counts for v0 and a coverage figure (99%) that its own appendix does not support (96%). Fixing these matters for B2: reliability includes getting your own numbers right.

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Reliable | Action 2 |
| Objective | Action 1 |
| Independent working | Action 3 [EVIDENCE NEEDED] |
| Team working | Action 4 (Modules 2 and 6) |
| Standards for technical and non-technical audiences | Action 5 |
| Organisational guidelines | Action 5 [EVIDENCE NEEDED] |

## Assessor Notes
*Strength*: Unusually clear objectivity: limits stated, a claim withdrawn and a business decision escalated rather than taken.
*Gaps*: Independent working in your own words; a team example from your real job; the figure errors.
*Watch for*: "Tell me about a time you disagreed with a colleague's approach." Have a real example ready.
