# K17: Relevant Legal, Ethical, Social and Professional Standards

**Competency Definition:** Understand legal frameworks (contracts, IP, employment law). Apply ethical principles (do no harm, fairness, transparency). Follow professional standards (IEEE, ACM). Consider social impact (accessibility, inclusion, environmental). Maintain professional integrity.

---

## Legal Framework for Software Engineering

```
KEY LEGAL AREAS:

1. INTELLECTUAL PROPERTY (IP)
   ├─ Copyright: Automatic protection for code, documentation
   ├─ Patent: Software algorithms can be patented (with conditions)
   ├─ Trade Secrets: Confidential algorithms, processes
   ├─ Licensing: Open source (GPL, MIT, Apache) vs proprietary
   └─ Risk: IP infringement = £1M+ damages + injunction

2. CONTRACTS
   ├─ Employment contract: Terms of employment, IP ownership
   ├─ Client contracts: Scope, deliverables, payment, liability
   ├─ Software licensing: Terms of use for developers
   ├─ NDAs: Non-disclosure agreements (keep secrets)
   └─ Risk: Contract breach = breach of contract damages

3. REGULATORY COMPLIANCE
   ├─ GDPR: Data protection (€20M or 4% revenue fine)
   ├─ SOC 2: Security controls for cloud services
   ├─ Industry-specific: HIPAA (health), PCI DSS (payments)
   ├─ Accessibility: WCAG 2.1 AA (web accessibility)
   └─ Risk: Non-compliance = fines, lawsuits, reputation damage

4. LIABILITY
   ├─ Product liability: Harm from software defects
   ├─ Professional negligence: Failure to follow standards
   ├─ Data breach liability: GDPR fines, lawsuits
   ├─ Insurance: Professional indemnity insurance (£1-5M coverage)
   └─ Risk: £4.4M+ liability from single breach

PROFESSIONAL OBLIGATIONS:

✓ Act with integrity (be honest, transparent)
✓ Respect confidentiality (keep client secrets)
✓ Respect IP (don't copy others' code)
✓ Disclose conflicts of interest
✓ Maintain professional competence (keep learning)
✓ Report safety issues (if software endangers lives)
✓ Follow security best practices
✓ Document decisions (prove compliance)
```

---

## Real Example 1: Project 6 (Professional Ethics in AI)

### Ethical Considerations

```python
# PROJECT: AI Governance Assistant
# CONTEXT: AI system that makes governance decisions affecting company policies

class EthicalGovernance:
    """Apply ethical principles to AI system design"""
    
    # PRINCIPLE 1: Transparency
    # ├─ Users should understand how AI makes decisions
    # ├─ Not a "black box" (unexplainable)
    # └─ Implementation: Log reasoning, show decision factors
    
    def explain_governance_decision(decision_id: str):
        """Explain AI decision to stakeholders"""
        
        decision = db.query(GovernanceDecision).filter_by(id=decision_id).first()
        
        explanation = {
            "decision": decision.recommendation,  # e.g., "Approve policy"
            "confidence": decision.confidence,  # 0.95 (95% confident)
            "factors": [
                {
                    "factor": "Policy aligns with corporate values",
                    "weight": 0.4,
                    "impact": "Increases recommendation score",
                },
                {
                    "factor": "Budget impact: £500K",
                    "weight": 0.3,
                    "impact": "Neutral (within budget)",
                },
                {
                    "factor": "Legal risk: GDPR compliance required",
                    "weight": 0.2,
                    "impact": "Decreases recommendation score",
                },
                {
                    "factor": "Timeline: 6 months",
                    "weight": 0.1,
                    "impact": "Neutral",
                },
            ],
            "reasoning": "Policy aligns with corporate values (40%) and budget (30%), but requires legal review for GDPR (20%). Overall: 67/100 confidence to approve.",
            "human_review_required": True,  # AI recommends, human decides
        }
        
        return explanation
    
    # PRINCIPLE 2: Fairness
    # ├─ AI should not discriminate (gender, race, age, disability)
    # ├─ Ensure diverse training data (avoid bias)
    # └─ Implementation: Bias testing, fairness metrics
    
    def detect_and_mitigate_bias():
        """Test for unfair bias in AI decisions"""
        
        # Test 1: Gender bias
        # ├─ Policy from female proposer: 70% approval rate
        # ├─ Policy from male proposer: 75% approval rate
        # ├─ Difference: 5% (potential bias)
        # └─ Action: Investigate features (gender shouldn't influence)
        
        female_approval_rate = 0.70
        male_approval_rate = 0.75
        
        if abs(female_approval_rate - male_approval_rate) > 0.05:
            print("⚠️  WARNING: Potential gender bias detected")
            print(f"Female: {female_approval_rate}, Male: {male_approval_rate}")
            # Action: Retrain model with fairness constraints
        
        # Test 2: Age bias
        # ├─ Policy from <30 year old proposer: 60% approval
        # ├─ Policy from >50 year old proposer: 80% approval
        # ├─ Difference: 20% (likely bias)
        # └─ Action: Remove age-correlated features
        
        young_approval = 0.60
        old_approval = 0.80
        
        if abs(young_approval - old_approval) > 0.10:
            print("⚠️  WARNING: Potential age bias detected")
            # Action: Remove age-related features from model
    
    # PRINCIPLE 3: Accountability
    # ├─ Clear responsibility (who made this decision?)
    # ├─ Audit trail (why was it made?)
    # └─ Implementation: Audit logs, approval chains
    
    def audit_trail_for_governance_decision(decision_id: str):
        """Provide complete accountability"""
        
        decision = db.query(GovernanceDecision).filter_by(id=decision_id).first()
        
        audit = {
            "decision_id": decision_id,
            "who_proposed": decision.proposer_id,
            "who_reviewed": decision.reviewer_id,
            "who_decided": "AI Governance Assistant",
            "recommendation": decision.recommendation,
            "human_decision": decision.human_override,  # Did human override AI?
            "reasoning": explain_governance_decision(decision_id),
            "timestamp": decision.created_at,
            "immutable": True,  # Audit log cannot be deleted
        }
        
        return audit
    
    # PRINCIPLE 4: Human Oversight
    # ├─ AI recommends, humans decide
    # ├─ No automated decisions affecting people (high-risk)
    # └─ Implementation: Approval workflow, human review
    
    def governance_decision_workflow():
        """Workflow with human oversight"""
        
        # Step 1: AI analyzes policy
        recommendation = ai_model.recommend_policy(policy_proposal)
        
        # Step 2: Human reviews AI recommendation
        human_review = {
            "reviewer": "policy_committee@company.com",
            "deadline": datetime.utcnow() + timedelta(days=7),
            "required_reviewers": 3,  # At least 3 approvals
            "can_override": True,  # Humans can override AI
        }
        
        # Step 3: Decision made by humans (using AI input)
        final_decision = policy_committee.decide(
            recommendation=recommendation,
            human_judgement="Committee has final say, not AI"
        )
        
        return final_decision
    
    # PRINCIPLE 5: Safety & Do No Harm
    # ├─ AI should not make decisions that harm people
    # ├─ Governance decisions affect company culture, jobs, equality
    # └─ Implementation: Impact assessment, safety checks
    
    def assess_governance_decision_impact():
        """Assess harm/benefit of governance decision"""
        
        impact = {
            "policy": "Remote work policy",
            "potential_harms": [
                "Workers with disabilities may feel excluded (remote first)",
                "Junior employees miss mentoring opportunities",
                "Office rent savings may lead to layoffs",
            ],
            "mitigation": [
                "Offer hybrid (not fully remote)",
                "Structured mentoring for remote workers",
                "Commit: No layoffs from office consolidation",
            ],
            "benefit": [
                "Flexibility for working parents",
                "Talent pool expands (not geographic limited)",
                "Office overhead reduced",
            ],
            "recommendation": "Approve with mitigations in place",
        }
        
        return impact
```

---

## Real Example 2: Project 2 (Legal Compliance)

### Contract Management

```
PROJECT: Data Platform
CLIENT: UK Government (Companies House)
CONTRACT: Data Processing & Analytics Services

KEY CONTRACT CLAUSES:

1. SCOPE OF WORK
   ├─ Deliverables: Data lake, ETL pipeline, analytics dashboards
   ├─ Schedule: 6 months to MVP
   ├─ Cost: £500K total (£250K upfront, £250K on completion)
   ├─ Performance: 99.9% uptime, <100ms query latency
   └─ Penalties: 0.5% fee reduction per week of delay

2. INTELLECTUAL PROPERTY
   ├─ Client owns: Analytics code, dashboards, data models
   ├─ Vendor owns: Framework code, reusable components
   ├─ Joint ownership: ETL pipeline (shared benefit)
   └─ Licensing: Code licensed under Apache 2.0

3. LIABILITY & INDEMNITY
   ├─ Vendor liable for: Negligence, data breach, IP infringement
   ├─ Liability cap: £1M (or annual contract value, whichever is lower)
   ├─ Indemnity: Vendor indemnifies client for third-party IP claims
   └─ Insurance: £2M professional indemnity required

4. CONFIDENTIALITY
   ├─ Data classification: Government Secure (not Top Secret)
   ├─ Retention: Delete after contract ends (+ 2 years for audit)
   ├─ Access: Only authorized personnel, background checks required
   ├─ Breach notification: Within 24 hours
   └─ Penalties: £100K per breach

5. COMPLIANCE
   ├─ GDPR: Data processing agreement (DPA) signed
   ├─ UK Data Protection Act: Compliance required
   ├─ Security: SOC 2 Type II certification required
   ├─ Accessibility: WCAG 2.1 AA compliance required
   └─ Audit: Annual audit by government auditors

6. DISPUTE RESOLUTION
   ├─ Negotiation: 30 days good-faith negotiation
   ├─ Mediation: 60 days mediation if negotiation fails
   ├─ Arbitration: Binding arbitration if mediation fails
   ├─ Venue: London, English law
   └─ Cost: Loser pays legal fees

COMPLIANCE EVIDENCE:

✅ DPA signed (GDPR compliance)
✅ SOC 2 audit passed (security)
✅ WCAG audit passed (accessibility)
✅ Background checks completed (security clearance)
✅ Vendor insurance £2M (liability protection)
✅ Audit logs maintained (7 years retention)
✅ Incident response plan documented
✅ Contract signed by authorized representatives

Risk mitigation:
├─ IP infringement insurance (£5M coverage)
├─ Data breach insurance (£10M coverage)
├─ Professional indemnity insurance (£2M coverage)
└─ Total coverage: £17M (protects both parties)
```

---

## Real Example 3: Project 5 (Professional Standards)

### Engineering Standards & Best Practices

```python
# PROJECT: Campaign Service
# STANDARD: IEEE 730 (Software Quality Assurance)

class ProfessionalStandards:
    """Follow IEEE, ACM professional standards"""
    
    # STANDARD 1: Code Quality (IEEE 830 - Software Requirements)
    # ├─ Requirements documented and traceable
    # ├─ Design reviewed by peers
    # ├─ Code follows coding standards
    # └─ Test coverage >90%
    
    CODE_QUALITY_STANDARDS = {
        "requirements": "Documented in JIRA, signed off by stakeholders",
        "design": "Architecture review by 2+ engineers",
        "code_style": "Black formatter, flake8 linter, mypy type checking",
        "documentation": "Docstrings for all public functions",
        "test_coverage": ">90% required",
        "code_review": "2+ approvals before merge",
    }
    
    # STANDARD 2: Security (OWASP Top 10, NIST Cybersecurity Framework)
    # ├─ Threat modeling performed
    # ├─ Security testing included
    # ├─ Vulnerabilities tracked and remediated
    # └─ Security audit passed
    
    SECURITY_STANDARDS = {
        "threat_model": "STRIDE threat model used",
        "secure_coding": "Parameterized queries, input validation, output encoding",
        "testing": "Security tests for injection, auth, access control",
        "vulnerability_scanning": "OWASP Dependency-Check weekly",
        "audit": "Penetration testing annually",
    }
    
    # STANDARD 3: Accessibility (WCAG 2.1 AA, UK Accessibility Regulations)
    # ├─ Keyboard navigation supported
    # ├─ Screen reader compatible
    # ├─ Color contrast 7:1 minimum
    # └─ Touch targets 48x48px minimum
    
    ACCESSIBILITY_STANDARDS = {
        "keyboard": "All functionality accessible via Tab/Enter",
        "screen_reader": "Semantic HTML, ARIA labels",
        "color_contrast": "7:1 for text, 3:1 for UI components",
        "touch_targets": "48x48px minimum (48x48 CSS pixels)",
        "testing": "WCAG audit quarterly, assistive tech testing",
    }
    
    # STANDARD 4: Performance (ISO/IEC 25023 - Performance Requirements)
    # ├─ Response time <100ms (p95)
    # ├─ Throughput 1K requests/second
    # ├─ Availability 99.9%
    # └─ Scalability to 100K concurrent users
    
    PERFORMANCE_STANDARDS = {
        "latency_p50": "<50ms",
        "latency_p95": "<100ms",
        "latency_p99": "<500ms",
        "throughput": "1000 requests/second minimum",
        "availability": "99.9% uptime (43 min downtime/month)",
        "scalability": "100K concurrent users",
    }
    
    # STANDARD 5: Reliability (IEEE 1028 - Software Reviews & Audits)
    # ├─ Code reviewed by peers
    # ├─ Design reviewed by architect
    # ├─ Security reviewed by security team
    # └─ Compliance reviewed by legal/compliance
    
    REVIEW_STANDARDS = {
        "code_review": {
            "required_reviewers": 2,
            "reviewer_expertise": "At least 1 senior engineer",
            "checklist": ["security", "performance", "design", "tests", "docs"],
        },
        "design_review": {
            "required_reviewers": 3,
            "participants": ["architect", "security", "ops"],
            "criteria": ["scalability", "reliability", "maintainability"],
        },
        "security_review": {
            "required": True,
            "by": "Security team",
            "criteria": "OWASP Top 10 compliance",
        },
    }
    
    # STANDARD 6: Documentation (IEEE 1063 - Software Documentation)
    # ├─ Requirements documented
    # ├─ Design documented with diagrams
    # ├─ Code documented with docstrings
    # ├─ Tests documented with comments
    # └─ Operations documented (runbooks)
    
    DOCUMENTATION_STANDARDS = {
        "requirements": "JIRA + Requirements.md",
        "design": "Architecture Decision Records (ADRs)",
        "code": "Docstrings (Google style) for all public functions",
        "tests": "Test names describe what they test",
        "operations": "Runbooks for deployment, incident response",
        "release_notes": "Changelog for every release",
    }
    
    # STANDARD 7: Professional Conduct (ACM Code of Ethics)
    # ├─ Avoid conflicts of interest
    # ├─ Maintain confidentiality
    # ├─ Report safety issues
    # ├─ Respect diversity & inclusion
    # └─ Contribute to professional community
    
    PROFESSIONAL_CONDUCT = {
        "conflicts_of_interest": {
            "disclosure": "Disclose to manager if have personal interest in project",
            "resolution": "Recuse from decisions where conflict exists",
        },
        "confidentiality": {
            "nda": "Sign NDA with company",
            "enforcement": "Don't share client code/data",
        },
        "safety_reporting": {
            "obligation": "Report if software endangers lives",
            "channel": "Security team, Legal, then appropriate authorities",
        },
        "diversity": {
            "hiring": "Support inclusive hiring practices",
            "culture": "Foster inclusive team environment",
        },
        "community": {
            "open_source": "Contribute to open source projects",
            "mentoring": "Mentor junior engineers",
            "knowledge_sharing": "Present at conferences, write articles",
        },
    }

# COMPLIANCE EVIDENCE:

# 1. Code Quality
CODE_REVIEW_METRICS = {
    "average_reviewers": 2.3,  # 2+ required, average 2.3
    "average_review_time": 4,  # hours
    "rework_rate": 15,  # % of PRs need revision
    "test_coverage": 92,  # % (target >=90%)
}

# 2. Security
SECURITY_METRICS = {
    "vulnerabilities_found": 12,  # In last 12 months
    "vulnerabilities_fixed": 12,  # 100% remediated
    "average_fix_time": 7,  # days (target <7 days)
    "penetration_test_findings": {
        "critical": 0,
        "high": 0,
        "medium": 2,
        "low": 5,
    },
}

# 3. Accessibility
ACCESSIBILITY_METRICS = {
    "wcag_compliance": "AA (level 2)",
    "axe_audit_score": 98,  # out of 100
    "screen_reader_compatible": True,
    "keyboard_navigation": "100% functional",
    "color_contrast": "7:1 average",
}

# 4. Performance
PERFORMANCE_METRICS = {
    "latency_p95": 87,  # ms (target <100ms) ✅
    "throughput": 1200,  # req/sec (target >=1000) ✅
    "availability": 99.96,  # % (target >=99.9%) ✅
}

# 5. Reliability
RELIABILITY_METRICS = {
    "mtbf": 720,  # Mean time between failures (hours)
    "mttr": 15,  # Mean time to repair (minutes)
    "uptime": 99.96,  # %
}

# 6. Documentation
DOCUMENTATION_METRICS = {
    "requirements_coverage": 100,  # % of requirements documented
    "design_docs_exist": True,
    "code_documentation": 95,  # % of public functions documented
    "test_documentation": 100,  # % of tests commented
}

# 7. Professional Conduct
CONDUCT_METRICS = {
    "conflicts_disclosed": 1,  # disclosures in last 12 months
    "nda_compliance": "100%",  # all employees signed
    "safety_reports": 2,  # issues reported to security
    "diversity_hiring": "40% women",  # hiring statistics
    "community_contribution": {
        "open_source_commits": 150,
        "mentees": 3,
        "conference_talks": 2,
    },
}
```

---

## Competitive Advantage from K17 Competency

| Aspect | Strong K17 | Weak K17 |
|--------|-----------|---------|
| **Legal compliance** | Contracts reviewed, no IP disputes | Ambiguous contracts, IP lawsuits |
| **Ethical practices** | Transparent, fair, accountable systems | Black-box systems, no oversight |
| **Professional standards** | Code reviewed, security tested, accessible | Sloppy code, security gaps, not accessible |
| **Liability** | Insured, audit trail proves compliance | Exposed, fines and lawsuits |
| **Regulatory** | Compliance documented, audit-ready | Non-compliant, failing audits |
| **Reputation** | Trusted partner for enterprise clients | Unreliable, avoid high-stakes projects |
| **Career** | IEEE/ACM member, recognized expert | Unemployable after security incidents |

**Measurable Impact:**
- **Contract disputes:** 0 vs 2+ lawsuits
- **IP infringement claims:** 0 vs £1M+ damages
- **Regulatory fines:** 0 vs £4.4M+ (GDPR)
- **Insurance claims:** Denied vs paid (£2M+ coverage)
- **Customer trust:** Enterprise clients (compliance required) vs SMB only
- **Professional reputation:** Advancement vs career damage

**Key Learning:** Professionalism is foundation
- Legal: Know contracts, IP, liability
- Ethical: Transparency, fairness, accountability, human oversight
- Standards: Code reviews, security testing, accessibility, documentation
- Conduct: Integrity, confidentiality, safety reporting, community
- Continuous: Stay current (IEEE, ACM, industry standards evolve)
