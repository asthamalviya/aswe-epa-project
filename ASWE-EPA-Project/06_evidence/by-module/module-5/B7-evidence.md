# B7: Awareness of trends and innovations (AI and delivery)
**Assessment method**: AM2
**Module**: 5 (Multiverse Project 5: Managing Software Transformation Projects)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Proposal for an AI knowledge search system for developers at a UK government registry
**Status**: Draft
**Companion piece**: `../module-3/B7-evidence.md` covers security and network trends and lists the full range of sources across the portfolio. This piece covers **AI and delivery trends** and shows a **process** for staying current. Two different domains, at different points in the apprenticeship, are stronger evidence of a sustained habit than either alone, so refer to both and do not repeat the source table.

## Criterion
**KSB:** Maintains awareness of trends and innovations in the subject area, utilising a range of academic literature, online sources, community interaction, conference attendance and other methods which can deliver business value.
**Pass:** Explains how teams work effectively to produce a digital and technology solution applying relevant organisational theories using up to date awareness of trends and innovations. (K8, S7, B4, B6, B7)
**Distinction:** None for this KSB.

> Guidance: Module 5 is your strongest B7 evidence for a fast-moving field: it follows four AI trends, turns each into a design decision, and builds **ongoing monitoring** of AI regulation into the project. That last point matters most, because B7 says **maintains**. The gap is the same as Module 3: no community or conference input.

## Situation
Generative AI changed quickly during my apprenticeship: open-source models became usable on modest hardware, retrieval-augmented generation became the common pattern for grounding answers in an organisation's own documents, and UK AI regulation began to take shape. A proposal to use AI at a government registry had to reflect where the field was, not where it had been a year earlier.

## Task
[EVIDENCE NEEDED: your role, and how you kept track of these developments while writing the proposal.]

## Action

### 1. Trends I followed and how each shaped the proposal
| Trend or innovation | What it changed | Decision in the proposal | Business value |
|---|---|---|---|
| Retrieval-augmented generation over fine-tuning (Gao et al., 2023) | Models can answer from an organisation's current documents without retraining | Retrieval architecture with a citation layer | Answers stay current as documentation changes, without retraining costs |
| Capable open-source language models and vector databases (Llama 3, ChromaDB) | Self-hosting AI became feasible at low cost | Self-hosted vector index; Llama 3.1 8B as a fallback model | Keeps indexed content inside the registry and gives a zero-API-cost fallback |
| Developer attitudes to AI tools (Stack Overflow Developer Survey, 2024) | Developers are sceptical of AI answers they cannot check | Every answer cites its source platform and date | Higher trust, so the tool gets used |
| Emerging UK AI regulation (DSIT, 2023) | A principles-based approach now, with binding obligations anticipated later | Three principles built in as design rules; regulation tracked on the risk register | Lower risk of costly redesign when rules become binding |
| AI in the wider delivery lifecycle | AI moving from search into code review and testing | Phase 2 opportunity: AI-assisted code review and automated testing | A route to further productivity gains once trust is established |

I also tested a contrarian option: a knowledge graph (Hogan et al., 2021). It is powerful for structured domains, but needs manual curation that a fast-changing, unstructured knowledge base could not sustain, so I rejected it. Evaluating an alternative, rather than following the most popular trend, is part of judging trends well.

### 2. A process for staying current, not a one-off
Awareness has to be **maintained** after a report is written. I built it into the project:
- **Regulatory watch.** The UK AI regulatory landscape is a named item on the risk register, reviewed at every fortnightly sprint retrospective, because anticipated binding obligations may require architecture changes.
- **Escalation.** Any high-rated change triggers written notification to the sponsor within 48 hours.
- **Provider flexibility.** I compared GPT-4o with Claude, Gemini and Llama 3 and kept the design able to switch model, because the model market changes faster than the project timeline.

[EVIDENCE NEEDED: your own ongoing habits for AI specifically, e.g. newsletters, release notes, communities or events you follow, and one thing you learned from them in the last three months.]

### 3. Community and conferences
[EVIDENCE NEEDED: any AI-related meetup, conference, webinar, internal community of practice or online community you take part in, and what you brought back to your team. The Module 2 data science meetup could count if it covered AI.]

## Evaluating my awareness
1. **Check two sources before relying on them.** The report uses Xia et al. (2017) and Peng et al. (2023) for claims they may not support (see `S23-evidence.md`, evaluation point 1). Misreading a source undermines a claim to be well informed.
2. **Trends can age within a year.** Some model choices in the proposal (e.g. GPT-4o, Llama 3.1 8B) may already have newer successors. Say when you last checked, and what you would choose now.
3. **Awareness is only valuable if it changes decisions.** This proposal shows that for each trend; the remaining gap is evidence from your day-to-day work.

## Result
[EVIDENCE NEEDED: one decision in your real work that a trend changed, and its effect.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Awareness of trends and innovations | Action 1: five AI and delivery trends |
| Range of sources | Academic, industry and government sources here; full range in `../module-3/B7-evidence.md` |
| Community interaction and conferences | Action 3 [EVIDENCE NEEDED] |
| Maintains awareness | Action 2: fortnightly regulatory review; provider flexibility |
| Delivers business value | Business value column in Action 1 |
| Applied to how teams work | Fortnightly review in retrospectives; Phase 2 AI in code review and testing |

## Assessor Notes
*Strength*: Each trend is turned into a concrete decision with business value, and awareness is maintained through a defined process.
*Gaps*: Community and conference input; your personal habits; source accuracy.
*Watch for*: "What has changed in AI since you wrote this proposal, and would you change anything?" Have a current answer.
