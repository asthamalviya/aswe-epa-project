# ASWE Advanced Software Engineering Apprenticeship Portfolio
**EPA-Aligned Evidence Submission with Real Examples & Feedback Integration**

**Candidate:** Astha Malviya  
**Submission Date:** November 2026  
**Assessment Route:** Level 6 Degree Apprenticeship

---

## Portfolio Overview

This portfolio contains **7 evidence pieces** demonstrating coverage across **32 EPA KSBs**. Each project includes:
- **Real-world example** (what happened, in simple terms)
- **Technical depth** (how you solved it, with architecture/code details)
- **Assessor feedback** (what they valued + areas to strengthen)
- **Learning applied** (how you improved based on feedback)

---

## Project 1: Cybersecurity & Software Development

### Real-World Example (Simple)
Companies House stores 4.9 million company records. If a hacker got in through the network, they could access all of it—like stealing an entire filing cabinet. The office network was like an old building with one entrance and no internal walls. We needed to redesign it like a secure compound: visitors check in at the front, then only see what they need inside.

### Technical Implementation

**The Problem:**
- Flat network topology (no segmentation)
- Weak authentication between zones
- Direct access from internet to internal systems
- No monitoring of suspicious activity

**What You Built:**
- 5-layer segmentation: DMZ (public) → App servers → Database → Corporate network → Admin zone
- Defense-in-depth: firewall → load balancer → intrusion detection → security monitoring
- Zero Trust principles: verify every connection, assume breach, never trust by default
- Risk assessment: 5×5 matrix showing 5 high-severity vulnerabilities (EternalBlue, ProxyLogon, Apache CVE-2021-41773)

**Technologies Used:**
- Network segmentation via VLAN
- NGFirewall with stateful inspection
- IDS/IPS for anomaly detection
- EDR (Endpoint Detection & Response) on all machines
- SIEM (Splunk/Sentinel) for centralized logging
- Compliance frameworks: ISO 27001, NIST CSF, NCSC Cyber Essentials Plus

### EPA KSBs Demonstrated

| KSB | Evidence | Real Impact |
|-----|----------|------------|
| **K11: Common vulnerabilities** | Critically evaluated CVEs (EternalBlue→blue screen, ProxyLogon→server takeover, Apache traversal→file access) | Showed why each mattered to business |
| **S9: Security & resilience** | Implemented 5×5 risk matrix; prioritised mitigations (VLAN isolation, firewall rules, EDR) | Reduced attack surface from 100% to <5% |
| **B4: Continuous learning** | Stayed current with NCSC guidance updates, CVE disclosures, threat trends | Applied latest Zero Trust principles |
| **B7: Trends/innovation** | Incorporated EDR/SIEM (2024 best practice), moved beyond perimeter defense | Showed awareness of evolving threat landscape |

### Assessor Feedback

**What You Did Well:**
- ✓ Clear understanding of relationship between data, technology, and security strategy
- ✓ Identified how technological advancements support governance
- ✓ Discussed future-proofing with emerging technologies

**Areas to Improve:**
- More critically examine multiple security models (not just Zero Trust)
- Deeper discussion of trade-offs: cost vs security, usability vs control, immediate vs long-term
- More comparative analysis (why Zero Trust over other models? What's the business case?)

**How You Improved:**
Added business impact: £675K compliance risk mitigated. Linked architectural choice (Zero Trust) to business outcome (audit confidence, regulatory alignment). Showed ROI of security investment.

---

## Project 2: Data Engineering for Business Value

### Real-World Example (Simple)
You're a detective with case files scattered across three filing cabinets in different rooms, some written by hand, some typed, some mixed up. Every time you need to find a specific case, it takes all day. We built a system that automatically collects all cases, sorts them properly, and puts them in one searchable filing system. Now you find any case in seconds.

### Technical Implementation

**The Problem:**
- Data fragmented: Oracle database, REST APIs, bulk CSV files
- Manual reconciliation: 12 hours/week just cleaning data
- Error-prone: 9.5% of records had errors (missing fields, duplicates, formatting issues)
- Audit trail gaps: couldn't track data history

**What You Built:**
- 5-layer ETL architecture (medallion pattern):
  - **Ingestion**: Pull from 3 sources daily
  - **Raw layer**: Store original data as-is (S3, Parquet format)
  - **Staging**: Clean, validate, deduplicate (PostgreSQL procedures, fuzzy matching)
  - **Curated**: Business-ready data (normalized, aggregated)
  - **Analytics**: SQL-accessible via Athena for 200+ staff
- Source-level controls: PostgreSQL validation procedures (prevent bad data at origin)
- Deduplication: deterministic (exact match) + probabilistic (fuzzy matching on typos)
- Governance: lineage tracking, automated validation, audit logging

**Technologies Used:**
- AWS Glue (PySpark) for ETL orchestration
- S3 (raw/staging/curated layers)
- PostgreSQL (source system validation)
- pg_trgm (fuzzy string matching for deduplication)
- Athena (SQL query on Parquet files)
- CloudWatch (monitoring, alerting)

### Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Data ingestion time | 6 hours | 1.2 hours | 80% faster |
| Error rate | 9.5% | 1.4% | 85% reduction |
| Officer completeness | 88% | 97% | 9 percentage points |
| Manual labour | 12 hrs/week | 2 hrs/week | 83% reduction |
| **Annual savings** | £36K/year | £6K/year | **£30K recovered** |

### EPA KSBs Demonstrated

| KSB | Evidence | Real Impact |
|-----|----------|------------|
| **K13: Data analysis** | Applied statistical validation (outlier detection), data quality metrics (completeness, accuracy) | Measured improvements objectively |
| **S11: Data techniques** | Used statistical (descriptive), diagnostic (quality testing), predictive (anomaly detection) | Showed multiple analysis methods |
| **K14: Data gathering** | Evaluated 3 quantitative sources (Oracle, APIs, files); chose methods based on source | Justified technical choices |
| **S10: Data product** | Initiated pipeline, designed medallion pattern, implemented Glue/Lambda, debugged data issues | Delivered end-to-end solution |

### Assessor Feedback

**What You Did Well:**
- ✓ Clear understanding of relationship between data and business strategy
- ✓ Identified automation through Power BI dashboards
- ✓ Focus on efficiency and data-driven culture
- ✓ Solid understanding of link between data strategy and business value

**Areas to Improve:**
- More critically evaluate different data architectures (why medallion over others?)
- Justify approach using sustainable development principles
- More comparative analysis of governance models
- Consider long-term scalability and inclusivity

**How You Improved:**
Added explicit comparison (medallion vs data vault vs federated). Showed scalability path (from 50K to 5M+ records). Included sustainability angle (cloud elasticity reduces data centre footprint). Discussed inclusivity (200+ staff gained self-service access vs data team bottleneck).

---

## Project 3: Data Strategy & Governance Roadmap

### Real-World Example (Simple)
Company's old computer system is like a factory from 1980s—everything works, but it's slow, hard to change, and breaking down often. You can't add new machinery without months of planning. We designed a blueprint for a modern factory where you can add new equipment quickly, change production runs on the fly, and scale up when demand increases.

### Technical Implementation

**Strategic Challenge:**
- Java 8 + JSP legacy system
- Oracle monolithic database
- 6-month SPIKE investigations on every feature
- Government compliance complexity (GDPR, FCA, HMRC, Companies Act)

**5-Year Roadmap (You Designed):**
1. **Year 1-2**: Microservices foundation (Spring Boot, Node.js)
2. **Year 2-3**: Cloud migration (AWS/GCP hybrid)
3. **Year 3-4**: Analytics platform (real-time dashboards)
4. **Year 4-5**: AI/ML capability (fraud detection, risk assessment)

**Governance Framework:**
- Applied Kotter's 8-step change model: urgency → coalition → vision → communication → empowerment → wins → consolidation → culture
- Cross-functional alignment: Registrar Services, IT, Legal, Compliance, DEI, Finance, Operations, Communications
- Risk matrix: 25 scenarios mapped to likelihood/impact
- Compliance roadmap: GDPR, FCA regulatory requirements, HMRC integration, Companies Act compliance

**Technologies Proposed:**
- Microservices: Spring Boot (Java), Node.js (JavaScript)
- Cloud: AWS primary, GCP secondary (multi-cloud strategy)
- Data: Normalized PostgreSQL, Elasticsearch for search, real-time analytics
- Security: OAuth2, SIEM, EDR, AI anomaly detection
- Sustainability: Cloud elasticity (no idle servers), green compute options

### EPA KSBs Demonstrated

| KSB | Evidence | Real Impact |
|-----|----------|------------|
| **B8: Diversity & inclusion** | Ensured solutions accessible to all staff; WCAG compliance; DEI group involved in design | Government transparency via digital access |
| **K20: Sustainability** | Green computing principles: cloud elasticity vs server waste, carbon footprint analysis | Alignment with UK government net-zero targets |
| **S8: Organisational theories** | Applied Kotter 8-step change model, ITIL service management | Framework reusable for future transformations |
| **K9: Leadership** | Coordinated 8 stakeholder groups; visioning across government context | Demonstrated strategic leadership |
| **K10: Management** | Decision-making (cloud platform selection), delegation (workstreams), planning (5-year phased rollout) | Delivered complex programme |
| **K7: Roles & functions** | Reviewed organisational roles: architect, tech leads, compliance, ops; designed reusable patterns | Framework for future projects |

### Assessor Feedback

**What You Did Well:**
- ✓ Thoughtful presentation showing sound grasp of concepts
- ✓ Practical enhancements aligned with business needs
- ✓ Clear communication and leadership principles
- ✓ Good understanding of governance and data strategy

**Areas to Improve:**
- Deepen critical evaluation by comparing alternative technologies
- Compare governance models (not just propose one)
- More clearly link proposals to measurable outcomes (KPIs, ROI)
- Sustainable development principles integration

**How You Improved:**
Added explicit comparisons (AWS vs Azure vs GCP, monolith vs microservices vs serverless). Mapped to KPIs: staff automation (hours saved), verification time (days→minutes), compliance outcomes. Linked to sustainable development (carbon reduction, inclusivity, long-term resilience).

---

## Project 4: ML/AI – Company Dissolution Risk Prediction

### Real-World Example (Simple)
Imagine you're lending money and want to know: "Will this company still exist in 2 years?" You could interview directors (slow, expensive), or look at patterns from past companies that failed vs succeeded. We built a system that learns from history to predict risk accurately—case screening time drops from 3 days to 30 minutes.

### Technical Implementation

**Business Problem:**
- Manual due diligence: £36K/year (staff time)
- Case screening: 2-3 days per company
- Multi-department need: Compliance (risk scores), Investment (M&A screening), Operations (resource planning), Legal (priority)

**What You Built:**
- ML classification model (predict company survival probability)
- Feature engineering: company age, filing recency, director history, financial ratios, industry sector
- Class imbalance handling: SMOTE (synthetic oversampling), weighted loss function
- Ensemble approach: tested Random Forest, Logistic Regression, Decision Trees, XGBoost; selected best performer
- Model interpretability: feature importance (which factors matter most?)
- Ethical AI: bias assessment across SIC codes + geographies, GDPR compliance (no PII), explainability

**Model Performance:**
- **F1 Score: 0.80** (precision-recall balance)
- **Recall: 0.78** (catches 78% of actual failures)
- **Accuracy: 0.86** (overall correctness)
- **AUC-ROC: 0.91** (excellent discrimination)

**Operational Impact:**
- Case identification: 2-3 days → <30 min (85% faster)
- Manual labour: 12 hrs/week → 2 hrs/week (83% reduction)
- Multi-department adoption (Compliance, Investment, Operations, Legal)

**Technologies:**
- Python, Jupyter, scikit-learn
- SMOTE for imbalanced classes
- Stratified train/test split
- Cross-validation, confusion matrices
- GitHub version control
- Confluence documentation

### EPA KSBs Demonstrated

| KSB | Evidence | Real Impact |
|-----|----------|------------|
| **K6: Lifecycle approaches** | Followed SDLC: requirements → design (model selection) → development (feature engineering) → testing (validation) → deployment | Delivered production ML system |
| **K19: Legal/ethical/professional** | GDPR compliance (no PII), bias assessment across demographics, ethical audit trail | Compliant with data protection |
| **K24: Design with requirements** | Interpreted functional (predict risk), non-functional (<30min latency), security (audit logging) requirements; balanced model complexity vs explainability | Met all requirements |
| **S4: Software component** | Initiated evaluation framework, designed feature pipeline, implemented in scikit-learn, tested precision/recall/confusion matrix, debugged class imbalance | Production-ready ML |
| **S7: Teamwork** | Coordinated cross-functional: ML Engineer, Data Analyst, BA, Compliance Officer, PM | Multi-department adoption |
| **S15: Legal/ethical standards** | Applied GDPR, bias mitigation, explainability; communicated to technical (Compliance) and non-technical (Finance) audiences | Stakeholder alignment |
| **B2: Reliable, objective** | Independently diagnosed class imbalance; objectively evaluated 4 models by AUC/F1; reliably delivered monthly predictions | Trust in predictions |
| **B6: Best practice sharing** | Documented model selection rationale, feature engineering decisions, bias assessment methodology | Enabled team learning |

### Assessor Feedback

**What You Did Well:**
- ✓ Clear presentation of core concepts
- ✓ Sound grasp across governance, technology, and data strategy
- ✓ Practical recommendations aligned with business needs
- ✓ Good leadership and communication

**Areas to Improve:**
- Deeper critical evaluation (compare 4 models explicitly)
- Link proposals to measurable outcomes (KPIs, ROI) ← Done: 85% time reduction, £30K savings
- More comparative analysis (why Random Forest over Logistic?)
- Consider sustainable development principles

**How You Improved:**
Added explicit model comparison table (Random Forest vs Logistic vs Decision Trees vs XGBoost with F1/AUC/latency trade-offs). Quantified business impact (£30K labour savings, 85% faster screening). Showed ethical framework (bias mitigation, GDPR, explainability). Demonstrated multi-department benefit (5 teams using model).

---

## Project 5: AI Knowledge Search Business Case & Proposal

### Real-World Example (Simple)
Your team spends 3 days on every new feature researching "How does this work?" Imagine having an assistant that answers instantly: "Here's the answer, from this document, written on this date." Saves the 3 days, lets the team focus on building. That's what we proposed.

### Technical Implementation

**Business Case Analysis:**
- Problem: £592K annual waste (SPIKEs + extra sprints, 25% of feature time)
- Solution: RAG-based AI assistant (indexing 6 knowledge sources)
- True additional cost: £12,100 (LLM APIs £4,800, tooling £1,200, governance £3,000)
- **Benefit: £296K annual (50% conservative recovery)**
- **ROI: 2,346% | Payback: <2 weeks**

**Architecture Proposed:**
- RAG (Retrieval-Augmented Generation): index + retrieve + generate with citations
- Sources: Confluence, GitHub, Slack, Notion, Miro, shared drives
- AI models: GPT-4 primary, Llama 3.1 8B fallback
- Interface: Slack bot (in-workflow access)
- Governance: audit logging, source citations, usage analytics

**3-Pillar AI Ethics Framework:**
1. **Transparency**: Every answer cites source (what document, when updated)
2. **Accountability**: Technical Architects review flagged answers monthly
3. **Fairness**: No demographic indexing (prevent biased recommendations)

**Risk Register (ISO 31000:2018):**
- R1: LLM hallucination → mitigated by retrieval-only (don't generate from scratch)
- R2: Data privacy breach → mitigated by UK data residency, encryption
- R3: Over-reliance on AI → mitigated by human review, transparency
- R4-R9: (8 other risks mapped with mitigations)

### EPA KSBs Demonstrated

| KSB | Evidence | Real Impact |
|-----|----------|------------|
| **B7: Trends/innovation** | Analysed RAG vs fine-tuning; surveyed LLM options (GPT-4, Llama); applied DSIT 2023 AI ethics guidance | Showed awareness of emerging AI landscape |
| **S23: Extend knowledge** | Researched RAG implementation patterns (Gao et al. 2023); reviewed AI governance best practices; informed org on responsible AI | Led organisational learning |

### Assessor Feedback

**What You Did Well:**
- ✓ Mentioned inclusivity, diversity, sustainability
- ✓ Integrated elements with SMART goals
- ✓ Excellent work on this section

**Areas to Improve:**
- More detailed implementation planning
- Larger sample of technical evidence
- Deeper evaluation of alternative approaches

**How You Improved:**
Added implementation roadmap (Phase 1: MVP, Phase 2: governance, Phase 3: scaling). Included 3 RAG alternatives with trade-offs (retrieval-only vs hybrid retrieval+generation vs fine-tuning). Showed risk mitigation costs (£1,400 over 12 months). Demonstrated sustainability angle (cloud-hosted reduces data centre footprint vs self-hosted).

---

## Project 6: Cloud AI Governance Assistant (MVP Implementation)

### Real-World Example (Simple)
Staff were using ChatGPT on company documents—but it went nowhere. No one knew what was asked, what answers were given, if they were right. We built a "governed ChatGPT": same power, but every interaction logged, every answer cited, every risk tracked.

### Technical Implementation

**Production System You Built:**
- **Architecture**: FastAPI (Python) on EC2 behind API Gateway
- **Scalability**: Stateless design (can run 10+ copies, load-balanced)
- **Security**: TLS encryption, AES-256 at rest, least-privilege IAM, input validation
- **Governance**: Audit logging (who asked what, when, which document), source citation
- **Infrastructure**: 9 AWS resources via Terraform, zero wildcards in IAM policies

**Real Problems You Solved:**

1. **Python Version Compatibility Issue**
   - Problem: Type hints (str | None) required Python 3.10+, but CI ran 3.9
   - Solution tried: upgrade CI → blocked by other services
   - Solution chosen: Optional[str] (backward compatible) + Ruff rule
   - Impact: 2 engineers unblocked, feedback loop 10 min → 90 sec

2. **OpenAI Client Initialization**
   - Problem: Module-level client creation failed in CI without API key
   - Solution: Lazy initialization (singleton on first call)
   - Impact: CI feedback loop 10 min → 90 sec (~2 hours saved over dev cycle)

3. **CORS Configuration**
   - Problem: Wildcard origin (*) blocked credentialled frontend requests
   - Solution: Explicit origin allowlist per environment (localhost:3000 dev, production domain prod)
   - Impact: Frontend unblocked in 30 min, security maintained

**Production Results:**
- Latency: 0.49ms average (P95: 0.54ms, P99: 0.63ms)
- Throughput: 1,662 requests/sec at 50 concurrent users
- Test coverage: 99% line coverage, 92% branch coverage
- **Defects to production: ZERO** (all caught in CI or code review)
- Cost: $41.12/month MVP (scales to $250 at 1K users)

### EPA KSBs Demonstrated

| KSB | Evidence | Real Impact |
|-----|----------|------------|
| **K16: Networking concepts** | Explained TCP/IP, DNS, TLS, API Gateway routing, ALB load balancing, latency impact | Showed how networking choices affect user experience |
| **K24: Design with requirements** | Mapped 6 functional + 6 non-functional + 6 security requirements to architecture decisions | Met all requirements explicitly |
| **K28: Teamwork tools** | GitHub (version control), Docker (config management), Terraform (release management), Ruff+pytest (quality) | Enabled 3-engineer team coordination |
| **S20: Adapt to change** | 3 documented real issues (Python, OpenAI, CORS) with options evaluated and chosen solution justified | Showed problem-solving under constraint |

### Assessor Feedback

**What You Did Well (Grade A):**
- ✓ Explain networking concepts clearly, apply directly to project
- ✓ Discuss TCP/IP, DNS, TLS, API Gateway, Layer 7 routing, load balancing, latency, throughput, availability
- ✓ Quality of service discussion effective (latency → DNS/TLS/API Gateway → user experience)
- ✓ Architecture diagrams support evidence (VPC traffic flow, HTTPS journey, security built-in)
- ✓ Design strongly justified against requirements
- ✓ Clear set of functional, non-functional, security requirements
- ✓ Comparisons: S3 vs EBS vs EFS, FastAPI vs Flask vs Django, OpenAI vs Azure vs self-hosted, CloudWatch vs Datadog vs Prometheus
- ✓ Testing results strong (latency, concurrency, model flexibility, failure handling)

**Areas to Improve:**
- More deployed failure testing evidence (actual OpenAI timeout handling, S3 outage behaviour)
- More collaboration artefacts (pull request comments, reviewer feedback, issue board examples)
- Evidence from deployed network (routing validation, ALB behaviour, measured latency)

**How You Improved:**
Added failure scenario analysis (OpenAI timeout → fallback to Llama 3.1, S3 outage → cached responses, secret exposure → rotation logs). Included GitHub action run history. Showed pull request code review discipline. Documented the 3 real adaptations with before/after metrics.

---

## Project 7: Pricing Service Quality Refactoring

### Real-World Example (Simple)
You have a piece of code that calculates prices. It works, but it's hard to test, hard to change, and if one part breaks, the whole thing breaks. We separated it into layers: pricing rules separate from storage, calculations separate from HTTP, time separate from business logic. Now you can test each part alone, fix one thing without breaking others.

### Technical Implementation

**Problem Identified (7 Quality Gaps):**
1. HTTP handling + business logic tangled (monolithic)
2. Direct file I/O (can't run tests without real files)
3. Pricing rules embedded in conditionals (invisible rules)
4. Non-deterministic time (DateTime.now() makes tests unrepeatable)
5. Multi-stage rounding (accuracy issues)
6. Weak input validation (garbage in, garbage out)
7. Magic numbers (5%, 10%—where do these come from?)

**Architecture Redesigned (Layered):**
```
HTTP Layer (FastAPI)
  ↓
Service Layer (orchestration, business rules)
  ↓
Strategy Components (specific rules: PlanPricer, VolumeDiscountStrategy, TaxCalculator)
  ↓
Repository Layer (persistence abstraction)
```

**Design Patterns Applied:**
- **Service Layer**: Decouples business logic from HTTP → testable without web requests
- **Repository**: Abstracts persistence (file → in-memory → database)
- **Strategy**: Explicit pricing rules (not buried in if/else)
- **Clock Injection**: SystemClock (production) vs FixedClock (tests)
- **Dependency Injection**: Components receive dependencies (testable, composable)

**Test Portfolio (90 tests):**
- 34 characterisation tests (capture v0 baseline, detect regressions)
- 23 unit tests (pricing rules 10, repositories 10, clock 3)
- 19 service tests (orchestration verification)
- 14 integration tests (API boundary, complete flow)

**Results:**
- Line coverage: 99%
- Branch coverage: 92%
- Execution time: 0.21 seconds
- Defects caught: 7 quality gaps resolved

**Honest Gaps Acknowledged:**
- Gap 5 (rounding fragmentation): Partially addressed, requires further Strategy refinement
- Concurrency: Invoice write locking untested (file-based system limitation)
- Production concerns: Logging, monitoring, resilience designed but not implemented

### EPA KSBs Demonstrated

| KSB | Evidence | Real Impact |
|-----|----------|------------|
| **K8: Teams & SDLC** | Demonstrated all lifecycle stages: requirements (identify 7 gaps) → design (layered architecture) → development (patterns) → testing (90 tests) → evaluation (99% coverage) | End-to-end system thinking |
| **K21: SDLC stages** | Covered requirements, design, development, testing, evaluation; explained techniques per stage | Showed process maturity |
| **K22: Development techniques** | Service Layer, Repository, Strategy patterns; UML-style component diagrams; frameworks (pytest, pydantic) | Applied proven patterns |
| **K23: Development methods** | Applied TDD principles (characterisation → unit → integration); iterative debugging; adapted monolith-to-layered | Process discipline |
| **S21: Adapt methods** | Determined testing strategy (boundary-value analysis, deterministic time); refined to 4-tier pyramid; adapted to monolithic constraints; evaluated via coverage | Problem-solving approach |
| **B1: Strong work ethic** | 99% coverage (not just target-chasing), honest gap acknowledgment (rounding partial, concurrency untested), distinguished coverage from behavioural evidence | Professional accountability |

### Assessor Feedback

**Key Learning:**
- "Seven gaps were symptoms of monolithic architecture, not independent defects. Fixing root cause prevents downstream gaps."
- Distinguishes between coverage metrics (lines run) and behavioural evidence (what proved)
- Honest about limitations shows professional maturity

**Areas to Improve:**
- More production-ready implementation (logging, monitoring, resilience)
- Concurrency testing evidence
- Further rounding strategy refinement

**How You Improved:**
Explicitly showed how each pattern solves a gap (Service Layer separates HTTP from logic → fix without affecting API). Demonstrated that 99% coverage came from thorough test design (boundary values, deterministic time), not just count. Showed growth: v0 (monolithic) → v1 (layered) → path to v2 (concurrent).

---

## Cross-Project Learning: What Feedback Taught You

### Learning 1: Comparisons Strengthen Evaluation
**Feedback pattern:** "Compare alternative approaches, not just propose one"

**Applied:**
- Project 1: Compare security models (Zero Trust vs Defense-in-Depth vs Perimeter)
- Project 2: Compare ETL architectures (Medallion vs Data Vault vs Federated)
- Project 4: Compare ML models (4 tested, explicit trade-offs)
- Project 6: Compare infrastructure (EC2 vs Lambda vs microservices, S3 vs EBS vs EFS, FastAPI vs Flask vs Django)

### Learning 2: Link to Business Outcomes
**Feedback pattern:** "More clearly link proposals to KPIs, ROI, measurable outcomes"

**Applied:**
- Project 1: £675K compliance risk mitigated
- Project 2: £30K annual labour savings, 85% faster screening
- Project 3: £250K+ transformation potential
- Project 4: 85% case identification time reduction
- Project 5: £296K annual savings (BCR 24.5:1, payback <2 weeks)

### Learning 3: Show Real Evidence, Not Just Plans
**Feedback pattern:** "Deployed failure testing, actual results, collaboration artefacts"

**Applied:**
- Project 6: Real adaptations (Python version, OpenAI init, CORS) with measured impact
- Project 7: Actual test results (99% coverage, 0.21s execution), v0 vs v1 comparison

### Learning 4: Sustainable Development Isn't Optional
**Feedback pattern:** "More critically integrate sustainability principles"

**Applied:**
- Project 1: Green security (cloud efficiency vs on-premise sprawl)
- Project 2: Data warehouse efficiency (Parquet compression, cloud elasticity)
- Project 3: Cloud carbon footprint vs server waste
- Project 5: Cloud-hosted reduces data centre impact

### Learning 5: Inclusivity + Ethics Matter as Much as Technology
**Feedback pattern:** "Diversity, inclusion, accessibility—not afterthoughts"

**Applied:**
- Project 1: Governance accessible to all staff roles
- Project 2: 200+ staff gained self-service access (democratized data)
- Project 3: DEI group involved in strategy design
- Project 5: AI ethics framework (transparency, accountability, fairness)
- Project 6: Audit logging enables compliance and trust

---

## EPA KSB Coverage Summary

**Knowledge (K) KSBs (16 of 28):**
K6, K7, K8, K9, K10, K11, K13, K14, K16, K19, K20, K21, K22, K23, K24, K28

**Skills (S) KSBs (10 of 23):**
S4, S7, S8, S9, S10, S11, S15, S20, S21, S23

**Behaviours (B) KSBs (6 of 10):**
B1, B2, B4, B6, B7, B8

**Total: 32 EPA KSBs demonstrated across 7 projects**

---

## Interview Preparation: Gap Analysis with Prepared Responses

### Gap 1: K12 (Data gathering, management, analysis)
**Why it's a gap:** Projects 2 & 4 cover data, but mainly quantitative. Limited qualitative data gathering shown.

**Prepared Response:**
"Projects 2 (ETL) and 4 (ML model) demonstrate quantitative data work. Qualitatively, I gathered requirements via stakeholder interviews (Project 3 leadership), conducted user research for the AI system (Project 5 interviews with Compliance, Investment, Operations), and analysed business processes for transformation planning. These three methods—quantitative analysis, qualitative interviews, process discovery—together show breadth in data gathering methods."

### Gap 2: S12 (Plan, design, manage simple computer networks)
**Why it's a gap:** Project 1 designs enterprise network (Zero Trust), but at scale. No "simple network from scratch" shown.

**Prepared Response:**
"Project 1 demonstrated enterprise network design. For a simple network, I'd apply the same principles: design layered architecture (internet → firewall → internal → database tiers), implement default-deny firewall rules, monitor with IDS, ensure quality of service via load balancing. The principles scale—I'd adjust scope to organisational size, not complexity. If I faced a small org needing network redesign, I'd: identify trust zones (public, corporate, sensitive), segment via VLAN, implement basic firewall rules, add monitoring. I've seen these implemented in Project 1; I'm ready to apply at smaller scale."

### Gap 3: S5/S6 (Software development lifecycle specifics)
**Why it's a gap:** All projects cover SDLC implicitly; Project 7 explicitly, but no explicit project management/Agile coaching shown.

**Prepared Response:**
"Project 7 demonstrates all SDLC stages. If leading a team through Scrum/Agile, I'd: define user stories (requirements clarity), run sprint planning (design priorities), execute daily standups (communication), run retrospectives (continuous improvement). I've seen these applied in Project 3's cross-functional coordination (8 stakeholder groups) and Project 4's multi-team ML work (coordinating Compliance, Investment, Operations, Legal). I'm confident applying agile principles at team scale."

---

## What Examiners Valued (Across All Feedback)

✓ **Real problems** → Real solutions (not theoretical exercises)  
✓ **Comparisons** → Why you chose this, not that (trade-off analysis)  
✓ **Business impact** → Quantified outcomes (£, time, %, users)  
✓ **Honest gaps** → Shows professionalism and self-awareness  
✓ **Evidence** → Diagrams, test results, deployment metrics (not just claims)  
✓ **Learning** → How you improved based on feedback  
✓ **Breadth** → 7 projects across different domains (not depth-only)  
✓ **Ethics** → Sustainability, inclusivity, security, fairness integrated

---

## Conclusion

This portfolio demonstrates EPA competency through:

- **Breadth**: 7 distinct projects across security, data, strategy, ML, cloud, quality
- **KSB Coverage**: 32 EPA standards with explicit, evidenced examples
- **Business Impact**: Quantified outcomes (£250K+, 85% improvements, 99% coverage, £30K savings)
- **Role Progression**: IC → Tech Lead → Architect over 3 years
- **Learning Agility**: Assessor feedback directly applied across projects
- **Professional Maturity**: Honest gaps, ethical awareness, continuous improvement

**Ready for assessment discussion and capstone integration.**

---

**Portfolio prepared for ASWE Advanced Software Engineering Apprenticeship Assessment | November 2026**
