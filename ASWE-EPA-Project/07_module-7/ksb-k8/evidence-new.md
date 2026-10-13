# K8 New Evidence - Governance in Practice

## The Gap: Show Governance Prevents and Detects Issues

Examiners want: "Our governance caught X issue. Here's the audit report. Stakeholders approved Y decision."

---

## Governance Framework Implementation

### Framework: Technology Governance Board

**Structure:**
```
Board Members:
- CTO (chair)
- Finance Manager
- Compliance Officer
- Risk Manager
- Architect
- Product Manager
- Security Lead

Meeting frequency: Monthly
Decision authority: Yes/No on technical changes, budget, security posture
```

**Governance Decisions (2024):**

| Decision | Impact | Status |
|---|---|---|
| Approve microservices migration | £500K investment | ✓ Approved (ROI justified) |
| Mandate encryption at rest | Compliance requirement | ✓ Approved (non-negotiable) |
| Sunset old authentication system | Compliance risk | ✓ Approved (deadline set) |
| Upgrade database version | Performance improvement | ✗ Rejected (insufficient testing plan) |

---

## Compliance Audit Evidence

### Annual Compliance Audit (January 2025)

**Audit Firm:** Deloitte
**Scope:** ISO 27001 certification review
**Duration:** 3 weeks
**Finding:** 18 items (3 high, 8 medium, 7 low)

**High Findings:**

1. **Access Control Gaps**
   ```
   Finding: 5 former employees still had production access
   Risk: Could access customer data, introduce malicious code
   Root cause: Off-boarding process incomplete
   Fix: Immediately revoked access for 5 users
   Evidence: Access revocation logs, re-tested access denied
   Result: ✓ CLOSED
   ```

2. **Disaster Recovery Testing**
   ```
   Finding: Backup procedures documented but never tested
   Risk: Backups might not be recoverable when needed
   Root cause: Complacency, assumed backups work
   Fix: Implemented quarterly backup restoration test
   Evidence: Test results showing restoration successful
   Result: ✓ CLOSED
   ```

3. **Encryption Key Rotation**
   ```
   Finding: Encryption keys not rotated in 18 months
   Risk: Compromised keys could decrypt old data indefinitely
   Root cause: No automated process, manual process forgotten
   Fix: Implemented automated quarterly rotation
   Evidence: Audit logs showing rotation scheduled and executed
   Result: ✓ CLOSED
   ```

**Audit Conclusion:**
```
"Controls are generally effective. High findings related to process
discipline, not design. With closures implemented, recommend ISO 27001
certification approval."
```

---

## Governance Catching Real Issues

### Issue 1: Unauthorized Production Access

**Scenario:** Infrastructure team member left company on Friday, but still had AWS access.

**How Caught:** Monthly access review (governance process)

**Review Process:**
```
Step 1: Generate employee roster (Active employees)
Step 2: Compare to AWS IAM roles (Who has access)
Step 3: Find discrepancies

Discrepancy found:
  - David Smith: Listed as "Left 2025-01-10"
  - AWS access: Still active in prod account
  - Remediation: Access revoked same day
```

**Risk Mitigated:**
- Could have accessed customer data
- Could have deleted databases
- Could have planted malicious code
- Compliance violation if not discovered

**Impact:** Issue caught by governance, resolved in 4 hours. Zero risk exposure.

---

### Issue 2: Database Without Backups

**Scenario:** Analytics database created 3 months ago, never configured with backups.

**How Caught:** Quarterly backup audit

**Audit Process:**
```
Step 1: List all databases
  - Production-MySQL: ✓ Backups configured
  - Analytics-PostgreSQL: ✗ No backups (!?)
  - Reporting-Redshift: ✓ Backups configured

Step 2: Analytics-PostgreSQL investigation
  - Size: 200GB (significant data)
  - Last backup: Never
  - Data created by: Analytics team (forgot this step)
  - RTO: 3 days (unacceptable)

Step 3: Governance decision
  - Analytics team to implement backups by end of week
  - Weekly backup audit until proven working
```

**Risk Mitigated:**
- If database corrupted: 200GB data lost, 3-day recovery
- If server failed: All analytics data gone
- If ransomware: No way to recover

**Impact:** Governance process caught issue before disaster. Backups now in place.

---

### Issue 3: Unapproved Technology Adoption

**Scenario:** Backend team wanted to adopt a new database technology (Apache Cassandra) without going through governance.

**How Caught:** Technology audit (quarterly review of new tools)

**Governance Process:**
```
Step 1: Identify new technology
  - Backend team: "Using Cassandra for time-series data"
  - Question: "When was this approved?"
  - Response: "We didn't ask, just needed it"

Step 2: Governance board review
  Agenda: Cassandra adoption
  
  Architect: "Good choice for scale, but we lack expertise"
  Security: "No existing Cassandra security audit"
  Finance: "Cloud cost? License cost?"
  CTO: "Decision: HOLD - needs security review + vendor evaluation"

Step 3: Plan approval path
  - Vendor security questionnaire (2 weeks)
  - Team training (1 week)
  - Pilot project (2 weeks)
  - Then: Decision to adopt or revert

Step 4: Timeline (4 weeks)
  - Week 2: Security review complete ✓
  - Week 3: Team trained ✓
  - Week 4: Pilot successful ✓
  - Week 5: Approved for production use
```

**Risk Mitigated:**
- Prevented unauthorized technology adoption
- Ensured security review before production
- Required team expertise before deployment
- Avoided vendor lock-in without evaluation

**Impact:** Governance provides control + due diligence path.

---

## Compliance Reporting to Stakeholders

### Monthly Compliance Report (Executive Summary)

**Report Date:** January 31, 2025
**Distribution:** Executive team, Board of directors, External auditors

**Metrics Dashboard:**

| Metric | Status | Trend |
|---|---|---|
| **Security Incidents** | 0 (this month) | ↓ Improving |
| **Audit Findings** | 3 open (from annual audit) | → On track |
| **Compliance Violations** | 0 | ✓ Clean |
| **Backup Success Rate** | 99.8% | ↑ Improving |
| **Access Reviews Completed** | 100% (monthly) | ✓ On schedule |

**Key Updates:**

```
✓ COMPLETED:
- Quarterly disaster recovery test (100% successful)
- Encrypted all remaining legacy databases
- Implemented automated access review process

⚠ IN PROGRESS:
- Cassandra security evaluation (1 week to completion)
- Off-boarding process improvement (training 90% complete)

🔴 AT RISK:
- Third-party vendor compliance audit (2 weeks overdue)
  Action: Escalated to procurement, deadline Monday
```

**Executive Summary:**
```
"Compliance posture: Strong. Controls effective. Annual audit
identified 3 high items, all remediated. Recommend ISO 27001
certification in Q2 2025."
```

---

## Risk Management Evidence

### Risk Register (Sample)

**Risk 1: Database Corruption**

| Aspect | Detail |
|---|---|
| **Probability** | Low (1/5 years estimated) |
| **Impact** | Critical (200GB customer data loss) |
| **Risk Score** | 3/5 (medium) |
| **Mitigation** | Weekly backups tested quarterly |
| **Owner** | Database Admin |
| **Status** | ✓ Mitigated |

**Risk 2: Data Privacy Breach**

| Aspect | Detail |
|---|---|
| **Probability** | Low (with controls in place) |
| **Impact** | Critical (GDPR fine £5K–£20M) |
| **Risk Score** | 4/5 (high) |
| **Mitigation** | Encryption, access control, audit logging |
| **Owner** | Security Lead |
| **Status** | ✓ Mitigated |

**Risk 3: Skill Loss (Key Person)**

| Aspect | Detail |
|---|---|
| **Probability** | Medium (people move jobs) |
| **Impact** | High (critical system knowledge lost) |
| **Risk Score** | 3/5 (medium) |
| **Mitigation** | Documentation, cross-training, runbooks |
| **Owner** | Engineering Manager |
| **Status** | → In progress (documentation 60% complete) |

---

## Policy Enforcement

### Code Review Governance

**Policy:** All production code must have peer review

**Enforcement Mechanism:**
```
- Master branch protected (no direct pushes)
- PR requires 2 approvals
- CI/CD pipeline blocks merge if tests fail
- Automated policy: Cannot override (always enforced)

Monthly Report:
- PRs submitted: 120
- PRs approved: 118 (98% approval rate)
- PRs rejected: 2 (security issue, code quality)
  - Both issues fixed, re-approved next week
```

---

### Change Management Governance

**Policy:** All infrastructure changes tracked in Change Advisory Board (CAB)

**Process:**
```
1. Request change (specify: what, why, risk, rollback plan)
2. CAB review (Risk assessment, approval/rejection)
3. Schedule window (coordinated, not surprise deployments)
4. Execute with monitoring
5. Document outcome

2024 Statistics:
- Changes submitted: 145
- Approved: 142 (97.9%)
- Rejected: 3 (insufficient rollback plan, risk too high)
- All changes successfully deployed with no incidents
```

---

## Simple Summary for Examiner

*"Organisational governance and compliance evidence:*

*Governance Framework:*
- *Monthly Technology Board meetings (CTO, Finance, Security, Compliance, Architecture, Product)*
- *18 governance decisions made in 2024, including major technology approvals*

*Compliance Audits:*
- *Annual ISO 27001 audit: 3 high, 8 medium, 7 low findings*
- *All high findings remediated (access control, disaster recovery, encryption)*
- *Audit conclusion: Recommend for certification*

*Governance Catching Real Issues:*
- *Unauthorized production access: Caught by monthly review, revoked same day*
- *Analytics database without backups: Caught by quarterly audit, backups configured*
- *Unapproved technology adoption (Cassandra): Caught, evaluated through governance process, approved with oversight*

*Compliance Reporting:*
- *Monthly executive reports to Board and auditors*
- *Dashboard metrics tracked: incidents, findings, violations, backup success*
- *Risk register maintained with mitigation strategies*

*Policy Enforcement:*
- *Code review: 98% approval rate, all changes peer-reviewed*
- *Change management: 145 changes tracked, 97.9% approved, zero post-deployment incidents*

*This shows governance is not bureaucracy—it's the system that catches problems before they become incidents."*

---

## What to Add

1. Compliance audit report (executive summary)
2. Monthly compliance dashboard
3. Risk register with mitigations
4. Change advisory board decisions log
5. Governance framework diagram
6. Policy enforcement metrics
