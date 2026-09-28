# S21: Determine, refine and adapt methods to evaluate project outcomes
**Assessment method**: AM2
**Module**: 6 (Multiverse Project 6: Cloud Computing and Scalable Architectures)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Two-person, ten-week build of a cloud AI governance and knowledge assistant on AWS for a UK government registry
**Status**: Draft

## Criterion
**Pass:** Explains how they determine, refine, adapt and use appropriate software engineering methods, approaches and techniques to evaluate software engineering project outcomes. (S21/SES6)
**Distinction:** None for this KSB.

> Guidance: the criterion has four verbs: **determine**, **refine**, **adapt** and **use**. Module 6 is strong on *use* (it reports many results) and thin on *refine* and *adapt*. This draft uses the module's own figures, then turns its weakest evaluation, a benchmark that only tested the health-check endpoint, into your refine-and-adapt example. That is the part the assessor is most likely to probe.

## Situation
The tool had to meet six non-functional requirements (NFRs), including support for 50 or more concurrent users (NFR1) and response times under 2,000 ms for non-AI endpoints (NFR2), plus security requirements such as rejecting unsafe file uploads. I needed evidence, before and after deployment, that the build met them and that the delivery process was catching defects early.

## Task
[EVIDENCE NEEDED: your role in choosing and running the evaluation, in the first person.]

## Action

### 1. How I determined the evaluation methods
I matched each method to the outcome it had to prove:

| Outcome to evaluate | Method I chose | Why this method |
|---|---|---|
| Latency (NFR2) | 100 sequential requests, reporting average, P95 and P99 | For a governance tool, predictable latency matters more than the average: users lose trust in systems that behave unpredictably. Percentiles show the spread; an average hides it. |
| Concurrency (NFR1) | Load test at 50 simultaneous users | Matches the NFR target directly. |
| Flexibility | Swapping the AI model (gpt-3.5-turbo to gpt-4) by environment variable only | Tests the design claim that the AI provider can change without code changes. |
| Security | Negative tests, e.g. uploading a `.exe` file | Proves the upload validation rejects unsafe files (HTTP 400). |
| Delivery quality | Defects caught per quality gate (Ruff, pytest, Docker build, code review) and defect escape rate | Shows which gate catches which class of defect, and whether any reach production. |
| Toolchain value | Pipeline time added against debugging time saved | Tests whether the quality gates were worth their cost. |
| Live behaviour | CloudWatch dashboards for request count, average and P99 latency and 5xx error rate, with an alarm above 5% errors over five minutes | Validates the NFRs against real traffic, not only synthetic tests. |

### 2. How I used them: results
- **Latency:** average 0.49 ms, P95 0.54 ms, P99 0.63 ms, against a 2,000 ms target.
- **Concurrency:** 1,662 requests per second at 50 concurrent users, with zero failures.
- **Flexibility:** the model swap needed zero code changes.
- **Delivery quality:**
  - Ruff caught 14 linting issues, pytest caught 3 functional regressions and the Docker build caught 1 environment inconsistency.
  - Code review caught 2 logic issues the automated tools missed, including a missing input sanitisation step on the `/ask` endpoint.
- **Toolchain value:** the four gates added about 20 minutes of pipeline time per sprint and saved an estimated 3.5 hours of debugging.

### 3. How I refined the methods
- **Keeping code review alongside automation.** The defect counts showed code review finding issues no automated gate caught, so I kept both rather than relying on the pipeline alone.
- **Moving evaluation earlier.** When the API key problem broke CI, I changed how we checked each change: from deploying and then checking (about 10 minutes a cycle) to letting CI evaluate every commit (about 90 seconds). Defects were then caught at commit time rather than after deployment. (See `S20-evidence.md`, Problem 2.)
- **Adding production monitoring.** I added CloudWatch metrics and an error alarm because synthetic tests alone cannot show how the system behaves under real use.

### 4. How I adapted when a method proved inadequate
My latency and load tests ran against the health-check endpoint only (`test_health_latency_single` and `test_health_concurrent_load`). [EVIDENCE NEEDED: confirm whether they ran in-process, e.g. with FastAPI's TestClient, or over the network. Sub-millisecond results suggest in-process.] The results therefore measure the framework's overhead, not what a user experiences: they exclude the network, API Gateway (about 29 ms per request, as the report notes in section 1) and the AI calls, which are the slowest part of the system and have no latency target at all.

[EVIDENCE NEEDED: what you did about this, or what you would do. For example: re-running the load test against `/ask` and `/summarise` with the AI call mocked to isolate application latency; testing through API Gateway to include the network; adding an NFR for AI endpoints (e.g. P95 under 10 seconds, bounded by the 500-token response limit); and using CloudWatch P99 from real traffic as the main measure. If you only realised this now, say so: recognising a flawed method and explaining how you would fix it is exactly what "refine and adapt" means.]

## Result
The evaluation showed that the non-AI endpoints met NFR1 and NFR2 with a large margin, that the model could be swapped without code changes, and that the quality gates caught every recorded defect before production. It also showed its own limits: the benchmark proved the framework was fast, not that the whole service was. [EVIDENCE NEEDED: any production CloudWatch figures, if the system ran in production.]

## Evaluating my evaluation
| Method | What it showed well | Its limitation | How I would improve it |
|---|---|---|---|
| Health-check benchmark | Framework overhead and consistency | Not representative of real requests | Benchmark AI endpoints through API Gateway |
| Defect counts per gate | Which gate catches what | Small numbers over ten weeks; no severity weighting | Track by severity across more sprints |
| Toolchain cost against benefit | Gates were worth their time | "3.5 hours saved" is an estimate | Record actual debugging time per incident |
| CloudWatch in production | Real traffic behaviour | [EVIDENCE NEEDED: was it live?] | Add AI-endpoint latency to the dashboard |

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Determines appropriate methods | Action 1: each method matched to an outcome, with a reason |
| Uses them to evaluate outcomes | Action 2: results against targets |
| Refines methods | Action 3: code review retained, evaluation moved earlier, production monitoring added |
| Adapts methods | Action 4: health-check benchmark recognised as inadequate [EVIDENCE NEEDED: your adaptation] |
| Evaluates project outcomes | Result and "Evaluating my evaluation" |

## Assessor Notes
*Strength*: Methods are tied to specific NFRs, with percentile latency and per-gate defect data, and the draft critiques its own methods.
*Gaps*: Action 4 needs your real response. The third-person voice in the report hides who chose the methods.
*Watch for*: the report states zero defects escaped to production, but also says the CORS problem appeared "after deploying the FastAPI backend". Be ready to explain whether that deployment was to a test environment.
