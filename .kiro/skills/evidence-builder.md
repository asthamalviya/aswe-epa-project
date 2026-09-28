# Evidence Builder Skill

## Purpose
Turn the apprentice's **own, real work** into well-structured AM2 portfolio evidence. This skill structures, sharpens and maps evidence; it never supplies it. Every fact, figure, outcome and decision in the output must come from the apprentice or from their submitted module assessments.

Portfolio evidence must be the apprentice's own work. The assessor probes every claim in the 60-minute professional discussion, so invented content is both an integrity risk and easy to expose.

## Non-negotiable rules

1. **Never invent facts.** No made-up metrics, timings, team sizes, tools, outcomes, quotes, dates or events. If a detail is missing, insert `[EVIDENCE NEEDED: what is missing]`.
2. **Never write a "realistic example" in place of real evidence.** Examples in this file show structure only.
3. **Use official KSB wording.** Read `.kiro/steering/ksb-quick-reference.md` before writing. Never label a KSB from memory; many codes do not mean what they seem (e.g. K19 is legal, ethical, social and professional standards; K28 is teamwork tools; S15 is applying legal and ethical standards).
4. **Map to the criterion, element by element.** Shared criteria (e.g. K8, S7, B4, B6, B7) need evidence for each KSB's own element.
5. **First person.** "I designed", "I chose". Use "we" only for genuinely shared outcomes, and then say what your part was.
6. **Anonymise the organisation** as "a UK government registry". No colleague names.
7. **Flag, don't fix, weak material.** If the source work is hypothetical, proposed or illustrative, say so in the Assessor Notes rather than presenting it as delivered.

## How to use this skill

Tell me:
1. **Which assessment module** (1 to 7, matching `04_module-assessments/9419910600_Module{N}_Assessment1.pdf`)
2. **Which KSB**, or "all" for the module's target KSBs (listed in the module folder README)
3. **Your real context:** what you did, why, and what happened, with any numbers you have

I will:
1. Read the KSB's Pass (and Distinction, if any) criterion from the quick reference.
2. Read the relevant sections of your module assessment.
3. Ask you up to five questions for anything the criterion needs that neither source provides.
4. Draft the entry using only your answers and the module text, with `[EVIDENCE NEEDED]` for any remaining gaps.
5. Save it and update `06_evidence/ksb-coverage-tracker.md` (status changes only once no `[EVIDENCE NEEDED]` remains).

---

## Output location

```
ASWE-EPA-Project/06_evidence/by-module/module-{N}/{KSB-ID}-evidence.md
```

`{N}` is the **assessment module number** (the PDF), not the Multiverse project number. The mapping is in each folder's README.

Cross-module pieces that cover several KSBs at once (e.g. leadership, sustainability, changing priorities) go in `06_evidence/by-ksb/`.

## Template

```markdown
# {KSB-ID}: {official short label from the quick reference}
**Assessment method**: AM2
**Module**: {N} (Multiverse Project {P})
**Date of the work**: {month and year, from the apprentice}
**Context**: {one line, organisation anonymised}
**Status**: Draft | Ready for review | Final

## Criterion
**Pass:** {official Pass wording}
**Distinction:** {official Distinction wording, or "None for this KSB"}

## Situation
[2 to 3 sentences: the business context and the problem. Real facts only.]

## Task
[2 to 3 sentences: YOUR responsibility.]

## Action
[4 to 6 sentences: what YOU did, the decisions you made and WHY. At least one "because". Name the method, standard or theory the criterion asks for.]

## Result
[2 to 3 sentences: what changed, with at least one real number or named outcome. If there is no measured result, say what was proposed and why it was not measured.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| {element 1 of the Pass wording} | {section and sentence} |
| {element 2} | {section and sentence} |

## Assessor Notes
*Strength*: [what makes this evidence credible]
*Gaps*: [any remaining `[EVIDENCE NEEDED]`, or anything proposed rather than delivered]
*To reach Distinction* (only if the KSB has a Distinction criterion): [one specific addition]
```

---

## Structure example: K19 from Module 4

This example uses only facts stated in the Module 4 assessment. Gaps the module does not answer are left as placeholders, which is how every draft should look before the apprentice fills it in.

```markdown
# K19: Legal, ethical, social and professional standards
**Assessment method**: AM2
**Module**: 4 (Multiverse Project 2)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Cloud ETL proof of concept for a UK government registry
**Status**: Draft

## Criterion
**Pass:** Applies relevant legal, ethical, social and professional standards to digital and technology solutions considering both technical and non-technical audiences and in line with organisational guidelines. (K19, S15, B1, B2)
**Distinction:** Justifies the application of relevant legal, ethical, social and professional standards to digital and technology solutions. (K19, S15)

## Situation
The registry's bulk data was reconciled manually with SQL scripts and spreadsheets, with no systematic lineage tracking. That created an accountability risk under data protection law, which requires traceable, lawful processing.

## Task
[EVIDENCE NEEDED: your specific responsibility for governance and compliance in the PoC]

## Action
I [EVIDENCE NEEDED: confirm your part; the module is written in the passive, e.g. "built"] data quality and duplicate checks at source that write every result to dedicated audit tables, and used the Glue Data Catalog to record schema and lineage from source to analytics. I did this because Articles 5 and 30 of UK GDPR require the registry to demonstrate accountability and keep records of processing [EVIDENCE NEEDED: confirm this was your reasoning, and correct the module's EU GDPR citation to UK GDPR and the Data Protection Act 2018]. [EVIDENCE NEEDED: how you explained these controls to non-technical stakeholders, e.g. governance or casework teams]. [EVIDENCE NEEDED: which organisational guidelines you followed].

## Result
[EVIDENCE NEEDED: measured or observed outcome, e.g. number of records traced, audit query time, stakeholder sign-off]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Applies relevant legal standards | Action: audit tables and lineage mapped to UK GDPR Articles 5 and 30 |
| Considers technical and non-technical audiences | Action: [EVIDENCE NEEDED] |
| In line with organisational guidelines | Action: [EVIDENCE NEEDED] |
| Distinction: justifies the application | Action: "because..." clause; strengthen by comparing with an alternative control |

## Assessor Notes
*Strength*: Controls are concrete and tied to specific articles.
*Gaps*: Audiences and organisational guidelines missing; jurisdiction must be corrected.
*To reach Distinction*: Explain why audit tables and lineage were chosen over an alternative (e.g. manual records of processing) and what each would cost or risk.
```

---

## Before saving any entry

- [ ] Every fact came from the apprentice or the module text
- [ ] KSB label and criterion copied from the quick reference
- [ ] Each criterion element mapped in the table
- [ ] First person throughout
- [ ] Organisation anonymised; no colleague names
- [ ] Remaining gaps marked `[EVIDENCE NEEDED]`, not filled with plausible guesses
