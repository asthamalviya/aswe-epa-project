# S21: Determine, refine and adapt methods to evaluate project outcomes
**Assessment method**: AM2
**Module**: 7 (Multiverse Project 7: Software Testing and Design Patterns)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Evaluating whether refactoring the QuickQuote pricing service improved its quality
**Status**: Draft
**Companion piece**: `../module-6/S21-evidence.md` covers evaluating a cloud service against performance and delivery targets. This piece covers evaluating **quality** after a refactor. Together they show you adapting evaluation to very different outcomes.

## Criterion
**Pass:** Explains how they determine, refine, adapt and use appropriate software engineering methods, approaches and techniques to evaluate software engineering project outcomes. (S21/SES6)
**Distinction:** None for this KSB.

> Guidance: the four verbs are **determine**, **refine**, **adapt** and **use**. Module 7 is unusually good at refining: it separates what coverage shows from what the tests prove, and it withdrew a performance claim it could not support. This draft makes those refinements explicit, then shows one place where the evaluation method needs adapting: mutation testing is cited but never run.

## Situation
I refactored a 90-line pricing handler into six components. The outcome to evaluate was not "does it work" (v0 already worked) but "is the quality better, without changing behaviour?" That question needed several evaluation methods, because no single one answers it.

## Task
[EVIDENCE NEEDED: your role, in the first person.]

## Action

### 1. Determining the methods: one method per question
| Question about the outcome | Method I chose | Why this method |
|---|---|---|
| Did behaviour stay the same? | 34 characterisation tests written against v0, then run against v1 | They define "correct" as "what v0 did", which is the only specification a legacy system has |
| Are the business rules isolated? | Unit tests on each rule component without HTTP | If a rule can be tested alone, it is decoupled |
| Are the risky points covered? | Boundary value tests at 9/10, 24/25, 49/50 and 99/100 seats | Pricing defects cluster at discount thresholds |
| Is time handled deterministically? | Tests using `FixedClock` | Identical inputs must give identical pro-rata results |
| How much code do the tests exercise? | Line and branch coverage | Shows untested code; branch coverage also catches untested conditions |
| Is the structure better? | Code metrics before and after: lines per responsibility, number of independently testable components | Makes "better design" measurable (one 90-line unit versus six components) |
| Which risks remain? | Gap-by-gap risk mitigation table with residual risk | Links each original quality gap to how far it was fixed |

### 2. Using them: results
- All 34 characterisation tests pass against v1, so behaviour was preserved, including the 24/25 seat anomaly.
- 90 tests run in 0.21 seconds, with 92% branch coverage.
- One handler doing six jobs became six components; the HTTP handler went from 90 lines to 14.
- Four of seven quality gaps are fully or highly mitigated; rounding (Gap 5) is not addressed.

### 3. Refining the methods
Three refinements made the evaluation more honest:
1. **Separating three kinds of evidence.** I distinguished **coverage** (what code ran), **behavioural evidence** (what the tests prove) and **business correctness** (whether the behaviour is right). 99% coverage cannot say whether charging £675 for 25 seats and £684 for 24 is intended, so I reported the anomaly to the business as a policy decision instead of treating coverage as proof.
2. **Stating what testing did not prove.** Concurrent invoice writes, production-scale load and business correctness were explicitly listed as unproven.
3. **Withdrawing an unsupported claim.** I had no measured before-and-after data on development or test speed, so I dropped a speed-improvement claim and used the change in testing boundaries and dependency structure as the evidence instead.

### 4. Adapting where a method falls short
**Mutation testing.** The report says the boundary tests "detect off-by-one mutations" and cites mutation testing research (Jia and Harman, 2011), but no mutation testing was run. Coverage shows a line ran; mutation testing shows a test would **fail** if that line were wrong, by making small deliberate changes (for example `>=` to `>`) and checking the tests catch them. It is the right method for proving boundary tests work.

[EVIDENCE NEEDED: run a mutation testing tool (for example `mutmut` for Python) on the public repository, and record the mutation score and any surviving mutants. If you do this before the discussion, it becomes a genuine example of adapting your evaluation method. If not, explain here how you would do it and what it would add.]

## Evaluating my evaluation
1. **The coverage figures do not agree.** The report gives 99% line coverage, but Appendix A gives v1 as 242 of 252 lines covered, which is 96%. It also gives v0 as 85 lines, a fourth figure alongside 88, 90 and 106. Correct these before the discussion: an assessor who checks the arithmetic will question the rest.
2. **Coverage of v0 is described but not explained.** "v0: 85/85 lines" suggests the characterisation tests covered all of v0. Say so directly: it is strong evidence that the safety net was complete.
3. **Residual risk is assessed but not tested.** The risk table rates remaining risks (e.g. duplicated validation rules), but no test demonstrates them.

## Result
The evaluation showed that v1 preserves v0's behaviour, isolates every pricing rule for testing and makes time deterministic, while stating plainly what it did not prove. [EVIDENCE NEEDED: the mutation score, if you run it.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Determines appropriate methods | Action 1: one method per question, with reasons |
| Uses them | Action 2: results |
| Refines them | Action 3: three kinds of evidence; limits; withdrawn claim |
| Adapts them | Action 4: mutation testing [EVIDENCE NEEDED: run or plan] |
| Evaluates project outcomes | Results and residual risks |

## Assessor Notes
*Strength*: A rare, explicit distinction between coverage, behavioural evidence and business correctness, and a willingness to withdraw an unsupported claim.
*Gaps*: The coverage arithmetic; mutation testing not yet run.
*Watch for*: "Your report says 99% coverage but 242 of 252 lines. Which is right?" Fix this first.

## References
- Jia, Y. and Harman, M. (2011) 'An analysis and survey of the development of mutation testing', *IEEE Transactions on Software Engineering*, 37(5), pp. 649–678.
