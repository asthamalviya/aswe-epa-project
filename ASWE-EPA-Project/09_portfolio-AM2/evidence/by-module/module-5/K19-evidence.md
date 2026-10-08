# K19: Legal, ethical, social and professional standards
**Assessment method**: AM2
**Module**: 5 (Multiverse Project 5: Managing Software Transformation Projects)
**Date of the work**: [EVIDENCE NEEDED: month and year of the proposal]
**Context**: Proposal for an AI knowledge search system (retrieval-augmented generation) for developers at a UK government registry
**Status**: Draft
**Also supports**: S15 (same shared criterion)

## Criterion
**Pass:** Applies relevant legal, ethical, social and professional standards to digital and technology solutions considering both technical and non-technical audiences and in line with organisational guidelines. (K19, S15, B1, B2)
**Distinction:** Justifies the application of relevant legal, ethical, social and professional standards to digital and technology solutions. (K19, S15)

## Situation
Developers at a UK government registry lose delivery time searching for knowledge spread across six documentation platforms. I proposed an AI knowledge search system to fix this. Because the system would index internal engineering knowledge and use a large language model, it had to meet data protection law, the registry's security rules and UK government guidance on responsible AI before it could be approved.

## Task
The proposal names me as owner of the discovery and ethics governance workstream (Sprints 1 to 2), the core retrieval engine (Sprints 4 to 7) and [EVIDENCE NEEDED: confirm, e.g. "the compliance risk for security-cleared data"]. My responsibility for standards was to [EVIDENCE NEEDED: your own words, e.g. "choose an architecture that kept data within UK jurisdiction and set up the AI ethics sign-off"].

## Action
**Legal: UK GDPR and the Data Protection Act 2018.** I made data protection one of four weighted criteria (25%) in the decision matrix used to choose the solution. I rejected the off-the-shelf products (Glean, Guru) partly because they process data on third-party infrastructure, which would have required a full data protection assessment that did not fit the six-month timeline. I chose a self-hosted vector database (ChromaDB) so the indexed content stays inside the registry's infrastructure, and Azure OpenAI for the primary model because Azure is already in the registry's procurement framework with UK data residency. [EVIDENCE NEEDED: confirm the Azure region and data processing terms. The module also says "no data leaves the boundary", which is not accurate for an Azure-hosted model: state it as "data processed in a UK region under the registry's existing Azure agreement" if that is true.]

**Organisational guidelines: security classification.** I identified the risk that security-cleared (SC) repositories could be indexed by accident and planned to avoid it by excluding those repositories in the indexing configuration at Sprint 0, with data flow diagrams reviewed by the registry's security team. [EVIDENCE NEEDED: did this review happen, and what did it change?]

**Ethical: UK government AI principles.** I applied three of the principles in the government's AI regulation white paper (DSIT, 2023) as design rules:
- *Transparency:* every answer cites its source platform and date, so developers can see exactly what was retrieved.
- *Accountability:* the registry's Technical Architects panel owns governance, a full audit trail is kept, and the sponsor signs off before production release.
- *Fairness:* no demographic data is indexed, and the system retrieves and cites existing documentation rather than generating guidance on its own. [EVIDENCE NEEDED: what "sex and racial bias explicitly considered" meant in practice: what you checked and what you found.]

**Professional: governance sign-off.** I made AI ethics sign-off by the Technical Architects panel a SMART acceptance criterion for the discovery deliverable, so the system could not progress without it.

**Technical and non-technical audiences.** I tailored how I presented these standards to each stakeholder group using the Elaboration Likelihood Model (Petty and Cacioppo, 1986) and the Minto Pyramid (Minto, 1996). For the Technical Architects panel I led with evidence that data stays within the registry's infrastructure. For Finance I framed the same point as "fully governed". For permanent staff and end users, who are less likely to engage with compliance detail, I focused on credit for their knowledge and on-time delivery. [EVIDENCE NEEDED: did you present this? To whom, and what was the response?]

## Result
[EVIDENCE NEEDED: what happened to the proposal, e.g. "the Technical Architects panel approved the architecture", "security review accepted the data flow", or "not yet approved; decision due in ...". If it was not delivered, say so plainly.]

## Justification (Distinction)
I chose standards-driven controls over the alternatives for three reasons:
1. **Self-hosting against off-the-shelf products.** Off-the-shelf search products scored 3/10 on data protection because content leaves the registry. Self-hosting scored 10/10 and avoided a third-party data protection assessment that would have delayed delivery beyond the six-month plan. The trade-off is that the team must run and secure the infrastructure itself, which I accepted because [EVIDENCE NEEDED: your reason].
2. **Retrieval against fine-tuning.** Retrieval with citations keeps answers traceable to the registry's own governed documentation, which supports transparency and accountability. A fine-tuned model would hide where answers come from and would need retraining whenever documentation changes.
3. **Monitoring regulation that is still evolving.** UK AI regulation is not yet binding, so I added the regulatory landscape to the risk register for fortnightly review. That way, a future legal obligation triggers an architecture review rather than a late redesign.

[EVIDENCE NEEDED: one alternative control you considered and rejected for a standards reason, e.g. anonymising content before indexing, or a human approval step for every answer, and why.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Applies legal standards | Action: UK GDPR weighted in the decision matrix; self-hosted index; UK data residency |
| Applies ethical standards | Action: three DSIT principles turned into design rules |
| Applies social standards | Action: fairness pillar (no demographic data) [EVIDENCE NEEDED: strengthen with accessibility or inclusion if applicable] |
| Applies professional standards | Action: governance sign-off as an acceptance criterion; audit trail |
| Technical and non-technical audiences | Action: ELM and Minto tailoring by stakeholder group |
| In line with organisational guidelines | Action: SC repository exclusion; security review of data flows; existing procurement framework |
| Distinction: justifies the application | Justification: three trade-offs with reasons and alternatives |

## Assessor Notes
*Strength*: Standards are tied to concrete design decisions (decision matrix weighting, self-hosting, citation layer, sign-off gate) and each has a stated reason.
*Gaps*: This is a proposal. The assessor will ask what was actually implemented and approved, so the Result section decides whether K19 is "applied" or only "planned". The DSIT white paper sets out five principles; the evidence uses three, so be ready to explain why safety and contestability were left out, or add them. First-person ownership depends on the Task section being confirmed.
*To reach Distinction*: Add the rejected alternative control in the Justification section, and correct the two inaccuracies below.

## Corrections needed in the Module 5 submission
- The PESTLE says "UK GDPR Article 44-49 restricts data processing to UK jurisdiction". Articles 44 to 49 restrict **international transfers** of personal data to countries without adequacy regulations or appropriate safeguards. They do not require processing to stay in the UK. Reword to: "UK GDPR Chapter V (Articles 44 to 49) restricts transfers of personal data outside the UK without adequate safeguards; keeping processing in UK infrastructure avoids that risk."
- "No data leaves CH boundary" conflicts with using GPT-4o via Azure OpenAI. See the placeholder in Action.

## References
- Department for Science, Innovation and Technology (2023) *A pro-innovation approach to AI regulation*. London: DSIT.
- Minto, B. (1996) *The Pyramid Principle: Logic in Writing and Thinking*. London: FT Prentice Hall.
- Petty, R.E. and Cacioppo, J.T. (1986) 'The elaboration likelihood model of persuasion', *Advances in Experimental Social Psychology*, 19, pp. 123–205.
- UK GDPR (Regulation (EU) 2016/679 as retained in UK law) and the Data Protection Act 2018.
