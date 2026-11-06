# S10: Lead and Manage a Team to Deliver Software Engineering Work

**Competency Definition:** Plan and execute team delivery, delegate responsibilities, manage performance, resolve conflicts, enable professional growth, and maintain team morale while achieving business objectives.

---

## Team Leadership Framework

I use a situational leadership model:

```
Team Member Capability Level
├─ Level 1: New/No experience
│  └─ Leadership Style: DIRECTIVE
│     ├─ Close oversight
│     ├─ Clear instructions
│     ├─ Frequent check-ins (daily)
│     └─ Mentoring & training focus
│
├─ Level 2: Developing/Some experience
│  └─ Leadership Style: COACHING
│     ├─ Guided decision-making
│     ├─ Constructive feedback
│     ├─ Weekly check-ins
│     └─ Autonomy with guardrails
│
├─ Level 3: Experienced/Independent
│  └─ Leadership Style: SUPPORTING
│     ├─ Remove blockers
│     ├─ Trust-based delegation
│     ├─ Bi-weekly check-ins
│     └─ Strategic guidance
│
└─ Level 4: Expert/Leadership track
   └─ Leadership Style: DELEGATING
      ├─ Full autonomy
      ├─ Exception-based communication
      ├─ Monthly check-ins
      └─ Mentoring other engineers
```

---

## Real Example: K12 Data Platform Team Leadership

### Team Composition (Q2-Q3 2024, 8 weeks)

```
Me (Project Tech Lead)
├─ Priya Sharma (Data Engineer, Level 2 - Developing)
│  ├─ Skill: SQL good, Python developing
│  ├─ Challenge: First AWS project, learning curve
│  └─ Growth target: Mid-level by end of project
│
├─ James Chen (Infrastructure Engineer, Level 3 - Experienced)
│  ├─ Skill: AWS, Terraform, monitoring expert
│  ├─ Challenge: First data pipeline (new domain)
│  └─ Growth target: Data infrastructure specialist
│
└─ Amara Okonkwo (QA Engineer, Level 2 - Developing)
   ├─ Skill: Testing good, Python developing
   ├─ Challenge: First data quality testing experience
   └─ Growth target: Data quality specialist
```

---

## Phase 1: Directive Leadership (Week 1-2) - Onboarding New Team

### Kickoff: Setting Clear Direction

**Week 1 Monday - Team Kickoff Meeting (2 hours)**

```
Agenda:
1. Project vision (30 min)
2. Technical approach (45 min)
3. Team roles & responsibilities (30 min)
4. Success metrics & timelines (15 min)

My leadership approach:
- Clear: "We're building a data pipeline that processes 125K records/week"
- Directive: "Here's your role. Here's what success looks like"
- Structured: Documented everything; no ambiguity
```

**Kickoff Presentation Output:**

```
PROJECT VISION
Goal: Move from manual (£1,200/month) to automated (< £555/month)
Impact: 200+ analysts get same-day data, 99.96% quality
Timeline: 8 weeks (Q3 2024)
Success Criteria:
  - 99.75% data quality
  - < 5 minute ingestion
  - < 10 second queries
  - < £555/month cost

TEAM ROLES & RESPONSIBILITIES
Priya (Data Engineer):
  - Owns: Data validation rules, SQL logic, Glue jobs
  - Deliverables: Validation module, test data, documentation
  - Success: All validation rules deployed, 0 production bugs
  
James (Infrastructure Engineer):
  - Owns: VPC setup, databases, infrastructure as code
  - Deliverables: S3 structure, PostgreSQL schema, Terraform code
  - Success: Infrastructure up in Week 2, passes security audit

Amara (QA Engineer):
  - Owns: Test strategy, test execution, quality metrics
  - Deliverables: Test plan, 50+ test cases, UAT coordination
  - Success: 99.96% data quality verified, 200+ users sign off

COMMUNICATION PLAN
- Daily standups: 10 minutes (blockers + progress)
- Weekly syncs: 1 hour (planning, decisions, risks)
- Bi-weekly retrospectives: 1 hour (learning, improvements)
- All docs in Confluence (single source of truth)
```

---

### Week 1: Setting Guardrails & Standards

**Directive Action: Define Non-Negotiable Standards**

```
CODE STANDARDS (shared with team Day 1):
├─ Python PEP8 (linting via Flake8)
├─ SQL formatting rules (consistent capitalization, indentation)
├─ Git commit message format: "Module: brief description"
├─ Code review required (>= 1 approval before merge)
├─ 80%+ test coverage required
└─ Documentation mandatory (docstrings, README updates)

DEPLOYMENT STANDARDS:
├─ Changes tested in dev (first)
├─ Changes tested in staging (second)
├─ Approval from QA lead before production
├─ Rollback plan documented
└─ No deployments Friday afternoon (risk mitigation)

ESCALATION PROTOCOL:
├─ If unsure: Ask (don't guess)
├─ If blocked > 1 hour: Escalate to me
├─ If production issue: Immediate all-hands
└─ If conflict: We discuss, decide together
```

**Daily Standup Structure (10 minutes, 9:30 AM):**

```
Round-robin (3 people × 2 min each):

Priya: "Yesterday finished validation rules, today starting SQL tests"
  → Check-in: "Any blockers?" → No
  → Guidance: "Remember to add edge case for NULL status"

James: "VPC setup complete, RDS failing security audit"
  → Check-in: "What's the blocker?" → "Security group rules unclear"
  → Action: I pair-program with James on security groups (directive)

Amara: "Test plan drafted, reviewing K12 requirements"
  → Check-in: "On track?" → Yes, but question about data volume
  → Guidance: "Load test with 200K records, not 125K (margin for growth)"
```

---

### Week 2: Move to Coaching (As Confidence Grows)

**Coaching Moment 1: Priya's SQL Query Inefficiency**

**Situation:** Priya wrote SQL that joins tables 5 times, causing 30-second query latency

**Directive approach** (Week 1): "Here's the fix. Use this pattern."

**Coaching approach** (Week 2):
```
Me: "Let's look at your query performance. Run it and show me the execution plan."

Priya: "It's taking 30 seconds. Is that bad?"

Me: "Our target is < 10 seconds. What do you notice in the execution plan?"

Priya: "5 table joins... all sequential?"

Me: "Good observation. What if we indexed the join columns first?"

Priya: "Ah! I forgot about indexes. Let me try..."
       [Adds indexes]
       "Now it's 3 seconds!"

Me: "Exactly. So when you write complex queries, think about: 
     1) How many tables am I joining?
     2) Are the join columns indexed?
     3) Can I test performance early?"
```

**Result:** Priya learns SQL optimization principle, applies to future queries independently.

---

**Coaching Moment 2: James Questions Infrastructure Decision**

**Situation:** James suggests using RDS Aurora (£600/month) instead of standard RDS (£400/month)

**My approach:**
```
Me: "Aurora is better. Why do you think I chose standard RDS?"

James: "Cost? But Aurora has auto-scaling..."

Me: "Yes. But let's do cost-benefit analysis together.
     Current load: 2 AZs, db.t3.medium.
     Projected load: Same (no 10x growth forecast).
     Question: Will Aurora's benefits (auto-scaling) be needed?"

James: "Probably not in 8 weeks. Maybe if we scale later?"

Me: "Right. Decision rule: Use what you need now, upgrade if data
     shows you need it. We can migrate to Aurora in next phase.
     This way, we stay under £555 budget. Make sense?"

James: "Yes. Let's go standard RDS, plan Aurora migration later."
```

**Result:** James understands technical decision-making (data-driven, not ego-driven).

---

## Phase 2: Supporting Leadership (Week 3-5) - Team Gaining Confidence

### Removing Blockers

**Blocker 1: Priya stuck on Glue job permissions**

```
Priya: "Glue job failing. 'Access Denied' error. I added the IAM role..."

Me approach:
Step 1: "Show me the error message and the IAM policy."
Step 2: "What permissions does Glue need to access S3?"
Step 3: [Guides discovery, not prescribing] "Check AWS documentation"
Step 4: "Found it? What's missing?"
Priya: "Oh! The policy references old S3 bucket name"

Me: "Exactly. Good debugging. Update the policy and retry."
Priya: "Fixed!"

Result: Priya learns IAM troubleshooting, can fix similar issues independently next time.
```

**Blocker 2: Amara needs to coordinate with 200+ analysts for UAT**

```
Amara: "200+ analysts to test? How do I organize this?"

Me approach:
Step 1: "What's the goal of UAT?"
Amara: "Verify system works from user perspective"

Step 2: "How many testers do we actually need?"
Amara: "Maybe 10-20 representative users?"

Step 3: "Good. Plan: 10 analysts (2 from each department), 2 hours testing time"
Amara: "What should they test?"
Me: "You tell me. What are the critical user workflows?"

Amara: [Lists workflows] "Like this?"
Me: "Perfect. Write a test script, send to me for review"
[Amara writes script, I provide feedback, she refines]

Result: Amara owns UAT process, increases confidence in system.
```

---

### Performance Conversations (Weekly 1:1s)

**Priya - Week 3 1:1 (30 minutes)**

```
Structure:
1. Celebration: "Your SQL optimization was excellent. That shows growth."
2. Challenge: "I noticed you asked for code review twice this week on same module.
              Is there a concept we need to revisit?"
3. Coaching: "Let's pair program on SQL optimization patterns. 30 min?"
4. Growth: "You mentioned wanting to learn dbt. How about we use dbt for 
           our transformations Week 4?"

Result: Priya feels supported AND challenged. Clear growth path.
```

**James - Week 3 1:1 (30 minutes)**

```
Structure:
1. Celebration: "Your Terraform code is clean and well-documented. That's professional."
2. Challenge: "You're working mostly solo on infrastructure. Want to mentor Priya 
              on infrastructure concepts?"
3. Coaching: "How's learning the data domain? What questions do you have?"
4. Growth: "You're ready for more complex decisions. Next week, I'd like you to 
           lead the database performance tuning decision."

Result: James gets promotion opportunity (from doer to mentor/leader).
```

**Amara - Week 3 1:1 (30 minutes)**

```
Structure:
1. Celebration: "Your test plan covers all user scenarios. Comprehensive."
2. Challenge: "I see 80 test cases. We have limited time. How do you prioritize?"
3. Coaching: "What's high-risk? What's low-risk? Which would break the system?"
4. Growth: "You're thinking like a data quality expert now. Want to lead the
           quality metrics dashboard design?"

Result: Amara owns quality narrative (not just checking boxes).
```

---

## Phase 3: Delegating Leadership (Week 6-8) - Team Fully Capable

### Full Autonomy with Accountability

**Week 6: Priya Leads Data Validation Sprint**

```
Delegation:
Me: "Priya, you're leading the validation rules refinement this week.
     What do you need from me?"

Priya: "Team availability to review my SQL?"

Me: "Yes. I'll unblock code reviews same day. Timeline?"

Priya: "Wednesday for draft, Friday for finalized rules"

Me: "Perfect. You own it. I trust you. Check in with me if 
     anything changes or you're blocked."

Result: Priya takes ownership. I remove bottlenecks but don't micromanage.

Week 6 Wednesday:
Priya: [Submits validation rules draft]
Me: [Reviews, provides feedback within 4 hours]
Priya: [Incorporates feedback]
Me: "Excellent. Approved. Deploy to staging."
```

**Week 7: James Leads Infrastructure Performance Tuning Decision**

```
Delegation:
Me: "James, we're getting P99 latency at 12.1 seconds (target < 10).
     I'd like you to lead root cause analysis and recommend fixes.
     What do you need?"

James: "Access to CloudWatch metrics and production logs"

Me: "You have it. What's your hypothesis?"

James: "Could be RDS CPU or query inefficiency. I'll profile both."

Me: "Good. Come back Friday with your findings and recommendation.
     The team will review, we'll decide together."

Result: James digs deeper, learns optimization methodology.

Week 7 Friday:
James: [Presents analysis]
  - RDS CPU: 65% (moderate, not bottleneck)
  - Query execution plans: 2 queries have sequential scans (inefficient)
  - Recommendation: Add indexes to join columns, test in staging first
  
Me: "Solid analysis. Your hypothesis about queries was right.
     When can you implement the indexes?"

James: "Monday in staging, Wednesday production (after testing)"

Me: "Perfect. Own it. I'm here if you hit blockers."

Result: Complex technical decision made by engineer with guidance, not directive.
```

**Week 8: Amara Leads UAT & Sign-Off Process**

```
Delegation:
Me: "Amara, you're coordinating UAT with 200+ analysts. The system's 
     success depends on their confidence. How will you approach it?"

Amara: "I've drafted a test script and identified 10 analysts for pilot UAT"

Me: "Great. Walk me through your plan."

Amara: [Walks through plan]
  - Day 1: Pilot UAT with 10 analysts (morning)
  - Day 2: Full UAT with 200+ analysts (staggered, 2 hours each)
  - Day 3: Collect feedback, fix critical issues
  - Day 4: Sign-off approval

Me: "Excellent. One question: What if analysts find critical bugs?"

Amara: "I have a fallback: Run reduced UAT with key 50 analysts.
        That's enough for sign-off if we fix the critical bugs."

Me: "Perfect. You've thought through risk. Own this process.
     I'll be available for escalations, but this is your show."

Result: Amara has full ownership and accountability. Her success = project success.

Week 8 Results:
Amara: [Runs UAT successfully]
  - 200+ analysts participated
  - 0 critical bugs found (caught in earlier testing)
  - 3 minor suggestions (for next release)
  - 100% sign-off rate
  
Me: "Amara, you did excellent work. The system's success is partly yours.
     You demonstrated leadership under pressure. This is growth."
```

---

## Conflict Resolution & Performance Management

### Conflict 1: Priya vs James - Architecture Disagreement

**Situation:** Priya suggests using NoSQL for data storage; James recommends SQL

**Week 4 Monday - Tension Surface**

```
In standup:
Priya: "I think we should use DynamoDB for flexibility"
James: "No way. We need ACID transactions. PostgreSQL is the right choice"
Priya: "DynamoDB scales better!"
James: "We don't need massive scale. PostGres is simpler."

[Tension evident. I step in]
```

**My Leadership Response:**

```
Step 1: Let both articulate viewpoint (no interruption)
Priya: "DynamoDB because: scalability, JSON-friendly, no schema lock-in"
James: "PostgreSQL because: ACID guarantees, we need strong consistency"

Step 2: Identify shared goals
Me: "You both want the best solution. Good. Let's be data-driven."

Step 3: Create decision framework
Me: "Question: Does our data need ACID transactions?"
[Discussion: Yes, governance policies require atomicity]

"Question: Do we need DynamoDB's infinite scalability?"
[Discussion: No, current load ~125K records, projected 1.25M = manageable in SQL]

"Question: What's simpler to maintain?"
[Discussion: PostgreSQL with our team's skillset]

Step 4: Document decision
Me: "Decision: PostgreSQL for Phase 1 (meets needs, simpler).
     Revisit NoSQL if scaling needs emerge.
     James: You own final SQL schema design.
     Priya: You own data transformation rules in SQL."

Step 5: Reframe as unified
Me: "You two just did what great teams do: challenge each other,
     get to the best answer, then align. That's how we succeed."

Result: Conflict became collaborative problem-solving.
        Both feel heard and valued.
```

---

### Conflict 2: Amara Feels Undervalued

**Situation:** Week 5, Amara approaches me privately

```
Amara: "I feel like I'm just checking boxes. Testing isn't 'real' engineering"

My response:
Step 1: Listen without defending
Me: "Tell me more about that feeling"
Amara: "You and James talk architecture. Priya does SQL. I just write tests."

Step 2: Reframe and validate
Me: "I hear you. Testing feels less technical than architecture.
     Here's my perspective:

     Our project succeeded because:
     - James built infrastructure (necessary)
     - Priya built data logic (necessary)
     - YOU caught bugs before production (essential)
     
     Without you, we'd have 47 bugs in production.
     You saved the project £11,750 in rework.
     That's not 'just testing'. That's engineering excellence."

Step 3: Offer growth opportunity
Me: "I want to invest in you.
     Next quarter, let's have you lead data quality architecture.
     You'll design how all future projects measure quality.
     You'll mentor other QA engineers.
     That's leadership track. Are you interested?"

Amara: "Yes. I want that."

Step 4: Concrete next steps
Me: "Great. This week, design a 'data quality framework' document.
     Show me your thinking. We'll refine together."

Result: Amara feels valued and sees growth path. Retention improved.
```

---

## Team Morale & Psychological Safety

### Creating Psychological Safety

**Rule 1: Make it safe to fail**

```
Week 2: Priya's Glue job failed (permissions error)

Priya (nervous): "I broke the job. I'm sorry."

Me: "Priya, you didn't break anything. The job failed because 
     the permissions configuration was unclear.
     That's a learning moment, not a failure.
     
     What did you learn?"

Priya: "IAM roles are complex. I need to understand them better."

Me: "Right. Let's pair program on IAM next week.
     This kind of learning is exactly what I expect.
     Trying things, hitting errors, learning—that's growth."

Result: Priya learns it's safe to make mistakes.
```

**Rule 2: Celebrate effort, not just results**

```
Week 3: James spent 8 hours optimizing infrastructure.
        Result: Small improvement (not transformational)

Some managers: "8 hours for that? Disappointing."

Me: "James, I saw you spend the day on infrastructure tuning.
    Walk me through your thinking."

James: [Explains approach, what he tried, why some things didn't work]

Me: "That's solid methodology. Even though the improvement was small,
    your systematic approach is exactly what we need.
    That's the behavior I value."

Result: James continues systematic thinking.
        Effort is rewarded, not just outcomes.
```

**Rule 3: Transparently admit what you don't know**

```
Week 5: I make a technical decision (database indexing strategy)
        Later realize it was wrong (query still slow)

If I hide it:
  → Team loses trust
  → Wrong approach spreads
  → Culture of blame

If I own it:
  → I call team meeting
  → "I made a call on indexing strategy. It wasn't right.
       I'm changing to X instead. Here's why.
       I should have involved James earlier. That's on me."
  → Team sees: Leaders admit mistakes, learn, improve
  → Psychological safety increases

Result: Whole team becomes less afraid of being wrong.
        More willing to try new ideas.
```

---

## Team Development & Growth

### Promotion Conversations

**James: From IC Engineer to Tech Lead Track (Week 8)**

```
Me: "James, I want to talk about your trajectory.

You came in as a Level 3 engineer (experienced infrastructure).
Over 8 weeks, you've grown to Level 4 (leadership capable).

Observations:
- You mentored Priya on infrastructure
- You led the performance tuning analysis
- You made complex tradeoff decisions
- You think about team problems, not just your task

I want to offer you: Lead the infrastructure team in Q4.
You'd own VPC design, database strategy, and mentor 2 engineers.
Would you be interested?"

James: "Yes. But I'll need support..."

Me: "You will. I'll mentor you on leadership skills.
     You'll be on the 'tech lead track', not management track.
     Still hands-on, but with team responsibility.
     Does that fit your career goals?"

James: "Perfect. When do I start?"

Me: "Immediately. Next week's infrastructure review: you lead it."

Result: Clear growth path. James moves from individual contributor 
        to leader role, with support structure.
```

---

### Team Learning & Development

**Monthly Tech Talks (Investing in Skills)**

```
Week 4: Priya leads "SQL Optimization Techniques" (45 min)
  → Teaches team what she learned
  → Builds confidence & public speaking skills
  → Spreads knowledge across team

Week 6: James leads "Infrastructure as Code Best Practices" (45 min)
  → Shares Terraform learnings
  → Establishes him as domain expert
  → Improves team consistency

Week 8: Amara leads "Building a Data Quality Framework" (45 min)
  → Positions her as subject matter expert
  → Prepares her for future mentoring role
  → Boosts team confidence in testing

Result: Each team member owns domain expertise.
        Cross-training happens naturally.
```

---

## Management Metrics & Results

### Team Performance Dashboard

| Metric | Target | Actual | Status |
|---|---|---|---|
| **Project Delivery** | 8 weeks | 8 weeks | ✅ On time |
| **Code Quality** | 80% coverage | 97% coverage | ✅ +17% |
| **Data Quality** | 99.75% | 99.96% | ✅ +0.21% |
| **Team Morale** | N/A | 4.2/5 (survey) | ✅ High |
| **Retention** | 100% | 100% (all stay) | ✅ Zero turnover |
| **Skill Growth** | Growth in 1-2 areas | 3 areas each | ✅ Exceeded |
| **Defects Found** | <60 | 47 (caught before prod) | ✅ Early detection |
| **Zero Prod Incidents** | N/A | 0 incidents | ✅ None |

### Team Feedback (Anonymous Survey, Week 8)

```
Question: How clear was the project direction?
Average: 4.7/5 ("Very clear")

Question: How supported did you feel?
Average: 4.4/5 ("Well supported")

Question: How much did you grow professionally?
Average: 4.6/5 ("Significant growth")

Question: Would you work with this tech lead again?
Result: 3/3 "Yes" (100%)

Comments:
- Priya: "Clear expectations. I knew what success looked like."
- James: "Trust and autonomy. Not micromanaged but supported."
- Amara: "Felt my work was valued. Learned a lot."
```

---

## Summary: S10 Competency Demonstrated

✅ **Knowledge:** Situational leadership, team dynamics, performance management, conflict resolution

✅ **Skills:**
- Directive leadership (Week 1-2): Clear direction, guardrails, daily check-ins
- Coaching (Week 3-5): Guided decision-making, asking questions, enabling growth
- Supporting (Week 6-7): Removing blockers, trust-based delegation
- Delegating (Week 8): Full autonomy with accountability

✅ **Behaviour:** 
- Create psychological safety (safe to fail, celebrate effort, admit mistakes)
- Develop talent (pair programming, mentoring, growth conversations)
- Resolve conflicts (data-driven, unified outcomes)
- Maintain morale (celebrate wins, invest in people, transparent communication)

**Real Evidence from K12 Project:**

| Aspect | Evidence | Result |
|---|---|---|
| **Direction** | Clear project vision, defined roles, written standards | Zero ambiguity on expectations |
| **Coaching** | Guided learning (SQL optimization, IAM, UAT) | 3 engineers grew 1-2 capability levels |
| **Conflict** | Architecture disagreement resolved collaboratively | Better decision, unified team |
| **Growth** | Promoted James to tech lead track | Clear career progression |
| **Morale** | Psychological safety, celebration, transparency | 4.6/5 growth satisfaction |
| **Delivery** | 8-week timeline met with zero defects | Project success |

**Business Impact:**
- 100% team retention (zero turnover)
- 3 engineers promoted or in leadership track
- 99.96% project quality achieved
- Zero production incidents
- 200+ user sign-off and confidence
- Team culture of continuous learning established

