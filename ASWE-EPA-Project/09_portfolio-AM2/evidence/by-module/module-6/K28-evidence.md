# K28: Tools that support teamwork
**Assessment method**: AM2
**Module**: 6 (Multiverse Project 6: Cloud Computing and Scalable Architectures)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Two-person, ten-week build of a cloud AI governance and knowledge assistant on AWS for a UK government registry
**Status**: Draft

## Criterion
**Pass:** Describes how tools that support teamwork can be used effectively. (K28/SEK8)
**Distinction:** None for this KSB.
**Standard wording:** [EVIDENCE NEEDED: not saved in the repo; confirm from the Multiverse K28 page.]

> Guidance: K28 is about **teamwork**, not tools in general. Module 6's section 3.2 is labelled K28 but mostly justifies a DevOps toolchain. This draft reframes each tool around **how it helps two or more people work together**, which is what the criterion describes. Module 6 has no planning or communication tools, so the last section draws on Modules 2 and 5.

## Situation
Two of us built the assistant over ten weeks, working on the same codebase, pipeline and cloud infrastructure. [EVIDENCE NEEDED: who the other person was, by role only, and how you split the work.] The tools had to let us work in parallel without breaking each other's work, keep a governance audit trail, and make problems visible to both of us quickly.

## Task
[EVIDENCE NEEDED: who chose the tools and set up the workflow. Say plainly which decisions were yours.]

## Action: how each tool supported teamwork

### Git and GitHub: parallel work with review
I chose GitHub Flow (short-lived feature branches merged into `main` through pull requests) over two alternatives:
- **GitFlow:** too complex for a two-person team, as it assumes a dedicated release manager.
- **Trunk-based development:** too few review gates for a governance tool, where code review is a second line of defence against insecure changes.

Feature branches let one of us experiment with the OpenAI integration without risking the stable upload feature the other depended on. The commit history also gave us a shared audit trail of every code change, complementing the application's own governance logs.

> Guidance: the appendix describes "four commits on the main branch", and the CI runs on pushes to `main`. If you committed straight to `main`, the assessor may ask where the pull requests were. Confirm how you actually worked, and describe that.

### Code review: catching what automation misses
Code review caught 2 logic issues that none of the automated tools found, including a missing input sanitisation step on the `/ask` endpoint. That is the teamwork value of review: a second person sees assumptions the author cannot. [EVIDENCE NEEDED: how reviews ran, e.g. pull request comments or pairing, and who reviewed whose code.]

### GitHub Actions: a shared, impartial quality gate
Every push and pull request ran the same checks (Ruff, then pytest, then a Docker build), so neither of us had to rely on the other's local setup. When CI broke on a Python version mismatch, it showed both of us the same failure at the same time. Adding a minimum Python version to Ruff then enforced the fix for every future contributor, not just the person who found it.

### Docker: the same environment for everyone
The Python mismatch happened because local and CI environments differed. Pinning the runtime in a container means everyone runs the same Python and dependencies, which removes a whole class of "works on my machine" problems between team members.

### Terraform: infrastructure the whole team can read and review
Defining the AWS infrastructure in Terraform put it under version control like the application code. Changes can be reviewed before they are applied, and `terraform plan` shows both people exactly what will change. I chose it over CloudFormation, Pulumi and AWS CDK because its configuration language is readable by someone who did not write it. [EVIDENCE NEEDED: did the other team member review or change the Terraform? The report gives the number of configuration files as both four and five; see the fix list.]

### README: knowledge that outlasts the conversation
Configuration such as allowed CORS origins is documented in the README, so a future developer can change it without asking whoever set it up.

## Planning and communication tools (from Modules 2 and 5)
Module 6 names no planning or communication tools. My other projects show how I chose them:
- **Module 5:** I chose GitHub Projects for the Kanban board plus Jira, rather than Asana or Microsoft Planner. GitHub Projects sits next to the code, and Jira already held the team's SPIKE tickets, which made before-and-after measurement possible without changing how the team logged work.
- **Module 2:** the team used Trello for task breakdown and timelines, Confluence for shared documentation and project logs, and weekly stand-ups with stakeholders at milestone reviews.

[EVIDENCE NEEDED: what did the two of you use in Module 6 to plan and communicate, e.g. an issue board, Slack or Teams, a shared document? One sentence is enough.]

## Result
CI reached a passing build on the fourth run, and every recorded defect was caught in CI or code review before production. The toolchain added about 20 minutes of pipeline time per sprint and saved an estimated 3.5 hours of debugging. [EVIDENCE NEEDED: one teamwork outcome, e.g. how many pull requests were reviewed, or how the other person's work was unblocked by a tool.]

## What makes these tools effective, and when they are not
| Tool | Effective when | Less effective when |
|---|---|---|
| GitHub Flow and pull requests | Small team, frequent merges, review required | Teams need to support several released versions at once |
| Code review | A second person has context and time | Reviews become rubber stamps under deadline pressure |
| Shared CI | Everyone treats a red build as the team's problem | Failures are ignored or bypassed |
| Docker | Environment drift is a real risk | The team spends more time on containers than on the product |
| Terraform | Infrastructure changes are reviewed like code | Changes are made manually in the console and drift from the code |

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Describes teamwork tools | Action: Git and GitHub, code review, CI, Docker, Terraform, README; planning and communication tools |
| How they can be used effectively | Each tool's teamwork role, with reasons and alternatives; "effective when / less effective when" table |

## Assessor Notes
*Strength*: Each tool choice is compared with named alternatives and tied to a teamwork need, not only a technical one.
*Gaps*: The other team member barely appears; planning and communication tools for Module 6 are missing; confirm whether pull requests were used.
*Watch for*: the repository was public on GitHub. Check that this was permitted for work done for the registry.
