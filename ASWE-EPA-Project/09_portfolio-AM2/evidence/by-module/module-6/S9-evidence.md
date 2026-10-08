# S9: Security and resilience techniques
**Assessment method**: AM2
**Module**: 6 (Multiverse Project 6: Cloud Computing and Scalable Architectures)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Two-person, ten-week build of a cloud AI governance and knowledge assistant on AWS for a UK government registry
**Status**: Draft
**Companion piece**: `../module-3/S9-evidence.md` shows the risk assessment method on a network review. This piece shows security and resilience controls **applied in a system you built**, which is what makes S9 a demonstrated skill.

## Criterion
**KSB:** Apply relevant security and resilience techniques to a digital and technology solution. For example, risk assessments, mitigation strategies.
**Pass:** Demonstrates the use of core technical concepts for digital and technology solutions, including: security and resilience techniques.
**Distinction:** None for this KSB.

> Guidance: Module 6 is your strongest applied S9 evidence: security requirements, controls enforced in code and configuration, and failure scenarios. It has no scored risk assessment, so section 4 applies the Module 3 method to this build. Section 5 lists security gaps in the build. The most important is that the tool has no user authentication yet; expect the assessor to find it, so raise it first.

## Situation
The registry had no governed way to use AI on its documents, and staff were using consumer AI tools outside any audit trail. The assistant had to let staff upload documents and query them with AI while keeping documents confidential, recording AI use for governance and staying available.

## Task
[EVIDENCE NEEDED: your part in defining and implementing the security controls, in the first person.]

## Action

### 1. Security requirements
I set six security requirements before building: encryption in transit (SR1) and at rest (SR2), least-privilege access (SR3), a complete audit trail (SR4), secrets kept out of code (SR5) and input validation (SR6).

### 2. Security controls applied
| Requirement | Control | How it is enforced | Evidence |
|---|---|---|---|
| SR1 | HTTPS through API Gateway; CORS limited to an explicit list of origins per environment | Gateway configuration; `ALLOWED_ORIGINS` environment variable | CORS fix, section 4.3 |
| SR2 | AES-256 server-side encryption in S3 | Set on **every** upload call in code, not only as a bucket default, so a misconfigured bucket cannot leave a document unencrypted | Section 3.1 |
| SR3 | Custom IAM policy | Exactly three S3 actions on one bucket and three CloudWatch log actions; no wildcards. I rejected `AmazonS3FullAccess`, because a compromised instance with it could list and copy every bucket in the account | Appendix G |
| SR4 | Structured governance logging | Every AI interaction logged with time, operation and document ID; questions truncated to 50 characters so sensitive content stays out of CloudWatch | Appendix F |
| SR5 | No secrets in code or on the server | API keys in environment variables; IAM instance roles, so there are no AWS access keys on EC2 at all | Section 3.4, Scenario 3 |
| SR6 | Input validation | File type allowlist returning HTTP 400; Pydantic models for every request | Appendix D; `.exe` upload test |
| All | Code review as a second line of defence | Review found a missing input sanitisation step on `/ask` that automated tools missed | Section 3.2.5 |

### 3. Resilience techniques
I analysed four failure scenarios and designed a response to each:

| Scenario | What happens now | Planned mitigation |
|---|---|---|
| OpenAI API times out during a traffic spike | Responses are capped at 500 tokens, which bounds processing time | Circuit breaker after three consecutive timeouts; SQS queue between upload and AI processing |
| S3 regional outage | The application returns structured HTTP 500 errors instead of crashing; S3 versioning allows recovery from accidental deletion | Cross-region replication, enabled without code changes |
| Secret exposure | Logs contain only operation metadata, never API keys; no AWS keys exist on the instance | — |
| Concurrent summarisation exceeds OpenAI rate limits | Requests fail once the limit is hit | Exponential backoff, SQS queuing and caching of earlier summaries |

The service is also stateless, so a failed instance can be replaced without losing data. CloudWatch raises an alarm when more than 5% of responses are server errors over five minutes.

### 4. Risk assessment of the build
Module 6 has no scored risk assessment. Applying the 5 × 5 method from Module 3:

| Risk | L | I | Score | Mitigation in place or planned |
|---|---|---|---|---|
| Unauthenticated access to the API | [ ] | [ ] | [ ] | Planned: API key, then Cognito role-based access |
| Registry documents processed by a third-party AI provider | [ ] | [ ] | [ ] | Isolated AI service allows a switch to Azure OpenAI with UK data residency |
| Malicious or oversized file upload | [ ] | [ ] | [ ] | Type allowlist (client-supplied); size limit needed |
| AI provider outage or rate limiting | [ ] | [ ] | [ ] | Token cap; circuit breaker, backoff and queuing planned |
| Credential leak | [ ] | [ ] | [ ] | Environment variables, IAM roles, log minimisation |

[EVIDENCE NEEDED: score each risk yourself, with a one-line reason, as in Module 3. The first two are likely to score highest.]

### 5. Security gaps I found in my own build
1. **No user authentication.** The report says API Gateway "centralises authentication", but its own recommendations list API key authentication as a short-term enhancement "replacing network-perimeter-only security", and user-level access (Cognito) as long-term. So the minimum viable product relies on the network perimeter for access to the API. This also weakens SR4: the audit log records what was asked, but not **who** asked. For a governance tool, user identity in the audit trail should be a release condition.
2. **Upload validation can be bypassed.** The file type check uses the content type the client sends, and there is no size limit (see `K24-evidence.md`, section 3).
3. **Logs still hold some content.** The upload log records the file name, and the audit log keeps the first 50 characters of each question, both of which can contain personal or sensitive information. That conflicts with the report's statement that document content is never logged.
4. **WAF not yet in place.** AWS WAF rules on API Gateway against the OWASP Top 10 are recommended for week 1 but were not part of the build.

[EVIDENCE NEEDED: which of these you would fix first and why, or which you have since fixed.]

## Result
All six security requirements were implemented in code or configuration, every recorded defect was caught before production, and the IAM policy contains no wildcard permissions. [EVIDENCE NEEDED: whether the system went live, and with what access control.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Security techniques applied | Action 2: encryption, least privilege, secrets handling, validation, logging, code review |
| Resilience techniques applied | Action 3: failure scenarios, stateless design, versioning, alarms |
| Risk assessment | Action 4 [EVIDENCE NEEDED: your scores] |
| Mitigation strategies | Actions 3 and 4 |
| Critical use of the techniques | Action 5: gaps found in own build |

## Assessor Notes
*Strength*: Controls are enforced in code and configuration with evidence in the appendices, and the least-privilege policy is specific and verifiable.
*Gaps*: The risk scores in Action 4 are yours to set; your role needs stating.
*Watch for*: "Who can call your API, and how would you know who asked a question?" Action 5, gap 1 is your answer.
