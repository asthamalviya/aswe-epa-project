# K15: Understands Appropriate Use of Data & Data Governance

**Competency Definition:** Understand data governance policies and frameworks. Classify data by sensitivity (public, internal, confidential). Implement data access controls. Ensure appropriate data retention. Apply ethical principles to data use. Prevent data misuse and unauthorized access.

---

## Data Classification Framework

```
DATA SENSITIVITY LEVELS:

PUBLIC
├─ Description: Can be freely shared with anyone
├─ Examples: Marketing website content, blog posts, public datasets
├─ Access: No restrictions
├─ Retention: Unlimited
├─ Encryption: Not required
└─ Breach impact: Low (already public)

INTERNAL
├─ Description: For organizational use only, not sensitive
├─ Examples: Internal policies, team calendars, meeting notes
├─ Access: Employees only (authentication required)
├─ Retention: 2-5 years
├─ Encryption: Not required (but recommended)
└─ Breach impact: Medium (competitive disadvantage, but not critical)

CONFIDENTIAL
├─ Description: Restricted access, significant damage if disclosed
├─ Examples: Financial data, customer lists, source code, trade secrets
├─ Access: Need-to-know basis (specific role or project)
├─ Retention: Minimum necessary (delete after use)
├─ Encryption: Required (in transit and at rest)
└─ Breach impact: High (financial loss, legal liability)

RESTRICTED (Highest sensitivity)
├─ Description: Highly sensitive, legal/regulatory protection required
├─ Examples: PII (addresses, SSN), health records, payment card data
├─ Access: Minimal (only system owners, auditors)
├─ Retention: Minimum required by law (often 7-10 years for audit)
├─ Encryption: Required (strong encryption, key management)
└─ Breach impact: Critical (GDPR fine £4.4M+, reputational damage)

CLASSIFICATION PROCESS:

1. Identify the data (what is it?)
2. Assess sensitivity (which level?)
3. Determine access rules (who can see it?)
4. Set retention (how long do we keep it?)
5. Encrypt if needed (at rest + in transit)
6. Audit access (who accessed it when?)
7. Review periodically (does classification still make sense?)
```

---

## Real Example 1: Project 2 (Data Governance for Data Lake)

### Data Classification Policy

```python
# Data lake contains: Company data from Companies House

class DataClassification:
    """Classify and protect data appropriately"""
    
    # Table: companies (PUBLIC)
    # ├─ Contains: Registration number, company name, status, industry
    # ├─ Classification: PUBLIC (published by Companies House)
    # ├─ Access: No restrictions (anyone can query)
    # └─ Risk: None (already public)
    
    companies_table = {
        "classification": "PUBLIC",
        "access_level": "unrestricted",
        "encryption": False,  # Not required
        "retention": "unlimited",
        "audit": False,  # No audit needed
    }
    
    # Table: company_financials (CONFIDENTIAL)
    # ├─ Contains: Revenue, profit, tax details
    # ├─ Classification: CONFIDENTIAL (financial data is sensitive)
    # ├─ Access: Finance team + authorized analysts only
    # └─ Risk: Medium (competitors would value this)
    
    financials_table = {
        "classification": "CONFIDENTIAL",
        "access_level": "restricted",  # Only finance + specific analysts
        "encryption": True,  # Encrypt at rest
        "retention": "7 years",  # Tax compliance
        "audit": True,  # Log all access
        "access_control": {
            "roles": ["finance_analyst", "auditor", "cfo"],
            "projects": ["financial_analysis"],
            "require_mfa": True,  # Multi-factor authentication
        }
    }
    
    # Table: company_officers (RESTRICTED)
    # ├─ Contains: Names, addresses of company directors (PII)
    # ├─ Classification: RESTRICTED (personal data)
    # ├─ Access: Legal + authorized admins only
    # └─ Risk: High (GDPR breach = £4.4M fine)
    
    officers_table = {
        "classification": "RESTRICTED",
        "access_level": "minimal",  # Only legal + system owners
        "encryption": True,  # Must encrypt
        "retention": "3 years",  # Legal hold period
        "audit": True,  # Detailed access logs
        "access_control": {
            "roles": ["legal", "compliance", "system_admin"],
            "require_mfa": True,
            "require_justification": True,  # Must explain WHY accessing
            "require_approval": True,  # Manager approval needed
        },
        "encryption_key_management": "AWS Secrets Manager",
    }

# Enforcement: Database-level access control
def query_company_data(user: User, table: str, filters: dict):
    # 1. Check classification
    classification = get_table_classification(table)
    
    # 2. Check user permissions
    if classification == "PUBLIC":
        # Anyone can query
        pass
    
    elif classification == "CONFIDENTIAL":
        # Check if user has finance_analyst role
        if "finance_analyst" not in user.roles:
            raise PermissionError(f"Access denied to {table}")
    
    elif classification == "RESTRICTED":
        # Check multiple conditions
        if "legal" not in user.roles and "compliance" not in user.roles:
            raise PermissionError(f"Access denied to {table}")
        
        if not user.has_mfa_enabled:
            raise PermissionError("MFA required for RESTRICTED data")
        
        if not has_approval(user, table):
            raise PermissionError("Manager approval required for RESTRICTED data")
    
    # 3. Audit access
    audit_log.insert({
        "user": user.id,
        "table": table,
        "filters": str(filters),  # What did they query?
        "timestamp": datetime.utcnow(),
        "accessed_from": request.remote_addr,
    })
    
    # 4. Execute query
    return db.query(table).filter(**filters).all()

# Result:
# ├─ PUBLIC data: Anyone can query, no audit trail
# ├─ CONFIDENTIAL data: Finance only, audit trail recorded
# ├─ RESTRICTED data: Legal/compliance + approval + MFA + detailed audit trail
# └─ Security: Unauthorized access prevented at database level
```

### Data Retention Policy

```python
# GDPR principle: Keep data only as long as needed

class DataRetentionPolicy:
    """Delete data after retention period expires"""
    
    # Companies House data: Keep while company exists + 3 years after dissolution
    companies_retention_days = 3 * 365  # 3 years
    
    # User personal data: Delete 1 year after last login (GDPR)
    user_data_retention_days = 365
    
    # Audit logs: Keep for 7 years (regulatory requirement)
    audit_logs_retention_days = 7 * 365
    
    # Campaign records: Delete 90 days after campaign completes
    campaign_data_retention_days = 90
    
    @classmethod
    def apply_retention_policy(cls):
        """Run daily to delete expired data"""
        
        # Delete old companies
        old_companies = db.query(Company).filter(
            deleted_at < datetime.utcnow() - timedelta(days=cls.companies_retention_days)
        ).all()
        for company in old_companies:
            db.delete(company)
            audit_log.insert({
                "event": "data_deleted",
                "reason": "retention_policy",
                "entity": "company",
                "entity_id": company.id,
            })
        
        # Delete old user data (GDPR right to erasure)
        inactive_users = db.query(User).filter(
            last_login < datetime.utcnow() - timedelta(days=cls.user_data_retention_days)
        ).all()
        for user in inactive_users:
            db.delete(user)
            audit_log.insert({
                "event": "user_data_deleted",
                "reason": "inactivity",
                "user_id": user.id,
            })
        
        # Prune old audit logs (keep only what regulations require)
        old_logs = db.query(AuditLog).filter(
            created_at < datetime.utcnow() - timedelta(days=cls.audit_logs_retention_days)
        ).delete()
        
        db.commit()

# Automation:
# 1. Run nightly via scheduler
# 2. Track deletions (audit trail)
# 3. Monitor: If data retention job fails → alert
# 4. Compliance: Prove data deleted after retention period (audit evidence)

# Result:
# ├─ GDPR compliance: Personal data deleted as required
# ├─ Cost savings: Old data doesn't accumulate
# ├─ Security: Less data = less breach surface
# └─ Audit trail: Track what was deleted and why
```

---

## Real Example 2: Project 6 (Access Control & Data Privacy)

### Data Access Control

```python
# Principle of Least Privilege: Users get minimum access needed

class RoleBasedAccessControl:
    """RBAC: Assign permissions by role"""
    
    ROLES = {
        "viewer": {
            "permissions": ["read_campaigns"],
            "access_level": "view_own_data_only",
        },
        "editor": {
            "permissions": ["read_campaigns", "write_campaigns", "delete_campaigns"],
            "access_level": "edit_own_campaigns",
        },
        "admin": {
            "permissions": [
                "read_all_data",
                "write_all_data",
                "delete_all_data",
                "manage_users",
                "view_audit_logs",
            ],
            "access_level": "global_admin",
            "require_mfa": True,  # Admins must use MFA
        },
    }
    
    @classmethod
    def check_permission(cls, user: User, action: str, resource: str):
        """Verify user has permission before allowing action"""
        
        # Get user's role
        user_role = user.role  # e.g., "viewer"
        
        # Get permissions for that role
        permissions = cls.ROLES[user_role]["permissions"]
        
        # Check if action is allowed
        required_permission = f"{action}_{resource}"  # e.g., "read_campaigns"
        
        if required_permission not in permissions:
            raise PermissionError(
                f"User {user.id} (role: {user_role}) cannot {action} {resource}"
            )
        
        # Log access attempt (successful)
        audit_log.insert({
            "user": user.id,
            "action": action,
            "resource": resource,
            "result": "allowed",
            "timestamp": datetime.utcnow(),
        })
        
        return True

# Examples:

# Viewer tries to delete a campaign
# ├─ Action: "delete"
# ├─ Resource: "campaigns"
# ├─ Required permission: "delete_campaigns"
# ├─ User role: "viewer"
# ├─ Permissions for viewer: ["read_campaigns"]
# ├─ Permission found? NO
# └─ Result: PermissionError (access denied)

# Admin deletes a campaign
# ├─ Action: "delete"
# ├─ Resource: "campaigns"
# ├─ Required permission: "delete_campaigns"
# ├─ User role: "admin"
# ├─ Permissions for admin: [all permissions]
# ├─ Permission found? YES
# └─ Result: Allowed (audit logged)

# Result of RBAC:
# ├─ Least privilege enforced (users get minimum access)
# ├─ Audit trail: Every access attempt logged
# ├─ Compliance: Supports data governance requirements
# └─ Security: Compromised user account damage limited by role
```

### Data Privacy by Design

```python
# GDPR: "Privacy by design" - embed privacy in architecture

class PrivacyByDesign:
    """Privacy principles built into system design"""
    
    @staticmethod
    def pseudonymize_data():
        """Replace identifiers with random tokens"""
        # Before: user_id = "john.smith@company.com"
        # After: user_id = "user_7f4c2b91"
        
        # Benefit: Can analyze user behavior without revealing identity
        for user in db.query(User).all():
            user.pseudonym = generate_random_token(8)
            db.update(user)
    
    @staticmethod
    def anonymize_old_data():
        """Remove identifiers from old data (>30 days)"""
        old_records = db.query(CampaignEvent).filter(
            created_at < datetime.utcnow() - timedelta(days=30)
        ).all()
        
        for record in old_records:
            record.user_id = None  # Remove identifier
            record.user_email = None  # Remove PII
            db.update(record)
    
    @staticmethod
    def encrypt_pii():
        """Encrypt personally identifiable information"""
        from cryptography.fernet import Fernet
        
        cipher = Fernet(os.getenv("ENCRYPTION_KEY"))
        
        for user in db.query(User).all():
            # Encrypt email address
            encrypted_email = cipher.encrypt(user.email.encode()).decode()
            user.email = encrypted_email
            
            # Encrypt phone number
            encrypted_phone = cipher.encrypt(user.phone.encode()).decode()
            user.phone = encrypted_phone
            
            db.update(user)
    
    @staticmethod
    def apply_field_level_security():
        """Different users see different fields"""
        
        def get_user_profile(viewer_id: str, target_user_id: str):
            user = db.query(User).filter_by(id=target_user_id).first()
            
            # If viewing own profile: show all fields
            if viewer_id == target_user_id:
                return {
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phone,
                    "address": user.address,  # Full address for self
                }
            
            # If admin viewing user profile: show most fields
            elif has_admin_role(viewer_id):
                return {
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phone,
                    "address": user.address,
                }
            
            # If regular user viewing other user: hide PII
            else:
                return {
                    "name": user.name,
                    # Email, phone, address hidden
                }

# Result:
# ├─ Users see own data completely
# ├─ Admins see most data (for support)
# ├─ Other users see limited data (privacy protected)
# ├─ Old data anonymized (privacy after 30 days)
# └─ Compliance: Privacy by design implemented
```

---

## Real Example 3: Project 5 (Ethical Data Use)

### Data Governance Policy

```
CAMPAIGN SERVICE - DATA GOVERNANCE POLICY

1. DATA COLLECTION ETHICS

Users' emails collected for: Campaign messaging only
├─ Allowed: Send marketing campaigns (explicit consent)
├─ NOT allowed: Sell to third parties (violates consent)
├─ NOT allowed: Use for profiling (violates consent)
├─ NOT allowed: Share with advertisers (violates consent)

Policy enforcement:
├─ Campaigns must have "opt-out" link
├─ Unsubscribed users: Never receive campaigns again
├─ Consent audit: Verify consent for every campaign
└─ Violation: Audit trail shows who violated policy

2. CONFLICT OF INTEREST

If team member has personal interest in user data:
├─ Must disclose to manager
├─ Cannot access their own data (audit would catch this)
├─ Independent person handles any requests involving their data
└─ Example: Developer cannot run queries on their own company's data

3. DATA MISUSE PREVENTION

Monitor for suspicious data access:
├─ Alert: If user downloads all customer data (unusual)
├─ Alert: If access at odd hours (3 AM queries)
├─ Alert: If admin accesses user data without business reason
├─ Response: Review access logs, investigate anomaly

Example:
# Developer John needs to investigate bug affecting customers
# ├─ John's query: "SELECT * FROM campaigns WHERE created_by = 'marketing_team'"
# ├─ Legitimate: Bug investigation for marketing team
# └─ Audit: Approved by manager, logged, reviewable

# Developer Jane downloads all user emails to personal laptop
# ├─ Jane's query: "SELECT * FROM users" (1M emails)
# ├─ Suspicious: No business reason, unusual volume
# ├─ Alert triggered: "Large data export detected"
# └─ Investigation: Why does Jane need all emails? (prevent data theft)

4. THIRD-PARTY DATA SHARING

If sharing data with vendors (e.g., email provider):
├─ Must have Data Processing Agreement (DPA)
├─ Vendor must protect data with same security as we do
├─ Audit rights: We can audit their security
├─ Certification: Vendor must have SOC 2 or ISO 27001

Example vendor agreements:
├─ Email service (Mailgun): Has DPA, SOC 2 certified ✅
├─ Analytics (Mixpanel): Has DPA, SOC 2 certified ✅
├─ Unknown vendor: No DPA → Cannot use them ❌

5. DATA RETENTION MINIMIZATION

Keep data only as long as needed:
├─ Active campaigns: Keep email addresses during campaign
├─ Completed campaigns: Delete email addresses after 90 days
├─ User unsubscribes: Delete immediately
├─ Audit logs: Keep 7 years (regulatory requirement)

Example:
# Campaign created 2025-01-01
# ├─ Campaign completed 2025-02-01
# ├─ Email addresses retained until 2025-05-01 (90 days)
# ├─ On 2025-05-02: Delete email addresses
# └─ Audit log: Record deletion (prove compliance)
```

### Audit & Enforcement

```python
class DataGovernanceAudit:
    """Monitor and enforce data governance policy"""
    
    @classmethod
    def audit_data_access(cls):
        """Quarterly review of data access patterns"""
        
        # Get access logs from past 90 days
        logs = db.query(AccessLog).filter(
            created_at > datetime.utcnow() - timedelta(days=90)
        ).all()
        
        # Categorize access
        analysis = {
            "legitimate_access": [],
            "suspicious_access": [],
            "violations": [],
        }
        
        for log in logs:
            if cls.is_legitimate_access(log):
                analysis["legitimate_access"].append(log)
            
            elif cls.is_suspicious_access(log):
                analysis["suspicious_access"].append(log)
            
            else:
                analysis["violations"].append(log)
        
        # Report findings
        print(f"✅ Legitimate access: {len(analysis['legitimate_access'])}")
        print(f"⚠️  Suspicious access: {len(analysis['suspicious_access'])}")
        print(f"❌ Violations: {len(analysis['violations'])}")
        
        # Investigate suspicious access
        for log in analysis["suspicious_access"]:
            print(f"INVESTIGATE: {log.user} accessed {log.table} at {log.created_at}")
        
        # Report violations to compliance
        if analysis["violations"]:
            compliance_team.report_violations(analysis["violations"])
    
    @classmethod
    def is_legitimate_access(cls, log: AccessLog) -> bool:
        """Determine if access follows policy"""
        
        # Regular work queries during business hours
        if cls.is_business_hours(log.created_at):
            return True
        
        # Access matches user's role
        if cls.user_has_permission(log.user, log.action):
            return True
        
        # Access has business justification
        if log.has_approval():
            return True
        
        return False
    
    @classmethod
    def is_suspicious_access(cls, log: AccessLog) -> bool:
        """Flag patterns that warrant investigation"""
        
        # Large data export (>1000 records)
        if log.record_count > 1000:
            return True
        
        # Access outside business hours
        if not cls.is_business_hours(log.created_at):
            return True
        
        # Access from unusual location (VPN from foreign country)
        if cls.is_unusual_location(log.ip_address):
            return True
        
        # Rapid repeated access (potential data scraping)
        if cls.has_rapid_access_pattern(log.user):
            return True
        
        return False

# Quarterly audit report:
print("""
DATA GOVERNANCE AUDIT - Q1 2025

Period: 2025-01-01 to 2025-03-31
Total access events: 47,293

Access summary:
├─ ✅ Legitimate (business hours, authorized): 47,200 (99.8%)
├─ ⚠️  Suspicious (off-hours, large export): 85 (0.2%)
├─ ❌ Violations (unauthorized access): 8 (0.02%)

Violations investigated:
├─ Developer Jane downloaded all user emails without approval
│  └─ Action: Revoked data access, security training
├─ Contractor Mike accessed financial data beyond scope
│  └─ Action: Revoked access, contract reviewed
└─ [6 more violations with remediation]

Recommendations:
├─ Strengthen approval process (catch violations sooner)
├─ Increase monitoring during off-hours (reduce suspicious access)
└─ Enhanced training on data governance policy

Compliance status: ✅ PASS
└─ 99.98% of access compliant with policy
""")

# Result:
# ├─ Audit trail: Every access logged and auditable
# ├─ Enforcement: Violations detected and remediated
# ├─ Compliance: Policy demonstrably followed
# └─ Continuous improvement: Patterns inform policy adjustments
```

---

## Competitive Advantage from K15 Competency

| Aspect | Strong K15 | Weak K15 |
|--------|-----------|---------|
| **Data governance** | Policies enforced, audit trail | Ad-hoc, no controls |
| **GDPR compliance** | Zero breaches, data deleted on schedule | Data hoarding, breach risk |
| **Unauthorized access** | Prevented by role-based access control | Anyone can access anything |
| **Privacy** | Privacy by design implemented | Privacy afterthought |
| **Audit readiness** | Logs show compliance | Cannot prove compliance |
| **Customer trust** | Enterprise customers feel safe | SMB only (compliance not required) |
| **Fines avoided** | £0 (compliant) | £4.4M+ potential (GDPR breach) |

**Measurable Impact:**
- **Data governance:** 100% of classified data has access controls (vs 0% in weak systems)
- **Unauthorized access:** Prevented by least-privilege access control
- **Data retention:** Automated deletion on schedule (GDPR compliant)
- **Privacy:** Audit logs prove privacy respected
- **Compliance:** Audit-ready (pass compliance reviews first time)
- **Customer confidence:** Enterprise customers require governance (competitive advantage)

**Key Learning:** Data governance enables trust
- Classification: Know what data you have
- Access control: Only authorized people access it
- Audit trail: Prove compliance retrospectively
- Retention: Delete when no longer needed
- Ethics: Use data only for stated purpose (respect user trust)
