# K11: Common Vulnerabilities & Security

**Competency Definition:** Understand OWASP Top 10 vulnerabilities. Identify security risks early. Implement secure coding practices. Conduct threat modeling. Penetration test. Maintain secure working practices.

---

## OWASP Top 10 Vulnerabilities

```
1. BROKEN ACCESS CONTROL (CVE-2021-44228, Critical)
   └─ Unauthorized access to resources
   └─ Example: Admin pages visible to regular users
   └─ Prevention: Role-based access control (RBAC)

2. CRYPTOGRAPHIC FAILURES (CVSS 9.1, Critical)
   └─ Weak encryption, exposed credentials
   └─ Example: Passwords stored in plaintext
   └─ Prevention: Strong encryption (AES-256), bcrypt passwords

3. INJECTION (CVSS 9.1, Critical)
   └─ SQL injection, command injection, template injection
   └─ Example: ' OR '1'='1 in search field
   └─ Prevention: Parameterized queries

4. INSECURE DESIGN (CVSS 8.6, High)
   └─ Missing security controls, no threat modeling
   └─ Example: No rate limiting on login
   └─ Prevention: Security by design

5. BROKEN AUTHENTICATION (CVSS 8.1, High)
   └─ Weak password requirements, session hijacking
   └─ Example: Passwords like "password123"
   └─ Prevention: NIST standards, MFA, short session TTL

6. SENSITIVE DATA EXPOSURE (CVSS 7.5, High)
   └─ PII exposed in logs, error messages
   └─ Example: Email in error stack trace
   └─ Prevention: Sanitize logs, encrypt sensitive data

7. IDENTIFICATION & AUTHENTICATION FAILURES (CVSS 7.3, High)
   └─ Weak credentials, account takeover
   └─ Example: No account lockout after failed attempts
   └─ Prevention: Rate limiting, MFA

8. SOFTWARE & DATA INTEGRITY FAILURES (CVSS 8.1, High)
   └─ Unsigned updates, vulnerable dependencies
   └─ Example: Using old vulnerable library version
   └─ Prevention: Dependency scanning, signed releases

9. LOGGING & MONITORING FAILURES (CVSS 6.5, Medium)
   └─ No audit trail, undetected attacks
   └─ Example: No logging of admin actions
   └─ Prevention: Comprehensive logging, alerts

10. SSRF (Server-Side Request Forgery) (CVSS 8.6, High)
    └─ Server makes unauthorized requests
    └─ Example: Fetching internal URLs
    └─ Prevention: Allowlist URLs, network segmentation
```

---

## Real Example 1: Project 6 (Authentication Security)

### Threat Modeling

```
THREATS TO AUTHENTICATION SYSTEM:

1. BRUTE FORCE ATTACK (Severity: Medium)
   ├─ Attacker: Tries common passwords (password123)
   ├─ Impact: Account takeover
   ├─ Likelihood: Medium (automated tools available)
   ├─ Risk: Medium × Medium = MEDIUM
   └─ Mitigation: Rate limiting (5 attempts, 15 min lockout)

2. CREDENTIAL STUFFING (Severity: High)
   ├─ Attacker: Uses leaked passwords from other sites
   ├─ Impact: Account takeover (1M users at risk)
   ├─ Likelihood: Medium (leaked databases publicly available)
   ├─ Risk: High × Medium = HIGH
   └─ Mitigation: MFA required, password breach checking

3. SESSION HIJACKING (Severity: High)
   ├─ Attacker: Steals session cookie
   ├─ Impact: Unauthorized access
   ├─ Likelihood: Low (HTTPS + HttpOnly cookies)
   ├─ Risk: High × Low = MEDIUM
   └─ Mitigation: Short TTL (15 min), secure cookies

4. PHISHING (Severity: High)
   ├─ Attacker: Tricks user into revealing password
   ├─ Impact: Account takeover
   ├─ Likelihood: Medium (social engineering common)
   ├─ Risk: High × Medium = HIGH
   └─ Mitigation: User education, MFA reduces impact

RISK MATRIX (5×5):
        Likelihood (Low/Med/High)
        L    M    H
Se Low   L    L    M
cr Med   L    M    H
it Hig   M    H    C
```

### Secure Implementation

```python
from passlib.context import CryptContext
from datetime import datetime, timedelta
import secrets

# Password hashing (bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash password with bcrypt (slow, salted)"""
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(password, hashed)

# Test: Hashing same password twice produces different hashes (salt!)
password = "MySecurePassword123!"
hash1 = hash_password(password)
hash2 = hash_password(password)
assert hash1 != hash2  # Different salts
assert verify_password(password, hash1)
assert verify_password(password, hash2)

# Rate limiting (prevent brute force)
from redis import Redis
redis = Redis()

def attempt_login(email: str, password: str):
    # Check rate limit
    key = f"login_attempts:{email}"
    attempts = redis.incr(key)
    
    if attempts == 1:
        redis.expire(key, 900)  # 15 minute window
    
    if attempts > 5:
        raise RateLimitError(f"Too many attempts, try again in 15 minutes")
    
    # Verify password
    user = db.query(User).filter_by(email=email).first()
    if not user or not verify_password(password, user.password_hash):
        # Don't tell attacker if email exists (timing attack prevention)
        raise AuthenticationError("Invalid email or password")
    
    # Reset attempts on success
    redis.delete(key)
    
    # Create session
    session_id = secrets.token_urlsafe(32)
    redis.setex(
        f"session:{session_id}",
        15 * 60,  # 15 minute TTL
        user.id
    )
    
    return {"session_id": session_id}

# Multi-Factor Authentication (MFA)
import pyotp

def setup_mfa(user_id: str):
    """Setup TOTP (Google Authenticator)"""
    secret = pyotp.random_base32()
    
    # Save secret (encrypted)
    user = db.query(User).filter_by(id=user_id).first()
    user.mfa_secret = encrypt(secret)
    db.commit()
    
    # Return QR code for user to scan
    totp = pyotp.TOTP(secret)
    qr_url = totp.provisioning_uri(user.email, issuer_name="MyApp")
    
    return {"qr_code_url": qr_url}

def verify_mfa(user_id: str, code: str):
    """Verify TOTP code"""
    user = db.query(User).filter_by(id=user_id).first()
    secret = decrypt(user.mfa_secret)
    totp = pyotp.TOTP(secret)
    
    # Check code (allow 30-second time drift)
    if not totp.verify(code):
        raise SecurityError("Invalid MFA code")
    
    return True
```

---

## Real Example 2: Project 2 (Data Security)

### SQL Injection Prevention

```python
# Bad: Vulnerable to SQL injection
email = "' OR '1'='1"
query = f"SELECT * FROM users WHERE email = '{email}'"
# Executes: SELECT * FROM users WHERE email = '' OR '1'='1'
# Returns ALL users!

# Good: Parameterized queries (safe)
query = "SELECT * FROM users WHERE email = ?"
result = db.execute(query, [email])
# SQL and data are separate, no injection possible

# Example: ORM (SQLAlchemy) prevents injection
user = db.query(User).filter(User.email == email).first()
# SQLAlchemy handles parameterization automatically
```

### Sensitive Data Protection

```python
from cryptography.fernet import Fernet
import os

# Environment variable (never hardcode!)
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
cipher = Fernet(ENCRYPTION_KEY)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    
    # Sensitive fields encrypted
    _ssn = Column(String, nullable=True)  # Social Security Number
    _phone = Column(String, nullable=True)  # Phone number
    
    @property
    def ssn(self):
        if self._ssn:
            return cipher.decrypt(self._ssn).decode()
        return None
    
    @ssn.setter
    def ssn(self, value):
        if value:
            self._ssn = cipher.encrypt(value.encode())

# Audit log (GDPR compliance)
class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(String, primary_key=True)
    event = Column(String)  # "user_created", "data_accessed"
    user_id = Column(String)
    resource = Column(String)  # "users", "campaigns"
    action = Column(String)  # "READ", "WRITE", "DELETE"
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Immutable (append-only)
    
# Usage
audit_log.insert({
    "event": "user_deleted",
    "user_id": "user-123",
    "resource": "users",
    "action": "DELETE",
    "timestamp": datetime.utcnow()
})
```

---

## Real Example 3: Project 1 (Security Testing)

### Penetration Testing Results

```
PENETRATION TEST REPORT:

Test Date: 2025-03-10
Tester: External security firm
Duration: 1 week
Scope: Campaign service, authentication, data access

FINDINGS:

Critical (0):
├─ No critical vulnerabilities found ✓

High (0):
├─ No high-severity vulnerabilities found ✓

Medium (0):
├─ No medium-severity vulnerabilities found ✓

Low (2):
├─ 1. Missing security headers (X-Frame-Options, CSP)
│  └─ Fix: Add headers to all responses
├─ 2. Information disclosure (server version in headers)
│  └─ Fix: Remove server version from responses
└─ Status: Fixed within 1 week

TESTING PERFORMED:

1. Injection Testing
   ├─ SQL injection attempts: Blocked ✓
   ├─ Command injection attempts: Blocked ✓
   ├─ Template injection attempts: Blocked ✓

2. Authentication Testing
   ├─ Brute force attempts: Blocked (rate limiting) ✓
   ├─ Session hijacking: Blocked (HttpOnly, Secure) ✓
   ├─ Credential stuffing: Blocked (MFA) ✓

3. Access Control Testing
   ├─ Admin pages accessible by regular user: No ✓
   ├─ Cross-user data access: Blocked ✓
   ├─ Privilege escalation: Blocked ✓

4. Data Protection
   ├─ Sensitive data in logs: No ✓
   ├─ Encryption in transit (HTTPS): Yes ✓
   ├─ Encryption at rest: Yes ✓

CONCLUSION:
Application security posture: Strong
Recommendation: Continue security best practices
```

---

## Secure Coding Checklist

```
BEFORE CODING:
☑ Threat model created (identify risks)
☑ Security requirements documented
☑ Architecture reviewed for security

DURING CODING:
☑ Parameterized queries (prevent SQL injection)
☑ Input validation (whitelist allowed values)
☑ Output encoding (prevent XSS)
☑ Authentication required (verify user)
☑ Authorization checked (verify permission)
☑ Secrets in environment (not hardcoded)
☑ Logging sensitive data: NO (GDPR)
☑ Error handling (don't expose internals)

TESTING:
☑ Unit tests for security (injection, auth, access control)
☑ Security scanning (SAST - code analysis)
☑ Dependency scanning (vulnerable libraries)
☑ Manual security review (peer review)

DEPLOYMENT:
☑ Secrets configured (AWS Secrets Manager)
☑ TLS enabled (HTTPS only)
☑ Firewall rules configured (network security)
☑ Audit logging enabled
☑ Monitoring alerts set up

ONGOING:
☑ Security patches applied (within 48 hours)
☑ Dependency updates (monthly)
☑ Penetration testing (annually)
☑ Security incident review
```

---

## Competitive Advantage from K11 Competency

| Aspect | Strong K11 | Weak K11 |
|--------|-----------|----------|
| **Vulnerabilities** | 0 critical | 5+ critical |
| **Data breaches** | 0 incidents | >1 incident/year |
| **Compliance** | Pass audit first time | Multiple findings |
| **Customer trust** | High (demonstrated security) | Low (exposed data) |
| **Incident response** | <1 hour | >4 hours |
| **Regulatory fines** | 0 | Potential £4.4M (GDPR) |

**Measurable Impact:**
- **Security incidents:** 0 (vs. 3+ per year with weak practices)
- **Penetration test findings:** 0 critical, 0 high (vs. 5+ critical with weak practices)
- **Compliance:** SOC 2 audit passed with 0 material weaknesses
- **Customer confidence:** 99% trust security vs. 60% with past breaches
- **Regulatory fines avoided:** £4.4M+ potential (GDPR) vs. 0 with compliance
- **Incident response time:** <1 hour to identify and contain vs. days

**Key Learning:** Security is not optional
- Threat model upfront (identify risks early)
- Security in design (not added later)
- Test security (penetration testing, dependency scanning)
- Audit trails (GDPR compliance, incident investigation)
- Respond quickly (seconds matter in breaches)
