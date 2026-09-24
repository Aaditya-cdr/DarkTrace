# DARKTRACE — FRONTEND ARCHITECTURE

## 1. Purpose

This document translates the approved DARKTRACE Figma prototype into a scalable Next.js frontend architecture.

The frontend must reproduce the approved Figma design while keeping analytical logic inside the backend.

The frontend is responsible for:

- UI
- navigation
- visualization
- interaction
- API consumption
- loading states
- error states
- responsive behavior

The frontend must NOT independently calculate attribution confidence.

---

# 2. Frontend Stack

Framework:

Next.js

Language:

TypeScript

Styling:

Tailwind CSS

UI:

Reusable React components

Icons:

Lucide React

Graph:

Cytoscape.js

Charts:

Use lightweight charting only where analytically useful.

State:

Start with React state and server/API data.

Do not introduce Redux unless application complexity later requires it.

---

# 3. Application Architecture

```text
Next.js Frontend
        │
        ▼
UI Components
        │
        ▼
API Client Layer
        │
        ▼
FastAPI Backend
        │
        ├── PostgreSQL
        ├── Neo4j
        └── Analytical Engine

The frontend must never directly connect to PostgreSQL or Neo4j.

4. Next.js Structure

Recommended structure:

frontend/
├── app/
│   ├── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── personas/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── timeline/
│   │           └── page.tsx
│   │
│   ├── hypotheses/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── evidence/
│   │   └── page.tsx
│   │
│   └── reports/
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
│
├── components/
│   ├── layout/
│   ├── ui/
│   ├── dashboard/
│   ├── personas/
│   ├── graph/
│   ├── hypotheses/
│   ├── evidence/
│   ├── timeline/
│   └── reports/
│
├── lib/
│   ├── api/
│   ├── types/
│   └── utils/
│
├── hooks/
│
├── public/
│
└── styles/
5. Application Shell

Create reusable:

AppShell
Sidebar
Topbar
PageContainer
PageHeader

Structure:

AppShell
├── Sidebar
├── Topbar
└── MainContent

Every application page should use the same shell.

6. Design System Components

Create reusable components:

Button
Input
SearchInput
Badge
Card
MetricCard
Tabs
Tooltip
Drawer
Modal
Toast
Skeleton
EmptyState
ErrorState

Do not duplicate these components across pages.

7. Semantic Components

Create DARKTRACE-specific components:

ConfidenceCard
EvidenceCard
ContradictionCard
InvestigationGapCard
NextBestEvidenceCard
HypothesisCard
PersonaCard
EntityBadge
Timeline
RelationshipGraph
EvidenceDrawer
EntityDrawer
ReportPreview

These components should consume backend data rather than hardcoded analytical results.

8. Dashboard Architecture

Dashboard:

DashboardPage
├── PageHeader
├── MetricGrid
│   ├── MetricCard
│   ├── MetricCard
│   ├── MetricCard
│   └── MetricCard
│
├── ActiveHypotheses
│   └── HypothesisCard
│
├── EvidenceDistribution
│
└── RecentActivity
9. Persona Architecture

Persona page:

PersonaPage
├── PersonaHeader
├── IdentitySummary
├── RelationshipOverview
│   └── RelationshipGraph
├── TimelinePreview
└── RelatedHypotheses
10. Graph Architecture

The graph must be data-driven.

Input:

nodes
edges

Example:

type GraphNode = {
  id: string;
  type: string;
  label: string;
  metadata?: Record<string, unknown>;
};

type GraphEdge = {
  id: string;
  source: string;
  target: string;
  relationship: string;
  direction?: "supporting" | "contradictory" | "unknown";
};

Cytoscape should transform backend graph data into its internal format.

The graph must NOT contain hardcoded ShadowX relationships in production code.

Synthetic demo data belongs in the dataset/backend.

11. Hypothesis Architecture
HypothesisPage
├── HypothesisHeader
├── ConfidenceCard
├── ConfidenceExplanation
├── SupportingEvidence
│   └── EvidenceCard
├── ContradictoryEvidence
│   └── ContradictionCard
├── Timeline
├── InvestigationGapCard
└── NextBestEvidenceCard
12. Evidence Architecture

Evidence page:

EvidencePage
├── PageHeader
├── Search
├── Filters
└── EvidenceTable

Selecting an evidence item:

EvidenceTable
      ↓
EvidenceDrawer

The drawer must preserve the underlying page state.

13. API Layer

Create a centralized API client.

Example:

lib/api/
├── client.ts
├── personas.ts
├── hypotheses.ts
├── evidence.ts
├── reports.ts
└── graph.ts

Do not scatter raw fetch() calls throughout UI components.

14. API Functions

Expected frontend API functions:

getPersonas()

getPersona(id)

searchPersonas(query)

getPersonaGraph(id)

getPersonaTimeline(id)

getPersonaEvidence(id)

getHypotheses()

getHypothesis(id)

getHypothesisEvidence(id)

getHypothesisGaps(id)

analyzeHypothesis(payload)

getEvidence()

getReports()

getReport(id)

generateReport(payload)
15. Environment

Frontend environment:

NEXT_PUBLIC_API_URL

Example:

NEXT_PUBLIC_API_URL=http://localhost:8000

Never hardcode:

http://localhost:8000

inside components.

16. Data Types

Create shared frontend types.

Example:

lib/types/
├── persona.ts
├── hypothesis.ts
├── evidence.ts
├── graph.ts
├── timeline.ts
└── report.ts
17. Persona Type

Conceptual structure:

type Persona = {
  id: string;
  name: string;
  handles: string[];
  pgpIds: string[];
  walletIds: string[];
  infrastructureIds: string[];
  domains: string[];
};
18. Hypothesis Type
type Hypothesis = {
  id: string;
  personaA: PersonaReference;
  personaB: PersonaReference;

  status: string;

  analyticalConfidence: number;
  dataConfidence: number;

  supportingEvidenceCount: number;
  contradictoryEvidenceCount: number;
  unknownEvidenceCount: number;

  explanation: string;
};
19. Evidence Type
type Evidence = {
  id: string;
  type: string;
  category: string;

  direction:
    | "supporting"
    | "contradictory"
    | "unknown";

  strength: number;
  sourceReliability: number;
  sourceIndependence: number;
  temporalRelevance: number;

  sourceId: string;
  observedAt: string;

  description: string;
};
20. Loading States

Every API-driven page must support:

Loading
Success
Empty
Error

Example:

Page
├── LoadingState
├── Content
├── EmptyState
└── ErrorState

Do not allow blank screens during API loading.

21. Error Handling

API errors should be converted into user-readable messages.

Example:

Unable to load hypothesis.

The analytical service did not respond.

[Retry]

Raw stack traces should never appear in the production UI.

22. Animation System

Use subtle transitions.

Recommended:

150–250ms
ease-out

Animations:

Page transitions
Drawer transitions
Card hover
Graph selection
Evidence reveal
Timeline reveal

Do not animate analytical values in a way that implies certainty.

23. Frontend Data Rule

The frontend must never calculate:

attribution score
confidence band
evidence score
contradiction penalty
corroboration bonus
investigation gap priority

These belong to the backend analytical engine.

Frontend only displays the result.

24. Demo Data Rule

Do not hardcode analytical content directly inside UI components.

Bad:

const confidence = 62;

Good:

const { analyticalConfidence } = hypothesis;

The backend should provide the value.

25. Security

Frontend must:

Validate user input
Avoid exposing secrets
Never contain database credentials
Never contain private API keys
Avoid rendering untrusted HTML
Sanitize report content where necessary
Use HTTPS in production
26. Performance

Important optimization areas:

Lazy-load Cytoscape
Avoid unnecessary graph rerenders
Paginate large evidence tables
Debounce global search
Memoize expensive graph transformations
Lazy-load report preview where appropriate
27. Component Responsibility

Each component should have one clear responsibility.

Bad:

HypothesisPage

containing:

API calls
scoring logic
graph transformation
evidence calculations
UI
report generation

Good:

Page
 ↓
Data Hook
 ↓
API Layer
 ↓
Typed Data
 ↓
Presentational Components
28. State Management

MVP:

Use:

React state
URL state
server/API data

Do not introduce a global state library unless required.

Local UI state examples:

selectedNode
selectedEvidence
drawerOpen
activeFilter
searchQuery

Server data:

personas
hypotheses
evidence
graph
timeline
reports
29. URL State

Important investigation state should be shareable through URLs.

Examples:

/personas/P-001

/hypotheses/H-001

/evidence?type=SHARED_PGP

/personas/P-001/timeline
30. Implementation Priority

Build in this order:

Phase 1

App Shell

Phase 2

Design System Components

Phase 3

Dashboard

Phase 4

Persona Profile

Phase 5

Relationship Graph

Phase 6

Hypothesis Analysis

Phase 7

Evidence

Phase 8

Timeline

Phase 9

Investigation Gaps

Phase 10

Reports

31. Figma → Code Rule

The Figma prototype is the visual reference.

However, do not blindly convert every Figma layer into a React component.

Translate:

Figma visual structure
→ reusable UI component
→ typed data
→ API-driven state

Do not reproduce unnecessary design-tool complexity in code.

32. Final Architecture
                 DARKTRACE FRONTEND

                      Next.js
                         │
              ┌──────────┴──────────┐
              │                     │
         App Router            Components
              │                     │
              │              ┌──────┴──────┐
              │              │             │
              │           Generic      Analytical
              │           Components   Components
              │
              ▼
           API Layer
              │
              ▼
          FastAPI Backend
              │
       ┌──────┼──────┐
       │      │      │
   PostgreSQL Neo4j NLP
              │
              ▼
       Analytical Engine
              │
              ▼
        Evidence-backed
          Hypotheses
33. Success Criteria

Frontend implementation is successful when:

Figma visual language is preserved.
Navigation works.
All major screens are connected.
Data comes from APIs.
Graph is dynamic.
Evidence is dynamic.
Confidence is backend-driven.
Contradictions are visible.
Investigation gaps are visible.
Next-best evidence is visible.
Reports are generated from real backend data.
No important analytical information is hardcoded into UI components.
