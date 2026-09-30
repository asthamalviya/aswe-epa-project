# Capstone Presentation Outline (AM1)

**Project:** AI knowledge search for software delivery teams at a UK government registry (see `../01_capstone-AM1/capstone-proposal-draft.md`)
**Format:** 30-minute presentation, then 30 minutes of questions, with up to 10% buffer. Assessed against the 25 AM1 KSBs only; AM2 KSBs belong to the portfolio discussion.
**Target:** 11 slides in 27 minutes, leaving 3 minutes of spare time before the buffer. Rehearse to 27; nerves usually add time.
**Brief requires:** project overview; scope including KPIs; summary of actions undertaken; outcomes and how they were achieved; strategic recommendations. Slides 1 and 2 cover the overview, 3 the scope, 4 to 6 and 9 the actions, 7, 8 and 10 the outcomes, and 11 the recommendations.

> **How to use this outline.** The presentation happens after the report is submitted, so the assessor has already read it. Use the slides to show judgement: why you chose each option, what you compared it with and what you would change. Every slide marked **Distinction** needs one explicit "I chose X over Y because Z" sentence. Results do not exist yet: every `[EVIDENCE NEEDED]` must be filled from the pilot, never estimated.

---

## Timing plan

| # | Slide | Minutes | Running total | Brief area | Report section |
|---|---|---|---|---|---|
| 1 | Title and overview | 2 | 2 | Overview | Summary |
| 2 | The business problem | 3 | 5 | Overview | Introduction |
| 3 | Scope, KPIs and constraints | 2.5 | 7.5 | Scope and KPIs | Project Scope |
| 4 | Options and business case | 2.5 | 10 | Actions | Analysis and Problem Solving |
| 5 | Plan and delivery method | 2.5 | 12.5 | Actions | Project Plan |
| 6 | Research and solution choice | 2.5 | 15 | Actions | Research and Findings |
| 7 | What I built | 3 | 18 | Outcomes | Project Outcomes: Design, Implementation, Deployment |
| 8 | Quality and testing | 2.5 | 20.5 | Outcomes | Project Outcomes: Testing |
| 9 | Managing delivery | 1.5 | 22 | Actions | Project Outcomes: Implementation, Maintenance |
| 10 | Results against KPIs | 2 | 24 | Outcomes | Recommendations and Conclusions |
| 11 | Evaluation and recommendations | 3 | 27 | Recommendations | Recommendations and Conclusions |
| | Backup slides (shown only if asked) | | | | Appendices |

---

## Slide 1: Title and overview (2 min)
**Key message:** I built and piloted an AI assistant that answers developers' questions from the registry's own documentation, with a source cited in every answer.

**Content**
- Title, your name, date, "Advanced Software Engineering Apprenticeship: Capstone Project"
- One-line problem: developers lose 3 to 5 days at the start of every feature finding out how existing services fit together
- One-line outcome: [EVIDENCE NEEDED: headline result, e.g. spike duration before and after the pilot]
- Your role in one sentence, first person

**Visual:** single screenshot of the assistant answering a question with its citation.
**KSBs:** K17 (overview for a mixed audience).

**Talking points**
- "I am [role] on the registry's delivery team. Over the last 12 months, all 8 features we started began with a 3 to 5 day investigation spike, and 6 needed an extra sprint."
- "Over 12 weeks I designed, built and piloted a retrieval-augmented assistant with 10 developers. [EVIDENCE NEEDED: result in one sentence]."

---

## Slide 2: The business problem (3 min)
**Key message:** the knowledge exists but cannot be found, and that costs the registry delivery capacity.

**Content**
- Where knowledge sits: six platforms and two pipeline tools
- Baseline from Jira: spike length and extra sprints across 8 features
- Why it matters strategically: the registry's commitment to efficient digital delivery; spikes take about a quarter of each feature's timeline
- Why the problem is non-routine: no single owner, requirements unclear at the start and expected to emerge through the pilot
- Who is affected: developers, new joiners, knowledge holders, delivery manager

**Visual:** value stream map or BPMN of a feature start, with the spike highlighted and its duration labelled.
**KSBs:** S1 (analyse the business problem), K1 (technology and competitive advantage), S16 (non-routine, incompletely defined problem).

**Talking points**
- How you found the root cause (Five Whys): [EVIDENCE NEEDED: the chain you actually followed]
- One quote or example from a developer interview: [EVIDENCE NEEDED]
- Avoid the Module 5 waste and ROI totals (£592,000, £296,000); they do not reconcile. Use only figures recalculated from the Jira baseline.

---

## Slide 3: Scope, KPIs and constraints (2.5 min)
**Key message:** a deliberately narrow MVP with measurable success criteria, agreed with stakeholders and bounded by law and security rules.

**Content**
- In scope: Confluence and GitHub indexing, retrieval with citations, web interface and Slack bot, 10-developer pilot
- Out of scope, with reasons: other four platforms (Phase 2), fine-tuning, AI code review, restricted repositories
- KPI table:

| KPI | Baseline | Target | Source |
|---|---|---|---|
| Spike duration | 3 to 5 days | [EVIDENCE NEEDED: agreed target] | Jira |
| Retrieval accuracy | n/a | 80% or higher on 50-query benchmark | Benchmark |
| Developer trust | n/a | 4.0 out of 5 or higher | Anonymous survey |
| Response time | n/a | [EVIDENCE NEEDED: NFR3 target] | Logs |

- Constraints: UK GDPR and data protection screening; the government's AI principles; the registry's security classification rules; data kept in the registry's infrastructure or an approved UK-region service
- How scope was agreed and with whom: [EVIDENCE NEEDED]

**Visual:** the KPI table above; a small in/out-of-scope diagram.
**KSBs:** S3, B3 (legal, ethical and regulatory requirements; protecting personal data and security), S16 (defining the problem precisely).

**Talking points**
- Why two platforms first: highest value and lowest data protection risk. Slack holds personal data, so it waits for Phase 2 and a data protection impact assessment.
- One example of how an ethical or legal requirement changed the design: mandatory citations, exclusion of restricted repositories, content minimisation in audit logs.

---

## Slide 4: Options and business case (2.5 min)
**Key message:** I compared three options on evidence, and data residency decided the choice. **Distinction: S1, S18.**

**Content**
- Options: do nothing; off-the-shelf product (e.g. Glean, Guru); bespoke build
- Decision method: weighted decision matrix and cost-benefit analysis
- Criteria and weights: [EVIDENCE NEEDED: recalculated matrix; the Module 5 totals do not add up]
- Cost of the chosen option: [EVIDENCE NEEDED: confirm or replace the £12,100 estimate before quoting it]
- The technology chosen for each role: retrieval, vector store, model, interface, and why each fits the users who need it

**Visual:** decision matrix with the winning scores highlighted.
**KSBs:** K2 (acquire versus build), K4 (business case techniques), S1 (Distinction: justify the technology for each role), S18 (Distinction: justify the analysis methods).

**Talking points**
- S18 Distinction sentence: "I used Five Whys for root cause and value stream mapping for where time went, because the problem was about lost time across a process, not a single fault. I considered a survey alone and rejected it because [EVIDENCE NEEDED]."
- K4 evaluation: one limit of the decision matrix (weights are subjective) and how you reduced it (e.g. weights agreed with stakeholders).

---

## Slide 5: Plan and delivery method (2.5 min)
**Key message:** adapted Scrum suited a problem where AI behaviour could not be planned in advance. **Distinction: K5, S5.**

**Content**
- Six two-week sprints: discovery and governance; ingestion; retrieval engine; interface and governance; pilot; evaluation
- Why adapted Scrum over Waterfall and a hybrid: benchmark results each sprint changed what came next
- How cost and time were estimated: work breakdown structure and effort estimates per sprint
- Top three risks with mitigations, and one opportunity
- Tools: Jira, Confluence, GitHub and [EVIDENCE NEEDED: tools actually used]
- Stakeholders and communication: pilot developers, Technical Architects panel, security, Finance, delivery manager, your manager

**Visual:** sprint timeline with milestones; small risk heat map.
**KSBs:** K5, S5 (Distinction: justify processes and methods), K15 (cost and time estimation), K3, S2 (risks, mitigations and opportunities).

**Talking points**
- K5, S5 Distinction sentence: "I chose adapted Scrum over Waterfall because [EVIDENCE NEEDED: e.g. sprint 3 benchmark results changed the chunking approach]. I adapted it by [EVIDENCE NEEDED: e.g. shorter ceremonies for a solo developer]."
- Name the risk that actually materialised and point to slide 9.

---

## Slide 6: Research and solution choice (2.5 min)
**Key message:** research led me to retrieval with mandatory citations, and I can show what I compared it with. **Distinction: K18, S13, S17.**

**Content**
- How I researched: sources searched, how I judged them
- Retrieval (RAG) versus fine-tuning: cost, freshness of content, traceability of answers
- Knowledge graph as the contrarian option, and why not for an MVP
- Hosted versus open-source models: data residency, cost cap, fallback model
- Developer trust research behind mandatory citations
- Registry tools and standards the solution had to fit

**Visual:** comparison table of chosen solution against two alternatives on three or four criteria.
**KSBs:** S14 (innovative technologies), K18, S13 (Distinction: compare and contrast with alternatives from research), S17 (recommend a solution; Distinction: evaluate the choice).

**Talking points**
- Cite two or three sources by name. Check each supports the claim (see the fix list items on Xia et al. and Peng et al.).
- S17 evaluation: one weakness of the chosen solution you accepted knowingly, and how you contained it.

---

## Slide 7: What I built (3 min)
**Key message:** a working system inside the registry's infrastructure, built with standard engineering practice.

**Content**
- Architecture: connectors, chunking and embedding, vector store, retrieval, generation with citation layer, web interface, Slack bot
- Sequence of one question: question, retrieval, generation, cited answer
- One design pattern and why (e.g. a replaceable model provider, so the open-source fallback is a configuration change)
- One short code snippet: [EVIDENCE NEEDED: retrieval with citations or the Slack handler]
- Deployment: environment and CI/CD pipeline: [EVIDENCE NEEDED]
- Accessibility: how the web interface meets WCAG 2.2 AA

**Visual:** architecture diagram (left) and a live or recorded demo clip (right). Keep a screenshot fallback in case the demo fails.
**KSBs:** S19 (implement with software engineering methods), K26 (software tools), K27 (artefacts: diagrams, architecture decisions, tests).

**Talking points**
- Explain the snippet in plain terms first, then the technical detail.
- One technical challenge and how you solved it: [EVIDENCE NEEDED].

---

## Slide 8: Quality and testing (2.5 min)
**Key message:** each quality control caught something, and I can show its impact. **Distinction: K25.**

**Content**
- Test types and framework: unit, integration, end-to-end: [EVIDENCE NEEDED: framework and coverage]
- 50-query benchmark: how it was built, results per sprint
- Hallucination and citation checks
- Accessibility and security testing
- Code review process
- Impact table:

| Control | What it caught | Change made |
|---|---|---|
| Benchmark | [EVIDENCE NEEDED] | [EVIDENCE NEEDED] |
| Citation check | [EVIDENCE NEEDED] | [EVIDENCE NEEDED] |
| Code review | [EVIDENCE NEEDED] | [EVIDENCE NEEDED] |
| Accessibility test | [EVIDENCE NEEDED] | [EVIDENCE NEEDED] |

**Visual:** line chart of benchmark accuracy by sprint against the 80% target.
**KSBs:** K25 (Distinction: evaluate the impact of quality approaches), K27.

**Talking points**
- K25 Distinction sentence: "The benchmark had the largest impact, because [EVIDENCE NEEDED]. Code review had less, because [EVIDENCE NEEDED]."
- Say what the tests did not prove.

---

## Slide 9: Managing delivery (1.5 min)
**Key message:** I noticed deviations early and corrected them.

**Content**
- Planned versus actual timeline: [EVIDENCE NEEDED]
- One or two deviations, what caused them and how I resolved them: [EVIDENCE NEEDED]
- Risk that materialised and whether the mitigation worked: [EVIDENCE NEEDED]
- Maintenance plan: index refresh, benchmark re-runs, cost and usage monitoring, model updates

**Visual:** planned versus actual sprint bar chart.
**KSBs:** S6 (manage the project and resolve deviations), S2 (mitigations applied).

**Talking points**
- Honesty scores well here. A deviation handled well is stronger evidence than a plan that went perfectly.

---

## Slide 10: Results against KPIs (2 min)
**Key message:** [EVIDENCE NEEDED: one sentence on what the results show, including any KPI missed].

**Content**

| KPI | Baseline | Target | Result | Met? |
|---|---|---|---|---|
| Spike duration | 3 to 5 days | [EVIDENCE NEEDED] | [EVIDENCE NEEDED] | |
| Retrieval accuracy | n/a | 80% | [EVIDENCE NEEDED] | |
| Developer trust | n/a | 4.0 out of 5 | [EVIDENCE NEEDED] | |
| Response time | n/a | [EVIDENCE NEEDED] | [EVIDENCE NEEDED] | |

- Stakeholder feedback: one quote from a pilot developer and the panel's decision: [EVIDENCE NEEDED]
- How results were reported to each stakeholder group: [EVIDENCE NEEDED: e.g. dashboard for the delivery manager, evidence pack for the panel]

**Visual:** the KPI table, with met targets marked clearly for colour-blind viewers (tick and text, not colour alone).
**KSBs:** K4 (business case tested against results), K17, S13, B5 (reporting in suitable language; truthful and concise).

**Talking points**
- State any missed KPI first and explain it. Assessors test B5 (truthful) here.
- Note the pilot's limits: 10 developers over 2 weeks is a small sample.

---

## Slide 11: Evaluation and recommendations (3 min)
**Key message:** what I would keep, what I would change, and what the registry should do next. **Distinction: S22, S17.**

**Content**
- What worked and what did not, across approach, method, analysis and outcome
- Implementation compared with an alternative: what would have happened with an off-the-shelf product or keyword search
- Lessons learnt: [EVIDENCE NEEDED: two or three real lessons]
- Phase 2 recommendations with priorities: remaining platforms, data protection impact assessment for Slack, [EVIDENCE NEEDED]
- Strategic implications for the registry
- Close: "Thank you. I am happy to take questions."

**Visual:** two columns, "Keep" and "Change", then a prioritised Phase 2 list.
**KSBs:** S22 (evaluate and recommend; Distinction: compare and contrast implementation with alternatives), S17 (Distinction: evaluate the solution in hindsight), K17.

**Talking points**
- S22 Distinction sentence: "Compared with an off-the-shelf product, my build [EVIDENCE NEEDED: e.g. kept data in the registry but took longer to reach accuracy]. If I did it again I would [EVIDENCE NEEDED]."

---

## Backup slides (not in the 27 minutes)
Prepare these and show them only if a question calls for them. They let you answer with evidence instead of memory.

| Backup | Content | Likely question |
|---|---|---|
| B1 | KSB map: 25 AM1 KSBs against slides | "Where did you show K15?" |
| B2 | Full risk and opportunity register | "What else could have gone wrong?" |
| B3 | Recalculated decision matrix and cost-benefit | "How did you arrive at those weights?" |
| B4 | Benchmark method and query examples | "How do you know it is 80%?" |
| B5 | Data flow diagram and data protection screening | "Where does the data go?" |
| B6 | Sequence diagram and use case diagram | "Walk me through a request." |

---

## KSB coverage check
Every AM1 KSB appears on at least one main slide. Distinction criteria are in bold.

| KSB | Slide(s) | KSB | Slide(s) |
|---|---|---|---|
| K1 | 2 | S2 | 5, 9 |
| K2 | 4 | S3 | 3 |
| K3 | 5 | **S5** | 5 |
| K4 | 4, 10 | S6 | 9 |
| **K5** | 5 | **S13** | 6, 10 |
| K15 | 5 | S14 | 6 |
| K17 | 1, 10, 11 | S16 | 2, 3 |
| **K18** | 6 | **S17** | 6, 11 |
| **K25** | 8 | **S18** | 4 |
| K26 | 7 | S19 | 7 |
| K27 | 7, 8 | **S22** | 11 |
| **S1** | 2, 4 | B3 | 3 |
| | | B5 | 10 |

Total: 25 KSBs; 9 Distinction criteria (S1, K5, S5, K18, S13, K25, S17, S18, S22).

---

## Q&A preparation (30 min)
Draft answers in your own words once the pilot has run. Pointers show what a strong answer includes; check each against the report so the two never contradict.

| # | Likely question | KSBs | Answer pointers |
|---|---|---|---|
| 1 | Why retrieval-augmented generation instead of fine-tuning a model? | S17, K18 | Content changes weekly; fine-tuning goes stale and cannot cite sources; cost; traceability for the panel |
| 2 | Why not buy Glean or a similar product? | K2, S1 | Data residency and security classification; cost over time; what you would lose (maintenance burden) |
| 3 | How did you stop the assistant making things up? | K25, B3 | Answers from indexed content only; mandatory citations; hallucination checks; what still gets through |
| 4 | How did you measure 80% accuracy, and is 50 queries enough? | K25, S18 | Who wrote the queries, how answers were marked, known bias; how you would extend it |
| 5 | What personal data did the system touch, and how did you protect it? | S3, B3 | Data protection screening; restricted repositories excluded; audit logs minimised; Slack deferred to Phase 2 with a DPIA |
| 6 | Why adapted Scrum? What did you adapt? | K5, S5 | Uncertain AI behaviour; benchmark each sprint; the specific adaptation and its effect |
| 7 | How did you estimate cost and time? How accurate were you? | K15 | Work breakdown and effort estimates; planned versus actual; what you would estimate differently |
| 8 | Which risk materialised, and did your mitigation work? | K3, S2, S6 | The real event, the mitigation, the result |
| 9 | Which KPI did you miss, and why? | S22, B5 | Honest answer first; cause; what would fix it |
| 10 | How would you scale this to all six platforms? | S22, S17 | Phase 2 priorities; data protection; index cost; permissions per source |
| 11 | How did you get developers to trust it? | S14, K18 | Citations; co-design workshop; trust survey result |
| 12 | What would the knowledge holders say about being replaced? | B3, K17 | Credit in answers (user story 3); tool finds their documentation, does not replace them |
| 13 | How did you tailor reporting to the panel versus developers? | K17, S13, B5 | Evidence pack versus dashboard versus Slack updates; examples |
| 14 | What would you do differently with the benefit of hindsight? | S22 | One technical and one process change, each with a reason |
| 15 | How does this give the registry an advantage? | K1, K4 | Released delivery capacity; faster onboarding; strategy link; figures from the Jira baseline only |

---

## Rehearsal checklist
- [ ] Full run-through timed at 27 minutes or less, at least three times
- [ ] Each Distinction slide has its "I chose X over Y because Z" sentence said aloud
- [ ] Demo recorded as a fallback; screenshots in the deck
- [ ] Every figure matches the report exactly
- [ ] No unreconciled Module 5 figures anywhere
- [ ] Organisation named only as agreed with your line manager (customer consent under the Version 1 AI Policy)
- [ ] Slides meet accessibility basics: 24-point minimum text, sufficient contrast, no meaning shown by colour alone
- [ ] Mock Q&A with the Presentation Coach agent: "Ask me the 15 questions in the Q&A table, one at a time, and grade each answer against the AM1 criteria"
