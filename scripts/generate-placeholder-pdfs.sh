#!/bin/bash

# Generate Simple Text PDFs for Algorithm Placeholders
# These are temporary until real flowchart PDFs are uploaded

echo "📄 Generating placeholder algorithm PDFs..."

# ACLS Algorithms
cat > /tmp/cardiac-arrest.md << 'EOF'
# Adult Cardiac Arrest Algorithm - ACLS

## VF/pVT Pathway
1. Start CPR (100-120/min, 2-2.4 inches depth)
2. Give oxygen, attach monitor/defibrillator
3. Shock (biphasic: 120-200J)
4. Resume CPR immediately for 2 minutes
5. IV/IO access
6. Epinephrine 1mg every 3-5 min
7. Consider advanced airway
8. Amiodarone 300mg for refractory VF/pVT

## Asystole/PEA Pathway
1. Start CPR
2. Give oxygen, attach monitor
3. IV/IO access
4. Epinephrine 1mg every 3-5 min
5. Consider advanced airway
6. Treat reversible causes (H's and T's)

## H's and T's
- Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/hyperkalemia, Hypothermia
- Tension pneumothorax, Tamponade, Toxins, Thrombosis (pulmonary/coronary)

Source: 2020 AHA Guidelines
For full flowchart, visit: https://cpr.heart.org/algorithms
EOF

echo "✅ Created cardiac-arrest.md"

# You can use pandoc or other tools to convert these to PDF
# For now, these are text files that explain the algorithms

echo ""
echo "📝 Placeholder algorithm files created in /tmp/"
echo ""
echo "To create real PDFs, you have two options:"
echo ""
echo "1. RECOMMENDED: Find and download official AHA algorithm flowcharts"
echo "   - Visit: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines"
echo "   - Download PDF flowcharts"
echo "   - Save to public/algorithms/acls/, public/algorithms/pals/, etc."
echo ""
echo "2. Use the sepsis algorithm you already have as a template"
echo "   - It's in: public/algorithms/acls/sepsis-algorithm.pdf"
echo "   - Download similar flowcharts for other conditions"
echo ""
echo "For now, I'll update aha.ts to show algorithm details in text format"
echo "when PDFs aren't available yet."
