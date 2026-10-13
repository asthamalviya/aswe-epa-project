# K22 New Evidence - Testing Impact on Quality

## The Gap: Prove Tests Find Real Bugs

Examiners want: "Our tests caught X bug before production. Coverage is Y%. Performance regression detected by Z test."

---

## Test Coverage Evidence

### Coverage Report

**Test Execution: Week of Jan 15-19, 2025**

```
Project-wide coverage: 78%
  - Payment processing: 94% ✓ (critical path)
  - Order service: 87% ✓ (high priority)
  - Product catalog: 82% ✓ (high priority)
  - Admin panel: 45% (acceptable—lower risk)

Lines covered: 12,400 / 15,900
Uncovered lines: 3,500 (mostly logging, UI themes, deprecated code)

Coverage trend:
- Jan 2024: 42%
- Jul 2024: 61%
- Jan 2025: 78% ↑ (36 percentage points improvement)
```

**Critical Path Coverage (Payment Processing):**
```
Payment authorization:     96% ✓
Refund handling:          91% ✓
Transaction logging:      98% ✓
Error recovery:           88% ✓
Fraud detection:          92% ✓

Overall: 94% (exceeds 85% target)
```

---

## Bugs Caught by Tests (Before Production)

### Bug 1: Off-By-One Refund Calculation

**Severity:** High (financial impact)

**How Caught:** Unit test on refund calculation with multiple payment methods

**Test Code:**
```python
def test_refund_calculation_multiple_items():
    order = Order(items=[
        Item(price=£10, qty=2),
        Item(price=£5, qty=3),
    ])
    
    # User returns 1 item from first group
    refund = order.calculate_refund(item_index=0, qty=1)
    
    assert refund == £10.00  # Should be £10, not £9.99
```

**Bug Found:** Calculation returned £9.99 (floating-point rounding)

**Impact if In Production:**
- Every second refund: off by £0.01
- 1,000 refunds/month × £0.01 = £10/month loss
- More importantly: accounting system audit fails

**Status:** ✓ Fixed before merge, test prevents regression

---

### Bug 2: Race Condition in Inventory Update

**Severity:** Critical (stock corruption)

**How Caught:** Integration test with concurrent requests

**Scenario:**
```
1. Inventory: Widget A has 5 units
2. User 1 purchases 3 units (concurrently)
3. User 2 purchases 3 units (concurrently)
   Expected: User 2 fails (not enough stock)
   Buggy code: Both succeed (inventory goes to -1)
```

**Test:**
```python
def test_concurrent_purchase_prevents_oversell():
    product = Product(stock=5)
    
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future1 = executor.submit(purchase, product, qty=3)
        future2 = executor.submit(purchase, product, qty=3)
        
        result1, result2 = future1.result(), future2.result()
    
    assert result1.success == True   # First purchase succeeds
    assert result2.success == False  # Second purchase fails
    assert product.stock == 2        # Stock correct
```

**Bug Found:** Missing transaction lock, inventory corrupted under load

**Impact if In Production:**
- Oversold 200+ items (revenue loss + unhappy customers)
- Manual inventory reconciliation required
- Shipping delays

**Status:** ✓ Fixed (added database transaction lock), test prevents regression

---

### Bug 3: Customer Data Exposure in Logs

**Severity:** Critical (GDPR violation)

**How Caught:** Security test scanning logs for PII

**Test:**
```python
def test_logs_contain_no_customer_pii():
    # Make a purchase request with PII
    response = purchase_api(
        email="john@example.com",
        phone="+1234567890",
        card_token="tok_123"
    )
    
    logs = get_logs_since(start_time)
    
    # Verify PII not in logs
    assert "john@example.com" not in logs
    assert "+1234567890" not in logs
    assert "tok_123" not in logs
```

**Bug Found:** Error message logged full customer email: 
```
ERROR: Purchase failed for customer john@example.com, token tok_123
```

**Impact if In Production:**
- GDPR violation (£5K–£20M fine depending on scope)
- Customer PII exposed in log aggregation system
- Security audit failure

**Status:** ✓ Fixed (sanitize logs), test prevents regression, now part of security check

---

### Bug 4: Memory Leak in Session Handler

**Severity:** High (availability)

**How Caught:** Load test with memory monitoring

**Test:**
```python
def test_session_memory_under_sustained_load():
    initial_memory = get_memory_usage()
    
    # Simulate 10,000 user sessions
    for i in range(10_000):
        session = create_session(user_id=i)
        # ... use session ...
        destroy_session(session)
    
    final_memory = get_memory_usage()
    memory_growth = final_memory - initial_memory
    
    # Should return to baseline (or very close)
    assert memory_growth < 5_MB  # Allow small overhead
```

**Bug Found:** Destroyed sessions not freed from memory, grew 1GB per hour

**Impact if In Production:**
- Server becomes unresponsive after 4–8 hours
- Manual restart required daily
- Users kicked out mid-transaction

**Status:** ✓ Fixed (removed circular reference in cleanup), test prevents regression

---

## Performance Testing Results

### Performance Test: Black Friday Load

**Test Setup:** 5,000 concurrent users, 1-hour duration

**Results Against Performance Budget:**

| Metric | Budget | Actual | Status |
|---|---|---|---|
| **p50 latency** | <500ms | 320ms | ✓ PASS |
| **p95 latency** | <2,000ms | 1,400ms | ✓ PASS |
| **p99 latency** | <5,000ms | 3,800ms | ✓ PASS |
| **Error rate** | <0.1% | 0.02% | ✓ PASS |
| **Memory** | <4GB | 2.8GB | ✓ PASS |
| **CPU** | <80% | 65% | ✓ PASS |

---

### Performance Regression Detected

**Week of Jan 8: Performance Test Failed**

```
Commit: 123abc (Upgrade payment library)

Performance change:
- p95 latency: 1,400ms → 2,100ms (50% worse ⚠️)
- p99 latency: 3,800ms → 6,200ms (63% worse ⚠️)
- Exceeds budget (> 5,000ms threshold)

Test failed: ✗ REGRESSION DETECTED
```

**Root Cause:** Payment library version upgrade introduced expensive initialization call

**Investigation:**
```
Before: Payment initialized once per server, 10ms
After: Payment initialized per transaction, 150ms per call
  × 5,000 concurrent requests
  = 750,000ms cumulative (performance death)
```

**Action Taken:** Reverted library upgrade, implemented lazy initialization pattern

**After Fix:**
```
p95 latency: Back to 1,400ms ✓
p99 latency: Back to 3,800ms ✓
Test passed: ✓
```

**Value Demonstrated:** Caught performance regression in CI/CD, never reached production.

---

## Test Execution Pipeline

### CI/CD Test Automation

**On Every Commit:**
```
1. Unit tests (2 min):
   - 1,200 tests
   - 78% coverage check
   → Fail if coverage drops below 75%

2. Integration tests (5 min):
   - 280 tests against test database
   - Concurrent operation tests
   → Fail if any integration breaks

3. Security tests (3 min):
   - PII scanner
   - Dependency vulnerability check
   - SQL injection patterns
   → Fail if vulnerabilities found

4. Performance baseline (4 min):
   - Run 100 key operations
   - Compare to baseline
   → Fail if >10% regression

Total: 14 minutes, automated, blocking merge
```

**Merge Blocked If:**
- Coverage drops below 75%
- Any test fails
- Performance regression >10%
- Security issues found

**Weekly: Extended Testing**
```
- Full suite (2 hours):
  2,000+ tests including e2e
- Performance stress test (30 min):
  10,000 concurrent users
- Load test (45 min):
  Sustained 5,000 users
```

---

## Test-Driven Development (TDD) Example

### Feature: Loyalty Points Calculation

**Development Process:**

**Step 1: Write Test (Red)**
```python
def test_loyalty_points_basic():
    customer = Customer()
    purchase = Purchase(amount=£100)
    
    points = customer.calculate_loyalty_points(purchase)
    
    assert points == 100  # £1 = 1 point
```

**Step 2: Implement (Green)**
```python
def calculate_loyalty_points(self, purchase):
    return int(purchase.amount)
```

**Step 3: Write Test for Edge Case (Red)**
```python
def test_loyalty_points_vip_bonus():
    customer = Customer(tier='VIP')
    purchase = Purchase(amount=£100)
    
    points = customer.calculate_loyalty_points(purchase)
    
    assert points == 150  # VIP gets 50% bonus
```

**Step 4: Implement (Green)**
```python
def calculate_loyalty_points(self, purchase):
    base_points = int(purchase.amount)
    if self.tier == 'VIP':
        return base_points * 1.5
    return base_points
```

**Result:** All 47 points calculation tests pass before feature released.

---

## Simple Summary for Examiner

*"Testing strategy and QA evidence:*

*Coverage:*
- *Overall: 78% (up from 42% year ago)*
- *Critical paths: 94% (payment processing)*
- *Trend: Improving consistently*

*Bugs Caught Before Production:*
- *Off-by-one refund: Would lose £10/month + accounting audit failures*
- *Race condition: Would oversell 200+ items and corrupt inventory*
- *PII in logs: Would violate GDPR, £5K–£20M fine risk*
- *Memory leak: Would require daily server restart*

*Performance Testing:*
- *Load test: 5,000 concurrent users, all latency targets met*
- *Regression test caught 50% latency increase, prevented production issue*
- *Automated on every commit: 14-minute feedback loop*

*TDD Approach:*
- *Loyalty points feature: 47 tests ensuring correct behavior*
- *Edge cases caught during development, not in production*

*This shows testing is not optional—it prevents financial loss, compliance violations, and outages."*

---

## What to Add

1. Coverage report (SonarQube, Codecov, or similar)
2. CI/CD pipeline configuration showing test steps
3. Performance test report (with graphs)
4. Actual test code snippets (from above examples)
5. Merge request blocked log (regression detected)
6. Weekly test execution summary
