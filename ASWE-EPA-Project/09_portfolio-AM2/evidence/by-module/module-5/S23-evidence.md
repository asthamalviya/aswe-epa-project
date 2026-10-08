# S23: Research to extend knowledge, inform best practice and lead improvements
**Assessment method**: AM2
**Module**: 5 (Multiverse Project 5: Managing Software Transformation Projects)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Proposal for an AI knowledge search system for developers at a UK government registry
**Status**: Draft

## Criterion
**KSB:** Extend and update software development knowledge with evidence from professional and academic sources by undertaking appropriate research to inform best practice and lead improvements in the organisation.
**Pass:** Describes how they extend and update software development knowledge with evidence from professional and academic sources by undertaking appropriate research to inform best practice and lead improvements in the organisation. (S23/SES8)
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** show how you extend and update your knowledge from professional and academic sources; show how research informs best practice and leads improvements in the organisation; discuss how this contributes to those improvements.

> Guidance: Module 5 is your strongest S23 evidence: every major decision cites research, and the whole proposal is an improvement you initiated. Two gaps remain. The report shows research **supporting** decisions but not **how you researched** (how you found and judged sources). And it does not say whether the improvement happened. Section 4 also flags citations to check: for a KSB about evidence, citing a source for something it does not say is the most damaging error possible.

## Situation
Developers on the registry's delivery team raised a timeboxed investigation ("spike") at the start of every feature just to understand the existing system. Delivery records showed spikes of 3 to 5 days on all 8 features in the previous 12 months, and 6 of the 8 features needed an extra sprint. I suspected the cause was knowledge scattered across six platforms, and used research to test that, then to choose a solution.

## Task
[EVIDENCE NEEDED: your role, in the first person. The report says the proposal comes from the Technical Lead role; confirm it was yours and who you proposed it to.]

## Action

### 1. How I researched
[EVIDENCE NEEDED: describe your process in two or three sentences, e.g. where you searched (Google Scholar, IEEE Xplore, ACM Digital Library, industry reports), which search terms you used, and how you decided a source was credible (peer review, recency, sample size, independence from vendors).]

I used three kinds of evidence, each for a different purpose:

| Evidence type | Sources | What I used it for |
|---|---|---|
| Internal evidence | Jira delivery records; stakeholder interviews; direct observation; process mapping | Proving the problem exists here and measuring its size |
| Academic research | Gao et al. (2023) on retrieval-augmented generation; Souza et al. (2024) and Kianto et al. (2019) on knowledge management; Xia et al. (2017) on program comprehension; Dikert et al. (2016) on agile transformation; Hogan et al. (2021) on knowledge graphs; Peng et al. (2023) on AI and developer productivity | Understanding the causes and comparing solutions |
| Professional and industry sources | McKinsey Global Institute (2012); Stack Overflow Developer Survey (2024); DSIT (2023) on AI regulation; the Scrum Guide; BABOK v3; ISO 31000; PMI guidance | Benchmarks, regulatory context and established practice |

### 2. How research changed my knowledge and my decisions
| Decision | What the research showed | What I decided |
|---|---|---|
| Is the problem systemic or local? | Knowledge management is a primary productivity problem in software organisations (Souza et al., 2024; Kianto et al., 2019); knowledge workers spend about 19% of their week searching for information (McKinsey Global Institute, 2012) | Treat it as a structural problem, not a team failing |
| Fine-tune a model, or use retrieval? | Fine-tuning needs heavy compute, can override retrieved facts and needs retraining as documents change; retrieval answers from current documents (Gao et al., 2023) | Retrieval-augmented generation |
| Keyword search or semantic search? | [EVIDENCE NEEDED: see section 4, point 1, before relying on Xia et al. here] | Vector (semantic) search |
| A knowledge graph instead? | Powerful for structured domains, but needs manual curation (Hogan et al., 2021) | Rejected for a fast-changing, unstructured knowledge base; I evaluated it deliberately as a contrarian option |
| Will developers trust AI answers? | Developers are sceptical of AI without visible sources (Stack Overflow, 2024) | Mandatory source citation in every answer |
| Which delivery method? | Large organisations often adopt agile in name while working sequentially (Dikert et al., 2016) | Adapted Scrum, designed around how the registry actually works |

### 3. Leading an improvement in the organisation
The proposal itself is the improvement: I identified a structural barrier from direct observation, confirmed it with delivery data and research, and proposed a solution with a costed business case (£12,100 additional cost) and measurable targets (spikes under one day; 80% or higher retrieval accuracy; a developer trust score of 4.0 out of 5). [EVIDENCE NEEDED: what happened next: presented to whom, the decision, and anything already changed as a result. "Lead improvements" is the part of S23 the assessor will probe.]

## Evaluating my research
1. **Check two citations before relying on them.** *(This is from my own knowledge of the sources, not from your report, so verify it.)*
   - Xia et al. (2017) studied how much time professional developers spend on **program comprehension** (the widely quoted finding is around 58%). As far as I know, it does not give a "20 to 30%" figure for searching, and it does not show that search fails because of "semantic mismatch". If so, both uses in the report misattribute it.
   - Peng et al. (2023) is a controlled experiment in which developers using GitHub Copilot completed a task faster. It does not, as far as I know, show that AI tools work best "when grounded in specific organisational context".

   For S23 in particular, a citation that does not support the claim is worse than no citation. Recheck both papers and reword or remove.
2. **Research used to confirm or to decide?** Most sources in the report support the chosen solution. Say how you guarded against looking only for evidence that agreed with you; the knowledge-graph evaluation is a good example of testing an alternative.
3. **Recency.** The McKinsey figure is from 2012. Look for a more recent estimate, or say why the older one still holds.

## Result
[EVIDENCE NEEDED: the outcome of the proposal, and one thing you now do differently because of this research.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Extends and updates knowledge | Action 2: what I learned from each source |
| Professional and academic sources | Action 1 table |
| Appropriate research | Action 1 [EVIDENCE NEEDED: your research process] |
| Informs best practice | Action 2: research-led decisions |
| Leads improvements in the organisation | Action 3 [EVIDENCE NEEDED: what happened] |

## Assessor Notes
*Strength*: Every major design decision is tied to a source, and a contrarian alternative was evaluated deliberately.
*Gaps*: Your research process; whether the improvement was adopted; two citations to verify.
*Watch for*: "How did you know that source was reliable?" Section 1's placeholder is your answer.
