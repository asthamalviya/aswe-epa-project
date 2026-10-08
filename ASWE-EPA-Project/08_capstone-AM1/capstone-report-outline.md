# Capstone Report Outline (AM1)

**Project:** AI knowledge search for software delivery teams at a UK government registry (see `capstone-proposal-draft.md`)
**Word limit:** 6,000 (accepted range 5,400 to 6,600). Appendices, references and diagrams do not count.
**Structure:** follows the headings in `Capstone Project report template.docx`, with the content the capstone brief asks for mapped into them.
**KSBs:** all 25 AM1 KSBs, placed where the assessor will look for them. Criteria wording is in `.kiro/steering/ksb-quick-reference.md`.

> **How to use this outline.** Write each section against its word budget, KSBs and checklist. The report is written **after Gateway**, within 50 to 55 working days, so gather evidence (screenshots, metrics, meeting notes, decisions) **while the project runs**. Write in the first person throughout: the assessor grades what **you** did.

---

## Grading targets

- **Pass:** every Pass criterion for all 25 KSBs.
- **Distinction:** all Pass criteria plus all 9 Distinction criteria. Each Distinction criterion met also raises your degree letter grade (3 = C, 5 = B, 6 = A).

| Distinction criterion | KSBs | Where to hit it |
|---|---|---|
| Justifies the choice of digital solutions for specific roles | S1 | Analysis and Problem Solving |
| Justifies the selection and use of standard processes and methods | K5, S5 | Project Plan |
| Compares and contrasts the chosen solution with alternatives from research | K18, S13 | Research and Findings |
| Evaluates the impact of approaches used to control product quality | K25 | Testing; Recommendations |
| Evaluates the choice of software engineering solution | S17 | Research and Findings; Recommendations |
| Justifies the choice of analysis methods | S18 | Analysis and Problem Solving |
| Compares and contrasts the implementation with alternative approaches | S22 | Recommendations and Conclusions |

**The common thread:** every Distinction criterion asks you to **justify**, **evaluate** or **compare**. For each major decision, name at least one alternative and say why you did not choose it.

---

## Word budget

| Section | Words | Main KSBs |
|---|---|---|
| Summary | 500 | Overview (K17) |
| Introduction | 350 | K1, S1, S16 |
| Project Scope | 500 | S3, B3, K2, S16 |
| Project Plan | 600 | K3, S2, K15, K5, S5, S6 |
| Analysis and Problem Solving | 700 | S1, S18, K4, K2 |
| Research and Findings | 800 | S14, K18, S13, S17 |
| Project Outcomes (six subsections) | 1,750 | S19, K25, K26, K27, S6 |
| Recommendations and Conclusions | 800 | S22, K17, S13, B5 |
| **Total** | **6,000** | |

---

## Summary (500 words)
**Template:** insert a 500-word summary.
**Write last.** Cover the problem, what you built, how, the results against KPIs and your main recommendation. Your proposal summary is a starting point, but rewrite it in the past tense with real results.

---

## Introduction (350 words)
**Template prompts:** your role on the project; overview of current status and the problem being solved.
**Brief asks for:** business context and need; aims and objectives; scope and boundaries (keep scope detail for the next section).

| KSB | Pass criterion to meet here |
|---|---|
| K1 | Identify the role digital technology plays in competitive advantage: how better knowledge access supports the registry's strategy of efficient digital delivery |
| S1 | Begin analysing the business problem behind the proposal |
| S16 | Frame the problem as non-routine and incompletely specified |

**Checklist**
- [ ] Your role, in one or two sentences, in the first person
- [ ] The problem, with numbers: 3 to 5 day spikes on all 8 features; 6 of 8 needing an extra sprint
- [ ] Three to four aims, each measurable later

---

## Project Scope (500 words)
**Template prompts:** project focus; how the focus was agreed; how success will be measured (KPIs and success criteria); what is out of scope.
**Brief asks for:** KPIs; stakeholder engagement approach; constraints and assumptions.

| KSB | Pass criterion to meet here |
|---|---|
| S3, B3 | A proposal based on evidence, in line with legal, ethical and regulatory requirements, protecting personal data, safety and security |
| K2 | Principles of strategic decision making on acquiring or building (introduce here; evaluate in Analysis) |
| S16 | Define the problem precisely |

**Checklist**
- [ ] In scope: Confluence and GitHub indexing, retrieval with citations, web interface and Slack bot, 10-developer pilot
- [ ] Out of scope, with reasons: other four platforms (Phase 2), fine-tuning, AI code review, restricted repositories
- [ ] KPIs with baseline and target: spike duration (Jira), retrieval accuracy (80%+ on 50 queries), trust (4.0 out of 5)
- [ ] How the scope was agreed, and with whom
- [ ] Legal and ethical constraints: UK GDPR (including a data protection screening), the government's AI principles, the registry's security classification rules
- [ ] Assumptions, e.g. access to platform APIs, pilot volunteers

---

## Project Plan (600 words)
**Template prompts:** roles and responsibilities (stakeholder, role, responsibilities table); how you will communicate and collaborate.
**Brief asks for:** timeline and milestones; resources; risk assessment and mitigation; budget; project management approach; tools and techniques with justification.

| KSB | Pass criterion | Distinction |
|---|---|---|
| K3, S2 | A plan that estimates risks and opportunities and sets mitigations | |
| K15 | Techniques to estimate cost and time | |
| K5, S5 | Use a range of digital tools and standard approaches | **Justify** the processes and methods chosen |
| S6 | Manage delivery (evidenced in Outcomes) | |

**Checklist**
- [ ] Stakeholder table (template format), including you, the delivery team, the Technical Architects panel, security, Finance, pilot developers and your manager
- [ ] Method: adapted Scrum, with Waterfall and hybrid considered and rejected, and why (Distinction K5, S5)
- [ ] Timeline: six two-week sprints with milestones (Gantt or sprint chart in an appendix)
- [ ] Cost estimate: how you reached it (e.g. work breakdown and effort estimates), not only the total
- [ ] Risk and opportunity register in an appendix; the top three risks discussed in the text
- [ ] Communication: ceremonies, channels, reporting to the panel

---

## Analysis and Problem Solving (700 words)
**Template prompts:** challenges raised or expected; how you approached them.
**Brief asks for:** analysis of the business problem; evaluation of potential solutions.

| KSB | Pass criterion | Distinction |
|---|---|---|
| S1 | Analyse the business problem to identify the role of technology | **Justify** the technology chosen for each role (retrieval, vector store, model, interface) |
| S18 | Select and apply analysis methods | **Justify** why each method suited the problem |
| K4 | Evaluate the techniques used to build the business case | |
| K2 | Principles of acquire-versus-build decisions | |

**Checklist**
- [ ] Analysis methods and why each was chosen: Five Whys (root cause), BPMN and value stream mapping (where time goes), stakeholder interviews, Jira data (baseline)
- [ ] Business case technique evaluated: weighted decision matrix and cost-benefit analysis, with their limits (recalculate the matrix totals and cost figures first; see the fix list)
- [ ] Options: do nothing, off-the-shelf (e.g. Glean, Guru), bespoke; why data residency decided it
- [ ] Challenges met during delivery and how you handled them (real events, e.g. access, data quality, accuracy)

---

## Research and Findings (800 words)
**Template prompts:** research and findings supporting the project goals; software, tools, documentation or ways of working you had to consider.
**Brief asks for:** literature review and industry practice; data collection and analysis.

| KSB | Pass criterion | Distinction |
|---|---|---|
| S14 | Research and evaluate innovative technologies or approaches | |
| K18 | Justify your research and evaluation methods | **Compare and contrast** your solution with alternatives from your research |
| S13 | (with K18) | as above |
| S17 | Recommend a suitable solution | **Evaluate** your choice |

**Checklist**
- [ ] How you researched: where you searched, how you judged sources
- [ ] Retrieval versus fine-tuning; knowledge graph as the contrarian option; open-source versus hosted models
- [ ] Developer trust research behind mandatory citations
- [ ] Existing registry tools and standards the solution had to fit (see `09_portfolio-AM2/evidence/by-module/module-5/K6-evidence.md`)
- [ ] **Check every citation supports its claim** (see the Xia et al. and Peng et al. items in the fix list)

---

## Project Outcomes (1,750 words)
**Template prompt:** explain the solution and its design, stage by stage, referring to artefacts in the appendices.

### Planning and Analysis (250 words)
**Prompts:** who the system is for (end users and internal stakeholders); use case diagram.
**KSBs:** K27 (artefacts), S19.
- [ ] Use case diagram in an appendix: developer, new joiner, knowledge holder, administrator, panel

### Design (400 words)
**Prompts:** sequence diagram of key flows; design patterns; wireframes; accessibility of the design.
**KSBs:** K27, K25, S19.
- [ ] Architecture diagram and a sequence diagram (question to retrieval to generation to cited answer)
- [ ] Patterns used and why, e.g. a service layer and a replaceable model provider (as in Module 6)
- [ ] Wireframes of the web interface
- [ ] Accessibility: how the design meets WCAG 2.2 AA

### Implementation (450 words)
**Prompts:** well-structured code snippets; coding standards; how code reviews ran; what the code does in plain terms; UI screenshot; database queries; API request and response.
**KSBs:** S19, K26, K25, S6.
- [ ] Two or three short snippets (ingestion, retrieval with citations, the Slack bot handler)
- [ ] Coding standards and linting; code review process
- [ ] A sample API request and response
- [ ] Deviations from plan and how you resolved them (S6)

### Testing (350 words)
**Prompts:** unit, integration and end-to-end testing; framework; performance or security testing tools; test snippets and coverage reports.
**KSBs:** K25 (Distinction: **evaluate the impact** of your quality controls), K27.
- [ ] Test types and framework
- [ ] 50-query benchmark: method and results
- [ ] Hallucination and citation checks
- [ ] Accessibility and security testing
- [ ] What each quality control caught, so its impact can be evaluated

### Deployment (150 words)
**Prompts:** how code reached test or live environments; CI/CD.
**KSBs:** K26, S19.
- [ ] Environment, pipeline, and how the registry's infrastructure constraints shaped deployment

### Maintenance (150 words)
**Prompts:** maintenance plan; monitoring.
**KSBs:** K25, S6.
- [ ] Index refresh, benchmark re-runs, cost and usage monitoring, model updates

---

## Recommendations and Conclusions (800 words)
**Template prompts:** what worked well; whether you completed everything; what you would change; what is next.
**Brief asks for:** critical evaluation; recommendations for future development; lessons learned; strategic implications.

| KSB | Pass criterion | Distinction |
|---|---|---|
| S22 | Evaluate approach, method, analysis and outcomes; lessons and recommendations | **Compare and contrast** your implementation with alternatives |
| S17 | | **Evaluate** your choice of solution in hindsight |
| K25 | | **Evaluate** the impact of your quality approaches |
| K17, S13, B5 | Present to stakeholders in suitable language and style; truthful and concise | |

**Checklist**
- [ ] Results against every KPI, including any missed, stated honestly
- [ ] What you would do differently, and why
- [ ] Implementation compared with at least one alternative (e.g. off-the-shelf or keyword search): what would have happened
- [ ] Phase 2 recommendations with priorities
- [ ] Strategic implications for the registry

---

## Appendices (not counted)
| Appendix | Content | Supports |
|---|---|---|
| A | KSB map (template table) | All |
| B | Stakeholder and RACI table | Project Plan |
| C | Sprint plan or Gantt chart; work breakdown structure | K15, S6 |
| D | Risk and opportunity register | K3, S2 |
| E | Decision matrix and cost-benefit analysis (recalculated) | K2, K4, S1 |
| F | Use case, architecture and sequence diagrams; wireframes | K27 |
| G | Code snippets and API examples | S19 |
| H | Test results, coverage and benchmark results | K25 |
| I | Stakeholder communications, e.g. slides or a status report | K17, S13, B5 |
| J | Employer declaration (apprentice and line manager) | Required |

---

## Evidence to collect during the project
Collect these as you go; they are hard to recreate after Gateway:
- [ ] Jira spike data before the pilot and during it
- [ ] Benchmark results after each sprint
- [ ] Screenshots of the interface and the Slack bot
- [ ] Survey results and pilot feedback
- [ ] Decision notes: each option considered and why it was rejected
- [ ] Meeting notes or messages showing stakeholder agreement
- [ ] Any change to scope or plan, with the reason (useful for S6 and S22)

---

## Notes on the template
- **S14 wording error.** The template's KSB map repeats S1's wording for S14. The official S14 is "Research, investigate, and evaluate innovative technologies or approaches in the development of a digital and technology solution". Correct it in your copy.
- **KSB map columns.** The template map uses seven section columns. Tick each KSB under every section where you evidence it, and make sure each Distinction KSB appears in the section named in the grading targets table above.
