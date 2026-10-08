# S12: Plan, design and manage simple computer networks
**Assessment method**: AM2
**Module**: 3 (Multiverse Project 1: Cybersecurity & Software Development)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Review and proposed redesign of a UK government registry's digital and data network
**Status**: Draft
**Related**: `K16-evidence.md` in this folder explains the networking concepts (VLAN plan, allowlist, components). This piece covers the **skill**: how I planned, designed and would manage the network, and the services it enables. Refer to the K16 tables rather than repeating them.

## Criterion
**KSB:** Plan, design and manage simple computer networks with an overall focus on the services and capabilities that network infrastructure solutions enable in an organisational context.
**Pass:** Demonstrates the use of core technical concepts for digital and technology solutions, including: plans, designs and manages simple computer networks.
**Distinction:** None for this KSB.

> Guidance: the criterion has three verbs. Module 3 is strong on **design**, partial on **plan** (it states requirements but has no migration plan, although its conclusion mentions "the proposed roadmap"), and weak on **manage** (only proposed monitoring and KPIs). The KSB also asks for a focus on the **services the network enables**, which the report does not set out. This draft fills those gaps with structure and placeholders. "Manage" needs real experience from you, even small.

## Situation
The registry's network was largely flat, with limited segmentation and monitoring. The same weakness let WannaCry spread across NHS trusts in 2017. The network has to support public filing services, internal applications, sensitive data and staff working both in the office and remotely, including seasonal peaks in filings.

## Task
[EVIDENCE NEEDED: your role, in the first person: did you work on this network, advise on it, or review it as a portfolio exercise?]

## Action

### 1. Plan: services the network must enable
I started from the services the organisation depends on, then derived the network requirements from them:

| Service the network enables | Who depends on it | Network requirement |
|---|---|---|
| Public online filing and search | Companies, the public, other government bodies | High availability (99.95% monthly target), capacity for seasonal peaks, protection at the internet edge |
| Internal casework and applications | Registry staff | Reliable internal routing; separation from public-facing systems |
| The register's data | Everyone above; the law requires its integrity | Isolation, encryption, no direct internet access, backups off site |
| Office and remote working | Staff | Authenticated device access (802.1X), VPN for remote access |
| Cloud workloads | Digital teams | Secure gateway between on-premises and Azure or AWS |
| Security monitoring | Security operations centre | Logs from every zone to one SIEM |

[EVIDENCE NEEDED: any real numbers that shape the plan, e.g. approximate staff count, peak filing volumes, number of sites. Even rough figures show planning rather than a template.]

### 2. Plan: migration without disrupting a live registry
> Guidance: the report has no migration plan, and the assessor is likely to ask for one. The phases below are a suggested structure, not something the report contains. Keep them only if you can explain and defend each step.

| Phase | Change | Why this order |
|---|---|---|
| 1 | Deploy central logging (SIEM) on the existing flat network | You need to see current traffic before you can write allowlist rules without breaking services |
| 2 | Isolate the database zone first | It holds the most sensitive data and has the fewest legitimate sources of traffic |
| 3 | Create the DMZ and move public services behind the WAF and load balancer | Reduces exposure at the internet edge |
| 4 | Move users and admin into their own VLANs; introduce 802.1X and the jump host | Most disruptive to staff, so done once the core is stable |
| 5 | Switch inter-zone rules from logging-only to enforcing default deny | Only after the logs show which flows are genuinely needed |

[EVIDENCE NEEDED: how you would schedule changes around filing peaks, and how you would roll back a phase.]

### 3. Design
I designed a segmented network in five zones (DMZ, application, database, users and privileged admin), each on its own /24 subnet, with a default-deny allowlist between them. High-availability firewalls, load balancers and replicated databases remove single points of failure. The full VLAN plan, allowlist and component list are in `K16-evidence.md`.

Two design decisions tie the network to the services in section 1:
- **The database zone has no internet access at all**, so the register's data can only be reached from the application tier, through one database port.
- **Public filing sits in the DMZ behind a load balancer**, so a traffic peak or a failed web server does not take down internal systems, and servers can be added during busy periods.

### 4. Manage
I proposed managing the network through:
- **Monitoring:** logs from every zone to a central SIEM (e.g. Splunk), with SOAR to automate responses.
- **Configuration automation:** network and server configuration held as code (e.g. Ansible), so changes are repeatable, reviewable and reversible.
- **Access management:** role-based access, multi-factor authentication, privileged access management and periodic access reviews.
- **Patch management:** critical vulnerabilities fixed within 7 days, and patch compliance measured within 14 days of release.
- **Service measures:** 99.95% monthly uptime, under 10 minutes to detect and under 60 minutes to restore, reported to the executive board.

[EVIDENCE NEEDED: any network management you have actually done, however small, e.g. raising or reviewing firewall change requests, investigating a connectivity incident, reviewing monitoring alerts, managing a VPC's security groups in Module 6, or configuring a home lab. S12 says "manages", and this is where the assessor will probe.]

## Result
[EVIDENCE NEEDED: what happened to the proposal, e.g. shared with the infrastructure or security team, parts adopted, or not taken forward.]

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Plans a network | Action 1: services to requirements; Action 2: phased migration |
| Designs a network | Action 3, with detail in `K16-evidence.md` |
| Manages a network | Action 4 [EVIDENCE NEEDED: real management experience] |
| Focus on services and capabilities enabled | Action 1 table; design decisions tied to services |
| Organisational context | Registry services, staff, remote working, board reporting |

## Assessor Notes
*Strength*: The design is detailed and correct, and this draft ties it to the services the organisation depends on.
*Gaps*: "Manage" is proposed only; the migration plan is new and must be yours to defend; real numbers would strengthen planning.
*Also check*: the report attributes the £92 million cost of WannaCry to the National Audit Office (NAO, 2018). As far as I know, that estimate came from the Department of Health and Social Care later in 2018, and the NAO's investigation did not put a figure on the cost. Check the source before citing it.
