# S20 New Evidence - Technical Problem Solving Detail

## The Gap: Show Your Investigative Process

Examiners want: "Here's the symptom. Here are the hypotheses I considered. Here's the evidence that ruled out theories A and B. Here's the root cause. Here's my proof it's fixed."

---

## Problem Case: API Response Time Degradation

### Initial Symptom (Tuesday 2 PM)

Users reported: "API requests taking 5–8 seconds. Used to be <500ms."

Severity: High. 12% of requests timing out (>5 seconds).

---

### Initial Hypotheses (Brainstorm)

| Hypothesis | Likelihood | Why |
|---|---|---|
| Database query slow | High | Response time degradation points to data layer |
| Memory leak in API | High | Gradual performance deterioration pattern |
| Network congestion | Medium | Could cause latency, but unlikely gradual |
| Increased traffic | Medium | Might overwhelm resources |
| Third-party API dependency | Low | Unlikely—would fail, not slowdown |

---

### Investigation Process

#### Step 1: Check Logs & Errors

**Action:** Tail application logs around 2 PM degradation start.

```
[14:02:15] Request ID 782: /api/users/search duration=650ms
[14:02:18] Request ID 783: /api/users/search duration=2100ms ⚠️
[14:02:21] Request ID 784: /api/users/search duration=4800ms ⚠️⚠️
[14:02:24] ERROR: Connection pool exhausted. Waiting for available connection.
[14:02:25] ERROR: Connection pool exhausted. Waiting for available connection.
```

**Finding:** ✓ Performance drop correlates with "Connection pool exhausted" errors.

**Hypothesis Update:** Database connection pool is bottleneck.

---

#### Step 2: Database Monitoring

**Action:** Check database connection metrics.

**Database Connection Pool Status (at 2:05 PM):**
- Pool size: 20 connections
- Active connections: 20 (100% utilization)
- Waiting queries: 8 (queue building)
- Connections held per query: 4.2 seconds average

**Query Performance:**
```
Query: SELECT * FROM orders WHERE user_id = ?
Rows returned: 2,400 (⚠️ up from 600 yesterday)
Duration: 3.2 seconds
Wait in pool: 2.1 seconds
```

**Finding:** ✓ Connections held too long. Queries returning 4× data yesterday.

**New Hypothesis:** Query is returning too much data OR executing inefficiently.

---

#### Step 3: Rule Out Network/Traffic

**Action:** Check request volume and network metrics.

```
Request Volume:
- Yesterday 2 PM: 1,200 req/min
- Today 2 PM: 1,210 req/min
  → No significant traffic increase

Network Latency:
- API to DB: 2ms (normal)
- DB CPU: 45% (normal)
- Memory: 62% used (normal)

→ Network not bottleneck. Database query issue confirmed.
```

**Finding:** ✓ Traffic steady. Network healthy. Problem is query efficiency.

---

#### Step 4: Examine Query Execution Plan

**Action:** Run EXPLAIN on the slow query.

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = ?

Results:
- Type: ALL (full table scan ⚠️⚠️)
- Rows examined: 4.2M
- Rows returned: 2,400
- Key: NULL (no index used ⚠️)
```

**Finding:** ✓ Full table scan examining 4.2M rows to find 2,400. Inefficient.

**Root Cause Identified:** Missing index on `user_id` column.

---

#### Step 5: Verify This Is New

**Action:** Check when index disappeared.

```
Migration history:
- 2025-01-10: Index added: CREATE INDEX idx_orders_user_id
- 2025-01-15: Migration #47 ran (should have added index)
- 2025-01-16: Index missing (⚠️ migration failed silently)
```

**Finding:** ✓ Migration #47 had rollback, left index dropped.

**Root Cause Confirmed:** Index deleted by failed migration, not restored.

---

#### Step 6: Test Alternative Theories (Now Ruled Out)

| Theory | Test | Result | Status |
|---|---|---|---|
| Memory leak | Heap dump, GC logs | No memory leak detected | ✗ Ruled out |
| Increased traffic | Request rate trending | Rate stable at 1,200/min | ✗ Ruled out |
| Network | Latency & CPU metrics | All normal (2ms, 45% CPU) | ✗ Ruled out |
| Third-party dependency | Response time from external API | <100ms (not bottleneck) | ✗ Ruled out |
| **Query inefficiency** | EXPLAIN + index check | Full table scan, missing index | ✓ **Confirmed root cause** |

---

### Solution Implementation

**Action:** Restore index.

```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

**Deployment:** 2:42 PM (40 minutes after problem reported)

---

### Validation & Monitoring

#### Immediate Results (2:43 PM)

```
Query duration: 3.2 seconds → 45 milliseconds (98.6% improvement)
Connection pool: 100% utilized → 12% utilized
Request latency (p95): 6,800ms → 420ms (93.8% improvement)
Timeout rate: 12% → 0.2%
```

#### Before/After Comparison

| Metric | Before | After | Improvement |
|---|---|---|---|
| Query time | 3,200ms | 45ms | 98.6% ✓ |
| Connections held | 20/20 (queue) | 3/20 (free) | 7× capacity ✓ |
| API response (p95) | 6,800ms | 420ms | 94.3% ✓ |
| User timeout rate | 12% → 0.2% | Acceptable ✓ |
| Throughput | 1,200 req/min | 1,800 req/min (recovered) | 50% ✓ |

#### 24-Hour Monitoring Post-Fix

```
Day 1 after fix:
- No timeout errors
- API response stable (380–450ms)
- Connection pool utilization 8–15% (healthy)
- No performance degradation observed

Day 2–3 after fix:
- Response time consistent
- Zero complaints from users
- Monitoring trends normal
```

---

## What This Shows

✓ **Structured approach:** Symptom → logs → hypotheses → testing → root cause

✓ **Investigation depth:** Checked 6 different potential causes

✓ **Evidence-based:** Didn't guess—used logs, execution plans, metrics

✓ **Alternative theories tested:** Ruled out network, traffic, memory before confirming query

✓ **Solution validated:** Measured improvement before/after, monitored over time

✓ **Root cause clarity:** Not "API slow" but specifically "user_id index missing on orders table"

---

## Simple Summary for Examiner

*"Technical problem solving evidence:*

*Problem: API responses degraded from 500ms to 5–8 seconds, causing 12% timeout rate.*

*Investigation:*
- *Logs showed connection pool exhaustion starting at exact degradation time*
- *Database monitoring showed queries holding connections 4.2 seconds*
- *EXPLAIN revealed full table scan (4.2M rows examined for 2,400 returned)*
- *Root cause: Missing index on user_id column (migration #47 rollback left it dropped)*

*Validation:*
- *Before: 3,200ms query time, 12% timeouts*
- *After: 45ms query time, 0% timeouts*
- *24-hour monitoring: Stable, zero new issues*

*This shows not just fixing a problem, but systematically investigating multiple theories, eliminating them with evidence, identifying the true root cause, and validating the fix works."*

---

## What to Add

1. Application logs excerpt (showing connection pool errors)
2. Database execution plan screenshot (EXPLAIN output)
3. Monitoring dashboard before/after (response time graph)
4. Migration history document
5. Test results showing index impact (with/without)
