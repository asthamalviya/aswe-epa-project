# Project 6: Cloud AI Governance Assistant (MVP Implementation) - Supporting Evidence

## Expected Images

From: `6.pdf`

- **VPC architecture diagram** — EC2, API Gateway, ALB, security groups, TLS/encryption
- **HTTPS traffic flow** — Client → API Gateway → Load Balancer → FastAPI → EC2 → encryption/validation
- **Network concepts visualization** — TCP/IP stack, DNS resolution, TLS handshake, Layer 7 routing
- **Latency distribution graph** — P50, P95, P99 measured under 50 concurrent users (0.49ms avg, P95 0.54ms)
- **Load test results** — 1,662 requests/sec at 50 concurrent users, zero failures
- **GitHub Actions CI/CD log** — Test results, coverage report (99% line, 92% branch), zero defects to production
- **Pull request code review** — Example PR with reviewer comments, changes tracked
- **Terraform infrastructure code** — 9 AWS resources, IAM policies, least-privilege configuration

## Captions for Portfolio

**Architecture (Figure 6.1):**
```
Cloud MVP architecture on AWS: FastAPI backend on EC2, stateless design enables 
horizontal scaling (multiple copies load-balanced). Security hardened: TLS 
encryption in transit, AES-256 at rest, least-privilege IAM (no wildcards). 
Governance layer: audit logging tracks all interactions (who asked what, when, 
which source), source citation on answers. Network design explicitly implements 
required QoS: load balancing distributes requests, TLS adds acceptable latency 
(<1ms), availability through redundancy and graceful degradation.
```

**Networking (Figure 6.2):**
```
HTTPS request journey illustrates networking concepts in production: DNS 
resolution finds API Gateway endpoint, TLS handshake establishes encryption 
(TCP connection → TLS 1.3 negotiation → certificate verification → encrypted 
session), API Gateway routes to ALB (Layer 7 - application layer), ALB 
distributes to EC2 instances (round-robin), FastAPI processes request, response 
encrypted back through same path. Demonstrates understanding of how network 
layers (3: IP, 4: TCP, 5-7: TLS/HTTP) work together to deliver security and 
performance.
```

**Performance (Figure 6.3):**
```
Latency distribution under load (50 concurrent users): P50 (median) 0.49ms, 
P95 0.54ms, P99 0.63ms. Tight distribution (P99 only 28% above median) shows 
consistent performance, not occasional slowdowns. Throughput: 1,662 requests/sec 
at 50 concurrent users (82.1 req/sec per user). Zero failures across test run. 
Demonstrates that architectural choices (stateless FastAPI, proper load 
balancing, connection pooling) deliver production-grade performance and 
reliability.
```

**CI/CD Pipeline (Figure 6.4):**
```
GitHub Actions test results: 99 tests passing (34 characterisation, 23 unit, 
19 service, 14 integration), line coverage 99%, branch coverage 92%, execution 
time 0.21 seconds. All tests run on every commit before merge (shown in CI logs 
with checkmark). Result: zero defects to production—every merged PR has already 
proven correctness, not discovered bugs after deployment. Shows quality discipline.
```

**Real Problem-Solving (Figure 6.5):**
```
GitHub PR showing three production issues you solved: (1) Python version 
compatibility (Union type syntax required 3.10; CI ran 3.9; solution: 
Optional[str] + Ruff rule; impact: 2 engineers unblocked, feedback loop 10 min 
→ 90 sec), (2) OpenAI client lazy init (CI failed without API key; solution: 
singleton on first call; impact: 90 sec feedback), (3) CORS configuration 
(wildcard origin blocked credentialled requests; solution: explicit allowlist 
per environment; impact: frontend unblocked 30 min). Each shows problem-solving 
under constraints: what you couldn't do (upgrade global CI Python), what you 
chose instead (local workaround), why it worked (specific to your code, 
maintainable, unblocking others).
```

## Assessment Evidence Quality (Grade A)

✓ **What examiners specifically valued (from feedback):**
- Networking concepts explained clearly: TCP/IP, DNS, TLS, API Gateway routing, QoS (latency/throughput)
- Architecture diagrams support evidence (VPC layout, HTTPS journey visible)
- Design strongly justified: requirements (functional, non-functional, security) mapped to choices
- Design comparisons explicit (S3 vs EBS vs EFS; FastAPI vs Flask vs Django; OpenAI vs Azure)
- Testing results strong (latency, concurrency, model flexibility proven)
- Real problem-solving visible (adapted to constraints, measured impact)

✓ **What could be stronger:**
- More deployed failure testing evidence (what happens if OpenAI times out? S3 outage?)
- More collaboration artifacts (PR comments, reviewer feedback, issue board)
- Evidence from deployed network (routing validation, actual ALB behaviour)

## Next Steps

Extract Project 6 images:
```bash
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/6.pdf" --out .
```
