#!/bin/bash
# Extract all project images from PDFs
# Run this on your Mac outside the Claude Code sandbox

BASE_DIR="/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project"
FEEDBACK_DIR="$BASE_DIR/raw_files/feedback_with submission"
OUTPUT_BASE="$BASE_DIR/09_portfolio/supporting_evidence"

# Define projects and their PDF files
declare -a PROJECTS=(
  "2:$FEEDBACK_DIR/9419910600_Module2_Assessment1.pdf"
  "3:$FEEDBACK_DIR/9419910600_Module3_Assessment1.pdf"
  "4:$FEEDBACK_DIR/9419910600_Module4_Assessment1.pdf"
  "5:$FEEDBACK_DIR/9419910600_Module5_Assessment1.pdf"
  "6:$FEEDBACK_DIR/6.pdf"
  "7:$FEEDBACK_DIR/7.pdf"
)

for project_info in "${PROJECTS[@]}"; do
  PROJECT_NUM="${project_info%%:*}"
  PDF_PATH="${project_info##*:}"
  OUTPUT_DIR="$OUTPUT_BASE/project-$PROJECT_NUM"

  if [ ! -f "$PDF_PATH" ]; then
    echo "❌ Project $PROJECT_NUM: PDF not found at $PDF_PATH"
    continue
  fi

  mkdir -p "$OUTPUT_DIR"

  echo "📥 Extracting images from Project $PROJECT_NUM PDF..."
  sips -s format png "$PDF_PATH" --out "$OUTPUT_DIR" 2>&1 | grep -v "Warning: Output file"

  # Count extracted images
  image_count=$(ls "$OUTPUT_DIR"/*.png 2>/dev/null | wc -l)
  if [ $image_count -gt 0 ]; then
    echo "   ✓ Extracted $image_count image(s) to $OUTPUT_DIR"
    # Rename to descriptive names
    ls "$OUTPUT_DIR"/*.png 2>/dev/null | sort -V | nl | while read num file; do
      mv "$file" "$OUTPUT_DIR/project-$PROJECT_NUM-page-$num.png"
    done
    echo "   ✓ Renamed images for clarity"
  else
    echo "   ⚠ No images extracted"
  fi
  echo ""
done

echo "✅ All image extractions complete!"
echo ""
echo "Summary:"
for i in 2 3 4 5 6 7; do
  OUTPUT_DIR="$OUTPUT_BASE/project-$i"
  if [ -d "$OUTPUT_DIR" ]; then
    count=$(ls "$OUTPUT_DIR"/*.png 2>/dev/null | wc -l)
    echo "  Project $i: $count images"
  fi
done
