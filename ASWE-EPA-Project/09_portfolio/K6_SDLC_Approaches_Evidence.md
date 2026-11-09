# K6: SDLC Approaches & Techniques

**Competency Definition:** Understand Software Development Lifecycle approaches (Waterfall, Agile, DevOps). Apply appropriate methodology. Manage sprints, backlogs, releases. Handle deployment pipelines. Adapt approach based on project context.

---

## SDLC Methodologies Comparison

```
WATERFALL (Sequential)
├─ Requirements → Design → Development → Testing → Deployment
├─ Best for: Fixed requirements, regulated industries, hardware integration
├─ Pros: Clear planning, comprehensive documentation, predictable
├─ Cons: Late discovery of issues, inflexible to change
└─ Project: Highly regulated systems (banking, healthcare)

AGILE (Iterative)
├─ 2-week sprints: Plan → Design → Code → Test → Review → Deploy
├─ Best for: Evolving requirements, fast feedback, customer collaboration
├─ Pros: Early delivery, quick feedback, adapts to change
├─ Cons: Requires active stakeholder involvement, can be chaotic
└─ Project: SaaS, mobile apps, startups

DEVOPS (Continuous)
├─ Automated: Code → Test → Deploy (multiple times per day)
├─ Best for: Mature teams, high velocity, infrastructure as code
├─ Pros: Fast feedback, automation reduces errors, continuous improvement
├─ Cons: Requires discipline, comprehensive testing, monitoring
└─ Project: Cloud-native, high-frequency deployment

HYBRID (Context-Dependent)
├─ Combine approaches based on project needs
├─ Example: Waterfall for requirements, Agile for development
└─ Most practical for real-world scenarios
```

---

## Real Example 1: Project 5 (Agile Approach)

### Context
- Fast-moving product team (10 people)
- Requirements evolve monthly (user feedback, market changes)
- Need MVP in 4 weeks, then iterate
- Customer demos every 2 weeks

### Agile Implementation: 2-Week Sprints

**Sprint Structure:**

```
SPRINT PLANNING (2 hours, Monday 10am)
├─ Review backlog (prioritized by product)
├─ Estimate story points (Planning Poker)
├─ Commit to sprint goals
└─ Assign to team members

DAILY STANDUP (15 minutes, 9:30am)
├─ What I completed yesterday
├─ What I'm working on today
├─ Any blockers?
└─ Sync time estimate

DEVELOPMENT (Sprint work, continuous)
├─ Pair programming for complex features
├─ Code review before merge (no hero commits)
├─ Automated testing (CI/CD pipeline)
└─ Feature deployed to staging daily

MID-SPRINT CHECK-IN (Friday afternoon)
├─ Burndown chart review (on track?)
├─ Risk assessment
├─ Adjust if needed
└─ Celebrate wins

SPRINT DEMO (Friday 4pm)
├─ Show working features to stakeholders
├─ Get feedback
├─ Backlog refinement based on feedback

SPRINT RETROSPECTIVE (Friday 5pm)
├─ What went well?
├─ What could improve?
├─ Action items for next sprint
└─ Celebrate team effort
```

**Example Sprint (Campaign Feature):**

```
SPRINT GOAL: Ship campaign creation MVP
TEAM: 8 people
DURATION: 2 weeks

BACKLOG ITEMS:
├─ US-1: Create campaign (name, template, recipients) → 8 points
├─ US-2: Schedule campaign (immediate, future, recurring) → 5 points
├─ US-3: Campaign preview (personalization) → 3 points
├─ US-4: Campaign analytics dashboard → 8 points
├─ US-5: Export campaign results (CSV) → 3 points
└─ TOTAL: 27 points (team velocity: 26 points/sprint)

SPRINT COMMITMENT: US-1, US-2, US-3, US-5 (19 points, realistic)
STRETCH: US-4 (if time allows)

DAY-BY-DAY PROGRESS:

Monday:
├─ Design session: Campaign schema
├─ Two-person pairing on US-1 (backend)
└─ Burndown: 19 points remaining

Tuesday-Wednesday:
├─ US-1 (create campaign): Complete + tests
├─ US-2 (scheduling): In progress
├─ Code review: 2 PRs merged
└─ Burndown: 11 points remaining

Thursday:
├─ US-2: Complete + tests
├─ US-3 (preview): In progress
├─ Demo to product: "Campaign creation working!"
└─ Burndown: 6 points remaining

Friday:
├─ US-3: Complete + tests
├─ US-5: In review (code review in progress)
├─ Demo to stakeholders (5 campaign examples shown)
├─ Retrospective: "Communication great, testing saved us bugs"
└─ Final burndown: 3 points (US-5 almost done, carries to next sprint)
```

**Metrics & Results:**

```
Velocity:
├─ Sprint 1: 26 points (team warming up)
├─ Sprint 2: 28 points
├─ Sprint 3: 31 points (increasing confidence)
└─ Average: 28 points (used for planning)

Quality:
├─ Test coverage: 92% (maintained)
├─ Bugs found in demo: 2 minor (fixed same day)
├─ Bugs found in production: 1 (not catastrophic)
└─ Overall: High quality, fast feedback

Deployment Frequency:
├─ Features to staging: Daily
├─ Features to production: Every Friday (in sprint demo)
├─ Hotfixes: Within 1 hour of discovery
└─ Result: Fast feedback cycle

Team Satisfaction:
├─ Sprint commitment met: 95% (usually complete 95% of committed items)
├─ Team morale: High (predictable, achievable goals)
├─ Burnout: Low (sustainable pace)
└─ Retention: 100% (no one left team)
```

---

## Real Example 2: Project 2 (Waterfall + Agile Hybrid)

### Context
- Highly regulated (GDPR, SOC 2)
- Complex data pipeline with 3 data sources
- Requirements stable (regulatory driven)
- But implementation needs iteration (data quality unknown)

### Hybrid Approach

**Phase 1: Waterfall (Requirements & Design)**

```
REQUIREMENTS PHASE (2 weeks)
├─ Document all regulatory requirements (GDPR, SOC 2)
├─ Design data schema (immutable, audit trail)
├─ Define quality standards (80%+ pass rate)
└─ Get stakeholder sign-off (legal, compliance, operations)

DESIGN PHASE (1 week)
├─ Architecture: Medallion (Bronze/Silver/Gold)
├─ Technology: Spark, PostgreSQL, S3
├─ Security model: Encryption, access control
├─ Deployment: Docker, Kubernetes
└─ Design review: Approved by architecture team
```

**Phase 2: Agile (Implementation)**

```
SPRINT 1: Bronze layer (raw data ingestion)
├─ Load CSV files (Companies House)
├─ Load API data (business metrics)
├─ Load manual entries (web form)
└─ Result: 50K records loaded, raw storage working

SPRINT 2: Silver layer (cleaning)
├─ Validation pipeline (name, email, phone)
├─ Exact match deduplication
├─ Fuzzy match detection
└─ Result: 40K records cleaned, 85% pass rate

SPRINT 3: Enrichment
├─ Geocoding (address → lat/long)
├─ Industry classification
├─ Risk scoring
└─ Result: All records enriched, ready for business

SPRINT 4: Gold layer (business views)
├─ Finance views (revenue by region)
├─ Analytics views (customer segments)
├─ Compliance views (audit reports)
└─ Result: BI tools connected, dashboards live

SPRINT 5: Performance & Monitoring
├─ Optimization for 1M records
├─ Monitoring and alerts
├─ Runbook for operations
└─ Result: SLA met (<4 hours for 1M records)
```

**Why Hybrid?**

```
Waterfall benefits used:
├─ Requirements stable (regulatory driven)
├─ Design comprehensive (affects whole pipeline)
├─ Architecture clear before coding
└─ Reduces mid-project surprises

Agile benefits used:
├─ Implementation is uncertain (data quality unknown)
├─ Need to validate each layer works
├─ Feedback loop: Show layer 1, then design layer 2
├─ Adjust based on actual data quality
└─ Deploy working software every sprint
```

---

## Real Example 3: Project 6 (DevOps Approach)

### Context
- AI Governance platform, critical for compliance
- Need to ship security fixes quickly (<4 hours)
- 1M users, high availability requirement
- Mature team (3+ years Kubernetes experience)

### DevOps: Continuous Deployment Pipeline

```
DEVELOPMENT → TEST → STAGING → PRODUCTION
(Multiple times per day)

DEVELOPER COMMITS CODE (Main branch)
│
├─ Trigger: GitHub Actions workflow
├─ 1. Unit tests run (2 min)
├─ 2. Build Docker image (3 min)
├─ 3. Push to registry (1 min)
│
├─ 2. Integration tests (5 min)
├─ 3. Security scan (2 min, detect vulnerabilities)
├─ 4. Image scan (1 min, check dependencies)
│
├─ 5. Deploy to staging (2 min)
├─ 6. Smoke tests (1 min)
├─ 7. Performance tests (3 min)
│
├─ 8. Manual QA approval (if PR, automated if main)
│
├─ 9. Deploy to production (blue-green, 2 min)
│    ├─ Blue: Running version (0% traffic)
│    └─ Green: New version (100% traffic)
├─ 10. Health checks (1 min)
├─ 11. Monitor metrics (5 min)
│
└─ RESULT: Code in production within 20 minutes

CONTINUOUS MONITORING:
├─ Error rate > 0.1% → Alert oncall
├─ Latency > 500ms → Investigation
├─ Memory > 80% → Scale up
└─ Rollback if anything wrong
```

**Pipeline Code (GitHub Actions):**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      # Unit tests
      - name: Run unit tests
        run: pytest tests/ -v --cov=app --cov-report=xml
      
      # Build
      - name: Build Docker image
        run: docker build -t app:${{ github.sha }} .
      
      # Push to registry
      - name: Push image
        run: docker push registry.example.com/app:${{ github.sha }}
      
      # Deploy to staging
      - name: Deploy to staging
        run: |
          kubectl set image deployment/app-staging \
            app=registry.example.com/app:${{ github.sha }}
      
      # Smoke tests (staging)
      - name: Smoke tests
        run: ./scripts/smoke-tests.sh staging
      
      # Deploy to production (blue-green)
      - name: Deploy to production
        run: |
          # Deploy to green
          kubectl set image deployment/app-green \
            app=registry.example.com/app:${{ github.sha }}
          
          # Wait for healthy
          kubectl rollout status deployment/app-green
          
          # Switch traffic (blue → green)
          kubectl patch service app -p \
            '{"spec":{"selector":{"version":"green"}}}'
      
      # Monitor
      - name: Monitor health
        run: ./scripts/monitor-health.sh
        timeout-minutes: 5
      
      # Rollback if needed
      - name: Rollback (if failed)
        if: failure()
        run: kubectl patch service app -p \
          '{"spec":{"selector":{"version":"blue"}}}'
```

**Results:**

```
Deployment Metrics:
├─ Deployment frequency: 10x/day (10 deployments)
├─ Lead time for changes: 20 minutes (code to production)
├─ Mean time to recovery: <5 minutes (if needed)
├─ Change failure rate: 2% (98% successful deployments)

Reliability:
├─ Uptime: 99.95% (target met)
├─ Critical bugs: Fixed within 1 hour
├─ Security patches: Applied within 4 hours
├─ Zero unplanned outages in 6 months

Team Efficiency:
├─ Manual deployments: 0 (fully automated)
├─ Deployment checklists: Not needed (automated)
├─ Post-deployment testing: Automated
└─ Oncall burden: Reduced (automated rollback)
```

---

## SDLC Best Practices

```
METHODOLOGY SELECTION:

Waterfall if:
├─ Requirements are stable/fixed
├─ Regulatory compliance critical
├─ Limited stakeholder availability
└─ Long project lifecycle (1+ years)

Agile if:
├─ Requirements evolving
├─ Fast feedback important
├─ Small collocated team
└─ Short iteration cycles (2-4 weeks)

DevOps if:
├─ Mature, experienced team
├─ High deployment frequency needed
├─ Infrastructure as code in place
└─ Comprehensive monitoring available

Hybrid if:
├─ Some parts stable, some uncertain
├─ Large project with dependencies
└─ Balance needed between planning and flexibility
```

---

## Release Management

**Release Cycle (Production Deployment):**

```
PLANNING (Week 1)
├─ Decide features for release
├─ Set release date (usually Friday afternoon)
├─ Create release branch
└─ Notify stakeholders

DEVELOPMENT (Weeks 1-2)
├─ Code reviewed and tested
├─ Merged to main branch
├─ Auto-deployed to staging daily
└─ QA testing in staging

RELEASE CANDIDATE (Day before)
├─ Create release-x.y.z branch
├─ Final QA testing
├─ Smoke tests all scenarios
├─ Documentation updated
└─ Deployment runbook prepared

DEPLOYMENT DAY (Friday 2pm)
├─ Backup database (just in case)
├─ Deploy to production (blue-green)
├─ Monitor for 1 hour (error rates, latency)
├─ Notify users (if needed)
└─ Close related tickets

POST-DEPLOYMENT (Week 1)
├─ Monitor metrics (all good?)
├─ Gather user feedback
├─ Document lessons learned
└─ Plan hotfixes (if needed)

HOTFIX (If critical bug found)
├─ Create hotfix branch
├─ Fix in <30 minutes
├─ Deploy immediately (emergency process)
├─ Merge back to main
└─ Close incident
```

---

## Sprint Artifacts

**Product Backlog:**
```
1. [P0] Campaign creation (8 points) - Customer blocking on this
2. [P0] Email personalization (5 points) - Marketing team needs
3. [P1] A/B testing (13 points) - Nice to have, post-MVP
4. [P1] Analytics dashboard (8 points) - Next sprint
5. [P2] Mobile app support (21 points) - Future
6. [P2] International languages (13 points) - Q4 2024
```

**Sprint Backlog (Committed):**
```
Sprint 1:
- [ ] Campaign creation backend (US-1, 8pt)
- [ ] Campaign scheduling (US-2, 5pt)
- [ ] Email personalization (US-3, 5pt)
Total committed: 18 points
```

**Burndown Chart:**
```
Points Remaining
20 │     ●
   │   ●  
15 │  ●
   │ ●
10 │ ●
   │  ●
5  │    ●
   │     ●
0  │      ──
   └─────────────────
   Mon Tue Wed Thu Fri
   
Trend:
├─ Ideal line: Straight diagonal (0 → 18)
├─ Actual: Slightly above (normal)
└─ Friday: 0 points remaining (sprint goal achieved)
```

---

## Competitive Advantage from K6 Competency

| Aspect | Good SDLC | Poor SDLC |
|--------|-----------|----------|
| **Delivery** | Predictable (on time) | Unpredictable (often late) |
| **Quality** | High (caught early) | Low (found in production) |
| **Team velocity** | Fast (sustainable pace) | Slow (reactive firefighting) |
| **Stakeholder satisfaction** | High (clear process) | Low (surprises) |
| **Scalability** | Processes scale with team | Chaos scales with team |
| **Knowledge transfer** | Documented (new hires onboard fast) | Tribal (depends on individuals) |

**Measurable Impact:**
- **On-time delivery:** 95% vs. 60% (58% improvement)
- **Quality:** 2 bugs/sprint vs. 8 bugs/sprint (75% fewer)
- **Team velocity:** Increases with confidence (26 → 31 points)
- **Deployment frequency:** 1x/day → 10x/day (10x faster)
- **Time to fix bugs:** 1 day vs. 1 week (7x faster)
- **Technical debt:** Manageable vs. overwhelming

**Key Learning:** Process enables people
- Clear SDLC reduces coordination overhead
- Predictable process enables accurate planning
- Automation (CI/CD) reduces manual errors
- Feedback loops drive continuous improvement
- Team ownership increases with clear process
