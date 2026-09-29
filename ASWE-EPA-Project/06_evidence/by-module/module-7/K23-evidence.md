# K23: Development methods and approaches, and when to use them
**Assessment method**: AM2
**Module**: 7 (Multiverse Project 7: Software Testing and Design Patterns), with the main methodology comparison from Module 5
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Projects for a UK government registry
**Status**: Draft
**Related**: `K21-evidence.md` compares lifecycle **scenarios**; `K22-evidence.md` covers **techniques** within stages. This piece covers **methods and approaches**: the overall way of organising the work, and when each fits.

## Criterion
**KSB:** [EVIDENCE NEEDED: the K23 standard wording is not saved in the repo. Save the Multiverse K23 page and paste it here.]
**Pass:** Explains the principles of a range of development methods and approaches and the contexts in which they can be applied. (K23/SEK3)
**Distinction:** None for this KSB.

> Guidance: Module 7 on its own is Weak for K23: it uses one approach (test-first, characterisation-led refactoring) and compares none. Module 5 is Strong: it compares Waterfall, Scrum and hybrid delivery against the registry's context and chooses one. This draft sits in the Module 7 folder as you asked, but Module 5 carries the comparison; Module 7 adds the engineering approaches. Consider saving a copy in `../module-5/` as well.

## Situation
The registry describes its delivery as Agile, but in practice delivers legacy systems through sequential plans, a pattern Dikert et al. (2016) describe in large organisations moving to agile. Choosing a method means working with that reality, not assuming the textbook version of any method.

## Task
[EVIDENCE NEEDED: your role in choosing or working within these methods, in the first person.]

## Action

### 1. Delivery methods: principles and contexts
| Method | Principle | Fits when | Does not fit when | Where I used or assessed it |
|---|---|---|---|---|
| Waterfall | Plan everything upfront; complete each phase before the next | Requirements are stable and well understood; fixed-scope regulatory or contractual work | There are significant unknowns; the plan is obsolete as soon as something is discovered | Module 5: rejected, because the AI's behaviour could not be planned upfront |
| Scrum | Deliver in short, fixed sprints with a review and retrospective each time | Requirements will be discovered; stakeholders can give feedback often | The team cannot get regular stakeholder time, or work is mostly unplanned interruptions | Module 5: selected in adapted form, with stakeholder feedback every two weeks |
| Kanban | Visualise the flow of work and limit work in progress; no fixed iterations | Continuous streams of work, such as support or operations | Work that needs a fixed-date increment | Module 5: GitHub Projects as the Kanban board within sprints |
| Hybrid (plan-driven governance with iterative delivery) | Gates and plans at the top, iterations underneath | Large programmes needing formal approval points | Small projects, where the governance overhead outweighs the benefit | Module 5: full hybrid rejected as disproportionate for a six-month project |
| Phased rollout with a parallel run | Introduce change in stages, keeping the old system running until the new one is proven | Replacing something people rely on daily | Greenfield systems with no users yet | Module 6: four-week parallel run; Module 4: phased enterprise rollout |

### 2. Engineering approaches: principles and contexts
| Approach | Principle | Fits when | Where I used it |
|---|---|---|---|
| Design Sprint | Compress design, prototyping and user testing into a short fixed period | The riskiest questions are about what to build | Module 5: Sprint 0 co-designing the architecture with pilot developers and DevOps |
| Test-first design (Freeman and Pryce, 2009) | Let the need to test drive the design; code that is hard to test signals a design problem | New components with clear behaviour to specify | Module 7: architectural boundaries emerged from what needed independent testing |
| Characterisation-led refactoring (Feathers, 2004) | Record what legacy code does before changing it | Legacy code with no tests or specification | Module 7: 34 characterisation tests written before refactoring |
| Continuous integration | Integrate and verify every change automatically | Any team sharing a codebase | Module 6: lint, test and build on every push |
| Lean and value stream thinking | Find and remove steps that add no value | Improving an existing process | Module 5: value stream mapping of developer queries (seven manual steps, four platform switches) |
| Iterative data science cycle | Loop through data, modelling and evaluation; retrain as data changes | Machine learning, where results depend on data that shifts | Module 2: model comparison, evaluation and planned quarterly retraining |

### 3. How I chose, in Module 5
I compared the three delivery methods against three criteria that mattered for this project:

| Criterion | Waterfall | Scrum | Hybrid |
|---|---|---|---|
| Handling technical unknowns | Low: plan obsolete on discovery | High: sprints absorb discoveries | Medium |
| Stakeholder feedback | Low: only at the end | High: every two weeks | Medium |
| Fit with how the registry works | Low | High, once adapted | Medium |
| Verdict | Rejected | **Selected (adapted)** | Rejected |

"Adapted" meant: a Sprint 0 Design Sprint first, sprint feedback recorded in Confluence for an audit trail (Schwaber and Sutherland, 2020), and existing Jira tickets kept so delivery could be measured before and after.

## Evaluating my choices
1. **"Adapted Scrum" is close to the hybrid I rejected.** My plan includes a governance sign-off gate before production (deliverable D3) and a formal mid-project review, which are plan-driven controls on an iterative core. The honest distinction is scale: a few lightweight gates, rather than a full hybrid governance framework. Be ready to explain that difference.
2. **Methods are only as good as their adoption.** The registry already calls itself Agile while working sequentially. Choosing Scrum on paper does not change that; the Sprint 0 co-design and fortnightly stakeholder reviews are what make it real.
3. **Module 7 alone shows one approach.** Test-first and characterisation-led refactoring were right for legacy code, but on their own they do not show a range. That is why this piece draws on Modules 2, 4, 5 and 6.

## Result
[EVIDENCE NEEDED: a method you actually worked within day to day, e.g. your team's sprint process, and one thing you changed about how it was run.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Principles of development methods | Action 1: five delivery methods |
| Principles of development approaches | Action 2: six engineering approaches |
| A range | 11 methods and approaches across five projects |
| Contexts where they apply | "Fits when" and "does not fit when" columns; Module 5 selection |
| Applied, not just listed | Action 3: a reasoned choice; evaluation of it |

## Assessor Notes
*Strength*: A reasoned method choice against explicit criteria, and a clear sense of when each method fails.
*Gaps*: Your day-to-day experience of a method in your real team; the K23 standard wording.
*Watch for*: "Isn't adapted Scrum just a hybrid?" Evaluation point 1 is your answer.

## References
- Dikert, K., Paasivaara, M. and Lassenius, C. (2016) 'Challenges and success factors for large-scale agile transformations', *Journal of Systems and Software*, 119, pp. 87–108.
- Feathers, M. (2004) *Working Effectively with Legacy Code*. Upper Saddle River: Prentice Hall.
- Freeman, S. and Pryce, N. (2009) *Growing Object-Oriented Software, Guided by Tests*. Boston: Addison-Wesley.
- Schwaber, K. and Sutherland, J. (2020) *The Scrum Guide*. Available at: https://scrumguides.org (Accessed: [date]).
