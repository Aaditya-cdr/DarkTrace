import Link from "next/link";
import ConfidenceCard from "@/components/hypotheses/confidence-card";
import EvidenceCard from "@/components/hypotheses/evidence-card";
import ContradictionCard from "@/components/hypotheses/contradiction-card";
import InvestigationGap from "@/components/hypotheses/investigation-gap";
import NextBestEvidence from "@/components/hypotheses/next-best-evidence";

export default async function HypothesisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="hypothesis-page">
      {/* Breadcrumb */}
      <div className="page-breadcrumb">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <span>Hypotheses</span>
        <span>/</span>
        <strong>{id}</strong>
      </div>

      {/* Header */}
      <header className="hypothesis-header">
        <div>
          <div className="hypothesis-title-row">
            <span className="hypothesis-id">{id}</span>

            <span className="confidence-band medium">MEDIUM</span>
          </div>

          <h1>ShadowX ↔ ShadowNova</h1>

          <p>
            Possible Persona Link
            <span className="hypothesis-dot">•</span>
            Synthetic Dataset
          </p>
        </div>

        <div className="hypothesis-actions">
          <Link
            href="/personas/P-001"
            className="secondary-action"
          >
            View Persona
          </Link>

          <Link
            href="/personas/P-001"
            className="primary-action"
          >
            View Relationship Graph
          </Link>
        </div>
      </header>

      {/* Important analytical note */}
      <div className="analytical-note">
        <strong>Analytical note:</strong>

        <span>
          This is an evidence-backed attribution hypothesis, not a
          determination of real-world identity. Similarity alone does not
          establish common ownership.
        </span>
      </div>

      {/* Confidence */}
      <ConfidenceCard />

      {/* Explanation */}
      <section className="hypothesis-explanation">
        <div>
          <p className="section-eyebrow">WHY THIS HYPOTHESIS EXISTS</p>

          <h2>Evidence points in both directions</h2>
        </div>

        <div className="explanation-grid">
          <div className="explanation-column supporting">
            <span>SUPPORTING SIGNALS</span>

            <p>
              Shared PGP, behavioural similarity, semantic writing
              similarity and activity overlap increase the hypothesis
              strength.
            </p>
          </div>

          <div className="explanation-column contradictory">
            <span>CONTRADICTORY SIGNALS</span>

            <p>
              Different infrastructure, a temporal gap and limited
              independent corroboration reduce confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section className="hypothesis-section">
        <div className="section-heading-row">
          <div>
            <p className="section-eyebrow">SUPPORTING EVIDENCE</p>
            <h2>Signals strengthening the hypothesis</h2>
          </div>

          <span className="section-count">4 signals</span>
        </div>

        <div className="evidence-grid">
          <EvidenceCard
            title="Shared PGP"
            type="IDENTITY"
            description="Both personas are associated with PGP-A."
            strength="STRONG"
            source="SRC-A"
          />

          <EvidenceCard
            title="Behavioural Similarity"
            type="BEHAVIOURAL"
            description="Observed activity patterns show meaningful behavioural overlap."
            strength="MODERATE"
            source="SRC-C"
          />

          <EvidenceCard
            title="Semantic Writing Similarity"
            type="LINGUISTIC"
            description="Writing samples show semantic similarities across observed communications."
            strength="MODERATE"
            source="SRC-D"
          />

          <EvidenceCard
            title="Activity Overlap"
            type="TEMPORAL"
            description="Several activity windows overlap within the observed timeline."
            strength="MODERATE"
            source="SRC-E"
          />
        </div>
      </section>

      {/* Contradictions */}
      <section className="hypothesis-section">
        <div className="section-heading-row">
          <div>
            <p className="section-eyebrow">CONTRADICTORY EVIDENCE</p>
            <h2>Signals weakening the hypothesis</h2>
          </div>

          <span className="section-count contradiction-count">
            2 signals
          </span>
        </div>

        <div className="evidence-grid">
          <ContradictionCard
            title="Infrastructure Mismatch"
            description="The personas are associated with different infrastructure nodes."
            severity="MEDIUM"
            source="SRC-F"
          />

          <ContradictionCard
            title="Temporal Gap"
            description="Observed activity contains a period where the expected continuity is not present."
            severity="MEDIUM"
            source="SRC-G"
          />
        </div>
      </section>

      {/* Investigation */}
      <section className="hypothesis-section">
        <div className="section-heading-row">
          <div>
            <p className="section-eyebrow">INVESTIGATION GUIDANCE</p>
            <h2>What should be investigated next?</h2>
          </div>
        </div>

        <InvestigationGap />

        <NextBestEvidence />
      </section>
    </div>
  );
}
