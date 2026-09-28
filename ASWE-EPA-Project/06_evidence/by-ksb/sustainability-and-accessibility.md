# Sustainability, Diversity and Accessibility: Portfolio Evidence

**Assessment method:** AM2 (professional discussion underpinned by portfolio)
**KSBs:** K20, B8
**Target length:** 900 to 1,100 words, excluding guidance notes and the mapping table
**Organisation:** referred to throughout as "a UK government registry"

> **How to use this scaffold.** Replace every `[EVIDENCE NEEDED: ...]` with a real fact from your own work. Delete every `> Guidance` block before submitting. If you cannot fill a placeholder truthfully, delete the sentence: the assessor will probe every claim in the 60-minute discussion. Write "I", not "we", and give a number wherever you can.

---

## Criteria this piece must meet

| Level | Official wording | KSBs |
|---|---|---|
| Pass | Explains sustainable development approaches within digital technologies as they relate to their role including diversity and inclusion. | K20, B8 |
| Distinction | Evaluates the impact of sustainable digital technology practices of their organisation. | K20 |

**KSB statements:**
- **K20:** Sustainable development approaches as applied to digital and technology solutions such as green computing.
- **B8:** Champions diversity and inclusion in their work ensuring that digital technology solutions are accessible.

K20 is one of only four AM2 KSBs with a Distinction criterion, and your current evidence has none. Part C is where the Distinction is won: it asks you to **evaluate impact**, not describe intentions.

---

## Context: my role and the solution

I work as a [EVIDENCE NEEDED: job title] at a UK government registry, where I [EVIDENCE NEEDED: what you build or run]. The solution this piece focuses on is [EVIDENCE NEEDED: system name described generically, e.g. "an internal AI knowledge assistant hosted on AWS"], used by [EVIDENCE NEEDED: users and number, e.g. "around 200 internal staff" or "the public"].

> Guidance: about 80 words. Your Module 6 AWS build (Lambda, API Gateway, Terraform) is the easiest base for Parts A and C if it runs in a real environment. If it is only a portfolio build, say so and use a live system you work on instead.

---

## Part A: Sustainable development approaches in my work (K20)

### A1. The approach I apply

> Guidance: name one framework and use its language. Candidates:
> - **Green Software Foundation principles:** carbon efficiency, energy efficiency, carbon awareness, hardware efficiency, measurement and demand shaping.
> - **Software Carbon Intensity (SCI) specification**, published as ISO/IEC 21031:2024: a rate of carbon per functional unit, e.g. per request or per user.
> - **AWS Well-Architected Framework, Sustainability Pillar** (2021): good if your system runs on AWS.
> - **Greening Government: ICT and Digital Services Strategy 2020–2025** (Defra): the UK government's own commitments, which makes the link to your organisation direct.

At a UK government registry, sustainability in digital services is shaped by [EVIDENCE NEEDED: organisational policy or government strategy that applies, e.g. "the Greening Government ICT strategy" or an internal net zero commitment]. In my role, I apply [EVIDENCE NEEDED: framework and citation] when I [EVIDENCE NEEDED: the decisions it affects, e.g. "choose compute, storage and scheduling for new services"].

### A2. A green computing decision I made

When [EVIDENCE NEEDED: situation], I [EVIDENCE NEEDED: specific action]. Examples to choose from if true:

> Guidance: pick one or two you actually did.
> - Right-sized over-provisioned compute, or moved a steady workload to ARM-based instances (e.g. AWS Graviton), which AWS reports use less energy for the same work.
> - Replaced always-on servers with serverless or scheduled scale-down for non-production environments outside working hours.
> - Set S3 lifecycle rules to move or delete data no longer needed.
> - Reduced model size, e.g. choosing a smaller language model where accuracy allowed (your M5 PESTLE mentions Llama 8B energy use).
> - Cut unnecessary data transfer, logging volume or build pipeline runs.

I chose this because [EVIDENCE NEEDED: reasoning, including any trade-off such as cost, performance or data residency]. The effect was [EVIDENCE NEEDED: measured result, e.g. "compute hours down from X to Y per month", "storage down Z GB", or cost as a proxy if carbon data is not available].

### A3. How diversity and inclusion relate to sustainable development (K20)

> Guidance: the Pass criterion explicitly includes diversity and inclusion. Social sustainability covers who can use a service and who builds it. Link one real example here, then go deeper in Part B.

Sustainable digital services must also be socially sustainable: usable by everyone and built by teams that reflect their users. In my work, this means [EVIDENCE NEEDED: one concrete link, e.g. "designing for users with low digital skills" or "reviewing an AI model for bias across groups"].

---

## Part B: Championing diversity, inclusion and accessibility (B8)

### B1. Making a solution accessible

> Guidance: public sector websites and apps must meet the Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018, which point to WCAG 2.1 AA. GDS now asks services to meet WCAG 2.2 AA. The Government Service Standard point 5 is "Make sure everyone can use the service". Use whichever applies to your system.

For [EVIDENCE NEEDED: solution], I made sure [EVIDENCE NEEDED: accessibility standard, e.g. "WCAG 2.2 AA"] was met by [EVIDENCE NEEDED: actions, e.g. "running axe and Lighthouse checks in the CI pipeline", "testing with NVDA and VoiceOver", "fixing colour contrast and keyboard focus order"].

I found [EVIDENCE NEEDED: number and type of issues, e.g. "17 issues, 4 of them blocking for screen reader users"] and [EVIDENCE NEEDED: what you fixed and how you know it worked].

### B2. Championing beyond my own code

"Champions" means influencing others, not only doing it yourself. I [EVIDENCE NEEDED: action that changed team or organisational practice, e.g. "added an accessibility check to our definition of done", "ran a session on inclusive design", "joined the accessibility community of practice", "pushed for user research with disabled users"]. As a result, [EVIDENCE NEEDED: effect, e.g. "the team now blocks merges on accessibility test failures"].

### B3. Inclusion in how I work or what I build (optional, strengthens B8)

> Guidance: pick one if true.
> - Bias checks on an AI or data product (M2 mentions reviewing misclassifications; M5 mentions sex and racial bias). Explain what you checked, what you found and what changed.
> - Plain English content, or support for users with low digital confidence (GOV.UK style guide).
> - Inclusive team practice, e.g. meeting norms, documentation for neurodivergent colleagues, mentoring someone from an under-represented group.

I [EVIDENCE NEEDED: action] because [EVIDENCE NEEDED: reason]. This [EVIDENCE NEEDED: outcome].

---

## Part C: Evaluating my organisation's sustainable technology practices (K20 Distinction)

> Guidance: Distinction requires **evaluation of impact at organisation level**, not only your team. Structure it as evidence, judgement, limitation and recommendation. Aim for about 300 words.

**What the organisation does.** A UK government registry [EVIDENCE NEEDED: its actual practices, e.g. "reports ICT emissions under the Greening Government Commitments", "is migrating from on-premises data centres to cloud", "has a device reuse and recycling policy"].

**Evidence of impact.** [EVIDENCE NEEDED: data you can cite, e.g. "the AWS Customer Carbon Footprint Tool shows X tCO2e for our account over 12 months", an internal sustainability report, cloud migration figures, device lifecycle data. If no data exists, say so: that absence is itself an evaluation point.]

**My judgement.** These practices are [EVIDENCE NEEDED: effective or limited] because [EVIDENCE NEEDED: reasoning]. For example:

> Guidance: points you could test against your organisation's reality.
> - Cloud migration usually lowers operational emissions, but carbon tools often exclude or estimate embodied (manufacturing) emissions, so savings can be overstated.
> - Data residency rules can force a UK region, which limits the choice of lower-carbon regions: a real trade-off between compliance and carbon.
> - Cost optimisation and carbon reduction often align, but not always (e.g. reserved capacity lowers cost but can lock in idle resources).
> - Without measurement at service level (e.g. SCI per request), teams cannot see the carbon effect of their own decisions.

**Recommendation.** I recommend [EVIDENCE NEEDED: one specific, feasible improvement, e.g. "adding SCI per request to our service dashboards"], which would [EVIDENCE NEEDED: expected benefit and how it could be measured].

---

## Reflection

Working on this made me realise [EVIDENCE NEEDED: honest insight]. Next, I will [EVIDENCE NEEDED: specific action with a date].

---

## References

> Guidance: keep only the sources you actually cite, in Harvard style. Check each entry, date and URL before submitting.

- Amazon Web Services (2021) *AWS Well-Architected Framework: Sustainability Pillar*. Available at: https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/ (Accessed: [date]).
- Department for Environment, Food and Rural Affairs (2020) *Greening Government: ICT and Digital Services Strategy 2020–2025*. London: Defra.
- Government Digital Service (no date) *Service Standard: 5. Make sure everyone can use the service*. Available at: https://www.gov.uk/service-manual/service-standard (Accessed: [date]).
- Green Software Foundation (no date) *Principles of Green Software Engineering*. Available at: https://learn.greensoftware.foundation/ (Accessed: [date]).
- ISO/IEC 21031:2024 *Information technology: Software Carbon Intensity (SCI) specification*. Geneva: ISO.
- The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (SI 2018/952).
- W3C (2023) *Web Content Accessibility Guidelines (WCAG) 2.2*. Available at: https://www.w3.org/TR/WCAG22/ (Accessed: [date]).

---

## KSB mapping

| Section | KSB | Element of the criterion it evidences |
|---|---|---|
| Context | K20, B8 | Establishes my role, so the approaches can be related to it |
| A1 | K20 | Sustainable development approach explained in relation to my role |
| A2 | K20 | Green computing applied to a digital solution, with a measured result |
| A3 | K20 | Diversity and inclusion as part of sustainable development |
| B1 | B8 | Ensuring a digital solution is accessible |
| B2 | B8 | Championing: changing team or organisational practice |
| B3 | B8 | Diversity and inclusion in my work |
| C | K20 (Distinction) | Evaluation of the impact of my organisation's sustainable technology practices |
| Reflection | K20, B8 | Next steps |

---

## Before submitting

- [ ] No `[EVIDENCE NEEDED]` left: each one is filled truthfully or its sentence is deleted
- [ ] All `> Guidance` blocks deleted
- [ ] Part A has at least one measured result (energy, compute hours, storage or cost)
- [ ] Part C evaluates (evidence, judgement, limitation, recommendation), not only describes
- [ ] "I" throughout; "we" only for genuinely shared outcomes
- [ ] The organisation appears only as "a UK government registry"; no colleague names
- [ ] Update `06_evidence/ksb-coverage-tracker.md` with this file for K20 and B8
