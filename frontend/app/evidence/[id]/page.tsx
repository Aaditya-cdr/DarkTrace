import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type RelatedHypothesis = {
  id: string;
  title: string;
  persona_a: string;
  persona_b: string;
  assessment: string;
  investigation_status: string;
};

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
  reliability: number;
  independence: number;
  specificity: number;
  temporal_relevance: number;
  related_hypothesis: RelatedHypothesis | null;
};

function Factor({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const percentage = Math.round(value * 100);

  return (
    <div className="evidence-factor">
      <span>{label}</span>
      <strong>{percentage}%</strong>
    </div>
  );
}

export default async function EvidenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let evidence: EvidenceRecord | null = null;
  let error = false;

  try {
    const response = await fetch(
      `${API_URL}/api/evidence/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      evidence = await response.json();
    } else {
      error = false;
    }
  } catch {
    error = true;
  }

  if (!evidence) {
    return (
      <div className="evidence-not-found">
        <p className="section-eyebrow">EVIDENCE RECORD</p>

        <h1>
          {error
            ? "Unable to load evidence"
            : "Evidence not found"}
        </h1>

        <p>
          {error
            ? "The DARKTRACE intelligence API could not be reached."
            : "The requested evidence record does not exist in the current synthetic dataset."}
        </p>

        <Link
          href="/evidence"
          className="primary-action"
        >
          Back to Evidence Explorer
        </Link>
      </div>
    );
  }

  const isSupporting =
    evidence.direction === "SUPPORTING";

  const relatedHypothesis =
    evidence.related_hypothesis;

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
                isSupporting
                  ? "supporting"
                  : "contradictory"
              }`}
            >
              {evidence.direction}
            </span>
          </div>

          <h1>{evidence.title}</h1>

          <p>
            {evidence.type}

            <span className="hypothesis-dot">
              •
            </span>

            {evidence.category}
          </p>
        </div>

        <div className="evidence-detail-actions">
          <Link
            href="/evidence"
            className="secondary-action"
          >
            Back to Explorer
          </Link>
        </div>
      </header>

      {/* Analytical note */}
      <div className="analytical-note">
        <strong>Evidence interpretation:</strong>

        <span>
          This record contributes to an analytical hypothesis.
          It does not independently establish identity or common
          ownership.
        </span>
      </div>

      {/* Main grid */}
      <div className="evidence-detail-grid">
        {/* Main evidence */}
        <section className="evidence-detail-main">
          {/* Description */}
          <div className="detail-card">
            <div className="detail-card-header">
              <div>
                <p className="section-eyebrow">
                  OBSERVED SIGNAL
                </p>

                <h2>Evidence Description</h2>
              </div>

              <span
                className={`detail-strength ${evidence.strength.toLowerCase()}`}
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
                <p className="section-eyebrow">
                  RELATED ENTITIES
                </p>

                <h2>Connected intelligence</h2>
              </div>
            </div>

            <div className="detail-entities">
              {evidence.entities.map((entity) => (
                <div
                  className="detail-entity"
                  key={entity}
                >
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

                <h2>
                  {relatedHypothesis
                    ? relatedHypothesis.title
                    : "No linked hypothesis"}
                </h2>
              </div>

              {relatedHypothesis && (
                <span className="confidence-band medium">
                  {relatedHypothesis.assessment}
                </span>
              )}
            </div>

            {relatedHypothesis ? (
              <>
                <p className="detail-description">
                  This evidence record contributes to{" "}
                  <strong>
                    {relatedHypothesis.id}
                  </strong>
                  , which evaluates a possible relationship
                  between{" "}
                  {relatedHypothesis.persona_a} and{" "}
                  {relatedHypothesis.persona_b}.
                </p>

                <Link
                  href={`/hypotheses/${relatedHypothesis.id}`}
                  className="detail-link"
                >
                  View hypothesis analysis →
                </Link>
              </>
            ) : (
              <p className="detail-description">
                This evidence record is not currently linked
                to an investigation hypothesis.
              </p>
            )}
          </div>
        </section>

        {/* Metadata */}
        <aside className="evidence-detail-sidebar">
          {/* Provenance */}
          <div className="detail-card">
            <p className="section-eyebrow">
              PROVENANCE
            </p>

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

          {/* Analytical factors */}
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
                value={evidence.temporal_relevance}
              />
            </div>
          </div>

          {/* Interpretation */}
          <div className="detail-card detail-warning-card">
            <p className="section-eyebrow">
              INTERPRETATION
            </p>

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