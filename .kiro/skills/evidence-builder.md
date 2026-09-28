# Evidence Builder Skill

## Purpose
Generate realistic, human-sounding portfolio evidence for ASWE apprenticeship modules. Each piece of evidence reads like a real engineer reflecting on real work — specific, personal, and mapped to KSBs.

## How to Use This Skill

Tell me:
1. Which module (3, 4, 5, 6, or 7)
2. Which KSB (e.g. K19, S4, B2) — or say "all" for the full module
3. Brief context about your actual work (tech stack, project type, team size, problem solved)

I will generate:
- A complete evidence entry per KSB
- Filed in the correct folder structure
- Written in first person, Distinction-level quality
- With a KSB justification paragraph at the end of each piece

---

## Output Folder Structure

Every evidence piece goes into:

```
ASWE-EPA-Project/06_evidence/by-module/module-{N}/{KSB-ID}-evidence.md
```

Each file follows this exact template:

```markdown
# {KSB-ID} — {KSB Topic}
**Module**: {N}  
**Date**: {date}  
**Project/Context**: {brief project description}

## Situation
[2-3 sentences: what was the business context, what was the problem or need]

## Task
[2-3 sentences: what was YOUR specific responsibility in this]

## Action
[4-6 sentences: exactly what YOU did, technical decisions made, tools/approaches used, and WHY]

## Result
[2-3 sentences: what changed, ideally with a metric or measurable outcome]

## KSB Justification
**This evidence demonstrates {KSB-ID} ({KSB topic}) because:**
[2-3 sentences explicitly linking the actions taken to the KSB descriptor]

## Examiner Notes
*Strength*: [what makes this strong evidence]  
*To push to Distinction*: [one specific thing to add or sharpen]
```

---

## Example — K19 (Architecture Patterns), Module 3

```markdown
# K19 — Architectural Patterns
**Module**: 3  
**Date**: March 2026  
**Project/Context**: Internal tooling for automating customer onboarding at a fintech company

## Situation
Our team was tasked with rebuilding a legacy onboarding flow that was a single monolithic script. 
It was causing deployment bottlenecks — any change required a full redeploy, and a bug in one 
step brought the entire process down. The business needed a more resilient, maintainable solution.

## Task
I was responsible for proposing and justifying the new architecture. I needed to evaluate options, 
present a recommendation to the senior engineer, and then lead the implementation of the core services.

## Action
I evaluated three architectural approaches: keeping the monolith with better error handling, 
splitting into a microservices architecture, and using an event-driven pipeline with a message queue. 
I documented the trade-offs in an Architecture Decision Record (ADR), comparing each option against 
our criteria: deployment independence, fault isolation, and team size (3 engineers). I recommended 
the event-driven pipeline using AWS SQS, arguing that microservices would introduce too much 
operational overhead for a team of our size. I designed the message schema, implemented two of the 
five services in Node.js, and wrote integration tests to validate the contract between services.

## Result
The new architecture reduced deployment time from 25 minutes (full redeploy) to under 3 minutes 
per service. A failure in any single step now triggers a dead-letter queue rather than silently 
failing, which reduced undetected onboarding errors by 90% in the first month post-launch.

## KSB Justification
**This evidence demonstrates K19 (Architectural Patterns) because:**
I did not simply implement a pattern — I evaluated multiple architectural approaches against 
specific technical and organisational constraints, produced a formal ADR, and justified my 
recommendation to a senior engineer. This shows deep understanding of when event-driven 
architecture is appropriate over alternatives like microservices or a monolith.

## Examiner Notes
*Strength*: Decision-making process is explicit, trade-offs are named, outcome is quantified.  
*To push to Distinction*: Add a sentence about what you would do differently in hindsight, 
or how this decision influenced the team's future architectural thinking.
```

---

## Rules for Generation

1. Always write in first person ("I designed", "I chose", not "we" or "the team")
2. Every Action section must include at least one explicit "because" or "in order to"
3. Every Result must include at least one number, metric, or named outcome
4. The KSB Justification must name the specific KSB descriptor, not just repeat the action
5. Examiner Notes must always include one concrete "To push to Distinction" suggestion
6. Language must sound like a practising engineer, not a student — avoid "I learned that..." as the main point
7. Difficulty should be calibrated to the module level (Module 3 = junior-mid, Module 7 = senior)
