# K1: Understands and Applies Software Engineering Principles

**Competency Definition:** Understand fundamental software engineering principles including SOLID, DRY, KISS, YAGNI. Apply design patterns appropriately. Understand trade-offs between different approaches. Build maintainable, scalable, testable code. Apply principles to real projects, not just theory.

---

## Software Engineering Principles Framework

I build quality software by:

```
CORE PRINCIPLES

1. SOLID PRINCIPLES (Object-Oriented Design)
   ├─ S: Single Responsibility (one class = one reason to change)
   ├─ O: Open/Closed (open for extension, closed for modification)
   ├─ L: Liskov Substitution (subclasses can replace parent classes)
   ├─ I: Interface Segregation (specific interfaces, not fat ones)
   └─ D: Dependency Inversion (depend on abstractions, not concretions)

2. DRY (Don't Repeat Yourself)
   ├─ Avoid duplication (copy-paste is code smell)
   ├─ Extract common logic into reusable functions/classes
   ├─ Single source of truth (change once, applies everywhere)
   └─ Trade-off: Don't over-abstract too early (premature optimization)

3. KISS (Keep It Simple, Stupid)
   ├─ Simple solutions better than complex ones
   ├─ Readable code > clever code
   ├─ Use language features wisely (not every feature needs to be used)
   └─ Trade-off: Simple ≠ naive (must handle real requirements)

4. YAGNI (You Aren't Gonna Need It)
   ├─ Don't implement features that aren't needed
   ├─ Don't over-engineer for hypothetical future requirements
   ├─ Build for today's needs, refactor when requirements change
   └─ Trade-off: Must still design for reasonable extensions

5. TESTING PRINCIPLES (Test Pyramid)
   ├─ 70% unit tests (fast, independent, focused)
   ├─ 15% integration tests (test component interactions)
   ├─ 10% system tests (end-to-end workflows)
   ├─ 5% manual/exploratory (edge cases, UX)
   └─ TDD (test-first) drives better design

6. MAINTAINABILITY
   ├─ Clear naming (variable names reveal intent)
   ├─ Short functions (do one thing, do it well)
   ├─ Cohesion (related code grouped together)
   ├─ Loose coupling (minimal dependencies between components)
   └─ Documentation (why, not what - code shows what)
```

---

## Real Example 1: SOLID Principles – Project 6 (AI Governance Assistant)

### Single Responsibility Principle (S)

```
PROBLEM: Class does too many things

Bad Design (Violates SRP):
├─ Class: AuthenticationService
│  ├─ Responsibility 1: Validate JWT token
│  ├─ Responsibility 2: Generate JWT token
│  ├─ Responsibility 3: Hash passwords
│  ├─ Responsibility 4: Send email verification
│  ├─ Responsibility 5: Log authentication events
│  └─ Reason to change: Multiple (token logic, password hashing, email, logging)
│
└─ Problem: If JWT format changes, we modify same class that handles hashing
   └─ Risk: Breaking password hashing when updating token logic

Good Design (Follows SRP):
├─ Class: TokenValidator
│  ├─ Responsibility: Validate JWT tokens only
│  └─ Reason to change: JWT format/validation logic
│
├─ Class: TokenGenerator
│  ├─ Responsibility: Generate JWT tokens only
│  └─ Reason to change: JWT generation logic
│
├─ Class: PasswordHasher
│  ├─ Responsibility: Hash and verify passwords only
│  └─ Reason to change: Hashing algorithm
│
├─ Class: EmailService
│  ├─ Responsibility: Send emails only
│  └─ Reason to change: Email provider changes
│
└─ Class: AuthenticationLogger
   ├─ Responsibility: Log authentication events only
   └─ Reason to change: Logging requirements change

BENEFIT:
├─ Each class has one reason to change
├─ Testing: Can test TokenValidator without email or logging
├─ Reuse: PasswordHasher used in registration AND password reset
├─ Maintenance: Changing JWT format doesn't affect password hashing
└─ Result: More maintainable, testable, reusable code

REAL CODE EXAMPLE:

Bad (Violates SRP):
```python
class AuthService:
    def validate_token(self, token):
        try:
            decoded = jwt.decode(token, SECRET_KEY)
            self.log_event("token_validated", token)  # Mixing concerns
            self.send_verification_email(decoded["user"])  # Email logic in auth?
            return decoded
        except:
            self.log_event("token_failed")
            return None
```

Good (Follows SRP):
```python
class TokenValidator:
    def validate_token(self, token):
        try:
            return jwt.decode(token, SECRET_KEY)
        except:
            return None

class AuthenticationLogger:
    def log_token_validated(self, token_data):
        logger.info(f"Token validated: {token_data}")
    
    def log_token_failed(self):
        logger.error("Token validation failed")

class EmailService:
    def send_verification_email(self, user):
        # Email logic here
        pass

# Usage:
validator = TokenValidator()
logger = AuthenticationLogger()
email_service = EmailService()

token_data = validator.validate_token(token)
if token_data:
    logger.log_token_validated(token_data)
    email_service.send_verification_email(token_data["user"])
else:
    logger.log_token_failed()
```

RESULT: Each class has one responsibility, easier to test/maintain/extend ✓
```

### Open/Closed Principle (O)

```
PROBLEM: Code needs modification to add new features

Bad Design (Violates OCP):
├─ Function: send_notification(notification_type, data)
│  ├─ if notification_type == "email":
│  │    send_email(data)
│  ├─ elif notification_type == "sms":
│  │    send_sms(data)
│  ├─ elif notification_type == "slack":
│  │    send_slack(data)
│  └─ Problem: Need to modify this function for each new notification type
│
└─ Scenario: New requirement - add Teams notifications
   ├─ Must modify send_notification function
   ├─ Risk: Breaking existing email/SMS/Slack logic
   └─ Violates OCP: "Closed for modification"

Good Design (Follows OCP):
├─ Abstract Interface: NotificationSender
│  ├─ Method: send(data) - abstract
│  └─ All senders implement this interface
│
├─ Class: EmailSender implements NotificationSender
│  └─ send(data): Send via email
│
├─ Class: SmsSender implements NotificationSender
│  └─ send(data): Send via SMS
│
├─ Class: SlackSender implements NotificationSender
│  └─ send(data): Send via Slack
│
├─ Class: TeamsSender implements NotificationSender (NEW - no modification needed!)
│  └─ send(data): Send via Teams
│
└─ Function: send_notification(sender: NotificationSender, data)
   └─ sender.send(data) - works with ANY sender

BENEFIT:
├─ Open for extension: Can add TeamsSender without modifying existing code
├─ Closed for modification: Existing email/SMS/Slack code unchanged
├─ No risk: Adding feature doesn't break existing functionality
└─ Result: More extensible, lower risk of regressions

REAL CODE EXAMPLE:

Bad (Violates OCP):
```python
def send_notification(notification_type, data):
    if notification_type == "email":
        send_email(data)
    elif notification_type == "sms":
        send_sms(data)
    elif notification_type == "slack":
        send_slack(data)
    # Adding Teams requires modifying this function!
```

Good (Follows OCP):
```python
from abc import ABC, abstractmethod

class NotificationSender(ABC):
    @abstractmethod
    def send(self, data):
        pass

class EmailSender(NotificationSender):
    def send(self, data):
        # Email logic
        pass

class SmsSender(NotificationSender):
    def send(self, data):
        # SMS logic
        pass

class SlackSender(NotificationSender):
    def send(self, data):
        # Slack logic
        pass

class TeamsSender(NotificationSender):  # NEW - no modification to existing!
    def send(self, data):
        # Teams logic
        pass

# Function works with ANY sender, no modification needed
def send_notification(sender: NotificationSender, data):
    sender.send(data)

# Usage:
email_sender = EmailSender()
slack_sender = SlackSender()
teams_sender = TeamsSender()

send_notification(email_sender, data)   # Works
send_notification(slack_sender, data)   # Works
send_notification(teams_sender, data)   # Works - no code modification!
```

RESULT: New senders can be added without modifying existing code ✓
```

### Liskov Substitution Principle (L)

```
PROBLEM: Subclass breaks parent class contract

Bad Design (Violates LSP):
├─ Base class: Bird
│  ├─ Method: fly() - returns "flying at 100 mph"
│  └─ Contract: All birds can fly
│
├─ Subclass: Penguin extends Bird
│  ├─ Method: fly()
│  │  ├─ throws NotImplementedError("Penguins can't fly!")
│  │  └─ VIOLATION: fly() should work for any Bird!
│  └─ Problem: Code expecting Bird.fly() breaks with Penguin
│
└─ Code that breaks:
   ```
   birds = [Sparrow(), Eagle(), Penguin()]
   for bird in birds:
       bird.fly()  # Crashes on Penguin!
   ```

Good Design (Follows LSP):
├─ Base class: Bird
│  └─ Method: move() - abstract
│
├─ Subclass: FlyingBird extends Bird
│  └─ Method: move(): return "flying"
│
├─ Subclass: SwimmingBird extends Bird
│  └─ Method: move(): return "swimming"
│
├─ Subclass: Sparrow extends FlyingBird
│  └─ move(): return "flying at 100 mph"
│
├─ Subclass: Penguin extends SwimmingBird
│  └─ move(): return "swimming fast"
│
└─ Code that works:
   ```
   birds = [Sparrow(), Eagle(), Penguin()]
   for bird in birds:
       bird.move()  # Works for all!
   ```

BENEFIT:
├─ Subclasses can always replace parent classes
├─ No surprises (NotImplementedError shouldn't be used)
├─ Polymorphism works correctly
└─ Result: More predictable, reliable code

REAL CODE EXAMPLE:

Bad (Violates LSP):
```python
class UserRepository:
    def save(self, user):
        # Save to database
        pass
    
    def delete(self, user):
        # Delete from database
        pass

class ReadOnlyUserRepository(UserRepository):
    def save(self, user):
        raise NotImplementedError("Read-only repository")
    
    def delete(self, user):
        raise NotImplementedError("Read-only repository")

# Code expecting UserRepository breaks with ReadOnlyUserRepository
def update_user(repo: UserRepository, user):
    repo.save(user)  # Crashes if repo is ReadOnlyUserRepository!
```

Good (Follows LSP):
```python
class UserRepository(ABC):
    @abstractmethod
    def get_user(self, user_id):
        pass

class ReadWriteUserRepository(UserRepository):
    def get_user(self, user_id):
        return db.query(f"SELECT * FROM users WHERE id={user_id}")
    
    def save(self, user):
        db.execute(f"UPDATE users SET...")

class ReadOnlyUserRepository(UserRepository):
    def get_user(self, user_id):
        return cache.get(f"user:{user_id}")

# Code works with any repository
def get_user_info(repo: UserRepository, user_id):
    return repo.get_user(user_id)  # Works for both!

# Usage:
read_write_repo = ReadWriteUserRepository()
read_only_repo = ReadOnlyUserRepository()

get_user_info(read_write_repo, 123)  # Works
get_user_info(read_only_repo, 123)   # Works - no crashes!
```

RESULT: Subclasses safely replace parent classes ✓
```

### Interface Segregation Principle (I)

```
PROBLEM: Clients forced to depend on methods they don't use

Bad Design (Violates ISP):
├─ Interface: PaymentProcessor (fat interface)
│  ├─ Method: process_credit_card(card_data)
│  ├─ Method: process_bank_transfer(bank_data)
│  ├─ Method: process_cryptocurrency(wallet_data)
│  ├─ Method: process_apple_pay(token)
│  └─ Method: validate_fraud_score(transaction)
│
├─ Class: StripePaymentProcessor implements PaymentProcessor
│  ├─ process_credit_card(): ✓ (Stripe supports)
│  ├─ process_bank_transfer(): ✓ (Stripe supports)
│  ├─ process_cryptocurrency(): ✗ (Not supported, throw error)
│  ├─ process_apple_pay(): ✓ (Stripe supports)
│  └─ validate_fraud_score(): ✗ (Not supported, throw error)
│
└─ Problem: StripePaymentProcessor forced to implement methods it doesn't support

Good Design (Follows ISP):
├─ Interface: CreditCardProcessor
│  └─ process_credit_card(card_data)
│
├─ Interface: BankTransferProcessor
│  └─ process_bank_transfer(bank_data)
│
├─ Interface: CryptocurrencyProcessor
│  └─ process_cryptocurrency(wallet_data)
│
├─ Interface: FraudDetector
│  └─ validate_fraud_score(transaction)
│
├─ Class: StripePaymentProcessor implements CreditCardProcessor, BankTransferProcessor, FraudDetector
│  ├─ Only methods it actually supports
│  └─ No dummy implementations
│
└─ Class: BitcoinProcessor implements CryptocurrencyProcessor
   └─ Only cryptocurrency method (not credit card, etc.)

BENEFIT:
├─ Each interface has one job (segregated)
├─ Clients use only interfaces they need
├─ No dummy implementations (throws NotImplementedError)
├─ More flexible (pick and choose capabilities)
└─ Result: Cleaner, more focused interfaces

REAL CODE EXAMPLE:

Bad (Violates ISP):
```python
class PaymentProcessor:
    def process_credit_card(self, card_data): pass
    def process_bank_transfer(self, bank_data): pass
    def process_crypto(self, wallet): pass
    def validate_fraud(self, transaction): pass

class StripeProcessor(PaymentProcessor):
    def process_credit_card(self, card_data):
        # Stripe implementation
        pass
    
    def process_bank_transfer(self, bank_data):
        # Stripe implementation
        pass
    
    def process_crypto(self, wallet):
        raise NotImplementedError("Stripe doesn't support crypto")
    
    def validate_fraud(self, transaction):
        # Stripe fraud check
        pass

# Client forced to know about methods that don't work
def checkout(processor: PaymentProcessor):
    # Is this safe? Does processor support all these?
    processor.process_credit_card(...)  # Maybe
    processor.validate_fraud(...)        # Maybe
```

Good (Follows ISP):
```python
class CreditCardProcessor:
    def process_credit_card(self, card_data): pass

class BankTransferProcessor:
    def process_bank_transfer(self, bank_data): pass

class CryptoProcessor:
    def process_crypto(self, wallet): pass

class FraudValidator:
    def validate_fraud(self, transaction): pass

class StripeProcessor(CreditCardProcessor, BankTransferProcessor, FraudValidator):
    def process_credit_card(self, card_data):
        # Stripe credit card
        pass
    
    def process_bank_transfer(self, bank_data):
        # Stripe bank transfer
        pass
    
    def validate_fraud(self, transaction):
        # Stripe fraud check
        pass

class BitcoinProcessor(CryptoProcessor):
    def process_crypto(self, wallet):
        # Bitcoin implementation
        pass

# Client knows exactly what it's using
def checkout(processor: CreditCardProcessor):
    processor.process_credit_card(...)  # ✓ Guaranteed to work
```

RESULT: Focused interfaces, clients only depend on what they use ✓
```

### Dependency Inversion Principle (D)

```
PROBLEM: High-level code depends on low-level implementations

Bad Design (Violates DIP):
├─ High-level: OrderService (business logic)
├─ Low-level: MysqlDatabase (specific implementation)
│
└─ Dependency: OrderService → MysqlDatabase (direct dependency)

```python
class OrderService:
    def __init__(self):
        self.db = MysqlDatabase()  # Direct dependency on MySQL!
    
    def create_order(self, order_data):
        self.db.insert("orders", order_data)
```

Problem:
├─ OrderService tightly coupled to MySQL
├─ To switch to PostgreSQL, must rewrite OrderService
├─ Hard to test (can't mock database)
└─ Violates DIP: High-level depends on low-level

Good Design (Follows DIP):
├─ High-level: OrderService (business logic)
├─ Abstraction: Database interface
└─ Low-level: MysqlDatabase, PostgresDatabase (implementations)

```python
from abc import ABC, abstractmethod

# Abstraction (not specific to MySQL or Postgres)
class Database(ABC):
    @abstractmethod
    def insert(self, table, data):
        pass

# Low-level implementations
class MysqlDatabase(Database):
    def insert(self, table, data):
        # MySQL implementation
        pass

class PostgresDatabase(Database):
    def insert(self, table, data):
        # Postgres implementation
        pass

# High-level business logic
class OrderService:
    def __init__(self, db: Database):  # Dependency injection
        self.db = db  # Depends on abstraction, not implementation!
    
    def create_order(self, order_data):
        self.db.insert("orders", order_data)
```

Usage:
```python
# Can use MySQL
mysql_db = MysqlDatabase()
service = OrderService(mysql_db)
service.create_order(data)

# Can use Postgres (no change to OrderService!)
postgres_db = PostgresDatabase()
service = OrderService(postgres_db)
service.create_order(data)

# Can use Mock for testing
class MockDatabase(Database):
    def insert(self, table, data):
        return {"status": "ok"}

mock_db = MockDatabase()
service = OrderService(mock_db)
result = service.create_order(data)  # Testable!
```

BENEFIT:
├─ High-level code independent of low-level implementations
├─ Can swap implementations (MySQL → Postgres) without changing service
├─ Easy to test (inject mock database)
├─ More flexible architecture
└─ Result: Decoupled, testable, flexible code ✓
```

---

## Real Example 2: DRY (Don't Repeat Yourself) – Project 4

```
PROBLEM: Duplicate validation logic

Bad (Violates DRY):
├─ Function: validate_email_signup(email)
│  ├─ Check: email not empty
│  ├─ Check: email contains @
│  ├─ Check: email not already registered
│  └─ Return: is_valid
│
├─ Function: validate_email_password_reset(email)
│  ├─ Check: email not empty
│  ├─ Check: email contains @
│  ├─ Check: email already registered (opposite!)
│  └─ Return: is_valid
│
└─ Problem: First 2 checks duplicated

Code:
```python
def validate_email_signup(email):
    if not email or "@" not in email:
        return False
    if user_exists(email):
        return False
    return True

def validate_email_password_reset(email):
    if not email or "@" not in email:  # DUPLICATE!
        return False
    if not user_exists(email):
        return False
    return True
```

Good (Follows DRY):
├─ Extract common validation into reusable function
│  └─ validate_email_format(email)
│
├─ Function: validate_email_signup(email)
│  ├─ Call: validate_email_format(email)
│  ├─ Check: email not already registered
│  └─ Return: is_valid
│
└─ Function: validate_email_password_reset(email)
   ├─ Call: validate_email_format(email)
   ├─ Check: email already registered
   └─ Return: is_valid

Code:
```python
def validate_email_format(email):
    """Extract common logic"""
    if not email or "@" not in email:
        return False
    return True

def validate_email_signup(email):
    if not validate_email_format(email):
        return False
    if user_exists(email):
        return False
    return True

def validate_email_password_reset(email):
    if not validate_email_format(email):
        return False
    if not user_exists(email):
        return False
    return True
```

BENEFIT:
├─ Single source of truth (email format validation in one place)
├─ Change once, applies everywhere
├─ No duplicated logic
└─ Result: More maintainable ✓

KEY: Don't over-DRY too early
├─ Wait for pattern to emerge (2-3 instances)
├─ Don't extract every 2-line function
├─ Trade-off: Avoid premature abstraction
```

---

## Real Example 3: KISS (Keep It Simple, Stupid) – Project 2

```
PROBLEM: Over-engineered solution

Bad Design (Over-complicated):
```python
class DataValidationEngine:
    """Over-engineered validation with unnecessary abstraction layers"""
    
    def __init__(self):
        self.validators = {}
        self.rules = {}
    
    def register_validator(self, name, validator_func):
        self.validators[name] = validator_func
    
    def register_rule(self, entity, rule_name, conditions):
        if entity not in self.rules:
            self.rules[entity] = {}
        self.rules[entity][rule_name] = conditions
    
    def apply_validators(self, data, validator_names):
        results = []
        for name in validator_names:
            if name in self.validators:
                results.append(self.validators[name](data))
        return all(results)
    
    def validate(self, entity_type, data):
        if entity_type not in self.rules:
            raise ValueError(f"No rules for {entity_type}")
        
        for rule_name, conditions in self.rules[entity_type].items():
            if not self._evaluate_conditions(data, conditions):
                return False
        return True
    
    def _evaluate_conditions(self, data, conditions):
        # Complex recursive evaluation
        pass

# Usage is complex:
engine = DataValidationEngine()
engine.register_validator("non_empty", lambda x: x != "")
engine.register_validator("has_at", lambda x: "@" in x)
engine.register_rule("user_email", "format", {...})
engine.validate("user_email", email)
```

Good Design (Simple):
```python
def validate_email(email):
    """Simple, direct validation"""
    if not email:
        return False
    if "@" not in email:
        return False
    return True

# Usage is simple:
if validate_email(email):
    create_account(email)
```

PRINCIPLE: Simple > Complex
├─ Read, understand, debug the simple version
├─ Over-engineering adds cognitive load
├─ Only add complexity when needed
└─ Result: More maintainable ✓

Trade-off: Simple ≠ Naive
├─ Simple: Clear logic, obvious behavior
├─ Naive: Ignores real requirements (SQL injection, etc.)
└─ Find balance: Simple but correct
```

---

## Real Example 4: YAGNI (You Aren't Gonna Need It) – Project 5

```
PROBLEM: Building features that aren't needed yet

Bad Design (Over-built):
```python
class NotificationSystem:
    """Built to support email, SMS, push, Slack, Teams, Discord, Telegram, etc."""
    
    def __init__(self):
        self.providers = {
            "email": EmailProvider(),
            "sms": SmsProvider(),
            "push": PushProvider(),
            "slack": SlackProvider(),
            "teams": TeamsProvider(),
            "discord": DiscordProvider(),
            "telegram": TelegramProvider(),
            "fax": FaxProvider(),  # NOBODY ASKED FOR FAX!
        }
    
    def send(self, provider_name, message):
        # Overly complex routing logic
        pass
```

Problem:
├─ Built many features nobody requested
├─ Added 40% more code than needed
├─ Increased maintenance burden
└─ No customers using fax notifications!

Good Design (Build what's needed):
```python
class NotificationSystem:
    """Support email only (what we actually need)"""
    
    def __init__(self):
        self.email_provider = EmailProvider()
    
    def send_email(self, email, message):
        self.email_provider.send(email, message)
```

Future needs (as they emerge):
├─ Week 2: "Customers want SMS" → Add SMS
├─ Week 4: "Customers want Slack" → Add Slack
├─ Never: "Customers want fax" → Still not supported
└─ Result: Only built what's actually needed ✓

PRINCIPLE: YAGNI
├─ Build for current requirements
├─ Refactor when requirements change (not before)
├─ Code is easier to change than predict
└─ Don't build for imaginary future features
```

---

## Real Example 5: Testing Principles (Test Pyramid) – Project 6

```
TEST DISTRIBUTION:

Bad (Inverted pyramid):
├─ Manual tests: 40% (slow, unreliable, hard to scale)
├─ System tests: 35% (slow, fragile)
├─ Integration tests: 20% (medium speed)
└─ Unit tests: 5% (WRONG - should be most!)

Problem:
├─ Slow feedback (most tests take minutes)
├─ Brittle (system tests break easily)
├─ Hard to debug (which component failed?)
└─ Cost: 20 minutes to run suite

Good (Test Pyramid - 70/15/10/5):
├─ Unit tests: 70% (fast: <1s total)
│  ├─ Password validation
│  ├─ Email format check
│  ├─ Authorization logic
│  └─ All fast, isolated, focused
│
├─ Integration tests: 15% (medium: 10s)
│  ├─ Database + Service interaction
│  ├─ API + Database integration
│  └─ Test component boundaries
│
├─ System tests: 10% (slow: 30s)
│  ├─ Full end-to-end workflow
│  ├─ User registration → Login → Access
│  └─ Real environment
│
└─ Manual/Exploratory: 5% (intentional)
   ├─ Edge cases
   ├─ UX quality
   └─ Ad-hoc testing

BENEFIT:
├─ Fast feedback (70% of tests run in <1 sec)
├─ Easy to debug (unit tests isolate failures)
├─ Reliable (unit tests don't flake)
├─ Scalable (can run 1000 unit tests easily)
└─ Result: 20 minutes → 1 minute test suite ✓

REAL EXAMPLE:

Unit test (fast):
```python
def test_password_validation():
    assert validate_password("Pass123!") == True      # Valid
    assert validate_password("pass") == False          # Too short
    assert validate_password("PASSWORD123!") == True  # Valid
    assert validate_password("Pass123") == False       # No special char
    # Fast: <1ms
```

Integration test (medium):
```python
def test_user_registration_flow():
    # Create database (real)
    user_id = register_user("test@example.com", "Pass123!")
    
    # Verify database has user
    user = db.get_user(user_id)
    assert user.email == "test@example.com"
    
    # Verify password hashed
    assert user.password_hash != "Pass123!"
    # Medium speed: ~100ms
```

System test (slow):
```python
def test_full_signup_to_login_flow():
    # Real browser
    browser.get("https://example.com/signup")
    
    # Fill form
    browser.find_element("email_input").send_keys("test@example.com")
    browser.find_element("password_input").send_keys("Pass123!")
    browser.find_element("signup_button").click()
    
    # Verify redirected to login
    assert "login" in browser.current_url
    
    # Verify can login
    browser.find_element("email_input").send_keys("test@example.com")
    browser.find_element("password_input").send_keys("Pass123!")
    browser.find_element("login_button").click()
    
    # Verify redirected to dashboard
    assert "dashboard" in browser.current_url
    # Slow: ~10 seconds
```

TEST PYRAMID RESULT:
├─ Unit tests: 1000 tests × 1ms = 1 second ✓
├─ Integration: 50 tests × 100ms = 5 seconds ✓
├─ System: 10 tests × 1s = 10 seconds ✓
├─ Manual: ~5 minutes (ad-hoc)
└─ TOTAL: ~20 seconds automated (vs 1 hour manual) ✓
```

---

## Real Example 6: Maintainability – Project 4

```
PRINCIPLE: Code is read more than written

Key practices:

1. CLEAR NAMING:
   Bad:  d = t[0]  # What is d? What is t?
   Good: user_id = user_data[0]  # Clear intent
   
2. SHORT FUNCTIONS:
   Bad:  def process_order(order): # 200 lines, does everything
   Good: def validate_order(order)  # 10 lines, one job
         def calculate_tax(order)     # 8 lines, one job
         def charge_payment(order)    # 12 lines, one job
   
3. COHESION (Related code together):
   Bad:
   ```python
   class User:
       def get_name(self): ...        # User data
       def send_email(self): ...       # Email logic
       def calculate_invoice(self): ... # Billing logic
   ```
   
   Good:
   ```python
   class User:
       def get_name(self): ...         # User data only
   
   class EmailService:
       def send_email(self, user): ... # Email logic
   
   class BillingService:
       def calculate_invoice(self, user): ... # Billing logic
   ```
   
4. LOOSE COUPLING:
   Bad:  OrderService directly creates Database()
   Good: OrderService receives Database via constructor
   
5. DOCUMENTATION:
   Bad:  def calc(x, y): return x + y
   Good: def calculate_total_price(quantity, price_per_unit):
             """Calculate total price: quantity × price_per_unit"""
             return quantity * price_per_unit

RESULT: Next developer understands code immediately ✓
```

---

## Summary: K1 Competency Demonstrated

✅ **SOLID Principles:** S (Single Responsibility), O (Open/Closed), L (Liskov Substitution), I (Interface Segregation), D (Dependency Inversion)

✅ **DRY:** Extract common logic, single source of truth, avoid duplication

✅ **KISS:** Simple solutions preferred, readable code over clever code

✅ **YAGNI:** Build for current needs, refactor when requirements change

✅ **Testing Pyramid:** 70% unit, 15% integration, 10% system, 5% manual

✅ **Maintainability:** Clear naming, short functions, cohesion, loose coupling, documentation

**Real Evidence:**

| Principle | Project | Example | Result |
|-----------|---------|---------|--------|
| **SOLID** | Project 6 | Separated auth concerns into 5 classes | Easy to test, maintain, extend |
| **DRY** | Project 4 | Extracted email validation once | No duplication, change in one place |
| **KISS** | Project 2 | Simple ETL vs over-engineered engine | Maintainable, understandable |
| **YAGNI** | Project 5 | Built notification system for email only | Avoid unnecessary complexity |
| **Testing Pyramid** | Project 6 | 70% unit / 15% integration | 20 min test suite → 1 min suite |
| **Maintainability** | All | Clear names, short functions, cohesion | Easy for team to understand and modify |

**Business Impact:**
- Code quality: Reduced bugs through better design
- Maintainability: Team can understand and modify code quickly
- Testability: Easy to test, catch issues early
- Extensibility: Can add features without breaking existing code
- Time to market: Less time fixing legacy code, more time on features

