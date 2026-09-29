# Capstone Project Proposal: Draft

> Draft in markdown, following `Capstone Project proposal template.docx`. Once final, copy it into the Word template and share it with your coach before Gateway. The project summary must be **500 words at most** (brief, Gateway requirement 5).
>
> **Before sharing:** this project is for a customer. Confirm with your line manager that the registry agrees to the project being used for your EPA and to its details appearing in the proposal, report and presentation (Version 1 AI Policy and customer consent). The draft uses "a UK government registry"; replace it with the real name only if that is agreed.

---

## Apprentice details
| Field | Entry |
|---|---|
| Apprentice name | [EVIDENCE NEEDED] |
| Preferred pronouns | [EVIDENCE NEEDED] |
| Email for qualification | [EVIDENCE NEEDED] |
| Apprenticeship start date | [dd/mm/yy] |

## Timeframes
| Field | Entry |
|---|---|
| Dates unavailable | [EVIDENCE NEEDED] |
| Reasonable adjustments | [EVIDENCE NEEDED, or "None"] |
| Target submission date | [EVIDENCE NEEDED: by week 12 of the EPA period] |

---

## Project title
**AI knowledge search for software delivery teams: design, build and pilot of a retrieval-augmented assistant at a UK government registry**

## Project summary (493 words)

**Scope.** Developers on the registry's delivery team lose time at the start of every feature working out how existing services fit together, because knowledge is split across six platforms and two pipeline tools. Over the last 12 months, every one of 8 features began with a 3 to 5 day investigation spike, and 6 needed an extra sprint. I will design, build and pilot a retrieval-augmented generation (RAG) assistant that answers developers' questions from the registry's own documentation, citing its source for every answer. The minimum viable product indexes the two highest-value sources first (Confluence and GitHub), runs inside the registry's infrastructure and is used through a web interface and a Slack bot. Out of scope: fine-tuning a model, AI code review and security-cleared material.

**Business impact.** The registry's strategy commits to efficient digital delivery, and spikes consume about a quarter of each feature's timeline. Shortening them releases delivery capacity for about £12,100 of additional cost (S1, K1, K4). Success is measured against a Jira baseline: spike duration, answer accuracy on a 50-query benchmark (target 80% or higher) and developer trust (target 4.0 out of 5).

**Implementation plan (12 weeks, six two-week sprints).**
1. **Weeks 1 to 2, discovery and governance:** co-design workshop with pilot developers, data flow review with security, data protection screening, KPI baseline (S3, B3, K3, S2).
2. **Weeks 3 to 4, ingestion:** Confluence and GitHub connectors, chunking and embedding, exclusion of restricted repositories (S19, K26).
3. **Weeks 5 to 6, retrieval engine:** retrieval, prompt design, citation layer, benchmark (S18, K25, K27).
4. **Weeks 7 to 8, interface and governance:** web interface and Slack bot, accessibility testing, ethics sign-off by the Technical Architects panel (S19, K25, B3).
5. **Weeks 9 to 10, pilot:** 10 developers, monitoring and feedback (S6, K5, S5).
6. **Weeks 11 to 12, evaluation:** KPIs, survey, cost-benefit, lessons and Phase 2 recommendations (K18, S13, S22).

**How the KSBs will be met.** The business case compares doing nothing, an off-the-shelf product and a bespoke build (K2, S17). The problem is non-routine: the knowledge exists but cannot be found, and requirements will emerge through the pilot (S16). Risks and opportunities are tracked in a register reviewed each sprint (K3, S2). Cost and time are estimated through a work breakdown structure and sprint plan (K15). Delivery uses adapted Scrum, because AI behaviour cannot be fully planned in advance (K5, S5, S6). Research into RAG, open-source models and developer trust informs the design (S14, K18). Quality is controlled through the benchmark, mandatory citations, testing and code review (K25). The design is documented through use case and sequence diagrams, architecture decisions and tests (K27). Reporting is tailored to each stakeholder group (K17, S13, B5). I will evaluate the outcome against alternatives and record lessons (S22). UK GDPR, the government's AI principles and the registry's security rules shape every stage (S3, B3).

---

## Stakeholder specification

### User stories
1. As a **developer starting a feature**, I want to ask how an existing service works and get an answer with its source, so that I can start building without a multi-day spike.
2. As a **new joiner**, I want to find pipeline and dependency information myself, so that I do not depend on senior colleagues for weeks.
3. As a **knowledge holder (permanent staff)**, I want my documentation credited in answers, so that my expertise is visible rather than replaced.
4. As the **Technical Architects panel**, I want evidence of accuracy, data handling and ethics before release, so that I can approve the tool responsibly.
5. As the **delivery manager**, I want spike duration tracked against the Jira baseline, so that I can see whether the tool saves time.

### Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| FR1 | Index Confluence and GitHub content, excluding restricted repositories | Must |
| FR2 | Answer natural language questions from indexed content only | Must |
| FR3 | Cite the source platform, document and date in every answer | Must |
| FR4 | Provide a web interface and a Slack bot | Must |
| FR5 | Record user feedback on answer quality | Should |
| FR6 | Dashboard of spike duration against baseline | Should |
| FR7 | Index Slack, Notion, Miro and shared drives | Could (Phase 2) |

### Non-functional requirements
| ID | Requirement | Measure |
|---|---|---|
| NFR1 | Accuracy | 80% or higher recall on a 50-query benchmark |
| NFR2 | Trust | Developer trust score of 4.0 out of 5 or higher (anonymous survey) |
| NFR3 | Response time | [EVIDENCE NEEDED: set a target, e.g. P95 under 10 seconds] |
| NFR4 | Data residency | All indexed content and processing within the registry's infrastructure or an approved UK-region service |
| NFR5 | Accessibility | Web interface meets WCAG 2.2 AA |
| NFR6 | Cost | Hosted model spending capped; open-source fallback model available |
| NFR7 | Auditability | Every question logged with user, time and sources, with content minimised |

---

## Research needs
1. **RAG design:** chunking, embedding models and retrieval evaluation (e.g. Gao et al., 2023, and current practice).
2. **Hosting and data residency:** UK-region options for hosted models under the registry's procurement framework, and self-hosted alternatives.
3. **Evaluation methods:** building a representative benchmark; measuring hallucination and retrieval accuracy.
4. **Developer trust and adoption:** evidence on what makes developers trust AI tools; adoption approaches (e.g. ADKAR).
5. **Regulation and ethics:** UK GDPR (including data protection impact assessment requirements for indexing messages that contain personal data), the government's AI principles and the registry's security classification rules.
6. **Knowledge management:** research on knowledge debt and developer information-seeking. Check each source supports the claim it is cited for (see the Module 5 fix list items on Xia et al. and Peng et al.).

---

## Notes for you (delete before submitting)
- **Changes from Module 5.** The six-month plan is cut to a 12-week MVP because the capstone runs in the final three months. Scope is reduced to two platforms first; the other four move to Phase 2.
- **Figures not reused.** The Module 5 waste and ROI totals (£592,000, £296,000) do not reconcile (see the fix list). Recalculate from the Jira baseline before quoting any savings.
- **Data protection.** Indexing Slack in Phase 2 means processing personal data; plan the data protection screening in week 1.
- **Employer declaration.** The report needs a line manager declaration, so agree the project and your role with your manager now.
- **Word count.** The summary is 493 words, counting KSB tags; recount after edits (limit 500).
