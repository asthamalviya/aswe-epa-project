# Project 2: Data Engineering - Supporting Evidence

## Expected Images

From: `9419910600_Module2_Assessment1.pdf`

- **ETL pipeline architecture** — Medallion pattern (raw → staging → curated → analytics layers)
- **Data quality metrics** — Before/after charts (error rate 9.5% → 1.4%, completeness 88% → 97%)
- **Source integration diagram** — Oracle, REST APIs, CSV files flowing into Glue
- **Automation results** — Data ingestion time reduction (6 hours → 1.2 hours)

## Captions for Portfolio

**Pipeline Architecture (Figure 2.1):**
```
Data pipeline using medallion pattern: raw layer preserves source data as-is, 
staging layer applies validation and deduplication (fuzzy matching), curated 
layer creates business-ready normalized data, analytics layer exposes via 
Athena to 200+ staff. This architecture reduced manual labour from 12 hrs/week 
to 2 hrs/week (83% reduction), recovering £30K annually.
```

**Quality Metrics (Figure 2.2):**
```
Data quality improvements across four key metrics: ingestion speed improved 80%, 
error rate reduced 85%, officer completeness increased 9 percentage points, 
and manual labour requirements dropped 83%. Each improvement directly enabled 
operational efficiency gains measured in staff hours and cost savings.
```

## Assessment Evidence Quality

✓ **What examiners value:**
- Visual proof of data transformation (raw → staged → curated stages)
- Quantified improvements (before/after metrics)
- Technical choices justified (why Glue, S3, Athena, PostgreSQL)
- Business impact (cost savings, staff capacity freed)

## Next Steps

Run the extraction script to populate this folder with images:
```bash
bash /Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/extract_all_images.sh
```

Or extract Project 2 only:
```bash
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/9419910600_Module2_Assessment1.pdf" --out .
```
