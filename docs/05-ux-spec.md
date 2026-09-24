# DARKTRACE — UX SPECIFICATION

## 1. Purpose

This document defines the UX architecture and interface behavior for DARKTRACE.

DARKTRACE should feel like a professional intelligence and investigation platform.

The interface must prioritize:

- Evidence clarity
- Investigation workflow
- Explainability
- Relationships
- Contradictions
- Confidence
- Uncertainty
- Fast navigation
- Analyst readability

The UI must not feel like a generic cybersecurity dashboard.

---

# 2. Design Direction

## Visual Character

DARKTRACE should look:

- Professional
- Analytical
- Minimal
- Trustworthy
- Information-dense but readable
- Enterprise-grade
- Modern
- Serious

### Inspiration

The overall design language can take inspiration from:

- Linear
- Notion
- Arc
- Modern enterprise intelligence platforms
- Professional investigation / analytics software

### Avoid

Do NOT use:

- Cyberpunk aesthetics
- Neon green text
- Matrix backgrounds
- Excessive glowing borders
- Excessive gradients
- 3D dashboards
- Hacker stock imagery
- Excessive animations
- Decorative charts without analytical value

---

# 3. Color Direction

Primary interface:

- Neutral / white background
- Dark text
- Light gray borders
- Muted blue as primary accent

Semantic colors:

### Supporting Evidence

Use a restrained green treatment.

### Contradictory Evidence

Use a restrained red treatment.

### Unknown / Uncertain

Use neutral gray or amber.

### Confidence

HIGH:
- restrained green

MEDIUM:
- restrained amber

LOW:
- restrained gray / muted red

Colors must support meaning rather than decoration.

---

# 4. Typography

Typography should prioritize readability.

Suggested hierarchy:

## Page Title

Large, strong heading.

## Section Heading

Medium-weight heading.

## Body

Readable regular text.

## Metadata

Small muted text.

## Evidence IDs / Technical identifiers

Use a monospace font where appropriate.

Examples:

PGP-A
WALLET-A
INFRA-01
E-001
H-001

---

# 5. Application Structure

DARKTRACE uses a persistent application shell.

```text
┌──────────────────────────────────────────────────────────────┐
│ DARKTRACE                         Search      Profile       │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│ Dashboard     │                                              │
│               │                                              │
│ Personas      │              Main Content                    │
│               │                                              │
│ Hypotheses    │                                              │
│               │                                              │
│ Evidence      │                                              │
│               │                                              │
│ Reports       │                                              │
│               │                                              │
│ Settings      │                                              │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘

6. Primary Navigation

Sidebar navigation:

Dashboard
Personas
Hypotheses
Evidence
Reports

Secondary:

Settings

Bottom of sidebar:

Dataset version
Environment indicator
Application version

Example:

DARKTRACE
Connecting the Hidden Threads

Dashboard
Personas
Hypotheses
Evidence
Reports

──────────────

Dataset
Synthetic v1.0

Environment
Demo
7. Global Search

Global search should be available from the top navigation.

Search should support:

Persona names
Handles
Aliases
PGP IDs
Wallet IDs
Infrastructure IDs
Domains
Hypothesis IDs

Example:

Search DARKTRACE...

ShadowX
ShadowNova
PGP-A
WALLET-A
INFRA-01

Search results should display entity type.

Example:

ShadowX
Persona

PGP-A
PGP Identifier

WALLET-A
Cryptocurrency Wallet
8. Screen List

MVP screens:

S01 — Dashboard

Purpose:
Provide investigation overview.

S02 — Persona Directory

Purpose:
Browse and search personas.

S03 — Persona Profile

Purpose:
Understand one persona and its connected intelligence.

S04 — Relationship Graph

Purpose:
Explore relationships between entities.

S05 — Hypothesis Detail

Purpose:
Understand why two personas may or may not be connected.

S06 — Evidence Explorer

Purpose:
Inspect individual evidence records.

S07 — Timeline

Purpose:
Understand temporal activity.

S08 — Investigation Gaps

Purpose:
Identify missing or weak evidence.

S09 — Reports

Purpose:
Generate and access investigation reports.

9. Dashboard

Route:

/dashboard
Objective

Give the analyst an immediate overview of the intelligence environment.

Layout
┌─────────────────────────────────────────────────────────────┐
│ Dashboard                                                   │
│ Intelligence Overview                                      │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│ Personas    │ Hypotheses  │ Evidence    │ Gaps            │
│     8       │     10      │     60+      │     12         │
├─────────────┴─────────────┴─────────────┴─────────────────┤
│                                                             │
│ Recent / Important Hypotheses                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Evidence Distribution                                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Recent Activity Timeline                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
Dashboard Components
1. Overview Cards

Cards:

Total Personas
Total Hypotheses
Total Evidence
Open Investigation Gaps

Cards should be clickable.

2. Hypothesis Overview

Display:

Hypothesis ID
Persona A
Persona B
Confidence
Supporting evidence count
Contradictory evidence count
Open gaps

Example:

H-001

ShadowX  ↔  ShadowNova

Possible Persona Link

MEDIUM

4 Supporting
2 Contradictory
1 Investigation Gap
3. Evidence Distribution

Show evidence by category:

Identity
Infrastructure
Behavioural
Linguistic
Temporal

Do not use charts merely for decoration.

4. Recent Activity

Display recent analytical events:

09:42
Hypothesis H-001 analyzed

09:31
Evidence E-017 added

09:18
Persona ShadowNova updated
10. Persona Directory

Route:

/personas

Purpose:

Browse all personas.

Layout:

┌─────────────────────────────────────────────────────────────┐
│ Personas                                                    │
│ Search personas...                        Filters           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ShadowX                                                    │
│ 4 Handles · 1 PGP · 1 Wallet · 3 Infrastructure Links     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ShadowNova                                                 │
│ 3 Handles · 1 PGP · 1 Wallet · 2 Infrastructure Links     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
Filters

Possible filters:

Has PGP
Has Wallet
Has Infrastructure
Activity period
Evidence count
Confidence involvement
11. Persona Profile

Route:

/personas/[id]

This is one of the most important screens.

Header
ShadowX

Persona ID
P-001

Status
Active Dataset Entity

Last observed
2026-04-18
Identity Summary

Display connected identifiers:

Handles
ShadowX
Shadow_X
ShadowTrader

PGP
PGP-A

Wallets
WALLET-A

Infrastructure
INFRA-01

Domains
market-a.example
12. Persona Profile Layout
┌─────────────────────────────────────────────────────────────┐
│ ShadowX                                  P-001              │
│ Persona                                                     │
├─────────────────────────────────────────────────────────────┤
│ Identity Summary                                           │
├──────────────────────┬──────────────────────────────────────┤
│ Handles              │ PGP                                  │
│ ShadowX              │ PGP-A                                │
│ Shadow_X             │                                      │
├──────────────────────┼──────────────────────────────────────┤
│ Wallets              │ Infrastructure                       │
│ WALLET-A             │ INFRA-01                             │
├──────────────────────┴──────────────────────────────────────┤
│ Relationship Overview                                      │
│                                                             │
│                    GRAPH                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Timeline                                                    │
├─────────────────────────────────────────────────────────────┤
│ Related Hypotheses                                         │
└─────────────────────────────────────────────────────────────┘
13. Relationship Graph

The graph is the visual centerpiece of DARKTRACE.

Technology:

Cytoscape.js

The graph should show:

Nodes
Persona
Handle
PGP
Wallet
Infrastructure
Domain
Activity
Writing Sample
Evidence
Edges

Examples:

USES
ASSOCIATED_WITH
OPERATES
HOSTS
PERFORMED
AUTHORED
POSSIBLE_LINK
SUPPORTS
CONTRADICTS
14. Graph Interaction

Users should be able to:

Zoom
Pan
Select node
Expand relationships
Collapse relationships
Filter entity types
Highlight evidence paths
Open entity details

Clicking a node should open a detail panel.

Example:

PGP-A

Type
PGP Identifier

Connected Personas
2

Evidence
3

Source Groups
2

[View Evidence]
15. Graph Visual Hierarchy

Primary entities should be visually stronger than supporting entities.

Persona:

Large node

Handle / PGP / Wallet:

Medium node

Evidence / Source:

Small node

Relationships:

Thin lines.

Supporting relationship:

Subtle positive semantic indicator.

Contradictory relationship:

Subtle negative semantic indicator.

Do not make every graph element visually dominant.

16. Hypothesis Detail

Route:

/hypotheses/[id]

This screen explains the reasoning.

Example:

Possible Persona Link

ShadowX
   ↕
ShadowNova

Confidence
MEDIUM

Analytical Confidence: 62
Data Confidence: 71
17. Evidence Summary

Display:

Supporting Evidence
4

Contradictory Evidence
2

Unknown / Unresolved
1

Use separate sections.

18. Supporting Evidence

Example:

✓ Shared PGP Identifier

PGP-A appears in records associated
with both personas.

Strength
0.91

Source Reliability
0.88

Source Independence
0.82

Temporal Relevance
0.93

Another:

✓ Behavioural Similarity

Activity timing patterns overlap
during February–March 2026.

Strength
0.72
19. Contradictory Evidence

Example:

! Infrastructure Mismatch

ShadowX → INFRA-01
ShadowNova → INFRA-02

Severity
MEDIUM

Interpretation

Different infrastructure reduces confidence
but does not independently disprove the
relationship.

Important:

Contradictory evidence must be visible, not hidden.

20. Evidence Score Visualization

Each evidence item may display:

Evidence Strength

████████░░  82%

But avoid presenting the number as absolute truth.

Label it:

Analytical Contribution
82

or

Evidence Strength
High
21. Confidence Component

Confidence should be shown prominently.

Example:

┌───────────────────────────────┐
│       MODERATE CONFIDENCE     │
│                               │
│             62                │
│                               │
│ Supporting       4            │
│ Contradictory    2            │
│ Unknown          1            │
└───────────────────────────────┘

Below it:

Why?

Shared PGP and behavioural similarity
increase the hypothesis strength.

Different infrastructure and limited
independent corroboration reduce confidence.
22. Analytical vs Data Confidence

Always distinguish:

Analytical Confidence

How strongly the current evidence supports the hypothesis.

Data Confidence

How reliable and complete the underlying dataset is.

Example:

Analytical Confidence
62 / 100

Data Confidence
71 / 100

This distinction prevents false certainty.

23. Investigation Gaps

Investigation gaps should have their own visible section.

Example:

Investigation Gap

Independent corroboration of the PGP
relationship is missing.

Priority
HIGH

Current State
UNKNOWN
24. Next-Best Evidence

Display:

Next Best Evidence

Seek an independently sourced identifier
linking the two personas.

Why?

This would increase source independence
and reduce dependence on the current PGP signal.

Expected Value
HIGH

This should be one of the strongest product differentiators.

25. Timeline

Timeline route:

/personas/[id]/timeline

Timeline should show:

Date
Event
Entity
Source
Evidence relation

Example:

JAN 2026

Jan 08
ShadowX appears with PGP-A

Jan 17
WALLET-A observed

FEB 2026

Feb 03
ShadowNova appears with PGP-A

Feb 19
INFRA-02 associated with ShadowNova

MAR 2026

Mar 11
Behavioural overlap detected
26. Evidence Explorer

Route:

/evidence

Purpose:

Search and inspect evidence records.

Columns:

Evidence ID
Type
Category
Direction
Strength
Source
Hypothesis
Date

Example:

E-001
SHARED_PGP
IDENTITY
SUPPORTING
0.91
SRC-A
H-001
2026-03-12
27. Evidence Detail Drawer

Clicking an evidence record should open a side drawer.

Evidence E-001

Type
SHARED_PGP

Category
IDENTITY

Direction
SUPPORTING

Strength
0.91

Source Reliability
0.88

Source Independence
0.82

Temporal Relevance
0.93

Source
SRC-A

Observed
2026-03-12

Integrity Hash
SHA-256: ...

[View Source]
28. Reports

Route:

/reports

Display generated reports.

Example:

Investigation Report

H-001
ShadowX ↔ ShadowNova

Confidence
MEDIUM

Generated
24 Sep 2026

[Open]
[Export PDF]
[Export HTML]
29. Report Structure

Generated report should contain:

Investigation Summary
Personas
Relationship Graph
Supporting Evidence
Contradictory Evidence
Confidence
Timeline
Investigation Gaps
Next-Best Evidence
Data Sources
Integrity Hash
Disclaimer
30. Empty States

Every major screen must have a useful empty state.

Example:

No hypotheses yet.

Run an analysis to generate
evidence-backed relationship hypotheses.

[Analyze Dataset]

Do not show blank pages.

31. Loading States

Use skeleton loaders.

Example:

██████████████████
██████████

████████████████
████████

Avoid full-screen loading spinners unless absolutely necessary.

32. Error States

Errors should explain what happened.

Bad:

Error 500

Better:

Unable to load hypothesis.

The analytical service did not respond.

[Retry]

Developer information should be available in logs, not cluttering the user interface.

33. Dataset / Demo Indicator

Because the MVP uses synthetic/public demonstration data, the application should clearly indicate this.

Top-level indicator:

DEMO DATASET
Synthetic + Public OSINT-style Data

This prevents users from interpreting the demo dataset as live intelligence.

34. Responsive Behavior

Desktop is the primary target.

Minimum supported layout:

1280px+

Tablet:

Support basic navigation.

Mobile:

Not a primary MVP target.

If mobile is implemented, prioritize:

Search
Persona profile
Hypothesis summary
Evidence

Graph can become a simplified view.

35. Interaction Principles
Principle 1

Every important analytical number should have an explanation.

Principle 2

Every evidence claim should have provenance.

Principle 3

Contradictory evidence must remain visible.

Principle 4

Unknown must not be treated as false.

Principle 5

Similarity must never automatically equal attribution.

Principle 6

Users should be able to move from:

Hypothesis
→ Evidence
→ Source
→ Entity
→ Timeline

without losing context.

36. Component Architecture

Frontend components should eventually be organized approximately as:

components/

layout/
  Sidebar
  Topbar
  PageHeader

dashboard/
  MetricCard
  HypothesisCard
  EvidenceDistribution
  ActivityFeed

personas/
  PersonaCard
  PersonaHeader
  IdentitySummary
  RelatedHypotheses

graph/
  RelationshipGraph
  GraphToolbar
  GraphNodePanel

hypotheses/
  HypothesisHeader
  ConfidenceCard
  EvidenceSummary
  SupportingEvidence
  ContradictoryEvidence
  InvestigationGap
  NextBestEvidence

evidence/
  EvidenceTable
  EvidenceDrawer
  EvidenceScore

timeline/
  Timeline
  TimelineEvent

reports/
  ReportCard
  ReportPreview
37. Route Architecture

Recommended Next.js routes:

app/
├── page.tsx
├── dashboard/
│   └── page.tsx
├── personas/
│   ├── page.tsx
│   └── [id]/
│       ├── page.tsx
│       └── timeline/
│           └── page.tsx
├── hypotheses/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── evidence/
│   └── page.tsx
└── reports/
    ├── page.tsx
    └── [id]/
        └── page.tsx
38. Data → UI Mapping

The frontend must not invent analytical information.

Data flow:

FastAPI
   ↓
API Response
   ↓
Frontend Data Model
   ↓
UI Components
   ↓
User Interaction

Example:

Hypothesis API
      ↓
HypothesisHeader
ConfidenceCard
EvidenceSummary
ContradictionList
GapCard
NextEvidenceCard
39. Important UX Rule

Never display:

ShadowX = ShadowNova

Instead display:

Possible Persona Link

ShadowX ↔ ShadowNova

Confidence: MODERATE

The interface must communicate analytical uncertainty.

40. Figma Page Structure

The Figma file should contain these pages:

01 — Design System
02 — App Shell
03 — Dashboard
04 — Personas
05 — Persona Profile
06 — Relationship Graph
07 — Hypothesis Analysis
08 — Evidence
09 — Timeline
10 — Investigation Gaps
11 — Reports
12 — Prototype Flow
41. Figma Prototype Flow

The main prototype interaction should follow:

Dashboard
   ↓
Search ShadowX
   ↓
Persona Profile
   ↓
Open Relationship Graph
   ↓
Select ShadowNova
   ↓
Open Hypothesis H-001
   ↓
Inspect Supporting Evidence
   ↓
Inspect Contradictory Evidence
   ↓
View Timeline
   ↓
View Investigation Gap
   ↓
View Next-Best Evidence
   ↓
Generate Report

This is the primary demo path.

42. Figma Design Priority

The most important screens for the first design pass are:

Dashboard
Persona Profile
Relationship Graph
Hypothesis Detail
Evidence Detail
Investigation Gap

These screens should be designed before secondary screens.

43. MVP UX Success Criteria

The UX is successful if a new user can:

Find a persona within seconds.
Understand its connected entities.
Identify possible relationships.
Understand why a relationship exists.
See supporting evidence.
See contradictory evidence.
Understand confidence and uncertainty.
Identify missing evidence.
Understand what evidence should be investigated next.
Generate an investigation report.

The interface should make the analytical reasoning understandable without requiring the user to inspect the underlying code.

44. Core UX Principle

DARKTRACE is not simply a graph visualization tool.

The primary experience is:

Evidence
→ Relationship
→ Explanation
→ Contradiction
→ Confidence
→ Gap
→ Next Evidence

The UI should make this reasoning chain obvious.

45. Final Product Experience

The final user should leave the investigation understanding:

What is connected?

Why does DARKTRACE think it may be connected?

What evidence supports it?

What evidence contradicts it?

How confident is the analysis?

What is still unknown?

What should be investigated next?

That is the core UX of DARKTRACE.