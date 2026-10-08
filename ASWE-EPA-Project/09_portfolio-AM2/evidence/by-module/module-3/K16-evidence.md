# K16: Computer networking concepts
**Assessment method**: AM2
**Module**: 3 (Multiverse Project 1: Cybersecurity & Software Development)
**Date of the work**: [EVIDENCE NEEDED: month and year]
**Context**: Review of a UK government registry's digital and data network, with a proposed segmented Zero Trust redesign
**Status**: Draft
**Companion piece**: `../module-6/K16-evidence.md` covers the same concepts in a cloud build. This piece covers the on-premises and hybrid network. Use both in the discussion to show the concepts across both environments.

## Criterion
**KSB:** Fundamental computer networking concepts in relation to digital and technology solutions. For example, structure, cloud architecture, components, quality of service.
**Pass:** Explains core technical concepts for digital and technology solutions, including: Computer networking concepts.
**Distinction:** None for this KSB.

> Guidance: Module 3 explains a sound network design, but labels its tables "sample", "representative" and "illustrative", so it reads as a textbook design rather than the registry's network. K16 is a knowledge KSB, so a well-explained design can still meet it. Be ready to say which parts reflect the real network and which are your proposal. The placeholders ask for that.

## Situation
The registry processes millions of transactions and holds sensitive corporate data, which makes its network a target. The existing network was largely flat: once inside, an attacker could move between systems with few barriers. [EVIDENCE NEEDED: how you know this, e.g. from working on the network, architecture documents or colleagues, described without confidential detail.]

## Task
[EVIDENCE NEEDED: your role in reviewing the network and proposing the redesign, in the first person.]

## Action: networking concepts applied to this network

### Structure: segmentation into zones
I proposed dividing the network into five VLANs, each with its own subnet and a single purpose:

| VLAN | Zone | Subnet | Control |
|---|---|---|---|
| 10 | DMZ: public web and API | 10.0.10.0/24 | Web application firewall and load balancer |
| 20 | Application servers | 10.0.20.0/24 | Application security groups |
| 30 | Database: sensitive data | 10.0.30.0/24 | Encrypted, no internet access |
| 40 | Users: corporate workstations | 10.0.40.0/24 | 802.1X port authentication and network access control |
| 50 | Privileged administration | 10.0.50.0/24 | Access only through privileged access management |

Segmentation limits **lateral movement**: if an attacker compromises a web server in the DMZ, they cannot reach the database directly, because traffic between zones must pass a firewall rule. It also makes monitoring simpler, because each zone has a known, narrow set of expected traffic.

### Structure: controlling traffic between zones
I defined traffic between zones as an allowlist with a default-deny rule: anything not explicitly permitted is blocked.

| From | To | Protocol and port | Purpose |
|---|---|---|---|
| Internet | DMZ load balancer | TCP 443 (and 80) | Public web and API |
| DMZ application tier | Application servers | TCP 8443 | Application traffic over HTTPS |
| Application servers | Database cluster | TCP 5432 or 3306 | Database queries |
| Admin VLAN | Application servers | TCP 22 and 3389, via jump host | Administration |
| All zones | SIEM | UDP 514 (syslog) or API | Central log collection |

This is the Zero Trust principle applied at network level: no traffic is trusted because of where it comes from. [EVIDENCE NEEDED: see the corrections below for three rules to tighten before the discussion.]

### Components: what each device does
| Component | Network role |
|---|---|
| Routers and switches | Route traffic between networks and separate VLANs at Layer 2 |
| High-availability next-generation firewall pair, with intrusion detection and prevention | Enforce the allowlist between zones and inspect traffic for attacks; a pair avoids a single point of failure |
| Web application firewall | Filters web attacks (e.g. injection) at Layer 7 before they reach DMZ servers |
| High-availability load balancer | Spreads requests across DMZ servers and fails over if one stops |
| VPN | Encrypts remote access over the internet |
| 802.1X and network access control | Lets only authenticated, compliant devices join the user network |
| Jump host and privileged access management | Forces administrators through one monitored, controlled entry point |
| SIEM and SOAR | Collect logs from every zone and automate incident response |
| Secure cloud gateway | Connects on-premises zones to Azure and AWS workloads |

### Cloud architecture: hybrid integration
The registry runs workloads both on premises and in the cloud. I proposed extending the same controls across both: a secure gateway between the on-premises network and cloud workloads, cloud identity (Azure AD) for access decisions, and one SIEM receiving logs from both. That keeps a single security model rather than two with a gap between them. Module 6 shows the cloud side of this in practice (VPC, API Gateway, IAM).

### Quality of service: availability, resilience and response
- **Availability:** I set a target of 99.95% monthly uptime for the core network. That allows about 22 minutes of downtime a month (0.05% of roughly 43,800 minutes).
- **Resilience:** firewalls and load balancers run in high-availability pairs, databases are replicated, and backups follow the 3-2-1 rule (three copies, on two types of media, one off site) at a disaster recovery site.
- **Response:** targets of under 10 minutes to detect an incident and under 60 minutes to restore service.
- **Capacity:** the design must handle seasonal peaks in filings without degrading. [EVIDENCE NEEDED: any real traffic or peak figures you can share, even approximate.]

## Result
[EVIDENCE NEEDED: what happened to the proposal, e.g. discussed with the security or infrastructure team, parts already in place, or not taken forward. State plainly which parts describe the real network.]

## Corrections to make before relying on the Module 3 report
- **Port 80 contradicts "only HTTPS is exposed externally".** The allowlist permits TCP 80 (plain HTTP) from the internet. Either remove it, or state that port 80 only redirects to 443.
- **The admin rule bypasses the jump host.** The rule allows the whole Admin VLAN to reach application servers on SSH and RDP. To force the jump host, the rule's source should be the jump host itself, not the VLAN.
- **Two database ports.** The rule lists both 5432 (PostgreSQL) and 3306 (MySQL). Open only the port for the database actually in use.

## How this meets the criterion
| Criterion element | Where it is evidenced above |
|---|---|
| Explains networking concepts | VLANs, subnets, segmentation, lateral movement, default deny, Layer 2 and Layer 7, high availability, VPN, 802.1X |
| In relation to a digital solution | Every concept applied to the registry's network |
| Structure | VLAN plan and inter-zone allowlist |
| Cloud architecture | Hybrid integration section; Module 6 companion |
| Components | Components table |
| Quality of service | Uptime target with downtime calculated, resilience, response targets |

## Assessor Notes
*Strength*: Concepts are explained correctly and concretely, with addressing, ports and a quantified availability target.
*Gaps*: The design is labelled illustrative; your role and the real network are unstated; three allowlist rules need tightening.
*Watch for*: expect a question on how you would migrate from the flat network to the segmented one without disrupting a live registry.
