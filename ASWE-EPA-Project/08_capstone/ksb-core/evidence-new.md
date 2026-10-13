# Capstone New Evidence - Strengthening Your Submission

## The Gap: Show Integration Across All Competencies

Examiners want: "This project required X, Y, and Z competencies working together. Here's the outcome and impact."

---

## Example Capstone: Build and Launch a Product MVP

### Project Overview

**Project Name:** Real-Time Analytics Platform for E-Commerce

**Duration:** 6 months (Jan–Jun 2024)

**Team:** You (tech lead) + 2 engineers + 1 product manager

**Business Goal:** Enable merchants to understand customer behavior in real-time. Target: Launch MVP to 100 beta customers by June 1.

---

## Integration Evidence: Multiple KSBs in One Project

### KSB 1: Architecture (K21)

**Decision:** Microservices architecture to handle scale and independent deployments

**Evidence:**
- Product can scale data ingestion independently from analytics
- Team can deploy analytics improvements without touching ingestion
- Expected 10,000+ events/second at scale

**Proof It Worked:**
```
Black Friday test (1 month before launch):
- 50,000 events/second (5× expected)
- Response time: p95 = 1.2 seconds (goal: <2 sec) ✓
- No service cascading failures
- Scaled elastically: 3 → 20 pods over 10 minutes
```

---

### KSB 2: Database Design (K24)

**Decision:** Time-series database (InfluxDB) for events, PostgreSQL for user data

**Evidence:**
- Queries on 1B events return <500ms
- Index strategy: Time-based partitioning, tag indexing
- Backup tested quarterly, RTO/RPO met

**Proof It Worked:**
```
Customer analytics query ("Sales by region, last 7 days"):
- Data: 500M events
- Query time: 280ms (goal: <1 sec) ✓
- Backup test: Full restore in 12 minutes
```

---

### KSB 3: Testing Strategy (K22)

**Decision:** Comprehensive testing pyramid: 60% unit, 30% integration, 10% e2e

**Evidence:**
- Coverage: 82% of critical paths
- Bugs caught before production: 12 (would have caused issues)

**Proof It Worked:**
```
Example bug caught by testing:
- Race condition in event deduplication
- 0.5% of events would duplicate if concurrent
- Unit test caught it before MVP launch
- Impact prevented: Data integrity issue, customer distrust

Test statistics:
- 1,200 tests, 82% coverage
- Test time: 14 minutes on every commit
- Merge blocked if coverage drops
```

---

### KSB 4: Security & Compliance (K28)

**Decision:** GDPR compliance, encryption at rest and in transit, audit logging

**Evidence:**
- Security assessment: No high findings
- Penetration test: All findings fixed before launch
- Audit logs: 365-day retention, immutable

**Proof It Worked:**
```
Compliance audit (pre-launch):
- GDPR compliance: 100% (all data subject rights implemented)
- Encryption: All customer data encrypted at rest + in transit
- Audit trail: Every data access logged and searchable
- Result: Beta customers signed without legal concerns
```

---

### KSB 5: CI/CD & Deployment (K23)

**Decision:** Automated CI/CD pipeline, canary deployments, zero-downtime releases

**Evidence:**
- Deployment frequency: 20+ per month (10× faster than competitors)
- Success rate: 99.8%
- Rollback capability: Any version in <2 minutes

**Proof It Worked:**
```
Example: Bug fix deployment
- Bug reported by customer: 3 PM
- Fix implemented & tested: 3:15 PM
- Deployed via canary: 3:25 PM
- Live to all customers: 3:35 PM
Total: 35 minutes from report to fix live (customers impressed)

Deployment frequency enabled:
- Weekly feature releases
- Same-day bug fixes
- Risk managed: Canary catches issues before 100% rollout
```

---

### KSB 6: Problem Solving (S20)

**Decision:** Systematic troubleshooting when analytics queries started timing out

**Evidence:**
- Root cause identified: Missing composite index
- Impact: Prevented 3-second latency (would have blocked launch)
- Solution validated: p99 latency before/after

**Proof It Worked:**
```
Incident: Analytics queries degrading 2 weeks before launch
Timeline:
- 4:00 PM: Reports of slow queries
- 4:15 PM: Identified in logs: "Full table scan on 500M events"
- 4:30 PM: Hypothesis: Missing index on (merchant_id, timestamp)
- 4:45 PM: Index added and tested
- 5:00 PM: Query performance: 3 seconds → 280ms (90% improvement) ✓
- 5:15 PM: Monitoring confirmed stable

Impact: Would have been launch blocker without quick diagnosis
```

---

### KSB 7: Governance (K8)

**Decision:** Technology governance board approval for architecture and vendor choices

**Evidence:**
- Board approved: Microservices, InfluxDB, AWS
- Risk assessment: Database failover, vendor lock-in
- Quarterly compliance reviews

**Proof It Worked:**
```
Board decision (March 2024): Approve InfluxDB adoption
- Security review passed
- Cost analysis: £500/month vs. building custom = clear win
- Contingency plan: Can migrate if needed (not locked in)

Monthly governance:
- Compliance metrics: 100% uptime, zero data loss
- Cost tracking: Within budget
- Security: No incidents
- Result: Board confidence in technical decisions
```

---

### KSB 8: Personal Accountability (B1)

**Decision:** Own the project as tech lead, including risks and decisions

**Evidence:**
- 100% on-time delivery (6-month plan executed)
- Admitted mistakes early (architecture change at month 3)
- Team feedback: "You took responsibility, made hard calls"

**Proof It Worked:**
```
Example: Architecture pivot at month 3
- Initial plan: Monolith (simpler for MVP)
- Month 3 reality: Single database becoming bottleneck
- My decision: Pivot to microservices (riskier, more work)
- What I did:
  a) Presented analysis to team and stakeholders
  b) Admitted monolith approach was wrong
  c) Proposed microservices with timeline impact (1 extra month)
  d) Got buy-in: "Better to fix now than 6 months in production"
  e) Led architecture redesign
  f) Delivered on new timeline (6 months total, including pivot)

Result: 
- Project launched with architecture that could scale
- Team respected decision-making
- Customers never knew about the pivot (shipped on schedule)
```

---

## Quantified Business Impact

### Revenue Impact

```
Beta customers: 100
Average contract value: £50/month
Monthly revenue: £5,000
Annualized: £60,000

Projection at scale (1,000 customers):
- Annual revenue: £600,000
- First 6 months revenue: £150,000
- Return on development investment: 2.5× in year 1
```

### Time-to-Market Impact

```
Competitor A (similar product):
- Timeline: 12 months (typical SaaS development)
- Market entry: Month 12

You (capstone project):
- Timeline: 6 months
- Market entry: Month 6
- First-mover advantage: 6 months head start

Estimated 6-month first-mover revenue advantage: £75,000+
```

### Team Impact

**Team Feedback (Anonymous Survey):**
```
"How well did the tech lead make decisions?"
- Excellent: 100% (3/3 engineers)

"Did you trust the architecture?"
- Yes, understood rationale: 100%

"Would you recommend this tech lead to other teams?"
- Yes: 100%

"What was the biggest learning?"
- "How to scale architecture decisions under time pressure"
- "Importance of acknowledging when we need to pivot"
- "Collaboration between product and engineering works"
```

---

## Risk Management Evidence

### Identified Risks (At Project Start)

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Scale performance | High | Critical | Load test before beta, microservices |
| Data security | Medium | Critical | Penetration test, compliance audit |
| Team skill gaps | Medium | High | Training, pair programming |
| Vendor stability | Low | High | Contingency plan, multi-cloud readiness |

### How Risks Were Managed

**Risk 1: Scale Performance (MITIGATED)**
```
Action: Load test at 5× expected throughput before beta
Result: Issue found (database index), fixed before launch
Outcome: Beta launch with confidence ✓
```

**Risk 2: Data Security (MITIGATED)**
```
Action: Penetration test 2 weeks before launch
Result: 3 findings, all fixed before beta
Outcome: Customers comfortable with security ✓
```

**Risk 3: Team Skills (MITIGATED)**
```
Action: Weekly knowledge-sharing sessions
Result: Team went from unfamiliar with InfluxDB to expert
Outcome: Can deploy independently, no bottleneck on you ✓
```

---

## Project Phases & Evidence

### Phase 1: Discovery (Month 1)

**Evidence:**
- Requirements document (50 pages)
- Stakeholder interviews (10 customers)
- Competitive analysis
- Architecture proposal (approved by governance board)

**Outcomes:**
- Clear feature scope (prioritized)
- Risk assessment completed
- Technology stack approved

---

### Phase 2: MVP Development (Months 2-4)

**Evidence:**
- Weekly sprint retrospectives (12 notes)
- Code review metrics (75 PRs, 98% approval rate)
- Test coverage reports (increasing 40% → 82%)
- Deployment frequency (ramping from 2/week to 10/week)

**Outcomes:**
- MVP feature-complete
- Code quality high (0 rework after launch)
- Team velocity improved (sprint velocity: 20 → 35 points/sprint)

---

### Phase 3: Pre-Launch Hardening (Month 5)

**Evidence:**
- Load testing results (5× throughput tested)
- Penetration test report (all findings fixed)
- Compliance audit (GDPR approved)
- Disaster recovery test (RTO/RPO met)

**Outcomes:**
- Product production-ready
- Legal/compliance approved
- Infrastructure resilient

---

### Phase 4: Beta Launch (Month 6)

**Evidence:**
- Customer onboarding completed (100 customers)
- Monitoring dashboards (99.9% uptime, 0 data loss)
- Customer feedback (9.2/10 satisfaction)
- Revenue (£5K/month from beta)

**Outcomes:**
- Successful launch
- Customer satisfaction strong
- Revenue generating
- Ready for GA (general availability)

---

## Leadership Demonstrated

### Decision-Making

**Decisions You Made:**
1. Architecture: Microservices (traded complexity for scale)
2. Technology: InfluxDB (traded vendor lock-in risk for performance)
3. Governance: Security-first approach (slowed feature work, but essential)
4. Pivot: Month 3 architecture change (admitted monolith approach was insufficient)

**Impact:** All decisions were correct. Project succeeded.

### Team Development

**Team Growth:**
- Junior engineer: Deployed to production independently (Month 3)
- Mid-level engineer: Led compliance audit coordination
- All engineers: Can now onboard new team members

### Stakeholder Management

**Stakeholder Updates:**
- Weekly: Product manager (feature prioritization)
- Bi-weekly: Finance (budget tracking)
- Monthly: Executive (risk, timeline, revenue)

**Result:** Transparent communication, stakeholder confidence, no surprises

---

## Simple Summary for Examiner

*"Capstone project evidence (integrated KSBs):*

*Project Scope:*
- *Real-time analytics platform MVP*
- *6 months, 3-person team*
- *100 beta customers, £5K/month revenue*

*Technical Excellence (K21, K22, K23, K24, K28):*
- *Microservices architecture scaled to 50K events/sec*
- *82% test coverage, 1,200 tests*
- *99.6% deployment success, 20+ deployments/month*
- *Database queries: p99 = 280ms (goal met)*
- *Security: Penetration test all findings fixed, GDPR compliant*

*Problem Solving & Governance (S20, K8):*
- *Database scaling issue: Root cause found in 30 min, fixed before launch*
- *Technology governance: Board approved architecture, risk mitigated*

*Leadership & Accountability (B1):*
- *Architecture pivot at month 3: Admitted initial approach insufficient*
- *Delivered on-time despite pivot (6 months as planned)*
- *Team feedback: 100% confidence in decision-making*
- *0 post-launch incidents*

*Business Impact:*
- *Revenue: £60K annualized projection*
- *Customer satisfaction: 9.2/10*
- *Team: Upskilled 3 engineers, can now operate independently*

*This shows not just technical skills, but integration: how architecture decisions, testing rigor, security governance, and leadership work together to deliver a successful product."*

---

## What to Add to Your Capstone

Replace this template with your actual project:

1. Project timeline (Gantt chart or similar)
2. Launch metrics (uptime, latency, errors, users)
3. Team feedback (survey or interviews)
4. Revenue/business impact
5. Load test results
6. Compliance audit report
7. Post-launch incident logs (if any)
8. Customer testimonials
9. Architecture diagram
10. Deployment pipeline configuration

**Customize everything above** with your real capstone details. This template is just the structure.
