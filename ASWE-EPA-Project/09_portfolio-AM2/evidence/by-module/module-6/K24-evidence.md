# K24: Interpreting and implementing a compliant design; legacy issues
**Assessment method**: AM2
**Module**: 6 (Multiverse Project 6: Cloud Computing and Scalable Architectures)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Two-person, ten-week build of a cloud AI governance and knowledge assistant on AWS for a UK government registry
**Status**: Draft

## Criterion
**KSB:** How to interpret and implement a design, compliant with functional, non-functional and security requirements including principles and approaches to addressing legacy software development issues from a technical and socio-technical perspective. For example architectures, languages, operating systems, hardware, business change.
**Pass:** Describes how to interpret and implement a design, compliant with functional, non-functional and security requirements.
**Distinction:** None for this KSB.

> Guidance: Module 6 is your strongest K24 evidence: it has requirement tables, justified design choices, code in the appendices and a legacy section. This draft adds three things the report lacks: a traceability table linking each requirement to its design choice, implementation and check; an honest list of where the code does not yet meet its own requirements; and the prompts needed to cover the KSB's legacy examples (operating systems, hardware, languages).

## Situation
The registry had no governed way to use AI on its documents. Documents sat on Windows file shares with no API access, AI use left no audit trail, and security relied on a network perimeter that failed as soon as someone worked remotely. Staff either avoided AI or used consumer tools outside any control.

## Task
[EVIDENCE NEEDED: your part in turning these problems into requirements and a design, in the first person.]

## Action

### 1. Interpreting the design: from problems to requirements
I started from an audit of the current state and traced every requirement back to one of its three gaps (no API access, no audit trail, perimeter security). That produced:
- **7 functional requirements**, e.g. upload PDF, TXT and DOCX files (FR1), generate AI summaries (FR3), answer questions about a document (FR4), and log every AI interaction for audit (FR5).
- **6 non-functional requirements**, e.g. 50 or more concurrent users (NFR1), under 2,000 ms on non-AI endpoints (NFR2), TLS 1.2 or later (NFR4) and structured logging and metrics (NFR6).
- **6 security requirements**: encryption in transit and at rest (SR1, SR2), least privilege (SR3), a complete audit trail (SR4), secrets kept out of code (SR5) and input validation (SR6).

### 2. Implementing it: traceability from requirement to evidence
| Requirement | Design decision | Implementation | How it is verified |
|---|---|---|---|
| NFR1 concurrency | FastAPI (asynchronous) over Flask and Django | Async route handlers | Load test: 1,662 requests per second at 50 users, zero failures (health-check endpoint only) |
| NFR3 horizontal scaling | Stateless service; S3 rather than EBS, which ties storage to one instance | No local state in the container | [EVIDENCE NEEDED: not tested; say so, or describe a scaling test] |
| SR2 encryption at rest | S3 with AES-256 | Encryption set on **every** upload call in `storage_service.py`, not only as a bucket default (section 3.1; the code is not in the appendices) | Code review; [EVIDENCE NEEDED: e.g. checking object metadata in S3] |
| SR3 least privilege | Custom IAM policy rather than AWS managed policies such as `AmazonS3FullAccess` | Exactly three S3 actions on one bucket and three CloudWatch log actions; no wildcards (Appendix G) | The policy file itself is the evidence |
| SR4 audit trail, with data minimisation | Structured logging to CloudWatch | Each AI call logs timestamp, operation, document ID and the question truncated to 50 characters (Appendix F) | Log entries |
| SR5 secrets | Environment variables and IAM instance roles | No access keys on EC2; keys never hard-coded | Code and configuration review |
| SR6 input validation | Allowlist of file types; Pydantic models for requests | Upload rejects anything outside three MIME types with HTTP 400 (Appendix D) | Test: `.exe` upload returns 400 |
| Maintainability (NFR5) | Layered architecture: routes, services, infrastructure | Business logic in `ai_service.py` and `storage_service.py`, separate from HTTP handling | Model swap by environment variable needed zero code changes |

### 3. Where the implementation does not yet meet its own requirements
Reviewing the code against the requirements shows four gaps. Knowing them is part of implementing a compliant design:
1. **File type check trusts the client (SR6).** The upload route checks `file.content_type`, which the client sets. A renamed executable sent with a PDF content type would pass. A compliant check inspects the file's actual content (its signature bytes).
2. **No upload size limit (SR6, NFR1).** The route reads the whole file into memory. A very large upload could exhaust memory and affect other users. A maximum size, enforced before reading, would close this.
3. **Data residency is not a requirement.** Documents from a government registry are sent to the public OpenAI API. The report notes that Azure OpenAI offers UK data residency and is "preferable for regulated organisations", but chose OpenAI for cost and simplicity. For production, data residency should be a security requirement, and the isolated AI service layer makes the switch a configuration change. [EVIDENCE NEEDED: were any real registry documents processed? If so, under what approval?]
4. **Horizontal scaling is designed but not demonstrated (NFR3).** The service is stateless, but no scaling test was run.

[EVIDENCE NEEDED: say which of these you fixed, or would fix first, and why.]

### 4. Legacy issues: technical and socio-technical
**Technical.** Adding REST endpoints to the existing Windows file share would have needed middleware as complex as a new cloud-native build, and would have kept the perimeter security model that fails for remote workers. I replaced it with S3 storage, an API-first design and IAM roles controlling what each service can access. User-level identity (API keys, then Cognito) is planned but not yet built, so user access still relies on the network perimeter (see `S9-evidence.md`, Action 5). [EVIDENCE NEEDED: the KSB's legacy examples include languages, operating systems and hardware. Add what you know about the legacy side, e.g. the Windows Server version behind the file share, how documents would be migrated, and any file formats or tools staff depend on.]

**Socio-technical.** A migration nobody uses has failed. Staff used to drag-and-drop file shares had to adopt an upload-and-query workflow they had never seen, and without support the likely result was shadow IT: emailing documents or using personal AI tools outside any audit trail. I planned the change using ADKAR (Hiatt, 2006): awareness, desire, knowledge, ability and reinforcement, with a four-week parallel run of old and new systems and onboarding sessions on the real interface. [EVIDENCE NEEDED: how you would measure adoption. The report says adoption is tracked "via the /health endpoint", but a health check shows the service is up, not who uses it; request counts per user in CloudWatch or the audit log would.]

## Result
The build met FR1 to FR7 and the tested NFRs, with every security requirement implemented in code or configuration. [EVIDENCE NEEDED: confirm, and add what happened with the parallel run and adoption if the tool went live.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Interprets a design | Action 1: requirements traced to the three current-state gaps |
| Implements it | Action 2: design decision and implementation for each requirement |
| Compliant with functional requirements | FR1 to FR7; model swap and upload tests |
| Compliant with non-functional requirements | NFR1, NFR3, NFR5 rows; Action 3, gap 4 |
| Compliant with security requirements | SR2 to SR6 rows; Action 3, gaps 1 to 3 |
| Legacy issues, technical | Action 4: file share, perimeter security [EVIDENCE NEEDED: OS, hardware, languages] |
| Legacy issues, socio-technical | Action 4: ADKAR, parallel run, shadow IT risk |

## Assessor Notes
*Strength*: Every requirement is traceable to a decision and to code, and the draft shows you can find where your own implementation falls short.
*Gaps*: Legacy coverage lacks operating systems, hardware and languages; NFR3 is untested.
*Watch for*: expect a question on sending registry documents to the public OpenAI API. Section 3, gap 3 is your answer.
