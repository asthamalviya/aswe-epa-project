# K12: The role of data management systems
**Assessment method**: AM2
**Module**: 4 (Multiverse Project 2: Driving Business Value with Data Engineering), with a short section from Module 3
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Cloud ETL proof of concept on AWS for a UK government registry
**Status**: Draft
**Shared criterion**: K12 shares its Pass criterion with K14. This piece covers data **management**; K14 (data **gathering** methods) needs its own piece in this folder. Section 4 notes where the two meet.

## Criterion
**KSB:** The role of data management systems within Digital and Technology Solutions.
**Pass:** Explains core technical concepts for digital and technology solutions, including: Data gathering, data management, and data analysis. (K12, K14)
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** explain data gathering, data management and data analysis; cover K12 and K14; show a clear understanding of data management systems within digital and technology solutions.

> Guidance: Module 4 is your strongest K12 evidence because you built a data management system: layered storage, a catalogue with lineage, quality controls at source and SQL access. Module 3 was the target module for K12, but it only covers protecting a database, so it appears here as section 5. The draft explains what each part of the system is **for**, which is what "the role of data management systems" asks.

## Situation
The registry's core datasets (company profiles, filing history, officers and persons with significant control) were spread across on-premises Oracle databases, internal APIs and public bulk files in XML and CSV. Nothing joined them up. Analysts reconciled files by hand with SQL scripts and spreadsheets, which caused duplicated work, inconsistent schemas, duplicate officer and PSC records, and transformations of personal data without lineage. Only specialist technical staff could access the Oracle systems, so analysts and caseworkers depended on intermediaries.

## Task
[EVIDENCE NEEDED: your role in designing and building the proof of concept, in the first person. The report is written in the passive.]

## Action

### 1. What a data management system is for
A data management system does more than store data. I used the registry's problems to define the six roles the new system had to play:

| Role | Problem at the registry | How the proof of concept fills it |
|---|---|---|
| Integration | Three isolated sources, reconciled by hand | Scheduled exports and event-triggered Lambda functions bring every source into one pipeline |
| Storage and organisation | Inconsistent schemas; no single curated copy | S3 in layers: raw, staging and a curated layer in partitioned Parquet |
| Quality | Missing fields, inconsistent addresses, duplicate officers | Validation, standardisation and deduplication in AWS Glue; completeness checks and duplicate detection at source |
| Metadata and lineage | Personal data transformed with no record of how | Glue Data Catalog records schema and lineage; audit tables record every quality check |
| Access | Only specialists could query Oracle | Athena gives analysts SQL access to curated data, within role-based controls |
| Security and compliance | Accountability risk under data protection law | Encryption, role-based access and audit trails (see `../module-5/K19-evidence.md` and the Module 4 governance section) |

### 2. Design decisions and why
- **Layered storage (raw, staging, curated).** Keeping the untouched raw copy means any transformation can be re-run or audited later, and analysts only ever query the cleaned, curated layer. This follows distributed data architecture principles (Marz and Warren, 2015).
- **Partitioned Parquet for curated data.** Parquet stores data by column, so a query reading two fields does not scan the whole table, and partitioning lets Athena skip irrelevant files. That cuts both query time and cost.
- **A database view as the extraction interface.** I extracted from a standardised view (`v_company_export`) rather than the source tables, which normalises company names, adds an extraction timestamp and means a change to the operational schema does not break the pipeline.
- **Quality controls at source.** A stored procedure checks officer records for missing mandatory fields (name, date of birth, company number) and writes the results to an audit table before anything reaches the cloud, so bad data is caught once rather than cleaned repeatedly downstream.
- **Duplicate detection with an audit trail.** A second procedure uses PostgreSQL's trigram similarity (`pg_trgm`) to score pairs of officer names within the same company, recording each likely duplicate with its score, a date-of-birth match flag and a timestamp.

### 3. Options I compared
| Option | Why rejected or chosen |
|---|---|
| Keep an Oracle-centric model | Rejected: does not scale for peak filing periods and adds to technical debt |
| Expand API access | Rejected: unsuited to large-scale historical analysis |
| Cloud ETL on AWS | Chosen: elastic scaling, built-in cataloguing and lineage, and pay-per-query analytics; AWS was already used in the organisation |

### 4. Data gathering and analysis (shared with K14)
The system gathered four datasets (company profiles, filing history, officers and PSC records) from three source types. Once curated, the data supported analysis directly in Athena: for example, over 91% of registered companies are active, which supports focusing regulatory attention on the small minority in liquidation, administration or strike-off. [EVIDENCE NEEDED: K14 asks how you **appraised and selected** gathering methods, e.g. stakeholder interviews or workshops for requirements. Cover that in `K14-evidence.md`.]

### 5. Protecting data management systems (Module 3)
In my network review (Module 3), I placed the registry's databases in their own network zone with no internet access, reachable only from the application tier on one database port, with encryption at rest, replication and 3-2-1 backups at a disaster recovery site. A data management system is only as trustworthy as its protection: integrity and availability are part of its role, not an add-on.

## Evaluating the system
1. **Flagging duplicates and merging them are different.** Section 6.2.3 records likely duplicates for review, but section 4.4 shows three officer records automatically merged into one master record. In a statutory register, wrongly merging two different people with the same name and birth date is a serious error, so likely duplicates should be reviewed by a person before they are merged. [EVIDENCE NEEDED: which the proof of concept actually did.]
2. **The similarity threshold needs justifying.** The example duplicate scored 0.583 and is described as "high-probability". Say how you chose the threshold and what share of flagged pairs were real duplicates.
3. **Lineage is technical only.** The catalogue records where data came from and how it changed, but not business definitions or ownership. The report recognises this and recommends a business glossary and named data stewards.
4. **Results are indicative.** The proof of concept ran in a controlled environment, not live systems, and some figures conflict (ingestion baseline of 6 hours in one table and 3 to 5 days in another). The source database was PostgreSQL, standing in for Oracle. [EVIDENCE NEEDED: confirm and explain.]

## Result
In the controlled environment, the proof of concept reduced ingestion time (6 hours to 1.2 hours), manual cleaning (12 to 2 hours a week) and the data error rate (9.5% to 1.4%), and raised officer data completeness from 88% to 97%. [EVIDENCE NEEDED: how these were measured, and one consistent ingestion baseline.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Role of data management systems | Action 1: six roles, each tied to a registry problem |
| Data management | Actions 2 and 3: design decisions and options |
| Data gathering | Action 4 (with K14) |
| Data analysis | Action 4: analysis on curated data |
| Understanding, shown critically | Evaluating the system |

## Assessor Notes
*Strength*: A real system built to solve named problems, with reasons for each design choice.
*Gaps*: Your role; how the figures were measured; the merge-versus-flag question.
*Watch for*: "What would happen if your deduplication merged two different people?" Point 1 of the evaluation is your answer.
