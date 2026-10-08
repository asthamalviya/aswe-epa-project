# K16: Computer networking concepts
**Assessment method**: AM2
**Module**: 6 (Multiverse Project 6: Cloud Computing and Scalable Architectures)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Two-person, ten-week build of a cloud AI governance and knowledge assistant on AWS for a UK government registry
**Status**: Draft
**Supporting evidence**: Module 3 (network segmentation and Zero Trust review) is also rated Strong for K16. See the note at the end.

## Criterion
**KSB:** Fundamental computer networking concepts in relation to digital and technology solutions. For example, structure, cloud architecture, components, quality of service.
**Pass:** Explains core technical concepts for digital and technology solutions, including: Computer networking concepts.
**Distinction:** None for this KSB.

> Guidance: Module 6 section 1.1 explains the concepts well but reads like a textbook: it says what TCP, DNS and TLS are, then moves on. The KSB asks for concepts **in relation to** a solution. This draft ties each concept to a decision you made in the build, grouped under the four examples the KSB gives: structure, cloud architecture, components and quality of service.

## Situation
The assistant lets staff upload documents, get AI summaries and ask questions, with every interaction logged for governance. It runs as a stateless FastAPI container on EC2 behind AWS API Gateway, stores documents in S3 and calls the OpenAI API. It had to serve 50 or more concurrent users (NFR1), respond in under 2,000 ms on non-AI endpoints (NFR2) and enforce TLS 1.2 or later throughout (NFR4).

## Task
[EVIDENCE NEEDED: your part in designing the network architecture, in the first person.]

## Action: networking concepts applied to this solution

### Structure: how traffic flows
Every request follows the same path: the user's browser resolves the service name through DNS, opens a TLS connection to API Gateway, and API Gateway forwards the request to the FastAPI container on EC2. The container then reads from and writes to S3 and calls the OpenAI API over HTTPS. All of this runs over TCP/IP: TCP guarantees ordered, reliable delivery, and IP handles addressing and routing between networks (Kurose and Ross, 2021).

[EVIDENCE NEEDED: describe the VPC layout from Figure 2 in words, e.g. which subnets are public and which private, where EC2 sits, which security group rules allow traffic in, and how EC2 reaches S3 and the OpenAI API (NAT gateway, VPC endpoint or public subnet). The report shows this only as a figure, and the assessor will ask you to explain it.]

### Cloud architecture: why this shape
I compared three patterns against the networking and governance requirements:
- **A single monolithic EC2 instance.** Simple, but if the application crashed, the audit logging went with it.
- **Microservices on ECS or Kubernetes.** The best fault isolation, but it needs service-to-service networking, a service mesh and distributed tracing, which a two-person team could not run in ten weeks.
- **Lambda behind API Gateway.** It scales to zero when idle, but Python cold starts add 100 to 500 ms (Manner et al., 2018) on top of AI response time.

I chose a stateless container behind API Gateway. Because any instance can serve any request, the design can scale out behind a load balancer without shared state.

### Components: what each part does on the network
| Component | Network role | Why I used it |
|---|---|---|
| DNS (Route 53) | Resolves names to endpoints; supports latency-based routing and health-checked failover | Lets the tool add a second region later by routing users to the nearest healthy endpoint |
| TLS | Encrypts data in transit | Meets NFR4. TLS 1.3 needs one handshake round trip instead of two in TLS 1.2, which cuts connection set-up time [EVIDENCE NEEDED: which TLS versions API Gateway accepts in your build: 1.2 and 1.3, or 1.3 only] |
| API Gateway | Layer 7 entry point: routing, rate limiting (throttling), authentication and request-level logging | Centralises the governance controls in one place in front of the application |
| Load balancer | Spreads requests across instances. An ALB works at Layer 7 and can route by path or header; an NLB works at Layer 4 and is faster but cannot inspect requests | [EVIDENCE NEEDED: the report both recommends an ALB and uses API Gateway as the front door. State which the build uses, and whether an ALB sits behind API Gateway for scaling.] |
| Identity-based access | Access decided by who the caller is, not which network they are on | Applied to **services**: IAM roles control what the EC2 instance can reach. Not yet applied to **users**: the build relies on the network perimeter until API key and Cognito authentication are added (see `S9-evidence.md`, Action 5) |

### Quality of service: measuring and trading it off
Quality of service here means latency, throughput, availability and error rate.
- **Latency.** API Gateway adds about 29 ms per request. I accepted that cost because removing it would also remove throttling, request-level audit logging and central authentication, which are governance requirements, not optional features.
- **Throughput.** The load test reached 1,662 requests per second at 50 concurrent users with zero failures (health-check endpoint; see `S21-evidence.md`, Action 4, for the limits of that test).
- **Availability and error rate.** CloudWatch tracks request count, average and P99 latency and 5xx errors, with an alarm when errors exceed 5% over five minutes. If S3 has a regional outage, the application returns structured HTTP 500 errors rather than crashing, and cross-region replication can be enabled without code changes.

## Result
[EVIDENCE NEEDED: what the network design achieved in practice, e.g. measured end-to-end latency through API Gateway, whether TLS 1.2+ was verified (e.g. with an SSL scan), or production CloudWatch figures.]

## Corrections to make before relying on section 1 of the report
- **Nielsen (1993) is misquoted.** The report says users tolerate "up to 200ms" before noticing latency. Nielsen's three limits are about 0.1 second (feels instant), 1 second (flow of thought uninterrupted) and 10 seconds (attention kept). Reword as "well within Nielsen's 0.1-second limit for a response to feel instant".
- **The Lambda argument mixes up targets.** It says cold starts would push AI responses past the 2,000 ms NFR, but NFR2 applies only to non-AI endpoints. Either argue that cold starts would breach NFR2 on non-AI endpoints, or set a separate target for AI endpoints.
- **Check the 29 ms source.** The report attributes "approximately 29ms per request" to AWS documentation. If that figure came from your own measurement, say so; if it came from AWS, check the page, as AWS does not usually publish a fixed overhead.

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Explains networking concepts | TCP/IP, DNS, TLS, Layer 4 versus Layer 7, API gateways, load balancing, identity-based access |
| In relation to a digital solution | Every concept tied to a component or decision in the assistant |
| Structure | Structure section [EVIDENCE NEEDED: VPC layout] |
| Cloud architecture | Three patterns compared against networking requirements |
| Components | Components table |
| Quality of service | Latency, throughput, availability and error rate, with figures |

## Assessor Notes
*Strength*: Concepts are explained correctly and tied to real trade-offs, with measured figures for throughput and a costed latency trade-off.
*Gaps*: The VPC layout is shown only in a figure; the front door (ALB or API Gateway) is inconsistent; one citation is misquoted.
*Module 3 support*: Module 3's VLAN plan, firewall allowlist and segmented Zero Trust design cover network **structure** on premises, which complements Module 6's cloud structure. Refer to both in the discussion to show the concepts across on-premises and cloud networks.
