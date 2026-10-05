# Corrections Pack: Must Items

Replacement text for every **Must** item in `module-fix-list.md`. Each module correction quotes the current wording from the submitted PDF, gives a replacement, and lists anything only you can confirm.

**How to use it**
1. Open the source file (Word or PowerPoint) for the module, not the PDF.
2. Find the quoted text (search for a distinctive phrase), paste the replacement, and fill any `[EVIDENCE NEEDED]` with the true fact.
3. Re-export the PDF, replace it in `04_module-assessments/`, and tick the item.
4. Where a correction offers options, pick the one that matches what actually happened. Never pick the one that reads better.

**Scope:** 31 Must items: 4 portfolio-wide actions (Part A) and 27 text corrections (Part B). Five further problems found while checking the text are in Part C.

---

## Part A: Portfolio-wide actions

### A1. Customer consent for controlled material (Must)
Six of seven PDFs are marked "Classification: Controlled".
- [ ] Ask your line manager or the Service Desk to confirm the files may be stored in this repository and processed by AI tools (Version 1 AI Policy).
- [ ] Confirm the GitHub repository `asthamalviya/aswe-epa-project` is private.
- [ ] Record the answer (who, date) in `06_evidence/your-answers.md`.

### A2. Internal GitLab link in Module 2 (Must)
Covered by correction **M2-4** below.

### A3. Public repository in Module 6 (Must)
Section 3.2 says the code is "hosted publicly" at `asthamalviya/ai-governance-assistant`.
- [ ] Confirm publishing was permitted. If not, make the repository private and replace the link with: "Code repository available to the assessor on request."

### A4. First-person "My role and contribution" section (Must, all modules)
Add this to the start of each module (100 to 150 words), or keep it as speaking notes. Use only what you actually did.

> **My role and contribution**
> I was [EVIDENCE NEEDED: role on this project]. I personally [EVIDENCE NEEDED: two or three things you did, e.g. designed the pipeline, wrote the tests, ran the stakeholder interviews]. I decided [EVIDENCE NEEDED: one decision you made and why]. Others contributed [EVIDENCE NEEDED: who did what, if anyone]. The outcome was [EVIDENCE NEEDED: approved, built, used, shelved].

Your answers to section 2 of `your-answers.md` supply all five gaps.

---

## Part B: Text corrections by module

### Module 1 (Project 3): legacy modernisation proposal

#### M1-1. Goals paired with the wrong justifications
**Location:** slide "How the proposal aligns with Companies House's broader goals".
**Current:** each goal repeats a justification from the previous slide:
> Boosts trust in the register: Maintenance of legacy systems is expensive and unsustainable.
> Future-ready architecture: Older frameworks lack support and pose security risks.
> Improves stakeholder experience: Modern stacks attract and retain top tech talent.

**Replacement:**
> **Supports Digital Strategy 2020–2025:** Replacing the legacy stack shortens release cycles and reduces downtime, delivering the strategy's commitment to efficient digital services.
> **Boosts trust in the register:** Fixing database indexing and normalisation, and validating data at entry, makes register data more accurate and more reliably available.
> **Future-ready architecture:** A modular, supported stack can take new services and security updates without large rewrites, removing the risk of unsupported frameworks.
> **Improves stakeholder experience:** A responsive front end with mobile support makes filing and searching quicker for businesses and the public.

Each justification uses a point already made elsewhere in your slides (database bottlenecks, React/Angular front end, security-first design).

#### M1-2. DEI deadlines that have passed
**Location:** DEI SMART objectives table.
**Current:** "Achieve this goal by the end of 2025", "Complete the training rollout by Q3 2025", and "Complete the audit and adjustments by Q2 2026". All three dates have now passed (Part C adds the Q2 2026 date, which the fix list missed).
**Replacement, option A (preferred if the objectives were real):** add a column "Outcome" and state what happened, e.g. "Training completed by [EVIDENCE NEEDED]% of staff by [date]".
**Replacement, option B (if they were proposed targets):** retitle the table "Proposed DEI objectives (illustrative)" and move deadlines forward, agreeing new dates with your manager: [EVIDENCE NEEDED: new dates].

---

### Module 2 (Project 4): dissolution risk model

#### M2-1. Text contradicts the feature importance table
**Location:** Model training section, after the stratified split.
**Current:**
> CompanyAge and TimeSinceFiling emerged as the most influential predictors. This reinforces the assumption that older companies with delayed filings tend to face greater dissolution risk. SIC codes and CompanyCategory also contributed meaningfully, enhancing industry-specific insights.

The table ranks HasInsolvencyHistory 0.34, CompanyCategory 0.21, AccountsCategory 0.17, SICCode 0.14 and CompanyAge 0.09. TimeSinceFiling does not appear in it.
**Replacement (if the table is correct):**
> HasInsolvencyHistory (0.34) was the most influential predictor, followed by CompanyCategory (0.21) and AccountsCategory (0.17). Prior insolvency was the strongest single signal of dissolution risk, while company type and accounts category added structural context. SICCode (0.14) contributed industry-specific information. CompanyAge (0.09) was less influential than I expected, which challenged my initial assumption that older companies with delayed filings carry the highest risk.

**If the text is correct instead:** re-run the model, export the real feature importances and replace the table.

#### M2-2. Leftover generated text
**Location:** Ethical decision-making section.
**Current:**
> Here is a visual representation of your ethical decision-making workflow for the ML model development. Each step reflects your responsible choices, from using open data to stakeholder review.

**Replacement:**
> Figure [N] shows the ethical decision workflow I followed while developing the model, from choosing open data to stakeholder review.

#### M2-3. KPI values labelled "Example"
**Location:** KPI Matrix.
**Current:** column header "Value (Example)", values 0.86, 0.82, 0.78, 0.80, 0.91.
**Replacement:** if these are your real test-set results, change the header to "Value (test set)" and add one line under the table: "Measured on the 20% stratified test set ([EVIDENCE NEEDED: number] companies)." If they are not real, replace them with your actual results: [EVIDENCE NEEDED].
**Check:** F1 = 2 × 0.82 × 0.78 ÷ (0.82 + 0.78) = 0.80, which is consistent.

#### M2-4. GitHub named, internal GitLab linked
**Location:** tools list ("Version Control: GitHub for source code, data notebooks, and model iterations") and Appendix A ("GitHub repository: https://gitlab.version1.com/astha.malviya/company-dissolution-risk-prediction").
**Replacement:**
> Tools list: "Version control: GitLab for source code, data notebooks and model iterations."
> Appendix A: "Code repository: held on Version 1's internal GitLab; available to the assessor on request."

This also resolves A2 by removing the internal URL and your username.

#### M2-5. Possible target leakage
**Location:** data dictionary (lists `DissolutionDate`) and model training.
**Action first:** check your notebook. Was `DissolutionDate` dropped before training? At what date was `TimeSinceFiling` calculated?
**Replacement (only if both were handled correctly):**
> To avoid leaking the outcome into the model, I excluded DissolutionDate from the features, because it is only known once a company has dissolved. TimeSinceFiling was calculated at [EVIDENCE NEEDED: reference date], before the prediction window, so it reflects what would have been known at the time.

**If either leaked:** re-run without it, report the new metrics, and say what changed. An honest correction is strong K13 evidence.

---

### Module 3 (Project 1): Zero Trust network review

#### M3-1. Typo in the opening
**Current:** "Companies Households ownership, filing and financial records…"
**Replacement:** "Companies House holds ownership, filing and financial records…"

#### M3-2. Port 80 contradicts "Only HTTPS is exposed"
**Location:** section 3.2 allowlist, row "Internet → DMZ Web LB, TCP 443/80".
**Replacement, option A (preferred):** change the port to "TCP 443".
**Replacement, option B:** keep 80 and change the sentence to: "Only HTTPS serves content externally; port 80 accepts connections solely to redirect them to 443."

#### M3-3. Outdated standards
**Location:** references, and the summary and section 5 mentions.
**Current:**
> ISO/IEC (2013) *Information Security Management Systems – Requirements (ISO/IEC 27001:2013)*. Geneva: ISO.
> NIST (2018) *Framework for Improving Critical Infrastructure Cybersecurity*. Gaithersburg: NIST.

**Replacement:**
> ISO/IEC (2022) *ISO/IEC 27001:2022 Information security, cybersecurity and privacy protection: Information security management systems: Requirements*. Geneva: ISO.
> NIST (2024) *The NIST Cybersecurity Framework (CSF) 2.0*. NIST CSWP 29. Gaithersburg: NIST.

**Also check the text:** CSF 2.0 added a sixth function, **Govern**, to Identify, Protect, Detect, Respond and Recover. One sentence linking your SIEM, ownership and policy recommendations to Govern strengthens B7.

---

### Module 4 (Project 2): AWS ETL proof of concept

#### M4-1. Two ingestion baselines
**Location:** Table 2 ("Data Ingestion Time: 6 hours → 1.2 hours, 80% faster") and the KPI table in 5.7 ("Full snapshot ingestion: 3–5 days → < 2 hours").
**Action first:** decide whether these measure different things.
**Replacement, option A (two different measures):**
> Table 2: rename the row "Pipeline processing time (6 hours → 1.2 hours)".
> KPI table: rename the row "Snapshot release to analyst availability (3–5 days → under 2 hours)".
> Add under the KPI table: "Processing time covers the pipeline run only; availability adds the manual waiting and checking steps the current process requires. Both baselines come from [EVIDENCE NEEDED: source and how measured]."

**Replacement, option B (same measure):** use one baseline in both tables: [EVIDENCE NEEDED].

#### M4-2. EU GDPR cited for a UK public body
**Locations and replacements:**
- Section 2.3: "…accountability risk under GDPR, which requires demonstrable traceability and lawful processing (European Union, 2018)." → "…accountability risk under the UK GDPR and the Data Protection Act 2018, which require demonstrable traceability and lawful processing (UK GDPR; Data Protection Act 2018)."
- Section 10.3 heading: "GDPR Compliance and Regulatory Risk" → "UK GDPR Compliance and Regulatory Risk".
- Section 10.3: "Under the General Data Protection Regulation (GDPR), public authorities must… (European Union, 2018)." → "Under the UK GDPR and the Data Protection Act 2018, public authorities must…"
- Section 10.3: "Articles 5 and 30 of GDPR" → "Articles 5 and 30 of the UK GDPR" (the article numbers are the same).
- Reflection, "compliant with GDPR" → "compliant with the UK GDPR".
- Reference "European Union (2018) General Data Protection Regulation (EU) 2016/679." → two entries:
  > *UK General Data Protection Regulation* (Regulation (EU) 2016/679 as retained in UK law by the European Union (Withdrawal) Act 2018).
  > *Data Protection Act 2018*, c. 12. London: The Stationery Office.

**Check:** the Data (Use and Access) Act 2025 amends parts of the UK GDPR. If your text discusses accountability duties in detail, check it against the amended position.

---

### Module 5 (Project 5): AI knowledge search proposal

#### M5-1. Decision matrix totals
**Location:** Table 4; section 1.5 sentence below it; section 6.3.
**Recalculated** from the table's own scores and weights:

| Option | Cost (30%) | GDPR (25%) | Root cause (25%) | Speed (20%) | Total |
|---|---|---|---|---|---|
| Do nothing | 0 | 5 | 0 | 10 | **3.25** |
| COTS | 4 | 3 | 6 | 7 | **4.85** |
| RAG | 9 | 10 | 10 | 7 | **9.10** |

**Replacements:**
- Table 4 totals: 2.75 → 3.25; 5.05 → 4.85; 8.80 → 9.10.
- Section 1.5: "The RAG system scores 8.80… Do nothing (2.75)… COTS (5.05)…" → "The RAG system scores 9.10, decisively ahead of all alternatives. Do nothing (3.25)… COTS (4.85)…"
- Section 6.3: "COTS (5.05 vs RAG's 8.80)" → "COTS (4.85 vs RAG's 9.10)".

#### M5-2. Waste and cost-benefit figures
**Problem:** Table 5 says 6 extra sprints at £80,000 (£480,000) plus 10 week-long spikes at £40,000 (£400,000), which totals £880,000, yet it states "~£592,000". The CBA table's £592,000 is the spike cost alone: (8 × 20 × £400 × 3) + (10 × 20 × £400 × 5). It counts 18 spikes against 8 features and assumes all 20 people were blocked by every spike.
**Recommended fix:** recalculate from Jira with the people actually involved in each spike:

> Spike waste = Σ (people on spike × spike days × day rate) = £[EVIDENCE NEEDED]
> Extra-sprint waste = Σ (people in extra sprint × 10 days × day rate) = £[EVIDENCE NEEDED]
> Annual waste = spike waste + extra-sprint waste = £W
> Annual benefit (50% recovery) = £W × 0.5 = £B
> Net benefit year 1 = £B − £12,100
> BCR = £B ÷ £12,100; ROI = net benefit ÷ £12,100 × 100%; payback (months) = £12,100 ÷ (£B ÷ 12)

The formulas in Table 6 are correct (for example £283,900 ÷ £12,100 = 2,346%); only the inputs are wrong. Update Table 5, Table 6, Table 13 (KPI matrix), the Minto pyramid (Figure 3), Table 24 and the Finance row of Table 22 once you have £W and £B.

#### M5-3. Goal figure differs from the CBA
**Location:** sections 1.6 and 3.1 ("recovering an estimated £160,000–£240,000 in annual delivery capacity").
**Replacement:** "…recovering an estimated £[B from M5-2] in annual delivery capacity (50% of measured waste)…". Use the same figure in both places and in the CBA.

#### M5-4. Which model is the default
**Location:** PESTLE, Environmental row ("Llama 3.1 8B as default reduces energy consumption vs large commercial LLMs") vs Table 9 (GPT-4o primary, Llama 3.1 8B fallback).
**Replacement, option A (GPT-4o is primary):**
> Environmental: CH has government sustainability obligations. The design keeps a self-hosted Llama 3.1 8B fallback; routing routine queries to it would cut energy use and API cost, and the pilot will measure what share of queries it can answer well.

**Replacement, option B (Llama is primary):** keep the PESTLE row and change Table 9 so Llama 3.1 8B is the primary model, with GPT-4o for complex queries only.

#### M5-5. UK GDPR Articles 44 to 49 misstated
**Current:** "UK GDPR Article 44-49 restricts data processing to UK jurisdiction. Operating entirely within CH infrastructure eliminates this risk."
**Replacement:**
> UK GDPR Chapter V (Articles 44 to 49) restricts transfers of personal data outside the UK without adequate safeguards. Keeping documents and the index in CH infrastructure, and using a UK-region model service, avoids that risk.

#### M5-6. "No data leaves the CH boundary" vs GPT-4o on Azure
**Locations:** decision matrix ("10/10 — within CH boundary"), Minto pyramid ("CH infra — no data leaves"), Table 24 ("ARG2: Zero data risk — within CH infrastructure"; Finance "ARG2: No data leaves CH boundary"), section 6.2.
**Action first:** confirm the Azure OpenAI region and data processing terms.
**Replacement (adjust to the facts):**
> Documents and the vector index stay within CH infrastructure. Prompts containing retrieved passages are processed by GPT-4o in Azure [EVIDENCE NEEDED: region, e.g. UK South] under [EVIDENCE NEEDED: data processing terms, e.g. no retention for model training].

Short form for the pyramid and Table 24: "Data stays in CH or UK-region services."

#### M5-7. Citations that may not support their claims
**Verify each against the paper before using these replacements.**
- Section 1.2, current: "Xia et al. (2017) place even higher for software engineers at 20-30%."
  Replacement: "Xia et al. (2017) found that professional developers spend about 58% of their time on program comprehension, much of it in finding and understanding existing information." [Check the 58% figure in the paper.]
- Sections 1.5 and 6.3, current: "Xia et al. (2017) demonstrate developer information-seeking failure is a semantic mismatch problem."
  Replacement: "Keyword search fails when users and documents describe the same thing in different words, the vocabulary problem identified by Furnas et al. (1987); vector search matches meaning, not exact terms." Add the reference: Furnas, G.W., Landauer, T.K., Gomez, L.M. and Dumais, S.T. (1987) 'The vocabulary problem in human-system communication', *Communications of the ACM*, 30(11), pp. 964–971.
- Section 6.2, current: "Peng et al. (2023) further demonstrate that AI developer tools deliver greatest value when grounded in specific organisational context."
  Replacement: delete the sentence, or use: "Peng et al. (2023) found developers using an AI pair programmer completed a set task 55.8% faster in a controlled experiment; the pilot tests whether similar gains hold for organisation-specific knowledge." [Check the figure.]
- Section 6.4, current: "developer trust depends critically on answer traceability (Peng et al., 2023)".
  Replacement: "developers are sceptical of AI accuracy (Stack Overflow, 2024), so answer traceability is essential". [Quote the survey figure.]
- Section 2.5: "aligns with Peng et al.'s (2023) finding that AI tools deliver greatest benefit in iterative environments": delete; the paper does not test delivery methods.

---

### Module 6 (Project 6): AI governance assistant on AWS

#### M6-1. Python versions
**Evidence in the report:** section 3.1 says Python 3.12; the Docker image is `python:3.12-slim`; the CI workflow in the appendix sets `python-version: "3.12"`. Section 4.1 says CI ran 3.9 and the developer machine 3.10. The appendix contradicts section 4.1, so an assessor can disprove it from your own document.
**Action first:** establish what actually happened.
**Replacement (fill in with the true versions):**
> **Problem:** My local environment ran Python [EVIDENCE NEEDED], while the project targets Python 3.12 in CI and Docker. The code used the `str | None` union syntax (PEP 604), which needs Python 3.10 or later, so [EVIDENCE NEEDED: what failed, and where].

**If the incident did not happen as described,** remove Change 1 and renumber; two real adaptations are stronger than three with one that cannot be true.

#### M6-2. CI narrative does not match Figure 10
**Current (section 3.2):** "In practice, GitHub Actions caught a Python 3.9 compatibility issue with union type syntax before it reached deployment, saving an estimated 10-15 minutes of debugging per occurrence."
**Replacement:**
> In practice, the pipeline caught three problems before deployment (Figure 10): a Ruff f-string lint error (run 1), missing dummy AWS credentials for tests (run 2), and the lazy initialisation issue fixed in Change 2 (run 3). Run 4 passed in 34 seconds.

Also update to match M6-1: section 3.2.4 ("The Python 3.9 type syntax issue would not have been caught without Docker…") and section 3.2.5 ("pytest caught 3 functional regressions (including the Python 3.9 type syntax failure)"). Delete "This progression is precisely the evidence S20 requires"; it is S4 and K28 evidence (fix list, Should).

#### M6-3. Authentication claimed but not built
**Current:**
- Section 1.1: "…throttles up to 10,000 requests per second and centralises authentication."
- Section 1.3: "In return: throttling, request-level audit logging, and centralised authentication."
- Section 2.2: "The cloud-native approach provides identity-based access control, API-first design, and governance logging."

**Replacement:**
- Section 1.1: "…throttles up to 10,000 requests per second and can centralise authentication."
- Section 1.3: "In return: throttling, request-level audit logging, and a single place to add authentication."
- Section 2.2: "The cloud-native approach provides API-first design and governance logging, and a path to identity-based access control through Cognito (recommendation 12)."
- Add to section 5.1: "**Release condition:** user authentication is not yet in place, so the audit log cannot record who asked each question. Authentication (recommendation 6 now; Cognito, recommendation 12, for role-based access) must be in place before the tool handles real governance documents."

#### M6-4. Deployed or not, and through which front door
**Current:** section 4.3 starts "After deploying the FastAPI backend…"; section 5.1 recommends "Deploy to EC2 t3.medium behind an Application Load Balancer" in week 1; the design uses API Gateway throughout.
**Action first:** was the backend deployed, where, and behind what?
**Replacement, option A (not deployed):**
> Section 4.3: "During local integration testing, the browser-based frontend was blocked by CORS policy errors…"
> Section 5.1, item 1: "Deploy to EC2 t3.medium behind API Gateway, as designed, using the Terraform configuration provided."

**Replacement, option B (deployed):** name the environment in 4.3 ("After deploying the backend to [EVIDENCE NEEDED: environment]…") and rewrite recommendation 1 as the next step from that state. If an ALB is genuinely recommended, explain why it replaces or sits behind API Gateway.

#### M6-5. "Each adaptation was faster" is contradicted
**Current (section 4.4):** "Each adaptation was faster to resolve than the one before, evidence that the structured strategy-evaluation approach improved team response capability over time."
**Replacement:**
> The three changes took 12 minutes, [EVIDENCE NEEDED: Change 2 time] and 30 minutes. Change 3 took longest because I chose a secure origin allowlist over disabling CORS, which would have taken five minutes. The structured approach did not make each fix faster; it made each fix safer.

#### M6-6. Nielsen misquoted
**Current (section 1.3):** "Internal users tolerate up to 200ms before noticing latency (Nielsen, 1993), so this overhead is not perceptible."
**Replacement:**
> At about 29 ms, the overhead sits well within Nielsen's (1993) 0.1-second limit for a response to feel instant, so users will not notice it.

---

### Module 7 (Project 7): pricing service refactor

#### M7-1. Coverage figure
**Evidence:** Appendix A gives "v0: 85/85 lines, v1: 242/252 lines". v1 alone is 96.0%; v0 and v1 together are 327/337 = 97.0%. Neither is 99%.
**Action first:** re-run the coverage report. If the tool reports 99%, the appendix counts are wrong; correct those instead.
**Replacement (if the appendix is right):** change "99%" to "96%" in the summary box, the executive summary, section 3.2, the Figure 3 caption, section 3.3 and section 4, and in Appendix A write "Coverage: 96% line coverage of v1 (242 of 252 lines); v0 fully covered by characterisation tests (85 of 85 lines); 92% branch coverage." If the Figure 3 screenshot shows 99%, replace the screenshot.

#### M7-2. Four sizes for v0
**Current:** "90-line" (summary, Figure 1, sections 1 and 2.1), "106 lines" (section 2.2), "88-line handler" (section 4), "85/85 lines" (Appendix A).
**Likely explanation (check it):** these may be different measures: lines in the handler function, lines in the whole file, and executable statements counted by the coverage tool.
**Replacement:** measure once and define each figure where it first appears:
> "v0 is a single [EVIDENCE NEEDED]-line handler function ([EVIDENCE NEEDED] lines in the file, 85 executable statements)."

Then use the handler figure everywhere else, and in section 2.2 compare like with like: "v1 is longer ([EVIDENCE NEEDED] lines across all files vs [same measure] for v0)".

---

## Part C: Problems found while drafting
Not in the fix list before; add them to your checks.

| Module | Issue | Fix |
|---|---|---|
| M1 | A third DEI deadline, "Q2 2026" (pay equity audit), has also passed. | Included in M1-2. |
| M1 | The slide says "Supports Digital Strategy 2020–2025"; that strategy period has ended. | Check whether Companies House has published a successor strategy, and cite it if so. |
| M6 | The CI workflow in the appendix runs Python 3.12, which disproves the section 4.1 story that CI ran 3.9. | Included in M6-1. |
| M6 | Section 4.3 says the CORS problem appeared "after deploying", then that it "surfaced during integration testing rather than post-deployment". | Fix with M6-4. |
| M7 | Combined coverage (327 of 337) is 97%, so 99% is wrong whichever way it is counted. | Included in M7-1. |

---

## Tracking

| ID | Module | Item | Needs you first | Done |
|---|---|---|---|---|
| A1 | All | Consent for controlled material | Yes | [ ] |
| A2 | M2 | Internal GitLab link (see M2-4) | No | [ ] |
| A3 | M6 | Public repository | Yes | [ ] |
| A4 | All | My role and contribution | Yes | [ ] |
| M1-1 | M1 | Goal justifications | No | [ ] |
| M1-2 | M1 | DEI deadlines | Yes | [ ] |
| M2-1 | M2 | Feature importance text | Check table | [ ] |
| M2-2 | M2 | Generated text | No | [ ] |
| M2-3 | M2 | "Example" KPI values | Yes | [ ] |
| M2-4 | M2 | GitHub vs GitLab | No | [ ] |
| M2-5 | M2 | Target leakage | Yes | [ ] |
| M3-1 | M3 | Typo | No | [ ] |
| M3-2 | M3 | Port 80 | Choose option | [ ] |
| M3-3 | M3 | Outdated standards | No | [ ] |
| M4-1 | M4 | Ingestion baselines | Yes | [ ] |
| M4-2 | M4 | UK GDPR and DPA 2018 | No | [ ] |
| M5-1 | M5 | Matrix totals | No | [ ] |
| M5-2 | M5 | Waste and CBA | Yes | [ ] |
| M5-3 | M5 | Goal figure | After M5-2 | [ ] |
| M5-4 | M5 | Default model | Yes | [ ] |
| M5-5 | M5 | Articles 44 to 49 | No | [ ] |
| M5-6 | M5 | Data boundary | Yes | [ ] |
| M5-7 | M5 | Xia and Peng citations | Check papers | [ ] |
| M6-1 | M6 | Python versions | Yes | [ ] |
| M6-2 | M6 | CI narrative | After M6-1 | [ ] |
| M6-3 | M6 | Authentication | No | [ ] |
| M6-4 | M6 | Deployment and front door | Yes | [ ] |
| M6-5 | M6 | "Faster" claim | Change 2 time | [ ] |
| M6-6 | M6 | Nielsen | No | [ ] |
| M7-1 | M7 | Coverage figure | Re-run report | [ ] |
| M7-2 | M7 | v0 line counts | Measure | [ ] |

**Can be done today without new facts:** M1-1, M2-2, M2-4, M3-1, M3-3, M4-2, M5-1, M5-5, M6-3, M6-6 (10 items).
