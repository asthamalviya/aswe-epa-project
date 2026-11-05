# Project 4: ML/AI – Company Dissolution Risk Prediction - Supporting Evidence

## Expected Images

From: `9419910600_Module4_Assessment1.pdf`

- **Confusion matrix** — True positives, false positives, true negatives, false negatives (F1: 0.80, Recall: 0.78, Accuracy: 0.86)
- **Feature importance chart** — Bar chart showing which factors drive predictions (company age, filing recency, director history, financial ratios, industry)
- **Model comparison table** — Random Forest vs Logistic Regression vs Decision Trees vs XGBoost (F1, AUC, latency trade-offs)
- **ROC-AUC curve** — AUC: 0.91 showing excellent model discrimination
- **Class imbalance handling** — SMOTE visualization showing synthetic oversampling of minority class
- **Operational impact dashboard** — Case screening time (2-3 days → <30 min), manual labour reduction (12 hrs/week → 2 hrs/week)

## Captions for Portfolio

**Model Performance (Figure 4.1):**
```
Confusion matrix and performance metrics for trained dissolution risk model. 
Achieved F1 score 0.80 (precision-recall balance), Recall 0.78 (catches 78% of 
actual failures), Accuracy 0.86 (overall correctness), AUC-ROC 0.91 (excellent 
discrimination). Model selected after explicit comparison of 4 algorithms, 
balancing prediction accuracy against latency and explainability requirements 
for operational deployment.
```

**Feature Importance (Figure 4.2):**
```
Feature importance ranking shows which company characteristics most strongly 
predict dissolution risk: filing recency (timeliness of regulatory compliance), 
company age (business maturity), director history (leadership stability), and 
financial ratios (solvency indicators). This ranking enables business 
interpretation: predictors align with real risk factors, not statistical noise.
```

**Model Comparison (Figure 4.3):**
```
Comparative evaluation of 4 classification algorithms across key metrics: 
F1 score (precision-recall balance), AUC-ROC (discrimination ability), and 
latency (production inference time). Random Forest selected for best F1 (0.80) 
while maintaining <30ms latency required for case screening workflow. Trade-offs 
explicitly evaluated: ensemble complexity vs interpretability; model accuracy vs 
inference cost; 78% recall captures most failures while accepting 22% miss rate 
(mitigated by human review flag).
```

**Operational Impact (Figure 4.4):**
```
Business metrics before/after model deployment: case screening time reduced from 
2-3 days (manual due diligence) to <30 minutes (model + human review), freeing 
12 hours/week of staff labour, recovering £30K annually in labour cost. Model 
adopted by 5 departments (Compliance, Investment, Operations, Legal, Risk) 
demonstrating cross-organizational value.
```

## Assessment Evidence Quality

✓ **What examiners value:**
- Rigorous model selection (4 models compared explicitly)
- Technical metrics explained in business terms (recall = catches failures)
- Ethical considerations visible (class imbalance, bias assessment, explainability)
- Multi-department adoption (shows credibility and operational fit)
- Honest limitations (78% recall leaves 22% undetected; mitigated by human review)

## Next Steps

Extract Project 4 images:
```bash
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/9419910600_Module4_Assessment1.pdf" --out .
```
