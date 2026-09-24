import Link from "next/link";

type EvidenceRecord = {
  id: string;
  type: string;
  category: string;
  title: string;
  description: string;
  direction: "SUPPORTING" | "CONTRADICTORY";
  strength: string;
  source: string;
  entities: string[];
  date: string;
  reliability: string;
  independence: string;
  specificity: string;
  temporalRelevance: string;
};

const evidenceRecords: Record<string, EvidenceRecord> = {
  "E-001": {
    id: "E-001",
    type: "SHARED_PGP",
    category: "IDENTITY",
    title: "Shared PGP Identifier",
    description:
      "Both ShadowX and ShadowNova are associated with the PGP identifier PGP-A.",
    direction: "SUPPORTING",
    strength: "STRONG",
    source: "SRC-A",
    entities: ["ShadowX", "ShadowNova", "PGP-A"],
    date: "2026-08-12",
    reliability: "HIGH",
    independence: "MEDIUM",
    specificity: "HIGH",
    temporalRelevance: "HIGH",
  },

  "E-002": {
    id: "E-002",
    type: "BEHAVIOURAL_SIMILARITY",
    category: "BEHAVIOURAL",
    title: "Behavioural Pattern Similarity",
    description:
      "Observed activity patterns show meaningful similarity across marketplace interactions.",
    direction: "SUPPORTING",
    strength: "MODERATE",
    source: "SRC-C",
    entities: ["ShadowX", "ShadowNova"],
    date: "2026-08-15",
    reliability: "MEDIUM",
    independence: "MEDIUM",
    specificity: "MEDIUM",
    temporalRelevance: "HIGH",
  },

  "E-003": {
    id: "E-003",
    type: "SEMANTIC_SIMILARITY",
    category: "LINGUISTIC",
    title: "Semantic Writing Similarity",
    description:
      "Writing samples demonstrate similarities in terminology, sentence structure and recurring expressions.",
    direction: "SUPPORTING",
    strength: "MODERATE",
    source: "SRC-D",
    entities: ["ShadowX", "ShadowNova"],
    date: "2026-08-17",
    reliability: "MEDIUM",
    independence: "MEDIUM",
    specificity: "MEDIUM",
    temporalRelevance: "MEDIUM",
  },

  "E-004": {
    id: "E-004",
    type: "ACTIVITY_OVERLAP",
    category: "TEMPORAL",
    title: "Activity Timeline Overlap",
    description:
      "Several observed activity windows overlap within the same period.",
    direction: "SUPPORTING",
    strength: "MODERATE",
    source: "SRC-E",
    entities: ["ShadowX", "ShadowNova"],
    date: "2026-08-18",
    reliability: "MEDIUM",
    independence: "HIGH",
    specificity: "MEDIUM",
    temporalRelevance: "HIGH",
  },

  "E-005": {
    id: "E-005",
    type: "INFRASTRUCTURE_MISMATCH",
    category: "INFRASTRUCTURE",
    title: "Infrastructure Mismatch",
    description:
      "The two personas are associated with different infrastructure nodes.",
    direction: "CONTRADICTORY",
    strength: "MODERATE",
    source: "SRC-F",
    entities: ["ShadowX", "ShadowNova", "INFRA-01", "INFRA-02"],
    date: "2026-08-19",
    reliability: "HIGH",
    independence: "HIGH",
    specificity: "HIGH",
    temporalRelevance: "HIGH",
  },

  "E-006": {
    id: "E-006",
    type: "TEMPORAL_GAP",
    category: "TEMPORAL",
    title: "Temporal Activity Gap",
    description:
      "A period of expected activity continuity is not observed between the two personas.",
    direction: "CONTRADICTORY",
    strength: "MODERATE",
    source: "SRC-G",
    entities: ["ShadowX", "ShadowNova"],
    date: "2026-08-20",
    reliability: "MEDIUM",
    independence: "HIGH",
    specificity: "MEDIUM",
    temporalRelevance: "HIGH",
  },

  "E-007": {
    id: "E-007",
    type: "SHARED_PGP",
    category: "IDENTITY",
    title: "Shared PGP Identifier",
    description:
      "CipherWolf and NullShade are independently associated with PGP-D.",
    direction: "SUPPORTING",
    strength: "STRONG",
    source: "SRC-H",
    entities: ["CipherWolf", "NullShade", "PGP-D"],
    date: "2026-08-21",
    reliability: "HIGH",
    independence: "HIGH",
    specificity: "HIGH",
    temporalRelevance: "HIGH",
  },

  "E-008": {
    id: "E-008",
    type: "INFRASTRUCTURE_CONTINUITY",
    category: "INFRASTRUCTURE",
    title: "Infrastructure Continuity",
    description:
      "Both personas show association with infrastructure node INFRA-04.",
    direction: "SUPPORTING",
    strength: "STRONG",
    source: "SRC-I",
    entities: ["CipherWolf", "NullShade", "INFRA-04"],
    date: "2026-08-22",
    reliability: "HIGH",
    independence: "HIGH",
    specificity: "HIGH",
    temporalRelevance: "HIGH",
  },

  "E-009": {
    id: "E-009",
    type: "SEMANTIC_SIMILARITY",
    category: "LINGUISTIC",
    title: "Limited Semantic Similarity",
    description:
      "NightFox and RedVector demonstrate limited semantic similarity in observed writing samples.",
    direction: "SUPPORTING",
    strength: "WEAK",
    source: "SRC-J",
    entities: ["NightFox", "RedVector"],
    date: "2026-08-23",
    reliability: "MEDIUM",
    independence: "LOW",
    specificity: "LOW",
    temporalRelevance: "MEDIUM",
  },

  "E-010": {
    id: "E-010",
    type: "IDENTIFIER_CONFLICT",
    category: "IDENTITY",
    title: "Identifier Conflict",
    description:
      "Observed identifiers do not provide consistent corroboration between the two personas.",
    direction: "CONTRADICTORY",
    strength: "STRONG",
    source: "SRC-J",
    entities: ["NightFox", "RedVector"],
    date: "2026-08-24",
    reliability: "HIGH",
    independence: "HIGH",
    specificity: "HIGH",
    temporalRelevance: "HIGH",
  },
};

function Factor({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="evidence-factor">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default async function EvidenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const evidence = evidenceRecords[id];

  if (!evidence) {
    return (
      <div className="evidence-not-found">
        <p className="section-eyebrow">EVIDENCE RECORD</p>
        <h1>Evidence not found</h1>
        <p>
          The requested evidence record does not exist in the current
          synthetic dataset.
        </p>

        <Link href="/evidence" className="primary-action">
          Back to Evidence Explorer
        </Link>
      </div>
    );
  }

  const isSupporting = evidence.direction === "SUPPORTING";

  return (
    <div className="evidence-detail-page">
      {/* Breadcrumb */}
      <div className="page-breadcrumb">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <Link href="/evidence">Evidence</Link>
        <span>/</span>
        <strong>{evidence.id}</strong>
      </div>

      {/* Header */}
      <header className="evidence-detail-header">
        <div>
          <div className="evidence-detail-id-row">
            <span className="evidence-detail-id">
              {evidence.id}
            </span>

            <span
              className={`direction-badge ${
                isSupporting ? "supporting" : "contradictory"
              }`}
            >
              {evidence.direction}
            </span>
          </div>

          <h1>{evidence.title}</h1>

          <p>
            {evidence.type}
            <span className="hypothesis-dot">•</span>
            {evidence.category}
          </p>
        </div>

        <div className="evidence-detail-actions">
          <Link href="/evidence" className="secondary-action">
            Back to Explorer
          </Link>
        </div>
      </header>

      {/* Analytical note */}
      <div className="analytical-note">
        <strong>Evidence interpretation:</strong>

        <span>
          This record contributes to an analytical hypothesis. It does not
          independently establish identity or common ownership.
        </span>
      </div>

      {/* Main grid */}
      <div className="evidence-detail-grid">
        {/* Main evidence */}
        <section className="evidence-detail-main">
          <div className="detail-card">
            <div className="detail-card-header">
              <div>
                <p className="section-eyebrow">OBSERVED SIGNAL</p>
                <h2>Evidence Description</h2>
              </div>

              <span
                className={`detail-strength ${
                  evidence.strength.toLowerCase()
                }`}
              >
                {evidence.strength}
              </span>
            </div>

            <p className="detail-description">
              {evidence.description}
            </p>
          </div>

          {/* Entities */}
          <div className="detail-card">
            <div className="detail-card-header">
              <div>
                <p className="section-eyebrow">RELATED ENTITIES</p>
                <h2>Connected intelligence</h2>
              </div>
            </div>

            <div className="detail-entities">
              {evidence.entities.map((entity) => (
                <div className="detail-entity" key={entity}>
                  <span className="entity-marker" />
                  <span>{entity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related hypothesis */}
          <div className="detail-card">
            <div className="detail-card-header">
              <div>
                <p className="section-eyebrow">
                  RELATED HYPOTHESIS
                </p>
                <h2>ShadowX ↔ ShadowNova</h2>
              </div>

              <span className="confidence-band medium">
                MEDIUM
              </span>
            </div>

            <p className="detail-description">
              This evidence record contributes to hypothesis H-001,
              which evaluates a possible relationship between the two
              personas.
            </p>

            <Link
              href="/hypotheses/H-001"
              className="detail-link"
            >
              View hypothesis analysis →
            </Link>
          </div>
        </section>

        {/* Metadata */}
        <aside className="evidence-detail-sidebar">
          <div className="detail-card">
            <p className="section-eyebrow">PROVENANCE</p>

            <div className="provenance-list">
              <div>
                <span>Source</span>
                <strong>{evidence.source}</strong>
              </div>

              <div>
                <span>Observed</span>
                <strong>{evidence.date}</strong>
              </div>

              <div>
                <span>Record Type</span>
                <strong>{evidence.type}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{evidence.category}</strong>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <p className="section-eyebrow">
              ANALYTICAL FACTORS
            </p>

            <div className="factor-list">
              <Factor
                label="Source Reliability"
                value={evidence.reliability}
              />

              <Factor
                label="Source Independence"
                value={evidence.independence}
              />

              <Factor
                label="Specificity"
                value={evidence.specificity}
              />

              <Factor
                label="Temporal Relevance"
                value={evidence.temporalRelevance}
              />
            </div>
          </div>

          <div className="detail-card detail-warning-card">
            <p className="section-eyebrow">INTERPRETATION</p>

            <h3>
              {isSupporting
                ? "Supports the hypothesis"
                : "Weakens the hypothesis"}
            </h3>

            <p>
              {isSupporting
                ? "This signal increases the strength of the associated relationship hypothesis."
                : "This signal introduces uncertainty or reduces the strength of the associated relationship hypothesis."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}