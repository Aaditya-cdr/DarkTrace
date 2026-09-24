# DARKTRACE - Product Requirements Document

## Document Information

| Field | Value |
|---|---|
| Product | DARKTRACE |
| Tagline | Connecting the Hidden Threads |
| Team | Tattvadarshi |
| Team ID | 135906 |
| SIH Problem Statement | SIH26151 |
| Theme | Blockchain & Cybersecurity |
| Category | Software |
| Version | MVP v1.0 |
| Status | Product Definition |

---

# 1. Product Overview

DARKTRACE is an Explainable Dark Web Threat Actor Attribution Assistant designed to help investigators connect fragmented intelligence and evaluate possible relationships between dark-web personas.

The system does not attempt to definitively identify real-world individuals.

Instead, DARKTRACE builds evidence-backed attribution hypotheses by connecting multiple intelligence fragments and explicitly presenting:

- Supporting evidence
- Contradictory evidence
- Evidence provenance
- Confidence
- Uncertainty
- Investigation gaps
- Recommended next-best evidence

The MVP operates entirely using synthetic and publicly available intelligence datasets.

---

# 2. Problem Statement

Dark-web intelligence is often fragmented across multiple identifiers and observations.

A single persona may appear through:

- Marketplace handles
- Aliases
- PGP identifiers
- Cryptocurrency wallet identifiers
- Domains
- Infrastructure indicators
- Activity patterns
- Behavioural patterns
- Writing samples
- Historical observations

These fragments may exist in different datasets and may not explicitly reveal their relationships.

Investigators therefore need a system that can:

1. Connect fragmented entities.
2. Preserve evidence provenance.
3. Evaluate multiple independent signals.
4. Identify contradictory evidence.
5. Explain why a relationship is considered relevant.
6. Highlight uncertainty.
7. Identify what evidence is missing.
8. Recommend what evidence should be investigated next.

---

# 3. Product Goal

The primary goal of DARKTRACE is:

> Enable investigators to explore and evaluate possible relationships between dark-web personas through explainable, evidence-backed intelligence fusion.

The product should answer:

> "What evidence connects these personas, what evidence contradicts the relationship, how strong is the current evidence, and what should be investigated next?"

It should not attempt to answer:

> "Who is the real person behind this persona?"

with certainty.

---

# 4. Target Users

## Primary User: Cybersecurity Investigator

A cybersecurity or threat-intelligence analyst who needs to:

- Investigate suspicious personas
- Connect fragmented identifiers
- Examine historical activity
- Evaluate relationships
- Understand evidence provenance
- Identify investigative gaps

## Secondary User: Threat Intelligence Analyst

A security analyst who needs to:

- Explore entity relationships
- Correlate intelligence
- Compare personas
- Examine infrastructure
- Review behavioural patterns

## Demonstration User

For the SIH prototype, the primary demonstration persona is an investigator analyzing synthetic intelligence.

---

# 5. Core User Journey

The primary DARKTRACE workflow is:

```text
Open Dashboard
      ↓
Search Persona / Identifier
      ↓
Open Persona Profile
      ↓
Explore Relationship Graph
      ↓
Select Possible Relationship
      ↓
Review Supporting Evidence
      ↓
Review Contradictory Evidence
      ↓
Review Confidence Band
      ↓
Inspect Timeline
      ↓
Review Investigation Gaps
      ↓
View Next-Best Evidence
      ↓
Generate Investigation Report
6. MVP Feature Set
6.1 Investigator Dashboard
Purpose

Provide an overview of the current intelligence environment.

Requirements

Display:

Total personas
Total identifiers
Total evidence records
Total relationships
Active investigations
Confidence-band distribution
Open investigation gaps
Recent investigations
User actions

The investigator can:

Search for a persona
Open an investigation
Navigate to persona profiles
Review unresolved investigation gaps
7. Persona and Identifier Search
Purpose

Allow investigators to locate entities quickly.

Searchable fields
Persona name
Handle
Alias
PGP identifier
Wallet identifier
Domain
Infrastructure identifier
Requirements

The search system should:

Support partial matches
Normalize common formatting differences
Return matching personas and identifiers
Display relevant entity type
Display basic relationship information
Example

Search:

ShadowX

Result:

ShadowX
Persona

7 identifiers
14 evidence records
2 possible persona links

Confidence:
Moderate
8. Persona Profile
Purpose

Provide a centralized intelligence view for one persona.

Information displayed
Identity
Persona name
Description
First observed
Last observed
Identifiers
Handles
Aliases
PGP IDs
Wallet IDs
Domains
Infrastructure
Relationships
Linked personas
Related identifiers
Relationship strength
Relationship type
Evidence
Supporting evidence
Contradictory evidence
Neutral evidence
Evidence source
Evidence timestamp
Analysis
Confidence band
Evidence strength
Timeline
Investigation gaps
Next-best evidence
9. Relationship Graph
Purpose

Visualize relationships between intelligence entities.

Node types
Persona
Handle
Alias
PGP
Wallet
Infrastructure
Domain
Activity
Writing Sample
Evidence
Source
Relationship types

Examples:

USES
ASSOCIATED_WITH
OWNS
OPERATES
HOSTS
PERFORMED
SIMILAR_TO
POSSIBLE_LINK
SUPPORTED_BY
CONTRADICTED_BY
OBSERVED_IN
Edge metadata

Each relevant relationship should expose:

Relationship type
Evidence reference
Strength
Timestamp
Source
Provenance
User interaction

The investigator can:

Zoom
Pan
Select nodes
Expand relationships
Inspect evidence
Filter node types
Filter relationship types
10. Evidence Engine
Purpose

Calculate explainable evidence strength for a hypothesis.

The MVP will use a transparent rule-based model.

Evidence factors

Each evidence item may consider:

Signal strength
Source reliability
Source independence
Specificity
Temporal relevance
Corroboration
Contradictions
Important constraint

The resulting score is an internal evidence-strength measure.

It is not a calibrated probability of identity.

11. Supporting Evidence

Supporting evidence increases confidence in a relationship hypothesis.

Examples:

Shared PGP identifier
Strong semantic writing similarity
Behavioural similarity
Activity overlap
Infrastructure continuity
Independent corroboration

Each item should show:

Evidence Type
Description
Strength
Source
Timestamp
Reliability
Independence
12. Contradictory Evidence

Contradictory evidence decreases confidence or increases uncertainty.

Examples:

Different infrastructure
Conflicting identifiers
Temporal gaps
Behavioural inconsistencies
Conflicting source observations
Lack of expected continuity

Contradictory evidence must be displayed separately from supporting evidence.

The system must never hide contradictory information simply because it reduces the confidence score.

13. Confidence Band

The MVP will use three confidence bands:

LOW
MEDIUM
HIGH

The confidence band is derived from the DARKTRACE evidence model.

It must not be represented as:

"87% probability this is the same person"

Instead:

Confidence: HIGH
Evidence Strength: 82/100

The UI should clearly communicate that the score represents the current evidence model rather than proof of identity.

14. Evidence Provenance

Every important evidence item should maintain provenance.

Minimum provenance information:

Evidence ID
Source
Source type
Observation timestamp
Collection timestamp
Evidence type
Reliability
Independence group
Original observation/reference
Processing/transformation information where applicable

This allows an investigator to understand where an analytical conclusion originated.

15. Stylometric Analysis
Purpose

Provide linguistic evidence as one component of the overall evidence model.

MVP features

Basic stylometric features:

Average sentence length
Average word length
Vocabulary richness
Punctuation frequency
Function-word frequency
Capitalization patterns
Semantic analysis

Sentence Transformer embeddings may be used to calculate semantic similarity between writing samples.

Example:

Writing Sample A
        ↓
Embedding A

Writing Sample B
        ↓
Embedding B

Cosine Similarity
        ↓
0.84
Important limitation

Writing similarity is supporting evidence only.

It must not be treated as proof that two samples were written by the same person.

16. Activity Timeline
Purpose

Allow investigators to understand temporal relationships.

Each activity should include:

Timestamp
Persona
Activity type
Description
Identifier
Source
Related evidence

The timeline should support:

Activity overlap detection
Temporal gaps
Continuity analysis
Historical context
17. Investigation Gap Analysis
Purpose

Identify what is missing or uncertain in the current hypothesis.

The system should detect:

Missing evidence

Evidence categories that are currently unavailable.

Weak evidence

Evidence exists but has low strength or reliability.

Conflicting evidence

Evidence exists that contradicts another observation.

Limited corroboration

Important evidence is supported by too few independent sources.

Temporal uncertainty

The relationship is affected by significant activity gaps or inconsistent timing.

18. Next-Best Evidence

For each important investigation gap, DARKTRACE should recommend an investigative direction.

Example:

Gap
Independent PGP corroboration is missing.
Recommended next-best evidence
Seek an independently sourced observation connecting
PGP-A to the second persona.

The recommendation should explain why resolving the gap could reduce uncertainty.

19. Demonstration Scenario

The primary demonstration involves two synthetic personas.

Persona A
ShadowX

Known indicators:

Handle: ShadowX
PGP: PGP-A
Wallet: WALLET-A
Writing Sample A
Infrastructure: INFRA-01
Persona B
ShadowNova

Known indicators:

Handle: ShadowNova
PGP: PGP-A
Wallet: WALLET-B
Writing Sample B
Infrastructure: INFRA-02
Partially overlapping activity
Expected Analysis
Supporting Evidence
Shared PGP identifier
Behavioural similarity
Semantic writing similarity
Activity overlap
Contradictory Evidence
Different infrastructure
Temporal gap
Limited independent corroboration
Result
Possible Persona Link

Confidence:
MEDIUM
Investigation Gap
Independent corroboration of the PGP relationship is missing.
Next-Best Evidence
Seek an independently sourced identifier connecting
the two personas.

The system must not state:

ShadowX = ShadowNova

as a fact.

20. Secondary Demonstration Scenarios

The dataset should contain additional scenarios to demonstrate that DARKTRACE does not automatically produce positive attribution.

Strong scenario

Multiple independent signals:

PGP relationship
Wallet relationship
Infrastructure continuity
Temporal continuity
Independent corroboration

Expected:

HIGH
Weak scenario

Only:

Writing similarity

with:

Different PGP
Different wallet
Different infrastructure
No temporal overlap

Expected:

LOW
Ambiguous scenario

Multiple supporting signals but significant contradictions.

Expected:

MEDIUM

This demonstrates the importance of uncertainty.

21. Investigation Report

The investigator should be able to export an investigation report.

Report contents
Investigation metadata
Subject persona
Candidate persona
Relationship graph
Supporting evidence
Contradictory evidence
Evidence scores
Confidence band
Activity timeline
Investigation gaps
Next-best evidence
Source provenance
System limitations
Demonstration dataset disclaimer
22. Data Sources for MVP

The MVP will use:

Synthetic data
Public OSINT-style data
Historical/public datasets where appropriate
Mock marketplace records
Synthetic personas
Synthetic writing samples
Synthetic PGP identifiers
Synthetic wallet identifiers
Synthetic infrastructure relationships

The prototype must not depend on live criminal infrastructure.

23. Blockchain / Evidence Integrity

Blockchain should not be artificially inserted into the attribution algorithm.

The MVP may use blockchain-related mechanisms for evidence integrity.

The system may:

Canonicalize an evidence record.
Generate a SHA-256 hash.
Store the integrity record.
Verify whether the current representation matches the recorded hash.

This demonstrates tamper-evident evidence handling.

A hash verifies integrity of the recorded representation. It does not prove that the underlying evidence is true.

24. Edge Cases

The system should handle:

Duplicate identifiers

Two personas may reference the same identifier.

Conflicting identifiers

Different records may associate an identifier with different personas.

Missing timestamps

Evidence may not contain reliable temporal information.

Low-reliability sources

Evidence from weak sources should contribute less.

Single-source evidence

Evidence supported by only one source should not receive the same corroboration value as independently confirmed evidence.

Contradictory evidence

Supporting and contradictory evidence may coexist.

No evidence

A relationship should not be generated simply because two personas exist.

Weak similarity

Similarity alone should not create a strong relationship.

Data normalization

Formatting differences should not create duplicate entities unnecessarily.

25. Non-Goals

The MVP will not:

Definitively identify real-world individuals.
Accuse individuals of criminal activity.
Replace human investigators.
Provide legal conclusions.
Crawl live criminal marketplaces.
Exploit Tor or onion services.
Perform traffic correlation.
Perform unauthorized access.
Provide law-enforcement evasion capabilities.
Automatically determine criminal responsibility.
Treat similarity as proof of identity.
26. Security Requirements

The application should implement:

Input validation
API authentication where required
Authorization
Secure secret management
Parameterized database queries
Protection against SQL injection
XSS-safe rendering
Rate limiting where appropriate
Safe file handling
Error-message sanitization
No credentials in source control
No unnecessary exposure of internal infrastructure
27. User Experience Requirements

The UI should be:

Professional
Clean
Analyst-oriented
Information-dense but readable
Responsive
Accessible
Consistent

Visual direction:

Neutral/light background
White cards
Subtle borders
Muted blue accents
Strong typography
Clear information hierarchy

Avoid:

Cyberpunk styling
Neon effects
Matrix animations
Excessive gradients
Glowing borders
Generic hacker imagery
28. MVP Success Metrics

The MVP is successful if:

Functional

An investigator can complete the complete investigation workflow without manually editing database records.

Analytical

The system correctly distinguishes:

Supporting evidence
Contradictory evidence
Weak evidence
Missing evidence
Explainability

Every confidence band can be traced back to the evidence contributing to it.

Provenance

Evidence can be traced back to its source and timestamp.

Investigation Gap

The system can identify at least one meaningful evidence gap for ambiguous scenarios.

Recommendation

The system can produce a next-best evidence recommendation based on the identified gap.

Demonstration

A complete investigation can be demonstrated from search to report within approximately five minutes.

29. MVP vs Future Scope
MVP
Synthetic data ingestion
Entity normalization
PostgreSQL
Neo4j
Relationship graph
Evidence engine
Contradiction handling
Basic stylometry
Semantic similarity
Timeline
Confidence bands
Investigation gaps
Next-best evidence
Dashboard
Persona profile
Report export
Evidence integrity hashing
Future
Larger intelligence datasets
Advanced entity resolution
More sophisticated temporal analysis
Advanced authorship analysis
Additional intelligence sources
Automated data-quality assessment
Advanced graph analytics
Multi-investigator collaboration
Role-based access control
Advanced evidence provenance infrastructure
Additional integrity-ledger integrations
30. Product Principle

The central principle of DARKTRACE is:

Connect the evidence, explain the reasoning, expose the contradictions, identify the gaps.

DARKTRACE should assist investigators in forming and evaluating hypotheses rather than presenting uncertain relationships as facts.


---