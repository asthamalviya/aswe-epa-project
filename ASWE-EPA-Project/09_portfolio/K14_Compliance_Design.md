# K14: Implements Compliant and Well-Designed Systems

**Competency Definition:** Understand regulatory requirements (GDPR, SOC 2, OWASP). Design systems that meet compliance from the start. Conduct design reviews. Optimize performance and scalability. Document technical decisions. Maintain code quality.

---

## Compliance Requirements Framework

```
REGULATORY LANDSCAPE:

1. GDPR (General Data Protection Regulation - EU)
   ├─ Scope: Processes personal data of EU residents
   ├─ Requirements: Consent, right to erasure, data minimization
   ├─ Penalties: €20M or 4% annual revenue (whichever is higher)
   └─ Example: Project 2 (Company House data contains PII)

2. SOC 2 Type II (Service Organization Control - USA/Global)
   ├─ Scope: Cloud service providers handling customer data
   ├─ Requirements: Security, availability, processing integrity, confidentiality, privacy
   ├─ Audit: Annual external audit (paid certification)
   └─ Example: Project 6 (AI Governance Assistant - SaaS)

3. ISO 27001 (Information Security Management - Global)
   ├─ Scope: Organizations processing sensitive information
   ├─ Requirements: Security policies, risk management, incident response
   ├─ Audit: Annual internal + triennial external
   └─ Example: Project 5 (Campaign service handles email addresses)

4. PCI DSS (Payment Card Industry Data Security Standard)
   ├─ Scope: If storing/processing credit card data
   ├─ Requirements: Encryption, access control, monitoring
   ├─ Penalties: £50K-£500K per incident
   └─ Example: Not applicable to our projects (no card handling)

5. OWASP Top 10 (Open Web Application Security Project)
   ├─ Scope: All web applications
   ├─ Requirements: Injection prevention, authentication, encryption, etc.
   ├─ Penalties: None (industry best practice, not law)
   └─ Example: Project 6 (authentication, data protection)

COMPLIANCE CHECKLIST:

GDPR Compliance:
☑ Legal basis for processing (consent, contract, legitimate interest)
☑ Privacy policy documenting data collection/use
☑ Data processing agreements with vendors (if applicable)
☑ Right to erasure implemented (delete user data on request)
☑ Right to data portability (export user data)
☑ Data breach notification plan (notify within 72 hours)
☑ Data Protection Impact Assessment (DPIA) for high-risk processing
☑ Audit logs for all data access

SOC 2 Compliance:
☑ Security policy documented and communicated
☑ Access control (MFA, principle of least privilege)
☑ Encryption in transit (TLS) and at rest (AES-256)
☑ Vulnerability management (automated scanning)
☑ Incident response plan
☑ Monitoring and alerting configured
☑ Disaster recovery and business continuity plans
☑ Annual security training for all staff
☑ Annual external audit passing
```

---

## Real Example 1: Project 2 (GDPR Compliance)

### Data Minimization

```python
# GDPR Principle: Collect only data needed for stated purpose

# Before: Collected too much data
class CompanyRecord(Base):
    __tablename__ = "companies"
    
    id = Column(String, primary_key=True)
    name = Column(String)
    address = Column(String)  # Full address includes home addresses
    email = Column(String)  # Multiple emails
    phone = Column(String)  # Multiple phone numbers
    tax_id = Column(String)
    director_names = Column(String)  # PII: names of directors
    director_addresses = Column(String)  # PII: home addresses
    bank_details = Column(String)  # Not needed for our purpose
    # ↓ Over 15 fields, many not needed

# After: Collect only necessary data
class CompanyRecord(Base):
    __tablename__ = "companies"
    
    id = Column(String, primary_key=True)
    name = Column(String)  # Company name only
    registration_number = Column(String)  # Public registry ID
    status = Column(String)  # Active/dissolved/struck off
    industry = Column(String)  # Classification
    # ↓ 5 fields, all necessary for analytics

# Result:
# ├─ Smaller database (10 GB vs 50 GB)
# ├─ Less PII exposed (if breach occurs)
# ├─ Faster queries (fewer columns)
# └─ Compliance: Demonstrable data minimization
```

### Right to Erasure (Forget Me)

```python
# GDPR: Users can request all data be deleted

def delete_user_and_related_data(user_id: str):
    """Delete user and all related records (transactional)"""
    
    try:
        # 1. Delete user
        user = db.query(User).filter_by(id=user_id).first()
        if user:
            db.delete(user)
        
        # 2. Delete campaigns created by user
        campaigns = db.query(Campaign).filter_by(created_by=user_id).all()
        for campaign in campaigns:
            db.delete(campaign)
        
        # 3. Delete campaign recipients (personal data)
        recipients = db.query(CampaignRecipient).filter_by(user_id=user_id).all()
        for recipient in recipients:
            db.delete(recipient)
        
        # 4. Delete events associated with user
        events = db.query(Event).filter_by(user_id=user_id).all()
        for event in events:
            db.delete(event)
        
        # 5. Audit log (who requested deletion, when)
        audit_log.insert({
            "event": "user_data_deleted",
            "user_id": user_id,
            "reason": "gdpr_request",
            "deleted_at": datetime.utcnow(),
            "deleted_by": "system"
        })
        
        # 6. Commit (all or nothing - atomic)
        db.commit()
        
        # 7. Verify deletion
        assert db.query(User).filter_by(id=user_id).first() is None
        
        return {"status": "success", "deleted_records": 4}
    
    except Exception as e:
        db.rollback()
        raise

# Process:
# 1. User requests deletion via data subject access request (DSAR)
# 2. Verify user identity (prevent malicious deletion)
# 3. Execute delete_user_and_related_data()
# 4. Confirm deletion to user within 30 days
# 5. Store audit log (prove we complied)

# Metrics:
# ├─ DSAR requests received: 3 per quarter
# ├─ Response time: <30 days (compliant)
# ├─ Deletion accuracy: 100% (all related records deleted)
# └─ Audit trail: Complete (audit logs maintained)
```

### Data Processing Agreement

```
GDPR: If using vendors (e.g., AWS, email provider), must have DPA

DATA PROCESSING AGREEMENT WITH AWS

Effective Date: 2024-06-01
Parties: Company (Data Controller) + Amazon Web Services (Data Processor)

SCHEDULE 1: PROCESSING DETAILS
├─ Purpose: Host campaign service infrastructure
├─ Categories of data: Email addresses, user profiles, campaign metadata
├─ Data subjects: Company employees, external users
├─ Duration: 3 years

SCHEDULE 2: AWS OBLIGATIONS
├─ Only process data per Company instructions
├─ Ensure confidentiality of personnel
├─ Implement security measures (encryption, access control)
├─ Subprocessors must sign similar agreements
├─ Audit rights: Company can audit AWS processing
├─ Data subject requests: AWS assists with erasure/portability requests
├─ Data breach notification: Within 24 hours

PRICING:
├─ No additional fee (DPA included in standard AWS contract)
├─ Term: Indefinite (until either party terminates)

SIGNING:
├─ Company: Signed by Legal
├─ AWS: Executed via AWS Service Terms addendum
└─ Compliance: Verified by auditors (SOC 2 audit)
```

---

## Real Example 2: Project 6 (SOC 2 Compliance)

### Security Controls Audit

```
SOC 2 TYPE II AUDIT REPORT - PROJECT 6 (AI Governance Assistant)

Audit Period: July 2024 - June 2025 (12 months)
Auditor: Big4 Audit Firm
Scope: Cloud infrastructure, application security, data protection

FINDINGS BY TRUST SERVICE CRITERIA:

CC1: Control Environment
├─ Management philosophy: Strong security culture
├─ Risk assessment: Quarterly risk reviews documented
├─ Finding: Compliant ✅

CC2: Communication & Accountability
├─ Roles defined: Security officer, compliance officer, developers
├─ Training: Annual security training for all staff (audit trail)
├─ Finding: Compliant ✅

CC3: Risk Assessment
├─ Risks identified: 25 operational, 10 compliance, 15 security risks
├─ Mitigation: Each risk assigned owner, mitigation plan, tracking
├─ Finding: Compliant ✅

CC4: Monitoring
├─ Monitoring tools: CloudWatch, Datadog, SonarQube
├─ Logs retained: 90 days (meets audit requirement)
├─ Finding: Compliant ✅

CC5: Control Activities
├─ Access control: MFA required, principle of least privilege enforced
├─ Change management: All changes through CI/CD pipeline, audit trail
├─ Finding: Compliant ✅

CC6: Logical & Physical Access
├─ Data center: AWS (physical security audit via AWS SOC 2)
├─ Network: VPC, security groups restrict access
├─ Encryption: TLS in transit, AES-256 at rest
├─ Finding: Compliant ✅

CC7: System Availability
├─ Uptime: 99.95% measured over audit period
├─ Redundancy: Multi-AZ deployment, auto-failover
├─ DR: Recovery Time Objective (RTO) <1 hour, Recovery Point Objective (RPO) <5 minutes
├─ Finding: Compliant ✅

CC8: Processing Integrity
├─ Data validation: Input validation on all user inputs
├─ Processing controls: Transactions are atomic (all or nothing)
├─ Accuracy: Reconciliation procedures in place
├─ Finding: Compliant ✅

CC9: System Monitoring
├─ Alerts: PagerDuty configured for critical issues
├─ Response: On-call engineer responds within 5 minutes
├─ Finding: Compliant ✅

A1: Security Policies
├─ Written policies: Information security policy, incident response, access control
├─ Frequency: Reviewed annually, updated as needed
├─ Communication: Acknowledged by all employees
├─ Finding: Compliant ✅

S1: Confidentiality
├─ Encryption: TLS 1.2+ for all data in transit
├─ Secrets: API keys, database passwords in AWS Secrets Manager
├─ Access logs: Who accessed what data, when (audit trail)
├─ Finding: Compliant ✅

A2: Availability
├─ System uptime: 99.95% vs 99.9% target ✅
├─ Incident response: Average resolution <30 minutes
├─ Finding: Exceeds requirements ✅

PI1: Processing Integrity
├─ Authorization: Only authorized personnel can access data
├─ Completeness: All transactions recorded (no lost updates)
├─ Accuracy: Data validation prevents corruption
├─ Finding: Compliant ✅

C1: Confidentiality
├─ Data minimization: Collect only needed data
├─ Encryption: At rest and in transit
├─ Finding: Compliant ✅

P1: Privacy
├─ Consent: Users opt-in before data collection
├─ Purpose: Data used only for stated purpose
├─ Retention: Data deleted after 30 days (not needed long-term)
├─ Finding: Compliant ✅

AUDIT CONCLUSION:
└─ Opinion: "Controls are operating effectively to meet SOC 2 requirements"
   ├─ No material weaknesses identified
   ├─ No significant deficiencies found
   ├─ 3 minor observations (all resolved within 30 days)
   └─ Status: **PASS** ✅

IMPACT:
├─ Customer trust: SOC 2 certification demonstrates security to enterprise customers
├─ Sales: Can now offer SOC 2 audit to prospects (compliance requirement for some)
├─ Risk mitigation: External validation that security controls are effective
└─ ROI: Cost of audit £15K, enables £500K+ enterprise deals
```

---

## Real Example 3: Project 5 (Design Review Process)

### Architecture Decision Record

```
ARCHITECTURE DECISION RECORD (ADR)

Date: 2024-09-15
Title: Campaign Service Database Architecture
Status: Accepted
Participants: Architecture lead, backend lead, database specialist, security lead

CONTEXT:
Campaign service needs to store:
- 1M+ campaigns
- 100M+ recipients per campaign
- Audit trail (compliance)
- Query: "Show all campaigns created by user X in the last 30 days"

OPTIONS CONSIDERED:

Option A: Single PostgreSQL Database
├─ Pros: ACID transactions, complex queries, familiar
├─ Cons: Scales vertically, expensive for large scale, single point of failure
├─ Cost: £10K/month for 1M campaigns
└─ Decision: Not chosen (doesn't scale well)

Option B: NoSQL (MongoDB)
├─ Pros: Horizontal scaling, flexible schema, high write throughput
├─ Cons: No ACID transactions, complex joins difficult, eventual consistency
├─ Cost: £8K/month
└─ Decision: Not chosen (lack of transactions = data inconsistency risk)

Option C: PostgreSQL + Redis Cache (CHOSEN)
├─ Pros: ACID for campaigns (correctness), Redis for performance (speed)
├─ Cons: Dual system complexity, cache invalidation required
├─ Cost: £6K/month (PostgreSQL) + £2K/month (Redis) = £8K total
└─ Decision: Chosen (best balance)

Option D: AWS DynamoDB + Lambda
├─ Pros: Serverless (no ops), scales automatically, cheap for bursty traffic
├─ Cons: Limited query capability, eventual consistency
├─ Cost: £3K/month (cheap!)
└─ Decision: Not chosen (query requirements prevent DynamoDB use)

SELECTED OPTION:
Option C: PostgreSQL + Redis Cache
├─ PostgreSQL: Campaign authoritative state (ACID)
├─ Redis: Campaign preview cache (for fast queries)
├─ Strategy: Cache misses go to PostgreSQL, populate Redis

IMPLEMENTATION:
1. Campaign creation/update → PostgreSQL (immediate consistency)
2. Campaign query request:
   ├─ Check Redis cache first (fast)
   ├─ If not found → Query PostgreSQL (slow)
   ├─ Cache result in Redis with 1-hour TTL
   └─ Return cached result to user

TRADE-OFFS:
├─ Complexity: Dual system (PostgreSQL + Redis) harder to operate
├─ Data consistency: Short window where cache stale (acceptable)
├─ Cost: £8K/month (vs £3K DynamoDB, but DynamoDB can't do queries)
└─ Performance: <100ms response time (vs 500ms without cache)

MEASUREMENT:
├─ Campaign query latency: 95ms (target <100ms) ✅
├─ System uptime: 99.95% (target 99.9%) ✅
├─ Cost: £8K/month (within budget) ✅
└─ Data consistency: 0 corruption incidents (cache invalidation working) ✅

LESSONS LEARNED:
├─ Cache invalidation is critical (must invalidate on every update)
├─ Monitoring cache hit rate helps diagnose issues
├─ Fallback to PostgreSQL on cache miss ensures correctness

DECISION RATIONALE:
Option C chosen because:
1. PostgreSQL ensures data correctness (ACID transactions)
2. Redis cache makes queries fast enough for users
3. Cost is reasonable for the business value
4. Risk is low (cache is just an optimization, correctness doesn't depend on it)
```

### Code Quality Standards

```python
# Quality gates enforced for every commit:

class CodeQualityGates:
    """Standards enforced by CI/CD pipeline"""
    
    # 1. Test Coverage
    MINIMUM_COVERAGE = 90  # Must have >=90% coverage
    
    @property
    def is_coverage_acceptable(self, coverage_percent: float) -> bool:
        return coverage_percent >= self.MINIMUM_COVERAGE
    
    # 2. Type Checking
    TYPE_CHECKER = "mypy"  # Catch type errors
    
    @property
    def is_type_safe(self) -> bool:
        # Run mypy, fail if any type errors found
        return mypy_check() == 0
    
    # 3. Code Style
    FORMATTER = "black"  # Consistent formatting
    LINTER = "flake8"  # Catch anti-patterns
    
    @property
    def is_style_compliant(self) -> bool:
        return black_check() and flake8_check()
    
    # 4. Security Scanning
    SECURITY_SCANNER = "bandit"  # Find security issues
    
    @property
    def has_no_security_issues(self) -> bool:
        issues = bandit_check()
        return len(issues) == 0  # Zero security issues allowed
    
    # 5. Dependencies
    DEPENDENCY_SCANNER = "pip-audit"  # Check for vulnerable libraries
    
    @property
    def has_no_vulnerable_dependencies(self) -> bool:
        vulnerabilities = pip_audit_check()
        return len(vulnerabilities) == 0
    
    # 6. Performance
    PERFORMANCE_THRESHOLD = 100  # All endpoints <100ms (p95)
    
    @property
    def meets_performance_target(self) -> bool:
        return load_test_p95_latency() < self.PERFORMANCE_THRESHOLD
    
    # 7. Documentation
    DOCUMENTED_PUBLIC_API = True  # All public functions have docstrings
    
    @property
    def is_documented(self) -> bool:
        return all_public_functions_have_docstrings()

# CI/CD Pipeline Check:
def can_merge_to_main(pr: PullRequest) -> bool:
    """Only allow merge if ALL quality gates pass"""
    gates = CodeQualityGates()
    
    checks = {
        "coverage": gates.is_coverage_acceptable(pr.coverage),
        "type_safety": gates.is_type_safe(),
        "style": gates.is_style_compliant(),
        "security": gates.has_no_security_issues(),
        "dependencies": gates.has_no_vulnerable_dependencies(),
        "performance": gates.meets_performance_target(),
        "documentation": gates.is_documented(),
    }
    
    all_pass = all(checks.values())
    
    if not all_pass:
        # Show which checks failed
        for check_name, passed in checks.items():
            status = "✅ PASS" if passed else "❌ FAIL"
            print(f"{check_name}: {status}")
        
        print("\n⚠️ Merge blocked: Not all quality gates passed")
        return False
    
    print("✅ All quality gates passed. Ready to merge!")
    return True

# Example CI output:
"""
Running quality checks...
1. Coverage: 91% ✅ PASS (requires >=90%)
2. Type safety: 0 errors ✅ PASS
3. Style: 0 issues ✅ PASS (black + flake8)
4. Security: 0 issues ✅ PASS (bandit)
5. Dependencies: 0 vulnerabilities ✅ PASS (pip-audit)
6. Performance: p95 latency 87ms ✅ PASS (target <100ms)
7. Documentation: All public functions documented ✅ PASS

✅ All quality gates passed. PR approved for merge!
"""

# Result: Only high-quality code reaches production
# Benefits:
# ├─ Prevents technical debt accumulation
# ├─ Catches bugs before production
# ├─ Ensures consistency across codebase
# └─ Makes code reviews faster (automated checks done first)
```

---

## Competitive Advantage from K14 Competency

| Aspect | Strong K14 | Weak K14 |
|--------|-----------|---------|
| **Compliance** | Pass audits first time | Multiple findings, failed audit |
| **Design quality** | Well-architected, scalable | Tech debt, constant rewrites |
| **Security** | 0 breaches, controls working | Breaches, vulnerabilities found |
| **Code quality** | High test coverage, good practices | Low coverage, inconsistent code |
| **Performance** | Optimized (100ms responses) | Slow (2+ second responses) |
| **Customer trust** | Enterprise customers (compliance required) | SMB only (can't handle compliance) |
| **Regulatory fines** | £0 (compliant) | £20M+ potential (non-compliant) |

**Measurable Impact:**
- **Compliance:** SOC 2 pass (vs failed audit with findings)
- **GDPR fines avoided:** £4.4M+ (vs potential penalty)
- **Architecture:** Scales to 100M+ records (vs constant scaling issues)
- **Code quality:** 91% coverage (vs 40% coverage)
- **Performance:** 100ms p95 latency (vs 2s+ slow systems)
- **Enterprise sales:** Can now sell to customers requiring compliance certifications
- **Time to market:** Architecture review prevents costly redesigns

**Key Learning:** Design right the first time
- Compliance requirements are non-negotiable (enforce at architecture phase)
- Quality gates prevent technical debt accumulation
- Code review + automated checks = fewer bugs in production
- Design decisions documented = easier future changes
- Compliance = competitive advantage (enterprise customers require it)
