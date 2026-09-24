# DARKTRACE - Analytical Engine Specification

## Document Information

| Field | Value |
|---|---|
| Product | DARKTRACE |
| Version | MVP v1.0 |
| Component | Analytical Engine |
| Purpose | Evidence evaluation, contradiction handling, confidence assessment and investigation-gap analysis |
| Status | Design Specification |

---

# 1. Purpose

The DARKTRACE Analytical Engine converts fragmented intelligence into explainable evidence assessments.

The engine does not attempt to determine the real-world identity of an individual.

Instead, it evaluates a hypothesis using:

- Supporting evidence
- Contradictory evidence
- Source reliability
- Source independence
- Signal strength
- Specificity
- Temporal relevance
- Corroboration
- Evidence category coverage

The engine produces:

1. Evidence-strength assessment
2. Confidence band
3. Supporting evidence explanation
4. Contradictory evidence explanation
5. Investigation gaps
6. Next-best evidence recommendation

---

# 2. Core Principle

The analytical engine follows:

> Similarity or correlation is evidence, not proof.

No individual evidence type may independently establish identity.

For example:

- Shared PGP
- Shared wallet
- Writing similarity
- Infrastructure similarity
- Behavioural similarity

must not automatically result in a definitive attribution.

The system must evaluate multiple signals together while preserving contradictions and uncertainty.

---

# 3. Analytical Pipeline

```text
Raw Evidence
     ↓
Evidence Validation
     ↓
Evidence Normalization
     ↓
Source Assessment
     ↓
Signal Assessment
     ↓
Temporal Assessment
     ↓
Specificity Assessment
     ↓
Independence Assessment
     ↓
Corroboration
     ↓
Supporting / Contradictory Classification
     ↓
Evidence Aggregation
     ↓
Confidence Band
     ↓
Investigation Gap Analysis
     ↓
Next-Best Evidence
4. Hypothesis Model

A hypothesis represents a possible relationship between two personas.

Example:

Subject:
ShadowX

Candidate:
ShadowNova

Hypothesis:
Possible Persona Link

A hypothesis contains:

hypothesis_id
subject_persona_id
candidate_persona_id
status
support_score
contradiction_score
evidence_strength
confidence_band
created_at
updated_at
5. Evidence Categories

Evidence is categorized to prevent one signal type from dominating the entire analysis.

5.1 Identity / Identifier Evidence

Examples:

PGP
Wallet
Handle
Alias

Category:

IDENTITY
5.2 Infrastructure Evidence

Examples:

Domain
Hosting indicator
Infrastructure identifier
Infrastructure continuity

Category:

INFRASTRUCTURE
5.3 Behavioural Evidence

Examples:

Activity patterns
Marketplace behaviour
Operational timing
Repeated behavioural patterns

Category:

BEHAVIOURAL
5.4 Linguistic Evidence

Examples:

Stylometric similarity
Semantic similarity
Vocabulary characteristics

Category:

LINGUISTIC
5.5 Temporal Evidence

Examples:

Activity overlap
Temporal continuity
Historical sequence
Activity gaps

Category:

TEMPORAL
6. Evidence Direction

Every evidence item must have a direction.

SUPPORTING
CONTRADICTORY
NEUTRAL
Supporting

The observation increases the strength of the hypothesis.

Contradictory

The observation weakens the hypothesis or increases uncertainty.

Neutral

The observation is relevant but does not materially strengthen or weaken the hypothesis.

7. Evidence Input Model

Each evidence item should contain:

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
  "source_id": "SRC-001",
  "independence_group": "GROUP-A",
  "observation_timestamp": "2026-03-14T12:00:00Z"
}

All numerical factors must be normalized between:

0.0 and 1.0
8. Evidence Factor Definitions
8.1 Signal Strength

Measures how strongly the observation represents the relationship being evaluated.

Example:

Direct identifier association:
0.90 - 1.00

Strong behavioural relationship:
0.70 - 0.89

Moderate similarity:
0.40 - 0.69

Weak similarity:
0.10 - 0.39

No meaningful signal:
0.00 - 0.09

These values are heuristic prototype values.

They are not scientifically calibrated probabilities.

9. Source Reliability

Source reliability represents how trustworthy the source is considered within the dataset.

Example scale:

1.00
Highly reliable / strongly validated source

0.80
Reliable source

0.60
Moderately reliable source

0.40
Limited reliability

0.20
Low reliability

0.00
Unusable source

Source reliability should be stored as source metadata rather than manually entered repeatedly for every evidence item.

10. Source Independence

Source independence measures whether the evidence comes from an independent information channel.

Each source receives an:

independence_group

Example:

Source A → GROUP-A
Source B → GROUP-B
Source C → GROUP-A

A and C may contain separate records but are not considered independent corroboration if they originate from the same underlying source group.

11. Specificity

Specificity measures how uniquely the evidence relates to the hypothesis.

Example:

High specificity

A unique identifier observed in association with a specific persona.

0.90 - 1.00
Medium specificity

A relatively distinctive behavioural pattern.

0.50 - 0.89
Low specificity

A common writing characteristic or generic behaviour.

0.10 - 0.49
12. Temporal Relevance

Temporal relevance measures how relevant the observation's timing is to the hypothesis.

Consider:

Activity overlap
Observation proximity
Historical continuity
Temporal gaps

Normalized:

0.0 - 1.0

A direct observation during the relevant period should generally have higher temporal relevance than an observation separated by a significant unexplained gap.

13. Base Evidence Score

For each evidence item:

E = S × R × I × P × T

Where:

S = Signal Strength
R = Source Reliability
I = Source Independence
P = Specificity
T = Temporal Relevance

Therefore:

0 ≤ E ≤ 1

Example:

S = 0.95
R = 0.80
I = 0.70
P = 0.95
T = 0.90

E = 0.95 × 0.80 × 0.70 × 0.95 × 0.90

E ≈ 0.455

The resulting score is an internal evidence-strength value.

It is not:

45.5% probability of common ownership
14. Direction Handling

Evidence score is interpreted according to direction.

SUPPORTING
→ contributes to support

CONTRADICTORY
→ contributes to contradiction

NEUTRAL
→ does not materially affect the hypothesis

The original evidence score must always remain visible.

The system should not hide the underlying evidence because of aggregation.

15. Evidence Category Caps

To prevent one category from dominating the entire analysis, each evidence category receives a maximum contribution.

Initial prototype category weights:

IDENTITY          30%
INFRASTRUCTURE    20%
BEHAVIOURAL       15%
LINGUISTIC        15%
TEMPORAL          20%

These values represent prototype design weights.

They do not represent scientific or investigative standards.

The exact implementation should ensure that ten weak linguistic observations cannot automatically overpower a meaningful infrastructure contradiction.

16. Category Aggregation

For each evidence category:

Category Evidence
       ↓
Individual Evidence Scores
       ↓
Independence Group Deduplication
       ↓
Diminishing Returns
       ↓
Category Score

The engine should avoid simple unlimited summation.

17. Diminishing Returns

Multiple pieces of similar evidence should provide decreasing additional value.

Example:

First independent supporting observation
→ full contribution

Second related observation
→ reduced contribution

Third related observation
→ further reduced contribution

Conceptual formula:

Contribution(n) =
Score(n) × DiminishingFactor(n)

Prototype diminishing factors may be:

1st relevant independent signal: 1.00
2nd: 0.70
3rd: 0.45
4th+: 0.25

These are prototype heuristics.

18. Source Independence Deduplication

Evidence from the same independence group must not receive full corroboration credit repeatedly.

Example:

Evidence 1 → Source A → GROUP-A
Evidence 2 → Source C → GROUP-A
Evidence 3 → Source B → GROUP-B

Effective independent groups:

GROUP-A
GROUP-B

Therefore:

Independent corroboration count = 2

not 3.

19. Corroboration Bonus

Independent corroboration can increase confidence.

Initial prototype rule:

1 independent group
→ no corroboration bonus

2 independent groups
→ small bonus

3 independent groups
→ moderate bonus

4+ independent groups
→ capped bonus

The bonus must be capped so that many sources cannot produce unlimited confidence.

Suggested maximum:

Corroboration bonus ≤ 0.15
20. Supporting Evidence Aggregation

Conceptual process:

Supporting evidence
        ↓
Category grouping
        ↓
Independence deduplication
        ↓
Diminishing returns
        ↓
Category caps
        ↓
Corroboration bonus
        ↓
Support score

The support score is normalized to:

0 - 100
21. Contradiction Model

Contradictory evidence must be calculated separately.

Examples:

Different infrastructure
Temporal gap
Conflicting PGP association
Conflicting wallet association
Behavioural inconsistency
Source conflict
Missing expected continuity

Each contradiction has:

severity
evidence_score
category
source
timestamp
description
22. Contradiction Severity

Initial prototype severity:

LOW
MEDIUM
HIGH

Example:

LOW

Minor writing-style difference.

MEDIUM

Different infrastructure during a relevant period.

HIGH

Strong independently sourced identifier conflict.

Severity is not equivalent to guilt or innocence.

It represents how strongly the observation conflicts with the hypothesis.

23. Contradiction Score

Conceptually:

Contradiction Contribution =
Evidence Score × Contradiction Severity

Prototype severity multipliers:

LOW       = 0.50
MEDIUM    = 0.75
HIGH      = 1.00

Contradiction contributions are then aggregated using the same:

Independence handling
Diminishing returns
Category caps

principles.

24. Evidence Strength

After calculating support and contradiction:

Net Evidence =
Support Score - Contradiction Penalty

The raw result is normalized into:

0 - 100

However, the engine must apply a minimum-evidence rule before assigning a high confidence band.

25. Minimum Evidence Rule

A high confidence band should require more than a high numerical score.

Example requirements:

At least 2 meaningful evidence categories

AND

At least 2 independent source groups

AND

No unresolved high-severity contradiction

This prevents a single strong signal from producing a misleading HIGH result.

26. Confidence Bands

Initial thresholds:

0 - 34
LOW

35 - 69
MEDIUM

70 - 100
HIGH

Then apply minimum-evidence rules.

Example:

Score = 78

But:
Only one evidence category
Only one source group

Final:
MEDIUM

This makes the system more conservative.

27. Confidence Output

The engine should return:

{
  "evidence_strength": 68,
  "confidence_band": "MEDIUM",
  "support_score": 74,
  "contradiction_score": 21,
  "evidence_categories": [
    "IDENTITY",
    "LINGUISTIC",
    "BEHAVIOURAL",
    "TEMPORAL"
  ],
  "independent_source_groups": 2,
  "high_severity_contradictions": 0
}
28. Explainability Output

The analytical engine must produce an explanation.

Example:

{
  "summary": "Moderate evidence supports a possible relationship, but meaningful uncertainty remains.",
  "supporting_factors": [
    "Shared PGP identifier",
    "Semantic writing similarity",
    "Behavioural similarity",
    "Activity overlap"
  ],
  "contradictory_factors": [
    "Different infrastructure",
    "Temporal activity gap"
  ],
  "uncertainty": [
    "Limited independent corroboration"
  ]
}

The explanation must be generated from actual evidence records.

29. Evidence Contribution Breakdown

The UI should be able to display:

Evidence Contribution

Shared PGP
██████████████████
Strong

Writing similarity
████████████
Moderate

Behaviour similarity
██████████
Moderate

Infrastructure mismatch
████████
Contradictory

Temporal gap
██████
Contradictory

The visual representation must come from backend scores.

30. Evidence Quality State

Each evidence item should have a quality state:

STRONG
MODERATE
WEAK
INSUFFICIENT

This is separate from direction.

Example:

SUPPORTING + STRONG

SUPPORTING + WEAK

CONTRADICTORY + STRONG
31. Investigation Gap Model

A gap exists when the current evidence state contains:

Missing evidence
Weak evidence
Contradictory evidence
Limited corroboration
Temporal uncertainty

Gap structure:

{
  "gap_id": "G-001",
  "type": "LIMITED_CORROBORATION",
  "description": "The PGP relationship is supported by only one independent source group.",
  "impact": 0.85,
  "uncertainty": 0.80,
  "investigative_value": 0.90,
  "priority": 0.612,
  "recommended_action": "Seek an independently sourced observation connecting the PGP identifier to the candidate persona."
}
32. Gap Impact

Impact asks:

If this gap were resolved, how much could it change the current hypothesis?

Scale:

0.0 - 1.0

High impact:

Evidence directly affecting a major relationship.

Low impact:

Minor contextual information.
33. Gap Uncertainty

Uncertainty measures how incomplete or unreliable the current evidence is.

Examples:

No evidence available
→ high uncertainty

Weak single-source evidence
→ high uncertainty

Multiple independent observations
→ lower uncertainty
34. Investigative Value

Investigative value measures how useful obtaining the evidence would be.

High value:

Evidence could confirm or significantly weaken
an important relationship.

Low value:

Evidence would provide only minor contextual detail.
35. Gap Priority

Initial formula:

Gap Priority =
Impact × Uncertainty × Investigative Value

Range:

0.0 - 1.0

Priority bands:

0.00 - 0.29
LOW

0.30 - 0.59
MEDIUM

0.60 - 1.00
HIGH

These are prototype prioritization bands.

36. Next-Best Evidence Selection

The engine selects the highest-value unresolved gap.

Process:

All gaps
   ↓
Calculate priority
   ↓
Remove resolved gaps
   ↓
Sort by priority
   ↓
Select highest-priority gap
   ↓
Map to investigative direction

The recommendation must explain:

What is missing.
Why it matters.
What type of evidence would reduce uncertainty.
37. Recommendation Templates

The MVP may use deterministic templates.

PGP corroboration
Seek an independently sourced observation connecting the
PGP identifier to the candidate persona.
Infrastructure continuity
Investigate historical infrastructure observations during
the relevant activity period.
Temporal uncertainty
Investigate additional observations covering the activity gap.
Writing evidence
Obtain additional independently sourced writing samples
from the relevant time period.
Wallet relationship
Seek independent evidence corroborating the wallet association.

The system should not invent evidence or claim that the recommended evidence exists.

38. Evidence Gap Categories
MISSING_IDENTIFIER
LIMITED_CORROBORATION
WEAK_SOURCE
INFRASTRUCTURE_GAP
TEMPORAL_GAP
LINGUISTIC_UNCERTAINTY
BEHAVIOURAL_UNCERTAINTY
CONFLICTING_IDENTIFIER
SOURCE_CONFLICT
39. Example: ShadowX ↔ ShadowNova

Input evidence:

Shared PGP
Semantic similarity
Behaviour similarity
Activity overlap

Contradictions:

Different infrastructure
Temporal gap

Source state:

Limited independent corroboration

Expected output:

Confidence:
MEDIUM

Explanation:

The relationship is supported by multiple signals,
including a shared PGP identifier, behavioural similarity,
semantic writing similarity and partial activity overlap.

However, the personas use different infrastructure and
have a temporal gap. Independent corroboration of the
PGP relationship is limited.

Gap:

LIMITED_CORROBORATION

Recommendation:

Seek an independently sourced observation connecting
the PGP identifier to the candidate persona.
40. Example: Strong Relationship

Evidence:

PGP association
Wallet association
Infrastructure continuity
Temporal continuity
Independent corroboration

Contradictions:

Minor linguistic difference

Expected:

High evidence strength
HIGH confidence band

Provided that minimum evidence requirements are satisfied.

41. Example: Weak Relationship

Evidence:

Semantic writing similarity

Contradictions:

Different PGP
Different wallet
Different infrastructure
No temporal overlap

Expected:

LOW confidence band

The system should explicitly state that writing similarity alone is insufficient.

42. Example: No Meaningful Relationship

Evidence:

No meaningful shared identifiers
No meaningful behavioural relationship
No temporal overlap
No infrastructure relationship

Expected:

LOW

The system should not manufacture a relationship.

43. Preventing Score Manipulation

The engine must avoid situations where:

10 weak signals

automatically defeat:

1 strong contradiction

Controls:

Category caps
Diminishing returns
Independence deduplication
High-severity contradiction handling
Minimum evidence requirements
Maximum corroboration bonus
44. High-Severity Contradiction Rule

A high-severity contradiction should prevent a HIGH confidence result unless there is sufficient independent evidence that directly resolves the contradiction.

Example:

Score:
82

High-severity unresolved contradiction:
YES

Final confidence:
MEDIUM

This makes the system conservative.

45. Missing Evidence Rule

Missing evidence should not automatically be treated as contradictory evidence.

Important distinction:

Missing evidence
≠
Contradictory evidence

Example:

No infrastructure relationship observed:

UNKNOWN

Different independently observed infrastructure during the same period:

CONTRADICTORY

This distinction must be preserved.

46. Unknown State

The engine should support:

SUPPORTED
CONTRADICTED
UNKNOWN

This prevents absence of information from being interpreted as evidence against a hypothesis.

47. Analytical Confidence vs Data Confidence

DARKTRACE should distinguish:

Analytical confidence

How strongly the current evidence supports the hypothesis.

Data confidence

How reliable and complete the underlying dataset is.

Example:

Analytical Confidence:
MEDIUM

Data Quality:
LOW

Reason:
Several observations originate from limited sources.

This provides additional transparency.

48. Data Quality Indicators

The engine should calculate:

Source coverage
Temporal coverage
Evidence completeness
Independent source count
Missing fields
Conflicting records

These can be summarized as:

DATA QUALITY
Good
Moderate
Limited

This is not the same as attribution confidence.

49. Provenance Requirements

Every analytical result must be traceable to:

Hypothesis
   ↓
Evidence
   ↓
Source
   ↓
Observation

Example:

Confidence: MEDIUM
       ↓
Support score: 74
       ↓
Evidence E-001
       ↓
Source SRC-001
       ↓
Observation: 2026-03-14
50. Reproducibility

Given the same:

Dataset
+
Configuration
+
Algorithm version

the analytical engine should produce the same result.

Therefore, analytical results should store:

engine_version
configuration_version
calculated_at
51. Versioning

Example:

engine_version:
1.0.0

scoring_config:
1.0

gap_algorithm:
1.0

If scoring rules change later, historical results can be distinguished from new calculations.

52. Analytical Result Schema

Example:

{
  "hypothesis_id": "H-001",
  "engine_version": "1.0.0",
  "support_score": 74,
  "contradiction_score": 21,
  "evidence_strength": 68,
  "confidence_band": "MEDIUM",
  "independent_source_groups": 2,
  "supporting_categories": [
    "IDENTITY",
    "LINGUISTIC",
    "BEHAVIOURAL",
    "TEMPORAL"
  ],
  "contradictory_categories": [
    "INFRASTRUCTURE",
    "TEMPORAL"
  ],
  "high_severity_contradictions": 0,
  "calculated_at": "2026-09-24T00:00:00Z"
}
53. Configuration

Scoring parameters must be configurable.

Example:

confidence:
  low_max: 34
  medium_max: 69
  high_min: 70

category_weights:
  identity: 0.30
  infrastructure: 0.20
  behavioural: 0.15
  linguistic: 0.15
  temporal: 0.20

corroboration:
  max_bonus: 0.15

contradiction:
  low_multiplier: 0.50
  medium_multiplier: 0.75
  high_multiplier: 1.00

The exact configuration will be stored separately from application code.

54. Explainability Requirements

For every confidence result, the API must be able to answer:

Why did the score increase?

Example:

Shared PGP identifier
+
Independent corroboration
+
Activity overlap
Why did the score decrease?

Example:

Different infrastructure
+
Temporal gap
What is uncertain?

Example:

Only one independent source group supports the PGP relationship.
What should be investigated next?

Example:

Independent PGP corroboration.
55. API Contract for Analytical Engine

The analytical engine should expose a service-level interface.

Example:

analyze_hypothesis(hypothesis_id)

Returns:

{
  "hypothesis_id": "H-001",
  "support_score": 74,
  "contradiction_score": 21,
  "evidence_strength": 68,
  "confidence_band": "MEDIUM",
  "supporting_evidence": [],
  "contradictory_evidence": [],
  "uncertainties": [],
  "gaps": [],
  "next_best_evidence": {}
}
56. Engine Modules

The analytical engine will be divided into:

engines/
│
├── evidence/
│   ├── scoring.py
│   ├── aggregation.py
│   └── corroboration.py
│
├── contradiction/
│   ├── detection.py
│   └── scoring.py
│
├── attribution/
│   ├── hypothesis.py
│   └── confidence.py
│
├── gap_analysis/
│   ├── detection.py
│   ├── prioritization.py
│   └── recommendation.py
│
└── common/
    ├── models.py
    └── configuration.py
57. Engine Execution Flow
analyze_hypothesis(H-001)
          ↓
Load hypothesis
          ↓
Load evidence
          ↓
Validate evidence
          ↓
Classify direction
          ↓
Calculate evidence scores
          ↓
Group by category
          ↓
Apply independence rules
          ↓
Apply diminishing returns
          ↓
Apply category caps
          ↓
Calculate corroboration
          ↓
Calculate contradictions
          ↓
Calculate net evidence
          ↓
Apply minimum evidence rules
          ↓
Assign confidence band
          ↓
Detect investigation gaps
          ↓
Prioritize gaps
          ↓
Generate next-best evidence
          ↓
Return explainable result
58. Determinism Requirement

For MVP:

Same input
+
Same configuration
+
Same engine version
=
Same result

The core confidence calculation must not depend on an LLM response.

LLMs may optionally be used in the future to improve narrative summaries, but the underlying analytical result must remain deterministic.

59. LLM Boundary

If an LLM is introduced later:

The LLM may:

Summarize evidence
Generate readable explanations
Convert structured findings into natural language

The LLM must not:

Invent evidence
Modify evidence scores
Decide confidence independently
Create unsupported relationships
Override contradictions

The structured analytical engine remains authoritative.

60. Auditability

Every analysis should record:

hypothesis_id
engine_version
configuration_version
input_evidence_ids
support_score
contradiction_score
final_score
confidence_band
gap_ids
calculated_at

This allows the analysis to be reproduced and reviewed.

61. Limitations

The MVP analytical engine is:

Heuristic
Rule-based
Demonstration-oriented
Not statistically calibrated
Not a forensic attribution standard
Not a legal attribution mechanism

Scores should therefore be interpreted as structured evidence assessments.

62. Final Analytical Principle

DARKTRACE follows:

Evidence
    ↓
Context
    ↓
Corroboration
    ↓
Contradiction
    ↓
Uncertainty
    ↓
Confidence
    ↓
Investigation Gap
    ↓
Next Evidence

The system does not conclude:

"This is the person."

It concludes:

"Given the currently available evidence, this relationship has this level of support, these contradictions remain, and this evidence would be most useful to investigate next."