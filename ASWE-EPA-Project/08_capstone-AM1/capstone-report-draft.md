# Capstone Report: Draft

**Project:** AI knowledge search for software delivery teams: design, build and pilot of a retrieval-augmented assistant at a UK government registry
**Follows:** `capstone-report-outline.md` (word budgets, KSBs, checklists) and the headings in `Capstone Project report template.docx`
**Status:** sections 1 to 5 drafted in prose from the proposal and the Module 5 report; sections 6 to 8 are frames to fill with real results.

> **How to read the markers**
> - `[CONFIRM]` follows a planned activity written in the past tense. Delete the marker once it happened as written; rewrite the sentence if it did not.
> - `[EVIDENCE NEEDED: …]` marks a fact only you can supply. Never fill one with an estimate.
> - Counts exclude marker text. Check with your coach whether tables count towards the 6,000. The drafted sections sit below budget on purpose: the space is for the facts behind each `[EVIDENCE NEEDED]`.
>
> **Before sharing:** confirm customer consent with your line manager (Version 1 AI Policy). The draft names the client only as "a UK government registry" and your employer as "a technology services supplier".

| Section | Budget | Prose + tables now | Status |
|---|---|---|---|
| Summary | 500 | Frame | Write last |
| 1. Introduction | 350 | 331 + 0 | Drafted |
| 2. Project Scope | 500 | 338 + 42 | Drafted |
| 3. Project Plan | 600 | 250 + 219 | Drafted |
| 4. Analysis and Problem Solving | 700 | 369 + 132 | Drafted |
| 5. Research and Findings | 800 | 481 + 54 | Drafted |
| 6. Project Outcomes | 1,750 | Frame | Fill after delivery |
| 7. Recommendations and Conclusions | 800 | Frame | Fill after delivery |

---

## Summary (500 words): frame
Write this last, in the past tense, with real results. One paragraph each:
1. **Problem:** 3 to 5 day spikes on all 8 features in 12 months; 6 needed an extra sprint.
2. **What I built and how:** retrieval-augmented assistant over Confluence and GitHub, web interface and Slack bot, adapted Scrum over six two-week sprints.
3. **Results against KPIs:** [EVIDENCE NEEDED: each KPI, including any missed].
4. **Main recommendation:** [EVIDENCE NEEDED].

---

## 1. Introduction (350 words)
**KSBs:** K1, S1, S16

I am [EVIDENCE NEEDED: job title] at a technology services supplier contracted to a UK government registry. Our delivery team of 20 people works entirely inside the registry's own infrastructure, on its machines, network and credentials. Within this project I was responsible for [EVIDENCE NEEDED: your role in one sentence, e.g. leading the design, building the retrieval engine and running the pilot].

The registry runs a microservice estate whose knowledge is spread across six platforms (Confluence, GitHub, Slack, Notion, Miro and shared drives) and two pipeline tools (Concourse and Jenkins). No single place answers the question a developer asks at the start of every feature: how does the existing service work, and what does it depend on? The team therefore opens each feature with a spike, a timeboxed investigation. Jira records for the 12 months before the project showed spikes of 3 to 5 days on all 8 features, and 6 of the 8 needed an additional sprint. Spikes and discovery consumed about a quarter of each feature's timeline.

This matters strategically. The registry's published strategy commits to digital transformation, data quality and efficient service delivery (Companies House, 2022). [EVIDENCE NEEDED: anonymisation decision; if the registry is not named, cite the strategy as "the registry's published strategy" and keep the full reference only if consent covers it.] Delivery capacity lost to rediscovering known information works directly against that commitment, and faster access to knowledge is one of the few levers that improves delivery without adding headcount (K1).

The problem was non-routine (S16). The knowledge existed, mostly held by permanent staff, but it had never been managed as an asset, and nobody owned the documentation estate as it grew. Requirements for a solution could not be fully specified in advance, because how developers would use an AI assistant, and how accurate it would be on the registry's material, could only be learnt by building and testing it.

My aims were to:
1. Reduce spike duration against the Jira baseline.
2. Answer developers' questions from the registry's own documentation, with a cited source every time, at 80% or higher accuracy on a 50-query benchmark.
3. Earn developer trust of at least 4.0 out of 5 in a 10-developer pilot.
4. Do all of this within the registry's legal, security and ethical rules.

---

## 2. Project Scope (500 words)
**KSBs:** S3, B3, K2, S16

### Project focus
The project delivered a minimum viable product in 12 weeks: a retrieval-augmented generation (RAG) assistant that indexes Confluence and GitHub, answers natural language questions only from indexed content, and cites the source platform, document and date in every answer. Developers use it through a web interface and a Slack bot, so they can ask questions without leaving their existing workflow.

The Module 5 proposal covered all six platforms over six months. I cut it to two platforms because Confluence and GitHub hold most architecture and pipeline knowledge, and because they carry the lowest data protection risk. Slack messages contain personal data, and Miro boards are largely visual and hard for a model to parse, so both moved to Phase 2 along with Notion and shared drives.

### How the focus was agreed
[EVIDENCE NEEDED: who agreed the scope and how, e.g. a scoping meeting with the Technical Architects panel and delivery manager on [date], with the decision recorded in Confluence.]

### Success measures
| KPI | Baseline | Target | Source |
|---|---|---|---|
| Spike duration | 3 to 5 days | [EVIDENCE NEEDED: agreed target] | Jira |
| Retrieval accuracy | n/a | 80% or higher on a 50-query benchmark | Benchmark |
| Developer trust | n/a | 4.0 out of 5 or higher | Anonymous survey |
| Response time | n/a | [EVIDENCE NEEDED: NFR3 target] | System logs |

### Out of scope
- Slack, Notion, Miro and shared drives (Phase 2)
- Fine-tuning a model (see Research and Findings)
- AI code review and automated testing (Phase 2)
- Security-cleared repositories, permanently

### Legal, ethical and regulatory constraints (S3, B3)
Three sets of rules shaped the design. First, UK GDPR. Restricted international transfers (Articles 44 to 49) meant any hosted model had to run in an approved UK-region service or under adequate safeguards, and I screened the project for data protection impact in week 1 [CONFIRM]. Second, the UK Government's AI regulation principles, which include transparency, fairness and accountability (DSIT, 2023). I met these through mandatory citations, by indexing no demographic data, and by giving the Technical Architects panel ownership of release approval. Third, the registry's security classification rules. Security-cleared repositories were excluded in the indexing configuration from the first sprint, and the security team reviewed the data flow diagrams [CONFIRM]. Audit logs record who asked what and which sources were returned, with content minimised.

### Acquire or build (K2)
The scope assumed a bespoke build. I tested that assumption against buying a product and doing nothing; the evaluation is in section 4.

### Assumptions
- API access to Confluence and GitHub would be granted by sprint 2 [CONFIRM].
- Ten developers would volunteer for the pilot [CONFIRM].
- The hosted model would be available in [EVIDENCE NEEDED: Azure region and data terms].

---

## 3. Project Plan (600 words)
**KSBs:** K5, S5 (Distinction: justify), K15, K3, S2, S6

### Roles and responsibilities
| Stakeholder | Role | Responsibilities |
|---|---|---|
| Me | [EVIDENCE NEEDED: title] | Design, retrieval engine, pilot, evaluation, reporting [EVIDENCE NEEDED: confirm split] |
| Technical Architects panel | Sponsor | Scope approval, ethics sign-off, release decision |
| Security and governance | Approver | Data flow review, classification rules |
| Finance and procurement | Approver | Hosted model spend |
| Supplier development team | Delivery | [EVIDENCE NEEDED: who built what, e.g. connectors] |
| Pilot developers (10) | Users | Co-design, pilot use, feedback, survey |
| Permanent registry staff | Knowledge holders | Validate answers, credited as sources |
| Delivery manager | Reporting | Jira baseline, spike tracking |

### Method (Distinction K5, S5)
I compared three delivery approaches. Waterfall fixes requirements up front, but the behaviour of a model on the registry's documentation could not be known until it was built and tested, so a fixed plan would have been obsolete by sprint 2. A full hybrid model added governance overhead out of proportion to a 12-week project. I chose Scrum, adapted in three ways: sprints of two weeks so that benchmark results could change the next sprint's backlog; a Kanban board in GitHub Projects with spike tickets left in Jira, so the baseline stayed comparable; and [EVIDENCE NEEDED: one real adaptation, e.g. shortened ceremonies for a small team]. The choice was tested in sprint [EVIDENCE NEEDED] when [EVIDENCE NEEDED: what the benchmark showed and what changed].

### Timeline
| Sprint | Weeks | Focus | Milestone |
|---|---|---|---|
| 1 | 1 to 2 | Discovery and governance: co-design workshop, data flow review, data protection screening, KPI baseline | Scope and baseline agreed |
| 2 | 3 to 4 | Ingestion: Confluence and GitHub connectors, chunking, embedding, exclusions | Index built |
| 3 | 5 to 6 | Retrieval engine: retrieval, prompts, citation layer, first benchmark | Benchmark baseline |
| 4 | 7 to 8 | Interface and governance: web interface, Slack bot, accessibility testing, ethics sign-off | Panel approval |
| 5 | 9 to 10 | Pilot with 10 developers | Pilot live |
| 6 | 11 to 12 | Evaluation: KPIs, survey, cost-benefit, Phase 2 | Pilot report |

### Cost and time estimation (K15)
I estimated time by breaking the work into five workstreams (infrastructure, ingestion, retrieval engine, interface and governance, pilot and evaluation), estimating effort per task and fitting the result to six sprints. Cost was built bottom-up from hosted model spend under a hard monthly cap, tooling, governance review, a risk reserve and 10% contingency. [EVIDENCE NEEDED: the 12-week figure. The Module 5 total of £12,100 assumed six months of model spend at £800 a month, so it does not apply unchanged to a 12-week MVP.]

### Risks and opportunities (K3, S2)
I scored risks as probability times impact and reviewed the register at every sprint retrospective. The top three were:

| Risk | Score | Mitigation |
|---|---|---|
| Model hallucination erodes developer trust | High | Answers limited to retrieved content; mandatory citations; 50-query benchmark before release |
| Permanent staff resist sharing knowledge | Medium | Framed as amplifying their expertise; two staff in the co-design workshop; sources credited in answers |
| Security-cleared material indexed by mistake | Low probability, high impact | Excluded in configuration from sprint 1; security review of data flows |

Cutting Miro from scope retired the highest-scoring Module 5 risk, that boards would not be machine readable. The main opportunity was reuse: designing for extensibility so Phase 2 could add sources without rework. [EVIDENCE NEEDED: which risk materialised; see section 6.]

### Communication and collaboration
The panel received a monthly update led by KPI data; sprint reviews were open demos where the system answered real developer questions; permanent staff heard weekly through their existing Slack channel; and a Confluence page fed from Jira showed spike duration between meetings [CONFIRM].

---

## 4. Analysis and Problem Solving (700 words)
**KSBs:** S1 (Distinction: justify technology per role), S18 (Distinction: justify methods), K4, K2

### How I analysed the problem (Distinction S18)
I chose each method for a specific question.

- **Five Whys** to find the root cause, because the symptom (long spikes) was visible but its cause was not. It led from fragmented documentation, through platforms adopted independently, to the root cause: nobody had ever managed the registry's knowledge as a structured asset.
- **BPMN process mapping with value stream mapping** to measure where time went. Mapping a typical developer query found an average of seven manual steps and four platform switches, which gave a baseline beyond spike length. I considered use case modelling here and kept it for design, because it describes a future system better than it diagnoses a fragmented current process.
- **PESTLE**, with SWOT as a summary, because a government AI deployment is shaped by external forces (regulation, procurement, public sector budgets) that SWOT handles less systematically.
- **MoSCoW** to hold scope, because pressure to add capability is constant in AI projects. I rejected the Kano model because it needs extensive user research suited to consumer products.
- **Mendelow's matrix with the salience model** for stakeholders, because salience adds urgency, which mattered given procurement timelines.

The limit of this analysis was that it relied on Jira data and interviews from one team; [EVIDENCE NEEDED: how many interviews, and with whom].

### Options and the business case (K2, K4)
I compared three options using a weighted decision matrix.

| Criterion | Weight | Do nothing | Off-the-shelf (e.g. Glean, Guru) | Bespoke RAG |
|---|---|---|---|---|
| Cost to the registry | 30% | 0 | 4 | 9 |
| UK GDPR compliance | 25% | 5 | 3 | 10 |
| Solves root cause | 25% | 0 | 6 | 10 |
| Speed of delivery | 20% | 10 | 7 | 7 |
| **Weighted score** | | **3.25** | **4.85** | **9.10** |

*Scores from the Module 5 matrix, with totals recalculated (the original totals were wrong; the ranking is unchanged). [EVIDENCE NEEDED: re-score for the 12-week, two-platform MVP, which should raise bespoke speed of delivery.]*

Off-the-shelf products offered fast enterprise search, but they process the registry's content on third-party infrastructure, which would have needed a legal assessment longer than the project. Doing nothing scored well only on speed. The bespoke build kept data inside approved infrastructure and could be designed around citations from the start (K2).

I then used cost-benefit analysis over business impact analysis, because the decision needed a financial case for a public sector investment, and business impact analysis is stronger at mapping dependencies than at pricing waste. [EVIDENCE NEEDED: recalculated costs and benefits from the Jira baseline.]

**Evaluating these techniques (K4).** The matrix made the trade-offs explicit, but its weights are judgements: a 5% shift from compliance to speed narrows the gap between options. I reduced this by [EVIDENCE NEEDED: e.g. agreeing weights with the panel]. Cost-benefit analysis is only as good as its inputs: the Module 5 version double-counted waste and assumed all 20 team members were blocked by every spike. Recalculating from Jira records per feature made the case smaller but defensible.

### Technology for each role (Distinction S1)
| Role | Choice | Alternative | Why |
|---|---|---|---|
| Vector store | ChromaDB, self-hosted | Pinecone, Weaviate Cloud | Inside the registry's infrastructure, no licence cost |
| Main model | [EVIDENCE NEEDED: confirm default] GPT-4o via Azure OpenAI | Claude, Gemini, Llama 3 | Already in the procurement framework; hard spending cap |
| Fallback model | Llama 3.1 8B | GPT-3.5, Mistral | No API cost; removes dependence on one supplier |
| Interface | Web app and Slack bot | Web app only | Developers ask where they already work, which supports adoption |
| Tracking | GitHub Projects and Jira | Asana, Planner | Jira already held the spike baseline |

### Challenges during delivery
[EVIDENCE NEEDED: two real challenges and how you handled them, e.g. API access, documentation quality, early benchmark accuracy.]

---

## 5. Research and Findings (800 words)
**KSBs:** S14, K18, S13 (Distinction: compare and contrast), S17 (Distinction: evaluate)

### How I researched (K18)
I searched [EVIDENCE NEEDED: e.g. Google Scholar, arXiv, vendor documentation, GOV.UK guidance] for three questions: which architecture answers questions reliably from a changing document base; how to host it within UK data rules; and what makes developers trust an AI tool. I preferred peer-reviewed surveys and primary government guidance over vendor material, and treated vendor claims as hypotheses to test in the benchmark. I checked every source against the claim it supports; two claims from the Module 5 report did not survive that check and are not repeated here [CONFIRM after checking Xia et al., 2017, and Peng et al., 2023].

### Retrieval or fine-tuning (S14)
Two families of technique can make a language model answer from an organisation's own knowledge. Fine-tuning changes the model's weights using that knowledge. Retrieval-augmented generation leaves the model unchanged and supplies relevant passages at question time (Lewis et al., 2020). Gao et al.'s (2023) survey sets out the trade-offs that mattered here: fine-tuning needs significant compute, must be repeated as content changes, and gives no trace of where an answer came from; retrieval updates when the index refreshes and can point to its sources. The registry's documentation changes weekly, and the Technical Architects panel needed to see where answers came from, so retrieval suited the problem better.

### Compared with alternatives (Distinction K18, S13)
| Criterion | Retrieval (chosen) | Fine-tuning | Knowledge graph | Keyword federation |
|---|---|---|---|---|
| Uses latest content | Yes, on re-index | No, needs retraining | Yes, if curated | Yes |
| Cites sources | Yes, by design | No | Partly | Yes |
| Handles questions phrased differently from the documents | Yes, semantic search | Yes | Limited to modelled relations | No |
| Effort for a 12-week MVP | Medium | High | High | Low |

A knowledge graph was the contrarian option. Graphs represent relationships between services precisely (Hogan et al., 2021), which suits dependency questions, but they need manual curation that does not scale to free-text Confluence pages and code. Keyword federation across platforms was cheapest, but it fails when a developer's wording differs from the document's, which is common for questions about unfamiliar services. [EVIDENCE NEEDED: a source for vocabulary mismatch in developer search, replacing the Xia et al. claim.] Retrieval combined the strengths that mattered: current content, citations and semantic matching.

### Hosting and data residency
Self-hosting an open model kept all processing inside the registry's infrastructure but gave weaker answers on complex questions; a hosted model in a UK region gave stronger answers under the registry's procurement framework. I used the hosted model as [EVIDENCE NEEDED: default or fallback] with the open-source model as [EVIDENCE NEEDED], and a hard monthly spending cap. [EVIDENCE NEEDED: Azure region and data processing terms, confirmed with security.]

### Developer trust
Surveys show developers are sceptical about the accuracy of AI tools (Stack Overflow, 2024) [EVIDENCE NEEDED: quote the specific figure from the survey]. This finding made citations a requirement and not a feature: if a developer can see the source, they can judge the answer themselves. It also shaped the trust KPI and the co-design workshop, which put pilot developers into the design from sprint 1.

### Tools, standards and ways of working I had to fit
The solution had to run on the registry's infrastructure and network, follow its security classification rules and coding standards, and integrate with Confluence, GitHub, Jira and Slack, which the team already used. [EVIDENCE NEEDED: registry standards you followed, e.g. GDS service standard points, accessibility requirements, code review rules; see `09_portfolio-AM2/evidence/by-module/module-5/K6-evidence.md`.]

### Recommended solution and its evaluation (Distinction S17)
I recommended a retrieval-augmented assistant with mandatory citations, a self-hosted vector store and a replaceable model provider. Its main weakness, accepted knowingly, was dependence on documentation quality: retrieval cannot cite what was never written down, and outdated pages produce confident, outdated answers. I contained this by showing the document date in every citation, and [EVIDENCE NEEDED: what the pilot showed about this weakness]. A second weakness was reliance on a hosted model; the open-source fallback limited that exposure.

---

## 6. Project Outcomes (1,750 words): frame
Write in the past tense, first person, referring to appendices. For each subsection: what you did, why, and the artefact that proves it.

### 6.1 Planning and Analysis (250)
- Who the system serves: developers starting a feature, new joiners, knowledge holders, the panel, the delivery manager (from the five user stories).
- Use case diagram: Appendix F.
- Opening: "I designed the system for five groups of users, shown in the use case diagram (Appendix F)."

### 6.2 Design (400): K27, K25, S19
- Architecture and sequence diagram: question, retrieval, generation, cited answer (Appendix F).
- Pattern and why: e.g. a replaceable model provider, so switching to the fallback is a configuration change.
- Wireframes; how the design meets WCAG 2.2 AA.
- [EVIDENCE NEEDED: as-built design and any change from the plan.]

### 6.3 Implementation (450): S19, K26, K25, S6
- Two or three short snippets (Appendix G): ingestion with exclusions, retrieval with citations, Slack handler.
- Coding standards, linting and code review process.
- A sample API request and response.
- Deviations from plan and how you resolved them (S6): [EVIDENCE NEEDED].

### 6.4 Testing (350): K25 (Distinction: evaluate impact), K27
- Test types, framework, coverage (Appendix H).
- Benchmark method and results by sprint.
- Hallucination, citation, accessibility and security checks.
- Distinction sentence: "The benchmark had the greatest impact on quality because [EVIDENCE NEEDED]; [control] had less because [EVIDENCE NEEDED]."

### 6.5 Deployment (150): K26, S19
- Environment, pipeline, and how the registry's infrastructure constraints shaped deployment: [EVIDENCE NEEDED].

### 6.6 Maintenance (150): K25, S6
- Index refresh schedule, benchmark re-runs, cost and usage monitoring, model updates, owner after handover: [EVIDENCE NEEDED].

---

## 7. Recommendations and Conclusions (800 words): frame
**KSBs:** S22 (Distinction: compare and contrast), S17 (Distinction: evaluate in hindsight), K25, K17, S13, B5

1. **Results against every KPI (200):** table with baseline, target, result and met or not. State any missed KPI first and explain it (B5).
2. **What worked and what did not (200):** across approach, method, analysis and outcome.
3. **Compared with alternatives (150, Distinction S22):** "Compared with an off-the-shelf product, my build [EVIDENCE NEEDED]. A keyword search would have [EVIDENCE NEEDED]."
4. **What I would change (100):** one technical and one process change, each with a reason.
5. **Phase 2 recommendations (100):** remaining four platforms in priority order; data protection impact assessment before indexing Slack; [EVIDENCE NEEDED].
6. **Strategic implications (50):** released delivery capacity, onboarding, link to the registry's strategy.

---

## References (not counted)
Check each entry supports the claim it is cited for, and add access dates.

- Companies House (2022) *Companies House strategy 2020 to 2025*. Available at: https://www.gov.uk/government/publications/companies-house-strategy-2020-to-2025 (Accessed: [date]). [Keep only if consent allows the registry to be identified.]
- Department for Science, Innovation and Technology (2023) *A pro-innovation approach to AI regulation*. London: HMSO.
- Gao, Y. et al. (2023) 'Retrieval-augmented generation for large language models: a survey', *arXiv preprint* arXiv:2312.10997.
- Hogan, A. et al. (2021) 'Knowledge graphs', *ACM Computing Surveys*, 54(4), pp. 1–37.
- Lewis, P. et al. (2020) 'Retrieval-augmented generation for knowledge-intensive NLP tasks', *Advances in Neural Information Processing Systems*, 33, pp. 9459–9474.
- Stack Overflow (2024) *2024 Developer Survey*. Available at: https://survey.stackoverflow.co/2024/ (Accessed: [date]).
- [EVIDENCE NEEDED: methods sources you cite, e.g. Poppendieck and Poppendieck (2003) for value stream mapping, Mitchell et al. (1997) for salience, Kepner and Tregoe (1965) for the decision matrix.]

---

## Notes for you (delete before submitting)
- **Spike figures.** Module 5 also says "at least 10 [spikes] extending to a full week" across 8 features. That only works if features had more than one spike. Check Jira before using it; the draft uses only "3 to 5 days on all 8 features".
- **Your role.** Module 5 assigned workstreams to senior developers, a BA, a PM and QA. The assessor grades what you did, so section 3's roles table must show your part honestly.
- **Default model.** Module 5 contradicts itself (PESTLE says Llama is default; the architecture table says GPT-4o). Decide, and keep the report, slides and Q&A consistent.
- **Deck alignment.** The slide 4 matrix placeholder can now use the recalculated scores above once re-scored for the MVP.
