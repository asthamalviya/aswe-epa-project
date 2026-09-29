# K6: Lifecycle approaches and their fit with an organisation's standards and existing tools
**Assessment method**: AM2
**Module**: 5 (Multiverse Project 5: Managing Software Transformation Projects), with build and run stages from Modules 4 and 6
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Proposal for an AI knowledge search system for developers at a UK government registry
**Status**: Draft
**Related**: `../module-7/K21-evidence.md` (lifecycle scenarios), `K22-evidence.md` (techniques per stage) and `K23-evidence.md` (methods). **K6 is different**: its focus is how approaches **fit an organisation's standards and the tools it already has**. Keep that angle; do not repeat those files.

## Criterion
**KSB:** The approaches and techniques used throughout the digital and technology solution lifecycle and their applicability to an organisation's standards and pre-existing tools.
**Pass:** Explains core technical concepts for digital and technology solutions, including: the approaches and techniques used throughout the digital and technology solution lifecycle and their applicability to an organisation's standards and pre-existing tools.
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** explain the approaches and techniques used through the lifecycle, and their applicability to the organisation's standards and pre-existing tools.

> Guidance: Module 5 is well suited to K6 because it is shaped by the registry's constraints at every step: government standards, security rules, procurement, and six platforms the team already uses. Its gap is the later lifecycle: it covers build, test and run only as plans. Section 2 fills that from Modules 4 and 6, where you did fit real builds to existing tools.

## Situation
The registry's delivery team worked across six platforms (Confluence, GitHub, Slack, Notion, Miro and shared drives), with deployment pipelines split between Concourse and Jenkins and no single source of truth. The registry is subject to Government Digital Service (GDS) standards and Cabinet Office AI governance, holds security-cleared material, and buys technology through an approved procurement framework. Any solution had to work within all of this.

## Task
[EVIDENCE NEEDED: your role, in the first person.]

## Action

### 1. Each lifecycle stage, and what it had to fit (Module 5)
| Stage | Approach or technique | Organisational standard or existing tool it had to fit | How I made it fit |
|---|---|---|---|
| Initiation | Business case with cost-benefit analysis; weighted decision matrix | The registry's 2020–2025 strategy commitment to efficient digital delivery | Framed the case against the strategy; kept the additional cost to £12,100 by reusing the existing contracted team |
| Analysis | BABOK v3 framework; stakeholder interviews; BPMN process mapping; Five Whys | Jira, which already recorded every spike | Used existing Jira data as the baseline instead of asking the team to track time in a new way |
| Method | Adapted Scrum | An organisation that calls itself Agile but delivers sequentially | Adapted Scrum to that reality rather than imposing textbook Scrum; Sprint 0 co-design with pilot developers and DevOps |
| Design | Self-hosted retrieval architecture | UK GDPR residency; Cabinet Office AI governance; Technical Architects panel approval | Kept the index inside the registry's infrastructure; made the panel's ethics sign-off a release condition |
| Design | Choice of model hosting | The approved procurement framework | Chose Azure because it was already in the framework, avoiding a new procurement that could delay approval |
| Design | Indexing scope | Security-cleared repositories | Excluded them in the indexing configuration from Sprint 0, with data flows reviewed by the security team |
| Build | Index all six platforms and pipeline configurations from both Concourse and Jenkins | The platforms and pipelines already in use | Indexed where knowledge already lives rather than asking teams to move it |
| Interface | Web app **and** Slack bot | Slack as the team's existing daily workflow | Put the tool where developers already work, so adoption needs no new habit |
| Planning tools | GitHub Projects for the Kanban board; Jira kept for spikes | GitHub, already hosting the codebase; Jira, already holding the baseline | Rejected Asana and Microsoft Planner, which would have added two more tools |
| Test and evaluate | 50-query benchmark; UX testing; six-week pilot; anonymous survey | Governance evidence the Technical Architects panel needs | Produced a signed compliance document as a deliverable |
| Operate | Documentation in Confluence; risk register (ISO 31000) reviewed fortnightly | Confluence as the team's documentation home; the registry's governance cadence | Used existing channels for the audit trail rather than a new one |

### 2. Build and run stages in practice (Modules 4 and 6)
Module 5 plans these stages; my other projects did them:
- **Module 4 (data pipeline).** AWS services already existed in the organisation, so I built on them (Lambda, Glue, S3, Athena) rather than introducing a new platform, and extracted from the source database through a standardised view so the pipeline did not depend on operational table structures.
- **Module 6 (cloud service).** The team already used GitHub, so I chose GitHub Actions for continuous integration over Jenkins (needs its own server), GitLab CI (a platform migration) and AWS CodePipeline (more vendor lock-in); I chose CloudWatch over Datadog and Prometheus because it was already part of the AWS estate and added no cost.

### 3. The main principle: fit before replace
Across these projects I applied one rule: **use the tools and standards the organisation already has unless there is a clear reason not to.** Reusing Jira gave a free baseline; using Slack removed an adoption barrier; choosing Azure avoided a procurement delay; building on existing AWS avoided a new platform. The Module 5 problem was **too many disconnected tools**, so the solution indexes the existing six rather than becoming a seventh silo.

The rule has limits. It is right to replace a tool when it blocks a requirement: in Module 6, the Windows file share could not provide API access or identity-based control without middleware as complex as a new build, so it was replaced.

## Evaluating my approach
1. **The later lifecycle is planned, not done, in Module 5.** Section 2 compensates, but the assessor may ask what happened to the proposal.
2. **Fitting in can hide a problem.** Keeping Concourse and Jenkins side by side and indexing both works around the root cause (two pipeline tools). A longer-term recommendation to consolidate would show judgement about when fitting in is not enough.
3. **One claim needs care.** The report says "no data leaves CH boundary" while using GPT-4o on Azure; state the data residency terms instead (see `K19-evidence.md`).

## Result
[EVIDENCE NEEDED: what happened to the proposal, and any tool or standard decision that was later changed.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Approaches and techniques throughout the lifecycle | Section 1, initiation to operation; section 2 for build and run in practice |
| Applicability to the organisation's standards | GDS, Cabinet Office AI governance, UK GDPR, security classification, procurement, the registry's strategy |
| Applicability to pre-existing tools | Jira, Slack, GitHub, Confluence, Azure, Concourse and Jenkins, AWS |
| Judgement about applicability | Section 3: fit before replace, and its limits |

## Assessor Notes
*Strength*: Every lifecycle stage is tied to a named standard or existing tool, with a reason for fitting in or not.
*Gaps*: Module 5's later stages are plans; your role; the proposal's outcome.
*Watch for*: "When would you replace an existing tool rather than work around it?" Section 3 and evaluation point 2 give you the answer.
