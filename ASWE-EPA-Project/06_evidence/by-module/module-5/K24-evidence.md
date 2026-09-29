# K24: Interpreting a design against requirements; legacy issues (proposal view)
**Assessment method**: AM2
**Module**: 5 (Multiverse Project 5: Managing Software Transformation Projects)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Proposal for an AI knowledge search system for developers at a UK government registry
**Status**: Draft
**Companion piece**: `../module-6/K24-evidence.md` covers **implementing** a design against its requirements, with code. This piece covers **interpreting** requirements into a design, and is stronger on the KSB's **legacy and socio-technical** side, which Module 6 lacks.

## Criterion
**KSB:** How to interpret and implement a design, compliant with functional, non-functional and security requirements including principles and approaches to addressing legacy software development issues from a technical and socio-technical perspective. For example architectures, languages, operating systems, hardware, business change.
**Pass:** Describes how to interpret and implement a design, compliant with functional, non-functional and security requirements.
**Distinction:** None for this KSB.

> Guidance: Module 5 turns a messy problem into prioritised requirements and a design that answers each one, and its whole subject is a legacy problem: knowledge scattered across ageing platforms and people. Use this piece for interpretation and legacy; use Module 6 for implementation.

## Situation
Developers spent 3 to 5 days at the start of every feature working out how the existing system fitted together, because knowledge was split across six platforms, two pipeline tools and the memories of permanent staff.

## Task
[EVIDENCE NEEDED: your role in defining the requirements and design, in the first person.]

## Action

### 1. Interpreting the problem into prioritised requirements
I used MoSCoW to control scope, because AI projects face constant pressure to add capability, and framed the constraints with the Iron Triangle: time fixed at six months and cost at £12,100, so any added scope would cost quality.

| Priority | Requirements |
|---|---|
| Must | Index all six platforms; natural language questions; a source citation on every answer; run inside the registry's infrastructure; measure spikes through Jira |
| Should | Spike reduction dashboard; administrator dashboard; answer quality feedback |
| Could | Documentation freshness scoring; knowledge gap detection; extension to other contractor teams |
| Won't (this phase) | AI code review, testing and deployment automation (Phase 2); fine-tuning a model; change management and staff upskilling |

### 2. From requirements to design
| Requirement type | Requirement | Design response |
|---|---|---|
| Functional | Answer questions across six platforms | Retrieval pipeline: index documents as embeddings in a vector database, retrieve relevant passages, generate an answer from them |
| Functional | Fit the existing workflow | Web app plus Slack bot |
| Non-functional | Retrieval accuracy of 80% or higher on 50 benchmark queries | Benchmark before launch and monthly; retrieval rather than fine-tuning, so answers track current documents |
| Non-functional | Trust | Mandatory citation of source platform and date |
| Non-functional | Cost | Hard spending cap on the hosted model; open-source fallback model with no API cost |
| Security | UK data residency | Self-hosted vector index; hosted model in a UK region under the existing procurement framework [EVIDENCE NEEDED: confirm region; see `K19-evidence.md`] |
| Security | Protect security-cleared material | Exclude security-cleared repositories from indexing; security team reviews data flows |
| Security | Governance | Technical Architects panel ethics sign-off as a release condition |

### 3. Legacy issues: technical
| Legacy issue | Why it matters | Approach |
|---|---|---|
| Six platforms adopted independently, with no knowledge architecture | Knowledge exists but cannot be found | Index where the knowledge already lives rather than migrating it |
| Deployment pipelines split between Concourse and Jenkins, with no source of truth | Developers cannot see how services are built and deployed | Index both tools' pipeline configurations so they can be queried together |
| Architecture diagrams held as Miro boards | Images are hard for a text-based retrieval system to use | Audit Miro and convert critical diagrams to Confluence text (about £500 of effort) |
| A microservice architecture | Dependencies between services are the hardest knowledge to find | Target microservice dependencies and pipeline knowledge in the index |

[EVIDENCE NEEDED: the KSB's examples include languages, operating systems and hardware. Add any legacy technology you know from the registry's estate, e.g. the languages or runtimes of older services, without confidential detail.]

### 4. Legacy issues: socio-technical
| Legacy issue | Approach |
|---|---|
| **Knowledge debt:** knowledge lost when permanent staff are unavailable, and new joiners relying on senior colleagues for weeks | Capture knowledge permanently and let new joiners self-serve from day one |
| **Pseudo-agile delivery:** the organisation calls itself Agile but works sequentially (Dikert et al., 2016) | Adapted Scrum, starting with a Sprint 0 co-designed with pilot developers |
| **Trust:** developers are sceptical of AI answers they cannot check | Citations on every answer; an anonymous trust survey |
| **Team capacity:** the project had to be delivered without pausing current work | A 70/30 split of the existing team, chosen over pausing current work (contract risk) or an external team (onboarding overhead) |
| **Permanent staff's position:** knowledge holders might see the tool as replacing them | Framed as "expertise amplified, not replaced", with contributors credited in every answer |

## Evaluating the design
1. **"Won't have" includes change management.** For a tool whose success depends on adoption, excluding change management and upskilling is a risk; the pilot and Sprint 0 partly cover it. Be ready to defend it.
2. **The design treats legacy as something to search, not fix.** Indexing two pipeline tools and six platforms makes them usable but leaves the fragmentation in place. A later recommendation to consolidate would show the longer-term view.
3. **Known inconsistencies to fix first:** the "no data leaves the boundary" claim versus the Azure-hosted model, and the default versus fallback model (see the fix list).

## Result
[EVIDENCE NEEDED: what happened to the proposal.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Interprets a design | Actions 1 and 2: problem to prioritised requirements to design |
| Functional, non-functional and security compliance | Action 2 table |
| Legacy issues, technical | Action 3 |
| Legacy issues, socio-technical and business change | Action 4 |
| Implementation | `../module-6/K24-evidence.md` |

## Assessor Notes
*Strength*: Requirements are prioritised with a stated reason and each is answered in the design; the socio-technical legacy analysis is the best in the portfolio.
*Gaps*: Languages, operating systems and hardware; your role; the outcome.
*Watch for*: "Why did you leave change management out of scope?" Evaluation point 1.
