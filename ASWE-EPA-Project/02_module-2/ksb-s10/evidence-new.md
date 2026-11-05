# S10 New Evidence - Deep Model Performance Analysis

## The Gap: Evaluate Deployment Readiness

Examiners want to see: "Here are my scores. Here's why they're good/bad. Deployment decision: YES/NO and why."

---

## Your Model Scores Analysis

### Your Actual Scores (Example - Replace with Yours)
- Accuracy: 92%
- Precision: 94%
- Recall: 87%
- F1 Score: 0.90
- AUC-ROC: 0.88

---

## What Each Score Means in Your Business Context

### Accuracy (92%): Overall Correctness
**What It Says:** Out of 100 predictions, 92 are correct
**In Your Business:** "Out of 100 companies analyzed, we classify 92 correctly"
**Good For:** General impression of model quality
**Not Good For:** Imbalanced data (many healthy companies, few insolvencies)

### Precision (94%): Quality of Positive Predictions
**What It Says:** When model predicts "insolvent", it's right 94% of the time
**In Your Business:** "When we flag a company as high-risk, it actually is risky 94% of time"
**Business Impact:** Few false alarms (good for reputation, avoids harassing solid companies)
**Example:** Out of 100 "high-risk" flags, 94 are actually risky, 6 are false alarms

### Recall (87%): Coverage of Real Insolvencies
**What It Says:** Model catches 87% of actual insolvencies
**In Your Business:** "We detect 87% of companies that actually go insolvent. We miss 13%."
**Business Impact:** Some insolvencies slip through (each costs £100k+)
**Example:** If 100 insolvencies happen, model catches 87, misses 13

### F1 Score (0.90): Balanced Performance
**What It Says:** Good balance between precision and recall
**In Your Business:** "We catch most insolvencies without too many false alarms"
**Why Matters:** Imbalanced data (few insolvencies, many healthy companies) makes accuracy misleading. F1 is more honest.

### AUC-ROC (0.88): Discrimination Ability
**What It Says:** Model reliably distinguishes between insolvent and healthy companies
**In Your Business:** "Model clearly separates the risky from the safe"
**0.5 = Random guessing, 1.0 = Perfect, 0.88 = Very Good**

---

## Deployment Readiness Decision

### Decision Framework

| Question | Your Answer | Go/No-Go |
|----------|------------|----------|
| **Does model meet minimum accuracy?** | 92% ≥ 85% target | ✅ GO |
| **Does model catch enough insolvencies?** | 87% recall vs 85% target | ✅ GO |
| **Are false alarms acceptable?** | 6% vs 10% tolerance | ✅ GO |
| **Is model stable across data segments?** | Variance 1.8% vs 2% tolerance | ✅ GO |
| **Deployment ready?** | YES, with conditions | ✅ GO |

### Deployment Decision Statement

**Decision: YES, ready for production with monitoring**

**Rationale:**
- Primary goal: "Flag high-risk companies for review" → 94% precision achieves this
- Secondary goal: "Don't miss insolvencies" → 87% recall + manual review = 95% total
- False alarm rate (6%) acceptable - within tolerance
- Performance stable across cohorts

**Conditions:**
- Phase 1 (Month 1-3): Recommendation mode (model suggests, human decides)
- Phase 2 (Month 4+): Assisted mode (model flags, auto-escalate if confidence >80%)
- Monitoring: Alert if precision drops below 90%
- Retraining: Monthly with new data

---

## KPI Mapping: Does Model Performance Meet Business Goals?

### Project KPI #1: Reduce False Positives
**Target:** <10% false alarm rate
**Model Achieves:** 6% (false positive rate = 1 - precision = 1 - 0.94 = 6%)
**Status:** ✅ Exceeds target (6% < 10%)

**Interpretation:** Model flags fewer solid companies than tolerated. Good for company reputation.

---

### Project KPI #2: Catch Insolvencies
**Target:** >85% of actual insolvencies detected
**Model Achieves:** 87% (recall)
**Status:** ✅ Meets target (87% > 85%)

**Interpretation:** Model catches most insolvencies. 13% slip through (mitigated by manual review).

---

### Project KPI #3: Decision Speed
**Target:** Decision within 24 hours of company inquiry
**Model Achieves:** 2 hours (vs 4 hours manual)
**Status:** ✅ Exceeds target (2 hours < 24 hours)

**Interpretation:** Model enables fast decisions, critical for competitive advantage.

---

### Project KPI #4: Cost per Decision
**Target:** <£150 per company analyzed
**Model Achieves:** £54 per company (saves analyst time)
**Status:** ✅ Exceeds target (£54 < £150)

**Interpretation:** Model more cost-effective than manual analysis.

---

## Summary Table

| KPI | Target | Model Score | Status | Business Meaning |
|-----|--------|-------------|--------|------------------|
| False positive rate | <10% | 6% | ✅ Pass | Few false alarms |
| Detection rate | >85% | 87% recall | ✅ Pass | Catches most insolvencies |
| Decision speed | <24 hours | 2 hours | ✅ Pass | Fast decisions |
| Cost per decision | <£150 | £54 | ✅ Pass | Economical |
| Model stability | ±2% variance | ±1.8% | ✅ Pass | Consistent across segments |

**All KPIs Met or Exceeded → Deploy**

---

## Deployment Evaluation Paragraph

*"Model achieves 92% accuracy, 94% precision, 87% recall, 0.90 F1 score. Precision of 94% means 6% false positive rate (well below 10% target), protecting company reputation. Recall of 87% catches most insolvencies; combined with manual expert review of borderline cases, achieves 95% detection (above 85% target). Model speed (2-hour decisions vs 4-hour manual) and cost (£54 vs £150 per company) both exceed KPIs. Deployment ready for production with conditions: Phase 1 (Month 1-3) recommendation mode, Phase 2 assisted mode with auto-escalation, ongoing monitoring and monthly retraining."*

---

## Comparison: Conservative vs Optimistic Scenarios

### Conservative (Model Underperforms 20%)
- Recall drops to 70%
- Precision drops to 75%
- Still deployable? Yes, with stronger manual review layer
- Still meets KPIs? With manual review, yes

### Optimistic (Model Overperforms 20%)
- Recall reaches 95%
- Precision reaches 98%
- Result: Can move to full automation earlier (Month 6 vs Month 12)

---

## What to Add to This Folder

1. Screenshots showing:
   - Confusion matrix with analysis
   - Model performance scores
   - ROC curve
   - Precision-recall curve
2. KPI mapping table
3. Deployment decision document
4. Performance trends (if multiple models tested)
