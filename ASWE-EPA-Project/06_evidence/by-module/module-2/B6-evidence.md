# B6: Participating in and sharing best practice
**Assessment method**: AM2
**Module**: 2 (Multiverse Project 4: Integrating Machine Learning and AI to Drive Business Value), with examples from Modules 6 and 7
**Date of the work**: [EVIDENCE NEEDED: month and year of each activity]
**Context**: Sharing what I learned building a dissolution risk model on public company data from a UK government registry
**Status**: Draft
**Related**: `../../by-ksb/leading-and-working-together.md`, section A4, is the short B6 paragraph inside the leadership piece. This file is the full record behind it.

## Criterion
**KSB:** Participates in and shares best practice in their organisation, and the wider community for aspects relevant to digital and technology solutions.
**Pass:** Explains how teams work effectively to produce a digital and technology solution applying relevant organisational theories using up to date awareness of trends and innovations. (K8, S7, B4, B6, B7)
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** show you participate in and share best practice within your organisation **and** the wider community; include how teams collaborate effectively using up-to-date practice.

> Guidance: Module 2 is your best B6 evidence: a brown-bag session, a checklist and a meetup. Three things weaken it. It is written as "we", so the assessor cannot tell what you did. It gives no audience sizes, feedback or effect. And the blog post is only planned. This draft keeps every activity but asks for the specifics that make each one count. If you publish the blog post before the discussion, it turns a plan into evidence.

## Situation
Building the dissolution risk model taught me practical lessons about machine learning on government data: handling class imbalance, choosing the right metric, avoiding biased features and explaining predictions. Those lessons were useful beyond my project, both to colleagues starting ML work and to people outside the organisation using the same public data.

## Task
[EVIDENCE NEEDED: why you decided to share, and whether anyone asked you to.]

## Action

### 1. Sharing inside my organisation
| Activity | What I shared | Audience | Effect |
|---|---|---|---|
| Brown-bag session | A demonstration of the risk model and how it was built | Colleagues across departments [EVIDENCE NEEDED: how many, from which teams, date] | [EVIDENCE NEEDED: questions asked, feedback, any follow-up] |
| Best-practices checklist for ML projects | [EVIDENCE NEEDED: what the checklist covered, e.g. stratified splits, SMOTE on training data only, F1 over accuracy for imbalanced data, bias checks] | Future ML projects in the organisation [EVIDENCE NEEDED: where it was published, e.g. Confluence] | [EVIDENCE NEEDED: has anyone used it?] |
| Recommendation to standardise fairness checks | That explainability and bias checks be included in all future model documentation | Senior stakeholders | [EVIDENCE NEEDED: was it adopted?] |
| Shared documentation | Project logs and knowledge in Confluence; weekly demos and retrospectives | The project team and stakeholders | A record others can reuse |

### 2. Sharing with the wider community
| Activity | What I shared | Audience | Effect |
|---|---|---|---|
| Local data science meetup | My experience of working with government datasets | [EVIDENCE NEEDED: which meetup, date, whether you presented or took part in discussion, rough audience size] | [EVIDENCE NEEDED] |
| Blog post (planned) | Lessons learned from using the registry's open data | Public | [EVIDENCE NEEDED: publish it and add the link, or remove this row] |
| Public code repositories | Module 7's pricing service refactor, including its tests and decision records, is public on GitHub | Other developers | [EVIDENCE NEEDED: any stars, forks, issues or comments] |

> Guidance: both the Module 6 and Module 7 reports are marked "Classification: Controlled", and both link to public repositories. QuickQuote looks like a training exercise rather than registry code, but check that publishing each repository was permitted before listing it here (see the fix list, data handling section).

### 3. Participating, not only presenting
B6 says **participates in** as well as **shares**. [EVIDENCE NEEDED: communities you take part in regularly, e.g. an internal guild or community of practice, cross-government communities, online forums, code review of others' work. One ongoing example is worth more than several one-off events.]

### 4. Sharing practice through the way I build
Some best practice is shared through the work itself:
- **Module 6:** the minimum Python version is enforced in the linter configuration, so every future contributor is protected from the mismatch I hit; allowed origins are documented in the README so others can change them without asking me.
- **Module 7:** architecture decision records explain why each design choice was made, so later developers can understand and challenge them.

## Result
[EVIDENCE NEEDED: one concrete effect of your sharing, e.g. "two colleagues used the checklist on their next model" or "the meetup led to a follow-up conversation with another public body".]

## Evaluating my sharing
1. **Most of it is one-off.** A single session and a single meetup show willingness; a regular habit shows commitment. Say what you do on an ongoing basis.
2. **Effect is not yet recorded.** Sharing counts for more when you can show someone used it.
3. **"We" hides my part.** The report says "we aimed to promote a culture of knowledge sharing". Say which activities you led yourself.

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Shares best practice in the organisation | Action 1: session, checklist, recommendation, documentation |
| Shares best practice in the wider community | Action 2: meetup, blog, public repository |
| Participates | Action 3 [EVIDENCE NEEDED] |
| Relevant to digital and technology solutions | ML practice, data handling, engineering practice |
| How teams work effectively | Action 4; weekly demos and retrospectives |

## Assessor Notes
*Strength*: Sharing happens at three levels (team, organisation and community) on a real technical topic.
*Gaps*: Audience sizes, dates, feedback and effect; the unpublished blog post; ongoing participation.
*Watch for*: "What did people do differently after your session?" Have one example ready.
