# K16: Interprets and Implements Design with Requirements

**Competency Definition:** Translate business requirements into system design. Map requirements to architecture components. Verify design completeness. Create design documentation. Validate design against requirements. Handle requirement changes and design tradeoffs.

---

## Requirements-to-Design Bridge

```
REQUIREMENTS TRACEABILITY MATRIX (RTM):

Purpose: Verify every requirement has a design component, and every design 
component traces back to a requirement.

Example (Campaign Service):

FUNCTIONAL REQUIREMENTS:
├─ FR1: User can create campaign
│  ├─ Design component: CampaignService.create_campaign()
│  ├─ Database: campaigns table
│  ├─ API: POST /campaigns
│  └─ Test: test_create_campaign_validation()

├─ FR2: System validates recipient list before sending
│  ├─ Design component: RecipientValidator class
│  ├─ Validation: validate_recipients() function
│  ├─ Database: validate recipient_count >= 1
│  └─ Test: test_recipient_validation()

├─ FR3: User receives confirmation email after campaign sent
│  ├─ Design component: EmailService.send_confirmation()
│  ├─ Integration: Email provider (Mailgun)
│  └─ Test: test_confirmation_email_sent()

NON-FUNCTIONAL REQUIREMENTS:
├─ NFR1: Campaign creation <5 seconds
│  ├─ Design component: Database indexing on created_by + created_at
│  ├─ Optimization: SQL query optimization, caching
│  ├─ Measurement: Load test with 1M campaigns
│  └─ Test: test_campaign_creation_latency()

├─ NFR2: System scales to 1M concurrent users
│  ├─ Design component: Load balancer, auto-scaling group
│  ├─ Infrastructure: AWS ELB + ASG
│  ├─ Monitoring: CloudWatch alarms on CPU/memory
│  └─ Test: Chaos engineering (Netflix Gremlin)

├─ NFR3: Data encrypted at rest
│  ├─ Design component: AWS KMS for encryption keys
│  ├─ Database: RDS with encryption enabled
│  ├─ Secrets: Sensitive data in AWS Secrets Manager
│  └─ Audit: Encryption audit trail

TRACEABILITY CHECK:
✅ Every requirement has design component
✅ Every design component traces to requirement
✅ No requirements left unimplemented
✅ No design components without business justification

If FR7 appears in design but not in requirements:
└─ Question: Why did we build this? Remove or add requirement.
```

---

## Real Example 1: Project 5 (Campaign Service Design)

### Requirements Analysis

```
CAMPAIGN SERVICE - REQUIREMENTS DOCUMENT

PROJECT: Campaign Management System
VERSION: 1.0
DATE: 2024-09-01
STAKEHOLDERS: Marketing team (client), Finance team (budget approval)

BUSINESS CONTEXT:
Marketing team sends 50+ campaigns/month to 100K+ recipients each.
Currently manual process (Excel + email) takes 1-2 days per campaign.
Goal: Automate to <1 hour per campaign (save 40 hours/month).

FUNCTIONAL REQUIREMENTS (WHAT):

FR1: Create Campaign
├─ User selects template
├─ User specifies recipients (filter by status, region, segment)
├─ User schedules send time (immediate or future)
├─ System validates recipients (>0 required, <1M max)
└─ Acceptance criteria: Campaign created in <5 seconds

FR2: Send Campaign
├─ At scheduled time, send to all recipients
├─ Track delivery status (sent, delivered, failed)
├─ Retry failed sends (up to 3 times)
└─ Acceptance criteria: 99% of valid emails delivered

FR3: View Analytics
├─ Marketing team sees: recipients, sent, delivered, opened, clicked
├─ Drill down by recipient (who opened, when clicked)
├─ Export data (CSV for Finance)
└─ Acceptance criteria: Dashboard loads <2 seconds, data accurate

FR4: Unsubscribe
├─ Recipients can unsubscribe from email
├─ System prevents future sends to unsubscribed users
├─ GDPR compliance: Honor unsubscribe immediately
└─ Acceptance criteria: Unsubscribe processed within 1 minute

NON-FUNCTIONAL REQUIREMENTS (HOW):

NFR1: Performance
├─ Campaign creation <5 seconds (currently 60-120 seconds)
├─ Campaign send initiated <10 seconds after scheduled time
├─ Dashboard loads <2 seconds
└─ Measurement: Load testing (1000 concurrent users)

NFR2: Reliability
├─ 99.9% uptime (acceptable downtime: 43 minutes/month)
├─ Automatic failover if server goes down
├─ Email delivery retry (up to 3 attempts over 24 hours)
└─ Measurement: Synthetic monitoring (ping every 5 minutes)

NFR3: Scalability
├─ Support 100K recipients per campaign
├─ Support 50 concurrent campaigns (from different teams)
├─ Auto-scale infrastructure based on load
└─ Measurement: Chaos engineering (Netflix Gremlin)

NFR4: Security
├─ Data encrypted in transit (HTTPS/TLS)
├─ Data encrypted at rest (AES-256)
├─ Rate limiting on API (100 requests/minute per user)
├─ OWASP Top 10 compliance
└─ Measurement: Security audit, penetration testing

NFR5: Compliance
├─ GDPR compliance (consent, right to erasure, data minimization)
├─ SOC 2 Type II compliance
├─ Audit logs for all data access
├─ Data retention (delete campaign data after 90 days)
└─ Measurement: Annual SOC 2 audit

CONSTRAINTS:

Budget: £500K total, £15K/month operations
Timeline: 6 months to MVP (2 weeks per sprint)
Team: 2 engineers, 1 product manager, 1 QA
Technology: Python (backend), React (frontend), PostgreSQL (database)
Platform: AWS (comply with Finance approval)
```

### Design Implementation

```python
# DESIGN: Campaign Service Architecture

# 1. API Design (translates FR1-4)
class CampaignAPI:
    """Implements functional requirements in REST endpoints"""
    
    @app.post("/campaigns")  # FR1: Create Campaign
    async def create_campaign(request: CreateCampaignRequest):
        """Create campaign (requirement: <5 seconds)"""
        start = time.time()
        
        # Validate recipients (FR1 acceptance criteria)
        recipients = get_recipients(request.filters)
        assert len(recipients) > 0, "Must have at least 1 recipient"
        assert len(recipients) < 1_000_000, "Max 1M recipients"
        
        # Create campaign
        campaign = Campaign(
            name=request.name,
            template_id=request.template_id,
            recipient_count=len(recipients),
            status="draft",
        )
        db.add(campaign)
        db.commit()
        
        duration = time.time() - start
        assert duration < 5, f"Creation took {duration}s (target <5s)"
        
        return {"campaign_id": campaign.id, "duration": duration}
    
    @app.post("/campaigns/{campaign_id}/send")  # FR2: Send Campaign
    async def send_campaign(campaign_id: str):
        """Send campaign to all recipients"""
        campaign = db.query(Campaign).filter_by(id=campaign_id).first()
        
        # Queue send jobs (asynchronous)
        for recipient in campaign.recipients:
            queue_send_job(campaign_id, recipient.email)
        
        campaign.status = "sending"
        db.commit()
        
        return {"status": "sending"}
    
    @app.get("/campaigns/{campaign_id}/analytics")  # FR3: View Analytics
    async def get_analytics(campaign_id: str):
        """Get campaign analytics (requirement: <2 seconds)"""
        start = time.time()
        
        campaign = db.query(Campaign).filter_by(id=campaign_id).first()
        
        # Query analytics (optimized with indexes)
        stats = {
            "recipients": campaign.recipient_count,
            "sent": count_by_status(campaign_id, "sent"),
            "delivered": count_by_status(campaign_id, "delivered"),
            "opened": count_by_event(campaign_id, "opened"),
            "clicked": count_by_event(campaign_id, "clicked"),
        }
        
        duration = time.time() - start
        assert duration < 2, f"Analytics took {duration}s (target <2s)"
        
        return stats
    
    @app.post("/recipients/{recipient_id}/unsubscribe")  # FR4: Unsubscribe
    async def unsubscribe(recipient_id: str):
        """Process unsubscribe immediately (GDPR)"""
        recipient = db.query(Recipient).filter_by(id=recipient_id).first()
        recipient.unsubscribed = True
        recipient.unsubscribed_at = datetime.utcnow()
        
        # Audit log (GDPR compliance)
        audit_log.insert({
            "event": "unsubscribed",
            "recipient_id": recipient_id,
            "timestamp": datetime.utcnow(),
        })
        
        db.commit()
        return {"status": "unsubscribed"}

# 2. Database Design (translates NFR1, NFR5)
class CampaignSchema:
    """Database schema supporting performance and compliance"""
    
    # Main campaign table
    campaigns = {
        "id": "UUID PRIMARY KEY",
        "name": "VARCHAR(255) NOT NULL",
        "template_id": "UUID NOT NULL",
        "status": "ENUM (draft, scheduled, sending, completed)",
        "recipient_count": "INT NOT NULL",
        "created_by": "UUID NOT NULL",
        "created_at": "TIMESTAMP DEFAULT NOW()",
        "scheduled_at": "TIMESTAMP NULL",
        
        # Indexes for performance (NFR1: <5 seconds)
        "INDEX idx_created_by": "campaigns(created_by, created_at)",
        "INDEX idx_status": "campaigns(status)",
    }
    
    # Recipients table
    recipients = {
        "id": "UUID PRIMARY KEY",
        "campaign_id": "UUID NOT NULL REFERENCES campaigns(id)",
        "email": "VARCHAR(255) NOT NULL",
        "status": "ENUM (pending, sent, delivered, failed)",
        "unsubscribed": "BOOLEAN DEFAULT FALSE",
        "unsubscribed_at": "TIMESTAMP NULL",
        "created_at": "TIMESTAMP DEFAULT NOW()",
        
        # Indexes for unsubscribe check (FR4)
        "INDEX idx_email_unsubscribed": "recipients(email, unsubscribed)",
        # Indexes for analytics queries (FR3: <2 seconds)
        "INDEX idx_campaign_status": "recipients(campaign_id, status)",
    }
    
    # Events table (audit log + analytics)
    events = {
        "id": "UUID PRIMARY KEY",
        "campaign_id": "UUID NOT NULL",
        "recipient_id": "UUID NOT NULL",
        "event_type": "ENUM (sent, delivered, opened, clicked)",
        "created_at": "TIMESTAMP DEFAULT NOW()",
        
        "INDEX idx_campaign_event": "events(campaign_id, event_type)",
        # Retention policy (NFR5: delete after 90 days)
        "RETENTION POLICY": "Delete where created_at < NOW() - INTERVAL 90 DAY",
    }

# 3. Performance Design (translates NFR1)
class PerformanceOptimization:
    """Design patterns to meet <5 second requirement"""
    
    # Pattern 1: Database indexing
    # Query: Find campaigns for user created in last 30 days
    # Before: Full table scan (100M rows) = 10 seconds
    # After: Index on (created_by, created_at) = 100ms
    
    # Pattern 2: Query optimization
    # Before: N+1 query problem (1 query + N queries for recipients)
    # After: Single JOIN query
    query_before = """
    SELECT * FROM campaigns WHERE created_by = $1;  -- 1 query
    For each campaign:
        SELECT COUNT(*) FROM recipients WHERE campaign_id = $2;  -- N more
    Total: 1 + N queries
    """
    
    query_after = """
    SELECT c.id, c.name, COUNT(r.id) as recipient_count
    FROM campaigns c
    LEFT JOIN recipients r ON c.id = r.campaign_id
    WHERE c.created_by = $1
    GROUP BY c.id;
    -- 1 query, 100x faster
    """
    
    # Pattern 3: Caching
    @classmethod
    def cache_campaign_analytics(cls, campaign_id: str):
        """Cache expensive analytics queries"""
        from redis import Redis
        
        redis = Redis()
        cache_key = f"analytics:{campaign_id}"
        
        # Check cache first (fast)
        cached = redis.get(cache_key)
        if cached:
            return json.loads(cached)
        
        # Compute from database (slow)
        stats = compute_analytics(campaign_id)
        
        # Store in cache (1 hour TTL)
        redis.setex(cache_key, 3600, json.dumps(stats))
        
        return stats
    
    # Pattern 4: Asynchronous processing
    @classmethod
    async def send_campaign_async(cls, campaign_id: str):
        """Queue send jobs instead of blocking"""
        # Endpoint returns immediately (fast)
        # Background workers process sends (slow, but non-blocking)
        queue.enqueue(send_to_recipients, campaign_id)
        return {"status": "queued"}

# 4. Scalability Design (translates NFR2)
class ScalabilityDesign:
    """Infrastructure supporting 100K recipients, 50 concurrent campaigns"""
    
    # Load balancer (AWS ELB)
    load_balancer = {
        "type": "Application Load Balancer",
        "listeners": ["HTTP:80", "HTTPS:443"],
        "health_check": "GET /health every 30 seconds",
        "sticky_sessions": False,  # Stateless for horizontal scaling
    }
    
    # Auto-scaling group
    auto_scaling = {
        "min_instances": 3,  # Always running
        "max_instances": 10,  # Scale up to 10
        "target_metric": "CPU Utilization",
        "target_value": 70,  # Scale when CPU > 70%
        "scale_up_cooldown": 300,  # Wait 5 min before scaling again
        "scale_down_cooldown": 600,  # Wait 10 min before scaling down
    }
    
    # Results:
    # ├─ 3-10 instances based on load
    # ├─ 1K requests/second per instance = 30K requests/second max
    # ├─ Cost: £50/day normal (3 instances), £100/day peak (10 instances)
    # └─ Supports FR1 requirement: 50 concurrent campaigns

# 5. Security Design (translates NFR4)
class SecurityDesign:
    """Implements OWASP Top 10 compliance"""
    
    # 1. Authentication: JWT tokens
    authentication = {
        "method": "OAuth 2.0 / JWT",
        "token_lifetime": "15 minutes",
        "refresh_token": "7 days",
        "storage": "HttpOnly cookies (prevents XSS)",
    }
    
    # 2. Authorization: Role-based access control
    authorization = {
        "roles": ["viewer", "editor", "admin"],
        "viewer": ["read_own_campaigns"],
        "editor": ["read_own_campaigns", "create_campaigns", "send_campaigns"],
        "admin": ["read_all_campaigns", "manage_users"],
    }
    
    # 3. Input validation: Prevent SQL injection
    input_validation = {
        "campaign_name": "min 3 chars, max 255, no SQL keywords",
        "recipient_count": "max 1,000,000",
        "filters": "whitelist allowed fields (status, region)",
    }
    
    # 4. Encryption in transit: HTTPS/TLS 1.2+
    encryption_transit = {
        "protocol": "HTTPS only",
        "tls_version": "1.2+",
        "certificate": "AWS Certificate Manager",
    }
    
    # 5. Encryption at rest: AES-256
    encryption_rest = {
        "database": "RDS with encryption enabled",
        "secrets": "AWS Secrets Manager",
        "backups": "Encrypted",
    }
    
    # 6. Rate limiting: Prevent brute force
    rate_limiting = {
        "api_calls": "100 per minute per user",
        "login_attempts": "5 per 15 minutes per IP",
        "enforcement": "Return 429 (Too Many Requests)",
    }

# 6. Compliance Design (translates NFR5)
class ComplianceDesign:
    """Implements GDPR and SOC 2 requirements"""
    
    # Data minimization (GDPR)
    data_minimization = {
        "collect": "Only email, name (needed for campaigns)",
        "not_collect": "SSN, payment info, health data",
    }
    
    # Right to erasure (GDPR)
    erasure = {
        "user_requests": "Delete all data within 30 days",
        "automatic": "Delete campaign data after 90 days",
        "implementation": "Transactional delete (all-or-nothing)",
    }
    
    # Audit logs (SOC 2)
    audit = {
        "what": "Who accessed what data when",
        "retention": "7 years (regulatory requirement)",
        "immutable": "Cannot be modified or deleted",
        "review": "Quarterly audits by compliance team",
    }
```

### Requirements-to-Design Verification

```
VERIFICATION CHECKLIST:

Functional Requirements Verification:
☑ FR1: Campaign creation implemented (CampaignAPI.create_campaign)
☑ FR1: Acceptance criteria met (test <5 seconds)
☑ FR2: Campaign send implemented (CampaignAPI.send_campaign)
☑ FR2: Async processing (queue-based, non-blocking)
☑ FR3: Analytics implemented (CampaignAPI.get_analytics)
☑ FR3: Acceptance criteria met (test <2 seconds)
☑ FR4: Unsubscribe implemented (CampaignAPI.unsubscribe)
☑ FR4: GDPR compliant (processed immediately)

Non-Functional Requirements Verification:
☑ NFR1: Performance design (indexes, caching, async)
☑ NFR1: Load testing confirms <5 second target
☑ NFR2: Reliability design (failover, retry logic)
☑ NFR2: Uptime monitoring (99.9% target)
☑ NFR3: Scalability design (load balancer, auto-scaling)
☑ NFR3: Chaos engineering validates scaling
☑ NFR4: Security controls (encryption, rate limiting, OWASP)
☑ NFR4: Penetration testing passes
☑ NFR5: Compliance design (GDPR, SOC 2)
☑ NFR5: Audit logs retained 7 years

Design Completeness:
☑ All requirements have design component
☑ All design components trace to requirement
☑ No orphaned design (not justified by requirement)
☑ No requirement without implementation plan

Sign-off:
├─ Architect: "Design complete and verified" ✅
├─ Product Manager: "Design meets all requirements" ✅
├─ Security: "Design meets OWASP Top 10" ✅
└─ Compliance: "Design meets GDPR/SOC 2" ✅
```

---

## Real Example 2: Project 2 (Data Lake Design)

### Requirements-to-Design Mapping

```
REQUIREMENTS → DESIGN COMPONENTS:

Requirement: Process 125K company records weekly
Design: 
├─ S3 Bronze layer (raw data ingestion)
├─ PySpark jobs for parallel processing
├─ 100 partitions across cluster
└─ Result: 1M records per hour (exceeds requirement)

Requirement: Validate data quality
Design:
├─ Pydantic validation rules
├─ Quality checks at Silver layer
├─ Alert if pass rate <85%
└─ Result: 85%+ pass rate maintained

Requirement: Report on companies at risk of dissolution
Design:
├─ SQL query: WHERE status = 'dissolution_pending'
├─ Materialized view: company_at_risk
├─ Dashboard: Query materialized view (<1 second)
└─ Result: Analysts have real-time insights

Requirement: Support 200+ analysts
Design:
├─ Gold layer (business-ready views)
├─ Analyst access via SQL queries
├─ Row-level security (each analyst sees own team's data)
└─ Result: 200 concurrent users supported
```

---

## Real Example 3: Project 6 (Security Design)

### Threat Model to Design

```
THREAT → DESIGN MITIGATION:

Threat: Brute force attack (attacker tries 1M passwords)
Design:
├─ Rate limiting (5 attempts per 15 minutes)
├─ Account lockout after 5 failures
├─ Multi-factor authentication (MFA)
└─ Result: Brute force infeasible (attacker stops after 5 failures)

Threat: SQL injection (attacker inserts ' OR '1'='1)
Design:
├─ Parameterized queries (data separate from SQL)
├─ Input validation (whitelist allowed characters)
├─ ORM usage (SQLAlchemy prevents injection)
└─ Result: Injection attacks fail

Threat: Session hijacking (attacker steals session cookie)
Design:
├─ HttpOnly flag (cookie not readable by JavaScript)
├─ Secure flag (cookie only over HTTPS)
├─ SameSite flag (cookie not sent to cross-site requests)
├─ Short TTL (15 minutes, session expires)
└─ Result: Stolen cookie worthless after 15 minutes

Threat: Data breach (unauthorized access to PII)
Design:
├─ Role-based access control (only authorized users)
├─ Encryption at rest (data encrypted in database)
├─ Audit logs (detect unauthorized access)
├─ Incident response plan
└─ Result: Breach impact minimized, detected quickly
```

---

## Competitive Advantage from K16 Competency

| Aspect | Strong K16 | Weak K16 |
|--------|-----------|---------|
| **Requirements completeness** | 100% requirements have design | Missing requirements in design |
| **Design quality** | Verified against requirements | Design decisions not justified |
| **Requirement traceability** | RTM maintained, auditable | No traceability (compliance risk) |
| **Design changes** | Impact analysis before changes | Changes break requirements |
| **Scope creep** | Prevented (design scope = requirement scope) | Design bloats beyond requirements |
| **Acceptance testing** | Clear (test against acceptance criteria) | Unclear (test against what?) |
| **Technical debt** | Minimal (design intentional) | High (design follows no plan) |

**Measurable Impact:**
- **Requirements coverage:** 100% vs 60% (missing features)
- **Design review time:** 2 hours (comprehensive) vs 4+ hours (rework)
- **Rework:** 0% design changes needed vs 20% (design didn't match requirements)
- **Testing:** Clear acceptance criteria vs ambiguous (test what exactly?)
- **Compliance:** RTM auditable vs "we built something" (no proof)

**Key Learning:** Design bridges requirements and implementation
- Requirements are WHAT (business needs)
- Design is HOW (technical solution)
- Traceability ensures nothing is lost
- Verification proves design meets requirements
- Changes to requirements = changes to design (impact analysis)
