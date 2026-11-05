#!/bin/bash
# Extract Project 1 images from 1.pdf
# Run this on your Mac outside the Claude Code sandbox

PDF_PATH="/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/1.pdf"
OUTPUT_DIR="/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/09_portfolio/supporting_evidence/project-1"

mkdir -p "$OUTPUT_DIR"

echo "Extracting images from Project 1 PDF..."
sips -s format png "$PDF_PATH" --out "$OUTPUT_DIR"

echo ""
echo "✓ Extraction complete. Images saved to:"
ls -lh "$OUTPUT_DIR"/*.png 2>/dev/null | wc -l
echo "images in $OUTPUT_DIR"

# Optional: open the directory
# open "$OUTPUT_DIR"
