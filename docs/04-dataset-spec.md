# DARKTRACE - Synthetic Dataset Specification

## 1. Purpose

This document defines the synthetic intelligence dataset used by the DARKTRACE MVP.

The dataset must be realistic enough to demonstrate:

- Entity resolution
- Relationship discovery
- Evidence fusion
- Supporting evidence
- Contradictory evidence
- Temporal analysis
- Stylometric analysis
- Confidence bands
- Investigation gaps
- Next-best evidence

The dataset must remain synthetic and must not represent real individuals, real criminal organizations, real credentials, or operational access to real criminal infrastructure.

---

# 2. Dataset Design Principles

The dataset must follow five principles.

## 2.1 Realistic ambiguity

Not every relationship should be obvious.

## 2.2 Multiple evidence types

Relationships should be supported by combinations of:

- Identity
- Infrastructure
- Behaviour
- Linguistic
- Temporal evidence

## 2.3 Contradictions

Some hypotheses must contain meaningful contradictory evidence.

## 2.4 Independent sources

Important relationships must sometimes be supported by multiple independent source groups.

## 2.5 No perfect ground truth exposure

The UI should not simply display:

> These two personas are definitely the same.

Instead, the dataset should allow the analytical engine to reach its own evidence assessment.

For testing purposes, however, the dataset should contain a hidden ground-truth label indicating the intended synthetic relationship class.

---

# 3. Dataset Size

Initial MVP dataset:

| Entity | Target Count |
|---|---:|
| Personas | 8 |
| Handles | 25 |
| Aliases | 10 |
| PGP identifiers | 12 |
| Wallet identifiers | 15 |
| Infrastructure nodes | 12 |
| Domains | 15 |
| Activities | 40 |
| Writing samples | 20 |
| Sources | 10 |
| Evidence records | 60+ |
| Hypotheses | 10+ |
| Investigation gaps | Generated dynamically |

The exact number may change slightly during implementation as relationships are refined.

---

# 4. Synthetic Personas

The primary personas are:

```text
ShadowX
ShadowNova
NightFox
CipherWolf
GhostMarket
BlackOak
RedVector
NullShade
5. Persona Profiles
5.1 ShadowX

Role:

Synthetic marketplace persona.

Identifiers:

Handle: ShadowX
PGP: PGP-A
Wallet: WALLET-A
Infrastructure: INFRA-01
Writing samples: SAMPLE-A1, SAMPLE-A2

Activity period:

2026-01 → 2026-04

Primary demonstration relationship:

ShadowX ↔ ShadowNova
5.2 ShadowNova

Role:

Synthetic marketplace persona.

Identifiers:

Handle: ShadowNova
PGP: PGP-A
Wallet: WALLET-B
Infrastructure: INFRA-02
Writing samples: SAMPLE-B1, SAMPLE-B2

Activity period:

2026-02 → 2026-06

Primary demonstration relationship:

ShadowNova ↔ ShadowX

Expected:

MEDIUM
5.3 NightFox

Role:

Synthetic marketplace persona.

Identifiers:

Handle: NightFox
PGP: PGP-C
Wallet: WALLET-C
Infrastructure: INFRA-03

Writing:

SAMPLE-C1
SAMPLE-C2

Activity:

2026-01 → 2026-03

Primary test:

Weak relationship with RedVector.

5.4 CipherWolf

Role:

Synthetic marketplace persona.

Identifiers:

Handle: CipherWolf
PGP: PGP-D
Wallet: WALLET-D
Infrastructure: INFRA-04

Writing:

SAMPLE-D1
SAMPLE-D2

Activity:

2026-02 → 2026-08

Primary test:

Strong relationship with NullShade.

5.5 GhostMarket

Role:

Synthetic marketplace persona.

Identifiers:

Handle: GhostMarket
PGP: PGP-E
Wallet: WALLET-E
Infrastructure: INFRA-05

Activity:

2026-03 → 2026-07

Used primarily as an unrelated control persona.

5.6 BlackOak

Role:

Synthetic marketplace persona.

Identifiers:

Handle: BlackOak
PGP: PGP-F
Wallet: WALLET-F
Infrastructure: INFRA-06

Activity:

2026-01 → 2026-05

Used for graph density and unrelated relationships.

5.7 RedVector

Role:

Synthetic marketplace persona.

Identifiers:

Handle: RedVector
PGP: PGP-G
Wallet: WALLET-G
Infrastructure: INFRA-07

Writing:

SAMPLE-G1
SAMPLE-G2

Primary test:

Weak relationship with NightFox.

5.8 NullShade

Role:

Synthetic marketplace persona.

Identifiers:

Handle: NullShade
PGP: PGP-D
Wallet: WALLET-H
Infrastructure: INFRA-04

Writing:

SAMPLE-H1
SAMPLE-H2

Activity:

2026-03 → 2026-08

Primary test:

Strong relationship with CipherWolf.

6. Identifier Dataset
6.1 Handle IDs

Example handles:

ShadowX
ShadowNova
Shadow_X
SN_Market
NightFox
NightFox_01
CipherWolf
CW_Market
GhostMarket
Ghost_M
BlackOak
BlackOak_Store
RedVector
RV_Market
NullShade
NS_Store

Additional handles should be created to reach the target dataset size.

7. Normalization Examples

The dataset must intentionally include formatting variations.

Example:

ShadowX
shadowx
SHADOWX
Shadow_X

Normalization should allow the system to recognize potentially related representations without automatically assuming they belong to the same persona.

8. PGP Dataset

Synthetic PGP identifiers:

PGP-A
PGP-B
PGP-C
PGP-D
PGP-E
PGP-F
PGP-G
PGP-H
PGP-I
PGP-J
PGP-K
PGP-L

Important relationships:

ShadowX      → PGP-A
ShadowNova   → PGP-A

CipherWolf   → PGP-D
NullShade    → PGP-D

These are intentionally shared identifiers for demonstration.

The system must not automatically treat a shared PGP identifier as proof of common ownership.

9. Wallet Dataset

Synthetic wallets:

WALLET-A
WALLET-B
WALLET-C
WALLET-D
WALLET-E
WALLET-F
WALLET-G
WALLET-H
WALLET-I
WALLET-J
WALLET-K
WALLET-L
WALLET-M
WALLET-N
WALLET-O

Important relationship:

CipherWolf → WALLET-D
NullShade  → WALLET-H

They deliberately use different wallets despite sharing other signals.

This creates a useful contradiction/ambiguity for the strong synthetic scenario.

10. Infrastructure Dataset

Synthetic infrastructure nodes:

INFRA-01
INFRA-02
INFRA-03
INFRA-04
INFRA-05
INFRA-06
INFRA-07
INFRA-08
INFRA-09
INFRA-10
INFRA-11
INFRA-12

Primary demonstration:

ShadowX    → INFRA-01
ShadowNova → INFRA-02

This creates contradictory infrastructure evidence for the primary ambiguous case.

Strong scenario:

CipherWolf → INFRA-04
NullShade  → INFRA-04
11. Domain Dataset

Synthetic domains:

market-a.example
market-b.example
vault-a.example
node-a.example
archive-a.example
relay-a.example
mirror-a.example
portal-a.example

These domains are synthetic placeholders.

They must not point to real criminal infrastructure.

12. Activity Dataset

Each activity contains:

activity_id
persona_id
activity_type
timestamp
description
source_id

Activity types:

MARKETPLACE_POST
MARKETPLACE_UPDATE
PGP_OBSERVATION
WALLET_OBSERVATION
INFRASTRUCTURE_OBSERVATION
DOMAIN_OBSERVATION
WRITING_SAMPLE
ACCOUNT_ACTIVITY
13. Activity Timeline
ShadowX

Example:

2026-01-12
Marketplace activity

2026-01-25
PGP-A observed

2026-02-08
Marketplace activity

2026-03-02
Infrastructure observation INFRA-01

2026-04-11
Marketplace activity
ShadowNova

Example:

2026-02-04
Marketplace activity

2026-02-18
PGP-A observed

2026-03-15
Writing sample

2026-04-03
Infrastructure observation INFRA-02

2026-06-10
Marketplace activity

This creates partial temporal overlap.

14. Writing Sample Dataset

Create 20 synthetic writing samples.

Each record:

sample_id
persona_id
text
timestamp
source_id

Example:

SAMPLE-A1
Persona: ShadowX
Date: 2026-02-08
SAMPLE-B1
Persona: ShadowNova
Date: 2026-03-15
15. Writing Style Design

Writing samples should contain controlled similarities and differences.

For ShadowX and ShadowNova:

Similar:

Sentence structure
Certain vocabulary
Punctuation habits
Some phrase patterns

Different:

Topic
Exact wording
Sentence lengths
Some stylistic features

This should produce moderate/high semantic similarity without being identical.

16. Source Dataset

Create 10 synthetic source groups.

SRC-A
SRC-B
SRC-C
SRC-D
SRC-E
SRC-F
SRC-G
SRC-H
SRC-I
SRC-J

Each source contains:

source_id
name
source_type
reliability
independence_group
description

Example:

{
  "source_id": "SRC-A",
  "name": "Synthetic Marketplace Archive A",
  "source_type": "PUBLIC_DATASET",
  "reliability": 0.80,
  "independence_group": "GROUP-A"
}
17. Source Independence

Sources must intentionally share and differ in independence groups.

Example:

SRC-A → GROUP-A
SRC-B → GROUP-B
SRC-C → GROUP-A
SRC-D → GROUP-C
SRC-E → GROUP-D

This allows the evidence engine to demonstrate why source count and independent corroboration are different concepts.

18. Evidence Dataset

Each evidence record contains:

evidence_id
hypothesis_id
category
type
description
direction
signal_strength
source_reliability
source_independence
specificity
temporal_relevance
source_id
independence_group
observation_timestamp
19. Evidence Types

Use:

SHARED_HANDLE
SHARED_ALIAS
SHARED_PGP
SHARED_WALLET
INFRASTRUCTURE_CONTINUITY
INFRASTRUCTURE_MISMATCH
DOMAIN_ASSOCIATION
ACTIVITY_OVERLAP
TEMPORAL_GAP
BEHAVIOURAL_SIMILARITY
SEMANTIC_SIMILARITY
STYLOMETRIC_SIMILARITY
SOURCE_CORROBORATION
IDENTIFIER_CONFLICT
20. Primary Scenario: ShadowX ↔ ShadowNova

This is the main live demonstration.

Supporting evidence
E-001
Type:
SHARED_PGP

Description:
Both personas are associated with PGP-A.

Direction:
SUPPORTING
E-002
Type:
SEMANTIC_SIMILARITY

Description:
Writing samples demonstrate high semantic similarity.

Direction:
SUPPORTING
E-003
Type:
BEHAVIOURAL_SIMILARITY

Description:
Observed activity patterns contain multiple similarities.

Direction:
SUPPORTING
E-004
Type:
ACTIVITY_OVERLAP

Description:
Activity periods partially overlap.

Direction:
SUPPORTING
21. ShadowX ↔ ShadowNova Contradictions
E-005
Type:
INFRASTRUCTURE_MISMATCH

Description:
The personas are associated with different infrastructure nodes.

Direction:
CONTRADICTORY
E-006
Type:
TEMPORAL_GAP

Description:
A significant unexplained gap exists between relevant observations.

Direction:
CONTRADICTORY
22. ShadowX ↔ ShadowNova Corroboration

The PGP relationship should initially be supported primarily by one independent source group.

This intentionally creates:

LIMITED_CORROBORATION

Investigation gap:

Independent corroboration of the PGP relationship is missing.

Expected confidence:

MEDIUM
23. Strong Scenario: CipherWolf ↔ NullShade

Supporting evidence:

SHARED_PGP
INFRASTRUCTURE_CONTINUITY
ACTIVITY_OVERLAP
BEHAVIOURAL_SIMILARITY
SEMANTIC_SIMILARITY
INDEPENDENT_CORROBORATION

Contradictory evidence:

DIFFERENT_WALLET
MINOR_LINGUISTIC_DIFFERENCE

Expected result:

HIGH

provided the analytical engine's minimum evidence requirements are satisfied.

24. Weak Scenario: NightFox ↔ RedVector

Supporting:

SEMANTIC_SIMILARITY

Contradictory:

DIFFERENT_PGP
DIFFERENT_WALLET
DIFFERENT_INFRASTRUCTURE
NO_TEMPORAL_OVERLAP

Expected result:

LOW

This scenario demonstrates that linguistic similarity alone does not establish a relationship.

25. Unrelated Scenario

Create at least one pair with:

No shared identifiers
No infrastructure relationship
No temporal overlap
No meaningful behavioural similarity
No meaningful linguistic similarity

Expected:

LOW

The system should avoid creating a meaningful hypothesis unless explicitly requested for comparison.

26. Hypothesis Dataset

Initial hypotheses:

H-001
ShadowX ↔ ShadowNova

H-002
CipherWolf ↔ NullShade

H-003
NightFox ↔ RedVector

H-004
ShadowX ↔ NightFox

H-005
GhostMarket ↔ BlackOak

H-006
RedVector ↔ GhostMarket

H-007
BlackOak ↔ NullShade

H-008
ShadowNova ↔ GhostMarket

Additional hypotheses may be generated during graph analysis.

27. Ground-Truth Labels

For testing only, each synthetic hypothesis may have a hidden ground-truth classification.

Allowed values:

RELATED
AMBIGUOUS
UNRELATED

Example:

H-001 → AMBIGUOUS
H-002 → RELATED
H-003 → UNRELATED

Important:

Ground-truth labels must not be displayed in the investigator UI.

They are used only to evaluate whether the analytical engine behaves as intended.

28. Dataset Separation

The project should maintain:

data/
├── raw/
├── normalized/
├── synthetic/
└── seeds/

Recommended:

data/synthetic/
├── personas.json
├── identifiers.json
├── sources.json
├── activities.json
├── writing_samples.json
├── evidence.json
└── hypotheses.json
29. Synthetic Data Format

JSON is preferred for the initial dataset because it is easy to:

Validate
Seed
Version
Inspect
Process using Python

CSV may be added later for analyst-style imports.

30. Example Persona Record
{
  "persona_id": "P-001",
  "name": "ShadowX",
  "description": "Synthetic marketplace persona",
  "first_seen": "2026-01-12T10:00:00Z",
  "last_seen": "2026-04-11T15:00:00Z"
}
31. Example Identifier Record
{
  "identifier_id": "ID-001",
  "type": "PGP",
  "value": "PGP-A",
  "normalized_value": "pgp-a"
}
32. Example Activity Record
{
  "activity_id": "ACT-001",
  "persona_id": "P-001",
  "activity_type": "MARKETPLACE_POST",
  "timestamp": "2026-01-12T10:00:00Z",
  "description": "Synthetic marketplace activity",
  "source_id": "SRC-A"
}
33. Example Evidence Record
{
  "evidence_id": "E-001",
  "hypothesis_id": "H-001",
  "category": "IDENTITY",
  "type": "SHARED_PGP",
  "description": "Both personas are associated with PGP-A.",
  "direction": "SUPPORTING",
  "signal_strength": 0.95,
  "source_reliability": 0.80,
  "source_independence": 0.70,
  "specificity": 0.95,
  "temporal_relevance": 0.90,
  "source_id": "SRC-A",
  "independence_group": "GROUP-A",
  "observation_timestamp": "2026-02-18T12:00:00Z"
}
34. Data Validation Rules

All synthetic data must satisfy:

Persona
Unique ID
Non-empty name
Identifier
Unique ID
Valid type
Normalized value
Activity
Valid persona
Valid timestamp
Valid source
Evidence
Valid hypothesis
Valid direction
Scores between 0 and 1
Valid source
Valid independence group
Writing sample
Valid persona
Non-empty text
Valid timestamp
Valid source
35. Data Quality Scenarios

The dataset must intentionally include:

Complete records

Normal valid records.

Missing optional information

Example:

Missing domain
Missing infrastructure timestamp
Conflicting observations

Example:

Two sources associate different infrastructure with the same persona.

Duplicate records

Duplicate observations from the same source.

Weak sources

Evidence with lower reliability.

Independent corroboration

Multiple source groups supporting the same observation.

36. Dataset Integrity

Synthetic records should have stable IDs.

IDs must not depend on array position.

Bad:

persona_1
persona_2

only because of current ordering.

Better:

P-001
P-002

with explicit relationships.

37. Graph Density

The graph should contain enough relationships to look realistic but remain understandable.

Target:

8 personas
40-60 meaningful entity relationships

The primary investigation graph should remain readable when opened.

Avoid creating unnecessary relationships solely to make the graph look complex.

38. Demonstration Graph

When ShadowX is selected, the graph should reveal:

ShadowX
 ├── ShadowNova
 ├── PGP-A
 ├── WALLET-A
 ├── INFRA-01
 ├── Writing Sample A
 └── Activities

Selecting ShadowNova should reveal:

ShadowNova
 ├── ShadowX
 ├── PGP-A
 ├── WALLET-B
 ├── INFRA-02
 ├── Writing Sample B
 └── Activities

This creates the visual investigation story.

39. Data Generation Strategy

The initial dataset may be manually authored to guarantee deterministic demonstration behavior.

A Python generator can later be created to produce larger variants.

Preferred workflow:

Hand-designed seed dataset
        ↓
Validate
        ↓
Seed databases
        ↓
Test analytical engine
        ↓
Expand with generator if required

Do not generate random relationships without controlling the expected analytical outcome.

40. Dataset Versioning

The dataset should have a version:

dataset_version:
1.0.0

Each seed should record:

dataset_version
generated_at
generator_version

This allows analytical results to be reproduced.

41. Dataset Privacy and Safety

The dataset must not contain:

Real credentials
Real wallet private keys
Real authentication tokens
Real personal information
Real criminal marketplace credentials
Operational access information
Real private individuals' identifying information

All demonstration identities must remain synthetic.

42. Dataset Success Criteria

The dataset is considered ready when:

At least 8 personas exist.
At least 25 handles/aliases exist.
At least 12 PGP identifiers exist.
At least 15 wallets exist.
At least 12 infrastructure nodes exist.
At least 15 domains exist.
At least 40 activities exist.
At least 20 writing samples exist.
At least 10 source records exist.
At least 60 evidence records exist.
A high-confidence scenario exists.
A medium-confidence scenario exists.
A low-confidence scenario exists.
Contradictions exist.
Independent corroboration exists.
Limited corroboration exists.
Temporal gaps exist.
Weak evidence exists.
Ground-truth labels exist for testing.
No operational real-world data is required.
43. Final Dataset Principle

The dataset should make DARKTRACE demonstrate:

The strongest-looking relationship is not always the strongest-supported relationship.

The system must be able to say:

Possible relationship

while also showing:

Why it is supported
Why it is weakened
What is missing
What should be investigated next

The dataset exists to test and demonstrate that behavior.
