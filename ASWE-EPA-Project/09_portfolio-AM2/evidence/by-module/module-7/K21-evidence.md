# K21: Development lifecycle scenarios and the techniques used in each
**Assessment method**: AM2
**Module**: 7 (Multiverse Project 7: Software Testing and Design Patterns), with scenarios from Modules 2, 4, 5 and 6
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Five projects for a UK government registry, each following a different lifecycle
**Status**: Draft
**Related**: `K22-evidence.md` in this folder explains individual **techniques** (principle, artefact, context). This piece compares whole **scenarios**: how the lifecycle changes shape depending on the kind of project, and which techniques each stage used.

## Criterion
**KSB:** [EVIDENCE NEEDED: the K21 standard wording is not saved in the repo. Save the Multiverse K21 page and paste it here.]
**Pass:** Describes scenarios covering all stages of a development lifecycle, identifying techniques and methods are applied in each case. (K21/SEK1)
**Distinction:** None for this KSB.

> Guidance: the criterion asks for **scenarios** (plural), **all stages** and the **techniques in each**. Module 7 alone covers analysis to testing, with the later stages as a roadmap. Your portfolio as a whole covers every stage several times over, so this draft uses five of your projects as the scenarios. Its main point is that the lifecycle is not one fixed sequence: each kind of project changes the order and emphasis. That comparison is what lifts the evidence from listing stages to understanding them.

## Situation
Over my apprenticeship I worked on five kinds of project for a UK government registry: refactoring legacy code, building a new cloud service, building a data pipeline, building a machine learning model and proposing a transformation project. Each needed a different lifecycle.

## Task
[EVIDENCE NEEDED: your role across these projects, in the first person.]

## Action: five scenarios

### Scenario 1: refactoring legacy code (Module 7)
| Stage | What happened | Techniques and methods |
|---|---|---|
| Analysis | Diagnosed seven quality gaps in a 90-line pricing handler and traced them to one cause | Structured code review; technical debt assessment |
| Safety net | Locked current behaviour before changing anything, including a known pricing anomaly | 34 characterisation tests (Feathers, 2004) |
| Design | Chose four patterns and recorded each decision | Service Layer, Repository, Strategy, dependency injection; architecture decision records |
| Implementation | Split the handler into six components | Refactoring under test; SOLID principles |
| Testing | 90 tests in 0.21 seconds, 99% line and 92% branch coverage | Test pyramid; boundary value analysis; test doubles |
| Deployment and operation | Planned, not built: MVP (done), then database (2 to 3 weeks), production hardening (4 to 6 weeks), then operations | Phased roadmap with prerequisites per phase |

**What made this lifecycle different:** tests came **before** design. With no specification, the existing behaviour was the specification, so it had to be captured first.

### Scenario 2: a new cloud service (Module 6)
| Stage | What happened | Techniques and methods |
|---|---|---|
| Requirements | Audited the current state and derived 7 functional, 6 non-functional and 6 security requirements | Current-state audit; MoSCoW-style priorities; measurable NFR targets |
| Design | Compared a monolith, microservices and Lambda; chose a stateless container behind API Gateway | Options appraisal against requirements; three-tier layered architecture |
| Implementation | Built the FastAPI backend and infrastructure | Layered code; infrastructure as code (Terraform); containers (Docker) |
| Testing | 12 tests, performance benchmark, code review | pytest; negative tests; CI gates (Ruff, pytest, Docker build) |
| Deployment | EC2 behind API Gateway, configured through Terraform | Infrastructure as code; environment-specific configuration |
| Operation | Monitoring and alarms; planned adoption support | CloudWatch; failure scenario analysis; ADKAR with a four-week parallel run |

**What made this lifecycle different:** requirements came first and drove everything, and **people** were treated as a lifecycle stage: a working system nobody adopts has failed.

### Scenario 3: a data pipeline (Module 4)
| Stage | What happened | Techniques and methods |
|---|---|---|
| Analysis | Evaluated sources, storage, quality and access; gathered stakeholder priorities from six groups | Current-state evaluation; stakeholder analysis |
| Design | Compared three options; designed a five-layer pipeline | Options appraisal; layered data lake design |
| Implementation | Built ingestion, transformation and source-level controls | Lambda, Glue PySpark, PostgreSQL procedures, a catalogue with lineage |
| Testing and validation | Checked data, not only code | Data profiling before and after; audit tables; one unit test |
| Deployment and operation | Recommended a phased rollout | Phased enterprise rollout; quality monitoring and alerting (recommended) |

**What made this lifecycle different:** testing meant validating **data** as much as code. A pipeline that runs without errors can still produce wrong data.

### Scenario 4: a machine learning model (Module 2)
| Stage | What happened | Techniques and methods |
|---|---|---|
| Problem framing | Defined dissolution risk and the costly error (a missed at-risk company) | Business framing; choice of target metric |
| Data | Collected and cleaned monthly public snapshots | Data dictionary; cleaning; feature engineering; correlation analysis |
| Modelling | Compared four models | Stratified split; SMOTE on training data; model comparison |
| Evaluation | Judged by F1 and recall, not accuracy | Precision, recall, F1, confusion matrix |
| Deployment | Packaged as a risk-scoring engine returning a score and a flag | Data product design |
| Operation | Planned drift monitoring and quarterly retraining | Monitoring; retraining schedule |

**What made this lifecycle different:** it is a **loop**, not a line. Data changes over time, so operation feeds back into data and modelling through retraining.

### Scenario 5: a transformation proposal (Module 5)
| Stage | What happened | Techniques and methods |
|---|---|---|
| Initiation and business case | Diagnosed the problem and built the case | Five Whys; SWOT; PESTLE; weighted decision matrix; cost-benefit analysis |
| Analysis | Mapped current processes | BPMN; value stream mapping; stakeholder interviews; delivery records |
| Planning | Chose the delivery method and planned the work | Adapted Scrum; work breakdown structure; SMART deliverables; RACI; risk register (ISO 31000) |
| Delivery (planned) | Sprint 0 discovery, then retrieval engine, interface and governance workstreams | Sprints; co-design workshop |
| Evaluation (planned) | Six-week pilot with measured KPIs | KPI matrix; anonymous survey; 50-query benchmark |

**What made this lifecycle different:** I chose adapted Scrum over Waterfall because the AI's behaviour could not be fully planned upfront, so short sprints would surface problems early (Dikert et al., 2016).

## Comparing the scenarios
| | Legacy refactor | New cloud service | Data pipeline | ML model | Proposal |
|---|---|---|---|---|---|
| Starting point | Existing code | Requirements | Existing data | A question | A business problem |
| When testing starts | First | After building | During and after | At evaluation | At the pilot |
| Shape | Linear with a safety net | Linear, gated by CI | Linear, with data checks | Loop (retraining) | Iterative sprints |
| Biggest risk | Changing behaviour by accident | Building the wrong thing | Wrong data that looks right | Model decay | Unplannable unknowns |

The common thread: every lifecycle had the same stages, but the **order**, **emphasis** and **techniques** changed with the project's main risk.

## Evaluating my lifecycles
1. **Deployment and operation are the thinnest stages across the portfolio.** Modules 2, 4, 5 and 7 plan them; only Module 6 partly implements them. [EVIDENCE NEEDED: any work of yours that reached production and was operated, to close this gap.]
2. **Several stages are proposals.** Module 5's delivery and evaluation, and Module 4's rollout, have not happened. Say so plainly in the discussion.

## Result
[EVIDENCE NEEDED: which lifecycle you would use for your next project, and why.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Scenarios | Five scenarios from five projects |
| All stages of a lifecycle | Analysis or requirements through to operation, in each scenario |
| Techniques and methods in each | Third column of each scenario table |
| Understanding, not listing | "What made this lifecycle different"; comparison table |

## Assessor Notes
*Strength*: Five real scenarios compared side by side, showing why the lifecycle changes shape with the project.
*Gaps*: Real deployment and operation experience; your role across projects; the K21 standard wording.
*Watch for*: "Which lifecycle would you choose for a new project here, and why?" The comparison table gives you the reasoning.

## References
- Dikert, K., Paasivaara, M. and Lassenius, C. (2016) 'Challenges and success factors for large-scale agile transformations', *Journal of Systems and Software*, 119, pp. 87–108.
- Feathers, M. (2004) *Working Effectively with Legacy Code*. Upper Saddle River: Prentice Hall.
