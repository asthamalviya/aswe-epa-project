# S15: Apply legal, ethical, social and professional standards
**Assessment method**: AM2
**Module**: 5 (Multiverse Project 5: Managing Software Transformation Projects)
**Date of the work**: [EVIDENCE NEEDED: month and year of the proposal]
**Context**: Proposal for an AI knowledge search system (retrieval-augmented generation) for developers at a UK government registry
**Status**: Draft
**Companion piece**: `K19-evidence.md` in this folder covers **which** standards apply and **why** (the knowledge). This piece covers **how I applied them** at each stage of delivery (the skill). The two share one criterion, so read them together and avoid repeating the same paragraphs.

## Criterion
**Pass:** Applies relevant legal, ethical, social and professional standards to digital and technology solutions considering both technical and non-technical audiences and in line with organisational guidelines. (K19, S15, B1, B2)
**Distinction:** Justifies the application of relevant legal, ethical, social and professional standards to digital and technology solutions. (K19, S15)

## Situation
The registry is a government agency subject to Government Digital Service (GDS) standards and Cabinet Office AI governance. My proposed knowledge search system would index six internal platforms (Confluence, GitHub, Slack, Notion, Miro and shared drives) and answer developers' questions with a large language model. That meant standards had to be built into each delivery stage, not checked at the end.

## Task
I owned the discovery and ethics governance workstream (Sprints 1 to 2) and the core retrieval engine, including the citation layer and hallucination benchmark (Sprints 4 to 7). [EVIDENCE NEEDED: confirm, and say which of the steps below you carried out yourself versus planned for others.]

## Action: applying standards through the delivery lifecycle

| Stage | Standard | How I applied it |
|---|---|---|
| Discovery (Sprint 0 to 2) | Organisational security guidelines | Configured indexing to exclude security-cleared (SC) repositories, and put the data flow diagrams to the registry's security team for review before any content was indexed. |
| Discovery | UK GDPR, Data Protection Act 2018 | Kept the vector index self-hosted inside the registry's infrastructure. [EVIDENCE NEEDED: did you complete a DPIA screening? See Gap 1 below.] |
| Build (Sprints 4 to 7) | Professional: accuracy and quality assurance | Constrained the model to answer only from retrieved content, made source citation mandatory for every answer, and set a pre-launch benchmark of 80% or higher recall on 50 test queries, re-run monthly. |
| Build | Ethical: transparency (DSIT, 2023) | Built the citation layer so each answer shows the source platform and date, letting developers check exactly what was retrieved. |
| Release (Month 4) | Professional: governance | Made a signed compliance document from the Technical Architects panel, including AI ethics sign-off, a release condition (deliverable D3), with sponsor sign-off before production. |
| Pilot (Months 5 to 6) | Ethical: research participants | Measured developer trust through an **anonymous** pilot survey (target 4.0 out of 5) so people could criticise the tool freely. |
| Ongoing | Legal: evolving AI regulation | Added the UK AI regulatory landscape to the risk register for review at every fortnightly retrospective, with written sponsor notification within 48 hours for high-rated risks. |

[EVIDENCE NEEDED: for each row, state whether it happened, and add one concrete detail from doing it, e.g. how many repositories were excluded, what the security review changed, the actual benchmark score.]

## Action: technical and non-technical audiences
- **Technical:** the Technical Architects panel received the signed compliance document, the data flow diagrams and the benchmark results. [EVIDENCE NEEDED: confirm the format you used.]
- **Non-technical:** the project scope includes user training materials and system documentation, and every answer shows its source so users can check it without understanding the model. [EVIDENCE NEEDED: describe one thing you wrote or presented for a non-technical audience, and the reaction.]

## Result
[EVIDENCE NEEDED: which of these steps were completed, e.g. "security review approved the data flows with one change", "benchmark reached X% recall", "D3 signed in Month N". If the project did not proceed, say so and explain what you would do first if it did.]

## Justification (Distinction)
1. **Constraining answers to retrieved content, rather than letting the model answer freely.** I rated hallucination as a medium-probability, high-impact risk (score 0.45) because wrong guidance in a government system erodes developer trust and could lead to incorrect changes. Constraining the model and forcing citations reduces that risk at a mitigation cost of £300, far less than a later loss of trust.
2. **An anonymous survey, rather than named feedback.** Named feedback on a tool the team has sponsored risks biased answers. Anonymity gives a more honest trust score and protects participants.
3. **A recall benchmark before launch, rather than monitoring only in production.** A fixed 50-query benchmark gives the governance panel objective evidence before release, and repeating it monthly detects drift as documentation changes.

[EVIDENCE NEEDED: why 80% recall was the right threshold, and what you would have done if the benchmark fell short.]

## Gaps to close before the discussion
1. **Personal data in Slack and other sources.** The scope includes indexing Slack. Slack messages contain names and potentially personal opinions, so indexing them is processing personal data under UK GDPR. The proposal's "no demographic data indexed" does not cover this. The assessor is likely to ask about lawful basis, a Data Protection Impact Assessment (DPIA) screening, retention and how someone could have their messages removed. Either add these to the evidence, or explain why they did not apply. *(My flag, not in the module.)*
2. **Accessibility.** Deliverable D2 (web interface and Slack bot) includes UX testing, and as a public sector service the web interface falls under the 2018 accessibility regulations (WCAG). Adding one line on how accessibility was tested would cover the "social" standard more strongly and supports B8.
3. **Proposal versus delivery.** S15 is a skill: "applies". Without the Result section, this reads as planned application only.

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Applies legal standards | Lifecycle table: self-hosted index, regulatory monitoring; Gap 1 |
| Applies ethical standards | Lifecycle table: citation layer (transparency), anonymous survey |
| Applies social standards | Gap 2: accessibility [EVIDENCE NEEDED] |
| Applies professional standards | Lifecycle table: benchmark, constrained answers, governance sign-off |
| Technical and non-technical audiences | Audiences section |
| In line with organisational guidelines | Lifecycle table: SC exclusion, security review, GDS and Cabinet Office governance |
| Distinction: justifies the application | Justification: three choices, each against an alternative |

## Assessor Notes
*Strength*: Standards are applied at every lifecycle stage with a named control, owner and timing, which shows skill rather than knowledge alone.
*Gaps*: Personal data in Slack is the most likely probing question. Every row of the lifecycle table needs to be confirmed as done or planned.
*To reach Distinction*: Close Gap 1 with a real DPIA screening outcome, and add the benchmark threshold rationale.

## References
- Department for Science, Innovation and Technology (2023) *A pro-innovation approach to AI regulation*. London: DSIT.
- Information Commissioner's Office (no date) *Data protection impact assessments*. Available at: https://ico.org.uk (Accessed: [date]).
- The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (SI 2018/952).
- UK GDPR (Regulation (EU) 2016/679 as retained in UK law) and the Data Protection Act 2018.
