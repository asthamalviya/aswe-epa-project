# B7: Awareness of trends and innovations
**Assessment method**: AM2
**Module**: 3 (Multiverse Project 1: Cybersecurity & Software Development), with sources from Modules 2, 5 and 6
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Security review of a UK government registry's network
**Status**: Draft
**Related**: `../../by-ksb/leading-and-working-together.md`, section A5, covers how trends shape **team** practice. This piece covers the **sources and trends** themselves, and their business value. Keep the two consistent.

## Criterion
**KSB:** Maintains awareness of trends and innovations in the subject area, utilising a range of academic literature, online sources, community interaction, conference attendance and other methods which can deliver business value.
**Pass:** Explains how teams work effectively to produce a digital and technology solution applying relevant organisational theories using up to date awareness of trends and innovations. (K8, S7, B4, B6, B7)
**Distinction:** None for this KSB.

> Guidance: B7 is a **behaviour**, so the assessor wants a habit, not one report's reference list. The KSB names four kinds of source: academic literature, online sources, community interaction and conference attendance. Module 3 draws on books, standards and case studies, but has no academic papers, community or conference input, and two of its standards are out of date. Your portfolio as a whole is broader, so section 2 shows the range across modules. Community and conferences need your real experience.

## Situation
Security threats and defences change quickly: an approach that was good practice five years ago can be a weakness now. For the registry's network review I needed current thinking on network design, threats and controls, and a way to show senior leaders why it mattered.

## Task
[EVIDENCE NEEDED: your role, in the first person.]

## Action

### 1. Trends I brought into the Module 3 review, and their business value
| Trend or innovation | What it changes | Business value for the registry |
|---|---|---|
| Zero Trust | No traffic is trusted because of where it comes from; every flow must be authorised | Limits lateral movement, the main reason WannaCry spread across flat NHS networks |
| Micro-segmentation | Splits networks into small zones with default-deny rules between them | Contains a breach to one zone, protecting the register's data |
| SIEM with security orchestration (SOAR) | Central logging, with automated incident response | Supports the proposed targets of under 10 minutes to detect and under 60 minutes to restore |
| Secure DevOps (static and dynamic security testing in the pipeline) | Moves security checks earlier in development | Finds vulnerabilities before release, when they cost least to fix |
| Hybrid cloud identity (Azure AD) and secure cloud gateways | One identity and security model across on-premises and cloud | Supports cloud adoption without creating a gap between two security models |

I used the NHS WannaCry case (2017) and HMRC and NHS firewalling practice to show the board what these trends mean in cost and service terms, not only in technical ones.

### 2. The range of sources I use
| Source type (from the KSB) | Examples across my portfolio |
|---|---|
| Academic literature | Module 5: Gao et al. (2023) on retrieval-augmented generation, Xia et al. (2017) on program comprehension, Dikert et al. (2016) on large-scale agile, Peng et al. (2023) on AI and developer productivity, Hogan et al. (2021) on knowledge graphs. Module 2: Ribeiro et al. (2016, LIME) and Lundberg and Lee (2017, SHAP) on model explainability. Module 6: Manner et al. (2018) on serverless cold starts |
| Standards and frameworks | Module 3: ISO/IEC 27001, NIST Cybersecurity Framework, OWASP Top 10, NCSC Cyber Essentials Plus. Module 6: the TLS 1.3 specification (Rescorla, 2018) |
| Online and industry sources | Module 5: Stack Overflow Developer Survey (2024). Module 3: public CVE records. Module 6: AWS documentation |
| Government and official | Module 3: National Audit Office (2018). Module 5: DSIT (2023) on AI regulation |
| Community interaction | [EVIDENCE NEEDED: e.g. meetups, NCSC or cross-government communities of practice, online communities, internal guilds] |
| Conference attendance | [EVIDENCE NEEDED: e.g. CYBERUK, AWS Summit, internal tech conferences; say what you took away from one] |

[EVIDENCE NEEDED: your regular habits, e.g. newsletters, podcasts, feeds or blogs you follow weekly, and how you decide what is worth acting on.]

### 3. Evaluating my own sources
Reviewing Module 3 against B7 shows three weaknesses I would fix:
1. **Two standards are out of date.** I cited ISO/IEC 27001:2013, which was replaced by ISO/IEC 27001:2022, and the NIST Cybersecurity Framework of 2018, which was replaced by version 2.0 in 2024. Version 2.0 adds a "Govern" function, which fits the report's emphasis on board reporting. Citing superseded versions undercuts a claim to be up to date. [Check both editions before correcting.]
2. **No academic or research sources.** The Module 3 references are textbooks (2019 to 2020) and standards. Current threat research, such as NCSC threat reports, would make the risk scores more defensible.
3. **Sources listed but not used.** Only one source is cited in the text; the rest appear only in the reference list. Awareness only has value if it shapes the analysis.

## Result
[EVIDENCE NEEDED: one example where a trend you followed changed a real decision, in your team or at the registry. This is the part B7's "deliver business value" wording asks for, and the Module 3 report does not show it.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Awareness of trends and innovations | Action 1: five trends in the review |
| Range of sources | Action 2: academic, standards, online, government [EVIDENCE NEEDED: community, conferences] |
| Delivers business value | Action 1 value column [EVIDENCE NEEDED: a real decision changed] |
| Applied to how teams work | `leading-and-working-together.md`, section A5 |
| Reflective awareness | Action 3: evaluating my own sources |

## Assessor Notes
*Strength*: A clear link from each trend to business value, and a portfolio-wide range of academic and industry sources.
*Gaps*: Community and conference evidence, a real decision a trend changed, and your ongoing habits.
*Watch for*: "What is the most recent thing you learned that changed how you work?" Have a specific, dated answer ready.
