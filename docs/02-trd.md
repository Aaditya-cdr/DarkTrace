# DARKTRACE - Technical Requirements Document

## Document Information

| Field | Value |
|---|---|
| Product | DARKTRACE |
| Version | MVP v1.0 |
| Team | Tattvadarshi |
| Team ID | 135906 |
| SIH Problem Statement | SIH26151 |
| Architecture | Full-stack web application |
| Frontend | Next.js + TypeScript |
| Backend | Python + FastAPI |
| Relational Database | PostgreSQL |
| Graph Database | Neo4j |
| NLP | spaCy + Sentence Transformers |
| Graph Visualization | Cytoscape.js |
| Development | Docker / Docker Compose |
| Status | Technical Design |

---

# 1. Technical Objective

The DARKTRACE MVP must implement an end-to-end investigation pipeline:

```text
Data Ingestion
      ↓
Validation
      ↓
Normalization
      ↓
Entity Resolution
      ↓
Structured Storage
      ↓
Graph Construction
      ↓
Evidence Analysis
      ↓
Supporting / Contradictory Evidence
      ↓
Confidence Assessment
      ↓
Investigation Gap Analysis
      ↓
Next-Best Evidence
      ↓
Investigator Dashboard
      ↓
Investigation Report

2. Architecture Overview

DARKTRACE will use a layered architecture.

                    ┌──────────────────────────┐
                    │       Next.js Web        │
                    │   Investigator Console   │
                    └────────────┬─────────────┘
                                 │
                              REST API
                                 │
                    ┌────────────▼─────────────┐
                    │         FastAPI          │
                    │       API Layer          │
                    └────────────┬─────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
       ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
       │ PostgreSQL  │   │    Neo4j    │   │ NLP Engine  │
       │ Structured  │   │ Relationship│   │             │
       │ Data        │   │ Graph       │   │ spaCy       │
       │             │   │             │   │ Transformers│
       └─────────────┘   └─────────────┘   └─────────────┘
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 ▼
                    ┌──────────────────────────┐
                    │    Evidence Engine       │
                    │                          │
                    │ Scoring                  │
                    │ Corroboration            │
                    │ Contradictions           │
                    │ Temporal relevance       │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    Gap Analysis Engine   │
                    │                          │
                    │ Missing evidence         │
                    │ Weak evidence            │
                    │ Conflicts                │
                    │ Next-best evidence       │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Investigator Dashboard   │
                    └──────────────────────────┘
3. Architectural Principles

DARKTRACE will follow these principles:

3.1 Evidence-first

Analytical conclusions must be traceable to evidence records.

3.2 Explainability-first

Every confidence assessment must explain:

What evidence contributed.
Whether it supports or contradicts.
Where the evidence came from.
How strong the evidence is.
What uncertainty remains.
3.3 Human-in-the-loop

DARKTRACE assists investigators.

It does not automatically establish real-world identity.

3.4 Separation of concerns

The system will separate:

UI
API
database access
graph access
NLP
evidence analysis
gap analysis
3.5 Deterministic MVP

The core evidence engine will initially be rule-based.

Machine learning will provide analytical signals, not final attribution decisions.

3.6 Provenance preservation

Evidence must retain source and temporal information throughout processing.

4. Technology Stack
4.1 Frontend
Next.js

Responsibilities:

UI rendering
Routing
Investigator dashboard
Persona profiles
Graph interface
Evidence panels
Timeline
Investigation pages
Report interface
TypeScript

Used throughout the frontend.

Purpose:

Type safety
API contract consistency
Better maintainability
Tailwind CSS

Used for:

Layout
Typography
Responsive design
Component styling
Cytoscape.js

Used for:

Relationship graph
Node visualization
Edge visualization
Graph interactions
5. Backend
5.1 FastAPI

FastAPI will expose the REST API.

Responsibilities:

Request validation
Authentication/authorization boundary
Business logic orchestration
Database interaction
Graph queries
Evidence analysis
Gap analysis
Report generation
6. Backend Layer Structure

The backend will follow:

API
 ↓
Service Layer
 ↓
Domain / Analytical Engines
 ↓
Data Access Layer
 ↓
Databases

Example:

GET /api/personas/{id}
        ↓
Persona Router
        ↓
Persona Service
        ↓
PostgreSQL Repository
        ↓
Persona Response

For graph:

GET /api/personas/{id}/graph
        ↓
Graph Router
        ↓
Graph Service
        ↓
Neo4j Repository
        ↓
Graph Response
7. Backend Directory Architecture

Target structure:

backend/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── routes/
│   │   └── dependencies.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── logging.py
│   │
│   ├── models/
│   │
│   ├── schemas/
│   │
│   ├── repositories/
│   │   ├── postgres/
│   │   └── neo4j/
│   │
│   ├── services/
│   │
│   └── engines/
│       ├── evidence/
│       ├── stylometry/
│       ├── contradiction/
│       ├── attribution/
│       └── gap_analysis/
│
├── tests/
│
├── requirements.txt
└── Dockerfile
8. PostgreSQL Responsibilities

PostgreSQL will be the primary relational store for structured application data.

PostgreSQL will store:

Personas
Identifiers
Persona-identifier associations
Sources
Activities
Writing samples
Evidence records
Hypotheses
Investigation gaps
Reports
Integrity records

PostgreSQL is responsible for transactional consistency.

9. Neo4j Responsibilities

Neo4j will be the relationship intelligence store.

Neo4j will represent:

Persona
Handle
Alias
PGP
Wallet
Infrastructure
Domain
Activity
WritingSample
Evidence
Source

Neo4j is optimized for:

Relationship traversal
Multi-hop queries
Connected entity discovery
Graph exploration
Relationship visualization
10. Database Source of Truth

The databases will have distinct responsibilities.

PostgreSQL

Source of truth for:

Entity metadata
Evidence metadata
Source metadata
Investigation state
Analytical results
User/application state
Neo4j

Source of truth for:

Graph relationships
Graph traversal
Relationship topology

The same important entity may exist in both systems.

A stable UUID will be used to correlate records.

Example:

PostgreSQL Persona ID:
persona_01HX...

Neo4j Persona:
{
    id: "persona_01HX..."
}
11. Entity Model

Core entities:

Persona
Identifier
Activity
WritingSample
Source
Evidence
Hypothesis
InvestigationGap
Report

Identifier types:

HANDLE
ALIAS
PGP
WALLET
DOMAIN
INFRASTRUCTURE
12. Neo4j Graph Model
Nodes
(:Persona)
(:Handle)
(:Alias)
(:PGP)
(:Wallet)
(:Infrastructure)
(:Domain)
(:Activity)
(:WritingSample)
(:Evidence)
(:Source)
Relationships
(:Persona)-[:USES]->(:Handle)

(:Persona)-[:USES]->(:Alias)

(:Persona)-[:ASSOCIATED_WITH]->(:PGP)

(:Persona)-[:ASSOCIATED_WITH]->(:Wallet)

(:Persona)-[:OPERATES]->(:Infrastructure)

(:Infrastructure)-[:HOSTS]->(:Domain)

(:Persona)-[:PERFORMED]->(:Activity)

(:Persona)-[:AUTHORED]->(:WritingSample)

(:Evidence)-[:SUPPORTS]->(:Persona)

(:Evidence)-[:CONTRADICTS]->(:Persona)

(:Evidence)-[:SOURCED_FROM]->(:Source)

(:Persona)-[:POSSIBLE_LINK]->(:Persona)

Relationships may contain:

strength
timestamp
source_id
evidence_id
relationship_type
13. Entity Resolution

The ingestion pipeline must normalize identifiers before creating relationships.

Example:

Shadow-X
shadow_x
ShadowX
SHADOWX

may normalize to:

shadowx

Normalization may include:

Case normalization
Whitespace normalization
Formatting normalization
Identifier-type-specific normalization

Normalization must not automatically merge entities when ambiguity exists.

Potential collisions should be preserved for analysis.

14. Data Ingestion Pipeline

The MVP ingestion pipeline:

CSV / JSON
     ↓
Schema Validation
     ↓
Data Cleaning
     ↓
Normalization
     ↓
Entity Extraction
     ↓
Entity Resolution
     ↓
PostgreSQL Storage
     ↓
Neo4j Graph Construction

The pipeline should produce validation errors rather than silently accepting malformed records.

15. Evidence Model

Each evidence item must have:

Evidence ID
Hypothesis ID
Evidence Type
Description
Direction
Signal Strength
Source Reliability
Source Independence
Specificity
Temporal Relevance
Corroboration
Observation Timestamp
Collection Timestamp
Source ID

Direction:

SUPPORTING
CONTRADICTORY
NEUTRAL
16. Evidence Scoring

The MVP will use a transparent rule-based model.

Each factor will be normalized to:

0.0 - 1.0

Primary factors:

S = Signal Strength
R = Source Reliability
I = Source Independence
P = Specificity
T = Temporal Relevance

Base evidence contribution:

E = S × R × I × P × T

The resulting value represents evidence strength within the DARKTRACE model.

It must not be interpreted as probability.

17. Corroboration

Evidence from independent sources should provide stronger support than repeated observations from the same source.

Each source will have an:

independence_group

Example:

Source A → Group A
Source B → Group B
Source C → Group A

A, B, and C are three records but only two independent source groups.

Corroboration calculations must operate on independent source groups rather than simply counting records.

18. Evidence Aggregation

Supporting evidence and contradictory evidence will be calculated separately.

Conceptually:

Supporting Evidence
        ↓
Support Score

Contradictory Evidence
        ↓
Contradiction Score

The final evidence state will consider both.

The aggregation system should prevent unlimited accumulation of weak signals from overpowering meaningful contradictions.

The exact caps and diminishing-return rules will be defined in:

03-analytical-engine.md

The analytical engine specification is therefore a required dependency before final implementation.

19. Confidence Bands

The MVP will use:

LOW
MEDIUM
HIGH

Initial configurable thresholds may be:

0 - 34    LOW
35 - 69   MEDIUM
70 - 100  HIGH

These are prototype thresholds rather than statistically validated probability boundaries.

Thresholds must be stored in configuration rather than hardcoded throughout the application.

20. Contradiction Engine

The contradiction engine identifies evidence that weakens a hypothesis.

Potential contradiction types:

IDENTIFIER_CONFLICT
INFRASTRUCTURE_MISMATCH
TEMPORAL_GAP
SOURCE_CONFLICT
BEHAVIOURAL_CONFLICT
MISSING_EXPECTED_CONTINUITY

The engine should return:

contradiction_id
type
description
severity
evidence_id
source_id
timestamp
21. Stylometry Engine

The stylometry engine will provide supporting analytical signals.

Basic features
Average sentence length
Average word length
Vocabulary richness
Punctuation frequency
Function-word frequency
Capitalization patterns
Semantic similarity

Sentence Transformers may generate embeddings.

Similarity:

Cosine Similarity

Output:

similarity_score
model
sample_a
sample_b

Stylometric similarity must be treated as one evidence factor.

It must not independently establish common authorship.

22. NLP Processing Pipeline
Writing Sample
      ↓
Text Validation
      ↓
Preprocessing
      ↓
spaCy Processing
      ↓
Feature Extraction
      ↓
Sentence Transformer Embedding
      ↓
Similarity Calculation
      ↓
Evidence Signal
      ↓
Evidence Engine

The NLP layer should not directly assign confidence bands.

23. Temporal Analysis

Temporal analysis will consider:

First observed
Last observed
Activity overlap
Activity gaps
Sequence
Temporal distance

Temporal relevance should be normalized between:

0.0 - 1.0

The exact temporal decay function will be defined in the analytical engine specification.

24. Investigation Gap Engine

The gap engine receives:

Hypothesis
+
Available Evidence
+
Contradictions
+
Evidence Categories

It identifies:

Missing evidence
Weak evidence
Conflicting evidence
Limited corroboration
Temporal uncertainty

Each gap receives:

gap_id
gap_type
description
impact
uncertainty
investigative_value
priority
recommended_action
25. Gap Priority

Initial conceptual model:

Gap Priority =
Impact × Uncertainty × Investigative Value

All values are normalized to:

0.0 - 1.0

The output will be used to rank investigative directions internally.

The system should explain why a gap has a particular priority.

26. Next-Best Evidence

The gap engine maps gaps to investigative directions.

Example:

Gap:
Independent PGP corroboration missing

Recommendation:
Seek an independently sourced observation
connecting the PGP identifier to the candidate persona.

Reason:
The current relationship depends primarily on
one source group.

Recommendations are evidence-acquisition directions, not automated accusations.

27. Attribution Hypothesis

A hypothesis represents a possible relationship between two personas.

Example:

Subject Persona:
ShadowX

Candidate Persona:
ShadowNova

Hypothesis:
Possible Persona Link

Hypothesis state:

PENDING
ANALYZED
REVIEWED
ARCHIVED

A hypothesis must reference the evidence used to calculate its current state.

28. API Architecture

The MVP will expose REST APIs.

Health
GET /api/health
Personas
GET /api/personas
GET /api/personas/{id}
GET /api/personas/search?q={query}
Graph
GET /api/personas/{id}/graph
Timeline
GET /api/personas/{id}/timeline
Evidence
GET /api/personas/{id}/evidence
GET /api/hypotheses/{id}/evidence
Hypotheses
GET /api/hypotheses
GET /api/hypotheses/{id}
POST /api/hypotheses/analyze
Investigation gaps
GET /api/hypotheses/{id}/gaps
Ingestion
POST /api/ingest
Stylometry
POST /api/analyze/stylometry
Reports
GET /api/reports/{id}
POST /api/reports
29. API Response Structure

API responses should follow a consistent structure.

Successful response:

{
  "success": true,
  "data": {},
  "error": null
}

Error response:

{
  "success": false,
  "data": null,
  "error": {
    "code": "PERSONA_NOT_FOUND",
    "message": "Persona was not found."
  }
}

Internal stack traces must never be returned to clients.

30. Frontend Data Flow

Example persona request:

User searches ShadowX
        ↓
Next.js search component
        ↓
API client
        ↓
GET /api/personas/search
        ↓
FastAPI
        ↓
Persona service
        ↓
PostgreSQL
        ↓
JSON response
        ↓
React state
        ↓
Search results

Graph request:

Persona page
      ↓
GET /api/personas/{id}/graph
      ↓
FastAPI
      ↓
Graph service
      ↓
Neo4j
      ↓
Graph JSON
      ↓
Cytoscape.js
31. Frontend Architecture

Target structure:

frontend/
│
├── app/
│   ├── dashboard/
│   ├── personas/
│   ├── investigations/
│   └── reports/
│
├── components/
│   ├── dashboard/
│   ├── persona/
│   ├── graph/
│   ├── evidence/
│   ├── timeline/
│   ├── investigation/
│   └── ui/
│
├── lib/
│   ├── api/
│   ├── utils/
│   └── constants/
│
├── types/
│
└── public/
32. Frontend State Management

The MVP should avoid unnecessary global state.

Use:

Local React state for simple UI state.
URL parameters for navigational state.
Server/API state for backend data.
A lightweight query/cache solution if needed.

Do not introduce a large state-management framework unless the application actually requires it.

33. Graph Visualization Architecture

Cytoscape.js receives normalized graph data:

{
  "nodes": [],
  "edges": []
}

Node example:

{
  "data": {
    "id": "persona_001",
    "label": "ShadowX",
    "type": "PERSONA"
  }
}

Edge example:

{
  "data": {
    "id": "edge_001",
    "source": "persona_001",
    "target": "pgp_001",
    "type": "ASSOCIATED_WITH",
    "strength": 0.82
  }
}

The frontend should not calculate evidence scores.

The backend remains the analytical authority.

34. Authentication
MVP

The initial SIH prototype will use a controlled investigator/demo environment.

Complex multi-user authentication is not required for the first implementation.

However, the architecture should keep authentication isolated behind FastAPI dependencies so that authentication can be introduced later.

Future

Potential options:

JWT
OAuth/OIDC
Role-based access control

Authentication must not become a blocker for the core MVP.

35. Authorization

When authentication is introduced, authorization should be enforced server-side.

The frontend must never be treated as a security boundary.

Example future roles:

INVESTIGATOR
ANALYST
ADMIN
36. Security Requirements

The application must implement:

Input validation

Validate all API input using Pydantic schemas.

SQL injection protection

Use parameterized queries/ORM mechanisms.

XSS protection

Never render untrusted HTML directly.

Secrets

Store secrets in environment variables.

Never commit:

API keys
Database passwords
JWT secrets
Private keys
Error handling

Do not expose internal stack traces.

Rate limiting

Apply where appropriate to public or expensive endpoints.

File handling

Validate:

File type
File size
File name
Content

before processing uploaded data.

37. Security Boundary

DARKTRACE must only process:

Synthetic data
Publicly available authorized data
User-provided authorized datasets

The MVP must not perform:

Unauthorized access
Credential attacks
Tor exploitation
Traffic correlation
Live criminal-marketplace crawling
Real-person deanonymization
Law-enforcement evasion
38. Evidence Integrity

Evidence records may be protected against accidental or unauthorized modification using hashes.

Process:

Evidence Object
      ↓
Canonical JSON
      ↓
SHA-256
      ↓
Integrity Record

Example:

Evidence ID:
E-001

Hash:
<sha256>

Created:
<timestamp>

Verification:

Current Evidence
      ↓
Recalculate Hash
      ↓
Compare
      ↓
MATCH / MISMATCH

A matching hash confirms representation integrity.

It does not establish factual truth.

39. Blockchain Integration Boundary

A full public blockchain network is not required for MVP.

If implemented, blockchain-related functionality will focus on:

Evidence integrity
Timestamping
Provenance verification

The core attribution graph will remain in Neo4j.

This avoids forcing blockchain into functionality where a graph database is technically more appropriate.

40. Environment Configuration

Environment-specific values must be stored in .env.

Example:

APP_ENV=development

DATABASE_URL=
NEO4J_URI=
NEO4J_USERNAME=
NEO4J_PASSWORD=

NEXT_PUBLIC_API_URL=

SECRET_KEY=

A safe template will be committed:

.env.example

The real .env must remain ignored by Git.

41. Docker Architecture

Development environment:

Docker Compose
│
├── frontend
├── backend
├── postgres
└── neo4j

Potential architecture:

Browser
   ↓
Next.js
   ↓
FastAPI
   ├── PostgreSQL
   └── Neo4j

NLP dependencies may initially run inside the backend container.

A separate NLP service is not required for MVP.

42. Logging

Backend logs should include:

Timestamp
Log level
Request identifier
Endpoint
Execution time
Error code

Logs must not contain:

Passwords
API keys
Authentication tokens
Sensitive secrets
43. Error Handling

The API should distinguish:

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
429 Rate Limited
500 Internal Error

Analytical failures should return structured error information.

Example:

STYLometry_PROCESSING_ERROR
GRAPH_QUERY_ERROR
EVIDENCE_ANALYSIS_ERROR
DATA_VALIDATION_ERROR
44. Testing Strategy

Testing will use three levels.

Unit tests

Test:

Evidence scoring
Temporal relevance
Contradiction logic
Gap priority
Normalization
Stylometric calculations
Integration tests

Test:

FastAPI
+
PostgreSQL
+
Neo4j
End-to-end tests

Test the complete investigator workflow:

Search
→ Persona
→ Graph
→ Hypothesis
→ Evidence
→ Contradictions
→ Gaps
→ Report
45. Analytical Test Cases

The test dataset must include:

High-confidence case

Multiple independent supporting signals and limited contradictions.

Medium-confidence case

Multiple supporting signals with meaningful contradictions.

Low-confidence case

Weak similarity with strong contradictory evidence.

No-evidence case

Two unrelated personas.

Single-source case

Strong evidence originating from one source group.

Duplicate-source case

Multiple records from the same source.

Temporal-gap case

Strong identifier relationship but significant activity gap.

These cases are required to validate the evidence engine.

46. Performance Requirements

The MVP should prioritize correctness over large-scale optimization.

Target prototype behavior:

Dashboard load: reasonable interactive response
Persona search: near-instant for the synthetic dataset
Graph load: interactive for typical investigation graphs
Evidence analysis: completed within a few seconds
Report generation: completed within a reasonable interactive time

The MVP does not need to support massive production-scale datasets.

47. Scalability Considerations

The architecture should allow future growth.

Potential future scaling:

Next.js
   ↓
Load Balancer
   ↓
Multiple FastAPI instances
   ↓
PostgreSQL
   ↓
Neo4j

Potential future additions:

Redis caching
Background job queue
Separate NLP service
Object storage
Search index
Read replicas

These are future considerations and should not be implemented unless required.

48. API Security

All API endpoints must:

Validate input
Validate identifiers
Reject malformed requests
Use safe database queries
Return controlled errors
Avoid leaking internal implementation details

Expensive analytical operations should eventually be rate-limited.

49. Data Validation

Incoming records must be validated before entering the database.

Required validation examples:

Persona name → non-empty
Identifier type → known enum
Timestamp → valid datetime
Evidence direction → valid enum
Score values → 0.0 to 1.0
Source reliability → 0.0 to 1.0

Invalid records should be rejected with clear errors.

50. API Contract Ownership

The backend owns the API contract.

The frontend must consume defined API schemas rather than directly accessing databases.

The frontend must never connect directly to:

PostgreSQL
Neo4j

Only FastAPI may access backend databases.

51. Report Generation

Reports will be generated from backend data.

The report pipeline:

Investigation ID
      ↓
Fetch investigation
      ↓
Fetch evidence
      ↓
Fetch contradictions
      ↓
Fetch timeline
      ↓
Fetch graph summary
      ↓
Fetch investigation gaps
      ↓
Generate report

The report must contain a clear disclaimer about synthetic/public demonstration data.

52. Development Workflow

Development will follow:

Scope
 ↓
PRD
 ↓
TRD
 ↓
Analytical Engine Specification
 ↓
Dataset Specification
 ↓
UX Specification
 ↓
Frontend
 ↓
Refactor
 ↓
Backend
 ↓
Database
 ↓
Analytical Engines
 ↓
Integration
 ↓
Testing
 ↓
Demo Hardening

No major implementation should begin before its architectural dependency is defined.

53. Implementation Order

The recommended implementation order is:

Phase 1

Project foundation

Next.js
FastAPI
Docker
Environment configuration
Phase 2

Database foundation

PostgreSQL
Neo4j
Schema
Migrations
Constraints
Phase 3

Synthetic dataset

Personas
Identifiers
Sources
Activities
Evidence
Writing samples
Phase 4

Graph construction

PostgreSQL
      ↓
Neo4j
      ↓
Graph API
Phase 5

Evidence engine

Evidence
↓
Scoring
↓
Corroboration
↓
Contradictions
↓
Confidence
Phase 6

NLP

Stylometry
+
Semantic similarity
Phase 7

Gap analysis

Evidence state
↓
Gaps
↓
Priority
↓
Next-best evidence
Phase 8

Frontend integration

Dashboard
Persona
Graph
Evidence
Timeline
Investigation
Report
Phase 9

Testing

Unit
Integration
E2E
Security
Phase 10

Demo hardening.

54. Dependency Order

The dependency hierarchy is:

PRD
 │
 ▼
TRD
 │
 ├──────────────┐
 ▼              ▼
Database     Analytical
Schema       Engine Spec
 │              │
 └──────┬───────┘
        ▼
 Dataset Specification
        │
        ▼
 Backend + NLP
        │
        ▼
 API Contracts
        │
        ▼
 Frontend Integration
        │
        ▼
 Testing
        │
        ▼
 Demo

The Analytical Engine Specification must be completed before implementing the final evidence engine.

55. Risks
Risk 1: Overengineering

Mitigation:

Keep the MVP rule-based and deterministic.

Risk 2: Fake AI functionality

Mitigation:

Every analytical result must have an actual computational source.

Risk 3: Evidence score interpreted as probability

Mitigation:

Clearly label the output as evidence strength and confidence band.

Risk 4: Graph becomes visually impressive but analytically meaningless

Mitigation:

Every meaningful edge must have provenance.

Risk 5: Stylometry overclaiming

Mitigation:

Use stylometry as one evidence signal only.

Risk 6: Database synchronization issues

Mitigation:

Use stable entity UUIDs and clearly define database ownership.

Risk 7: Excessive feature scope

Mitigation:

Freeze MVP boundaries and defer optional functionality.

56. MVP Architecture Summary
                         DARKTRACE
                             │
                             ▼
                    Investigator UI
                         Next.js
                             │
                             ▼
                         FastAPI
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
     PostgreSQL            Neo4j             NLP
     Structured            Graph          spaCy /
       Data              Relations        Transformers
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
                     Evidence Engine
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
             Support   Contradiction  Provenance
                │            │            │
                └────────────┼────────────┘
                             ▼
                     Confidence Band
                             │
                             ▼
                    Gap Analysis Engine
                             │
                             ▼
                    Next-Best Evidence
                             │
                             ▼
                    Investigator Report
57. Technical Success Criteria

The TRD is considered successfully implemented when:

Next.js communicates with FastAPI.
FastAPI communicates with PostgreSQL.
FastAPI communicates with Neo4j.
Synthetic data can be ingested.
Entities are normalized.
Relationships are created in Neo4j.
Graph data can be retrieved through the API.
Evidence can be retrieved with provenance.
Evidence scores are calculated deterministically.
Supporting and contradictory evidence are separated.
Confidence bands are calculated.
Stylometric signals can be generated.
Investigation gaps can be calculated.
Next-best evidence can be generated.
Frontend displays actual backend results.
Investigation reports can be generated.
Core functionality is covered by automated tests.
Security controls are applied to the API.
No secrets are committed to Git.
The complete demonstration scenario works end-to-end.
58. Technical Design Principle

The central technical principle is:

The graph connects the evidence; the evidence engine evaluates it; the gap engine identifies uncertainty; the investigator makes the final judgment.

DARKTRACE must never turn correlation into certainty.

