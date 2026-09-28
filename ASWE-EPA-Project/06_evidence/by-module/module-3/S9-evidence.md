# S9: Security and resilience techniques
**Assessment method**: AM2
**Module**: 3 (Multiverse Project 1: Cybersecurity & Software Development)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Security review of a UK government registry's network, with a risk assessment and proposed controls
**Status**: Draft
**Applied counterpart**: `../module-6/` covers S9 in a system you actually built (scoped IAM, encryption enforced in code, failure scenarios). Module 3 shows the assessment method; Module 6 shows the controls in practice. Refer to both.

## Criterion
**KSB:** Apply relevant security and resilience techniques to a digital and technology solution. For example, risk assessments, mitigation strategies.
**Pass:** Demonstrates the use of core technical concepts for digital and technology solutions, including: security and resilience techniques.
**Distinction:** None for this KSB.

> Guidance: S9 is a skill, so "apply" matters. Module 3 applies a risk assessment method, which counts, but its controls are proposals and its tables are labelled "illustrative". This draft keeps the method, adds the reasoning the report leaves out, and includes an honest critique of your own risk scores, which is the strongest sign that you can use the technique rather than just fill in a template.

## Situation
The registry holds sensitive corporate data and runs a largely flat network, so a single compromised device could give an attacker access to much of the estate. Public-sector precedent shows the cost: the WannaCry ransomware, which spread through the EternalBlue exploit, disrupted the NHS in 2017.

## Task
[EVIDENCE NEEDED: your role in the review, in the first person, and who the findings were for.]

## Action

### 1. Risk assessment
I assessed five risks on a 5 × 5 matrix, scoring likelihood and impact from 1 (low) to 5 (high) and multiplying them to give severity:

| Risk | What could happen | L | I | Score | Level | Why I scored it this way |
|---|---|---|---|---|---|---|
| Weak separation between DMZ and internal networks | Data exposure; lateral movement across the estate | 5 | 5 | 25 | Critical | [EVIDENCE NEEDED: e.g. "the network is flat today, so any foothold reaches internal systems"] |
| Phishing and social engineering | Credential theft; initial access | 4 | 4 | 16 | High | [EVIDENCE NEEDED] |
| Unencrypted data at rest or in transit | Interception; UK GDPR breach | 3 | 5 | 15 | High | [EVIDENCE NEEDED] |
| Weak endpoint security | Malware; ransomware | 3 | 3 | 9 | Moderate | [EVIDENCE NEEDED] |
| Guest Wi-Fi shared with the internal network | Breach of internal systems | 2 | 3 | 6 | Low | [EVIDENCE NEEDED] |

### 2. Linking risks to known exploits
To ground the risks in real attacks, I mapped them to three published vulnerabilities:

| Vulnerability | Component | Effect | Mitigation |
|---|---|---|---|
| CVE-2017-0144 (EternalBlue) | Windows SMBv1 | Self-spreading remote code execution; used by WannaCry | Patch; disable SMBv1; segment the network |
| CVE-2021-26855 (ProxyLogon) | Microsoft Exchange | Authentication bypass leading to remote code execution | Patch; monitor for indicators of compromise; EDR |
| CVE-2021-41773 | Apache HTTP Server | Path traversal: file disclosure and remote code execution | Patch; web application firewall; input validation |

EternalBlue shows why segmentation matters as much as patching: an unpatched machine on a flat network lets a worm spread everywhere, while segmentation contains it to one zone.

### 3. Mitigation strategy
I prioritised controls by risk score, so the critical risk is treated first:

| Risk | Security techniques | Resilience techniques |
|---|---|---|
| Weak separation (25) | Five VLANs with a default-deny allowlist between zones; next-generation firewalls with intrusion detection and prevention; micro-segmentation | High-availability firewall pair, so enforcing the rules does not create a single point of failure |
| Phishing (16) | Staff training, phishing simulations, secure email gateway; multi-factor authentication and role-based access so a stolen password alone is not enough | Privileged access management and periodic access reviews to limit the damage from one compromised account |
| Unencrypted data (15) | TLS 1.3 in transit, database encryption at rest, VPN for remote access | Encrypted, replicated databases |
| Endpoint security (9) | Endpoint detection and response, regular updates, hardening, network access control | SIEM and SOAR for fast detection and automated response |
| Guest Wi-Fi (6) | Separate, isolated VLAN | — |

Across the estate, I added resilience that does not depend on any single control succeeding:
- **Backups:** the 3-2-1 rule (three copies, two types of media, one off site) at a disaster recovery site, so ransomware cannot destroy every copy.
- **Redundancy:** high-availability load balancers and firewalls, and replicated databases.
- **Secure development:** static and dynamic application security testing in the pipeline, OWASP Top 10 training, and peer review of critical changes, so fewer vulnerabilities reach production.

### 4. Measuring whether the controls work
I set targets to track the controls over time: critical vulnerabilities fixed within 7 days, patch compliance within 14 days of release, under 10 minutes to detect an incident, under 60 minutes to restore service, and 99.95% monthly uptime. Phishing simulation click rates track whether training works.

## Evaluating my own risk assessment
Reviewing the matrix now, I would change three things:
1. **Guest Wi-Fi is under-scored.** I rated its impact 3, but its consequence, "breach of internal systems", is as serious as the critical risk. On a flat network it is a route to the same lateral movement. Its impact should be 5, giving a score of 10 rather than 6.
2. **Patching has no row of its own.** The report says the registry is "most exposed to segmentation weaknesses and unpatched systems", and all three CVEs are patching failures, yet unpatched servers only appear indirectly under endpoints. A separate patch management risk would make the matrix match the analysis.
3. **No residual risk.** The matrix scores each risk before controls, but not after. Adding a residual score would show which controls reduce risk most for their cost, which is what a board needs to decide what to fund first.

[EVIDENCE NEEDED: whether you agree with these changes; revise the matrix in the report if you do.]

## Result
[EVIDENCE NEEDED: what happened to the review, e.g. shared with the security team, specific controls adopted, or not taken forward. If nothing was implemented, say so and point to Module 6 for applied controls.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Risk assessment | Action 1: 5 × 5 likelihood and impact matrix |
| Threat intelligence | Action 2: risks mapped to real CVEs |
| Mitigation strategies | Action 3: controls prioritised by risk score |
| Resilience techniques | Action 3: high availability, replication, 3-2-1 backups, SIEM and SOAR |
| Measuring effectiveness | Action 4: remediation, detection and uptime targets |
| Critical use of the technique | Evaluating my own risk assessment |

## Assessor Notes
*Strength*: A complete risk-to-control chain with real CVEs, prioritisation and measurable targets, plus self-critique of the scores.
*Gaps*: Score rationales; your role; what was implemented. Module 6 must carry the "applied in practice" part of S9.
*Watch for*: expect "why is phishing only 4 for likelihood?" and "what is the residual risk after segmentation?"
