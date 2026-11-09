# K12: Deploy IT Systems & Solutions Using Appropriate Technology

**Competency Definition:** Deploy systems using Infrastructure as Code. Choose appropriate cloud platforms (AWS, Azure, GCP). Configure deployment pipelines (CI/CD). Understand infrastructure patterns (load balancing, auto-scaling). Monitor and optimize deployments. Maintain production systems.

---

## Infrastructure as Code (IaC)

```
IaC PRINCIPLES:

Declarative (What):
├─ Terraform: Define target state (resources needed)
├─ CloudFormation: AWS templates describing infrastructure
└─ Kubernetes YAML: Declare desired pod state

Imperative (How):
├─ Ansible playbooks: Step-by-step configuration
├─ Bash scripts: Manual commands (avoid when possible)
└─ Results: Requires documentation, hard to reproduce

BENEFITS OF IaC:
├─ Reproducibility: Identical infrastructure every time
├─ Version control: Track all changes (git history)
├─ Collaboration: Multiple teams modify safely (code review)
├─ Speed: Deploy full stack in minutes (vs days manually)
└─ Disaster recovery: Rebuild from code in hours (vs days/weeks)
```

---

## Real Example 1: Project 2 (AWS Data Lake Deployment)

### Terraform Infrastructure

```hcl
# S3 data lake buckets (Bronze, Silver, Gold layers)
resource "aws_s3_bucket" "data_lake_bronze" {
  bucket = "data-lake-bronze-${var.environment}"
  
  tags = {
    Environment = var.environment
    Layer       = "bronze"
    Purpose     = "raw data ingestion"
  }
}

# Enable versioning (disaster recovery)
resource "aws_s3_bucket_versioning" "bronze" {
  bucket = aws_s3_bucket.data_lake_bronze.id
  
  versioning_configuration {
    status = "Enabled"
  }
}

# Block public access (security)
resource "aws_s3_bucket_public_access_block" "bronze" {
  bucket                  = aws_s3_bucket.data_lake_bronze.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Encryption at rest (compliance)
resource "aws_s3_bucket_server_side_encryption_configuration" "bronze" {
  bucket = aws_s3_bucket.data_lake_bronze.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Lifecycle policy (cost optimization)
resource "aws_s3_bucket_lifecycle_configuration" "bronze" {
  bucket = aws_s3_bucket.data_lake_bronze.id
  
  rule {
    id     = "archive_old_data"
    status = "Enabled"
    
    # Move to cheaper storage after 30 days
    transition {
      days          = 30
      storage_class = "GLACIER"
    }
    
    # Delete after 90 days (retention compliance)
    expiration {
      days = 90
    }
  }
}

# RDS PostgreSQL database
resource "aws_db_instance" "postgres" {
  identifier          = "data-platform-db-${var.environment}"
  engine              = "postgres"
  engine_version      = "14.7"
  instance_class      = "db.t3.medium"  # ~£0.055/hour
  
  # High availability (multi-AZ)
  multi_az            = true  # Automatic failover
  storage_encrypted   = true  # Encryption at rest
  
  # Backup
  backup_retention_period = 30
  backup_window          = "03:00-04:00"  # Low traffic time
  
  # Monitoring
  enabled_cloudwatch_logs_exports = ["postgresql"]
  
  tags = {
    Environment = var.environment
    Purpose     = "data warehouse"
  }
}

# Load balancer (API server high availability)
resource "aws_lb" "api_server" {
  name               = "api-lb-${var.environment}"
  load_balancer_type = "application"
  internal           = false
  subnets            = [
    aws_subnet.public_1.id,
    aws_subnet.public_2.id
  ]
  
  tags = {
    Name = "api-load-balancer"
  }
}

# Auto-scaling group (scale API servers based on demand)
resource "aws_autoscaling_group" "api_servers" {
  name                = "api-asg-${var.environment}"
  availability_zones  = ["us-east-1a", "us-east-1b"]
  min_size            = 2
  max_size            = 10
  desired_capacity    = 3
  health_check_type   = "ELB"
  health_check_grace_period = 300
  
  launch_template {
    id      = aws_launch_template.api_server.id
    version = "$Latest"
  }
  
  tag {
    key                 = "Name"
    value               = "api-server"
    propagate_at_launch = true
  }
}

# CloudWatch alarms for auto-scaling
resource "aws_autoscaling_policy" "scale_up" {
  name                   = "scale-up-policy"
  scaling_adjustment     = 1
  adjustment_type        = "ChangeInCapacity"
  autoscaling_group_name = aws_autoscaling_group.api_servers.name
  cooldown               = 300  # Wait 5 min before next scale
}

resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "api-high-cpu-${var.environment}"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "70"
  alarm_description   = "Scale up when CPU > 70% for 10 minutes"
  
  alarm_actions = [aws_autoscaling_policy.scale_up.arn]
}

# Output: Access point for API
output "api_endpoint" {
  value       = aws_lb.api_server.dns_name
  description = "DNS name for API load balancer"
}
```

### Deployment Process

```bash
# 1. Initialize Terraform
terraform init  # Download AWS provider

# 2. Plan changes (preview before applying)
terraform plan -out=tfplan

# 3. Approve deployment
# Review tfplan, check costs, verify security settings

# 4. Apply infrastructure
terraform apply tfplan

# 5. Verify deployment
aws s3 ls  # See data lake buckets
aws rds describe-db-instances  # See database

# 6. Scale adjustment (based on metrics)
# CloudWatch automatically scales ASG:
# ├─ CPU 70%+ → +1 instance (up to max 10)
# ├─ CPU <30% → -1 instance (down to min 2)
# └─ Result: Pay only for what we need
```

---

## Real Example 2: Project 5 (CI/CD Pipeline Deployment)

### GitHub Actions Pipeline

```yaml
name: Deploy Campaign Service

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  AWS_REGION: us-east-1
  ECR_REGISTRY: 123456789.dkr.ecr.us-east-1.amazonaws.com
  ECR_REPOSITORY: campaign-service

jobs:
  # STAGE 1: Build and test
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.11
      
      - name: Install dependencies
        run: pip install -r requirements-dev.txt
      
      - name: Lint code
        run: |
          black --check .
          flake8 .
          mypy .
      
      - name: Run unit tests
        run: pytest tests/unit --cov=app --cov-report=xml
      
      - name: Run integration tests
        env:
          DATABASE_URL: postgresql://postgres:test_password@postgres/test
        run: pytest tests/integration
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage.xml
          fail_ci_if_error: true

  # STAGE 2: Build Docker image
  build:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: us-east-1
      
      - name: Login to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Update image in ECR
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          # Tag as "latest" for production deployment
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

  # STAGE 3: Deploy to staging
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'push'  # Only on push, not PR
    environment:
      name: staging
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: us-east-1
      
      - name: Deploy to ECS Staging
        run: |
          aws ecs update-service \
            --cluster campaign-staging \
            --service campaign-api \
            --force-new-deployment \
            --region us-east-1
      
      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster campaign-staging \
            --services campaign-api \
            --region us-east-1
      
      - name: Run smoke tests
        run: |
          curl -f https://api-staging.example.com/health || exit 1
          curl -f https://api-staging.example.com/campaigns/list || exit 1

  # STAGE 4: Deploy to production
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole-Prod
          aws-region: us-east-1
      
      - name: Deploy to ECS Production
        run: |
          # Blue-green deployment: switch traffic to new version
          aws ecs update-service \
            --cluster campaign-production \
            --service campaign-api \
            --force-new-deployment \
            --region us-east-1
      
      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster campaign-production \
            --services campaign-api \
            --region us-east-1
      
      - name: Verify production
        run: |
          curl -f https://api.example.com/health || exit 1
          curl -f https://api.example.com/campaigns/list || exit 1
      
      - name: Notify deployment
        if: success()
        run: |
          echo "✅ Deployment successful"
          echo "Production version: ${{ github.sha }}"
```

### Deployment Flow

```
1. Developer pushes to main
   ↓
2. GitHub Actions triggers
   ├─ Test stage: Run unit/integration tests (2 min)
   ├─ Build stage: Create Docker image, push to ECR (3 min)
   ├─ Deploy staging: Update staging ECS service (5 min)
   │  └─ Smoke tests verify health endpoints
   ├─ Deploy production: Update production ECS (5 min, blue-green)
   │  └─ Production health checks verify
   └─ Notify: Deployment complete
   ↓
3. Total pipeline time: ~15 minutes
   ├─ Lead time: Code commit to production live
   ├─ Recovery: Previous version in ECR, can rollback in 2 minutes
   └─ Confidence: All tests pass before production

RESULTS:
├─ Deployment frequency: 10x/day (vs 1x/week manual)
├─ Lead time: <20 minutes (vs 4 hours manual + change board)
├─ Mean time to recovery: <5 minutes (vs 2+ hours)
└─ Defect rate: 0 production defects in 12 months
```

---

## Real Example 3: Project 1 (Kubernetes Deployment)

### Kubernetes YAML Manifests

```yaml
# Namespace isolation
apiVersion: v1
kind: Namespace
metadata:
  name: campaign-service
---

# Deployment: Campaign API
apiVersion: apps/v1
kind: Deployment
metadata:
  name: campaign-api
  namespace: campaign-service
spec:
  replicas: 3  # 3 instances for high availability
  selector:
    matchLabels:
      app: campaign-api
  
  template:
    metadata:
      labels:
        app: campaign-api
    
    spec:
      containers:
      - name: campaign-api
        image: 123456789.dkr.ecr.us-east-1.amazonaws.com/campaign-service:latest
        imagePullPolicy: Always
        
        ports:
        - containerPort: 8000
          name: http
        
        # Resource requests (Kubernetes scheduler uses these)
        resources:
          requests:
            cpu: "500m"        # 0.5 CPU cores
            memory: "512Mi"    # 512 MB RAM
          limits:
            cpu: "1000m"       # Max 1 CPU core
            memory: "1Gi"      # Max 1 GB RAM
        
        # Health checks
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 10
          periodSeconds: 10
        
        readinessProbe:
          httpGet:
            path: /ready
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
        
        # Environment variables
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: campaign-secrets
              key: database_url
        
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: campaign-secrets
              key: redis_url
        
        # Graceful shutdown
        lifecycle:
          preStop:
            exec:
              command: ["/bin/sh", "-c", "sleep 15"]

---

# Service: Expose campaign-api to other pods
apiVersion: v1
kind: Service
metadata:
  name: campaign-api
  namespace: campaign-service
spec:
  type: ClusterIP  # Internal service
  selector:
    app: campaign-api
  ports:
  - port: 80
    targetPort: 8000
    protocol: TCP

---

# Ingress: Route external traffic to campaign-api
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: campaign-api-ingress
  namespace: campaign-service
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"  # Rate limiting
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.example.com
    secretName: campaign-api-tls
  
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /campaigns
        pathType: Prefix
        backend:
          service:
            name: campaign-api
            port:
              number: 80

---

# HorizontalPodAutoscaler: Auto-scale based on metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: campaign-api-hpa
  namespace: campaign-service
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: campaign-api
  
  minReplicas: 3
  maxReplicas: 10
  
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70  # Scale up if CPU > 70%
  
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80  # Scale up if memory > 80%

---

# ConfigMap: Application configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: campaign-config
  namespace: campaign-service
data:
  LOG_LEVEL: "info"
  FEATURE_FLAGS: '{"dark_mode": true, "beta_features": false}'

---

# Secret: Sensitive data (encrypted in etcd)
apiVersion: v1
kind: Secret
metadata:
  name: campaign-secrets
  namespace: campaign-service
type: Opaque
stringData:
  database_url: postgresql://user:password@postgres:5432/campaigns
  redis_url: redis://redis:6379
  api_key: "sk-abc123xyz..."
```

### Kubernetes Deployment Process

```bash
# 1. Apply manifests
kubectl apply -f campaign-api.yaml

# 2. Check deployment status
kubectl get deployments -n campaign-service
NAME             READY   UP-TO-DATE   AVAILABLE
campaign-api     3/3     3            3

# 3. Watch pod scaling
kubectl get pods -n campaign-service -w
NAME                            READY   STATUS
campaign-api-5d4f7b6c9-abc12   1/1     Running
campaign-api-5d4f7b6c9-def45   1/1     Running
campaign-api-5d4f7b6c9-ghi78   1/1     Running

# 4. Check horizontal pod autoscaler status
kubectl get hpa -n campaign-service
NAME                REFERENCE               TARGETS     MINPODS   MAXPODS
campaign-api-hpa    Deployment/campaign-api 45%/70%     3         10

# 5. View logs (all pods)
kubectl logs -n campaign-service -l app=campaign-api --tail=100 -f

# 6. Update image (trigger rolling update)
kubectl set image deployment/campaign-api \
  campaign-api=123456789.dkr.ecr.us-east-1.amazonaws.com/campaign-service:v2.0 \
  -n campaign-service

# 7. Check rollout status
kubectl rollout status deployment/campaign-api -n campaign-service

# 8. Rollback if needed
kubectl rollout undo deployment/campaign-api -n campaign-service
```

---

## Cloud Platform Selection

```
CRITERIA EVALUATION:

AWS (Chosen)
├─ Strengths: Largest ecosystem, most services, strong compliance (SOC 2, ISO 27001)
├─ Costs: ~£5K/month for data lake + API infrastructure
├─ Scalability: Auto-scaling to 10M+ users
└─ Maturity: Production-ready, 99.99% SLA

Azure
├─ Strengths: Good for enterprises already on Windows/Office 365
├─ Costs: ~£6K/month (20% more than AWS)
├─ Integration: Seamless with Microsoft stack
└─ Consideration: Smaller Kubernetes ecosystem vs AWS EKS

GCP
├─ Strengths: Best for analytics (BigQuery), machine learning (Vertex AI)
├─ Costs: ~£5.5K/month
├─ BigQuery: Superior for 100B+ row analytics
└─ Consideration: Smaller enterprise market share vs AWS

DECISION MATRIX (scoring 1-10):
           AWS   Azure  GCP
Cost       9     7      9
Compliance 10    10     9
Ecosystem  10    7      8
Scaling    10    9      8
Support    9     10     8
─────────────────────────
Total      48    43     42

Chosen: AWS (best balance of cost, ecosystem, compliance)
```

---

## Monitoring & Observability

```
FOUR SIGNALS (Golden Signals):

1. LATENCY
   └─ Measurement: API response time (50th, 95th, 99th percentile)
   └─ Target: p50 <100ms, p95 <500ms, p99 <1s
   └─ Alert: If p99 > 2s for 5 minutes → PagerDuty

2. TRAFFIC
   └─ Measurement: Requests per second (RPS)
   └─ Target: 1K RPS sustained, 2K RPS peak
   └─ Alert: If RPS > 2K for 10 minutes → scale up

3. ERRORS
   └─ Measurement: Error rate (4xx, 5xx responses)
   └─ Target: <0.1% error rate
   └─ Alert: If error rate > 1% → page on-call engineer

4. SATURATION
   └─ Measurement: CPU, memory, disk utilization
   └─ Target: <80% utilization
   └─ Alert: If utilization > 85% → scale up immediately

IMPLEMENTATION (CloudWatch):
├─ Log group: /aws/ecs/campaign-api
├─ Metrics: CPUUtilization, MemoryUtilization, HTTPErrors
├─ Alarms: 5 configured (high CPU, high errors, no traffic, etc.)
└─ Dashboard: Real-time view of all 4 signals
```

---

## Competitive Advantage from K12 Competency

| Aspect | Strong K12 | Weak K12 |
|--------|-----------|---------|
| **Deployment frequency** | 10x/day | 1x/week |
| **Time to production** | <20 min | 4 hours + change board |
| **Rollback time** | <5 min | 2+ hours |
| **Infrastructure cost** | £5K/month (optimized) | £15K/month (wasteful) |
| **Availability** | 99.95% uptime | 95% uptime |
| **Scaling** | Automatic | Manual intervention |
| **Disaster recovery** | 1 hour | 1+ day |

**Measurable Impact:**
- **Deployment speed:** 10x faster (manual 4h → automated 20min)
- **Infrastructure cost:** 3x lower (auto-scaling, lifecycle policies)
- **Uptime:** 99.95% vs 95% (no downtime deployments)
- **Mean time to recovery:** <5 minutes (rollback capability)
- **Developer productivity:** 1-2 hours/week saved on deployment manual work

**Key Learning:** Automation compounds
- One-time setup: 2 weeks to build CI/CD pipeline
- Recurring benefit: 10+ deployments/week × 3 hours saved = £2K+ saved per month
- ROI: 2 weeks of setup saves £24K+ annually in engineering time
