# ASWE Advanced Software Engineering Apprenticeship Portfolio
**EPA-Aligned Evidence Submission**

**Candidate:** Astha Malviya  
**Submission Date:** November 2026  
**Assessment Route:** Level 6 Degree Apprenticeship

---

## Portfolio Overview

This portfolio contains **7 evidence pieces** demonstrating coverage across **32 EPA KSBs** spanning data strategy, machine learning, cybersecurity, cloud architecture, business transformation, and software quality. Each project is explicitly mapped to EPA Knowledge, Skills, and Behaviours standards.

| # | Project | Duration | Primary KSBs | Business Outcome |
|---|---|---|---|---|
| **1** | Cybersecurity & Software Development | Strategic | K11, S9, B4, B7 | Risk governance framework |
| **2** | Data Engineering for Business Value | 6 months | K13, S11, K14, S10 | £30K annual labour savings |
| **3** | Data Strategy & Governance | 5-year roadmap | B8, K20, S8, K9, K10, K7 | £250K+ transformation potential |
| **4** | ML/AI Dissolution Risk Model | 4 months | K6, K19, K24, S4, S7, S15, B2, B6 | 85% faster case identification |
| **5** | AI Knowledge Search Proposal | 3 months | B7, S23 | £296K annual savings (BCR 24.5:1) |
| **6** | Cloud AI Governance Assistant | 6 months | K16, K24, K28, S20 | 0 defects, $41/month cost |
| **7** | Pricing Service Quality Refactoring | 8 weeks | K8, K21, K22, K23, S21, B1 | 99% coverage, 7 gaps resolved |

---

## Project 1: Cybersecurity & Software Development

**Context:** Companies House: high-value target (4.9M records, GDPR/Companies Act). Legacy flat network, weak segmentation enable lateral movement (EternalBlue/WannaCry precedent: NHS £92M impact).

**What You Did:**
- Designed Zero Trust network architecture: 5-layer segmentation (DMZ → App → Database → Corporate → Admin)
- Risk assessment: 5×5 matrix; 5 high-severity risks identified
- CVE mapping (EternalBlue, ProxyLogon, Apache traversal) + mitigation
- Compliance alignment (ISO 27001, NIST CSF, NCSC Cyber Essentials Plus)

**EPA KSBs Demonstrated:**

| KSB | Evidence |
|-----|----------|
| **K11: Common vulnerabilities in digital technology solutions** | Critically evaluated EternalBlue, ProxyLogon, Apache traversal vulnerabilities; assessed risks of unsecure coding (weak authentication) and unprotected networks (flat topology); documented likelihood/impact for each. |
| **S9: Apply security and resilience techniques** | Implemented risk assessments (5×5 matrix), mitigation strategies (VLAN segmentation, firewall allowlist, IDS/IPS), defense-in-depth layers (7 components). |
| **B4: Continuous professional development** | Stayed current with NCSC guidance, NIST CSF updates, CVE disclosures; applied latest security frameworks to architecture. |
| **B7: Trends and innovations awareness** | Incorporated Zero Trust principles (emerging NCSC guidance), EDR/SIEM monitoring (current best practice), multi-layered defense aligned with 2024+ threat landscape. |

**Business Impact:** £675K compliance risk mitigation; governance framework reusable across Projects 3, 5, 6

---

## Project 2: Data Engineering for Business Value

**Context:** Companies House data fragmented across 3 platforms (Oracle, APIs, bulk files). Manual reconciliation causing delays, errors (9.5% rate), audit gaps.

**What You Did:**
- Designed 5-layer ETL: Ingestion → Raw S3 → Staging → Curated Parquet → Athena
- Source-level validation: PostgreSQL procedures, fuzzy deduplication (pg_trgm)
- Governance: lineage tracking, automated validation, audit logging

**Results:**
- Data ingestion: 6 hrs → 1.2 hrs (80% faster)
- Error rate: 9.5% → 1.4% (85% improvement)
- Officer completeness: 88% → 97%
- **Annual savings: £30K** (£36K → £6K manual labour)

**EPA KSBs Demonstrated:**

| KSB | Evidence |
|-----|----------|
| **K13: Principles of data analysis** | Applied statistical validation, data quality metrics (completeness, accuracy, consistency); used correlation analysis, outlier detection to assess data reliability. |
| **S11: Determine and use appropriate data analysis techniques** | Used statistical analysis (descriptive stats), diagnostic analysis (data quality testing), predictive analysis (anomaly detection); measured improvements (error rate 9.5% → 1.4%). |
| **K14: Range of data gathering methods** | Evaluated quantitative sources (Oracle, APIs, bulk files); selected appropriate extraction methods per source; appraised trade-offs (API latency vs bulk efficiency). |
| **S10: Initiate, design, implement, debug data product** | Initiated ETL pipeline architecture; designed 5-layer medallion pattern; implemented Glue/Lambda/S3 automation; debugged data quality issues; aligned with company's analytical needs. |

**Business Impact:** £30K annual labour savings; 200+ staff gained real-time analytical access

---

## Project 3: Data Strategy & Governance Roadmap

**Context:** Companies House legacy system (Java 8, JSP, Oracle) causing 6-month SPIKE delays on features. Need: cloud-native, scalable, audit-compliant modernisation.

**What You Did:**
- Designed 5-year strategic roadmap: monolith → microservices (Spring Boot/Node.js) on AWS/GCP
- Led cross-functional alignment (Registrar Services, IT, Legal, Compliance, DEI)
- Applied Kotter's 8-step change management; risk mitigation across 5 likelihood/impact tiers
- Integrated sustainability and diversity principles throughout

**EPA KSBs Demonstrated:**

| KSB | Evidence |
|-----|----------|
| **B8: Champions diversity and inclusion** | Ensured digital solutions accessible to all staff (4.9M citizen focus); integrated accessibility standards (WCAG) into cloud strategy; sustainability via green computing (cloud reduces server carbon footprint). |
| **K20: Sustainable development approaches** | Applied green computing principles: cloud elasticity reduces idle server waste; microservices enable efficient resource allocation; evaluated environmental impact of modernisation (carbon reduction vs legacy on-premise). |
| **S8: Apply organisational theories** | Applied Kotter's 8-step change model (vision, coalition, buy-in, quick wins, consolidation, institutionalisation); used IT service management (ITIL) for operational handover. |
| **K9: Concepts and principles of leadership** | Described leadership principles applied: stakeholder engagement (8 groups: Registrar, IT, Legal, Compliance, DEI, Finance, Ops, Comms); visioning and alignment across government context. |
| **K10: Management techniques and theories** | Applied decision-making frameworks (weighted scoring for cloud platform selection), delegation (cross-functional workstreams), planning (5-year phased rollout with risk gates), change management. |
| **K7: Roles, functions, activities in technology solutions** | Reviewed organisational roles: architect (strategic design), tech leads (implementation), compliance officers (governance), operations (deployment); designed reusable patterns across microservices. |

**Business Impact:** £250K+ annual staff-hours savings; verified compliance roadmap (GDPR/FCA/HMRC); national economic resilience

---

## Project 4: ML/AI Dissolution Risk Prediction Model

**Context:** Manual due diligence across Compliance, Investment, Operations consuming £36K/year. Need: early-warning system for company failure prediction.

**What You Did:**
- Model selection: tested Random Forest, Logistic, Decision Trees, XGBoost; chose ensemble
- Feature engineering: company age, filing recency, director changes, financial ratios
- Class imbalance handling: SMOTE + weighted loss
- Ethical AI: bias mitigation, fairness assessment, GDPR compliance, explainability

**Model Performance:**
- F1: 0.80, Recall: 0.78, Accuracy: 0.86, AUC-ROC: 0.91
- Case identification: 2–3 days → <30 min (85% reduction)
- Labour: 12 hrs/week → 2 hrs/week (83% reduction)
- Multi-department adoption (Compliance, Investment, Operations, Legal)

**EPA KSBs Demonstrated:**

| KSB | Evidence |
|-----|----------|
| **K6: Approaches and techniques in SDLC** | Applied data science lifecycle: requirements gathering (multi-department needs), design (4-model evaluation), development (feature engineering), testing (stratified splits), implementation (production pipeline); ensured alignment with company standards. |
| **K19: Legal, ethical, social, professional standards** | Ensured GDPR compliance (no PII used); assessed bias across SIC codes/geographies; created ethical audit trail; justified decisions for non-technical stakeholders (Compliance, Finance). |
| **K24: Interpret and implement design with requirements** | Interpreted functional requirements (predict dissolution risk), non-functional (sub-30min latency), security (data residency, audit logging); balanced model complexity vs explainability. |
| **S4: Initiate, design, code, test, debug software component** | Initiated model evaluation framework; designed feature pipeline; implemented in Python (scikit-learn); tested with precision/recall/confusion matrix; debugged class imbalance issues. |
| **S7: Work effectively within teams** | Coordinated with ML Engineer, Data Analyst, BA, Compliance Officer, PM (cross-functional 5-person team); aligned on success metrics; communicated results to non-technical sponsors. |
| **S15: Apply legal, ethical, professional standards** | Applied GDPR principles, bias mitigation, explainability; communicated ethical framework to Compliance (technical audience) and Finance (non-technical audience). |
| **B2: Reliable, objective, capable of independent and team working** | Independently diagnosed class imbalance problem; objectively evaluated 4 models by AUC/F1; reliably delivered monthly predictions for 3 departments. |
| **B6: Participates in and shares best practice** | Documented model selection rationale, feature engineering decisions, bias assessment methodology; shared with team; established data quality standards for future projects. |

**Business Impact:** £30K annual labour cost reduction; multi-department adoption; fraud risk reduction

---

## Project 5: AI Knowledge Search Business Case & Proposal

**Context:** Version 1 team at Companies House spent 25% of feature timeline on SPIKEs (3–5 day discovery investigations). 6/8 features required extra sprints. Knowledge fragmented across 6 platforms.

**What You Did:**
- Business case: CBA analysis (£592K annual waste → 50% recovery = £296K)
- ROI: BCR 24.5:1, payback <2 weeks
- Risk register: ISO 31000:2018; 9 risks identified; mitigation costs £1,400
- AI ethics framework: Transparency (citation), Accountability (panel review), Fairness (no demographic indexing)

**EPA KSBs Demonstrated:**

| KSB | Evidence |
|-----|----------|
| **B7: Trends and innovations awareness** | Analysed emerging RAG architectures vs fine-tuning; surveyed LLM options (GPT-4, Llama); applied DSIT 2023 AI ethics guidance; stayed current with Azure OpenAI offerings. |
| **S23: Extend and update software development knowledge** | Researched RAG implementation patterns (Gao et al. 2023); reviewed AI governance best practices; informed organisation on responsible AI deployment; led knowledge improvement across team. |

**Business Impact:** £296K annual savings (50% conservative); organisational capability in AI governance

---

## Project 6: Cloud AI Governance Assistant (MVP Implementation)

**Context:** Companies House staff had no governed way to use AI on organisational documents; using consumer products outside audit trail.

**What You Did:**
- Designed stateless FastAPI architecture on EC2 behind API Gateway
- Implemented under constraint: 3 real adaptations (Python compatibility, OpenAI client initialization, CORS)
- CI/CD: GitHub Actions (Ruff + pytest → Docker); hard quality gates
- Infrastructure as Code: 9 AWS resources via Terraform; least-privilege IAM (zero wildcards)

**Production Results:**
- Performance: 0.49ms avg latency; 1,662 req/s at 50 concurrent users
- Coverage: 99% line coverage, 92% branch coverage; 12-test suite
- **Defects to production: ZERO**
- Cost: $41.12/month (scales to $250 at 1K users)

**Real Adaptations (S20 Evidence):**
1. **Python version compatibility**: Union syntax (str | None) required 3.10+; CI ran 3.9
   - Solution: Optional[str] + Ruff rule; unblocked 2 engineers; 10m → 90s feedback
2. **OpenAI client lazy initialization**: Import-time failure without API key
   - Solution: Singleton on first call; 10m → 90s feedback (~2 hours total saved)
3. **CORS misconfiguration**: Wildcard (*) blocked credentialled requests
   - Solution: Explicit allowlist per environment; frontend unblocked in 30m; security maintained

**EPA KSBs Demonstrated:**

| KSB | Evidence |
|-----|----------|
| **K16: Fundamental computer networking concepts** | Explained cloud architecture (EC2 vs Lambda trade-offs), API Gateway components (ALB for load balancing), quality of service (0.49ms latency, 99.95% uptime target). |
| **K24: Interpret and implement design with requirements** | Interpreted 6 functional (list docs, search, cite source...), 6 non-functional (latency <1ms, 99% coverage), 6 security (TLS, encryption, least-privilege) requirements; addressed legacy adoption challenges. |
| **K28: Approaches to effective teamwork and tools** | Used GitHub for version control (feature branches, code review); Docker for configuration management; Terraform for release management; enabled 3-engineer team coordination. |
| **S20: Respond to changing priorities and adapting plans** | Responded to 3 production blockers by revising recommendations: changed typing strategy, shifted client initialization, reconfigured CORS; adapted plan to fit deployment constraints; influenced team success. |

**Business Impact:** Zero-defect MVP; audit trail for governance; reusable architecture for org AI adoption

---

## Project 7: Pricing Service Quality & Design Patterns

**Context:** 90-line monolithic pricing service: coupled HTTP handling, business logic, persistence, time handling → 7 quality gaps creating financial mispricing risk.

**What You Did:**
- Diagnosed 7 gaps: high coupling, direct file I/O, embedded rules, non-deterministic time, multi-stage rounding, weak validation, magic numbers
- Designed layered architecture: Service Layer, Repository, Strategy, Clock Injection
- Implemented 90-test portfolio: 99% line coverage, 92% branch coverage, 0.21s execution

**Test Portfolio:**
- 34 characterisation tests (v0 baseline, regressions)
- 23 unit tests (pricing rules, repositories, clock)
- 19 service tests (orchestration)
- 14 integration tests (API boundary, complete flow)

**EPA KSBs Demonstrated:**

| KSB | Evidence |
|-----|----------|
| **K8: How teams work effectively to produce digital solutions** | Though solo project, applied team collaboration principles: code review discipline (pre-commit hooks), design patterns enabling peer review, documentation for future maintainers; showed how architecture enables team scaling. |
| **K21: Operate at all stages of SDLC** | Covered all stages: requirements (identify 7 gaps), design (layered architecture), development (Service/Repository/Strategy implementation), testing (90-test suite), evaluation (99% coverage, 92% branch coverage). |
| **K22: Principles of development techniques** | Explained Service Layer (decouples logic), Repository Pattern (abstracts persistence), Strategy Pattern (explicit rules), Dependency Injection (testability); UML-style component diagrams; frameworks (pytest, pydantic). |
| **K23: Principles of development methods** | Applied TDD principles (characterisation tests → unit tests → service tests); used iterative debugging (red-green-refactor cycle); adapted monolith-to-layered approach based on root-cause analysis. |
| **S21: Determine, refine, adapt software engineering methods** | Determined testing strategy (boundary-value analysis, deterministic time injection); refined to 4-tier pyramid; adapted to monolithic constraints; evaluated via coverage metrics and defect prevention. |
| **B1: Strong work ethic and commitment to standards** | Committed to high standards: 99% coverage (not just target-chasing), honest gap acknowledgment (rounding fragmentation, concurrency untested), distinguished coverage from behavioural evidence, refused to ship incomplete solution. |

**Honest Gaps Acknowledged:**
- Gap 5 (rounding fragmentation): Partially addressed; requires Strategy refinement
- Concurrency: Invoice write locking untested (file-based limitation)
- Production: Logging, monitoring, resilience designed but not implemented

**Key Insight:** "Seven gaps were symptoms of monolithic architecture, not independent defects. Fixing root cause (decomposition) prevents all downstream gaps."

**Business Impact:** Quality framework establishing standards for future refactoring; demonstrated professional accountability

---

## Cross-Project Learning: Lessons Applied

### Learning 1: Governance is Architectural
- **Project 1** (Cybersecurity): Governance framework at architecture stage
- **Applied in Project 5**: AI ethics (3-pillar framework) designed upfront, not bolted on
- **Applied in Project 6**: Security requirements (6 SRs) built into FastAPI design from day 1

### Learning 2: Testability Drives Design
- **Project 7** (Quality): Identified boundaries by asking "what needs independent testing?"
- **Applied in Project 6**: Stateless FastAPI chosen because it enables horizontal scaling without shared-state complications
- **Applied in Project 2**: Source-level validation enables deterministic data quality testing

### Learning 3: Business Case Discipline Enables Technical Authority
- **Project 5** (Business Case): BCR 24.5:1, ROI 2,346% provided financial legitimacy
- **Applied in Projects 3, 4**: Cost quantification (£250K+ strategy, £30K ETL savings) justified architectural decisions

### Learning 4: Risk Governance Scales Across Contexts
- **Project 3** (Data Strategy): ISO 31000 risk matrix (5×5 likelihood/impact)
- **Applied in Project 5**: 9-risk register for AI system with mitigation costs
- **Applied in Project 6**: Failure scenario analysis (OpenAI timeout, S3 outage, secret exposure)

### Learning 5: Multi-Audience Communication Essential
- **Project 3** (Leadership): Coordinated 8 stakeholder groups (Registrar, IT, Legal, Compliance, DEI, Finance, Ops, Comms)
- **Applied in Project 4**: Tailored communication (Compliance: ethical framework, Finance: cost-benefit, Operations: case identification time savings)
- **Applied in Project 5**: Mendelow stakeholder analysis for business case messaging

---

## EPA KSB Coverage Summary

**Knowledge (K) KSBs:** K6, K7, K8, K9, K10, K11, K13, K14, K16, K19, K20, K21, K22, K23, K24, K28 ✓ (16 KSBs)

**Skills (S) KSBs:** S4, S7, S8, S9, S10, S11, S15, S20, S21, S23 ✓ (10 KSBs)

**Behaviours (B) KSBs:** B1, B2, B4, B6, B7, B8 ✓ (6 KSBs)

**Total:** 32 EPA KSBs demonstrated across 7 projects

---

## Interview Preparation: Gap Analysis

### Gaps Not Directly Demonstrated (Interview Prep)

**Gap 1: K12 (Data gathering, management, analysis) – Partially demonstrated**
- *Evidence:* Project 2 (ETL) covers data management and analysis; Project 4 (ML) covers analysis
- *Gap:* Limited breadth on qualitative data gathering (interviews, surveys)
- *Prepared Response:* "Projects 2 and 4 showcase quantitative data work. Qualitatively, I'd gather requirements via stakeholder interviews (Project 3 leadership), conducted user research for AI system (Project 5), and analysed business processes for transformation planning. All three methods inform digital solutions."

**Gap 2: S12 (Plan, design, manage simple computer networks) – Not directly demonstrated**
- *Evidence:* Project 1 (Zero Trust) addresses network architecture at enterprise scale
- *Gap:* No explicit network design from scratch
- *Prepared Response:* "Project 1 designed enterprise network segmentation (DMZ, app, database VLANs). For a simple network, I'd apply the same principles: design layered architecture (internet → firewall → internal → database tiers), implement default-deny firewall rules, monitor with IDS/IPS, ensure quality of service via load balancing. The principles scale down; I'd adjust scope to organisation size."

**Gap 3: S5/S6 (Software development lifecycle specifics) – Not explicitly demonstrated**
- *Evidence:* All projects cover SDLC implicitly (Project 7 explicitly covers all stages)
- *Gap:* No explicit project management/agile coaching shown
- *Prepared Response:* "Project 7 demonstrates all SDLC stages (requirements → design → development → testing → evaluation). If leading a team through Scrum/Agile, I'd: define user stories (requirements), run sprint planning (design priority), execute daily standups (communication), run retrospectives (continuous improvement). I've seen these applied in Project 3's cross-functional coordination and Project 4's multi-team ML work."

---

## Business Impact Summary

| Project | Metric | Value | Type |
|---------|--------|-------|------|
| Project 1 | Compliance risk mitigated | £675K | Risk governance |
| Project 2 | Annual labour savings | £30K | Operational efficiency |
| Project 3 | Transformation potential | £250K+/year | Strategic enablement |
| Project 4 | Case identification time | 85% reduction | Operational efficiency |
| Project 5 | Annual knowledge savings | £296K | Business case |
| Project 6 | Production defects | 0 (100% caught in CI) | Quality |
| Project 7 | Test coverage | 99% line, 92% branch | Quality |

**Cumulative:** £250K+ (strategy) + £30K (data) + £296K (knowledge) + compliance/risk mitigation + quality standards

---

## Conclusion

This portfolio demonstrates EPA competency through:
- ✓ **Breadth**: 7 distinct projects across security, data, strategy, ML, cloud, quality disciplines
- ✓ **KSB Coverage**: 32 EPA standards mapped with explicit evidence
- ✓ **Business Impact**: Quantified outcomes (£250K+, 85% improvements, 99% coverage)
- ✓ **Growth**: Role progression (IC → Tech Lead → Architect across 3 years)
- ✓ **Learning**: Cross-project narratives showing knowledge application and adaptation
- ✓ **Professional Maturity**: Honest gap acknowledgment, ethical awareness, continuous improvement mindset

**Ready for assessment discussion and capstone integration.**

---

**Portfolio prepared for ASWE Advanced Software Engineering Apprenticeship Assessment | November 2026**
