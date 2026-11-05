# Project 5: AI Knowledge Search Business Case & Proposal - Supporting Evidence

## Expected Images

From: `9419910600_Module5_Assessment1.pdf`

- **RAG system architecture** — Index (knowledge sources) → Retrieve → Generate (LLM) → Citations
- **Business case summary** — Problem (£592K waste), Solution (£12,100 cost), Benefit (£296K annual), ROI (2,346%), Payback (<2 weeks)
- **Risk register matrix** — R1-R9 mapped to likelihood/impact/mitigation (LLM hallucination, privacy breach, over-reliance, etc.)
- **3-pillar ethics framework** — Transparency (citations), Accountability (review), Fairness (no bias)
- **Knowledge sources diagram** — Confluence, GitHub, Slack, Notion, Miro, shared drives all feeding RAG index

## Captions for Portfolio

**Business Case (Figure 5.1):**
```
AI Knowledge Assistant business case: Problem costs £592K annually (SPIKE 
investigations + extra sprints consume 25% of feature development time). 
Solution costs £12,100 (LLM APIs, tooling, governance). Conservative benefit 
estimate £296K annual (50% recovery of wasted time). ROI 2,346%; payback 
period <2 weeks. This analysis demonstrates disciplined business case approach: 
problem quantified, solution costed, benefits justified, not just technology 
enthusiasm.
```

**RAG Architecture (Figure 5.2):**
```
Retrieval-Augmented Generation (RAG) architecture: indexing phase ingests 6 
knowledge sources (Confluence, GitHub, Slack, Notion, Miro, file shares), 
retrieval phase finds relevant documents for user query, generation phase 
prompts GPT-4 (fallback Llama 3.1 8B) to answer with source citations. 
Architecture mitigates key AI risks: citations enable fact-checking, retrieval 
prevents hallucination-from-scratch, human review flag ensures quality.
```

**AI Ethics Framework (Figure 5.3):**
```
Three-pillar ethical AI governance: Transparency (every answer cites source 
document + date), Accountability (Technical Architects review flagged answers 
monthly), Fairness (no demographic indexing prevents biased recommendations). 
This framework operationalizes responsible AI principles in production system. 
Shows awareness that AI governance is not optional—it's a design requirement 
for trustworthy deployment.
```

**Risk Assessment (Figure 5.4):**
```
Risk register (ISO 31000 format) identifies 9 risks: LLM hallucination 
(mitigated: retrieval-only design), data privacy breach (mitigated: UK 
residency, encryption), over-reliance on AI (mitigated: human review, 
transparency), and 6 others. Each risk has likelihood/impact assessment and 
specific mitigation. Demonstrates risk governance maturity: proactive 
identification, not reactive problem-solving.
```

## Assessment Evidence Quality

✓ **What examiners value:**
- Business case discipline (problem quantified, benefits justified, ROI calculated)
- Ethical AI integration (not bolted-on, but core to design)
- Risk governance (proactive identification and mitigation)
- Awareness of AI trends (RAG vs fine-tuning, responsible AI principles)
- Sustainability and inclusivity mentions

## Next Steps

Extract Project 5 images:
```bash
sips -s format png "/Users/astha.malviya/Documents/aswe-epa-project/ASWE-EPA-Project/raw_files/feedback_with submission/9419910600_Module5_Assessment1.pdf" --out .
```
