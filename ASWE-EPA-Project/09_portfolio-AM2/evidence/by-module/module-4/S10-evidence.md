# S10: Initiate, design, implement and debug a data product
**Assessment method**: AM2
**Module**: 4 (Multiverse Project 2: Driving Business Value with Data Engineering)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Cloud ETL proof of concept on AWS for a UK government registry
**Status**: Draft
**Related**: `K12-evidence.md` in this folder explains **why** the data management design looks the way it does. This piece covers **what I did** at each stage of the lifecycle. Refer to K12 for design reasoning rather than repeating it.

## Criterion
**KSB:** Initiate, design, implement and debug a data product for a digital and technology solution.
**Pass:** Demonstrates the use of core technical concepts for digital and technology solutions, including: Initiates, designs, implements and debugs a data product for a digital and technology solution.
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** show you initiated, designed, implemented and debugged a data product; show the core technical concepts; show how the data product is relevant to the solution and contributes to its success.

> Guidance: Module 4 is your strongest S10 evidence: initiation, design and implementation are all there, with code in Figures 7 to 11. **Debugging is the gap**: the report gives it one sentence (a Java runtime problem when running PySpark locally). All four verbs must be evidenced, so section 4 needs real debugging stories from you.

## Situation
The registry's analysts spent hours each week downloading bulk files and reconciling them by hand, duplicate officer records undermined investigations, and only specialists could query the source systems. The data product had to turn fragmented source data into a clean, trusted, queryable dataset that analysts and caseworkers could use themselves.

## Task
[EVIDENCE NEEDED: your role, in the first person: did you build the pipeline alone, and who were you building it for?]

## Action

### 1. Initiate
- **Problem definition.** I evaluated the current state across four areas (data sources and integration; storage and technical debt; data quality and compliance; stakeholder access) and summarised six critical needs, including automated, auditable ingestion and secure self-service analytics.
- **Stakeholders.** Six groups: Registrar Services, Analysis and Insights, Digital Services, Data Governance and Compliance, Casework Operations, and Senior Leadership. [EVIDENCE NEEDED: how you engaged them; see `K14-evidence.md`.]
- **Options.** I compared keeping an Oracle-centric model, expanding API access and building cloud ETL, and chose cloud ETL (reasons in `K12-evidence.md`).
- **Success measures, set before building.** Full snapshot ingestion in under 2 hours (baseline 3 to 5 days); duplicate officers under 1% (baseline 8 to 12%); fewer than 1 failed refresh a month (baseline 4 to 6); data under 24 hours old (baseline monthly).

### 2. Design
A five-layer pipeline: ingestion, raw storage in S3, staging, a curated layer in partitioned Parquet, and SQL access through Athena, with the Glue Data Catalog holding schema and lineage. I added controls in the source database (a completeness audit, a standardised extraction view and duplicate detection) so problems are caught before data leaves the source.

### 3. Implement
| Component | What I built | Concept it demonstrates |
|---|---|---|
| Ingestion (Figure 8) | An AWS Lambda function, triggered on a schedule by EventBridge, that streams bulk files into the raw S3 bucket using multipart upload and verifies each file with a SHA-256 checksum | Event-driven ingestion; integrity checking, so a corrupted or partial download is detected before processing |
| Transformation (Figure 9) | AWS Glue PySpark jobs that parse XML, standardise officer names, deduplicate on a composite key using window functions and write partitioned Parquet | Distributed processing; deterministic deduplication; columnar storage |
| Fuzzy matching (Figure 10) | A helper using `rapidfuzz` to match officer and company names that differ in spelling or format | Probabilistic matching where exact keys fail |
| Source controls (Figures 12 to 14) | PostgreSQL stored procedures for completeness checks and trigram-based (`pg_trgm`) duplicate detection, writing to audit tables; an extraction view `v_company_export` | Quality at source; auditability; decoupling source schema from the pipeline |
| Testing (Figure 11) | A unit test of the officer name standardisation logic | Automated verification of transformation rules |

The product layers three kinds of deduplication, from strictest to loosest: exact composite keys in Glue, fuzzy matching with `rapidfuzz`, and trigram similarity at source for audit. [EVIDENCE NEEDED: confirm this is how they fit together, and which ones merge records and which only flag them; see `K12-evidence.md`, evaluation point 1.]

### 4. Debug
Debugging a data product means finding faults in two places: the **code** (does the job run?) and the **data** (is the output right?).

**Code and environment.** Running PySpark locally failed because of a Java runtime dependency, which showed me why data teams standardise on managed cloud environments. [EVIDENCE NEEDED: what the error was, how you diagnosed it (e.g. reading the stack trace, checking `JAVA_HOME` and the Spark version), and how you fixed it or worked around it (e.g. running in Glue instead).]

**Data.** [EVIDENCE NEEDED: at least one real data fault you found and fixed. Likely candidates from this project: XML records that failed to parse; schema differences between bulk files; officer names that standardised wrongly (the unit test in Figure 11 suggests you caught at least one); duplicates missed or wrongly matched; a failed Glue job. For each: how you noticed it, how you traced it, what you changed, and how you confirmed the fix.]

**Built-in debugging aids.** The audit tables and the SHA-256 check are designed to make faults visible: the completeness audit records how many records fail each check, the duplicate audit records each suspect pair with its score, and a failed checksum stops a bad file before it reaches the pipeline.

## Result
In the controlled environment, ingestion fell from 6 hours to 1.2 hours, manual cleaning from 12 to 2 hours a week and the data error rate from 9.5% to 1.4%, and officer data completeness rose from 88% to 97%. The curated data supported analysis directly: for example, over 91% of registered companies are active, and real estate and professional services dominate the register, which supports risk-based filtering by sector. [EVIDENCE NEEDED: how these figures were measured, and one consistent ingestion baseline; the report gives 6 hours in Table 2 and 3 to 5 days in section 5.7.1.]

## Evaluating the product
1. **"Production-style" is overstated.** The report calls the pipeline "operationally realistic and suitable for production-scale public-sector deployment", but also says it ran in a controlled environment and its results are indicative. Say "a proof of concept with production patterns", and name what production would add: monitoring and alerting, data stewards and a business glossary.
2. **Test coverage is thin.** One unit test covers name standardisation. The deduplication and fuzzy-matching logic, where errors matter most, has no recorded tests.
3. **The value depends on data trust.** The ROI (about £30,000 a year saved against about £1,980 of cloud cost) only holds if analysts trust the curated data enough to stop reconciling by hand, which the quality audits support but do not prove.

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Initiates a data product | Action 1: problem, stakeholders, options, success measures |
| Designs it | Action 2, with reasoning in `K12-evidence.md` |
| Implements it | Action 3: components with code figures |
| Debugs it | Action 4 [EVIDENCE NEEDED: real debugging examples] |
| Relevance and contribution to the solution | Result: KPIs and analysis enabled |

## Assessor Notes
*Strength*: A complete, working pipeline with code evidence, measurable targets set up front and quality controls at several layers.
*Gaps*: Debugging is the missing verb; your role; how KPIs were measured.
*Watch for*: "Tell me about a bug in this pipeline and how you found it." Have one ready from section 4.
