const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, HeadingLevel } = require("docx");

const FONT = "Arial", NAVY = "1E2761", GREY = "5B6472", HL = "FFF2CC";
const W = 9026; // A4 content width in DXA with 1" margins
const border = { style: BorderStyle.SINGLE, size: 4, color: "C9D3DD" };
const borders = { top: border, bottom: border, left: border, right: border };

const r = (text, o = {}) => new TextRun({ text, font: FONT, size: 22, ...o });
const todo = (text) => new TextRun({ text: `[To complete: ${text}]`, font: FONT, size: 22, shading: { type: ShadingType.CLEAR, fill: HL, color: "auto" } });
const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [r(runs)], spacing: { after: 100, line: 264 }, ...o });
const h = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, font: FONT, size: 28, bold: true, color: NAVY })], spacing: { before: 220, after: 100 }, keepNext: true, keepLines: true });
const bullet = (runs) => new Paragraph({ numbering: { reference: "bul", level: 0 }, children: Array.isArray(runs) ? runs : [r(runs)], spacing: { after: 60, line: 276 } });

function table(widths, rows, headerRow = true) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((row, ri) => new TableRow({ cantSplit: true,
      tableHeader: headerRow && ri === 0,
      children: row.map((cell, ci) => new TableCell({
        borders,
        width: { size: widths[ci], type: WidthType.DXA },
        shading: headerRow && ri === 0 ? { type: ShadingType.CLEAR, fill: NAVY, color: "auto" } : undefined,
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: (Array.isArray(cell) ? cell : [headerRow && ri === 0 ? r(cell, { bold: true, color: "FFFFFF", size: 20 }) : r(cell, { size: 20 })]) })],
      })),
    })),
  });
}
const sm = (t, o = {}) => r(t, { size: 20, ...o });
const smTodo = (t) => new TextRun({ text: `[To complete: ${t}]`, font: FONT, size: 20, shading: { type: ShadingType.CLEAR, fill: HL, color: "auto" } });

const children = [
  new Paragraph({ children: [new TextRun({ text: "Capstone Project Case Study", font: FONT, size: 40, bold: true, color: NAVY })], spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: "AI knowledge search for the Companies House delivery team", font: FONT, size: 28, color: NAVY })], spacing: { after: 120 } }),
  p([r("Planning proposal for discussion with my line manager", { italics: true, color: GREY })]),
  table([2200, W - 2200], [
    [[sm("Prepared by", { bold: true })], [sm("Astha Malviya, Version 1")]],
    [[sm("Role", { bold: true })], [smTodo("your job title")]],
    [[sm("Date", { bold: true })], [sm("October 2026")]],
    [[sm("Status", { bold: true })], [sm("Draft for discussion; not yet agreed")]],
  ], false),

  h("1. Purpose"),
  p("I would like to agree my End-Point Assessment (EPA) capstone project with you. This document sets out the problem, the project I propose, how I would run it over 12 weeks, how we would know it worked, and what I need from you to make it possible."),
  p("It is a planning document. The formal capstone report and presentation are written only after the project is signed off at Gateway."),

  h("2. The situation today"),
  p("The Version 1 delivery team of 20 people works inside Companies House infrastructure, building and maintaining a microservice estate. The knowledge needed to work on that estate is spread across six platforms (Confluence, GitHub, Slack, Notion, Miro and shared drives) and two pipeline tools (Concourse and Jenkins). No single place answers the question a developer asks at the start of every feature: how does the existing service work, and what does it depend on?"),
  bullet("Every feature in the last 12 months started with an investigation spike of 3 to 5 days."),
  bullet("6 of those 8 features needed an extra sprint."),
  bullet("Mapping a typical developer question found an average of seven manual steps and four platform switches."),
  bullet("Much of the knowledge sits with permanent Companies House staff, so new joiners depend on a few busy people."),
  new Paragraph({ children: [new TextRun({ text: "Illustrative scenario", font: FONT, size: 22, bold: true, color: NAVY })], spacing: { before: 160, after: 80 } }),
  p([r("A developer picks up a feature that changes how a filing service validates officer details. Before writing any code, they need to know which services call the validation logic, which pipeline deploys it, and why a legacy rule exists. They search Confluence, find two pages that disagree, check three GitHub repositories, scroll through old Slack threads, and finally message a permanent colleague who is in meetings until the next day. Three days later the spike closes with notes that the next developer will struggle to find.", { italics: true })]),
  p([r("With the proposed assistant, the same developer asks: ", { italics: true }), r("\"Which services call the officer validation rules, and how are they deployed?\"", { italics: true, bold: true }), r(" They receive an answer within seconds that cites the Confluence page and GitHub files it came from, with their dates, so they can check it before relying on it.", { italics: true })]),
  p([r("This scenario illustrates the problem; it is not a record of a specific feature.", { size: 18, color: GREY })]),

  h("3. The proposed project"),
  p("I propose to design, build and pilot an AI knowledge search assistant that answers developers' questions from Companies House documentation and cites its source in every answer. It uses retrieval-augmented generation: the assistant searches the indexed documents first and answers only from what it finds."),
  table([2600, W - 2600], [
    ["Area", "Proposal"],
    ["In scope", "Index Confluence and GitHub; natural language questions; cited answers; web interface and Slack bot; pilot with 10 developers"],
    ["Out of scope", "Slack, Notion, Miro and shared drives (a possible Phase 2); fine-tuning a model; AI code review; security-cleared repositories"],
    ["Where it runs", "Inside Companies House infrastructure, or an approved UK-region service"],
    ["Governance", "Data protection screening, security review of data flows, and release approval from the Technical Architects panel"],
  ]),
  p(""),
  p([r("Why this project. ", { bold: true }), r("It addresses a real, measured problem in our team; it has a clear baseline in Jira; and it is achievable in 12 weeks. It builds on my Module 5 work, where I proposed this system: the capstone takes it from proposal to a working, evaluated pilot.")]),

  h("4. My role"),
  p([todo("what you would personally do, e.g. lead the design, build the retrieval engine, run the pilot and evaluate the results; and who else would contribute")]),

  h("5. Plan: six two-week sprints"),
  table([1300, 1500, W - 2800], [
    ["Sprint", "Weeks", "Focus"],
    ["1", "1 to 2", "Discovery and governance: co-design workshop with pilot developers, data flow review, data protection screening, Jira baseline"],
    ["2", "3 to 4", "Ingestion: Confluence and GitHub connectors; exclusion of restricted repositories"],
    ["3", "5 to 6", "Retrieval engine: search, answer generation, citations, first accuracy benchmark"],
    ["4", "7 to 8", "Web interface and Slack bot; accessibility testing; ethics and release sign-off"],
    ["5", "9 to 10", "Pilot with 10 developers; monitoring and feedback"],
    ["6", "11 to 12", "Evaluation against the success measures; lessons learnt; recommendations"],
  ]),

  h("6. How we would know it worked"),
  table([2600, 2000, W - 4600], [
    ["Measure", "Today", "Target"],
    [[sm("Spike duration (Jira)")], [sm("3 to 5 days")], [smTodo("target to agree")]],
    [[sm("Answer accuracy on a 50-question benchmark")], [sm("Not measured")], [sm("80% or higher")]],
    [[sm("Developer trust (anonymous survey)")], [sm("Not measured")], [sm("4.0 out of 5 or higher")]],
    [[sm("Response time")], [sm("Not measured")], [smTodo("target to agree")]],
  ]),

  h("7. Main risks"),
  table([3200, W - 3200], [
    ["Risk", "How I would manage it"],
    ["The assistant gives wrong answers and developers stop trusting it", "Answers only from indexed documents; every answer cites its source; accuracy benchmark before release"],
    ["Permanent staff feel their knowledge is being replaced", "Involve two permanent staff in the design workshop; credit their documents in every answer"],
    ["Security-cleared material is indexed by mistake", "Exclude restricted repositories from the start; security team reviews the data flows"],
    ["Access or approvals arrive late", "Start with exported Confluence pages; use an open-source model if a hosted model is not approved"],
  ]),

  h("8. What I need from you"),
  table([4300, W - 4300], [
    ["Request", "Detail"],
    [[sm("Customer consent", { bold: true })], [sm("Agreement from Companies House that this project can be used for my EPA and named in my report and presentation")]],
    [[sm("Time", { bold: true })], [smTodo("protected time per week for the 12 weeks")]],
    [[sm("Access and approvals", { bold: true })], [sm("Support to obtain Confluence and GitHub API access, a hosting environment, model approval, a security review and data protection screening")]],
    [[sm("Pilot developers", { bold: true })], [sm("Help recruiting 10 developers for the pilot in weeks 9 to 10")]],
    [[sm("Stakeholder introductions", { bold: true })], [sm("Introduction to the Technical Architects panel and the security team")]],
    [[sm("Check-ins", { bold: true })], [smTodo("how often we meet, e.g. fortnightly")]],
    [[sm("Employer declaration", { bold: true })], [sm("Your confirmation at the end that the work is mine and was done in my role")]],
  ]),

  h("9. Next steps"),
  table([600, W - 2800, 2200], [
    ["#", "Step", "By"],
    [[sm("1")], [sm("Discuss this case study and agree scope and my role")], [smTodo("date")]],
    [[sm("2")], [sm("Confirm customer consent with Companies House")], [smTodo("date")]],
    [[sm("3")], [sm("Submit the capstone proposal to my coach")], [smTodo("date")]],
    [[sm("4")], [sm("Gateway sign-off")], [smTodo("date")]],
    [[sm("5")], [sm("Start sprint 1")], [smTodo("date")]],
  ]),

  h("Manager feedback"),
  table([2600, W - 2600], [
    [[sm("Agreed to proceed?", { bold: true })], [sm("Yes / No / With changes")]],
    [[sm("Comments", { bold: true })], [sm(" "), sm(" ")]],
    [[sm("Name and date", { bold: true })], [sm(" ")]],
  ], false),
];

const doc = new Document({
  creator: "Astha Malviya",
  title: "Capstone Project Case Study",
  styles: { default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [{ id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 28, bold: true, color: NAVY }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 0 } }] },
  numbering: { config: [{ reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } }, children }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2], b); console.log("ok"); });
