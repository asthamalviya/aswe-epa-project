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

### A2. Green computing decisions I made

#### Example 1: Module 5, AI knowledge search proposal

> Guidance: Example 1 is drafted from the Module 5 proposal and Example 2 from the Module 6 build. Every claim comes from the module text; fill the placeholders and remove anything that did not happen. Example 2 is the stronger one because it has costed figures and an honest trade-off.

In my proposal for an AI knowledge search system for developers at a UK government registry, I made three design choices that reduce the compute, and so the energy, the system needs:

1. **Retrieval rather than fine-tuning.** I chose retrieval-augmented generation over fine-tuning a model on the registry's documentation. Fine-tuning needs significant GPU compute to train, and would have to be repeated every time the documentation changed. Retrieval indexes documents once and updates the index as content changes, so the heavy compute happens once rather than on every documentation update. [EVIDENCE NEEDED: an estimate of the training compute avoided, or a source that quantifies it.]
2. **A small open-source model.** I specified Llama 3.1 8B, which needs far less compute per query than large commercial models. [EVIDENCE NEEDED: which model handles most queries. The PESTLE calls Llama 8B the default, but the architecture table makes GPT-4o via Azure the primary model and Llama the fallback. If GPT-4o is primary, the energy saving only applies when the fallback is active, so say that honestly.]
3. **Reusing existing infrastructure.** The vector database is self-hosted inside the registry's existing infrastructure, and the model runs on Azure, which is already in the registry's procurement framework, so the project adds no new dedicated hardware. [EVIDENCE NEEDED: confirm ChromaDB runs on existing servers rather than new ones.]

I made these choices because the registry has government sustainability obligations, and because in each case the lower-compute option also cost less: the whole build needed only £12,100 of additional spend. The trade-off is accuracy: a smaller model may give weaker answers, so the 50-query benchmark (80% recall or higher) decides whether the small model is good enough. [EVIDENCE NEEDED: any measured result, e.g. benchmark recall for Llama 8B versus GPT-4o, compute or cost per query. If the system was not built, state that these are design decisions and how you would measure their effect.]

#### Example 2: Module 6, cloud AI governance assistant on AWS

For the AI governance and knowledge assistant I built on AWS, I estimated the monthly running cost of the minimum viable product at $41.12, and used cost as a proxy for resource use because the build had no carbon data. [EVIDENCE NEEDED: if the AWS account has the Customer Carbon Footprint Tool enabled, add its figure here; a carbon number is stronger than a cost proxy.]

Three decisions reduced the resources the system consumes:

1. **No dedicated GPU.** I compared a self-hosted model (Llama 3 or Mistral) with a hosted API. Self-hosting needs GPU infrastructure at $200 to $400 a month, running whether or not anyone is using the tool. I chose the hosted API, which shares the provider's existing hardware, and kept the AI layer isolated in one service file so the provider can change later without touching the rest of the code.
2. **Short log retention.** I set CloudWatch log retention to 90 days, which meets the governance requirement without storing logs indefinitely. [EVIDENCE NEEDED: confirm 90 days came from a governance rule, and name it.]
3. **A small container image.** I used the python:3.12-slim base image, producing a 187 MB container, which keeps build, storage and transfer overhead low.

**A trade-off I would revisit.** I chose an always-on EC2 t3.medium instance ($30.37 a month) over Lambda, which scales to zero when idle, because AI summarisation of large documents risked exceeding Lambda's 15-minute timeout and an always-on instance matched local development exactly. For an internal tool used mainly in working hours, this means the instance runs idle most of the week: at [EVIDENCE NEEDED: real usage hours, e.g. 50] hours of use a week, it is idle for about [EVIDENCE NEEDED: e.g. 70%] of its 168 hours. Since the 500-token response limit already keeps summarisation well inside Lambda's timeout, and the design is stateless, I would now either schedule the instance to stop outside working hours or move it to Lambda. [EVIDENCE NEEDED: whether you did either, and the result.]

**Proposed improvements.** Response caching with ElastiCache would cut repeated calls to the AI API by an estimated 40%, and S3 Intelligent-Tiering would cut storage costs by an estimated 30%. Both reduce resource use as well as cost. [EVIDENCE NEEDED: were these implemented?]

> Guidance: check which AWS region the build runs in. The $30.37 figure matches t3.medium on-demand pricing in US East (N. Virginia), not London. If the instance is in a US region, say so and explain it: data residency and grid carbon intensity both depend on region, which is a strong point for Part C. *(This is an inference from the price, so verify it.)*

### A3. How diversity and inclusion relate to sustainable development (K20)

> Guidance: the Pass criterion explicitly includes diversity and inclusion. This draft uses only what your modules show. The examples are about **who can use** the technology; none is about **who builds** it, so the last paragraph needs your own experience. Part B then covers accessibility and championing in more depth (B8).

Sustainable development means meeting present needs without compromising the ability of future generations to meet theirs (WCED, 1987), and that includes social as well as environmental sustainability. In digital services, a system is only socially sustainable if everyone who needs it can use it and it treats the people and organisations it affects fairly. Otherwise it creates workarounds, exclusion and eventually replacement. In my role, this has shaped my work in three ways:

1. **Designing for people with different technical skills.** In the cloud ETL proof of concept (Module 4), analysts and caseworkers depended on specialist technical colleagues to access data held in Oracle systems. I designed secure self-service access so non-technical users could query data themselves within least-privilege controls. In the AI governance assistant (Module 6), I planned for staff used to drag-and-drop file shares: a four-week parallel run and onboarding sessions structured with ADKAR (Hiatt, 2006), so less confident users were not left behind or pushed into untracked workarounds. The same design replaced a perimeter security model that did not work for remote workers with identity-based access. [EVIDENCE NEEDED: did these happen, and what was the uptake?]
2. **Fairness in AI.** In the dissolution risk model (Module 2), I avoided biased proxy features, reviewed misclassification patterns across company types, industries and geographic areas, and recorded possible sector bias as a known limitation with monitoring to track fairness over time. Unfair predictions would fall hardest on particular regions or types of small business, and on the people who run them. [EVIDENCE NEEDED: what the misclassification review found, e.g. whether any region or sector was misclassified more often, and what you changed.]
3. **Fair access to knowledge.** The knowledge search proposal (Module 5) targets knowledge silos, which disadvantage new joiners most because they lack the informal networks that longer-serving colleagues rely on. Making knowledge searchable lets new joiners self-serve, and crediting the original authors in every answer recognises the expertise of permanent staff rather than replacing it.

[EVIDENCE NEEDED: one example about the diversity of **who builds** the technology, from your own experience, e.g. mentoring a colleague from an under-represented group, inclusive team practices, or inclusive recruitment. If you have none, say how you would contribute, and cover it in Part B.]

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

> Guidance: the Distinction asks you to **evaluate the impact** of your organisation's practices, not describe them. This draft builds the evaluation from what your seven modules show about the registry's technology, and leaves the organisation's own published data as placeholders. The five evaluation points are judgements for you to test: keep the ones you agree with and can defend in the discussion, and delete the rest. Aim for 350 to 450 words once filled.

### C1. What the organisation does

As a public body, the registry falls under the Greening Government Commitments, which require government organisations to reduce emissions and report on ICT and digital sustainability, supported by the Greening Government ICT and Digital Services Strategy 2020–2025 (Defra, 2020). [EVIDENCE NEEDED: confirm the registry reports under these commitments, and add what it publishes, e.g. the sustainability section of its annual report and any ICT energy or waste figures.]

In practice, the registry's main technology direction is moving from on-premises systems to cloud. My modules show this at several levels: legacy Oracle databases hosted on-premises (Module 4), a Windows file share replaced by cloud storage (Module 6), and a five-year plan to move the legacy stack to cloud-native services (Module 1). [EVIDENCE NEEDED: any explicit sustainability policy for digital services, e.g. a net zero target, sustainable procurement rules, device reuse or recycling.]

### C2. Evidence of impact

[EVIDENCE NEEDED: the best figures you can get, in this order of strength:
1. Carbon data, e.g. the AWS Customer Carbon Footprint Tool or Azure Emissions Impact Dashboard for your team's accounts.
2. The registry's published emissions or ICT energy figures.
3. Cost figures as a proxy, e.g. Module 6's $41.12 a month.
If none exist, say so. The absence of data is itself the main evaluation point in C3.]

### C3. My evaluation

1. **The move to cloud is probably the registry's biggest sustainability gain, but it is not measured.** Large cloud data centres are generally more energy-efficient than small on-premises server rooms, so migrating is likely to cut operational emissions. However, [EVIDENCE NEEDED: whether the registry measured before-and-after energy or carbon]. Without a baseline, the organisation cannot show the impact or tell whether a migration made things better or worse.
2. **Sustainability is not part of how we make technical decisions.** Across all seven of my portfolio projects, carbon, energy use and emissions are never measured or even mentioned, and the Module 5 decision matrix weighted cost, data protection, root cause and speed, with no sustainability criterion. Where sustainability improved, it was a side effect of cutting cost, not a goal. My own work is one data point, not proof for the whole registry, but it suggests sustainability commitments made at organisation level do not reach engineering decisions. [EVIDENCE NEEDED: is this true of your wider team? Do design reviews or architecture boards ask about sustainability?]
3. **Cost optimisation and carbon reduction overlap, but not fully.** Choosing a hosted AI API over dedicated GPUs (Module 6) lowered both. But my always-on EC2 instance was justified on cost ($30.37 a month) while sitting idle outside working hours: a cheap resource can still waste energy. Cost reports alone would never flag this.
4. **Data residency limits the carbon options.** UK data protection requirements push workloads into UK regions (Module 5), which removes the option of lower-carbon regions. This is the right trade-off for personal data, but it should be a conscious decision, and non-personal workloads such as build pipelines may not need the same constraint. [EVIDENCE NEEDED: confirm which region Module 6 ran in. The cost suggests US East, which would change this point.]
5. **AI adoption is increasing compute demand.** Three of my projects (Modules 2, 5 and 6) add AI features. Each is small, but together they grow compute use, and there is no guidance I am aware of on when an AI feature is worth its energy cost. Module 5's choice of retrieval over fine-tuning shows how design choices can limit this. [EVIDENCE NEEDED: is there any registry or government guidance on AI energy use that you know of?]

### C4. Limitations of this evaluation

My evidence comes from my own team's projects, several of which were proposals or proofs of concept, and I have not seen organisation-wide carbon data. [EVIDENCE NEEDED: adjust once C2 is filled.]

### C5. Recommendation

I recommend the registry adds a sustainability criterion to technical decision-making: a line in architecture decision records and design reviews asking for the expected compute and carbon impact, backed by enabling the cloud providers' carbon reporting tools for every account. This targets the gap in point 2, costs little, and turns sustainability from a side effect of cost saving into something teams measure. Success would be measured by [EVIDENCE NEEDED: a metric, e.g. "share of architecture decision records with a sustainability section" or "carbon per request for the three AI services"].

## Reflection

Working on this made me realise [EVIDENCE NEEDED: honest insight]. Next, I will [EVIDENCE NEEDED: specific action with a date].

---

## References

> Guidance: keep only the sources you actually cite, in Harvard style. Check each entry, date and URL before submitting.

- Amazon Web Services (2021) *AWS Well-Architected Framework: Sustainability Pillar*. Available at: https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/ (Accessed: [date]).
- Hiatt, J. (2006) *ADKAR: A Model for Change in Business, Government and Our Community*. Loveland: Prosci.
- Department for Environment, Food and Rural Affairs (2020) *Greening Government: ICT and Digital Services Strategy 2020–2025*. London: Defra.
- Department for Environment, Food and Rural Affairs (2022) *Greening Government Commitments 2021 to 2025*. London: Defra. [Check the edition and date before citing.]
- Government Digital Service (no date) *Service Standard: 5. Make sure everyone can use the service*. Available at: https://www.gov.uk/service-manual/service-standard (Accessed: [date]).
- Green Software Foundation (no date) *Principles of Green Software Engineering*. Available at: https://learn.greensoftware.foundation/ (Accessed: [date]).
- ISO/IEC 21031:2024 *Information technology: Software Carbon Intensity (SCI) specification*. Geneva: ISO.
- The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (SI 2018/952).
- World Commission on Environment and Development (1987) *Our Common Future*. Oxford: Oxford University Press.
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
