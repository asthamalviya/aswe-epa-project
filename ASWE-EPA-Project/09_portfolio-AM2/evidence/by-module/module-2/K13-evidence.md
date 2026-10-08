# K13: Principles of data analysis
**Assessment method**: AM2
**Module**: 2 (Multiverse Project 4: Integrating Machine Learning and AI to Drive Business Value)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: A dissolution risk model built on public company data from a UK government registry
**Status**: Draft
**Shared criterion**: K13 shares its Pass criterion with S11. `../module-4/S11-evidence.md` covers the **techniques** I used across projects. This piece covers the **principles** behind them, which is what a knowledge KSB asks for.

## Criterion
**KSB:** [EVIDENCE NEEDED: the K13 standard wording is not saved in the repo. Save the Multiverse K13 page and paste the wording here.]
**Pass:** Demonstrates the use of core technical concepts for digital and technology solutions, including: applies the principles of data analysis for digital and technology solutions. (K13, S11)
**Distinction:** None for this KSB.

> Guidance: Module 2 is rated Strong for K13: it uses stratified splitting, SMOTE, correlation checks and F1 rather than accuracy. Its gap is that it applies principles without naming them. This draft names eight principles and shows each one in your model, then applies them critically to your own work. Point 3 (data leakage) is the one the assessor is most likely to test.

## Situation
Businesses, lenders and public bodies benefit from early warning that a company may dissolve. Using the registry's monthly public snapshots (millions of company records), I built a classification model that returns a dissolution risk score from 0 to 1 and an at-risk flag.

## Task
[EVIDENCE NEEDED: your role, in the first person. The report is written as "we", so say which parts were yours.]

## Action: eight principles of data analysis, applied

### 1. Start from the question and the cost of being wrong
The question was "which companies are likely to dissolve?", and the costly mistake is a **false negative**: failing to flag a company that then dissolves. That shaped every later choice, including the metric (principle 5) and the emphasis on recall.

### 2. Understand and clean the data before modelling
I built a data dictionary of the dataset's 12 fields (e.g. company category, SIC code, accounts category, last accounts date, insolvency history), handled missing values, standardised field names, converted dates and removed variables that carried no information. I left out sensitive fields such as addresses and officer names.

### 3. Keep the test fair: split first, and avoid leakage
- I split the data 80/20 into training and test sets, **stratified** so both sets kept the same share of dissolved companies. A random split on imbalanced data can leave the test set unrepresentative and the metrics misleading.
- I applied SMOTE (synthetic oversampling of dissolved companies) to the **training data only**. Applying it before the split would let synthetic copies of test cases leak into training and inflate the results.
- **Target leakage.** [EVIDENCE NEEDED: confirm that no feature reveals the outcome. The data dictionary includes `DissolutionDate`, which only exists for dissolved companies, so it must not be a feature. `TimeSinceFiling` and `CompanyAge` also need care: dissolved companies stop filing, so if these were measured at the snapshot date rather than before dissolution, they partly encode the answer. Say how you calculated them.]

### 4. Check relationships between features
Pearson (linear) and Spearman (rank-order) correlation matrices showed that company age and incorporation year carry the same information. I kept company age, because it is easier to interpret and a duplicate feature adds noise without adding signal.

### 5. Choose metrics that fit the data
Active companies far outnumber dissolved ones, so a model that predicted "active" for everything would score high accuracy while being useless. I evaluated with precision, recall, F1 and the confusion matrix, set a requirement of F1 of at least 0.80, and chose random forest for its recall (0.78) and F1 (0.80).

### 6. Compare alternatives
I compared logistic regression (simple and interpretable, but misses non-linear relationships), decision trees (easy to visualise, prone to overfitting), XGBoost (strong on structured data, needs more tuning) and random forest (robust, handles missing data, interpretable through feature importance).

### 7. Make results explainable
Risk scores that affect how a business is treated must be explainable. Random forest gives feature importance; I planned SHAP values for explanations at the level of each prediction, and reported results to stakeholders in plain terms.

### 8. Expect change, and monitor for it
Economic and regulatory changes alter what predicts dissolution (concept drift). I planned quarterly retraining and monitoring that triggers review when performance or fairness shifts.

## Evaluating my own analysis against these principles
1. **The findings contradict each other.** The text says company age and time since filing were the most influential predictors; the feature importance table ranks insolvency history first (0.34), then company category (0.21), then accounts category (0.17). Principle 7 fails if the explanation does not match the evidence. [EVIDENCE NEEDED: which is correct?]
2. **Leakage is unconfirmed.** See principle 3. If `TimeSinceFiling` was calculated at the snapshot date, the model may be partly learning that dissolved companies stop filing, which it cannot know in advance.
3. **The split ignores time.** A random stratified split mixes older and newer records. For a model that predicts the future, training on earlier snapshots and testing on later ones is a fairer test, and closer to how the model would be used.
4. **Some reported values are placeholders.** The KPI table is headed "Value (Example)", and the stratification example uses a 70/30 split that does not match the data's real balance. Replace both with real figures.
5. **Tuning is vague.** The report says "grid search or cross-validation". Say which was used, and with how many folds.

## Result
The model met its F1 target of 0.80, with recall of 0.78, and returns a risk score and an at-risk flag for each company. [EVIDENCE NEEDED: the confusion matrix figures, and the real class balance of the data.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Principles of data analysis | Eight principles, each named and explained |
| Applied to a digital solution | Each principle shown in the risk model |
| Applied critically | Evaluating my own analysis |

## Assessor Notes
*Strength*: Imbalance, stratification, SMOTE after the split and metric choice are handled correctly, and can be explained as principles rather than steps.
*Gaps*: Leakage confirmation, the predictor contradiction, placeholder values, your role.
*Watch for*: "How do you know your model isn't cheating?" Principle 3 and evaluation point 2 are your answer.
