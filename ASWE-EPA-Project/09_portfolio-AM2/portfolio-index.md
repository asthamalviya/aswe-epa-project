# AM2 Portfolio Index

**What this is:** a signpost from each of the 34 AM2 KSBs to the place in your seven module submissions that evidences it, with a backup source, the evidence draft that supports your discussion answer, and what must happen before Gateway.
**Use it for:** (1) checking coverage before you submit the portfolio; (2) finding your example fast during the 60-minute discussion; (3) giving your coach a one-page view.
**Sources:** ratings and section references from `09_portfolio-AM2/evidence/ksb-coverage-tracker.md`; Multiverse project mapping from the saved Portfolio Readiness Tool pages in this folder and `09_portfolio-AM2/ksb-reference/`; corrections from `09_portfolio-AM2/evidence/module-fix-list.md`.

---

## Module and project numbers
Your module numbers differ from Multiverse project numbers. The assessor will use Multiverse's.

| Your module | Multiverse project | Submission |
|---|---|---|
| M1 | Project 3: Data Strategy and Governance | Legacy modernisation proposal, Kotter change plan (slides) |
| M2 | Project 4: ML and AI | Company dissolution risk model (Random Forest) |
| M3 | Project 1: Cybersecurity and Software Development | Zero Trust network review |
| M4 | Project 2: Data Engineering | AWS ETL proof of concept |
| M5 | Project 5: Software Transformation | AI knowledge search proposal (RAG) |
| M6 | Project 6: Cloud and Scalable Architectures | AI governance assistant on AWS with Terraform |
| M7 | Project 7: Testing and Design Patterns | Pricing service refactor (90 tests) |

## Where Multiverse expects each KSB
Taken from the Readiness Tool navigation you saved. Projects 6 and 7 were not saved, so the KSBs below marked "not saved" probably sit there.

| Multiverse project (your module) | KSBs Multiverse maps to it |
|---|---|
| Project 1 (M3) | K11, K12, K16, S9, S12, B4, B7 |
| Project 2 (M4) | K13, K14, S10, S11 |
| Project 3 (M1) | K7, K9, K10, K20, S8, B8 |
| Project 4 (M2) | K6, K19, K24, S4, S7, S15, B2, B6 |
| Project 5 (M5) | S23, B7 |
| Projects 6 and 7 (M6, M7): not saved | Likely K8, K21, K22, K23, K28, S20, S21, B1 |

**Why this matters:** for 11 KSBs your strongest evidence sits in a different project from the one Multiverse maps it to (marked ⇄ below). That is allowed, since the assessor looks at the whole portfolio, but be ready to say "my best example of K12 is in Project 2, not Project 1" and point to it.

---

## Index

Status: 🟢 strong, 🟡 present, 🟠 weak. Readiness: **Ready** (fixes only), **Fix first** (contradiction in the submission to correct), **Needs you** (a real example only you can supply). ✅ = has a Distinction criterion.

### Knowledge (17)

| KSB | Topic | MV project | Lead evidence | Backup | Discussion draft | Status | Readiness and action |
|---|---|---|---|---|---|---|---|
| K6 | Lifecycle approaches and organisational standards | P4 (M2) ⇄ | M5 (P5): lifecycle tied to registry tools | M2, M6 | `09_portfolio-AM2/evidence/by-module/module-5/K6-evidence.md` | 🟡 | **Needs you:** your role; proposal outcome |
| K7 | Roles, functions and activities | P3 (M1) ⇄ | M5 (P5) §1.5, §5.3 RACI | M4 (P2) §3.1 | `by-module/module-2/K7-evidence.md` | 🟡 | **Needs you:** your role in each team; check RACI |
| K8 | Teams and organisational theory [wording to confirm] | not saved | M2 (P4) roles table (thin) | M1, M5, M6 (thin) | `by-ksb/leading-and-working-together.md` | 🟠 | **Needs you:** real team example and a named theory |
| K9 | Leadership concepts and principles | P3 (M1) | M1 (P3) "my role as Lead" slide (thin) | M2, M5 (thin) | `by-ksb/leading-and-working-together.md` | 🟠 | **Needs you:** real leadership example and concept |
| K10 | Management techniques and theories | P3 (M1) ⇄ | M5 (P5): Kepner-Tregoe, MoSCoW, WBS | M1 (P3) Kotter | `by-ksb/leading-and-working-together.md`; `by-ksb/changing-priorities.md` | 🟡 | **Needs you:** link techniques to how you manage your own work |
| K11 | Common vulnerabilities | P1 (M3) | M3 (P1) §4 risk matrix, CVEs | M6 (P6) IAM, CORS | `by-module/module-3/K11-evidence.md` | 🟡 | **Needs you:** describe the `/ask` sanitisation fix; your role |
| K12 | Role of data management systems | P1 (M3) ⇄ | M4 (P2) §4.3 five-layer architecture | M1, M2, M5, M6 | `by-module/module-4/K12-evidence.md` | 🟢 | **Fix first:** M4 Oracle in text vs PostgreSQL build; merge vs flag deduplication |
| K13 | Principles of data analysis [wording to confirm] | P2 (M4) ⇄ | M2 (P4) data analysis techniques | M4 (P2) | `by-module/module-2/K13-evidence.md` | 🟢 | **Fix first:** M2 KPI values headed "Example"; predictor contradiction; check target leakage |
| K14 | Quantitative and qualitative data gathering | P2 (M4) ⇄ | M5 (P5) interviews, surveys, benchmark | M4 (P2) (weak) | `by-module/module-4/K14-evidence.md` | 🟡 | **Needs you:** how Module 4 requirements were gathered, from how many people |
| K16 | Networking concepts | P1 (M3) | M3 (P1) §2, §5 | M6 (P6) §1.1, Figure 2 | `by-module/module-3/K16-evidence.md`; `by-module/module-6/K16-evidence.md` | 🟢 | **Fix first:** M6 ALB vs API Gateway |
| K19 ✅ | Legal, ethical, social and professional standards | P4 (M2) ⇄ | M5 (P5) PESTLE, GDPR, ethics framework | M2 (P4), M4 (P2) §10, M7 | `by-module/module-5/K19-evidence.md` | 🟢 Pass; Distinction partly | **Fix first:** M5 GDPR Articles 44 to 49 wording; M4 EU GDPR to UK GDPR and DPA 2018. Distinction: justify why each standard applies |
| K20 ✅ | Sustainable development and green computing | P3 (M1) | None strong; one-liners in M1, M2, M5 | M6 right-sizing choices | `by-ksb/sustainability-and-accessibility.md` | 🟠 | **Needs you:** registry sustainability policy; your team's green choices. Only Distinction KSB with no evidence |
| K21 | Development lifecycle scenarios [wording to confirm] | not saved | M7 (P7) | M2, M4, M6 | `by-module/module-7/K21-evidence.md` | 🟡 | **Needs you:** real deployment and operation experience |
| K22 | Techniques per lifecycle stage [wording to confirm] | not saved | M7 (P7) §2 ADRs, §3 test techniques | M6 (P6) | `by-module/module-7/K22-evidence.md` | 🟢 | **Fix first:** M7 "0 critical gaps" vs Gap 5; v0 90 vs 106 lines |
| K23 | Development methods and approaches [wording to confirm] | not saved | M5 (P5) §2.5 Waterfall, Scrum, Hybrid | M7 | `by-module/module-7/K23-evidence.md` | 🟢 | **Needs you:** day-to-day method experience at work |
| K24 | Compliant design; legacy issues | P4 (M2) ⇄ | M6 (P6) §2.1 traceability, §2.2 legacy | M2 (P4), M5 | `by-module/module-6/K24-evidence.md`; `by-module/module-5/K24-evidence.md` | 🟢 | **Needs you:** OS, hardware and language legacy detail |
| K28 | Tools that support teamwork [wording to confirm] | not saved | M5 (P5) §2.4 | M6 (P6) §3.2 | `by-module/module-6/K28-evidence.md` | 🟡 | **Needs you:** whether pull requests were used; how tools helped the team |

### Skills (11)

| KSB | Topic | MV project | Lead evidence | Backup | Discussion draft | Status | Readiness and action |
|---|---|---|---|---|---|---|---|
| S4 | Design, code, test and debug a component | P4 (M2) ⇄ | M6 (P6) §3.1, §4, appendices | M7 (P7) 90 tests; M2 | `by-module/module-6/S4-evidence.md` | 🟢 | **Fix first:** M6 Python 3.9 vs 3.12. **Needs you:** your contribution |
| S7 | Work in and lead teams | P4 (M2) | M6 (P6) "unblocking two team members" (thin) | M2 (thin) | `by-ksb/leading-and-working-together.md` | 🟠 | **Needs you:** a real team you worked in or led |
| S8 | Apply organisational theories (change, ITSM) | P3 (M1) | M1 (P3) Kotter | M5 Mendelow, ELM; M6 ADKAR | `by-ksb/leading-and-working-together.md` | 🟡 | **Needs you:** a theory you applied, not just planned; ITSM example |
| S9 | Security and resilience techniques | P1 (M3) | M3 (P1) risk matrix, mitigations | M6 (P6) SR1 to SR6, failure scenarios | `by-module/module-3/S9-evidence.md`; `by-module/module-6/S9-evidence.md` | 🟢 | **Needs you:** which mitigations were implemented; score the M6 risks |
| S10 | Build and debug a data product | P2 (M4) | M4 (P2) §4, §6 ETL pipeline | M2 | `by-module/module-4/S10-evidence.md` | 🟢 | **Fix first:** M4 ingestion 6 hours vs 3 to 5 days. **Needs you:** real debugging examples |
| S11 | Data analysis techniques | P2 (M4) | M4 (P2) §5 | M2 (P4) model evaluation | `by-module/module-4/S11-evidence.md` | 🟡 | **Needs you:** one decision the analysis changed |
| S12 | Plan, design and manage networks | P1 (M3) | M3 (P1) §3 VLAN plan, allowlist | M6 (P6) Figure 2 | `by-module/module-3/S12-evidence.md` | 🟡 | **Needs you:** which parts are the real network; any network management |
| S15 ✅ | Apply legal, ethical, social and professional standards | P4 (M2) ⇄ | M5 (P5) | M2 (P4), M4 §10, M7 §4 | `by-module/module-5/S15-evidence.md` | 🟡 | **Needs you:** which steps happened; technical vs non-technical audiences. Distinction: justify |
| S20 ✅ | Respond to changing priorities | not saved | M6 (P6) §4.1 to §4.4 | none | `by-ksb/changing-priorities.md`; `by-module/module-6/S20-evidence.md` | 🟡 | **Needs you:** a real change of priorities (current examples are bug fixes). **Fix first:** M6 two vs three adaptation events |
| S21 | Adapt methods to evaluate outcomes | not saved | M6 (P6) | M7, M2, M4, M5 | `by-module/module-6/S21-evidence.md`; `by-module/module-7/S21-evidence.md` | 🟡 | **Fix first:** M7 coverage 99% vs 242/252 (96%) |
| S23 | Research to update knowledge and lead improvement | P5 (M5) | M5 (P5) §6.2, §6.3 | M7 references | `by-module/module-5/S23-evidence.md` | 🟡 | **Fix first:** recheck Xia et al. and Peng et al. citations |

### Behaviours (6)

| KSB | Topic | MV project | Lead evidence | Backup | Discussion draft | Status | Readiness and action |
|---|---|---|---|---|---|---|---|
| B1 | [wording to confirm] | not saved | M2 (P4) "Developer's Ethical Commitment" | M5, M6, M7 conduct | `by-module/module-2/B1-evidence.md` | 🟡 provisional | **Needs you:** save the B1 page; one workplace example |
| B2 | Reliable, objective, independent, team working | P4 (M2) | M2 (P4) peer feedback | M7 (P7) stated limitations | `by-module/module-7/B2-evidence.md` | 🟡 | **Needs you:** independent working; a team example |
| B4 | Continuous professional development | P1 (M3) ⇄ | M2, M7 reflections (thin) | none | `by-module/module-3/B4-evidence.md` | 🟠 | **Needs you:** dated CPD log, two items beyond the apprenticeship |
| B6 | Shares best practice | P4 (M2) | M2 (P4) brown-bag session, checklist | M6, M7 | `by-module/module-2/B6-evidence.md` | 🟡 | **Needs you:** date, audience size, feedback |
| B7 | Trends and innovations | P1 (M3), P5 (M5) | M5 (P5) trends turned into decisions | M3 (P1), M1 | `by-module/module-5/B7-evidence.md`; `by-module/module-3/B7-evidence.md` | 🟡 | **Needs you:** a trend you brought into your team |
| B8 | Diversity, inclusion and accessibility | P3 (M1) | M1 (P3) DEI objectives (generic) | none | `by-ksb/sustainability-and-accessibility.md` | 🟡 | **Needs you:** an accessibility test of your own solution; an inclusion example |

---

## Summary

| Readiness | Count | KSBs |
|---|---|---|
| Fix only (no personal input) | 6 | K12, K13, K16, K22, S21, S23 |
| Fix first and needs you | 4 | K19, S4, S10, S20 |
| Needs you | 24 | K6, K7, K8, K9, K10, K11, K14, K20, K21, K23, K24, K28, S7, S8, S9, S11, S12, S15, B1, B2, B4, B6, B7, B8 |

**Reading the numbers:** 28 of 34 KSBs need something only you can supply. The module submissions show you can do the work; what the assessor cannot see is **your** part in it, because none of the seven reports is consistently written in the first person. That is the single biggest risk to AM2.

## Before Gateway: the five things that move the most KSBs
1. **Answer `09_portfolio-AM2/evidence/your-answers.md` sections 1, 2 and 4.** Your role per module and one leadership, one team and one disagreement example feed 15 KSBs (K6, K7, K8, K9, K10, K14, K24, K28, S4, S7, S8, S15, B2, B6, B7).
2. **Correct the Must items in `09_portfolio-AM2/evidence/module-fix-list.md`** for M4, M5, M6 and M7. The portfolio can be refined until Gateway, and an assessor who spots a contradiction will ask about it.
3. **Write the K20 and B8 evidence** from a real sustainability policy and one accessibility test you run now. K20 is the only Distinction criterion with nothing behind it.
4. **Find one real change of priorities** for S20 (Pass and Distinction).
5. **Save the missing Multiverse pages** (Projects 6 and 7, and K8, K13, K21, K22, K23, K28, S20, S21, B1 wording), so the mapping above and the KSB wording can be confirmed.
