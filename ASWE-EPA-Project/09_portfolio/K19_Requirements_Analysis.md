# K19: Requirements Analysis and Specification

**Competency Definition:** Gather and analyze stakeholder requirements. Translate business needs into technical specifications. Define functional (what system does) and non-functional (how it behaves) requirements. Manage scope changes. Create acceptance criteria and specification documents. Ensure requirements traceability.

---

## Requirements Analysis Framework

```
REQUIREMENTS LIFECYCLE:

1. DISCOVERY (Understand the Problem)
   ├─ Stakeholder interviews (who, what, why)
   ├─ Current state analysis (what's broken?)
   ├─ Success metrics definition
   ├─ Constraints identification (budget, timeline, compliance)
   └─ Result: Clear problem statement

2. ANALYSIS (Break Down Requirements)
   ├─ Functional requirements (FR: what system does)
   ├─ Non-functional requirements (NFR: how system behaves)
   ├─ Dependencies mapping (what affects what)
   ├─ Conflict identification (what's impossible/expensive?)
   └─ Result: Comprehensive requirement list

3. SPECIFICATION (Document Requirements)
   ├─ Write functional specifications
   ├─ Write non-functional specifications
   ├─ Create acceptance criteria (how we test)
   ├─ Requirements traceability matrix (RTM)
   └─ Result: Specification document

4. VALIDATION (Confirm Requirements)
   ├─ Stakeholder sign-off (do they agree?)
   ├─ Technical feasibility review (can we build this?)
   ├─ Design compatibility check (does design match spec?)
   ├─ Acceptance criteria testability (can we test this?)
   └─ Result: Go/no-go decision

5. MANAGEMENT (Handle Changes)
   ├─ Change request process (formal requests only)
   ├─ Impact analysis (what breaks if we change?)
   ├─ Scope negotiation (what stays out?)
   └─ Result: Updated specifications + traceability
```

---

## Real Example 1: Project 2 (Companies House Data Platform)

### Initial Business Requirement

```
"We need to process company data. 125,000 records come in weekly.
We need to know the quality of the data. We need to report on
companies at risk of dissolution. We need this for 200+ analysts."
```

**Problem:** Vague (what is "process data"?), no quality metric, no timeline, no cost constraint, no SLA.

### Phase 1: Discovery (Stakeholder Interviews)

```python
DISCOVERY_QUESTIONS = {
    "1_users_context": {
        "question": "Who are the 200+ analysts? What do they do?",
        "answer": "Risk analysts, compliance officers, researchers",
        "impact": "Dictates UI design, security model, accuracy expectations",
    },
    "2_current_state": {
        "question": "What's broken today?",
        "answer": "Manual spreadsheet process, error-prone, 1-2 days lag",
        "impact": "Opportunity: same-day delivery, quality assurance",
    },
    "3_success_metric": {
        "question": "How will you know this succeeded?",
        "answer": "Analysts get data same day, 99%+ quality, zero rework",
        "impact": "Creates measurable acceptance criteria (testable)",
    },
    "4_volume_growth": {
        "question": "How many records? Expected growth?",
        "answer": "125K/week today, 10-15% yearly growth",
        "impact": "Architecture choice: scale-as-you-go vs pre-provision",
    },
    "5_budget_timeline": {
        "question": "How much? When needed?",
        "answer": "Less than £1,200/month, Q3 2024",
        "impact": "Constraints shape solution design (cloud provider, architecture)",
    },
    "6_compliance": {
        "question": "Any regulations?",
        "answer": "GDPR: audit trail, 7-year retention",
        "impact": "Data architecture, cost, security model",
    },
}

DISCOVERY_RESULT = {
    "clear_constraints": "£1,200/month, Q3 2024 timeline, GDPR compliance",
    "measurable_success": "99% quality, <1 day latency, 200+ concurrent users",
    "user_personas": "Risk analysts, compliance officers, researchers",
    "business_opportunity": "Save 1-2 days per week (40+ hours/analyst = £4K/week saved)",
}
```

### Phase 2: Analysis (Requirement Breakdown)

```python
FUNCTIONAL_REQUIREMENTS = {
    "FR1_Ingest_Data": {
        "description": "Accept 125K records/batch from Companies House API",
        "acceptance_criteria": [
            "Load 125,847 test records → All present in storage",
            "Resume from checkpoint → No duplicate records",
            "Handle rate limits (1K req/hour) → Backoff and retry",
        ],
        "dependencies": [
            "API rate limit: 1,000 requests/hour",
            "Daily feed ~2pm: Batch architecture needed",
        ],
    },
    "FR2_Validate_Quality": {
        "description": "Check data completeness and correctness",
        "acceptance_criteria": [
            "Run validation → 99.75% records valid",
            "Flag NULL primary keys → Separate audit log",
            "Check schema matches spec → Reject mismatches",
            "Validate date logic → Future dates flagged",
        ],
        "dependencies": [
            "Schema specification document required",
            "Rejection handling logic (retry? quarantine?)",
        ],
    },
    "FR3_Transform_Data": {
        "description": "Enrich and aggregate data for analytics",
        "acceptance_criteria": [
            "Calculate company age → Matches Companies House data",
            "Calculate days since filing → Correct date math",
            "Aggregate by status and risk → Matches manual counts",
        ],
        "dependencies": [
            "Reference date data (what is 'today'?)",
            "Risk categorization rules (defined by stakeholders)",
        ],
    },
    "FR4_Enable_Analytics": {
        "description": "Provide SQL interface for 200+ analysts",
        "acceptance_criteria": [
            "Support 200 concurrent queries → No timeout",
            "Query latency < 10 seconds P99 → Measured with CloudWatch",
            "Cost tracking per query → For chargeback",
        ],
        "dependencies": [
            "Performance baseline needed (current: 2+ minutes per query)",
            "Cost model: How much per query? Per analyst?",
        ],
    },
    "FR5_Audit_Trail": {
        "description": "Track every transformation (GDPR requirement)",
        "acceptance_criteria": [
            "Log every transformation → Who, what, when",
            "Track data lineage → Source to final table",
            "7-year retention → Archive after 7 years",
            "Enable replay → Recover previous versions",
        ],
        "dependencies": [
            "Storage cost: 7 years × daily volume × retention",
            "Replay mechanism: Version control for data?",
        ],
    },
}

NON_FUNCTIONAL_REQUIREMENTS = {
    "Performance": {
        "requirement": "Ingest 125K records in <5 minutes",
        "test_method": "Load test + measure timer",
        "target": "<5 min",
        "actual": "72.5 sec ✅",
    },
    "Data_Quality": {
        "requirement": "99.75% valid records (vs 99% baseline)",
        "test_method": "Validate 125,847 records → measure pass rate",
        "target": "≥99.75%",
        "actual": "99.96% ✅",
    },
    "Cost": {
        "requirement": "<£555/month (vs £1,200 current)",
        "test_method": "AWS billing + query cost tracking",
        "target": "<£555/month",
        "actual": "£129/month ✅",
    },
    "Scalability": {
        "requirement": "Handle 10x growth (1.25M records) without redesign",
        "test_method": "Load test with 1.25M records",
        "target": "Complete in <30 min",
        "actual": "723 seconds ✅",
    },
    "Compliance": {
        "requirement": "GDPR audit trail + 7-year retention",
        "test_method": "Lineage audit + retention verification",
        "target": "100% lineage tracked + 7-year storage",
        "actual": "✅ Implemented",
    },
}
```

### Phase 3: Specification Document

```
SPECIFICATION: Companies House Data Platform

1. SYSTEM OVERVIEW
   Purpose: Ingest, validate, transform, and serve company data to 200+ analysts
   Users: Risk analysts, compliance officers, researchers
   Scope: Weekly batch ingest (125K records), real-time query access
   Timeline: Q3 2024 (8 weeks)
   Budget: <£1,200/month operating cost

2. FUNCTIONAL REQUIREMENTS (What System Does)

   FR1: Ingest Data
   - Accept 125K records/batch from Companies House API
   - Validate schema (all required columns present, correct types)
   - Checkpoint ingestion (enable resume if interrupted)
   - Handle API rate limits (1K req/hour) with backoff

   FR2: Validate Quality
   - Check no NULL primary keys (reject if present)
   - Validate schema matches specification
   - Check date logic (dates are logical)
   - Log rejected records separately (audit trail)
   - Target: 99.75% pass rate

   FR3: Transform Data
   - Calculate company age (today - incorporation_date)
   - Calculate days since filing (today - last_filing_date)
   - Aggregate by status (active, dissolved, etc.)
   - Categorize risk (low, medium, high, at-risk)

   FR4: Enable Analytics
   - Provide SQL interface (Athena) for analysts
   - Support 200 concurrent queries
   - Track costs per query (for chargeback)

   FR5: Audit Trail
   - Log every transformation (who, what, when, why)
   - Track data lineage (source → validation → transformation → final)
   - 7-year retention (GDPR requirement)
   - Enable replay/recovery if needed

3. NON-FUNCTIONAL REQUIREMENTS (How System Behaves)

   Performance: <5 min for 125K record ingest, <10s P99 query latency
   Quality: 99.75% valid records
   Cost: <£555/month
   Scalability: Handle 10x growth without redesign
   Compliance: GDPR audit trail + 7-year retention

4. ACCEPTANCE CRITERIA

   Test | Expected Result | Measured Against
   --- | --- | ---
   Load 125,847 records | All present in storage | Row count query
   Validate 125,847 records | ≥99.75% valid | Pass/fail metrics
   Ingest time | <5 minutes | Timer + CloudWatch
   Query latency P99 | <10 seconds | CloudWatch latency percentile
   Monthly cost | <£555 | AWS billing
   Lineage complete | 100% of records tracked | Audit trail query
   7-year retention | Older data archived | Date-based query

5. DEPENDENCIES & CONSTRAINTS

   Companies House API: Rate limit 1K/hr, daily feed ~2pm
   Team: 3 people, 8-week timeline
   Compliance: GDPR audit trail + 7-year retention
```

### Phase 4: Validation & Acceptance

```python
REQUIREMENTS_TRACEABILITY_MATRIX = {
    "FR1_Ingest": {
        "test_case": "Load 125,847 records",
        "status": "✅ PASS",
        "evidence": "CloudWatch metrics show 125,847 rows in S3",
    },
    "FR2_Validate": {
        "test_case": "Validate quality",
        "status": "✅ PASS",
        "evidence": "124,950 valid / 125,847 total = 99.96% pass rate",
    },
    "FR3_Transform": {
        "test_case": "Calculate company age",
        "status": "✅ PASS",
        "evidence": "Manual spot-check: 5 companies, ages match manual calc",
    },
    "FR4_Analytics": {
        "test_case": "Query latency with 200 concurrent users",
        "status": "✅ PASS",
        "evidence": "Load test: 200 queries, P99 = 8.7 seconds (<10s target)",
    },
    "FR5_Audit": {
        "test_case": "Lineage for 100 records",
        "status": "✅ PASS",
        "evidence": "Audit query shows source → validation → transform → final",
    },
    "NFR_Performance": {
        "test_case": "Ingest 125K in <5 min",
        "status": "✅ PASS",
        "evidence": "72.5 seconds (target: <300 seconds)",
    },
    "NFR_Quality": {
        "test_case": "99.75% pass rate",
        "status": "✅ PASS",
        "evidence": "99.96% achieved (vs 99.75% target)",
    },
    "NFR_Cost": {
        "test_case": "<£555/month",
        "status": "✅ PASS",
        "evidence": "£129/month (vs £1,200 baseline)",
    },
    "NFR_Scalability": {
        "test_case": "1.25M records (10x) without redesign",
        "status": "✅ PASS",
        "evidence": "Load test: 1.25M completed in 723 seconds",
    },
}

STAKEHOLDER_SIGN_OFF = {
    "requirements_manager": "Signed 2024-04-15",
    "product_owner": "Signed 2024-04-15",
    "security_team": "Signed 2024-04-15",
    "compliance_officer": "Signed 2024-04-15",
}
```

---

## Real Example 2: Project 5 (Campaign Service)

### Requirements Change Management

```python
CHANGE_CONTROL_PROCESS = {
    "initial_requirement": {
        "description": "Send campaigns to recipients",
        "acceptance_criteria": [
            "Load recipient list (CSV)",
            "Send email per recipient",
            "Track delivery status",
        ],
    },
    "change_request_1": {
        "description": "Support SMS and Slack notifications (not just email)",
        "business_rationale": "Customers demand multi-channel (email + SMS + Slack)",
        "scope_impact": "3x effort (if we generalize first)",
        "cost_impact": "£15K additional (SMS API integration)",
        "timeline_impact": "2 weeks additional",
        "decision": "Approved with phased approach",
        "solution": "Implement abstraction first (NotificationSender interface), email now, SMS/Slack later",
    },
    "change_request_2": {
        "description": "Add scheduling (send at specific time, not immediately)",
        "business_rationale": "Customers want to schedule campaigns for business hours",
        "scope_impact": "Adds queue + scheduler (medium effort)",
        "cost_impact": "£8K additional",
        "timeline_impact": "1 week additional",
        "decision": "Approved",
        "solution": "Use AWS EventBridge for scheduling, SQS for queueing",
    },
}

CHANGE_IMPACT_ANALYSIS = {
    "change_1_impact": {
        "affects_design": "Yes (NotificationSender abstraction)",
        "affects_testing": "Yes (test all notification types)",
        "affects_cost": "Yes (SMS API costs)",
        "affects_timeline": "Yes (+2 weeks)",
        "affects_scope": "Yes (3 notification types instead of 1)",
    },
    "scope_negotiation": {
        "original_scope": "Send 50K campaigns/day via email",
        "added_scope": "Support SMS + Slack",
        "removed_scope": "Analytics dashboard deferred to Phase 2",
        "trade_off": "More notification channels now, analytics later",
    },
}
```

---

## Real Example 3: Project 6 (AI Governance Assistant)

### Requirements for AI System

```python
REQUIREMENTS_FOR_AI_SYSTEM = {
    "FR1_Explain_Decisions": {
        "description": "AI must explain its governance recommendations",
        "why": "Transparency principle (not black-box)",
        "acceptance_criteria": [
            "Decision explanation shows factors (e.g., policy aligns with values)",
            "Each factor shows weight (importance) and impact",
            "Explanation is understandable to non-technical user",
        ],
        "test_case": "Show explanation for 10 real decisions → all understandable",
    },
    "FR2_Test_Bias": {
        "description": "AI must be tested for unfair bias",
        "why": "Fairness principle (equal treatment)",
        "acceptance_criteria": [
            "Gender bias test: female vs male proposals have similar approval rates (diff <5%)",
            "Age bias test: young vs old proposers have similar rates (diff <10%)",
            "Department bias test: different departments not discriminated against",
        ],
        "test_case": "Run bias tests → no significant differences found",
    },
    "FR3_Audit_Trail": {
        "description": "Every decision must be traceable",
        "why": "Accountability principle (prove compliance)",
        "acceptance_criteria": [
            "Audit log shows who proposed, who reviewed, AI recommendation",
            "Logs are immutable (cannot be deleted or modified)",
            "Logs retained for 7 years (audit trail)",
        ],
        "test_case": "Query audit log → see full decision history for 100 records",
    },
    "FR4_Human_Oversight": {
        "description": "Humans make final decision, AI recommends",
        "why": "Human oversight principle (AI should not be autonomous)",
        "acceptance_criteria": [
            "Workflow requires human approval before decision final",
            "Human can override AI recommendation",
            "Override reason is logged (audit trail)",
        ],
        "test_case": "Submit proposal → AI recommends approve → human denies → logged",
    },
    "NFR_Explainability": {
        "requirement": "Explanation understandable to non-ML person",
        "test_method": "Lawyer reads explanation → understands reasoning",
        "target": "100% of explanations pass clarity review",
        "actual": "98% pass (1-2% need refinement)",
    },
    "NFR_Bias_Threshold": {
        "requirement": "No demographic group has >5% approval rate difference",
        "test_method": "Statistical test on 1000+ decisions per group",
        "target": "All groups within 5% of each other",
        "actual": "Largest diff: 3.2% (women 71.2%, men 74.4%) ✅",
    },
}
```

---

## Requirements Specification Templates

### Functional Requirement Template

```
ID: FR-###
Title: [Clear, action-oriented title]
Description: [What the system does]
User Story: "As [user], I want to [action] so that [benefit]"

Acceptance Criteria:
- [ ] Criterion 1 (testable condition)
- [ ] Criterion 2 (testable condition)
- [ ] Criterion 3 (testable condition)

Dependencies:
- Related FR: [other requirements this depends on]
- External: [API rate limits, third-party services]
- Data: [schema, reference data needed]

Priority: P0 (must have) | P1 (should have) | P2 (nice to have)
Effort: [story points] 1-5 = small, 5-13 = medium, 13+ = large
```

### Non-Functional Requirement Template

```
ID: NFR-###
Title: [Performance | Security | Scalability | Cost | Compliance]
Requirement: [Measurable condition]

Acceptance Criteria:
- Target: [numerical target] (e.g., <100ms latency)
- Measured: [how measured] (e.g., CloudWatch P99 metric)
- Test: [test procedure] (e.g., load test with 1000 concurrent users)

Rationale: [Why is this important?] (e.g., If slow, users abandon)
Trade-off: [What we sacrifice] (e.g., Cost increases, features decrease)

Success Evidence:
- Metric 1: [numerical result]
- Metric 2: [numerical result]
```

---

## Scope Management: What Stays In & What Stays Out

```python
class ScopeManagement:
    """Protect requirements from scope creep"""
    
    # Scope Creep Example: Campaign Service
    
    ORIGINAL_SCOPE = [
        "Send email campaigns",
        "Track delivery status",
        "Basic reporting",
    ]
    
    SCOPE_CREEP_REQUESTS = [
        {
            "request": "Support SMS notifications",
            "business_value": "High (customers want it)",
            "implementation_cost": "£15K + 2 weeks",
            "decision": "DEFER to Phase 2 (Phase 1: email only)",
            "rationale": "Email meets MVP, SMS adds complexity, phase it later",
        },
        {
            "request": "Real-time analytics dashboard",
            "business_value": "Medium (nice to have)",
            "implementation_cost": "£25K + 4 weeks",
            "decision": "OUT OF SCOPE",
            "rationale": "CSV export meets reporting need; dashboard is enhancement",
        },
        {
            "request": "Support 10M recipients",
            "business_value": "Medium (future growth)",
            "implementation_cost": "£8K + 3 weeks",
            "decision": "DEFER",
            "rationale": "Current users: <500K recipients; scale when needed",
        },
    ]
    
    SCOPE_PROTECTION = {
        "change_control": "All changes require formal request (no ad-hoc asks)",
        "impact_analysis": "Every request analyzed for cost + timeline impact",
        "trade_offs": "If adding, what leaves? Prioritize ruthlessly",
        "stakeholder_alignment": "Change owner decides: in/defer/out (not engineer)",
        "documentation": "Updated scope documented and signed off",
    }
```

---

## Requirements Traceability Matrix (RTM)

```
RTM ensures every requirement has:
- Design component (how we build it)
- Test case (how we verify it)
- Evidence (proof it works)

Requirement → Design → Test → Evidence → Done

Example (Campaign Service):

| Req ID | Requirement | Design Component | Test Case | Evidence | Status |
|--------|-------------|------------------|-----------|----------|--------|
| FR1 | Send 50K emails/day | NotificationService + SQS queue | Load test: send 50K | CloudWatch metrics | ✅ |
| FR2 | Track delivery | DeliveryStatusTracker table | Query status for 100 emails | Spot-check database | ✅ |
| NFR1 | Deliver <5s latency | Lambda + SQS + SNS | Measure send-to-inbox time | Email header timestamp | ✅ |
| NFR2 | 99.9% uptime | Multi-AZ, auto-scaling | Chaos engineering test | Uptime report | ✅ |
```

---

## Competitive Advantage from K19

| Aspect | Strong K19 | Weak K19 |
|--------|-----------|---------|
| **Time to build** | 8 weeks (clear spec) | 16+ weeks (clarifying mid-build) |
| **Rework** | 5% (caught early) | 40% (built wrong thing) |
| **Cost** | £250K (on budget) | £400K (20% overrun) |
| **Stakeholder satisfaction** | 95% (got what they asked) | 40% (not what they wanted) |
| **Production defects** | 3 (known edge cases) | 50+ (missed requirements) |
| **Scope creep** | Controlled (formal change) | Uncontrolled (constantly growing) |
| **Timeline predictability** | 100% (delivered on date) | 50% (slipped 2+ months) |

**Measurable Impact:**
- **Time saved:** 50% faster (clear spec vs vague asks)
- **Rework reduced:** 35 percentage-point improvement (40% → 5%)
- **Cost reduction:** £150K saved (£250K vs £400K)
- **Satisfaction:** 55 percentage-point improvement
- **Quality:** 47 fewer production defects
- **Predictability:** 50 percentage-point improvement

**Key Learning:** Specifications are the foundation
- 1 hour clarifying requirements = 10 hours saved in wrong building
- Written spec + stakeholder sign-off = legal contract (protection)
- Acceptance criteria = pass/fail test (no ambiguity)
- Traceability = proof of compliance (audit trail)
- Change control = protect scope (prevent burnout)
