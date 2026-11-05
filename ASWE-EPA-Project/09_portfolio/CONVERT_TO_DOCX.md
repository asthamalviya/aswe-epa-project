# Converting Portfolio to DOCX for Submission

The portfolio is ready to submit. Here are the easiest methods to convert the markdown to a professional DOCX file.

## Method 1: Google Docs (Easiest - Recommended)

1. **Open the markdown file in Google Docs:**
   - Go to Google Drive → Upload file
   - Upload: `PORTFOLIO-WRITEUP.md`
   - Right-click → Open with → Google Docs
   - Google Docs will auto-convert markdown to formatted document

2. **Add supporting images:**
   - For each project section, insert image from folder:
     - Project 1: `/09_portfolio/supporting_evidence/project-1/project-1-security-overview.png`
     - Project 2-7: `/09_portfolio/supporting_evidence/project-N/project-N-page-1.png`
   - Place image after "Technical Implementation" section of each project
   - Add caption (see each project's README.md for suggested caption text)

3. **Format & finalize:**
   - Set margins to 1 inch (standard)
   - Font: Calibri or Arial, size 11pt
   - Spacing: 1.5 lines
   - Number pages (Insert → Page number)
   - Add header: "ASWE Portfolio - Astha Malviya"

4. **Download as DOCX:**
   - File → Download → Microsoft Word (.docx)
   - Save as: `ASWE-Portfolio-AM2-Submission.docx`

---

## Method 2: Microsoft Word Online (Also Easy)

1. Upload markdown to OneDrive
2. Open in Word Online
3. Convert using same steps as Method 1
4. Download to your computer

---

## Method 3: LibreOffice/OpenOffice (Local)

If you have LibreOffice installed:

```bash
# Convert markdown to DOCX using LibreOffice
libreoffice --headless --convert-to docx PORTFOLIO-WRITEUP.md --outdir ./
```

Then add images in Word/LibreOffice:
- Open generated `PORTFOLIO-WRITEUP.docx`
- Insert → Image for each project
- Add captions from README files

---

## Method 4: Python Script (Local - Requires python-docx)

If you have `python-docx` installed:

```bash
pip install python-docx
python3 portfolio_to_docx.py
```

(Script below)

---

## Method 5: Online Markdown to DOCX Converter

Visit: https://cloudconvert.com/md-to-docx
- Upload `PORTFOLIO-WRITEUP.md`
- Download converted DOCX
- Add images manually in Word

---

## Template Python Script (for Method 4)

Save this as `portfolio_to_docx.py` and run `python3 portfolio_to_docx.py`:

```python
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
import re

def md_to_docx(md_file, docx_file):
    doc = Document()
    
    # Read markdown
    with open(md_file, 'r') as f:
        content = f.read()
    
    # Split by lines and process
    lines = content.split('\n')
    
    for line in lines:
        # Heading 1
        if line.startswith('# '):
            heading = doc.add_heading(line[2:], level=1)
        
        # Heading 2
        elif line.startswith('## '):
            heading = doc.add_heading(line[3:], level=2)
        
        # Heading 3
        elif line.startswith('### '):
            heading = doc.add_heading(line[4:], level=3)
        
        # Bullet points
        elif line.startswith('- '):
            doc.add_paragraph(line[2:], style='List Bullet')
        
        # Bold text (convert **text** to bold)
        elif line.strip():
            p = doc.add_paragraph()
            # Simple conversion of **text** to bold
            parts = re.split(r'\*\*(.*?)\*\*', line)
            for i, part in enumerate(parts):
                if i % 2 == 0:  # Normal text
                    p.add_run(part)
                else:  # Bold text
                    p.add_run(part).bold = True
        
        # Empty line
        else:
            doc.add_paragraph()
    
    # Save
    doc.save(docx_file)
    print(f"✓ DOCX created: {docx_file}")

# Run conversion
md_to_docx('PORTFOLIO-WRITEUP.md', 'ASWE-Portfolio-AM2-Submission.docx')

# Then manually add images:
print("""
Next steps:
1. Open ASWE-Portfolio-AM2-Submission.docx in Word
2. For each project section, insert image:
   - Project 1: supporting_evidence/project-1/project-1-security-overview.png
   - Project 2: supporting_evidence/project-2/project-2-page-1.png
   ... (Projects 3-7 similar)
3. Add captions from each project's README.md
4. Save and submit
""")
```

---

## Image Insertion Guide

After creating DOCX, add images in Word:

**For each project:**
1. Position cursor at end of "Technical Implementation" section
2. Insert → Pictures → Choose image from `supporting_evidence/project-N/`
3. Right-click image → Wrap Text → Square (so text flows around)
4. Add caption:
   - Right-click image → Insert Caption
   - Use format: "Figure X.Y: [text from project README]"

Example caption for Project 6:
```
Figure 6.1: Cloud MVP architecture on AWS: FastAPI backend on EC2, 
stateless design enables horizontal scaling (multiple copies load-balanced). 
Security hardened: TLS encryption in transit, AES-256 at rest, 
least-privilege IAM (no wildcards).
```

---

## Submission Checklist

Before submitting:

- [ ] All 7 projects included
- [ ] All supporting images inserted (7 images total)
- [ ] Page numbers added
- [ ] Header: "ASWE Portfolio - Astha Malviya"
- [ ] Font: Calibri/Arial, 11pt, 1.5 spacing
- [ ] Margins: 1 inch all sides
- [ ] File name: `ASWE-Portfolio-AM2-Submission.docx`
- [ ] File size reasonable (< 50MB)
- [ ] Opened in Word to verify formatting looks correct

---

## File Information

**Source file:** `PORTFOLIO-WRITEUP.md` (596 lines, ~15KB markdown)

**Supporting images:** 7 PNG files in `supporting_evidence/` folders
- Total image size: ~1MB
- Recommended final DOCX size: 5-15MB with images embedded

**Estimated page count:** 25-35 pages (depending on image sizes and formatting)

---

## Support

If you encounter issues:
1. Try Method 1 (Google Docs) first—it's most reliable
2. If images don't display, re-insert them from the `supporting_evidence/` folders
3. If formatting looks off, check font size and spacing in Word

Good luck with your submission! 📋
