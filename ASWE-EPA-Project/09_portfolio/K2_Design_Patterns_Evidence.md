# K2: Uses and Adapts Appropriate Design Patterns

**Competency Definition:** Understand common design patterns (Creational, Structural, Behavioral). Apply patterns appropriately to solve design problems. Know when NOT to use patterns (avoid over-engineering). Adapt patterns to specific contexts. Recognize patterns in existing code.

---

## Design Patterns Framework

I build extensible systems by:

```
DESIGN PATTERNS CATEGORIES

1. CREATIONAL PATTERNS (Object Creation)
   ├─ Singleton: One instance globally (connection pool, logger)
   ├─ Factory: Create objects without specifying classes (NotificationFactory)
   ├─ Builder: Construct complex objects step-by-step (QueryBuilder)
   ├─ Prototype: Clone existing objects (template documents)
   └─ Abstract Factory: Create families of related objects (UI themes)

2. STRUCTURAL PATTERNS (Object Composition)
   ├─ Adapter: Convert interface to another (legacy system integration)
   ├─ Decorator: Add behavior dynamically (logging, caching wrapper)
   ├─ Facade: Simplified interface to complex subsystem (API wrapper)
   ├─ Proxy: Control access to another object (lazy loading, security)
   ├─ Bridge: Decouple abstraction from implementation
   ├─ Composite: Tree structure of objects (file system)
   └─ Flyweight: Share objects to save memory (caching)

3. BEHAVIORAL PATTERNS (Object Interaction)
   ├─ Strategy: Interchangeable algorithms (sorting, validation)
   ├─ Observer: Notify multiple objects of events (pub/sub)
   ├─ Command: Encapsulate request as object (undo/redo)
   ├─ State: Alter behavior when state changes (workflow)
   ├─ Iterator: Access elements sequentially (collections)
   ├─ Chain of Responsibility: Pass request along chain (middleware)
   ├─ Template Method: Define algorithm skeleton (ETL pipeline)
   ├─ Visitor: Add operations to objects (data transformations)
   └─ Mediator: Reduce coupling between objects (controller)

4. ARCHITECTURAL PATTERNS
   ├─ MVC: Model-View-Controller (web frameworks)
   ├─ Layered: Organize code into layers (3-tier)
   ├─ Microservices: Independent services (distributed)
   ├─ Event-Driven: React to events (async processing)
   └─ CQRS: Separate read/write (scalability)

KEY PRINCIPLE: Pattern ≠ Always Good
├─ Use only if it solves a real problem
├─ Don't force patterns into code
├─ Understand trade-offs (complexity vs benefit)
└─ Refactor to pattern when natural, not upfront
```

---

## Real Example 1: Factory Pattern – Project 5 (Notification System)

### Problem & Solution

```
PROBLEM: Multiple notification types (Email, SMS, Slack, Push)

Bad Design (No Pattern):
```python
def send_notification(notification_type, data):
    if notification_type == "email":
        email_service = EmailService()
        email_service.send(data)
    elif notification_type == "sms":
        sms_service = SmsService()
        sms_service.send(data)
    elif notification_type == "slack":
        slack_service = SlackService()
        slack_service.send(data)
    elif notification_type == "push":
        push_service = PushService()
        push_service.send(data)
    # Hard to add new types, scattered logic
```

Issue:
├─ Logic duplicated across codebase
├─ Hard to add new notification type
├─ No centralized creation logic
└─ Changes require modifying multiple places

Good Design (Factory Pattern):
```python
# Abstract interface
class NotificationService:
    def send(self, data):
        pass

# Concrete implementations
class EmailService(NotificationService):
    def send(self, data):
        # Email implementation
        pass

class SmsService(NotificationService):
    def send(self, data):
        # SMS implementation
        pass

class SlackService(NotificationService):
    def send(self, data):
        # Slack implementation
        pass

# Factory (centralized creation)
class NotificationServiceFactory:
    @staticmethod
    def create(notification_type):
        if notification_type == "email":
            return EmailService()
        elif notification_type == "sms":
            return SmsService()
        elif notification_type == "slack":
            return SlackService()
        else:
            raise ValueError(f"Unknown type: {notification_type}")

# Usage - clean and simple
def send_notification(notification_type, data):
    service = NotificationServiceFactory.create(notification_type)
    service.send(data)
```

Benefits:
├─ Creation logic centralized (one place to modify)
├─ Adding new type: Add class + one line in factory
├─ Caller doesn't know about concrete implementations
├─ Easy to test (inject mock factory)
└─ Result: More maintainable ✓

Real Implementation (Project 5):
```python
# Configuration-driven factory (even cleaner)
NOTIFICATION_SERVICES = {
    "email": EmailService,
    "sms": SmsService,
    "slack": SlackService,
    "push": PushService,
}

class NotificationServiceFactory:
    @staticmethod
    def create(notification_type):
        service_class = NOTIFICATION_SERVICES.get(notification_type)
        if not service_class:
            raise ValueError(f"Unknown notification type: {notification_type}")
        return service_class()

# Add new service without modifying factory
NOTIFICATION_SERVICES["teams"] = TeamsService  # That's it!
```

Trade-off:
├─ Benefit: Centralized, easy to extend
├─ Cost: Slightly more code (factory class)
├─ When to use: Multiple implementations of same interface
└─ When not to: Only one implementation (premature pattern)
```

---

## Real Example 2: Decorator Pattern – Project 4 (Security)

### Problem & Solution

```
PROBLEM: Add security, logging, caching without modifying original function

Bad Design (No Pattern):
```python
def get_user_data(user_id):
    # Check authorization
    if not current_user.can_view(user_id):
        raise PermissionDenied()
    
    # Log access
    logger.info(f"Accessing user {user_id}")
    
    # Check cache
    cache_key = f"user:{user_id}"
    if cache_key in cache:
        return cache[cache_key]
    
    # Get from database
    user = db.query(f"SELECT * FROM users WHERE id={user_id}")
    
    # Log result
    logger.info(f"Retrieved user {user_id}")
    
    # Cache result
    cache[cache_key] = user
    
    return user
```

Problems:
├─ Mixed concerns (auth, logging, caching, data retrieval)
├─ Hard to test (can't test without all dependencies)
├─ Hard to reuse (authorization logic duplicated elsewhere)
└─ Hard to modify (change logging format = edit multiple functions)

Good Design (Decorator Pattern):
```python
# Core function - just business logic
def get_user_data(user_id):
    return db.query(f"SELECT * FROM users WHERE id={user_id}")

# Decorator 1: Authorization
class AuthorizedDecorator:
    def __init__(self, func):
        self.func = func
    
    def __call__(self, user_id):
        if not current_user.can_view(user_id):
            raise PermissionDenied()
        return self.func(user_id)

# Decorator 2: Logging
class LoggingDecorator:
    def __init__(self, func):
        self.func = func
    
    def __call__(self, user_id):
        logger.info(f"Accessing user {user_id}")
        result = self.func(user_id)
        logger.info(f"Retrieved user {user_id}")
        return result

# Decorator 3: Caching
class CachingDecorator:
    def __init__(self, func):
        self.func = func
        self.cache = {}
    
    def __call__(self, user_id):
        cache_key = f"user:{user_id}"
        if cache_key not in self.cache:
            self.cache[cache_key] = self.func(user_id)
        return self.cache[cache_key]

# Compose decorators (stack behaviors)
decorated_get_user = AuthorizedDecorator(
    LoggingDecorator(
        CachingDecorator(
            get_user_data
        )
    )
)

# Usage
user = decorated_get_user(user_id)
```

Benefits:
├─ Separation of concerns (each decorator has one job)
├─ Reusable decorators (use logging on any function)
├─ Easy to test (test each decorator independently)
├─ Easy to modify (change caching = edit CachingDecorator only)
├─ Composable (can stack in any order)
└─ Result: More flexible, testable ✓

Python Syntax Sugar (using @decorator):
```python
@AuthorizedDecorator
@LoggingDecorator
@CachingDecorator
def get_user_data(user_id):
    return db.query(f"SELECT * FROM users WHERE id={user_id}")
```

Real Implementation (Project 4 - Authentication):
```python
# Rate limiting decorator
class RateLimitDecorator:
    def __init__(self, func, max_calls=5, time_window=60):
        self.func = func
        self.max_calls = max_calls
        self.time_window = time_window
        self.calls = defaultdict(list)
    
    def __call__(self, *args, **kwargs):
        now = time.time()
        call_times = self.calls[args[0]]  # Key by first arg (e.g., user_id)
        
        # Remove old calls outside time window
        call_times = [t for t in call_times if now - t < self.time_window]
        
        if len(call_times) >= self.max_calls:
            raise RateLimitExceeded(f"Max {self.max_calls} calls per {self.time_window}s")
        
        call_times.append(now)
        self.calls[args[0]] = call_times
        
        return self.func(*args, **kwargs)

@RateLimitDecorator(max_calls=5, time_window=60)
def login(email, password):
    # Prevent brute force (max 5 attempts per minute)
    return authenticate(email, password)
```

Trade-off:
├─ Benefit: Add behaviors without modifying original code
├─ Cost: Extra indirection (harder to trace execution)
├─ When to use: Add cross-cutting concerns (auth, logging, caching)
└─ When not to: Single behavior (overengineering)
```

---

## Real Example 3: Strategy Pattern – Project 2 (Data Validation)

### Problem & Solution

```
PROBLEM: Multiple validation strategies (exact match, fuzzy match, regex, etc.)

Bad Design (No Pattern):
```python
def validate_data(data, validation_type):
    if validation_type == "exact":
        if data == "expected_value":
            return True
    elif validation_type == "fuzzy":
        if fuzzy_match(data, "expected_value") > 0.95:
            return True
    elif validation_type == "regex":
        if re.match(r"^[a-z]+$", data):
            return True
    return False

# Usage scattered throughout codebase
```

Issues:
├─ Hard to add new validation strategy
├─ Testing each strategy mixed with if/elif logic
├─ Reusing strategy requires copy-paste
└─ Hard to understand intent (what strategy does what?)

Good Design (Strategy Pattern):
```python
# Strategy interface
class ValidationStrategy:
    def validate(self, data):
        pass

# Concrete strategies
class ExactMatchStrategy(ValidationStrategy):
    def __init__(self, expected):
        self.expected = expected
    
    def validate(self, data):
        return data == self.expected

class FuzzyMatchStrategy(ValidationStrategy):
    def __init__(self, expected, threshold=0.95):
        self.expected = expected
        self.threshold = threshold
    
    def validate(self, data):
        return fuzzy_match(data, self.expected) > self.threshold

class RegexStrategy(ValidationStrategy):
    def __init__(self, pattern):
        self.pattern = pattern
    
    def validate(self, data):
        return bool(re.match(self.pattern, data))

# Context (uses strategy)
class Validator:
    def __init__(self, strategy: ValidationStrategy):
        self.strategy = strategy
    
    def validate(self, data):
        return self.strategy.validate(data)

# Usage
exact_validator = Validator(ExactMatchStrategy("admin"))
result = exact_validator.validate("admin")  # True

fuzzy_validator = Validator(FuzzyMatchStrategy("John"))
result = fuzzy_validator.validate("Jon")  # True (fuzzy match)

email_validator = Validator(RegexStrategy(r"^[\w\.-]+@[\w\.-]+\.\w+$"))
result = email_validator.validate("test@example.com")  # True
```

Benefits:
├─ Each strategy isolated (easy to test)
├─ Adding new strategy: Create class, no existing code changes
├─ Runtime selection (choose strategy based on data/config)
├─ Clear intent (each strategy has descriptive name)
├─ Reusable (use same strategy in multiple contexts)
└─ Result: More flexible, testable ✓

Real Implementation (Project 2 - Data Deduplication):
```python
# K12 data platform uses multiple strategies for deduplication

class DuplicateDetectionStrategy:
    def find_duplicates(self, records):
        pass

class ExactDuplicateStrategy(DuplicateDetectionStrategy):
    def find_duplicates(self, records):
        # Exact match on all fields
        seen = {}
        duplicates = []
        for record in records:
            key = tuple(record.values())
            if key in seen:
                duplicates.append((seen[key], record))
            else:
                seen[key] = record
        return duplicates

class FuzzyDuplicateStrategy(DuplicateDetectionStrategy):
    def find_duplicates(self, records):
        # Fuzzy match on company name (pg_trgm)
        duplicates = []
        for i, record1 in enumerate(records):
            for j, record2 in enumerate(records[i+1:], i+1):
                similarity = fuzzy_match(record1["company_name"], record2["company_name"])
                if similarity > 0.9:  # 90% match threshold
                    duplicates.append((record1, record2))
        return duplicates

class FieldBasedStrategy(DuplicateDetectionStrategy):
    def __init__(self, fields):
        self.fields = fields
    
    def find_duplicates(self, records):
        # Match on specific fields only
        seen = {}
        duplicates = []
        for record in records:
            key = tuple(record.get(f) for f in self.fields)
            if key in seen:
                duplicates.append((seen[key], record))
            else:
                seen[key] = record
        return duplicates

# Configure strategy based on data quality requirements
if data_quality_threshold > 0.98:
    strategy = ExactDuplicateStrategy()
elif data_quality_threshold > 0.90:
    strategy = FuzzyDuplicateStrategy()
else:
    strategy = FieldBasedStrategy(["company_name", "registration_number"])

duplicates = strategy.find_duplicates(records)
```

Trade-off:
├─ Benefit: Interchangeable algorithms, runtime selection
├─ Cost: More classes (one per strategy)
├─ When to use: Multiple algorithms for same problem
└─ When not to: Single algorithm (overengineering)
```

---

## Real Example 4: Observer Pattern – Project 6 (Event Handling)

### Problem & Solution

```
PROBLEM: Multiple components need to react to same event (e.g., user login)

Bad Design (No Pattern - Tight Coupling):
```python
def handle_user_login(user_id):
    # Log login
    logger.info(f"User {user_id} logged in")
    
    # Send welcome email
    email_service.send_welcome_email(user_id)
    
    # Update analytics
    analytics.track_login(user_id)
    
    # Notify support team (if admin)
    if user.is_admin:
        support_team.notify(f"Admin {user_id} logged in")
    
    # Update user last_login timestamp
    db.update_user_last_login(user_id)
```

Problems:
├─ All logic in one place (handle_user_login)
├─ Hard to add new observers (modify this function)
├─ Tight coupling (handle_user_login knows about all observers)
├─ Hard to test (can't test login without all side effects)
└─ Hard to reorder/disable observers

Good Design (Observer Pattern):
```python
# Event
class UserLoginEvent:
    def __init__(self, user_id):
        self.user_id = user_id

# Observer interface
class LoginObserver:
    def on_user_login(self, event):
        pass

# Concrete observers
class LoginLogger(LoginObserver):
    def on_user_login(self, event):
        logger.info(f"User {event.user_id} logged in")

class WelcomeEmailSender(LoginObserver):
    def on_user_login(self, event):
        email_service.send_welcome_email(event.user_id)

class AnalyticsTracker(LoginObserver):
    def on_user_login(self, event):
        analytics.track_login(event.user_id)

class AdminNotifier(LoginObserver):
    def on_user_login(self, event):
        user = db.get_user(event.user_id)
        if user.is_admin:
            support_team.notify(f"Admin {event.user_id} logged in")

class LastLoginUpdater(LoginObserver):
    def on_user_login(self, event):
        db.update_user_last_login(event.user_id)

# Subject (notifies observers)
class AuthenticationService:
    def __init__(self):
        self.observers = []
    
    def attach(self, observer: LoginObserver):
        self.observers.append(observer)
    
    def detach(self, observer: LoginObserver):
        self.observers.remove(observer)
    
    def login(self, email, password):
        user = self._authenticate(email, password)
        if user:
            event = UserLoginEvent(user.id)
            self._notify_observers(event)
        return user
    
    def _notify_observers(self, event):
        for observer in self.observers:
            observer.on_user_login(event)

# Setup
auth_service = AuthenticationService()
auth_service.attach(LoginLogger())
auth_service.attach(WelcomeEmailSender())
auth_service.attach(AnalyticsTracker())
auth_service.attach(AdminNotifier())
auth_service.attach(LastLoginUpdater())

# Usage - clean and simple
user = auth_service.login(email, password)
```

Benefits:
├─ Loose coupling (login doesn't know about observers)
├─ Easy to add observers (attach new observer, no code changes)
├─ Easy to disable observers (detach)
├─ Easy to test (can test login without side effects)
├─ Reorder/skip observers (simple list modification)
└─ Result: More extensible, testable ✓

Real Implementation (Project 6 - Query Events):
```python
# AI Knowledge Search publishes events when query received

class QueryEvent:
    def __init__(self, user_id, query, timestamp):
        self.user_id = user_id
        self.query = query
        self.timestamp = timestamp

class QueryObserver:
    def on_query_received(self, event):
        pass

class QueryLogger(QueryObserver):
    def on_query_received(self, event):
        logger.info(f"Query from {event.user_id}: {event.query}")

class MetricsCollector(QueryObserver):
    def on_query_received(self, event):
        metrics.increment("ai_queries_received")

class FraudDetector(QueryObserver):
    def on_query_received(self, event):
        if self._is_suspicious(event):
            alerts.notify("Suspicious query pattern detected")

class AuditLogger(QueryObserver):
    def on_query_received(self, event):
        audit_db.log_query(event.user_id, event.query, event.timestamp)

# Event publisher
class QueryService:
    def __init__(self):
        self.observers = []
    
    def subscribe(self, observer: QueryObserver):
        self.observers.append(observer)
    
    def handle_query(self, user_id, query):
        event = QueryEvent(user_id, query, time.time())
        for observer in self.observers:
            observer.on_query_received(event)
        
        # Process query
        return self._search(user_id, query)

query_service = QueryService()
query_service.subscribe(QueryLogger())
query_service.subscribe(MetricsCollector())
query_service.subscribe(FraudDetector())
query_service.subscribe(AuditLogger())
```

Trade-off:
├─ Benefit: Loose coupling, easy to add observers
├─ Cost: More classes, slightly harder to trace execution
├─ When to use: Multiple components react to same event
└─ When not to: Single handler (use direct call instead)
```

---

## Real Example 5: Singleton Pattern – Project 1

### Problem & Solution

```
PROBLEM: Need exactly one instance of resource-heavy object (database connection pool)

Bad Design (No Pattern):
```python
def get_database():
    # Creates new connection pool every time!
    pool = ConnectionPool(host="localhost", port=5432, size=10)
    return pool

# Caller creates multiple pools
db1 = get_database()
db2 = get_database()
# db1 and db2 are different instances! Wasteful!
```

Issues:
├─ Multiple instances created (wasteful)
├─ Each instance has separate connection pool
├─ Difficult to maintain consistency
└─ Resource leaks (unused pools not cleaned)

Good Design (Singleton Pattern):
```python
class ConnectionPool:
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls, *args, **kwargs):
        # Thread-safe singleton
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance
    
    def __init__(self, host, port, size):
        if self._initialized:
            return
        self.host = host
        self.port = port
        self.size = size
        self.connections = []
        self._create_connections()
        self._initialized = True
    
    def _create_connections(self):
        for _ in range(self.size):
            conn = psycopg2.connect(host=self.host, port=self.port)
            self.connections.append(conn)
    
    def get_connection(self):
        return self.connections.pop() if self.connections else None
    
    def return_connection(self, conn):
        self.connections.append(conn)

# Usage
pool1 = ConnectionPool(host="localhost", port=5432, size=10)
pool2 = ConnectionPool(host="localhost", port=5432, size=10)
assert pool1 is pool2  # Same instance! ✓

conn1 = pool1.get_connection()
conn2 = pool2.get_connection()  # pool2 shares connections from pool1
```

Benefits:
├─ Single instance (resource efficient)
├─ Thread-safe (double-checked locking)
├─ Consistent state (all callers use same pool)
├─ Easy to access globally
└─ Result: Resource efficient ✓

Real Implementation (Project 1 - Logger):
```python
# Single logger instance across entire application

class Logger:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._setup_logging()
        return cls._instance
    
    def _setup_logging(self):
        self.logger = logging.getLogger("app")
        handler = logging.FileHandler("app.log")
        formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)
    
    def info(self, message):
        self.logger.info(message)
    
    def error(self, message):
        self.logger.error(message)

# Usage everywhere
logger = Logger()
logger.info("Starting application")
logger.error("Connection failed")
# All logs go to same file, same logger instance
```

Trade-off:
├─ Benefit: Single instance, resource efficient
├─ Cost: Global state (can be hard to test), potential issues with concurrency
├─ When to use: One instance needed (connection pools, loggers, config)
└─ When not to: Multiple instances needed (overuse is antipattern)

Important Note: Use sparingly
├─ Singleton can hide dependencies (hard to test)
├─ Dependency injection often better than singleton
├─ Consider: Do I really need exactly one instance?
```

---

## Real Example 6: Template Method Pattern – Project 2 (ETL Pipeline)

### Problem & Solution

```
PROBLEM: Multiple ETL processes with same overall structure but different implementations

Structure:
1. Extract data from source
2. Validate data
3. Transform data
4. Load into database
5. Log results

Bad Design (Code Duplication):
```python
def etl_from_csv():
    # Extract
    data = read_csv("file.csv")
    
    # Validate
    if validate_csv_data(data):
        # Transform
        data = transform_csv_data(data)
        
        # Load
        db.insert(data)
        
        # Log
        logger.info("CSV ETL completed")

def etl_from_api():
    # Extract
    data = fetch_from_api("https://api.example.com")
    
    # Validate
    if validate_api_data(data):
        # Transform
        data = transform_api_data(data)
        
        # Load
        db.insert(data)
        
        # Log
        logger.info("API ETL completed")
```

Issues:
├─ Structure duplicated (extract→validate→transform→load)
├─ Hard to add new ETL source (copy entire function)
├─ Hard to modify shared steps (update both functions)
└─ Error-prone (easy to miss something)

Good Design (Template Method Pattern):
```python
# Abstract template
class ETLPipeline:
    def run(self):
        """Template method - defines algorithm structure"""
        data = self.extract()
        if self.validate(data):
            data = self.transform(data)
            self.load(data)
            self.log_success()
    
    def extract(self):
        """Override in subclass"""
        raise NotImplementedError
    
    def validate(self, data):
        """Override in subclass"""
        raise NotImplementedError
    
    def transform(self, data):
        """Override in subclass"""
        raise NotImplementedError
    
    def load(self, data):
        """Default implementation, can override"""
        db.insert(data)
    
    def log_success(self):
        """Default implementation, can override"""
        logger.info(f"{self.__class__.__name__} completed")

# Concrete implementations
class CsvETL(ETLPipeline):
    def extract(self):
        return read_csv("file.csv")
    
    def validate(self, data):
        return validate_csv_data(data)
    
    def transform(self, data):
        return transform_csv_data(data)

class ApiETL(ETLPipeline):
    def extract(self):
        return fetch_from_api("https://api.example.com")
    
    def validate(self, data):
        return validate_api_data(data)
    
    def transform(self, data):
        return transform_api_data(data)

class DatabaseETL(ETLPipeline):
    def extract(self):
        return read_from_database("SELECT * FROM staging")
    
    def validate(self, data):
        return validate_database_data(data)
    
    def transform(self, data):
        return transform_database_data(data)

# Usage
csv_etl = CsvETL()
csv_etl.run()

api_etl = ApiETL()
api_etl.run()

db_etl = DatabaseETL()
db_etl.run()
```

Benefits:
├─ Algorithm structure in one place (template)
├─ Specific implementations in separate classes
├─ Easy to add new ETL source (extend ETLPipeline, override methods)
├─ Easy to modify shared steps (change template)
├─ Ensures consistency (all ETL processes follow same structure)
└─ Result: DRY, maintainable ✓

Real Implementation (Project 2 - K12 Data Pipeline):
```python
# Multiple data sources with same pipeline structure

class DataPipeline:
    def run(self):
        raw_data = self.extract()
        cleaned_data = self.clean(raw_data)
        validated_data = self.validate(cleaned_data)
        deduplicated_data = self.deduplicate(validated_data)
        transformed_data = self.transform(deduplicated_data)
        self.load(transformed_data)
        self.report()
    
    def clean(self, data):
        """Default: remove nulls, trim strings"""
        return [self._clean_record(r) for r in data]
    
    def validate(self, data):
        """Default: run validation rules"""
        return [r for r in data if self._validate_record(r)]
    
    def deduplicate(self, data):
        """Default: exact match deduplication"""
        seen = set()
        result = []
        for record in data:
            key = tuple(record.values())
            if key not in seen:
                seen.add(key)
                result.append(record)
        return result
    
    def load(self, data):
        """Default: insert to database"""
        db.bulk_insert(data)
    
    def report(self):
        """Default: log statistics"""
        logger.info(f"Pipeline completed: {len(data)} records loaded")

class CompaniesHousePipeline(DataPipeline):
    def extract(self):
        return read_csv("companies_house.csv")
    
    def transform(self, data):
        # Company-specific transformations
        return [self._transform_company(r) for r in data]

class BankingDataPipeline(DataPipeline):
    def extract(self):
        return fetch_from_api("https://api.banking.example.com/accounts")
    
    def deduplicate(self, data):
        # Banking uses fuzzy match (account numbers)
        return self._fuzzy_deduplicate(data, ["account_number"])
    
    def transform(self, data):
        # Bank-specific transformations
        return [self._transform_account(r) for r in data]

# Run both
companies = CompaniesHousePipeline()
companies.run()

banking = BankingDataPipeline()
banking.run()
```

Trade-off:
├─ Benefit: DRY algorithm structure, easy to extend
├─ Cost: More classes, inheritance hierarchy
├─ When to use: Multiple variations of same algorithm
└─ When not to: Single algorithm (overengineering)
```

---

## Summary: K2 Competency Demonstrated

✅ **Factory Pattern:** Centralized object creation, easy to extend with new types

✅ **Decorator Pattern:** Add behaviors dynamically, composable, reusable

✅ **Strategy Pattern:** Interchangeable algorithms, runtime selection

✅ **Observer Pattern:** Loose coupling, easy to add/remove observers

✅ **Singleton Pattern:** Single instance, resource efficient (use sparingly)

✅ **Template Method:** DRY algorithm structure, easy to extend

**Real Evidence:**

| Pattern | Project | Example | Result |
|---------|---------|---------|--------|
| **Factory** | Project 5 | NotificationServiceFactory | Centralized, easy to add new types |
| **Decorator** | Project 4 | Auth + Logging + Caching decorators | Reusable, composable, testable |
| **Strategy** | Project 2 | Exact/Fuzzy/Regex validation | Interchangeable, runtime selection |
| **Observer** | Project 6 | Login event observers | Loose coupling, extensible |
| **Singleton** | Project 1 | Connection pool, logger | Single instance, resource efficient |
| **Template Method** | Project 2 | ETL pipeline structure | DRY, consistent, extensible |

**Business Impact:**
- Code maintainability: Easier to understand and modify
- Extensibility: Add features without modifying existing code
- Reusability: Patterns help identify reusable components
- Team communication: Developers understand intent via pattern names
- Quality: Well-established patterns reduce bugs

**Key Principle:** Pattern ≠ Always Good
- Use only if it solves a real problem
- Don't force patterns upfront (refactor to pattern when natural)
- Understand trade-offs (complexity vs benefit)
- Avoid over-engineering (premature patterns waste time)

