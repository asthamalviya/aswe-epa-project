# K11: Common vulnerabilities in digital and technology solutions
**Assessment method**: AM2
**Module**: 3 (Multiverse Project 1: Cybersecurity & Software Development), with examples from Module 6
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Security review of a UK government registry's network (Module 3), and vulnerabilities found in my own AI assistant build (Module 6)
**Status**: Draft

## Criterion
**KSB:** The nature and scope of common vulnerabilities in digital and technology solutions. For example, the risks of unsecure coding and unprotected networks.
**Pass:** Critically evaluates the nature and scope of common vulnerabilities in digital and technology solutions.
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** critically evaluate the nature and scope of common vulnerabilities; discuss the risks of insecure coding **and** unprotected networks; show a deep understanding of the risks.

> Guidance: the Pass criterion says **critically evaluates**, the highest bar of any AM2 knowledge KSB. Module 3 evaluates network risks but only lists secure-coding mitigations, so insecure coding is the gap. This draft closes it with vulnerabilities from your own Module 6 code, which is stronger than textbook examples because you can explain them from experience. "Nature" means **what the flaw is and why it happens**; "scope" means **how far the damage spreads**.

## Situation
A UK government registry holds sensitive corporate data and runs public-facing services, which makes it a target. My Module 3 review assessed its network; my Module 6 build gave me first-hand experience of vulnerabilities in code I wrote.

## Task
[EVIDENCE NEEDED: your role in both, in the first person.]

## Action

### 1. The nature of common vulnerabilities
Most vulnerabilities come from a small number of root causes. Grouping them by cause, rather than listing them, shows why they keep recurring:

| Root cause | What goes wrong | Examples from my work |
|---|---|---|
| Trusting input | The system accepts data it should check | Module 6: the upload route trusted the client-supplied file type; code review found a missing sanitisation step on `/ask`. Module 3: CVE-2021-41773, where Apache failed to normalise file paths, allowing path traversal |
| Broken authentication or access control | The system does not check who is asking, or grants too much | Module 6: no user authentication in the first build; managed IAM policies such as `AmazonS3FullAccess`, which I rejected. Module 3: CVE-2021-26855 (ProxyLogon), an authentication bypass in Exchange |
| Insecure configuration | Safe code deployed with unsafe settings | Module 6: a wildcard CORS origin. Module 3: SMBv1 left enabled, and a guest Wi-Fi network shared with internal systems |
| Unpatched components | Known flaws left in place | Module 3: EternalBlue (CVE-2017-0144) in unpatched Windows SMB |
| Human factors | People are tricked or make mistakes | Module 3: phishing, rated High (16/25) |
| Unprotected data | Data readable if intercepted or stolen | Module 3: unencrypted data at rest or in transit, rated High (15/25) |

Using the OWASP Top 10 (OWASP, 2021) as a checklist, my Module 6 build had issues in four categories: broken access control (A01), insecure design (A04, trusting the client's file type), security misconfiguration (A05, wildcard CORS) and identification and authentication failures (A07, no user authentication).

[EVIDENCE NEEDED: what the missing sanitisation on `/ask` was. If it concerned text passed to the language model, it is a prompt injection risk, the top risk in the OWASP Top 10 for LLM Applications; name it if so.]

### 2. The scope of common vulnerabilities: how far damage spreads
The same flaw can be minor or catastrophic depending on what surrounds it. Three factors decide the scope:
- **Network design.** EternalBlue is a flaw in one Windows service, but on the flat networks of many NHS trusts in 2017 it let WannaCry spread across whole estates, cancelling appointments and delaying treatment. On a segmented network with default-deny rules between zones, the same flaw is contained to one zone. This is why I rated weak separation between the DMZ and internal networks as the registry's only Critical risk (25/25): it multiplies the scope of every other vulnerability.
- **Privilege.** A compromised Module 6 instance with `AmazonS3FullAccess` could list and copy every bucket in the AWS account. With the scoped policy I wrote, the same compromise reaches one bucket and three actions. Least privilege does not remove the vulnerability; it limits how far it spreads.
- **Exposure.** A flaw in an internet-facing system (Apache or Exchange) is exploitable by anyone. The same flaw behind a DMZ and web application firewall needs an attacker to be inside first.

### 3. Insecure coding and unprotected networks together
The KSB names two examples, and my work shows they compound each other:
- **Insecure code on an unprotected network** is the worst case: one coding flaw (EternalBlue's SMB bug) becomes an organisation-wide outage.
- **Insecure code on a protected network** is contained: segmentation, a WAF and least privilege limit the damage while the flaw is fixed.
- **Secure code on an unprotected network** still fails when anything else is compromised, for example a phished laptop on a shared network.

So neither is enough alone. That is why my Module 3 proposal pairs network controls (segmentation, firewalls, network access control) with secure development controls (OWASP training, static and dynamic security testing in the pipeline, peer review), and why my Module 6 build combined code-level controls (validation, encryption on every upload) with infrastructure controls (scoped IAM, API Gateway).

### 4. Critical evaluation: the limits of common approaches
- **Checklists catch known flaws, not design flaws.** The OWASP Top 10 helped classify my Module 6 issues, but the most serious one, no user authentication, was a design decision, not a coding mistake a scanner would flag.
- **Automated tools miss logic flaws.** In Module 6, code review found two logic issues that linting, tests and the Docker build all missed. Tooling reduces risk; it does not replace a second person.
- **Risk scores can hide scope.** My Module 3 matrix scored guest Wi-Fi as Low (6/25), but on a flat network it offers the same lateral movement as the Critical risk. Scoring each vulnerability in isolation understates how they combine.
- **Patching alone is not a strategy.** Microsoft patched EternalBlue two months before WannaCry, so the NHS failure was organisational: knowing what is deployed and patching it quickly. But ProxyLogon and the Apache flaw were exploited as zero-days, before or as patches appeared, when no amount of patching discipline would have helped. Segmentation and monitoring are what limit the damage in that window. [Check these dates against the vendor advisories before citing them.]

## Result
[EVIDENCE NEEDED: what came of this, e.g. which Module 6 vulnerabilities you fixed, or whether the Module 3 findings were shared with the security team.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Nature of common vulnerabilities | Action 1: root causes, with examples from both modules; OWASP classification |
| Scope of common vulnerabilities | Action 2: network design, privilege, exposure |
| Risks of insecure coding | Actions 1 and 3: Module 6 flaws, CVEs as coding flaws |
| Risks of unprotected networks | Actions 2 and 3: flat networks, WannaCry, guest Wi-Fi |
| Critical evaluation | Action 4: limits of checklists, tools, scores and patching |

## Assessor Notes
*Strength*: Vulnerabilities are explained by root cause and blast radius, using your own code as well as published CVEs, and the draft evaluates the limits of common defences.
*Gaps*: The `/ask` sanitisation issue needs describing; your role needs stating.
*Watch for*: "Which vulnerability in your own code worried you most, and why?" Action 4's first point is a good answer.

## References
- OWASP (2021) *OWASP Top 10: The Ten Most Critical Web Application Security Risks*. OWASP Foundation.
- OWASP (no date) *OWASP Top 10 for Large Language Model Applications*. OWASP Foundation. [Check the current edition and date before citing.]
