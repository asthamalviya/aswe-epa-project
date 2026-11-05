# Supporting Evidence Index

This document maps portfolio projects to their supporting images and diagrams in the submission PDFs.

## Image Extraction Guide

Supporting images are embedded in these submission files in the `raw_files/feedback_with submission/` folder:

| Project | File(s) | Expected Images | Purpose |
|---------|---------|-----------------|---------|
| **Project 1: Security** | `1.pdf` | Network architecture diagram, Risk matrix (5×5), Threat landscape visual | Shows security layering, vulnerability prioritization |
| **Project 2: Data Engineering** | `9419910600_Module2_Assessment1.pdf` | ETL pipeline diagram, Data flow (sources → medallion layers), Quality metrics dashboard | Demonstrates data architecture, medallion pattern, automation |
| **Project 3: Strategy** | `9419910600_Module3_Assessment1.pdf` | 5-year roadmap timeline, Stakeholder alignment matrix, Governance framework diagram | Illustrates transformation roadmap, cross-functional alignment |
| **Project 4: ML/AI Risk** | `9419910600_Module4_Assessment1.pdf` | Confusion matrix, Feature importance chart, Model comparison table, Deployment architecture | Shows ML model evaluation, feature engineering, deployment |
| **Project 5: AI Business Case** | `9419910600_Module5_Assessment1.pdf` | RAG architecture diagram, Risk register matrix, ROI analysis graph, 3-pillar ethics framework | Visualizes AI system design, risk mitigation, business value |
| **Project 6: Cloud MVP** | `6.pdf` | VPC architecture diagram, HTTPS traffic flow, Latency distribution graph (P95/P99), Load balancer setup, API Gateway routing, Test results screenshot | Production system architecture, networking concepts, performance proof |
| **Project 7: Quality Refactoring** | `7.pdf` or `7 2.pdf` | Before/after code structure diagrams, Layered architecture visual, Test pyramid (34 char + 23 unit + 19 service + 14 integration), Coverage metrics | Shows quality improvements, design patterns, test strategy |

## How to Use These Images in Submission

### Option 1: Manual Extraction (Recommended for DOCX)
1. Open each PDF in Adobe Acrobat or Preview
2. Right-click → Export Image for each diagram
3. Save to `supporting_evidence/project-N/` folder
4. When converting portfolio to DOCX, insert images near relevant project sections

### Option 2: Automated Extraction
If your submission platform requires embedded images, use:
```bash
# macOS Preview can bulk-export PDFs to images
open 1.pdf  # Then File → Export → choose PNG/JPEG format

# Or use command-line (if available):
pdftoppm -png 1.pdf page_
pdfimages -png 1.pdf img_
convert 1.pdf page-.png
```

### Option 3: Link to Original Submissions
In the DOCX portfolio, add annotations like:
- "See Figure A1 in Project 1 submission (1.pdf, pages 3-4) for network architecture"
- "Architecture diagram on page 8 of 6.pdf shows API Gateway routing"

## Evidence Quality Checklist

For each image you extract, verify:
- ✓ Clarity: Readable on screen and when printed
- ✓ Labels: All axes, components, and legend items are visible
- ✓ Context: Caption explains what the diagram shows
- ✓ Source: Traced back to project deliverable (e.g., "From Project 6 Terraform configuration diagrams")

## Recommended Image Placement in Portfolio

**Project 1 Section:**
- Network segmentation diagram (5 layers: DMZ, App, DB, Corporate, Admin)
- 5×5 Risk matrix showing severity assessment

**Project 2 Section:**
- Medallion architecture (raw → staging → curated → analytics)
- Data quality metrics before/after chart

**Project 3 Section:**
- 5-year roadmap timeline
- Stakeholder alignment matrix (8 groups × key decisions)

**Project 4 Section:**
- Confusion matrix (Predicted vs Actual)
- Feature importance bar chart
- Model comparison: F1/AUC/Latency for 4 models

**Project 5 Section:**
- RAG system architecture (index → retrieve → generate)
- Risk register matrix (likelihood × impact)

**Project 6 Section:**
- VPC architecture with security layers
- HTTPS handshake flow diagram
- Latency distribution histogram (P50, P95, P99)
- Screenshot: GitHub Actions CI/CD logs showing zero defects
- Screenshot: Load test results (50 concurrent users, 1,662 req/s)

**Project 7 Section:**
- Monolithic vs. Layered architecture comparison
- Test pyramid (distribution of test types)
- Coverage metrics: line % vs branch %

## Notes for Assessors

When images are embedded in the final submission:
1. Each image should have a figure number and caption
2. Captions should explain the "why" not just the "what"
   - ✓ Good: "Figure 2.1: ETL medallion pattern reduces data quality issues from 9.5% to 1.4%"
   - ✗ Weak: "Figure 2.1: Data pipeline architecture"
3. Reference images in text: "As shown in Figure 6.2, the VPC architecture implements..."

---

**Portfolio images make the difference between:**
- Claim: "I designed a secure network"
- Evidence: "Figure 1.1 shows the 5-layer segmentation reducing attack surface from 100% to <5%"

Extract and embed these to strengthen your assessment submission.
