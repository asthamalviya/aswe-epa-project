# S11: Determine and use appropriate data analysis techniques
**Assessment method**: AM2
**Module**: 4 (Multiverse Project 2: Driving Business Value with Data Engineering), with predictive analysis from Module 2
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Cloud ETL proof of concept for a UK government registry (Module 4); dissolution risk model (Module 2)
**Status**: Draft
**Shared criterion**: S11 shares its Pass criterion with K13 (principles of data analysis). This piece can support K13 too; K13 is rated Strong in Module 2.

## Criterion
**KSB:** Determine and use appropriate data analysis techniques. For example, Text, Statistical, Diagnostic or Predictive Analysis to assess a digital and technology solution.
**Pass:** Demonstrates the use of core technical concepts for digital and technology solutions, including: applies the principles of data analysis for digital and technology solutions. (K13, S11)
**Distinction:** None for this KSB.
**Evidence requirements (Multiverse):** use appropriate techniques such as text, statistical, diagnostic or predictive analysis to evaluate solutions; give examples where they assessed and improved a solution; show measurable improvements.

> Guidance: the KSB has two verbs: **determine** (choose the right technique and say why) and **use**. Module 4 uses text matching and descriptive statistics but never says why it chose them, and it has no predictive analysis. Module 2 fills that gap. The draft organises your work under the KSB's four named techniques, adds the reasons, and ties each technique to **assessing a solution**, which is the KSB's purpose.

## Situation
Two questions needed data analysis: in Module 4, whether the new pipeline actually improved the registry's data and processes; in Module 2, which companies are at risk of dissolution, so that analysts can prioritise attention.

## Task
[EVIDENCE NEEDED: your role in the analysis, in the first person.]

## Action: the techniques I chose and why

### 1. Text analysis: matching names that should be the same (Module 4)
**The question.** Officer records for the same person appear under slightly different names ("J. Smith", "J Smith", "John Smith"), so exact matching misses duplicates.
**Techniques I chose.**
- **Standardisation** (case, punctuation, spacing) before any comparison, so trivial differences disappear.
- **Trigram similarity** (`pg_trgm` in PostgreSQL), which splits names into three-letter sequences and scores how many they share. It is fast inside the database, so candidates can be flagged at source.
- **Fuzzy string matching** (`rapidfuzz` in the pipeline), which handles abbreviations and reordering that trigrams score poorly.
**Why these, not others.** Exact keys alone miss the duplicates that matter; heavier approaches such as machine-learned entity resolution need labelled training data the registry did not have. [EVIDENCE NEEDED: confirm this was your reasoning.]
**How it assessed the solution.** Duplicate officers were a named problem (baseline 8 to 12% of records, target under 1%), so the match results measure directly whether the pipeline solved it.

### 2. Statistical analysis: measuring quality and impact (Module 4)
**Techniques.** Descriptive statistics: completeness, validity and duplication rates per dataset before and after the pipeline; distributions of company status, age and industry (SIC code).
**Why.** The claim "data quality improved" needs a measure. Profiling the same fields before and after, with the same rules, gives a like-for-like comparison.
**Results.**
- Officer records: completeness 88% to 97%, validity 84% to 95%.
- PSC records: completeness 85% to 96%, validity 82% to 94%.
- Data error rate: 9.5% to 1.4%.
- Distributions: over 91% of companies are active, nearly half are under ten years old, and real estate and professional services are the largest sectors.

### 3. Diagnostic analysis: finding out why (Modules 4 and 2)
- **Module 4.** Analysing where records failed quality checks showed the causes: missing mandatory fields (officer name, date of birth, company number) at source, and name variations from abbreviations and inconsistent formatting. That is why I put checks in the source database rather than only cleaning data downstream.
- **Module 2.** Feature importance from the model showed which attributes drive dissolution risk. Descriptive analysis found that companies under three years old in particular sectors had higher dissolution rates. [EVIDENCE NEEDED: the report's text and table disagree on the strongest predictor; see the evaluation below.]

### 4. Predictive analysis: estimating risk (Module 2)
**Technique.** A classification model predicting whether a company will dissolve.
**How I determined the approach.**
- **Model choice.** I compared logistic regression, decision trees, XGBoost and random forest, and chose random forest for its recall (0.78), F1 score (0.80) and interpretable feature importance.
- **Right metric.** Dissolved companies are far outnumbered by active ones, so a model could score high accuracy by predicting "active" for everything. I used F1 and recall instead of accuracy, and set a requirement of F1 of at least 0.80.
- **Handling imbalance.** SMOTE created synthetic dissolved examples in the training data only, alongside class weighting.
- **Feature selection.** Pearson and Spearman correlation matrices showed that company age and incorporation year carry the same information, so I kept only company age, which is easier to interpret.

## Result
The analyses showed the Module 4 pipeline met its quality targets in the controlled environment (officer completeness up 9 points, error rate down 8.1 points), and gave Module 2 a model meeting its F1 target of 0.80. [EVIDENCE NEEDED: one decision an analysis changed, e.g. a similarity threshold you adjusted after reviewing matches, or a feature you dropped.]

## Evaluating my analysis
1. **Match quality is not measured.** The text matching flags likely duplicates, but there is no measure of how many flags were correct (precision) or how many duplicates were missed (recall). Checking a sample of flagged pairs by hand would give both, and justify the 0.583 score called "high-probability".
2. **Some Module 4 figures conflict or are not measured.** Ingestion is 6 hours in one table and 3 to 5 days in another, and "analyst productivity: low to high" has no data behind it.
3. **Module 2's findings contradict each other.** The text names company age and time since filing as the strongest predictors; the table ranks insolvency history first (0.34). Its KPI values are also labelled "Example". Fix both before relying on them.
4. **Descriptive is not the same as causal.** Younger companies in some sectors dissolve more often, but that pattern alone does not show age causes dissolution.

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Text analysis | Action 1 |
| Statistical analysis | Action 2 |
| Diagnostic analysis | Action 3 |
| Predictive analysis | Action 4 |
| Determines appropriate techniques | "Why" in each action; metric choice in Action 4 |
| Assesses a digital solution, with measurable results | Before-and-after quality figures; model metrics |

## Assessor Notes
*Strength*: All four technique types named in the KSB, each with a reason and a measurable result.
*Gaps*: Match precision and recall; one decision changed by analysis; your role.
*Watch for*: "Why F1 rather than accuracy?" and "How do you know your duplicate matching is right?" Actions 4 and evaluation point 1 cover them.
