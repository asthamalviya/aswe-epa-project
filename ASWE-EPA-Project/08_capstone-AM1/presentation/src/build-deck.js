const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Capstone Project presentation";

const NAVY = "1E2761", TEAL = "028090", ICE = "E8F1F8", INK = "1F2937", MUTED = "5B6472", WHITE = "FFFFFF";
const PH_FILL = "FFF2CC", PH_LINE = "B7950B";
const F = "Arial";
const W = 13.333;

let n = 0;
function base(title, ksbs, opts = {}) {
  const s = pres.addSlide();
  n++;
  s.background = { color: opts.dark ? NAVY : WHITE };
  if (title) s.addText(title, { isTextBox: true, x: 0.6, y: 0.4, w: W - 1.2, h: 0.9, fontFace: F, fontSize: 32, bold: true, color: opts.dark ? WHITE : NAVY, margin: 0, valign: "top" });
  if (ksbs) s.addText(ksbs, { isTextBox: true, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.15, x: 0.6, y: 6.8, w: 0.5 + ksbs.length * 0.105, h: 0.45, fontFace: F, fontSize: 14, color: opts.dark ? NAVY : WHITE, fill: { color: opts.dark ? ICE : TEAL }, margin: 0, align: "center", valign: "middle" });
  s.addText(String(n), { isTextBox: true, x: W - 1.1, y: 6.85, w: 0.5, h: 0.4, fontFace: F, fontSize: 14, color: opts.dark ? ICE : MUTED, align: "right", margin: 0, valign: "middle" });
  return s;
}
function ph(s, text, x, y, w, h, size = 20) {
  s.addText(text, { isTextBox: true, x, y, w, h, fontFace: F, fontSize: size, color: INK, fill: { color: PH_FILL }, line: { color: PH_LINE, width: 1.25, dashType: "dash" }, margin: 10, valign: "middle", align: "center" });
}
function bullets(s, items, x, y, w, h, size = 24, color = INK) {
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })),
    { isTextBox: true, x, y, w, h, fontFace: F, fontSize: size, color, paraSpaceAfter: 10, valign: "top", margin: 0 });
}
function card(s, head, body, x, y, w, h, o = {}) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: o.fill || ICE }, line: o.line ? { color: o.line, width: 2.5 } : { type: "none" } });
  s.addText(head, { isTextBox: true, x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.5, fontFace: F, fontSize: 22, bold: true, color: o.headColor || NAVY, margin: 0 });
  s.addText(body, { isTextBox: true, x: x + 0.25, y: y + 0.8, w: w - 0.5, h: h - 1.0, fontFace: F, fontSize: o.size || 20, color: o.color || INK, margin: 0, valign: "top" });
}
const hdr = (t) => ({ text: t, options: { bold: true, color: WHITE, fill: { color: NAVY } } });
const TODO = (t) => ({ text: "[To complete: " + t + "]", options: { fill: { color: PH_FILL } } });
function table(s, rows, x, y, w, colW, size = 20) {
  s.addTable(rows, { x, y, w, colW, fontFace: F, fontSize: size, color: INK, border: { type: "solid", pt: 0.75, color: "C9D3DD" }, valign: "middle", margin: 0.08, rowH: 0.55 });
}

// 1 Title and overview
let s = base(null, "K17", { dark: true });
s.addText("AI knowledge search for software delivery teams", { isTextBox: true, x: 0.6, y: 0.4, w: 12.1, h: 1.7, fontFace: F, fontSize: 38, valign: "bottom", bold: true, color: WHITE, margin: 0 });
s.addText("Design, build and pilot of a retrieval-augmented assistant at a UK government registry", { isTextBox: true, x: 0.6, y: 2.45, w: 12.1, h: 0.6, fontFace: F, fontSize: 24, italic: true, color: ICE, margin: 0 });
s.addText([
  { text: "Problem: ", options: { bold: true } }, { text: "every feature started with a 3 to 5 day investigation spike", options: { breakLine: true } },
  { text: "Built: ", options: { bold: true } }, { text: "an assistant that answers from the registry's own documentation, citing a source every time", options: { breakLine: true } },
], { isTextBox: true, x: 0.6, y: 3.3, w: 12, h: 1.4, fontFace: F, fontSize: 24, color: WHITE, margin: 0, paraSpaceAfter: 8 });
ph(s, "[To complete: headline result, e.g. spike duration before and after the pilot]", 0.6, 4.85, 8.2, 0.7);
s.addText("[To complete: your name]   |   Advanced Software Engineering Apprenticeship: Capstone Project   |   [To complete: date]", { isTextBox: true, x: 0.6, y: 5.9, w: 12, h: 0.5, fontFace: F, fontSize: 16, color: ICE, margin: 0 });
s.addNotes("2 minutes. Key message: I built and piloted an AI assistant that answers developers' questions from the registry's own documentation, with a source cited in every answer.\n\n\"I am [role] on the registry's delivery team. Over the last 12 months, all 8 features we started began with a 3 to 5 day investigation spike, and 6 needed an extra sprint.\"\n\"Over 12 weeks I designed, built and piloted a retrieval-augmented assistant with 10 developers. [Result in one sentence].\"");

// 2 Business problem
s = base("The knowledge exists, but developers cannot find it", "S1   K1   S16");
const stats = [["3 to 5 days", "investigation spike at the start of every feature"], ["6 of 8", "features needed an extra sprint in the last 12 months"], ["6 + 2", "platforms and pipeline tools hold the knowledge"]];
stats.forEach(([big, small], i) => {
  const y = 1.6 + i * 1.7;
  s.addText(big, { isTextBox: true, x: 0.6, y, w: 3.4, h: 0.9, fontFace: F, fontSize: 44, bold: true, color: TEAL, margin: 0, valign: "middle" });
  s.addText(small, { isTextBox: true, x: 4.1, y, w: 3.6, h: 0.9, fontFace: F, fontSize: 20, color: INK, margin: 0, valign: "middle" });
});
ph(s, "[To complete: value stream map of a feature start, with the spike highlighted and its duration labelled]", 8.1, 1.6, 4.6, 4.9);
s.addNotes("3 minutes. Spikes take about a quarter of each feature's timeline; the registry's strategy commits to efficient digital delivery (K1).\nWhy non-routine (S16): no single owner, requirements unclear at the start and expected to emerge through the pilot.\nWho is affected: developers, new joiners, knowledge holders, delivery manager.\nRoot cause (Five Whys): [the chain you actually followed].\nOne quote from a developer interview: [to complete].\nDo NOT use the Module 5 waste and ROI totals (592,000 and 296,000 pounds); they do not reconcile.");

// 3 Scope, KPIs and constraints
s = base("A narrow MVP with measurable success criteria", "S3   B3   S16");
card(s, "In scope", "Confluence and GitHub indexing\nAnswers with citations\nWeb interface and Slack bot\n10-developer pilot", 0.6, 1.5, 4.4, 2.6);
card(s, "Out of scope", "Four other platforms (Phase 2)\nFine-tuning a model\nAI code review\nRestricted repositories", 0.6, 4.3, 4.4, 2.35, { fill: "F1F3F5" });
table(s, [
  [hdr("KPI"), hdr("Baseline"), hdr("Target")],
  ["Spike duration", "3 to 5 days", TODO("target")],
  ["Retrieval accuracy", "n/a", "80%+ on 50 queries"],
  ["Developer trust", "n/a", "4.0 out of 5+"],
  ["Response time", "n/a", TODO("NFR3")],
], 5.4, 1.5, 7.3, [2.5, 1.9, 2.9]);
s.addText("Constraints: UK GDPR and data protection screening  |  government AI principles  |  security classification rules  |  data kept in registry or approved UK-region service", { isTextBox: true, x: 5.4, y: 4.6, w: 7.3, h: 1.2, fontFace: F, fontSize: 18, color: INK, margin: 0, valign: "top" });
ph(s, "[To complete: how scope was agreed, and with whom]", 5.4, 5.9, 7.3, 0.75, 18);
s.addNotes("2.5 minutes. Why two platforms first: highest value and lowest data protection risk. Slack holds personal data, so it waits for Phase 2 and a data protection impact assessment.\nGive one example of a legal or ethical requirement changing the design: mandatory citations, exclusion of restricted repositories, content minimised in audit logs (S3, B3).");

// 4 Options and business case
s = base("Three options compared; data residency decided it", "K2   K4   S1 (Distinction)   S18 (Distinction)");
const opts = [
  ["Do nothing", "Spikes continue at 3 to 5 days per feature\nNo build cost", {}],
  ["Off-the-shelf", "e.g. Glean, Guru\nFast to start\nData residency risk", {}],
  ["Bespoke (chosen)", "Data stays in registry infrastructure\nCitations designed in\nBuild and maintenance effort", { line: TEAL, fill: "E6F4F5", headColor: TEAL }],
];
opts.forEach(([h, b, o], i) => card(s, h, b, 0.6 + i * 4.1, 1.5, 3.85, 2.9, o));
ph(s, "[To complete: recalculated decision matrix scores. The Module 5 totals do not add up]", 0.6, 4.7, 6.0, 1.9, 18);
ph(s, "[To complete: confirmed cost of chosen option. The £12,100 estimate is unconfirmed; recheck before quoting]", 6.8, 4.7, 5.9, 1.9, 18);
s.addNotes("2.5 minutes. Distinction S1: justify the technology chosen for each role (retrieval, vector store, model, interface) and who it serves.\nDistinction S18 sentence: \"I used Five Whys for root cause and value stream mapping for where time went, because the problem was lost time across a process, not a single fault. I considered a survey alone and rejected it because [reason].\"\nK4 evaluation: one limit of the decision matrix (weights are subjective) and how you reduced it (e.g. weights agreed with stakeholders).");

// 5 Plan and method
s = base("Adapted Scrum: six two-week sprints", "K5, S5 (Distinction)   K15   K3   S2");
const sprints = [["1 to 2", "Discovery and governance"], ["3 to 4", "Ingestion"], ["5 to 6", "Retrieval engine"], ["7 to 8", "Interface and governance"], ["9 to 10", "Pilot"], ["11 to 12", "Evaluation"]];
sprints.forEach(([wk, name], i) => {
  const x = 0.6 + i * 2.05;
  s.addShape(pres.shapes.OVAL, { x: x + 0.6, y: 1.5, w: 0.7, h: 0.7, fill: { color: i === 4 ? TEAL : NAVY } });
  s.addText(String(i + 1), { isTextBox: true, x: x + 0.6, y: 1.5, w: 0.7, h: 0.7, fontFace: F, fontSize: 22, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
  s.addText([{ text: "Weeks " + wk, options: { bold: true, breakLine: true } }, { text: name }], { isTextBox: true, x, y: 2.35, w: 1.9, h: 1.3, fontFace: F, fontSize: 18, color: INK, align: "center", valign: "top", margin: 0 });
  if (i < 5) s.addShape(pres.shapes.LINE, { x: x + 1.4, y: 1.85, w: 1.15, h: 0, line: { color: "9AA5B1", width: 1.5 } });
});
card(s, "Why adapted Scrum", "AI behaviour cannot be fully planned in advance: benchmark results each sprint decide what comes next. Waterfall and a hybrid were considered and rejected.", 0.6, 3.9, 6.0, 2.75, { size: 20 });
ph(s, "[To complete: how you adapted Scrum, how cost and time were estimated, top three risks and mitigations]", 6.8, 3.9, 5.9, 2.75, 18);
s.addNotes("2.5 minutes. Distinction K5, S5 sentence: \"I chose adapted Scrum over Waterfall because [e.g. sprint 3 benchmark results changed the chunking approach]. I adapted it by [e.g. shorter ceremonies for a solo developer].\"\nK15: work breakdown structure and effort estimates per sprint.\nTools: Jira, Confluence, GitHub and [tools actually used].\nStakeholders: pilot developers, Technical Architects panel, security, Finance, delivery manager, your manager.\nName the risk that actually materialised and point to slide 9.");

// 6 Research and solution choice
s = base("Research led to retrieval with mandatory citations", "S14   K18, S13 (Distinction)   S17 (Distinction)");
table(s, [
  [hdr(""), hdr("Retrieval (chosen)"), hdr("Fine-tuning"), hdr("Knowledge graph")],
  [{ text: "Uses latest content", options: { bold: true } }, "Yes, on re-index", "No, needs retraining", "Yes, if maintained"],
  [{ text: "Cites its sources", options: { bold: true } }, "Yes, by design", "No", "Partly"],
  [{ text: "Effort for 12-week MVP", options: { bold: true } }, "Medium", "High", "High"],
  [{ text: "Hosting", options: { bold: true } }, "Hosted model with open-source fallback", "Model training needed", "Graph build needed"],
], 0.6, 1.5, 12.1, [3.1, 3.2, 2.9, 2.9], 18);
ph(s, "[To complete: two or three sources you cite, each checked against its claim (see fix list: Xia et al., Peng et al.)]", 0.6, 5.0, 12.1, 1.55, 18);
s.addNotes("2.5 minutes. Verify every cell in the comparison table against your research before presenting.\nHow you researched: where you searched, how you judged sources.\nDeveloper trust research is the reason for mandatory citations.\nDistinction K18, S13: compare and contrast your solution with alternatives from research.\nDistinction S17: name one weakness of the chosen solution you accepted knowingly, and how you contained it.");

// 7 What I built
s = base("What I built: a question becomes a cited answer", "S19   K26   K27");
const flow = ["Confluence and GitHub", "Ingestion: chunk and embed", "Vector store", "Retrieval", "Model and citation layer", "Web interface and Slack bot"];
flow.forEach((t, i) => {
  const x = 0.6 + i * 2.05;
  s.addText(t, { isTextBox: true, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.1, x, y: 1.6, w: 1.8, h: 1.3, fontFace: F, fontSize: 16, bold: true, color: WHITE, fill: { color: i === 4 ? TEAL : NAVY }, align: "center", valign: "middle", margin: 6 });
  if (i < 5) s.addShape(pres.shapes.LINE, { x: x + 1.8, y: 2.25, w: 0.25, h: 0, line: { color: "9AA5B1", width: 2, endArrowType: "triangle" } });
});
s.addText("Planned architecture from the proposal. Replace with the as-built diagram.", { isTextBox: true, x: 0.6, y: 3.05, w: 12.1, h: 0.4, fontFace: F, fontSize: 14, italic: true, color: MUTED, margin: 0 });
ph(s, "[To complete: demo clip or UI screenshot showing an answer with its citation]", 0.6, 3.7, 6.0, 2.9, 18);
ph(s, "[To complete: one short code snippet (retrieval with citations or Slack handler), deployment pipeline and WCAG 2.2 AA approach]", 6.8, 3.7, 5.9, 2.9, 18);
s.addNotes("3 minutes. One design pattern and why, e.g. a replaceable model provider so the open-source fallback is a configuration change.\nExplain the snippet in plain terms first, then the technical detail.\nOne technical challenge and how you solved it: [to complete].\nKeep a screenshot fallback in case the demo fails.");

// 8 Quality and testing
s = base("Each quality control caught something", "K25 (Distinction)   K27");
ph(s, "[To complete: chart of benchmark accuracy by sprint against the 80% target. Use real results only]", 0.6, 1.5, 5.6, 5.1, 18);
table(s, [
  [hdr("Control"), hdr("What it caught"), hdr("Change made")],
  ["50-query benchmark", TODO("result"), TODO("change")],
  ["Citation checks", TODO("result"), TODO("change")],
  ["Code review", TODO("result"), TODO("change")],
  ["Accessibility test", TODO("result"), TODO("change")],
  ["Security test", TODO("result"), TODO("change")],
], 6.5, 1.5, 6.2, [2.2, 2.0, 2.0], 16);
s.addNotes("2.5 minutes. Test types and framework: unit, integration, end-to-end [framework and coverage].\nDistinction K25 sentence: \"The benchmark had the largest impact, because [reason]. Code review had less, because [reason].\"\nSay what the tests did not prove.");

// 9 Managing delivery
s = base("Managing delivery: deviations spotted and corrected", "S6   S2");
ph(s, "[To complete: planned versus actual sprint chart]", 0.6, 1.5, 6.0, 2.4, 18);
ph(s, "[To complete: one or two deviations, their cause, and how you resolved them; the risk that materialised]", 6.8, 1.5, 5.9, 2.4, 18);
s.addText("Maintenance plan", { isTextBox: true, x: 0.6, y: 4.2, w: 12, h: 0.5, fontFace: F, fontSize: 22, bold: true, color: NAVY, margin: 0 });
["Index refresh", "Benchmark re-runs", "Cost and usage monitoring", "Model updates"].forEach((t, i) =>
  s.addText(t, { isTextBox: true, shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.1, x: 0.6 + i * 3.05, y: 4.9, w: 2.85, h: 1.3, fontFace: F, fontSize: 20, bold: true, color: NAVY, fill: { color: ICE }, align: "center", valign: "middle", margin: 8 }));
s.addNotes("1.5 minutes. Honesty scores well here. A deviation handled well is stronger evidence than a plan that went perfectly.");

// 10 Results
s = base("Results against KPIs", "K4   K17   S13   B5");
table(s, [
  [hdr("KPI"), hdr("Baseline"), hdr("Target"), hdr("Result"), hdr("Met?")],
  ["Spike duration", "3 to 5 days", TODO("target"), TODO("result"), ""],
  ["Retrieval accuracy", "n/a", "80%", TODO("result"), ""],
  ["Developer trust", "n/a", "4.0 out of 5", TODO("result"), ""],
  ["Response time", "n/a", TODO("NFR3"), TODO("result"), ""],
], 0.6, 1.5, 12.1, [2.9, 2.0, 2.7, 3.1, 1.4], 18);
ph(s, "[To complete: quote from a pilot developer, and the Technical Architects panel decision]", 0.6, 4.7, 6.0, 1.9, 18);
ph(s, "[To complete: how results were reported to each stakeholder group]", 6.8, 4.7, 5.9, 1.9, 18);
s.addNotes("2 minutes. State any missed KPI first and explain it; assessors test B5 (truthful) here.\nIn the Met? column use a tick or cross with text, not colour alone.\nNote the pilot's limits: 10 developers over 2 weeks is a small sample.");

// 11 Evaluation and recommendations
s = base("What I would keep, change and do next", "S22 (Distinction)   S17 (Distinction)   K17", { dark: true });
card(s, "Keep", "[To complete]", 0.6, 1.5, 3.85, 3.3, { fill: ICE });
card(s, "Change", "[To complete]", 4.7, 1.5, 3.85, 3.3, { fill: ICE });
card(s, "Phase 2 priorities", "1. Index the four remaining platforms\n2. Data protection impact assessment before indexing Slack\n3. [To complete]", 8.8, 1.5, 3.9, 3.3, { fill: "E6F4F5", size: 18 });
s.addText("Thank you. I am happy to take questions.", { isTextBox: true, x: 0.6, y: 5.3, w: 12, h: 0.8, fontFace: F, fontSize: 28, bold: true, color: WHITE, margin: 0 });
s.addNotes("3 minutes. Distinction S22 sentence: \"Compared with an off-the-shelf product, my build [e.g. kept data in the registry but took longer to reach accuracy]. If I did it again I would [change].\"\nCover what worked and what did not across approach, method, analysis and outcome. Lessons learnt: two or three real ones. Strategic implications for the registry.");

// Backups
s = base("Backup B1: AM1 KSB map", "Backup");
const map = [["K1", "2"], ["K2", "4"], ["K3", "5"], ["K4", "4, 10"], ["K5 *", "5"], ["K15", "5"], ["K17", "1, 10, 11"], ["K18 *", "6"], ["K25 *", "8"], ["K26", "7"], ["K27", "7, 8"], ["S1 *", "2, 4"], ["S2", "5, 9"], ["S3", "3"], ["S5 *", "5"], ["S6", "9"], ["S13 *", "6, 10"], ["S14", "6"], ["S16", "2, 3"], ["S17 *", "6, 11"], ["S18 *", "4"], ["S19", "7"], ["S22 *", "11"], ["B3", "3"], ["B5", "10"]];
const cols = 5, rows = 5;
for (let c = 0; c < cols; c++) {
  const r0 = [[hdr("KSB"), hdr("Slides")]];
  const part = map.slice(c * rows, c * rows + rows).map(([k, v]) => [{ text: k, options: { bold: k.includes("*") } }, v]);
  table(s, r0.concat(part), 0.6 + c * 2.45, 1.5, 2.3, [0.95, 1.35], 16);
}
s.addText("* Distinction criterion (9 in total). All 25 AM1 KSBs appear on at least one main slide.", { isTextBox: true, x: 0.6, y: 5.2, w: 12, h: 0.5, fontFace: F, fontSize: 16, color: MUTED, margin: 0 });

const backups = [
  ["Backup B2: risk and opportunity register", "[To complete: full register with likelihood, impact, mitigation and owner]", "What else could have gone wrong?"],
  ["Backup B3: decision matrix and cost-benefit", "[To complete: recalculated matrix, weights and how they were agreed; confirmed costs]", "How did you arrive at those weights?"],
  ["Backup B4: benchmark method", "[To complete: who wrote the 50 queries, how answers were marked, example queries, known bias]", "How do you know it is 80%?"],
  ["Backup B5: data flow and data protection", "[To complete: data flow diagram and data protection screening outcome]", "Where does the data go?"],
  ["Backup B6: sequence and use case diagrams", "[To complete: sequence diagram (question to cited answer) and use case diagram]", "Walk me through a request."],
];
backups.forEach(([t, p, q]) => {
  const b = base(t, "Backup");
  ph(b, p, 0.6, 1.5, 12.1, 4.3, 20);
  b.addText("Likely question: " + q, { isTextBox: true, x: 0.6, y: 6.0, w: 12.1, h: 0.5, fontFace: F, fontSize: 18, italic: true, color: MUTED, margin: 0 });
});

pres.writeFile({ fileName: "capstone-presentation-draft.pptx" }).then(f => console.log("wrote", f));
