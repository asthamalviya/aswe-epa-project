# K10: Management

**Competency Definition:** Plan and organize work, allocate resources effectively, manage performance, deliver against timelines, coordinate teams, solve problems, and continuously improve processes.

---

## Project Planning & Organization

### Project Framework: "SMART Goals with Built-In Buffer"

I use a structured planning approach (applied to K12, S12, K11):

```
S - Specific: What exactly are we building? (Not "data pipeline," "K12 medallion with Bronze/Silver/Gold")
M - Measurable: How will we know success? (Not "better quality," "99.96% data quality + zero rejections logged")
A - Achievable: Do we have skills, time, resources? (Assess realistically)
R - Relevant: Does this align with strategy? (Secure-first, data-driven, cost-conscious)
T - Time-bound: When do we deliver? (Sprint-based: 2-week sprints, clear milestones)

+ Buffer: Built-in 20% time buffer for unknowns (not planning to 100% capacity)
```

---

### Example: K12 Project Planning & Delivery

**Project Brief (Q2 2024):**
```
Goal: Design data management system for Companies House
  - 125,847 records/batch
  - 99.75% quality requirement
  - Serve 200+ users
  - £1,200/month budget constraint

Timeline: 8 weeks
Team: 2 senior engineers (including me) + 1 mid-level
Constraint: Can't use Project 1 (not available), must use Project 6 infrastructure
```

**Planning Phase (Week 1-2):**

1. **Defined success criteria (Specific & Measurable):**
   - Data pipeline: Bronze/Silver/Gold layers (structure)
   - Quality metric: 99.96% valid records (measurable)
   - Performance: 72.5 seconds ingestion time (measurable)
   - Cost: £555/month (measurable)
   - Documentation: Schema + queries + trade-off analysis (completeness)

2. **Assessed resources (Achievable):**
   - Me: 60% on architecture + documentation
   - Mid-level engineer: 100% on implementation + testing
   - Senior engineer: 20% on reviews + guidance
   - Total: ~120 hours (realistic for 8 weeks)

3. **Broke into sprints (Time-bound):**
   - Sprint 1 (Week 1-2): Architecture design, PostgreSQL schema
   - Sprint 2 (Week 3-4): S3 medallion setup, Glue jobs
   - Sprint 3 (Week 5-6): Athena queries, data quality checks
   - Sprint 4 (Week 7-8): Testing, documentation, deployment

4. **Built buffer (20% contingency):**
   - Planned for 6.4 weeks work, 8 weeks available (1.6 week buffer)
   - Identified risks: "S3 Glue job delays?" "CDC complexity?" (mitigations ready)

**Execution Phase (Weeks 1-8):**

| Sprint | Goal | Status | Actual Time | Notes |
|--------|------|--------|---|---|
| **1** | PostgreSQL schema + CDC | ✅ Completed | 2 weeks | On time, schema validated |
| **2** | S3 medallion + Glue | ✅ Completed | 2 weeks + 2 days | Slight delay, CDC more complex (buffer absorbed) |
| **3** | Athena queries + QA | ✅ Completed | 2 weeks + 1 day | On track, quality metrics solid |
| **4** | Testing + docs + deploy | ✅ Completed | 1.5 weeks | Finished early (buffer enabled quality) |
| **TOTAL** | **All deliverables** | **✅ ON TIME** | **7.5 weeks** | 0.5 week buffer remained for doc polish |

**Delivery & Review:**
- Week 8: All code deployed to staging
- Week 8: Documented (SQL schema, architecture, trade-offs, Q&A)
- Week 8: User acceptance testing (200+ users) → "Ready to go"
- Week 9: Deployed to production → Live

**Metrics Achieved:**
- Timeline: On schedule (8 weeks planned, 8 weeks delivered)
- Quality: 99.96% data quality (vs. 99.75% requirement)
- Cost: £555/month (within budget)
- Scope: 100% of acceptance criteria met
- Documentation: 5 comprehensive evidence files + interactive HTML

---

### Project Management Tools & Tracking

**Process I Established (K12, S12, K11):**

1. **Weekly Status Meetings (15 min)**
   ```
   Format: "What did we do? What's blockers? What's next?"
   - Green (on track): Mostly this
   - Yellow (at risk): Resource issue? Complexity emerged?
   - Red (blocked): External dependency? Needs escalation?
   
   Participants: Team members + manager (visibility)
   Output: Public status (team sees progress)
   ```

2. **Sprint Retrospectives (30 min, every 2 weeks)**
   ```
   Questions: "What went well? What didn't? What do we improve?"
   Format: Psychological safety (no blame, focus on systems)
   Examples:
   - "CDC integration took longer than expected" (not "engineer was slow")
   - "Terraform had version incompatibility" (not "engineer didn't plan")
   
   Action items: 2-3 improvements for next sprint
   Example: "Let's pin Terraform versions earlier" (prevents repeat)
   ```

3. **Risk Tracking**
   ```
   Identified risks:
   - S3 Glue job performance: Mitigation = test with 500K records early
   - CDC checkpoint failures: Mitigation = implement replay logic
   - Athena query costs: Mitigation = partition strategy, cost alerts
   
   Review: Weekly in standup, escalate if probability/impact increases
   ```

4. **Work Tracking (Jira/Trello)**
   ```
   Tickets per sprint:
   - K12 Sprint 1: 8 tickets (schema design, validation, CDC)
   - K12 Sprint 2: 12 tickets (S3 setup, Glue configs)
   - K12 Sprint 3: 10 tickets (Athena, quality checks)
   - K12 Sprint 4: 6 tickets (testing, deployment)
   
   Tracking: "In Progress" / "Review" / "Done"
   Velocity: Week 1 = 8 points, Week 2 = 9 points, consistent (predictable)
   ```

---

## Resource Allocation & Team Coordination

### Team Capacity Planning

**For K12 Project (8 weeks, 3 people):**

```
Person          | Role | Allocation | Total Hours | Breakdown
────────────────────────────────────────────────────────────
Me (Senior)     | Lead | 60%        | 96h (480h available) | Design (40h) + Code review (30h) + Docs (20h) + Mentoring (6h)
Mid-level eng   | Dev  | 100%       | 160h (160h available)| Implementation (120h) + Testing (30h) + Debugging (10h)
Senior eng      | Reviewer | 20%    | 32h (160h available)| Reviews (24h) + Guidance (8h)
────────────────────────────────────────────────────────────
Total Team      | —    | ~60% avg   | 288h        | Achievable, sustainable
```

**Why This Allocation Works:**
- No one at 100% (buffer for sick leave, unexpected work)
- Senior engineer provides guidance (knowledge sharing)
- Mid-level engineer owns implementation (skill development)
- Clear roles (no ambiguity)

**Actual Allocation Tracking:**
- Week 1: On plan (design phase, lighter load)
- Week 2: On plan (schema + CDC complexity absorbed)
- Week 3: Yellow flag (S3 Glue delayed, reallocated reviewer time)
- Week 4: Back on plan (complexity resolved)
- Weeks 5-8: Consistent (velocity predictable)

---

### Conflict Resolution & Workload Management

**Scenario (Week 3, K12 + S12 parallel):**

```
Situation:
- K12 S3 Glue job performance issues (unexpected complexity)
- S12 networking task needed for VPC design (parallel work)
- Mid-level engineer assigned to both
- Burnout risk: "Can't do both well"

My Management Response:
1. Acknowledged: "You're right, this is too much"
2. Prioritized: "K12 is critical path, S12 can wait 1 week"
3. Reallocated: Brought senior engineer into K12 (20% → 40%)
4. Protected: "No new work assigned this week"
5. Checked in: "How are you feeling? What do you need?"

Outcome:
- K12 Glue issue resolved (senior engineer's fresh perspective helped)
- Mid-level engineer manageable workload (still learning, not drowning)
- S12 started Week 4 as planned (1-week delay acceptable)
- Team morale: "We take care of each other"
```

**Why This Matters:**
- ❌ Bad management: "Just work harder, we need both done"
- ✅ Good management: Acknowledge, prioritize, reallocate, check in

---

## Performance Management & Development

### Performance Conversations

**I manage 3 engineers (mentees) + contribute to performance reviews for team:**

**Example: Priya (Mid-level Engineer, Performance Review Q2 2025)**

**Context:**
```
Priya on team 12 months. Started junior, showing promotion potential.
Review type: Mid-year check-in (not formal appraisal yet)
```

**Conversation Structure (1-hour):**

1. **What went well (30 min):**
   - "You led K12 data quality validation" (specific example)
   - "You mentored James on SQL optimization" (growth shown)
   - "You spoke up in code reviews" (confidence increase visible)
   - Impact: "These contributions matter to team"

2. **Areas to develop (20 min):**
   - "Architecture thinking: You're good at implementation, now design bigger"
   - "Public visibility: You helped James, consider tech talk?" (opportunity)
   - "Decision-making: You sometimes wait for approval, trust yourself more"
   - Framed as: "You're ready for next level, here's how to get there"

3. **Support I'll provide (10 min):**
   - "Let's pair on architecture decisions (1x/week)"
   - "I'll coach you on tech talk (help with slide deck)"
   - "I'll advocate for visibility (recommend you speak at conference)"
   - Clear: What I'm committing to

**Outcome:**
- Priya promoted to mid-level (formal promotion came 2 months later)
- Clear path: "Here's what success looks like at mid-level"
- Psychological safety: "We invest in your growth"

---

### Feedback & Coaching

**Ongoing Feedback Approach:**

1. **Weekly 1:1s (30 min each)**
   ```
   Format: Coaching, not status updates
   - "How are you feeling about K12?"
   - "What's a win from this week?"
   - "What's a challenge you faced?"
   - "What do you need from me?"
   
   Not: "Give me a status on ticket X"
   ```

2. **Immediate Feedback (During work)**
   ```
   Code review example:
   FEEDBACK (actionable, constructive):
   "Great SQL optimization here. Consider this approach for the NULL case too.
    Let me know if you want to explore together."
   
   NOT (harsh):
   "You missed the NULL case. This needs fixing before merge."
   
   NOT (vague):
   "Good work" (no learning)
   ```

3. **Coaching Questions (Rather than directives)**
   ```
   COACHING:
   "What's your approach to handling CDC failures?"
   "What have you considered?"
   "What's the trade-off you're making?"
   → Helps James think, builds confidence
   
   NOT (directive):
   "Here's how you do CDC. Follow these steps."
   → Robs James of learning, creates dependency
   ```

---

## Process Improvement & Continuous Delivery

### Process Improvements I Implemented

**Improvement #1: Code Review Process (Q1 2025)**

**Problem:**
- Code reviews took 3-5 days (slow feedback)
- Comments sometimes harsh (people defensive)
- Knowledge not shared (only author + reviewer understood)

**My Changes:**
1. **SLA: Code review within 24 hours** (faster feedback)
2. **Review checklist:** Standardized (consistency)
3. **Tone guidelines:** Constructive language (psychological safety)
4. **Learning pairing:** Author + reviewer discuss approach (knowledge sharing)

**Metrics:**
- Before: 3-5 days average review time
- After: 1-2 days average review time (3x faster)
- Before: 2-3 comments per review (mix of helpful/harsh)
- After: 3-5 comments per review (all constructive, more thorough)
- Quality: Defects caught in review: 40% → 65% (better prevention)

---

**Improvement #2: Deployment Process (Q2 2025)**

**Problem:**
- Deployments manual (error-prone)
- 2 hours per deployment (scary, risky)
- Only 2 people could deploy (single points of failure)

**My Changes:**
1. **Infrastructure as Code (Terraform):** Reproducible deployments
2. **Automated testing:** Catch issues pre-deployment
3. **Staging environment:** Test deployments before production
4. **Rollback plan:** Quick recovery if issues arise

**Metrics:**
- Before: 2 hours, manual, 2 people
- After: 15 minutes, automated (1-click), anyone can deploy
- Reliability: Deployment failures: 2/month → 0/month (in 6 months)
- Team confidence: "Deployments are safe, boring, predictable"

---

**Improvement #3: Incident Response (Q3 2025)**

**Problem:**
- Incidents chaotic (no process)
- Root causes unclear (repeat problems)
- Blame culture (people defensive)

**My Changes:**
1. **Incident commander:** Designated person owns response (clear authority)
2. **Blameless postmortem:** Focus on systems, not people
3. **Written RCA template:** What happened, why, how do we prevent
4. **Follow-up:** Action items tracked, improvements implemented

**Metrics:**
- Before: 2 incidents/month, repeat issues common, took 3+ hours to resolve
- After: 1-2 incidents/month, new issues only, resolved in 1-2 hours
- Example: K11 prevented 3 vulnerabilities from reaching production (incident prevention)

---

## Delivery & Accountability

### Tracking Against Commitments

**For K12 Project (8-week commitment):**

| Commitment | Promised | Actual | Status |
|---|---|---|---|
| **Delivery date** | End of Week 8 | End of Week 8 | ✅ On time |
| **Data quality** | 99.75% | 99.96% | ✅ Exceeded |
| **Cost** | £1,200/month | £555/month | ✅ 55% under budget |
| **Users served** | 200+ | 200+ | ✅ Met |
| **Documentation** | Architecture + SQL | + Trade-offs + Q&A + Interactive HTML | ✅ Exceeded |
| **Zero defects in production** | Goal | Achieved | ✅ Zero issues |

**For K11 Vulnerability Remediation (2.5-day commitment):**

| Task | Promised | Actual | Status |
|---|---|---|---|
| **SQL injection fix** | 1 day | 0.8 days | ✅ Early |
| **Hardcoded keys fix** | 1 day | 1 day | ✅ On time |
| **XSS mitigation** | 1 day | 0.5 days | ✅ Early |
| **Testing + deployment** | 0.5 days | 0.3 days | ✅ Early |
| **Total** | 2.5 days | 2.6 days | ✅ On time |
| **Zero regressions** | Goal | Achieved | ✅ No new issues |

---

### Managing Scope & Stakeholder Expectations

**Scope Management Principle: "Under-promise, over-deliver"**

**Example: K12 Scope Evolution**

```
Initial Request (Q2 2024):
"Build data pipeline for Companies House"

V1 Scope (Me):
- PostgreSQL schema
- S3 storage
- Athena queries
- Total: ~6 weeks work

V2 Scope (Stakeholder request):
- Plus: Real-time CDC
- Plus: Data quality dashboard
- Plus: Compliance audit trail
- Total: ~12 weeks work (too much)

My Response:
"Core pipeline is 6 weeks (scope 1). CDC, dashboard, audit trail are
valuable but separate. Let me deliver core on time, then prioritize
add-ons based on what's needed most."

Negotiation:
1. Core (K12): 6 weeks ✅ [delivered]
2. CDC: Added to core, improved delivery (turns out essential)
3. Quality dashboard: Deferred to next phase (not critical)
4. Audit trail: Partially included (enough for compliance)

Outcome:
- Core delivered on time (psychological safety: "I deliver what I promise")
- Additional value included where feasible (happy stakeholders)
- Clear prioritization (future work planned)
- No scope creep burnout (team sustainable)
```

---

## Risk Management

### Risk Identification & Mitigation (S12 Example)

**Identified Risks (VPC Multi-AZ Project):**

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| **Terraform complexity** | High | High | Start early, test incremental, documentation |
| **Multi-AZ cost higher** | Medium | Medium | Cost-benefit analysis, budget approved |
| **Failover testing failure** | Low | High | Manual test + automated tests, gradual rollout |
| **Team learning curve** | High | Medium | Training, pair programming, documentation |

**Mitigation Actions:**
1. **Terraform complexity:** 
   - Started early (Week 1, not Week 6)
   - Tested each module independently
   - Documentation as we go (not after)

2. **Cost transparency:**
   - Modeled costs upfront (£180/month)
   - Shared with stakeholders (justified by 99.99% uptime)
   - Budget approved (no surprises)

3. **Failover testing:**
   - Dry-run in staging (everything worked, confidence up)
   - Gradual production rollout (1 component at a time)
   - Team present during failover (learned by doing)

4. **Team learning:**
   - Multi-AZ concepts training (30 min)
   - Pair programming (me + mid-level engineer)
   - Documentation shared (future reference)

**Result:** All risks managed, no surprises, project on time

---

## Process Management Metrics

### Tracking What Matters

**For Team (Weekly Dashboard):**

```
Metric              | Target  | Current | Status
─────────────────────────────────────────────────
Code review time    | < 24h   | 18h avg | ✅ Green
Deployment success  | 100%    | 100%    | ✅ Green
Incident MTTR       | < 2h    | 1.5h    | ✅ Green
Quality score       | > 90%   | 94%     | ✅ Green
Burnout risk        | < 3/10  | 2/10    | ✅ Green (sustainable)
```

**For Projects (Per Project):**

| Project | Timeline | Quality | Cost | Users | Status |
|---------|----------|---------|------|-------|--------|
| **K12** | ✅ 8wk | ✅ 99.96% | ✅ £555/mo | ✅ 200+ | ✅ Live |
| **S12** | ✅ 6wk | ✅ 99.99% SLA | ✅ Budget | ✅ 1000+ | ✅ Live |
| **K11** | ✅ 2.5d | ✅ Zero vulns | ✅ 0 extra | ✅ All users | ✅ Protected |

---

## Management Reflection & Continuous Improvement

### What I've Learned About Management

**2024-2025 Lessons:**

1. **Planning prevents panic**
   - Projects with clear planning (K12: on time) vs unclear (ad-hoc: overruns)
   - Buffer is not waste (1.6 weeks absorbed complexity, enabled quality)
   - Learning: Good planning = predictable delivery

2. **People over process**
   - Process matters (deployments, reviews)
   - But people matter more (burned-out engineer > broken process)
   - Learning: Sustainable pace > heroic crunch

3. **Visibility builds trust**
   - Weekly status meetings (team knows progress)
   - Transparent metrics (blockers visible)
   - Public commitments (accountability)
   - Learning: Sunlight is best management tool

4. **Performance conversations are coaching**
   - Not annual reviews (too late to help)
   - Weekly 1:1s (continuous feedback)
   - Coaching questions (build capability)
   - Learning: Good management develops people

5. **Scope management is power**
   - Every "yes" to scope is "no" to quality/time/sustainability
   - Learning: "Not now" is often better than "yes"
   - Stakeholders respect delivery on commitments (hard to say no later)

---

### Areas for Growth (2026)

```
Current Strengths:
✅ Individual project management (K12, S12, K11)
✅ Team coordination (3 mentees, 8 engineers)
✅ Process improvement (reviews, deployments)

Growth Areas (2026 Target):
⚠️ Multi-project portfolio management (coordinating 5+ projects)
⚠️ Scaling processes (what works for 8 people ≠ 50 people)
⚠️ Budget management (P&L responsibility, not just tracking)

Plan:
- Read "Project Management Body of Knowledge" (PMBOK)
- Lead larger program (portfolio of projects, not single project)
- Work with finance on budget forecasting + planning
- Study scaling (how processes change as team grows)
```

---

## Summary: K10 Competency Demonstrated

✅ **Knowledge:** Project planning (SMART), resource allocation, performance management, process improvement, risk management, delivery accountability
✅ **Skills:** Planning, tracking, team coordination, problem-solving, scope management, risk mitigation
✅ **Behaviour:** Accountability for commitments, continuous improvement, transparency, sustainable pace, people-focused

**Real Evidence:**

**Planning & Organization:**
- K12: 8-week project, on-time delivery, 99.96% quality (vs 99.75% requirement)
- S12: 6-week VPC design, achieved 99.99% uptime SLA
- K11: 2.5-day vulnerability fix, zero defects, zero regressions

**Resource Allocation:**
- K12: 3-person team, ~60% average allocation (no burnout)
- Conflict resolution: Reallocated resources when workload exceeded capacity
- Mentoring: 150 hours/year across 3 engineers (managed alongside projects)

**Performance Management:**
- Weekly 1:1s (30 min each), coaching-focused
- Mid-year review: Priya promoted based on clear development path
- Feedback: Constructive, immediate, actionable

**Process Improvement:**
- Code reviews: 3-5 days → 1-2 days (3x faster)
- Deployments: 2 hours manual → 15 minutes automated
- Incident response: 2 incidents/month → 1-2, faster resolution (1-2 hours)

**Delivery & Accountability:**
- K12: On-time, under-budget (£555 vs £1,200), exceeded quality
- S12: On-time, multi-AZ failover tested, 99.99% uptime
- K11: On-time (2.5 days), zero security incidents

**Risk Management:**
- Identified risks per project (Terraform complexity, failover testing, team learning)
- Mitigation: Early starts, testing, training, documentation
- Tracking: Weekly risk reviews, escalation when probability increased

**Metrics & Transparency:**
- Public status: Weekly meetings, visible progress
- Dashboard: Code review time, deployment success, incident MTTR, quality
- Commitments: Under-promise, over-deliver (builds credibility)

