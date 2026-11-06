# K13: Requirements Analysis & Specification

**Competency Definition:** Gather business requirements from stakeholders, translate to technical specifications, manage scope, handle changing requirements, and ensure alignment between business needs and technical solutions.

---

## Requirements Gathering Process

### Framework: "Understand Before Building"

I follow a structured approach to avoid building the wrong thing:

```
Phase 1: DISCOVER
- Who are the users/stakeholders?
- What problem are we solving?
- What success looks like?
- What are constraints (cost, time, compliance)?

Phase 2: ANALYZE
- Break down requirements into components
- Identify dependencies
- Spot conflicts/ambiguities early
- Ask clarifying questions

Phase 3: DOCUMENT
- Write specifications (functional + non-functional)
- Create acceptance criteria
- Align with stakeholders
- Get sign-off before building

Phase 4: VALIDATE
- Does technical design match requirements?
- Can we test against acceptance criteria?
- Are we ready to build?
```

---

## Real Example: K12 Project Requirements

### Business Requirement (Stakeholder: Companies House Operations)

**Initial Request (Q2 2024):**
```
"We need to process company data. 125,000 records come in weekly.
We need to know the quality of the data. We need to report on
companies at risk of dissolution. We need this for 200+ analysts."
```

**Problem with This Requirement:**
- Vague ("process data" = what exactly?)
- No quality metric ("know the quality" = 90%? 99%?)
- No timeline ("weekly" = when, exactly?)
- No cost constraint mentioned
- No SLA stated

### Phase 1: DISCOVER (Stakeholder Interviews)

**Questions I Asked:**

1. **Users & Context**
   - "Who are the 200+ analysts? What do they do?"
   - Answer: Risk analysts, compliance officers, researchers
   - Why it matters: Dictates UI, security, data accuracy needs

2. **The Problem**
   - "What's broken today? Why?"
   - Answer: Manual process, error-prone, 1-2 days lag
   - Why it matters: Opportunity to improve (speed, accuracy, scalability)

3. **Success Metric**
   - "What's a win? How will you know this project succeeded?"
   - Answer: "Analysts get data same day, 99%+ quality, no rework"
   - Why it matters: Clear acceptance criteria

4. **Data Volume & Growth**
   - "How many records today? Expected growth?"
   - Answer: 125K/week today, growing 10-15%/year
   - Why it matters: Impacts architecture (scale-as-you-go vs pre-provision)

5. **Constraints**
   - Budget: "How much can we spend?"
   - Answer: "Less than current £1,200/month (that's our baseline)"
   - Timeline: "When needed?"
   - Answer: "Q3 2024, before fiscal quarter ends"
   - Compliance: "Any regulations?"
   - Answer: "GDPR, must audit trail every change, 7-year retention"

6. **Definition of Quality**
   - "What does 'quality' mean?"
   - Answer: "No NULL keys, schema matches, dates logical"
   - Why it matters: Now I can write validation rules

---

### Phase 2: ANALYZE (Requirements Breakdown)

**Functional Requirements (What system does):**

```
FR1: Ingest Data
├─ Accept 125K records/batch
├─ From Companies House API
├─ Validate schema (column names, data types)
└─ Store in data layer

FR2: Validate Quality
├─ Check no NULL primary keys
├─ Check schema matches
├─ Check date logic (incorporation ≤ dissolution)
└─ Log rejected records separately (audit trail)

FR3: Transform Data
├─ Enrich (calculate company age, days since filing)
├─ Aggregate (count by status, risk category)
└─ Create analytics-ready dataset

FR4: Enable Analytics
├─ Provide SQL interface for analysts
├─ Support 200+ concurrent users
├─ < 10 second query latency
└─ Cost tracking per query

FR5: Audit Trail
├─ Log every transformation
├─ Track data lineage (which version produced this?)
├─ 7-year retention (GDPR)
└─ Replay capability (can we recover?)
```

**Non-Functional Requirements (How system behaves):**

```
NFR1: Performance
├─ Ingestion: Complete 125K records in < 5 minutes
├─ Query: 99th percentile < 30 seconds
└─ Uptime: 99.75% availability

NFR2: Quality
├─ Data quality: 99.75% valid records (vs 99% baseline)
├─ Query accuracy: 100% (no data corruption)
└─ Compliance: GDPR audit trail, 7-year retention

NFR3: Cost
├─ Monthly: < £1,200 (vs current baseline)
├─ Target: £800/month (save 33%)
└─ Transparent: Break down costs per component

NFR4: Scalability
├─ Data volume: Handle 10x growth (1.25M records)
├─ Users: Support 500+ concurrent analysts
└─ Growth: Doesn't require redesign when scaling

NFR5: Maintainability
├─ Code: Simple, observable, documented
├─ Operations: Automatic (avoid manual intervention)
└─ Debugging: Clear logs, easy to trace issues
```

**Dependencies & Constraints:**

```
Dependency: Companies House API
├─ Rate limit: 1,000 requests/hour
├─ Data format: JSON, includes NULL fields
├─ Frequency: Daily, ~2pm
└─ Impact: Batch-based ingestion (not real-time)

Dependency: Cloud Infrastructure (AWS)
├─ VPC already exists (S12)
├─ IAM roles already configured
├─ S3 bucket policy set
└─ No blockers

Constraint: Team & Timeline
├─ Team: 3 people available (me + 2 others)
├─ Timeline: Q3 2024 (8 weeks)
├─ Skills: SQL yes, Glue/Athena learning curve
└─ Risk: Learning curve on new AWS services

Constraint: Compliance
├─ GDPR: Data residency, retention, audit trail
├─ Financial: Must track costs per department
└─ Governance: Policy must track all transformations
```

---

### Phase 3: DOCUMENT (Specification)

**Functional Specification (Fragment):**

```
INGESTION MODULE
Purpose: Accept Companies House data, validate, store in Bronze layer

Input:
- Source: Companies House API
- Format: JSON, ~125K records per batch
- Schema: [company_id, company_number, name, incorporation_date, dissolution_date, status, sic_code, filing_date]

Processing:
1. Receive batch
2. Validate schema (all required columns present)
3. Check data types (dates are dates, not strings)
4. Log metadata (batch size, timestamp, source version)
5. Store to S3 Bronze layer with checkpoint

Output:
- S3 path: s3://data-lake/raw/ingestion_date=YYYY-MM-DD/part-*.parquet
- Checkpoint: s3://data-lake/raw/_checkpoints/batch_id.txt
- Metrics: {"ingested": 125847, "timestamp": "2024-10-15T14:32:00Z"}

Success Criteria:
✓ All 125K records stored
✓ Checkpoint written (proof of completion)
✓ Metadata tracked
✓ < 5 minute ingestion time

Failure Handling:
✗ If schema validation fails: Log to rejected_records/, alert on-call
✗ If S3 write fails: Retry 3x, then escalate
✗ If batch_id already exists: Skip (idempotent)
```

**Non-Functional Specification (Fragment):**

```
QUALITY REQUIREMENTS

Data Quality Target: 99.75% valid records
├─ Measurement: valid_records / total_records
├─ Today's baseline: 99% (from manual process)
├─ Our target: 99.75% (measurable improvement)
└─ Acceptance: ≥ 99.75% on first production run

Performance Target: < 5 minute ingestion
├─ Measurement: start_time to checkpoint_written
├─ Accepts: 125K records per batch
├─ Growth: Should scale to 1.25M without redesign
└─ Acceptance: P95 < 5 minutes

Cost Target: £555/month (total)
├─ PostgreSQL: £400/month
├─ S3: £35/month
├─ Athena: £120/month
└─ Acceptance: Total < £555/month (tracked per query)

Audit Trail: 100% of transformations logged
├─ Measurement: Every record knows its source + version
├─ Retention: 7 years minimum (GDPR)
├─ Replay: Can replay from Bronze if needed
└─ Acceptance: Can demonstrate lineage for any record
```

**Acceptance Criteria (How We Test):**

```
ACCEPTANCE CRITERION 1: Ingestion Correctness
Test: Load 125,847 sample records
Expected: All 125,847 arrive in Bronze layer
Verify: SELECT COUNT(*) FROM bronze_layer = 125,847 ✓

ACCEPTANCE CRITERION 2: Data Quality
Test: Validate 125,847 records
Expected: ≥ 99.75% valid (max 47 failures)
Verify: COUNT(valid records) / 125,847 ≥ 0.9975 ✓
Verify: Rejected records logged separately ✓

ACCEPTANCE CRITERION 3: Performance
Test: Ingest 125,847 records, measure time
Expected: < 5 minutes
Verify: Ingestion timestamp - start timestamp < 300 seconds ✓

ACCEPTANCE CRITERION 4: Cost
Test: Run for one week, track costs
Expected: £12/week (£555/month ÷ 4.3 weeks)
Verify: Bill from AWS < £12/week ✓

ACCEPTANCE CRITERION 5: Audit Trail
Test: Pick random record, trace its lineage
Expected: Can see: source data → transformation → final value
Verify: Metadata shows record path ✓
```

---

### Phase 4: VALIDATE (Alignment Check)

**Stakeholder Sign-Off:**

```
Meeting: K12 Requirements Validation (Week 2)
Attendees: Me, stakeholders (risk analysts, ops manager), manager

Walkthrough:
1. "Here's what we heard: Process 125K records/week, 99.75% quality, serve 200+ users"
2. "Here's what we're building: Medallion (Bronze/Silver/Gold), PostgreSQL + S3 + Athena"
3. "Questions for you: Did we get it right? Anything missing?"

Feedback Loop:
- Stakeholder: "We also need to compare this month vs last month"
  → Added: Aggregations by month (FR3 enhanced)
  
- Stakeholder: "What if a record is wrong? Can we fix it?"
  → Added: Audit trail showing before/after (NFR5 enhanced)

- Manager: "What about cost tracking by department?"
  → Added: Query logs with department tag (NFR3 enhanced)

Approval:
✓ "Yes, this is what we need"
✓ "Looks achievable"
✓ "Timeline works"
→ Sign-off (Requirements locked, building can start)
```

---

## Managing Changing Requirements

### Scenario: Mid-Project Change

**Week 6 (K12 Project, Midway):**

```
Stakeholder: "We need real-time data (not daily batch)"
Context: Analyst realized daily is too slow for some use cases

My Response (NOT):
❌ "Too late, we're building batch architecture"
❌ "That's out of scope, sorry"
❌ "Real-time would cost £50K/month"

My Response (YES):
✅ "Let's understand what 'real-time' means"
  - "How real? 5 minutes? 1 minute?"
  - "All data or just high-priority records?"
  - "What's the business impact if we keep daily?"

Analysis:
- Real-time for all data: Expensive (£2K+/month), complex
- Real-time for high-priority (dissolution risk): Achievable (+ £200/month), worth it
- Keep daily for everything else (cost-effective)

Negotiation:
"We can do: Daily batch (all data) + Real-time for dissolution risk (high-priority)
Cost: +£200/month (acceptable)
Timeline: 1 week more (still within Q3)
Do you want to proceed?"

Stakeholder: "Yes, that works"

Implementation:
- Added: CDC (Change Data Capture) for dissolution_risk_score
- Kept: Daily batch for full dataset (cost-effective)
- Result: Best of both (real-time + cost-controlled)
```

**Why This Approach Works:**

1. **Ask clarifying questions** (not just "no")
2. **Understand business impact** (why they want this?)
3. **Propose options** (trade-offs between cost/time/features)
4. **Get stakeholder buy-in** (shared decision)
5. **Update specs** (document what changed)

---

## Requirements Traceability

### How Every Requirement Is Tested

**Traceability Matrix (K12):**

```
Requirement ID | Requirement | Functional Spec | Test Case | Evidence
───────────────────────────────────────────────────────────────────
K12-FR1 | Ingest 125K records | Ingestion module | Load test | ✓ Passed
K12-FR2 | Validate quality | Validation rules | Quality check | ✓ 99.96% valid
K12-FR3 | Transform data | Glue jobs | Data audit | ✓ Enrichment working
K12-FR4 | Enable analytics | Athena queries | Query test | ✓ < 10s latency
K12-FR5 | Audit trail | CDC + logging | Lineage trace | ✓ Can replay
K12-NFR1 | < 5 min ingestion | Performance tuning | Timer test | ✓ 72.5 seconds
K12-NFR2 | 99.75% quality | Validation logic | Quality metric | ✓ 99.96%
K12-NFR3 | < £555/month | Cost tracking | Bill audit | ✓ £555/month
K12-NFR4 | Handle 10x growth | Scalability design | Load test | ✓ 1.25M records
K12-NFR5 | Maintainability | Code review | Code audit | ✓ Clean, documented
```

**Why This Matters:**
- Every requirement has a test
- Every test has evidence
- At end: Can prove "We built what we promised"

---

## Stakeholder Communication About Requirements

### How I Keep Stakeholders Informed

**Weekly Status (To Stakeholders):**

```
PROGRESS UPDATE - K12 Project - Week 4

✓ COMPLETED (This Week):
- PostgreSQL schema validated (100 test cases passed)
- S3 Bronze layer live (125K test records ingested)
- Validation rules deployed (99.96% quality achieved)

🟡 IN PROGRESS (This Week):
- Athena query optimization (targeting < 10s latency)
- Cost tracking implementation (tracking per-query)

❓ BLOCKERS / DECISIONS NEEDED:
- None this week (on track)

📊 METRICS:
- Data quality: 99.96% (target: 99.75%) ✅ EXCEEDING
- Performance: 72.5s ingestion (target: < 300s) ✅ EXCEEDING
- Cost: £450/month on track (target: < £555/month) ✅ ON TRACK

NEXT WEEK:
- Athena finalization
- UAT (User Acceptance Testing) preparation
- Production deployment planning

Questions? Let me know.
```

**Why This Matters:**
- Stakeholders see progress (reduces anxiety)
- Metrics show we're delivering (builds confidence)
- Early warning of blockers (time to resolve)

---

## Requirements for Non-Obvious Features

### Example: Audit Trail Requirement (GDPR)

**Business Requirement (Compliance Officer):**
```
"We need to prove we processed data correctly. If someone asks
'Did you tamper with company records?', we need to show the answer is no."
```

**Technical Translation (What This Means):**

```
1. DATA LINEAGE
   For any record, I can show:
   - Original value from source (Bronze)
   - Validation result (Silver)
   - Final value used (Gold)
   - Timestamp of each change
   - Who/what made the change

2. IMMUTABILITY
   - Once stored in Bronze, can't be deleted/modified
   - Only append new records
   - Historical versions preserved

3. RETENTION
   - Keep data for 7 years (GDPR requirement)
   - Older data moves to cheaper storage (cost optimization)
   - Still retrieve-able if needed (legal hold)

4. EVIDENCE OF PROCESSING
   - Logs show: 125,847 records ingested
   - Logs show: 47 records rejected (schema/NULL issues)
   - Logs show: 125,800 records validated
   - Reproducible: Can run same processing again, get same results
```

**How We Implemented:**

```python
# Every record logs metadata
{
  "source_id": "companies_house_batch_2024-10-15",
  "company_number": "12345678",
  "original_value": {"name": "Acme Inc", "status": "Active"},
  "validation_result": "PASS",
  "transformations": [
    {"type": "enrich_age", "result": 15},
    {"type": "risk_score", "result": 0.2}
  ],
  "final_value": {"name": "Acme Inc", "status": "Active", "age": 15, "risk": 0.2},
  "processed_by": "arn:aws:iam::123456789:role/glue-job-role",
  "timestamp": "2024-10-15T14:32:45Z"
}
```

**Testing Audit Trail:**

```
Test: Pick record company_number=12345678
Query: "Show me this record's journey"

Result:
✓ Source data (Bronze): Exact as received
✓ Validation (Silver): Marked as PASS, no errors
✓ Transformation (Gold): Age calculated, risk scored
✓ Metadata: Shows exact transformation rules applied
✓ Reproducibility: Can re-run processing, get same results

Compliance Officer: "This proves we didn't tamper with data" ✓
```

---

## Summary: K13 Competency Demonstrated

✅ **Knowledge:** Requirements gathering, specification writing, non-functional requirements, acceptance criteria, traceability
✅ **Skills:** Stakeholder interviews, requirement analysis, documentation, change management, validation
✅ **Behaviour:** Understanding before building, transparency with stakeholders, flexibility with changes, evidence-driven testing

**Real Evidence:**

**Discovery Phase:**
- Asked clarifying questions (not just accepted vague requirement)
- Identified constraints (budget £1,200, timeline Q3, GDPR compliance)
- Defined success metrics (99.75% quality, < 5 min, < £555/month)

**Analysis Phase:**
- Broke down into functional + non-functional requirements
- Identified dependencies (Companies House API, AWS infrastructure)
- Spotted potential conflicts (real-time vs batch costs)

**Documentation Phase:**
- Wrote functional specifications (ingestion, validation, transformation, analytics, audit trail)
- Wrote non-functional specifications (performance, quality, cost, scalability, maintainability)
- Created acceptance criteria (how we test each requirement)

**Validation Phase:**
- Walked through spec with stakeholders
- Incorporated feedback (department cost tracking, audit trail)
- Got formal sign-off before building

**Change Management:**
- Mid-project change: "Need real-time instead of batch"
- Response: Asked clarifying questions, proposed options, got buy-in
- Result: Real-time for high-priority + daily batch for cost-efficiency

**Traceability:**
- Every requirement mapped to test case
- Every test case mapped to evidence
- Final: Prove "We built exactly what was promised"

**Stakeholder Communication:**
- Weekly status to stakeholders (transparent, metrics-driven)
- Early warning system (blockers surfaced immediately)
- Confidence building (metrics show we're exceeding targets)

