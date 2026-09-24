# DARKTRACE — FIGMA DESIGN SYSTEM

## 1. Purpose

This document defines the visual design system for DARKTRACE.

The goal is to create a consistent, professional intelligence-platform interface that can later be translated directly into Next.js + Tailwind CSS.

The design system must support:

- Investigation workflows
- Evidence-heavy interfaces
- Relationship graphs
- Confidence visualization
- Contradictions
- Timelines
- Reports
- Dense analytical information

---

# 2. Design Philosophy

DARKTRACE should feel like:

- Professional intelligence software
- Modern enterprise analytics
- Investigation tooling
- Clean research software

It should NOT feel like:

- A gaming interface
- A cyberpunk dashboard
- A hacker-themed website
- A generic SaaS landing page

Primary principle:

> Information hierarchy over decoration.

---

# 3. Design Tokens

All visual values should eventually become reusable design tokens.

Example:

```text
colors
spacing
radius
typography
shadows
borders

The frontend should consume these tokens rather than hardcoding values repeatedly.

4. Color System
Base Colors

Primary background:

#F8FAFC

Surface:

#FFFFFF

Secondary surface:

#F1F5F9

Primary text:

#0F172A

Secondary text:

#475569

Muted text:

#64748B

Border:

#E2E8F0

Strong border:

#CBD5E1
5. Brand Accent

Primary DARKTRACE accent:

#2563EB

Accent hover:

#1D4ED8

Accent light:

#EFF6FF

Accent text:

#1E40AF

Use blue primarily for:

Primary actions
Selected navigation
Links
Interactive graph states
Focus states
Important analytical navigation

Do not use blue everywhere.

6. Semantic Colors
Supporting

Base:

#16A34A

Light:

#F0FDF4

Text:

#166534
Contradictory

Base:

#DC2626

Light:

#FEF2F2

Text:

#991B1B
Warning / Uncertain

Base:

#D97706

Light:

#FFFBEB

Text:

#92400E
Neutral / Unknown

Base:

#64748B

Light:

#F8FAFC

Text:

#475569
7. Confidence Colors

Confidence should be semantic.

HIGH

Use restrained green.

Background: #F0FDF4
Text: #166534
Border: #BBF7D0
MEDIUM

Use restrained amber.

Background: #FFFBEB
Text: #92400E
Border: #FDE68A
LOW

Use neutral treatment.

Background: #F8FAFC
Text: #475569
Border: #CBD5E1

Important:

Confidence color must never imply certainty.

8. Typography

Recommended font:

Inter

Fallback:

system-ui, sans-serif

Technical identifiers may use:

JetBrains Mono

Fallback:

monospace
9. Typography Scale
Display
36px
font-weight: 700
line-height: 1.1
Page Heading
28px
font-weight: 700
line-height: 1.2
Section Heading
20px
font-weight: 600
line-height: 1.3
Card Heading
16px
font-weight: 600
Body
14px
font-weight: 400
line-height: 1.5
Small
13px
Caption
12px
10. Technical Text

Identifiers should use monospace.

Examples:

PGP-A
WALLET-A
INFRA-01
E-001
H-001
SRC-A

Example:

PGP-A

should visually differ from normal prose.

11. Spacing System

Use a consistent 4px base unit.

4px
8px
12px
16px
20px
24px
32px
40px
48px
64px

Recommended usage:

4px   → icon/text spacing
8px   → compact spacing
12px  → component internal spacing
16px  → standard padding
24px  → card padding
32px  → section spacing
48px  → major section spacing
64px  → page-level spacing
12. Border Radius

Use restrained rounding.

Small:

6px

Default:

8px

Large:

12px

Pills:

999px

Avoid excessively rounded cards.

DARKTRACE should feel analytical rather than playful.

13. Shadows

Default cards should primarily use borders.

Optional subtle shadow:

0 1px 2px rgba(15, 23, 42, 0.05)

Elevated elements:

0 8px 24px rgba(15, 23, 42, 0.08)

Do not use large glowing shadows.

14. Application Shell

Desktop:

Sidebar width:
240px

Topbar:

64px

Main content:

flex: 1

Structure:

┌───────────────┬────────────────────────────────────┐
│               │ Topbar                             │
│               ├────────────────────────────────────┤
│   Sidebar     │                                    │
│               │ Main Content                       │
│               │                                    │
│               │                                    │
└───────────────┴────────────────────────────────────┘
15. Sidebar

Sidebar background:

#FFFFFF

Border:

#E2E8F0

Logo area:

DARKTRACE
Connecting the Hidden Threads

Navigation item:

height: 40px
padding: 8px 12px
border-radius: 8px

Default:

color: #475569

Hover:

background: #F8FAFC

Active:

background: #EFF6FF
color: #1D4ED8
16. Topbar

Topbar contents:

Left:

Page title / breadcrumb

Right:

Global Search
Dataset Indicator
User / Environment

Height:

64px

Border bottom:

#E2E8F0
17. Buttons
Primary

Use for:

Analyze
Generate Report
Save
Search
Run Analysis

Style:

Background: #2563EB
Text: #FFFFFF
Radius: 8px
Height: 40px
Padding: 0 16px
Secondary
Background: #FFFFFF
Text: #334155
Border: #CBD5E1
Ghost
Background: transparent
Text: #475569

Use for:

Toolbar actions
Minor navigation
Close
Expand
Destructive

Only for actions that genuinely remove data.

Background: #DC2626
Text: #FFFFFF

MVP should rarely require destructive actions.

18. Button States

Every button must support:

Default
Hover
Active
Focus
Disabled
Loading

Loading example:

Analyzing...

Do not simply freeze the interface.

19. Cards

Default card:

Background: #FFFFFF
Border: #E2E8F0
Radius: 12px
Padding: 20px

Card hierarchy:

Title
Metadata
Main information
Optional action

Avoid cards inside cards unless necessary.

20. Metric Card

Dashboard metric:

┌──────────────────────────┐
│ TOTAL PERSONAS           │
│                          │
│ 8                        │
│ +2 this dataset version  │
└──────────────────────────┘

Use:

Small uppercase label
Large number
Optional supporting metadata
21. Status Badges

Badges should be compact.

Example:

MEDIUM

Recommended:

height: 24px
padding: 0 8px
radius: 999px
font-size: 12px
font-weight: 600
22. Entity Badges

Entity types:

PERSONA
HANDLE
PGP
WALLET
INFRASTRUCTURE
DOMAIN
ACTIVITY
WRITING SAMPLE
EVIDENCE
SOURCE

Entity badge style:

Neutral background with subtle border.

Example:

[PGP]
23. Evidence Direction Badge

Supporting:

[SUPPORTING]

Contradictory:

[CONTRADICTORY]

Unknown:

[UNKNOWN]

Use semantic colors but keep them visually restrained.

24. Evidence Card

Structure:

┌────────────────────────────────────────────────────┐
│ ✓ SHARED PGP                         E-001         │
│                                                    │
│ Shared PGP identifier detected between two        │
│ personas.                                         │
│                                                    │
│ Evidence Strength                         0.91    │
│ Source Reliability                        0.88    │
│ Independence                             0.82    │
│                                                    │
│ SRC-A                              12 Mar 2026    │
└────────────────────────────────────────────────────┘
25. Contradiction Card

Structure:

┌────────────────────────────────────────────────────┐
│ ! INFRASTRUCTURE MISMATCH            E-004         │
│                                                    │
│ Different infrastructure observed for the two     │
│ personas.                                         │
│                                                    │
│ Severity                                  MEDIUM  │
│                                                    │
│ INFRA-01  ≠  INFRA-02                            │
└────────────────────────────────────────────────────┘
26. Confidence Card

This is a high-priority component.

┌──────────────────────────────────────┐
│ ANALYTICAL CONFIDENCE                │
│                                      │
│ 62                                   │
│ MEDIUM                               │
│                                      │
│ Supporting       4                   │
│ Contradictory    2                   │
│ Unknown          1                   │
└──────────────────────────────────────┘

The explanation should always appear nearby.

27. Confidence Explanation

Example:

Why this confidence?

Shared PGP and behavioural similarity
strengthen the hypothesis.

Different infrastructure and limited
independent corroboration weaken it.

This is more important than the numerical score itself.

28. Investigation Gap Card
┌──────────────────────────────────────────────────┐
│ INVESTIGATION GAP                                │
│                                                  │
│ Independent corroboration of the PGP             │
│ relationship is missing.                         │
│                                                  │
│ Priority       HIGH                              │
│ State          UNKNOWN                           │
│                                                  │
│ [View Related Evidence]                          │
└──────────────────────────────────────────────────┘
29. Next-Best Evidence Card
┌──────────────────────────────────────────────────┐
│ NEXT-BEST EVIDENCE                               │
│                                                  │
│ Seek an independently sourced identifier         │
│ linking the two personas.                        │
│                                                  │
│ Expected Value                                   │
│ HIGH                                             │
└──────────────────────────────────────────────────┘
30. Search Component

Search input:

┌──────────────────────────────────────────────┐
│ 🔍 Search personas, PGPs, wallets...         │
└──────────────────────────────────────────────┘

Height:

40px

Radius:

8px

Focus:

border: #2563EB
31. Table Design

Tables should be compact but readable.

Header:

Background: #F8FAFC
Text: #64748B
Font: 12px

Rows:

min-height: 52px
border-bottom: #E2E8F0

Hover:

background: #F8FAFC

Avoid excessive vertical borders.

32. Timeline Design

Timeline:

       ●
       │
JAN 08 │ ShadowX appears with PGP-A
       │
       ●
       │
JAN 17 │ WALLET-A observed
       │
       ●
       │
FEB 03 │ ShadowNova appears with PGP-A

Use a thin neutral timeline line.

Important events can use semantic markers.

33. Graph Design

The relationship graph should be clean.

Background:

#F8FAFC

Node categories:

Persona:
Primary blue treatment

Handle:
Neutral

PGP:
Muted purple/blue

Wallet:
Muted amber

Infrastructure:
Muted gray

Domain:
Muted teal

Evidence:
Small neutral node

Source:
Small neutral node

Avoid neon graph nodes.

34. Graph Edges

Default:

Thin neutral line.

Supporting:

Subtle green semantic indicator.

Contradictory:

Subtle red semantic indicator.

Possible link:

Blue dashed line.

Unknown:

Gray dashed line.

Edge labels should only appear when useful.

35. Graph Selection

Selected node:

Strong border
Slightly larger scale
Related nodes remain visible
Unrelated nodes may become visually muted

Do not completely hide unrelated nodes.

36. Graph Toolbar

Toolbar:

[Zoom +]
[Zoom -]
[Fit]
[Reset]
[Filters]

Optional:

[Evidence Paths]
[Expand]
37. Drawer

Evidence/entity details can open in a right-side drawer.

Desktop width:

400px

Structure:

Header
Metadata
Details
Evidence
Source
Actions

Drawer should preserve the underlying investigation context.

38. Modal

Use modals only for:

Confirmation
Short forms
Export settings
Dataset actions

Do not put entire investigation pages inside modals.

39. Tooltips

Use tooltips for technical terms.

Examples:

Source Independence

Tooltip:

Measures whether this evidence is independently
corroborated rather than originating from the same
underlying source.

This is especially important for analytical metrics.

40. Empty State Design

Empty states should contain:

Icon / simple visual
Title
Explanation
Optional action

Example:

No hypotheses yet

Run an analysis to identify potential
relationships between personas.

[Run Analysis]
41. Loading State Design

Prefer skeletons.

Example:

┌────────────────────────────┐
│ █████████████              │
│ ███████                    │
│                            │
│ █████████████████          │
│ █████████                  │
└────────────────────────────┘
42. Error State Design

Example:

Unable to load evidence

The evidence service did not respond.

[Retry]

Technical error details should remain hidden by default.

43. Notification / Toast

Use for:

Report generated
Dataset imported
Analysis completed
Export successful
Changes saved

Example:

✓ Analysis completed
Hypothesis H-001 was updated.

Toast duration:

3–5 seconds

Do not use toasts for important analytical information.

44. Icons

Use a consistent icon library.

Recommended:

Lucide Icons

Icon style:

Simple
Outline
Consistent stroke width

Avoid mixing multiple icon styles.

45. Animation

Animations should be subtle.

Use:

Fade
Slide
Scale slightly
Skeleton shimmer

Avoid:

Excessive motion
Pulsing neon
Constant graph animation
Decorative animations

Recommended transition:

150–200ms ease
46. Accessibility

Minimum requirements:

Keyboard navigation
Visible focus states
Sufficient contrast
Semantic HTML
Accessible labels
Tooltips for ambiguous icons
Do not rely on color alone

For example:

Supporting evidence should not be identified only by green.

Also display:

SUPPORTING
47. Figma Component Naming

Use consistent names.

Examples:

Button/Primary
Button/Secondary
Button/Ghost

Badge/Confidence/High
Badge/Confidence/Medium
Badge/Confidence/Low

Badge/Evidence/Supporting
Badge/Evidence/Contradictory
Badge/Evidence/Unknown

Card/Metric
Card/Hypothesis
Card/Evidence
Card/Gap
Card/NextEvidence

Navigation/Sidebar
Navigation/Topbar

Graph/Node/Persona
Graph/Node/PGP
Graph/Node/Wallet
Graph/Edge/Supporting
Graph/Edge/Contradictory
48. Figma Variables

Create variables for:

Colors
Spacing
Radius
Typography

Example:

color/background
color/surface
color/text-primary
color/text-secondary
color/border
color/brand
color/supporting
color/contradictory
color/warning
49. Component Variants

Components should support variants.

Example:

Button
├── Primary
├── Secondary
├── Ghost
└── Destructive

Badge:

Confidence
├── High
├── Medium
└── Low

Evidence:

Direction
├── Supporting
├── Contradictory
└── Unknown
50. Figma Desktop Frame

Primary design frame:

1440 × 1024

Secondary:

1280 × 900

Design primarily for desktop.

51. Dashboard Layout Grid

Use:

12-column grid

Suggested:

Margin: 32px
Gutter: 24px

Content should have a maximum readable width where appropriate.

52. Page Layout Pattern

Standard page:

Page Header
↓
Page Description / Actions
↓
Primary Content
↓
Secondary Content

Example:

Hypothesis H-001
Possible Persona Link
[Generate Report]

Confidence
↓
Evidence
↓
Contradictions
↓
Timeline
↓
Gaps
↓
Next-Best Evidence
53. Information Hierarchy

Priority order:

Investigation subject
Relationship / hypothesis
Confidence
Supporting evidence
Contradictory evidence
Timeline
Investigation gaps
Next-best evidence
Technical metadata

Do not allow technical IDs to visually overpower the actual analytical conclusion.

54. Figma Prototype Rules

Prototype interactions:

Dashboard

Click hypothesis:

Dashboard → Hypothesis Detail
Persona

Click persona:

Persona Directory → Persona Profile
Graph

Click node:

Graph → Entity Drawer

Click relationship:

Graph → Hypothesis Detail
Evidence

Click evidence:

Evidence Table → Evidence Drawer
Report

Click generate:

Hypothesis → Report Preview
55. Dark Mode

Dark mode is NOT an MVP requirement.

Do not spend design/implementation time on dark mode before the core investigation workflow is complete.

Future support can be added using the token system.

56. Design System Success Criteria

The design system is successful when:

Components look consistent.
Colors communicate semantic meaning.
Analytical information has clear hierarchy.
Evidence is easy to scan.
Contradictions are impossible to miss.
Confidence is understandable.
Graph relationships are readable.
Figma components can be directly translated into Tailwind components.
No page feels visually disconnected from another.
57. Final Design Principle

DARKTRACE should look like a serious professional investigation product.

The visual language should communicate:

Calm
Precise
Evidence-driven
Explainable
Trustworthy
Analytical

Not:

Hacker
Cyberpunk
Neon
Gaming
Sci-fi

The product's sophistication should come from its intelligence model and evidence reasoning, not visual effects.