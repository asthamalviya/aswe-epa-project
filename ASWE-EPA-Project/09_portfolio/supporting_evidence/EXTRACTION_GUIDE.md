# Image Extraction Guide - Supporting Evidence for Portfolio

This guide explains how to extract images from your project PDFs and organize them for the portfolio submission.

## Quick Start

**Option 1: Extract all projects at once**
```bash
bash /Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/extract_all_images.sh
```

**Option 2: Extract individual projects**
```bash
# Project 2
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/9419910600_Module2_Assessment1.pdf" --out /Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/supporting_evidence/project-2/

# Project 3
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/9419910600_Module3_Assessment1.pdf" --out /Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/supporting_evidence/project-3/

# Project 4
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/9419910600_Module4_Assessment1.pdf" --out /Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/supporting_evidence/project-4/

# Project 5
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/9419910600_Module5_Assessment1.pdf" --out /Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/supporting_evidence/project-5/

# Project 6
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/6.pdf" --out /Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/supporting_evidence/project-6/

# Project 7
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/7.pdf" --out /Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/supporting_evidence/project-7/
```

## Project-by-Project Guidance

Each project folder has a **README.md** with:
- ✓ Expected images (what to look for in the PDF)
- ✓ Suggested captions (how to label images for assessors)
- ✓ Assessment evidence quality notes (what examiners value)

### Project 1: Security (✓ Complete)
- **Folder**: `project-1/`
- **Image**: `project-1-security-overview.png`
- **Status**: Already extracted

### Project 2: Data Engineering
- **Folder**: `project-2/`
- **Expected**: ETL pipeline, data quality metrics, source integration, automation results
- **Key caption**: Medallion pattern, 85% error reduction, £30K savings

### Project 3: Strategy & Governance
- **Folder**: `project-3/`
- **Expected**: 5-year roadmap, stakeholder matrix, change model, risk register
- **Key caption**: Kotter 8-step model, cross-functional alignment, 8 stakeholders

### Project 4: ML/AI Risk Prediction
- **Folder**: `project-4/`
- **Expected**: Confusion matrix, feature importance, model comparison, ROC curve, SMOTE, operational impact
- **Key caption**: 4 models compared, F1 0.80, Recall 0.78, £30K savings

### Project 5: AI Business Case
- **Folder**: `project-5/`
- **Expected**: RAG architecture, business case summary, risk register, ethics framework
- **Key caption**: £296K annual savings, ROI 2,346%, payback <2 weeks, 3-pillar ethics

### Project 6: Cloud MVP (Grade A)
- **Folder**: `project-6/`
- **Expected**: VPC architecture, HTTPS flow, latency distribution, load test, CI/CD logs, PR code review
- **Key caption**: 0.49ms latency, 1,662 req/sec, zero defects to prod, 3 real problems solved

### Project 7: Quality Refactoring
- **Folder**: `project-7/`
- **Expected**: Before/after architecture, component diagram, test pyramid, coverage metrics, 7 quality gaps, design patterns
- **Key caption**: Root-cause thinking, 99% coverage, 90 tests in 0.21s, honest gap acknowledgment

## File Organization

After extraction, your structure will be:
```
supporting_evidence/
├── project-1/
│   ├── project-1-security-overview.png
│   └── README.md
├── project-2/
│   ├── project-2-page-1.png
│   ├── project-2-page-2.png
│   └── README.md
├── project-3/
│   ├── project-3-page-1.png
│   ├── project-3-page-2.png
│   └── README.md
... (projects 4-7 similar)
```

## Converting Portfolio to DOCX

When ready to submit:

1. **Open markdown portfolio** in Word or Google Docs
2. **For each project section**, add images:
   - Paste image after "Technical Implementation"
   - Add figure number and caption (see README.md for each project)
   - Keep images close to referenced text
3. **Cross-reference in text**:
   ```
   "As shown in Figure 2.1, the medallion pattern..."
   "Figure 6.2 illustrates the HTTPS handshake..."
   ```
4. **Quality check**:
   - ✓ All images clear and readable
   - ✓ All captions explain the "why" not just the "what"
   - ✓ Images referenced in text
   - ✓ Figure numbers sequential (1.1, 1.2, 2.1, 2.2, etc.)

## Assessor Impact

**Without images:**
- "I designed a secure network" (claim)

**With images:**
- "Figure 1.1 shows 5-layer network segmentation reducing attack surface from 100% to <5%" (evidence)

**Images that win assessor confidence:**
- Diagrams showing architectural choices (trade-offs visible)
- Performance metrics (latency graph, throughput numbers)
- Before/after comparisons (proof of improvement)
- Code snippets in screenshots (real implementation, not theory)
- CI/CD logs (quality discipline visible)
- Git history/PR comments (collaborative problem-solving)

## Troubleshooting

**Images don't extract?**
- Check PDF file exists and isn't corrupted
- Try opening PDF in Preview app first
- Verify write permissions to output folder
- macOS may prompt for permission—allow clipboard access

**Images are blank/black?**
- Some PDFs have security restrictions
- Try opening in PDF viewer and exporting manually
- Contact assessor if PDF access issues persist

**Need to extract just one page?**
```bash
# Extract only pages 3-5 from a PDF
sips -s format png input.pdf --out output/
# Then keep only page-03, page-04, page-05.png
```

---

**Next step:** Run the extraction script, then update portfolio markdown to reference the images you've placed in each project folder.
