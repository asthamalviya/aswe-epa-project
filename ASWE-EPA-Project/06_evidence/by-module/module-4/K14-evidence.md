# K14: Quantitative and qualitative data gathering methods
**Assessment method**: AM2
**Module**: 4 (Multiverse Project 2: Driving Business Value with Data Engineering), with examples from Modules 2 and 5
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Cloud ETL proof of concept for a UK government registry (Module 4); AI knowledge search proposal (Module 5); dissolution risk model (Module 2)
**Status**: Draft
**Shared criterion**: K14 shares its Pass criterion with K12. `K12-evidence.md` in this folder covers data **management**; this piece covers data **gathering**, and how I appraised and chose methods.

## Criterion
**KSB:** A range of quantitative and qualitative data gathering methods and how to appraise and select the appropriate method.
**Pass:** Explains core technical concepts for digital and technology solutions, including: Data gathering, data management, and data analysis. (K12, K14)
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** explain data gathering, management and analysis; show a range of quantitative and qualitative methods and how to appraise and select the right one; include examples of how the methods are applied in the organisation.

> Guidance: the key words are **range**, **appraise** and **select**. Module 4 gathers data but never names its methods: it says stakeholders "consistently highlighted" priorities without saying how you found that out. Module 5 is much stronger, using interviews, observation, process mapping, delivery records, surveys and a benchmark, and comparing methods against alternatives. This draft uses Module 4 as the main project and Module 5 for the appraisal.

## Situation
Across three projects for a UK government registry, I needed data of two kinds: data to build solutions with (records from the register) and data to decide what to build and whether it worked (what users need, how long tasks take, whether they trust the result).

## Task
[EVIDENCE NEEDED: your role in gathering data on each project, in the first person.]

## Action

### 1. The range of methods I used
| Method | Type | Project | What it gave me |
|---|---|---|---|
| Existing datasets (secondary data): Oracle exports, internal APIs, public bulk files in XML and CSV | Quantitative | Module 4 | The records to build the data product: company profiles, filing history, officers and PSC records |
| Data profiling: completeness, duplication and validity checks | Quantitative | Module 4 | A measured baseline of data quality, e.g. officer records 88% complete and 84% valid before the pipeline |
| Stakeholder requirements gathering across six groups (Registrar Services, Analysis and Insights, Digital Services, Data Governance, Casework, Senior Leadership) | Qualitative | Module 4 | Priorities: accuracy and trust, less manual work, auditability, self-service access, faster reporting [EVIDENCE NEEDED: the actual method: interviews, workshops or a questionnaire, and how many people] |
| Monthly public data snapshots (CSV) | Quantitative | Module 2 | Training data for the dissolution risk model |
| Stakeholder interviews | Qualitative | Module 5 | Why developers struggle to find knowledge, and what they would trust |
| Direct observation | Qualitative | Module 5 | The recurring delivery pattern that started the project |
| Process mapping (BPMN) and value stream mapping | Mixed | Module 5 | An average of seven manual steps and four platform switches per developer query |
| Delivery records (Jira and sprint data) | Quantitative | Module 5 | 6 of 8 features needed extra sprints; spikes of 3 to 5 days |
| Developer and pilot surveys, including an anonymous trust score | Mixed | Module 5 | Time to find information and a trust rating (target 4.0 out of 5) |
| 50-query benchmark and system logs | Quantitative | Module 5 | Retrieval accuracy (target 80% recall) and usage |

### 2. How I appraise and select methods
I choose a method by asking what question it must answer, then weighing four factors:

| Factor | Question | Example |
|---|---|---|
| Kind of question | Do I need to know **how much** (quantitative) or **why** (qualitative)? | Delivery records showed **how often** features overran; interviews showed **why** |
| Reliability and bias | Could the method mislead? | Self-reported time is often inaccurate, so I paired the survey with system logs. Named feedback on a tool the team sponsored invites polite answers, so the trust survey was anonymous |
| Cost and effort | Can the data be collected without disrupting the work? | Jira data already existed, so it gave a baseline at no extra cost; a new time-tracking exercise would have burdened the team |
| Fit to the stage | Is this the right point in the project? | I used BPMN for current-state diagnosis and kept use case modelling for the design phase, because use cases describe a future system, not a fragmented current one |

### 3. Combining methods (triangulation)
The strongest findings came from combining a quantitative and a qualitative source on the same question. In Module 5, delivery records showed that 6 of 8 features overran (how much), interviews explained the cause (knowledge scattered across six platforms) and process mapping showed where the time went (seven manual steps per query). Any one alone could have been dismissed; together they made the case.

### 4. Gathering data in Module 4
In Module 4, secondary data from existing systems was the right main method: the aim was to integrate and clean data the registry already held, not to collect new data. I profiled it before and after the pipeline to measure the change in quality, which turned a claim that "quality improved" into figures: officer completeness rose from 88% to 97% and validity from 84% to 95%.

## Evaluating my methods
1. **Module 4's requirements method is not recorded.** The report lists what stakeholders wanted but not how that was gathered, how many people took part, or how their views were weighed. The assessor is likely to ask.
2. **Some measures are not really measured.** "Analyst productivity: Low to High" has no data behind it. A before-and-after task timing, or a short survey of analysts, would have made it a real measure.
3. **Samples are small.** The Module 5 pilot involves 10 developers, which is enough to spot problems but not to generalise with confidence. I would treat its results as indicative.
4. **Secondary data carries its source's flaws.** The Module 2 model learned from public snapshots, so gaps or errors in those records become gaps in the model.

## Result
[EVIDENCE NEEDED: one decision a gathered finding changed, e.g. a priority stakeholders raised that reshaped the Module 4 design.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Range of quantitative methods | Action 1: datasets, profiling, delivery records, benchmark, logs |
| Range of qualitative methods | Action 1: interviews, observation, stakeholder requirements, surveys |
| Appraising and selecting methods | Action 2: four selection factors with examples; Action 3 |
| Applied in the organisation | Actions 1 and 4: real examples at the registry |
| Data gathering, management, analysis | This piece and `K12-evidence.md` |

## Assessor Notes
*Strength*: A wide range of methods across real projects, with reasons for each choice and honest limits.
*Gaps*: How Module 4 requirements were gathered; your role.
*Watch for*: "How did you know stakeholders agreed on those priorities?" Point 1 of the evaluation needs a real answer.
