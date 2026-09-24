# DARKTRACE - Project Scope

## 1. Project Identity

**Project Name:** DARKTRACE

**Tagline:** Connecting the Hidden Threads

**Team:** Tattvadarshi

**Team ID:** 135906

**SIH Problem Statement ID:** SIH26151

**Theme:** Blockchain & Cybersecurity

**Category:** Software

---

## 2. Product Definition

DARKTRACE is an Explainable Dark Web Threat Actor Attribution Assistant.

The system connects fragmented dark-web intelligence and produces evidence-backed attribution hypotheses.

DARKTRACE does not claim to reveal or prove the real-world identity of an individual.

Instead, it evaluates relationships between personas and entities using multiple evidence sources while explicitly presenting:

- Supporting evidence
- Contradictory evidence
- Evidence provenance
- Confidence bands
- Uncertainty
- Investigation gaps
- Recommended next-best evidence

---

## 3. Core Problem

Dark-web investigations can involve fragmented intelligence distributed across:

- Marketplace handles
- Aliases
- Personas
- PGP identifiers
- Cryptocurrency wallet identifiers
- Domains
- Hidden-service/infrastructure indicators
- Activity patterns
- Behavioural signals
- Writing samples
- Historical activity

Investigators need a way to connect these fragments while understanding why a relationship is considered relevant and what evidence is still missing.

---

## 4. Core Product Goal

DARKTRACE should allow an investigator to:

1. Search for a persona or identifier.
2. Discover related entities.
3. Visualize relationships through a graph.
4. Inspect the evidence supporting each relationship.
5. Inspect contradictory evidence.
6. Calculate an explainable evidence-strength score.
7. Assign a confidence band.
8. View the activity timeline.
9. Identify missing, weak, or conflicting evidence.
10. Recommend the next-best evidence to investigate.
11. Export an investigation report.

---

## 5. Core Investigation Loop

DARKTRACE follows this pipeline:

Data Ingestion
↓
Entity Extraction
↓
Entity Normalization
↓
Relationship Construction
↓
Evidence Collection
↓
Evidence Scoring
↓
Supporting / Contradictory Evidence Analysis
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

---

## 6. MVP Features

### 6.1 Investigator Dashboard

The dashboard will provide:

- Investigation overview
- Persona search
- Evidence statistics
- Relationship statistics
- Confidence-band distribution
- Open investigation gaps
- Recent investigations

---

### 6.2 Persona Search

Investigators can search using:

- Persona name
- Handle
- Alias
- PGP identifier
- Wallet identifier
- Domain
- Infrastructure identifier

---

### 6.3 Persona Profile

A persona profile will display:

- Persona name
- Handles
- Aliases
- PGP identifiers
- Wallet identifiers
- Domains
- Infrastructure
- Linked personas
- Activity timeline
- Evidence summary
- Supporting evidence
- Contradictory evidence
- Confidence band
- Investigation gaps
- Next-best evidence

---

### 6.4 Relationship Graph

The graph will represent relationships between:

- Personas
- Handles
- Aliases
- PGP identifiers
- Wallets
- Infrastructure
- Domains
- Activities
- Writing samples
- Evidence
- Sources

Graph relationships will include:

- Relationship type
- Evidence reference
- Timestamp
- Strength
- Provenance

---

### 6.5 Evidence Engine

The MVP will use a transparent rule-based evidence model.

Evidence may consider:

- Signal strength
- Source reliability
- Source independence
- Specificity
- Temporal relevance
- Corroboration
- Contradictions

The score represents evidence strength within the DARKTRACE model.

It must not be interpreted as a scientifically calibrated probability of identity.

---

### 6.6 Contradictory Evidence

The system must explicitly identify evidence that weakens a hypothesis.

Examples:

- Different infrastructure
- Conflicting identifiers
- Temporal gaps
- Source conflicts
- Behavioural inconsistencies

Contradictory evidence must be displayed separately from supporting evidence.

---

### 6.7 Stylometric Analysis

The MVP will provide basic stylometric analysis using:

- Sentence length
- Word statistics
- Vocabulary characteristics
- Punctuation patterns
- Function-word patterns

Semantic similarity may be calculated using Sentence Transformers.

Stylometric or semantic similarity is supporting evidence only and must never be treated as proof of common authorship or ownership.

---

### 6.8 Timeline

The system will display relevant historical activity including:

- Date/time
- Persona
- Activity
- Identifier
- Source
- Related evidence

The timeline will contribute to temporal relevance analysis.

---

### 6.9 Investigation Gap Analysis

The system will identify:

- Missing evidence
- Weak evidence
- Conflicting evidence
- Limited corroboration
- Temporal uncertainty

Each gap will receive a priority based on its potential investigative value.

---

### 6.10 Next-Best Evidence

For each investigation hypothesis, DARKTRACE will recommend an investigative direction that could reduce uncertainty.

Example:

> Independent corroboration of the PGP relationship is missing.

Recommended direction:

> Seek an independently sourced identifier connecting the two personas.

---

### 6.11 Investigation Report

The system will allow investigators to export a report containing:

- Investigation summary
- Persona information
- Relationship graph
- Supporting evidence
- Contradictory evidence
- Confidence band
- Timeline
- Investigation gaps
- Recommended next-best evidence
- Source provenance
- System limitations

---

## 7. Evidence Principles

DARKTRACE follows these principles:

### Principle 1: Similarity is not proof

A matching:

- PGP identifier
- Wallet
- Writing style
- Infrastructure indicator
- Behaviour pattern

must not independently establish common ownership.

---

### Principle 2: Multiple independent signals matter

Evidence should be evaluated using:

- Source reliability
- Source independence
- Temporal relevance
- Specificity
- Corroboration
- Signal strength

---

### Principle 3: Contradictions must be visible

The system must not hide evidence that weakens a hypothesis.

Supporting and contradictory evidence must be shown separately.

---

### Principle 4: Provenance matters

Important evidence should maintain:

- Source
- Timestamp
- Evidence type
- Reliability
- Independence group
- Original observation/reference

---

### Principle 5: Uncertainty must be explicit

DARKTRACE should communicate uncertainty instead of presenting attribution as fact.

---

## 8. Confidence Bands

The MVP will use three confidence bands:

- Low
- Medium
- High

Confidence bands represent the output of the DARKTRACE evidence model.

They do not represent:

- Probability of criminal identity
- Legal attribution
- Definitive authorship
- Proof of ownership

---

## 9. Demonstration Dataset

The MVP will use:

- Synthetic datasets
- Publicly available OSINT-style datasets
- Historical/public datasets where appropriate
- Mock marketplace records
- Synthetic personas
- Synthetic writing samples
- Synthetic PGP relationships
- Synthetic wallet relationships
- Synthetic infrastructure relationships

The primary demonstration environment will not depend on live criminal infrastructure.

---

## 10. Primary Demonstration Scenario

The main demonstration will contain:

### Persona A

**ShadowX**

Known indicators:

- Marketplace handle: ShadowX
- PGP: PGP-A
- Wallet: WALLET-A
- Writing Sample A
- Infrastructure: INFRA-01

### Persona B

**ShadowNova**

Known indicators:

- Marketplace handle: ShadowNova
- PGP: PGP-A
- Wallet: WALLET-B
- Writing Sample B
- Infrastructure: INFRA-02
- Partially overlapping activity timeline

Expected DARKTRACE result:

**Possible Persona Link**

**Confidence: Moderate**

Supporting evidence:

- Shared PGP identifier
- Behavioural similarity
- Semantic writing similarity
- Activity overlap

Contradictory evidence:

- Different infrastructure
- Temporal gap
- Limited independent corroboration

Investigation gap:

> Independent corroboration of the PGP relationship is missing.

Next-best evidence:

> Seek an independently sourced identifier linking the two personas.

The system must not state that ShadowX and ShadowNova are definitively the same person.

---

## 11. Technology Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Cytoscape.js

### Backend

- Python
- FastAPI

### Databases

- PostgreSQL
- Neo4j

### NLP

- spaCy
- Sentence Transformers

### Infrastructure

- Docker / Docker Compose

### Reporting

- PDF/HTML export

---

## 12. Blockchain Role

Blockchain will not be artificially used for the relationship graph or attribution algorithm.

The MVP may use blockchain-related concepts for evidence integrity and provenance.

Evidence records may be canonicalized and hashed to provide tamper-evident integrity verification.

Example:

Evidence Record
↓
Canonical representation
↓
SHA-256 hash
↓
Integrity record

The system must not claim that a blockchain hash proves the truth of an evidence record. It can only help verify that the recorded representation has not been altered.

---

## 13. Security Scope

The prototype must follow defensive and authorized cybersecurity practices.

The MVP will not implement:

- Unauthorized access
- Credential attacks
- Tor exploitation
- Traffic correlation
- Real-person deanonymization
- Live criminal-marketplace crawling
- Law-enforcement evasion
- Exploitation of real targets

---

## 14. Non-Goals

The MVP will not attempt to:

- Definitively identify real-world individuals
- Automatically accuse individuals of crimes
- Replace human investigators
- Provide legal conclusions
- Perform live operational dark-web surveillance
- Perform deanonymization through network-level attacks
- Build a generalized autonomous investigation agent
- Implement advanced machine-learning attribution models

---

## 15. MVP Success Criteria

The MVP is considered successful if an investigator can:

1. Open the DARKTRACE dashboard.
2. Search for a persona.
3. Open a persona profile.
4. View connected entities.
5. Visualize relationships through Neo4j/Cytoscape.js.
6. Inspect evidence supporting a relationship.
7. Inspect contradictory evidence.
8. View an explainable confidence band.
9. View the activity timeline.
10. Identify investigation gaps.
11. Receive a next-best evidence recommendation.
12. Generate an investigation report.

All major displayed analytical results must originate from actual prototype data or deterministic analytical logic rather than static UI text.

---

## 16. Prototype Disclaimer

> Demonstration uses synthetic and publicly available intelligence datasets.

> DARKTRACE generates evidence-backed attribution hypotheses for investigative assistance. Similarity or correlation does not constitute proof of common ownership or real-world identity.