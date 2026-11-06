# S7: Work Effectively Within Teams

**Competency Definition:** Collaborate effectively with team members across different roles and experience levels. Communicate clearly, resolve conflicts constructively, support peers, and deliver quality work as part of a team. Understand team dynamics and contribute to psychological safety.

---

## Teamwork Framework

I use a structured approach to team collaboration:

```
TEAM EFFECTIVENESS MODEL

1. COMMUNICATION (Clear, Timely, Respectful)
   ├─ Daily standups (5-min syncs on blockers)
   ├─ Async updates (Slack for non-urgent, email for formal)
   ├─ Weekly syncs (deeper discussions, planning)
   ├─ Pair programming (real-time collaboration on complex work)
   └─ Post-mortems (blameless analysis of incidents)

2. COLLABORATION (Shared Goals, Division of Labor)
   ├─ Clear role boundaries (who owns what)
   ├─ Dependencies mapped (service A calls service B)
   ├─ Code review process (2+ approvals, learning-focused)
   ├─ Knowledge sharing (wiki, tech talks, mentoring)
   └─ Decision-making (consensus where possible, escalate when needed)

3. CONFLICT RESOLUTION (Hear All Sides, Find Win-Win)
   ├─ Technical disagreements (e.g., DynamoDB vs PostgreSQL)
   │  → Discuss trade-offs, run proof of concepts, decide together
   ├─ Priority conflicts (e.g., feature deadline vs tech debt)
   │  → Escalate to stakeholders with impact analysis
   ├─ Personal friction (e.g., communication styles clash)
   │  → 1:1 conversation, understand perspectives, establish norms
   └─ Resource constraints (e.g., limited developer time)
      → Prioritize using data (ROI, risk), allocate fairly

4. PSYCHOLOGICAL SAFETY (Safe to Fail, Learn, Be Honest)
   ├─ Celebrate effort, not just results ("great debugging process")
   ├─ Admit mistakes without fear of blame ("I broke the deployment")
   ├─ Ask "dumb questions" without judgment ("Why do we use PostgreSQL?")
   ├─ Disagree respectfully ("I see it differently because...")
   └─ Voice concerns early ("I'm worried about this timeline")

5. PEER SUPPORT (Help Others Succeed)
   ├─ Mentoring junior engineers (pair programming, code review feedback)
   ├─ Unblocking peers (answering questions, removing obstacles)
   ├─ Sharing knowledge (tech talks, documentation, pair sessions)
   ├─ Recognizing contributions (in meetings, one-on-ones, public shoutouts)
   └─ Advocating for team (speaking up for team needs, celebrating wins)
```

---

## Real Example: K12 Data Platform Team (Project 2)

### Team Composition
- **Me (Astha):** Tech Lead, architect, overall delivery accountability
- **James Chen:** Infrastructure Engineer, AWS/VPC design
- **Priya Sharma:** Data Engineer, ETL pipeline, SQL optimization
- **Amara Okonkwo:** QA Engineer, testing strategy, stakeholder UAT coordination

**Experience Mix:**
- James: 6 years infrastructure (experienced, high autonomy)
- Priya: 2 years data engineering (mid-level, learning)
- Amara: 1 year QA (junior, developing)

---

### Communication Practices

**Daily Standup (9 AM, 5 minutes, async option)**

```
Format: What did I complete? What am I working on? Any blockers?

Week 2 Example (Monday):

Me: "Friday I designed VPC architecture with James. Today working on S3 buckets.
     No blockers."

James: "Deployed VPC infrastructure. All subnets created, security groups ready.
        Waiting on Priya's data to load test connectivity. No blocker yet."

Priya: "Working on data validation rules. Hit a blocker: don't know how to connect
        to RDS from Glue job. James, can we sync this morning?"

Amara: "Finished test plan. Ready to review with team. No blockers."

Action: James and Priya sync at 10 AM (15 min) → Priya unblocked by 10:30 AM

Result: Blocker identified and resolved same day. No impact on timeline.
```

**Weekly Sync (1 hour, Friday 3 PM)**

```
Agenda:
1. Progress review (40 min)
2. Risk/blocker discussion (10 min)
3. Next week planning (10 min)

Week 3 Review:

Progress:
├─ Infrastructure complete (James) ✅
├─ Data validation rules deployed (Priya) ✅
├─ Test strategy finalized (Amara) ✅
└─ Athena schema design 80% complete (Me) 🟡

Blockers:
├─ Query performance slightly high (Me) → "Let's benchmark next week"
├─ None from James, Priya, Amara ✅

Next Week:
├─ Priya: Deploy Glue job to staging
├─ Me: Optimize queries, aim for P95 < 10s
├─ Amara: Write integration tests
├─ James: Hands off to operations, minimal support

Team sentiment: High energy, everyone understands next week is critical
```

**Async Updates (Slack Channel: #k12-platform)**

```
Monday 4 PM (Priya):
"Quick update: Fuzzy matching for duplicates working great! 
Found 47 duplicate company records using pg_trgm. Deduping now.
Query time: 1.2s (acceptable). More details in wiki: [link]"

Tuesday 10 AM (James):
"RDS performance: running with 100 connections, CPU 35%, memory 50%. 
Headroom good for production. Security audit results: 1 critical (RDS security group too open), 
fixed by EOD. Will document in wiki."

Wednesday 2 PM (Me):
"Athena query optimization complete. P95 latency 8.7s (target 10s). 
Added 3 indexes on join columns. Cost: £85/month. See dashboard: [link]"

Thursday 9 AM (Amara):
"UAT script finalized. 50 test cases covering happy path + 15 error scenarios. 
Pilot UAT week 7 with 10 analysts. Docs ready: [link]"

Benefit: Everyone stays informed without meetings. Low context switching.
```

**Pair Programming (Complex Work)**

```
Scenario: Query optimization (Me + Priya)

Driver (Me): I write the code
Navigator (Priya): I review in real-time, spot issues

Query 1 (Bad):
SELECT * FROM companies c
JOIN directors d ON c.id = d.company_id
WHERE c.filing_date > DATE_SUB(NOW(), INTERVAL 30 DAY)
-- Problem: SELECT * is expensive, no index on filing_date

Priya: "Why SELECT *? We only need company name and director count."
Me: "Good catch! And filing_date needs an index."

Query 2 (Good):
SELECT c.id, c.name, COUNT(d.id) AS director_count
FROM companies c
LEFT JOIN directors d ON c.id = d.company_id
WHERE c.filing_date > DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY c.id, c.name
INDEX idx_filing_date ON companies(filing_date)

Priya: "Much better! Why LEFT JOIN instead of INNER?"
Me: "Because we want companies with 0 directors to show as count=0, not disappear."

Result: Query performance 12.1s → 8.7s (31% improvement)
Learning: Priya now understands query optimization patterns
Relationship: Co-learning, mutual respect
```

---

### Collaboration: Technical Decisions

**Scenario: DynamoDB vs PostgreSQL for Session Storage (Week 3)**

```
Context: Need to store 125K company records + sessions. James suggests DynamoDB 
(serverless, auto-scaling). Priya prefers PostgreSQL (familiar, ACID guarantees).

Technical Discussion (Email + Slack thread, 2 hours total):

James (Pro-DynamoDB):
"DynamoDB is auto-scaling. If we hit 10K companies at once, DynamoDB auto-scales.
PostgreSQL needs manual capacity planning."

Priya (Pro-PostgreSQL):
"PostgreSQL gives us ACID guarantees. If a transaction fails halfway, we can rollback.
DynamoDB doesn't have that. Plus, we already use PostgreSQL for main data."

Me: "Valid points both. Let's run an experiment: I'll benchmark both with 125K records."

---

Experiment (Me, 4 hours):
├─ PostgreSQL: Ingested 125K records, measured throughput
│  ├─ Insert: 1,738 records/sec
│  ├─ Query (by company_id): 4.2 ms
│  ├─ Query (range): 8.7 ms
│  └─ ACID: ✅ Transactions, rollback supported
│
├─ DynamoDB: Ingested 125K records, measured throughput
│  ├─ Insert: 2,200 records/sec (18% faster)
│  ├─ Query (by company_id): 2.1 ms (50% faster)
│  ├─ Query (range): NOT NATIVELY SUPPORTED (expensive scan)
│  └─ ACID: 🟡 Single-item transactions only, no multi-item rollback
│
└─ Cost comparison:
   ├─ PostgreSQL: £400/month (db.t3.medium, Multi-AZ)
   ├─ DynamoDB: £800/month (provisioned capacity for 2K writes/sec)
   └─ PostgreSQL wins on cost AND has SQL we need

Decision Meeting (Async Slack):

Me: "Data: PostgreSQL is 50% faster for queries, cheaper, and has ACID.
     But DynamoDB is simpler if we only do key lookups.
     Since we need range queries ('show me all companies in London'),
     PostgreSQL is the right choice."

James: "Fair points. I see why range queries are important. Let's go PostgreSQL.
        I'll optimize the indexes for performance instead."

Priya: "Thanks for respecting my concerns. Happy to work with James on optimization."

Result: ✅ Team aligned, decision made with data, everyone understood why
        ✅ James gained SQL knowledge, Priya gained benchmarking skills
```

---

### Conflict Resolution: Morale Issue (Week 6)

```
Context: Amara (junior QA engineer) has been quiet in standups. Thursday she says
"This is taking forever. I'm not sure I'm good at this job."

Problem: Amara is doubting herself, morale dropping, could impact UAT week 7.

My Response (1:1 video call, 30 minutes):

Me: "Amara, I noticed you've been quieter. How are things going?"

Amara: "I feel like I'm too slow. You, James, and Priya all seem so fast.
        I'm writing tests but wondering if they're any good."

Me: "Let me be direct: Your test plan is excellent. 50 cases covering happy path + errors.
     That's exactly what we need. Your speed is fine for your experience level."

Amara: "Really? I feel like I should be faster."

Me: "Faster isn't always better. Quality matters more. Your tests found 47 bugs
     before production. If we shipped without your tests, we'd have 47 production
     incidents. That's £500K+ in damage. Your work prevented that."

Amara: "I didn't think about it that way."

Me: "Also, my team's energy comes from making progress TOGETHER, not racing.
     James learned Glue jobs from Priya. Priya learned query optimization from me.
     I'm learning testing rigor from you. That's how we level up as a team."

Amara: "Okay, I feel better. Thanks."

Me: "One more thing: I'm recommending you for the security-specialist track.
     Your attention to edge cases is exactly what we need for UAT later."

Result: ✅ Amara's morale restored (feedback from her: "4.6/5 team satisfaction")
        ✅ She went on to lead UAT week 7 with 200+ analysts
        ✅ She discovered 3 important edge cases during UAT that Priya missed
```

---

### Code Review Process (Learning-Focused)

**Peer Code Review: Priya's ETL Job (Week 4)**

```
Priya's PR: Add Glue job for data transformation

Code (Before Review):
┌─────────────────────────────────────────┐
│ def transform_companies(records):       │
│   result = []                           │
│   for record in records:                │
│     if record['status'] == 'Active':    │
│       company = {                       │
│         'id': record['id'],             │
│         'name': record['name'].upper(), │
│         'year_founded': 2024            │
│       }                                 │
│       result.append(company)            │
│   return result                         │
└─────────────────────────────────────────┘

Issues: 1) year_founded hardcoded 2024 (data bug)
        2) No error handling for malformed records
        3) .upper() loses case info (data quality issue)
        4) No logging of skipped records
```

My Review (Constructive, Teaching-Focused):

```
Comment 1: "Line 7: year_founded is hardcoded to 2024. Should be record['year_founded'].
           Why? So data stays accurate when loaded in 2025+.
           
Comment 2: "Line 4-5: What if record['status'] is None or 'ACTIVE' (uppercase)?
           We'd silently skip valid records. 
           Suggestion: Use record.get('status', '').lower() == 'active'
           Why? Defensive coding handles malformed data.

Comment 3: "Line 8: .upper() loses original company name case.
           Most companies are 'ACME Corp', not 'Acme Corp'.
           Suggestion: Keep original case: 'name': record['name']
           Why? Improves data quality for downstream users.

Comment 4: "No logging. If 10K records are skipped, how do we know why?
           Suggestion: Add: logger.info(f'Skipped {skipped_count} records')
           Why? Visibility into data quality issues.

Great start! These changes will make the code more robust.
Ready to help if you want to pair on this."
```

Priya's Response:
"Good catches. I hadn't thought about year_founded being hardcoded. And you're right
about .upper() losing case. Let me fix these."

Code After Review:
```python
def transform_companies(records):
    result = []
    skipped = 0
    for record in records:
        try:
            status = record.get('status', '').lower()
            if status != 'active':
                skipped += 1
                continue
            company = {
                'id': record['id'],
                'name': record['name'],  # Keep original case
                'year_founded': record.get('year_founded', 2024)  # Use record value, default to 2024
            }
            result.append(company)
        except KeyError as e:
            logger.warning(f"Malformed record: {e}")
            skipped += 1
    logger.info(f"Transformed {len(result)} records, skipped {skipped}")
    return result
```

Result: ✅ Priya learned defensive coding, data quality thinking
        ✅ Code is more robust
        ✅ Team knowledge increased (I explained reasoning, didn't just correct)
```

---

### Knowledge Sharing

**Weekly Tech Talk: Data Quality Patterns (Week 5)**

```
Presenter: Priya (encouraged by me to present, first time speaking to team)

Topic: How to catch data quality issues before they hit production

Agenda:
├─ Problem: We found 47 duplicate records in live data
├─ Solution: Fuzzy matching with pg_trgm (PostgreSQL extension)
├─ Example: "Acme Corp" vs "ACME Corporation" → Matched as duplicates
├─ Code walkthrough: How to use similarity() function
├─ Mistakes I made: First attempt missed 12 duplicates (too strict threshold)
├─ How I fixed it: Lowered threshold from 0.8 to 0.7
├─ Now: 100% dedup success, zero false positives
└─ Q&A: Team asks questions, Priya explains

Audience: 8 engineers from other teams

Feedback: "Great talk! We have similar duplicate issues in our system."

Outcome: Priya gained confidence (4/5 self-rating → 4.6/5 after talk)
         Other teams reused her approach
         Priya promoted to mid-level engineer 2 months later
```

**Wiki Documentation: Shared Knowledge Base**

```
Created: K12 Platform Wiki (Confluence)

Pages:
├─ Architecture Overview (Me)
│  └─ 5-layer ETL design, why each layer exists
├─ Data Quality Checklist (Priya)
│  └─ How to validate 125K records before ingestion
├─ VPC Design & Security (James)
│  └─ Why we have public/private/database subnets
├─ Testing Strategy (Amara)
│  └─ How to run UAT with 200+ analysts
├─ Troubleshooting Guide (All)
│  └─ What to do if ingestion fails, query slow, data corrupt
└─ Lessons Learned (All)
   └─ What we'd do differently next time

Access: All team members can view, edit, comment

Result: New onboarding time reduced from 2 weeks → 3 days
        Team consistency (everyone follows same patterns)
        Knowledge preserved when team members leave
```

---

### Psychological Safety in Action

**"It's Safe to Fail" Culture**

```
Incident: Week 5, I deploy query optimization to staging, breaks analytics dashboard

Traditional culture response:
- Manager: "How did this happen??"
- Me: "Uh, I didn't test it carefully enough..."
- Outcome: Fear, blame, people hide mistakes

Our culture response:
- James (discoverer): "Hey Astha, analytics broken. Can you check?"
- Me: "Yeah, I see it. Deployed without testing. My mistake. Looking at it now."
- Priya: "What broke? Let me help debug."
- Me & Priya (pair debug for 15 min): "Found it: query references old column name"
- Me (fix + test + deploy): 30 minutes total
- Amara: "Good catch. We should add integration test for this."
- Action item: Add test to CI pipeline (prevents future)

Outcome: ✅ Issue fixed fast, no blame, team learned, prevented recurrence
         ✅ I admitted mistake without fear
         ✅ Team helped without judgment
```

**"It's Safe to Ask Questions" Culture**

```
Week 2, Amara (junior QA):
"I don't understand why we're using Apache Parquet for the raw layer.
Why not CSV?"

Traditional response:
- Me: "It's an industry standard..." (dismisses question)
- Amara: Doesn't ask again, stays confused

Our response:
- Me: "Great question! CSV would work, but Parquet is better because:
        1) Compressed (smaller files = cheaper storage)
        2) Columnar (fast queries on specific columns)
        3) Schema versioning (can add fields without breaking)
        
        CSV is simpler, but we need performance here. Make sense?"
        
- Amara: "Yeah, that makes sense. So CSV for simple stuff, Parquet for big data?"
        
- Me: "Exactly. You're learning the trade-offs. That's the whole game."

Outcome: ✅ Amara asked her question, got clarity, advanced her understanding
         ✅ Me explained reasoning, deepened team knowledge
         ✅ Amara now asks questions confidently
```

**"It's Safe to Disagree" Culture**

```
Week 3, Priya (mid-level data engineer) disagrees with me:

Me: "Let's use exact-match deduplication. It's simpler."

Priya: "But exact match will miss 'Acme Corp' vs 'ACME Corporation'.
        I think we need fuzzy matching."

Traditional response:
- Me: "I'm the tech lead, we're doing exact match."
- Outcome: Priya complies silently, frustrated. Later, 12 duplicates slip through.

Our response:
- Me: "Good point. Exact match is simpler but might miss typos. Tell me more."
        
- Priya: "Yeah, I looked at some data. There are ~200 variations on company names.
         Fuzzy matching with similarity > 0.7 catches 99% of them."
         
- Me: "Let's test both. I'll run exact match on 1K records, you run fuzzy."
        
- Experiment results: Fuzzy 47 duplicates found, Exact 0 found
        
- Me: "Your approach is right. Let's use fuzzy. Good thinking."

Outcome: ✅ Priya's idea was better, we used it, caught 47 duplicates
         ✅ Priya felt heard and valued
         ✅ Me learned fuzzy matching, expanded my skills
```

---

### Supporting Peers

**Mentoring James (Experienced but Learning Cloud)**

```
Context: James has 6 years infrastructure experience (on-premise), first time with AWS/VPC

Week 1:
- I recommend: "Check the NCSC security guidance on cloud networks. Key principles: Zero Trust, least privilege."
- James reads, has questions
- We pair for 2 hours (me navigating AWS console, James typing)
- I explain: Why public subnet for DMZ, why private for databases
- James designs VPC architecture solo, I review

Result: James owns infrastructure deliverable, shipped on time, high quality
        James now confident with AWS VPC design

---

Mentoring Priya (Mid-level Learning SQL Optimization)

Context: Priya knows SQL basics, but query optimization is new

Week 4:
- I notice: Query latency 12.1s (target 10s)
- I ask: "Want to optimize this together?"
- Priya: "Yes, please. I don't know where to start."
- Me: Teach process: EXPLAIN PLAN → identify sequential scans → add indexes
- Priya: Creates index on join column
- Result: Query 12.1s → 8.7s ✅
- Follow-up: I send her articles on query optimization, encourage her to lead next optimization

Result: Priya learns systematic debugging approach
        Priya now optimizes queries independently

---

Mentoring Amara (Junior Learning End-to-End Testing)

Context: Amara is excellent test strategist but hasn't coordinated large UAT

Week 6:
- I assign: Lead UAT with 200+ analysts (week 7)
- Amara: "I've never done this with that many people..."
- Me: Help her plan: Create test groups (50 analysts/group, 4 groups), 
       each group has different test scenarios, rotate through 2-hour slots
- Me: Review her test script, give feedback
- Me: Do a dry run with 10 analysts (week 7), she runs it
- Result: Full UAT week 7 with 200+ analysts, all successful, zero major issues

Result: Amara gains confidence, discovers 3 edge cases others missed
        Amara promoted to mid-level QA engineer
```

---

### Recognizing Contributions

**Team Recognition (Ongoing)**

```
Standup shout-outs:
- "Priya, great catch on the duplicate records. Saved us a lot of data quality issues."
- "James, RDS optimization is solid. Thanks for the detailed documentation."
- "Amara, your test plan is thorough. Caught 47 bugs before production."

Weekly 1:1s:
- Priya: "You're becoming our SQL optimization expert. Great growth."
- James: "Your AWS architecture is production-grade. You should do a tech talk."
- Amara: "You discovered 3 edge cases in UAT that nobody else saw. That's junior-to-mid level work."

Public recognition (Email to team + managers):
"Celebrating our K12 Data Platform team:
- James: Built rock-solid infrastructure with multi-AZ resilience
- Priya: Delivered 99.96% data quality through fuzzy matching
- Amara: Coordinated UAT with 200+ analysts, zero major issues
- Result: On-time delivery, exceeding all quality targets. Proud of this team."

Result: ✅ Team feels valued
        ✅ Contributions recognized publicly
        ✅ High morale (4.6/5 team satisfaction)
        ✅ 100% retention (nobody left the team)
```

---

## Cross-Project Teamwork Patterns

### Team Composition & Roles (3 Projects)

**Project 2 (K12 Data Platform):**
- Me (Tech Lead) + James (Infrastructure) + Priya (Data) + Amara (QA)
- Outcome: On-time, 99.96% quality, 200+ users, 100% retention

**Project 3 (Registry Modernization):**
- Me (Architect) + 8 workstream leads (cross-functional)
- Outcome: 5-year roadmap approved, 5 microservices delivered Year 1

**Project 4 (ML Model):**
- Me (Lead) + 2 ML engineers + 1 data analyst + 1 compliance officer
- Outcome: F1 0.80, reduced due diligence 3 days → 30 min

---

### Decision-Making & Consensus

**"We Decide Together" Rule:**

```
Low-stakes decisions (< 4 hours impact):
├─ Individual decides, informs team
├─ Example: Query optimization approach (my decision)
└─ Team responds with feedback

Medium-stakes (4-24 hours impact):
├─ Discuss in standup/sync, aim for consensus
├─ Example: Fuzzy vs exact deduplication (Priya + me, 1-hour discussion)
└─ If consensus, move forward. If split, escalate to stakeholders.

High-stakes (> 1 day impact):
├─ Full team meeting + stakeholder input
├─ Example: DynamoDB vs PostgreSQL (4-hour experiment, team vote)
├─ Document decision in ADR (Architecture Decision Record)
└─ Revisit if assumptions change

Outcome: Everyone feels heard, decisions are high-quality, team alignment strong
```

---

## Summary: S7 Competency Demonstrated

✅ **Communication:** Daily standups, weekly syncs, async updates, pair programming, post-mortems

✅ **Collaboration:** Clear role boundaries, code reviews (learning-focused), knowledge sharing, decision-making consensus

✅ **Conflict Resolution:** Technical disagreements (data-driven), priority conflicts (escalate), personal friction (1:1s), resource constraints (prioritize with data)

✅ **Psychological Safety:** Safe to fail (no blame), safe to ask questions (explain reasoning), safe to disagree (respectful, data-driven), support each other

✅ **Peer Support:** Mentoring 3 engineers (James, Priya, Amara), unblocking immediately, recognizing contributions, advocating for team

**Real Evidence from K12 Data Platform Project:**

| Aspect | Evidence | Result |
|---|---|---|
| **Daily Communication** | Standups (5 min), async Slack, weekly syncs | Zero blockers lasted > 1 day |
| **Collaboration** | Code reviews, pair programming, knowledge wiki | 47 unit tests, 100% coverage |
| **Conflict Resolution** | DynamoDB vs PostgreSQL experiment, Amara morale 1:1 | Data-driven decision, Amara promoted |
| **Safety** | Admitted query optimization mistake, team helped debug | Issue fixed in 30 min, learned together |
| **Peer Support** | Mentored James (AWS), Priya (SQL optimization), Amara (UAT) | All 3 advanced 1-2 skill levels |
| **Recognition** | Shout-outs, 1:1 feedback, public email | 4.6/5 team satisfaction, 100% retention |

**Business Impact:**
- Team delivered on time (8 weeks)
- Quality exceeded targets (99.96% vs 99.75%)
- Zero production incidents
- 100% team retention (nobody left)
- 3 team members promoted or advanced
- Team can now operate independently (knowledge shared)

