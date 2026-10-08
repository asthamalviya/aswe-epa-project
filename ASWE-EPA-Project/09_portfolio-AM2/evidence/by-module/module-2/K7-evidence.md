# K7: Roles, functions and activities in digital technology solutions
**Assessment method**: AM2
**Module**: 2 (Multiverse Project 4: Integrating Machine Learning and AI to Drive Business Value), with examples from Modules 4, 5 and 7
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Delivery teams and business functions at a UK government registry
**Status**: Draft

## Criterion
**KSB:** The roles, functions and activities within digital technology solutions within an organisation.
**Pass:** Reviews the roles, functions and activities relevant to technology solutions within an organisation.
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** review the roles, functions and activities within digital technology solutions in an organisation; relate this to suggesting and applying different design approaches and patterns, including bespoke versus off-the-shelf solutions; discuss how solutions can be reused across scenarios.

> Guidance: the gap analysis found every module **names** roles but none **reviews** them, and none compares bespoke with off-the-shelf except Module 5. "Review" means saying what each role contributes, where roles overlap or leave gaps, and how that shaped the solution. This draft does that across four projects.

## Situation
Every solution I worked on involved three layers of people: the **delivery roles** who build it, the **business functions** who use it, and the **governance functions** who approve it. Getting the solution right meant understanding all three.

## Task
[EVIDENCE NEEDED: your own role in each project, in the first person.]

## Action

### 1. Delivery roles (Module 2)
| Role | Activities | What the solution would lack without it |
|---|---|---|
| ML engineer (lead) | Model development, preprocessing, feature selection, performance evaluation | A working, evaluated model |
| Data analyst | Exploratory analysis, cleaning, visualisation, trend reporting | Understanding of the data before modelling |
| Business analyst | Defined the problem, gathered requirements, interpreted risk metrics in business terms | A model that answers the right question |
| Compliance officer | Reviewed legal, ethical and data protection issues | Assurance that the model could be used lawfully |
| Project manager | Tracked progress, coordinated milestones, kept stakeholders informed | Delivery on time and visible progress |

**Review.** The split worked because each role owned one risk: technical (ML engineer), data (analyst), relevance (business analyst), legal (compliance) and delivery (project manager). Two gaps show up in hindsight: no one owned **deployment and operation** (monitoring and retraining were planned but unowned), and no one represented the **end user** directly. [EVIDENCE NEEDED: which role was yours, and whether you agree with these gaps.]

### 2. Business functions as users (Modules 2 and 4)
- **Module 2.** The same risk model serves different functions in different ways: compliance and risk teams use it as an early warning to prioritise checks and support know-your-customer processes; investment and partnership teams use it to assess a business's health before engaging.
- **Module 4.** Six groups depended on the data pipeline for different reasons: Registrar Services (faster investigative access), Analysis and Insights (near real-time analysis), Digital Services (the platform), Data Governance and Compliance (lineage and auditability), Casework Operations (self-service access) and Senior Leadership (value and risk).

**Review.** Designing for several functions at once changed the design: in Module 4 it is why the pipeline has a curated layer with SQL access for non-specialists and a separate audit trail for governance.

### 3. Governance functions (Module 5)
A RACI matrix set out who is **responsible**, **accountable**, **consulted** and **informed** for project approval and the four deliverables. It covers eight parties: me (named as responsible and accountable for the deliverables), the delivery team, the Technical Architects panel (sponsor, owning governance and the AI ethics sign-off), Finance, the registry's permanent staff, my employer's delivery director, the security team and end users. [EVIDENCE NEEDED: the extracted table is jumbled; check each assignment against Table 21 in the report before quoting it.]

**Review.** Naming myself as both responsible and accountable for every deliverable concentrates risk in one person; a stronger design would make the sponsor accountable and me responsible. End users are only consulted or informed throughout.

### 4. Bespoke or off-the-shelf (Module 5)
| Option | Strengths | Why rejected or chosen |
|---|---|---|
| Do nothing | No cost | Rejected: the waste continues |
| Off-the-shelf (Glean, Guru) | Fast to adopt; supported product | Rejected: data processed by a third party, which conflicts with UK data residency and would need a full data protection assessment; generic search, not the registry's specific knowledge; per-seat licensing |
| Bespoke retrieval system | Runs inside the registry; tuned to its platforms and pipelines | Chosen, at £12,100 additional cost |

**The general principle.** Off-the-shelf fits when the need is common and the data can leave the organisation; bespoke fits when the need is specific or the data cannot leave. In this case data residency decided it. [EVIDENCE NEEDED: correct the decision matrix totals before citing scores; see the fix list.]

### 5. Reuse across scenarios
- **Module 2.** One risk-scoring engine serves compliance, due diligence and partnership decisions, because it returns a general score (0 to 1) and a flag that each function applies with its own threshold.
- **Module 5.** The knowledge search engine is designed to extend to other contractor teams in Phase 2, and later to code review and testing, without redesign.
- **Module 7.** The Strategy pattern makes each pricing rule a replaceable component, so a new plan or regional tax rule can be added without changing the service around it; the Repository pattern lets the same pricing logic run against files today and a database later.

## Evaluating my review
1. **Roles were described in the original reports, not reviewed.** This draft adds the review; check it matches your real experience.
2. **The end user is the most often missing role.** In Modules 2 and 5, end users are consulted or informed, not responsible for anything. A user representative with a defined role would reduce adoption risk.

## Result
[EVIDENCE NEEDED: one example where understanding a role or function changed what you built.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Reviews roles | Action 1, with gaps identified |
| Reviews functions | Action 2 |
| Reviews activities | Actions 1 and 3 |
| Bespoke versus off-the-shelf | Action 4 |
| Reuse across scenarios | Action 5 |

## Assessor Notes
*Strength*: Roles are reviewed for what they contribute and what is missing, across delivery, business and governance.
*Gaps*: Your own role in each team; one example of a role changing the solution.
*Watch for*: "Which role was missing from your team, and what did it cost?" Evaluation point 2.
