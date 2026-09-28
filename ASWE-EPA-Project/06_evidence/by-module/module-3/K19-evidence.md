# K19 — Architectural Patterns
**Module**: 3  
**Date**: [Your date]  
**Project/Context**: [Your project — replace with your real context]  
**Status**: 🟡 Draft — replace bracketed sections with your real details

---

## Situation
Our team inherited a monolithic internal tool that handled customer data processing. Every time a 
new data source was added, the entire application had to be redeployed, causing 20+ minute outages 
during business hours. The product team had requested three new integrations within the quarter, 
which made the status quo unsustainable.

## Task
I was asked by my line manager to research and propose an architectural solution that would allow 
us to add new data sources without full redeployments. I was responsible for evaluating options, 
writing a recommendation, and leading the initial implementation.

## Action
I evaluated three architectural approaches: refactoring the monolith with a plugin pattern, 
decomposing into microservices, and implementing an event-driven architecture using a message 
queue. I documented my analysis in an Architecture Decision Record (ADR), scoring each option 
against four criteria: deployment independence, operational complexity, team familiarity, and 
estimated migration cost. I recommended the event-driven approach using [your message queue, 
e.g. RabbitMQ / AWS SQS / Kafka] because it provided deployment independence without the full 
operational overhead of managing separate microservice deployments — a key concern given our 
team of three engineers. I implemented the message schema, built two producer services in 
[your language], and wrote contract tests to ensure services communicated correctly.

## Result
The new architecture reduced our average deployment time from 22 minutes to 4 minutes per service. 
Three new data source integrations were delivered within the quarter as planned, and we had zero 
unplanned outages during the migration period. The ADR I wrote became the template the wider 
team adopted for future architectural decisions.

## KSB Justification
**This evidence demonstrates K19 (Architectural Patterns) because:**  
I did not simply implement a given architecture — I critically evaluated three distinct patterns 
against concrete criteria relevant to our team and system context, produced formal documentation 
justifying the decision, and led the implementation. This demonstrates understanding of when 
event-driven architecture is more appropriate than microservices, and the trade-offs involved 
in architectural choices at an organisational level.

## Examiner Notes
*Strength*: Decision-making process is explicit, multiple options evaluated, outcome quantified.  
*To push to Distinction*: Add a reflection on what you would do differently — for example, 
"In hindsight, I would have introduced observability tooling earlier in the migration to 
detect message queue lag before it became a problem."

---
> 💡 **How to use this file**: Replace the bracketed placeholders with your real project details.  
> Then ask Kiro: *"Review my K19 evidence and tell me how to push it to Distinction level"*
