# K4: Systems & Software Architecture

**Competency Definition:** Design scalable, maintainable systems. Make architectural trade-offs (monolith vs. microservices, SQL vs. NoSQL). Document architecture decisions. Evaluate technologies. Design for reliability, security, and performance. Communicate architecture to teams.

---

## Architecture Decision Framework

```
ARCHITECTURAL LAYERS

1. BUSINESS LAYER (What users care about)
   └─ Business capability, user needs, ROI

2. APPLICATION LAYER (What system does)
   ├─ API endpoints, workflows, business logic
   ├─ Services, controllers, domain models
   └─ Design patterns (MVC, layered, etc.)

3. DATA LAYER (How data persists)
   ├─ Database choice (SQL, NoSQL, cache)
   ├─ Schema design, data relationships
   ├─ Indexing, replication, backup
   └─ Query optimization

4. INFRASTRUCTURE LAYER (Where it runs)
   ├─ Compute (servers, containers, serverless)
   ├─ Networking (VPC, load balancing, DNS)
   ├─ Storage (object, block, managed)
   └─ Deployment (CI/CD, blue-green, canary)

5. CROSS-CUTTING CONCERNS (Non-functional)
   ├─ Security (auth, encryption, secrets)
   ├─ Observability (logging, metrics, traces)
   ├─ Performance (caching, CDN, optimization)
   └─ Reliability (redundancy, failover, SLA)
```

---

## Real Example 1: Project 6 (AI Governance Platform)

### Architecture Decision: Microservices vs. Monolith

**Context:**
- 5M+ users worldwide
- 3 teams (auth, governance, analytics)
- Expected to grow 100%/year
- Regulatory compliance (GDPR, SOC 2)

**Decision: Microservices (3 independent services)**

```
MONOLITH TRADE-OFFS (Rejected):
├─ Benefit: Simple to deploy initially
├─ Cost: One team can't deploy without blocking others
├─ Complexity: Auth + governance + analytics tightly coupled
├─ Scaling: Must scale entire application (all 3 teams)
├─ Risk: One bug takes down entire platform
└─ Result: High coupling, slow delivery, risky

MICROSERVICES TRADE-OFFS (Chosen):
├─ Benefit: Independent deployment (3 teams ship independently)
├─ Benefit: Team autonomy (own database, own deployment)
├─ Benefit: Technology choice (auth team chose Node, governance chose Python)
├─ Cost: Operational complexity (3 services to manage)
├─ Cost: Data consistency (distributed data, eventual consistency)
├─ Complexity: Inter-service communication (API contracts, versioning)
└─ Result: Loose coupling, fast delivery, safer

DECISION MATRIX:
                  | Monolith | Microservices |
Organization      | 1 team   | 3 teams       |
Deployment        | 1x/day   | 10x/day       |
Scaling           | Vertical | Horizontal    |
Tech choice       | Fixed    | Flexible      |
Operational load  | Low      | High          |
Risk (single bug) | High     | Low           |
Development speed | Slow     | Fast          |
```

**Architecture Diagram:**

```
LOAD BALANCER
    ↓
┌─────────────────────────────────────────┐
│         API GATEWAY (Kong)              │
│  Rate limiting, auth validation, routing│
└──────────────────────────────────────────┘
    ↓        ↓        ↓
    ↓        ↓        ↓
┌──────────┐ ┌──────────┐ ┌─────────────┐
│ Auth     │ │Governance│ │ Analytics   │
│Service   │ │Service   │ │ Service     │
│(Node.js) │ │(Python)  │ │(Python)     │
│Port 3001 │ │Port 3002 │ │Port 3003    │
└──────────┘ └──────────┘ └─────────────┘
    ↓            ↓            ↓
┌──────────┐ ┌──────────┐ ┌─────────────┐
│PostgreSQL│ │PostgreSQL│ │ TimescaleDB │
│(Users)   │ │(Policies)│ │(Events)     │
└──────────┘ └──────────┘ └─────────────┘
    ↓            ↓            ↓
    └────────────┴────────────┘
      Message Queue (RabbitMQ)
      (async pub/sub, event streaming)
```

**Implementation:**

```python
# Auth Service: Manages JWT tokens, user sessions
@app.post("/auth/login")
def login(email: str, password: str):
    user = verify_password(email, password)
    token = create_jwt_token(user.id)
    publish_event("user.login", user.id)  # Async notification
    return {"token": token}

# Governance Service: Policy evaluation, compliance checks
@app.post("/policies/evaluate")
def evaluate_policy(user_id: str, action: str):
    policy = fetch_policy(user_id)
    result = policy.evaluate(action)
    publish_event("policy.evaluated", result)  # Async notification
    return result

# Analytics Service: Event processing, metrics aggregation
@app.get("/analytics/dashboard")
def get_dashboard(user_id: str):
    # Consumes events from message queue
    events = get_user_events(user_id, last_30_days)
    return compute_metrics(events)
```

**Operational Considerations:**

```
DEPLOYMENT:
├─ Each service has own Git repo, CI/CD pipeline
├─ Can deploy independently (no coordination)
├─ Versioning: API version in URL (/v1/policies/)
├─ Backwards compatibility: Support 2 API versions simultaneously
└─ Monitoring: Each service sends metrics to Prometheus

SERVICE COMMUNICATION:
├─ Synchronous: REST API calls (auth-check before other services)
├─ Asynchronous: Message queue (publish events, other services consume)
├─ Database: Each service owns its database (no direct DB access)
├─ Caching: Redis for distributed cache (user sessions)
└─ Load balancing: Kong routes requests to healthy instances

RELIABILITY:
├─ Circuit breaker: If governance service down, auth continues
├─ Retry logic: Exponential backoff for failed calls
├─ Timeout: 5s timeout to prevent cascading failures
├─ Dead letter queue: Failed events preserved for replay
└─ Monitoring: Alert if service latency > 500ms
```

**Results:**
- **Deployment:** 1x/day → 10x/day (10x faster iteration)
- **Team autonomy:** Auth team ships without blocking governance
- **Scaling:** Can scale governance service independently (it's most loaded)
- **Resilience:** One service down doesn't take down entire platform
- **Technology choice:** Auth team chose Node (optimal for I/O), governance chose Python (better for ML)

---

## Real Example 2: Project 2 (Data Platform)

### Architecture Decision: S3 Medallion Architecture

**Context:**
- 500K+ company records from multiple sources
- Data quality issues (30% have errors)
- Multiple teams need data (analytics, BI, finance)
- Cost constraints (minimize storage, compute)

**Decision: S3 Medallion (Bronze/Silver/Gold layers)**

```
MEDALLION ARCHITECTURE:

┌─ BRONZE LAYER (Raw Data) ─────────────────────────────┐
│ ├─ CSV files (Companies House dump)                    │
│ ├─ API responses (business metrics)                    │
│ ├─ Manual entries (web form submissions)               │
│ └─ Characteristics:                                    │
│    • Raw, unprocessed (errors, duplication)            │
│    • Full history (no deletion)                        │
│    • Cheap storage (S3 standard)                       │
│    • Used for audit trail                              │
└────────────────────────────────────────────────────────┘
                         ↓
        AWS Glue ETL (Data Validation)
                         ↓
┌─ SILVER LAYER (Cleaned Data) ─────────────────────────┐
│ ├─ Validated records (80%+ pass)                       │
│ ├─ Deduplicated (exact + fuzzy match)                  │
│ ├─ Standardized (format, encoding, units)             │
│ ├─ Enriched (geocoding, classification)               │
│ └─ Characteristics:                                    │
│    • Clean, consistent (ready for analysis)            │
│    • No duplicates                                     │
│    • Standard format (Parquet)                         │
│    • Can be deleted safely                             │
└────────────────────────────────────────────────────────┘
                         ↓
    Athena SQL Queries, BI Tools
                         ↓
┌─ GOLD LAYER (Business Views) ─────────────────────────┐
│ ├─ Finance: Revenue by region, industry               │
│ ├─ Analytics: Growth trends, customer segmentation    │
│ ├─ Compliance: Audit reports, data lineage            │
│ └─ Characteristics:                                    │
│    • Business-ready (semantics defined)                │
│    • Aggregated (pre-computed metrics)                 │
│    • Optimized for BI (star schema)                    │
│    • Can have governance (row-level security)          │
└────────────────────────────────────────────────────────┘
```

**Trade-offs:**

```
ALTERNATIVE 1: Single-layer (Raw → BI)
├─ Pro: Simple initially
├─ Con: Every query must validate/deduplicate
├─ Con: Analysts deal with quality issues
├─ Con: Slow queries (data not optimized)
└─ Result: Scaling, performance issues

ALTERNATIVE 2: Medallion Architecture (Chosen)
├─ Pro: Clear separation of concerns
├─ Pro: Quality issues handled once (in Glue)
├─ Pro: Analysts work with clean data
├─ Pro: Queries fast (data optimized)
├─ Con: Extra storage (3 layers)
├─ Con: Operational complexity (3 pipelines)
└─ Result: Scalable, performant, maintainable
```

**Implementation:**

```python
# Bronze: Raw data (as-is from sources)
s3://company-data/bronze/2024-11-09/
├─ companies_house_raw.csv (50K records, 30% with issues)
├─ business_metrics_api.json (20K records)
└─ manual_entries_20241109.xlsx (500 records)

# Silver: Cleaned data (Glue ETL output)
s3://company-data/silver/2024-11-09/
├─ companies_cleaned.parquet (40K records, validated)
├─ metrics_enriched.parquet (20K records, geocoded)
└─ metadata/schema.json

# Gold: Business views (Athena materialized views)
s3://company-data/gold/2024-11-09/
├─ companies_by_industry.parquet (aggregated)
├─ revenue_by_region.parquet (finance view)
└─ customer_segments.parquet (analytics view)

# Glue ETL Pipeline (PySpark)
def validate_bronze():
    """Load bronze, validate, deduplicate, output silver"""
    df = spark.read.csv("s3://company-data/bronze/**/*.csv")
    
    # Validation
    df = df.filter(col("company_name").isNotNull())
    df = df.filter(col("registration_number").rlike("^[A-Z0-9]{8}$"))
    
    # Deduplication
    df = df.dropDuplicates(["registration_number"])
    df = find_fuzzy_duplicates(df)
    
    # Enrichment
    df = geocode_addresses(df)
    df = classify_industry(df)
    
    df.write.parquet("s3://company-data/silver/")

# Athena queries on gold layer
SELECT 
    industry,
    COUNT(*) as company_count,
    AVG(revenue) as avg_revenue
FROM s3://company-data/gold/companies_by_industry
GROUP BY industry
```

**Results:**
- **Performance:** Query latency 10s → 1s (10x improvement)
- **Data quality:** 70% → 85% valid records
- **Storage cost:** £500/month (deduplicated silver layer)
- **Maintenance:** Clear separation (each layer has one job)
- **Scalability:** Handles 1M records with <4 hour SLA

---

## Real Example 3: Project 1 (E-Commerce Platform)

### Architecture Decision: Cache Strategy

**Context:**
- 1M daily active users
- Product catalog: 500K items (50KB each = 25GB)
- Browse frequency: 100M queries/day (typical: "show me Nike running shoes")
- Database: PostgreSQL (powerful but expensive at scale)

**Decision: Multi-tier caching strategy**

```
CACHE STRATEGY (Layers 1-3):

Layer 1: Client Browser Cache (1 hour)
└─ Product details, images → Browser cache
   (Reduces server load 30%)

         ↓ (Cache miss)

Layer 2: CDN Cache (CloudFront, 24 hours)
└─ Static content (images, JSON) → CDN edge locations
   (Reduces database requests 60%)
   (Serves from nearest edge → faster)

         ↓ (Cache miss)

Layer 3: Application Cache (Redis, 4 hours)
├─ Popular products (top 1000) in memory
├─ Search results (queries), user sessions
└─ Computed values (popular items, recommendations)
   (Reduces database queries 80%)

         ↓ (Cache miss)

Layer 4: Database (Source of truth)
└─ PostgreSQL (100 TPS max, expensive beyond that)
   (Only hit for new products, inventory updates)

CACHE HIT RATES:
├─ Layer 1 (Browser): 40% of requests
├─ Layer 2 (CDN): 45% of requests (out of 60% misses)
├─ Layer 3 (Redis): 12% of requests (out of 15% misses)
└─ Layer 4 (Database): 3% of requests (new/updated)
```

**Implementation:**

```python
@app.get("/products/{product_id}")
def get_product(product_id: str):
    # Layer 3: Check Redis
    cached = redis_client.get(f"product:{product_id}")
    if cached:
        return json.loads(cached)  # Cache hit
    
    # Cache miss: Query database
    product = db.query(Product).filter_by(id=product_id).first()
    
    # Cache for 4 hours
    redis_client.setex(
        f"product:{product_id}",
        ttl=4*3600,
        value=json.dumps(product)
    )
    
    # Add cache headers for Layer 2 (CDN)
    response = JSONResponse(product)
    response.headers["Cache-Control"] = "public, max-age=86400"  # 24 hours
    return response
```

**Cache Invalidation Strategy:**

```python
# When product updated, invalidate cache
@app.put("/products/{product_id}")
def update_product(product_id: str, data: dict):
    db.update(Product, id=product_id, **data)
    
    # Invalidate cache layers
    redis_client.delete(f"product:{product_id}")  # Layer 3
    cloudfront.create_invalidation(f"/product/{product_id}")  # Layer 2
    
    return {"status": "updated"}

# Periodic cleanup
@scheduler.scheduled_job('cron', minute=0)
def cleanup_stale_cache():
    """Remove products not accessed in 7 days"""
    for key in redis_client.scan_iter("product:*"):
        if not accessed_recently(key):
            redis_client.delete(key)
```

**Results:**
- **Database load:** 100M queries → 3M queries (97% reduction)
- **Response time:** 500ms → 50ms (10x improvement)
- **Cost:** Database could handle 1M users vs. 500K before
- **Scalability:** Can grow to 2M users without database upgrade

---

## Architecture Decision Record (ADR)

**Template for documenting decisions:**

```
ADR-001: Microservices Architecture for Platform Scaling

STATUS: Accepted

CONTEXT:
- Platform growing 100%/year (5M → 10M users)
- 3 teams (auth, governance, analytics) need independence
- Current monolith: One team deployment blocks others

DECISION:
Adopt microservices with 3 independent services (auth, governance, analytics)
Each with own database, deployment pipeline, technology stack.

RATIONALE:
- Deployment speed: 1x/day → 10x/day (10x improvement)
- Team autonomy: No blocking on other teams
- Scaling: Scale individual services independently
- Resilience: One service down doesn't affect others
- Tech choice: Each team picks best tool for their service

CONSEQUENCES:
- Operational complexity: 3 services to monitor/deploy
- Data consistency: Eventual consistency, not ACID
- Network latency: Service calls slower than in-process
- Debugging: Distributed tracing required

ALTERNATIVES CONSIDERED:
- Monolith (rejected: slow deployment, single point of failure)
- Serverless (rejected: cold starts, no persistent connections)
- Modular monolith (rejected: still single deployment)

RELATED DECISIONS:
- ADR-002: Message queue for async communication
- ADR-003: API gateway for routing and auth

REVISION HISTORY:
- 2024-01-15: Initial decision (accepted)
```

---

## Architecture Patterns

| Pattern | Use Case | Pros | Cons |
|---------|----------|------|------|
| **Monolith** | MVP, single team | Simple deploy, fast | Slow growth, one failure |
| **Microservices** | Multi-team, growth | Team autonomy, scale | Operational complexity |
| **Serverless** | Variable load, low cost | No ops, cost efficient | Cold starts, latency |
| **Event-driven** | Real-time, reactive | Loose coupling, scale | Debugging, eventual consistency |
| **Layered** | Clear separation | Simple, maintainable | May not scale |
| **CQRS** | Complex queries | Read/write separation, scale | Eventual consistency |

---

## Competitive Advantage from K4 Competency

| Aspect | Good Architecture | Bad Architecture |
|--------|-------------------|-------------------|
| **Scalability** | Horizontal (add servers) | Vertical (bigger server) |
| **Deployment** | Fast, independent | Slow, coupled |
| **Reliability** | One failure isolated | One failure cascades |
| **Team velocity** | Teams move fast | Teams block each other |
| **Cost** | Pay for what you use | Pay for peak capacity |
| **Maintenance** | Clear boundaries | Spaghetti code |

**Measurable Impact:**
- **Deployment speed:** 1x/day → 10x/day (10x improvement)
- **Scalability:** Support 10x more users (same infrastructure)
- **Reliability:** 99.95% uptime vs. 95% (40x better)
- **Team velocity:** 3 teams ship independently (vs. serial)
- **Cost efficiency:** 30% cost savings through caching, smart scaling
- **Time to market:** New features 50% faster with clear architecture

**Key Learning:** Architecture shapes team velocity
- Good architecture enables teams to move fast
- Bad architecture creates bottlenecks and technical debt
- Architectural decisions made early are hard to change later
- Trade-offs (complexity vs. simplicity, consistency vs. availability) must be explicit
