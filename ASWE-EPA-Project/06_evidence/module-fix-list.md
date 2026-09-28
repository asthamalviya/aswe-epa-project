# Module Fix List

Corrections to make in the portfolio submissions before the AM2 professional discussion. The EPA guidance says you can refine your portfolio at any point during the programme.

**Every item was checked against the extracted text of the PDF.** Section names refer to the headings in each module. Findings from the gap analysis that could not be confirmed in the text are left out.

**Priority key**
- **Must:** a factual contradiction or error an assessor could spot and question
- **Should:** weakens the evidence for a KSB
- **Could:** polish

---

## Before anything else: data handling

| Priority | Issue | Action |
|---|---|---|
| Must | 6 of 7 PDFs are marked "Classification: Controlled" (M1: 22 pages, M2: 24, M3: 11, M5: 36, M6: 29, M7: 21; M4 has no marking). Under the Version 1 AI Policy, controlled material needs customer consent before AI processing and careful handling in source control. | Confirm with your line manager or the Service Desk that these files may sit in this repository and be processed by AI tools. Check that the GitHub repository is private. |
| Must | M2 appendix links to an internal Version 1 GitLab URL that includes your username. | Remove the link, or replace it with a public or anonymised repository. |
| Should | All modules name Companies House. Your new evidence refers to "a UK government registry". | Decide one approach for the whole portfolio so the assessor sees consistent naming. |

---

## Applies to every module: first-person voice

| Priority | Issue | Action |
|---|---|---|
| Must | First-person "I" appears 0 times in M1, M3, M6 and M7, twice in M2 and once in M4. In M5 the only "I" entries are RACI "Informed" cells. | Add a short "My role and contribution" section to each module (100 to 150 words): what you personally did, decided and delivered. Or prepare it as speaking notes for the discussion. |

---

## Module 1: Advancing Data Strategy and Governance (Project 3)

| Priority | Location | Issue | Fix |
|---|---|---|---|
| Must | Slide "How the proposal aligns with Companies House's broader goals" | Each goal is paired with the justification from the previous slide, so the pairs do not match (e.g. "Boosts trust in the register" is followed by "Maintenance of legacy systems is expensive"). | Write a specific justification for each of the four goals. |
| Must | DEI SMART objectives | Deadlines are "end of 2025" and "Q3 2025", which have passed. | Report what actually happened against each objective, or restate them with future dates. |
| Should | Kotter actions and Proposed Change | "Saving thousands of staff-hours annually" and "from days to minutes" are stated without a baseline or source. | Add the baseline figure and its source, or remove the claim. |

---

## Module 2: Integrating Machine Learning and AI (Project 4)

| Priority | Location | Issue | Fix |
|---|---|---|---|
| Must | Model evaluation text vs feature importance table | Text says CompanyAge and TimeSinceFiling "emerged as the most influential predictors". The table ranks HasInsolvencyHistory first (0.34), CompanyCategory second (0.21) and AccountsCategory third (0.17). | Rewrite the text to match the table, or correct the table if the text is right. |
| Must | Ethical decision-making section | Leftover generated text: "Here is a visual representation of your ethical decision-making workflow…" | Delete the sentence and introduce the figure in your own words. |
| Must | KPI matrix | Column headed "Value (Example)". The assessor cannot credit example metrics. | Replace with the real values from your model run, and remove "(Example)". |
| Must | Tools list vs appendix link | Tools list says "GitHub"; the appendix link is GitLab. | Use the correct platform name throughout. |
| Should | Project Summary | Promises a change management framework that the document never delivers. | Add a short section applying a named model (e.g. ADKAR), or remove the promise. |
| Should | Stratified sampling example | Uses "70% active, 30% dissolved", while the text elsewhere says dissolved companies are "far fewer". | Use your dataset's real class ratio. |
| Could | Heading "Emphasizing Compliance with Design Requirements" | US spelling. | "Emphasising". |

---

## Module 3: Network and Security Review (Project 1)

| Priority | Location | Issue | Fix |
|---|---|---|---|
| Must | Executive summary | Typo: "Companies Households". | "Companies House". |
| Should | Sections 3.1, 3.2 and 4.1 | Tables are labelled "Sample", "representative" and "illustrative", so the design reads as hypothetical. | Where the data is real, remove the labels. Where it is not, say so once and explain what you based it on. |
| Should | Section 4 risk matrix | Likelihood and impact scores have no rationale. | Add one line per risk explaining the score. |
| Should | References | Only one source is cited in the text (NAO, 2018); the others appear only in the reference list. | Cite the sources where they support a claim, or remove them. |

---

## Module 4: Cloud-Based ETL PoC (Project 2)

| Priority | Location | Issue | Fix |
|---|---|---|---|
| Must | Table 2 vs KPI table in section 5.7 | Ingestion baseline is "6 hours" in Table 2 (80% faster, to 1.2 hours) but "3–5 days" in the KPI table (target under 2 hours). | Use one measured baseline in both places, and state how it was measured. |
| Must | Sections 2.3 and 10, references | Cites EU GDPR (Regulation (EU) 2016/679, "European Union, 2018"). A UK public body is subject to UK GDPR and the Data Protection Act 2018. | Change the citations to UK GDPR and DPA 2018. This also strengthens the K19 and S15 Distinction. |
| Should | Section 6.2.1 "Source Data Quality Validation (PostgreSQL)" | The rest of the report describes Oracle source systems. | Add one sentence explaining that PostgreSQL stands in for Oracle in the PoC, and why. |
| Could | Figure numbering | Figures jump from 2 to 4. | Renumber. |

---

## Module 5: AI-Powered Knowledge Search System (Project 5)

| Priority | Location | Issue | Fix |
|---|---|---|---|
| Must | Table 4 weighted decision matrix | Totals do not match the scores and weights. Recalculated: Do Nothing 3.25 (stated 2.75), COTS 4.85 (stated 5.05), RAG 9.10 (stated 8.80). The ranking does not change. | Correct the three totals and the sentence below the table that repeats them. |
| Must | Table 5 and CBA table | Text says 6 extra sprints at £80,000 (£480,000) and 10 week-long spikes at £40,000 (£400,000), but gives total waste as ~£592,000. In the CBA table, £592,000 is the spike cost alone. | Recalculate the waste total, then update the 50% saving (£296,000), ROI and payback figures that depend on it. |
| Must | Business case goal vs CBA | Goal recovers "£160,000–£240,000"; the CBA gives a £296,000 annual benefit. | Align the two, or explain the difference. |
| Must | PESTLE, Environmental row vs architecture table | PESTLE says "Llama 3.1 8B as default reduces energy consumption", but the architecture table makes GPT-4o via Azure the primary model and Llama 3.1 8B the fallback. | State which model handles most queries, and qualify the energy claim to match. |
| Must | PESTLE, Legal row | "UK GDPR Article 44-49 restricts data processing to UK jurisdiction" misstates the law. Articles 44 to 49 restrict international transfers without adequate safeguards; they do not require UK-only processing. | Reword as in `by-module/module-5/K19-evidence.md`, "Corrections needed". |
| Must | Architecture table and closing argument | "No data leaves CH boundary" sits alongside "GPT-4o via Azure OpenAI" as the primary LLM. | State the Azure region and data processing terms, or qualify the claim. |
| Should | Section 2.4 and Table 19 | Labelled "KSB S1 — Distinction" and "KSB K3". Both are AM1 KSBs, not portfolio KSBs. | Relabel as K24/K28 (section 2.4) and S9/S20 (Table 19), or remove the labels. |
| Should | References | Some entries still read "Accessed: [date]". | Add the access dates. |

---

## Module 6: Cloud-Based AI Governance and Knowledge Assistant (Project 6)

| Priority | Location | Issue | Fix |
|---|---|---|---|
| Must | Section 4.1 Change 1 | Says "the development environment ran Python 3.9", then that "the developer's machine happened to have Python 3.10, but CI ran 3.9". Section 3.1 says the tool was built with Python 3.12, and the Docker image is python:3.12-slim. | Establish which versions actually ran locally, in CI and in Docker, and state them consistently. |
| Must | Section 3.2 CI narrative | Runs 1 to 3 failed on a lint error, missing dummy credentials and the Change 2 fix. The next paragraph says GitHub Actions "caught a Python 3.9 compatibility issue", which is not one of those three failures. | Match the run history to Figure 10 exactly. |
| Must | Section 5.1 vs rest of report | Recommends "Deploy to EC2 behind an Application Load Balancer" in week 1, while the design uses API Gateway throughout and section 4.3 describes the system "after deploying". | Decide whether the system is deployed and which front door it uses, then make sections 3, 4 and 5 agree. |
| Should | Section 3.2 | Claims the CI debugging is "precisely the evidence S20 requires". Official S20 is about changing priorities and revised plans; this is S4 and K28 evidence. | Remove the claim, and relabel section 4 as S4 unless a plan actually changed. |
| Should | Voice | Written about "the developer" and "two team members" in the third person. | Rewrite key sentences in the first person. |

---

## Module 7: Software Quality: Design and Testing Practice (Project 7)

| Priority | Location | Issue | Fix |
|---|---|---|---|
| Must | Executive summary vs section 2.2 | v0 is a "90-line" handler in the summary and figures, but "106 lines" in the trade-off statement. | Use one line count. |
| Should | Executive summary vs gap table | "0 critical gaps remaining" while Gap 5 (rounding) is "Not addressed". Gap 5 is rated Medium, so this is not strictly a contradiction, but an assessor may read it as one. | Add "(one medium gap deferred: rounding)". |
| Should | Section 4 | Says code structure "eliminates need for separate diagrams", yet diagrams are embedded throughout. | Reword to explain what the diagrams add beyond code structure. |
| Should | Lessons learned | "Rejecting Abstract Factory, Observer and Builder" appears only in lessons learned. | Add a short trade-off in section 2 explaining why each pattern was rejected. |

---

## Tracking

| Module | Must | Should | Could | Done |
|---|---|---|---|---|
| Data handling | 2 | 1 | 0 | [ ] |
| All (first person) | 1 | 0 | 0 | [ ] |
| M1 | 2 | 1 | 0 | [ ] |
| M2 | 4 | 2 | 1 | [ ] |
| M3 | 1 | 3 | 0 | [ ] |
| M4 | 2 | 1 | 1 | [ ] |
| M5 | 6 | 2 | 0 | [ ] |
| M6 | 3 | 2 | 0 | [ ] |
| M7 | 1 | 3 | 0 | [ ] |
| **Total** | **22** | **15** | **2** | |
