import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

type Evidence = {
  id: string;
  type: string;
  category: string;
  subject_a: string;
  subject_b: string;
  direction: "SUPPORTING" | "CONTRADICTORY";
  strength: string;
  source: string;
  observed_at?: string;
  reliability?: number;
  independence?: number;
  specificity?: number;
  temporal_relevance?: number;
  analytical_score?: number;
};

type Hypothesis = {
  id: string;
  status: string;
  persona_a: string;
  persona_b: string;
  title: string;
  assessment: string;
  evidence_ids: string[];
  investigation_status: string;
};

type Analysis = {
  assessment: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";

  supporting_score: number;
  contradictory_score: number;
  net_score: number;

  supporting_evidence: Evidence[];
  contradictory_evidence: Evidence[];

  explanation: string;
  investigation_gap: string;
  next_best_evidence: string;

  analytical_note: string;
};

type HypothesisResponse = {
  hypothesis: Hypothesis;
  analysis: Analysis;
};


/*
 * ---------------------------------------------------------
 * Evidence helpers
 * ---------------------------------------------------------
 */

function getEvidenceTitle(type: string) {
  const titles: Record<string, string> = {
    SHARED_PGP: "Shared PGP",
    BEHAVIOURAL_SIMILARITY: "Behavioural Similarity",
    SEMANTIC_SIMILARITY: "Semantic Writing Similarity",
    ACTIVITY_OVERLAP: "Activity Overlap",
    INFRASTRUCTURE_MISMATCH: "Infrastructure Mismatch",
    TEMPORAL_GAP: "Temporal Gap",
    INFRASTRUCTURE_CONTINUITY:
      "Infrastructure Continuity",
    IDENTIFIER_CONFLICT: "Identifier Conflict",
  };

  return titles[type] || type.replaceAll("_", " ");
}


function getEvidenceDescription(
  evidence: Evidence
) {
  switch (evidence.type) {
    case "SHARED_PGP":
      return "Both personas are associated with the same PGP identifier.";

    case "BEHAVIOURAL_SIMILARITY":
      return "Observed activity patterns show meaningful behavioural overlap.";

    case "SEMANTIC_SIMILARITY":
      return "Writing samples show semantic similarities across observed communications.";

    case "ACTIVITY_OVERLAP":
      return "Several activity windows overlap within the observed timeline.";

    case "INFRASTRUCTURE_MISMATCH":
      return "The personas are associated with different infrastructure nodes.";

    case "TEMPORAL_GAP":
      return "Observed activity contains a period where expected continuity is not present.";

    case "INFRASTRUCTURE_CONTINUITY":
      return "The personas share a consistent infrastructure relationship across the observed records.";

    case "IDENTIFIER_CONFLICT":
      return "Observed identifiers conflict with the proposed relationship.";

    default:
      return "Evidence signal identified in the synthetic investigation dataset.";
  }
}


/*
 * ---------------------------------------------------------
 * Evidence Card
 * ---------------------------------------------------------
 */

type EvidenceCardProps = {
  evidence: Evidence;
};

function EvidenceCard({
  evidence,
}: EvidenceCardProps) {
  return (
    <article className="evidence-card">

      <div className="evidence-card-header">

        <span className="evidence-type">
          {evidence.category}
        </span>

        <span className="evidence-strength">
          {evidence.strength}
        </span>

      </div>

      <h3>
        {getEvidenceTitle(evidence.type)}
      </h3>

      <p>
        {getEvidenceDescription(evidence)}
      </p>

      <span className="evidence-source">
        Source: {evidence.source}
      </span>

    </article>
  );
}


/*
 * ---------------------------------------------------------
 * Contradiction Card
 * ---------------------------------------------------------
 */

type ContradictionCardProps = {
  evidence: Evidence;
};

function ContradictionCard({
  evidence,
}: ContradictionCardProps) {
  return (
    <article className="evidence-card contradiction-card">

      <div className="evidence-card-header">

        <span className="evidence-type">
          CONTRADICTION
        </span>

        <span className="evidence-strength">
          {evidence.strength}
        </span>

      </div>

      <h3>
        {getEvidenceTitle(evidence.type)}
      </h3>

      <p>
        {getEvidenceDescription(evidence)}
      </p>

      <span className="evidence-source">
        Source: {evidence.source}
      </span>

    </article>
  );
}


/*
 * ---------------------------------------------------------
 * Investigation Gap
 * ---------------------------------------------------------
 */

function InvestigationGap({
  text,
}: {
  text: string;
}) {
  return (
    <div className="investigation-gap">

      <h3>
        Resolve the remaining gaps
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}


/*
 * ---------------------------------------------------------
 * Next Best Evidence
 * ---------------------------------------------------------
 */

function NextBestEvidence({
  text,
}: {
  text: string;
}) {
  return (
    <div className="next-best-evidence">

      <h3>
        Next best evidence
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}


/*
 * ---------------------------------------------------------
 * Confidence Card
 * ---------------------------------------------------------
 */

function ConfidenceCard({
  confidence,
  explanation,
}: {
  confidence: "HIGH" | "MEDIUM" | "LOW";
  explanation: string;
}) {
  return (
    <section
      className="confidence-card"
      aria-label="Hypothesis confidence"
    >

      <div>

        <p className="section-eyebrow">
          CONFIDENCE
        </p>

        <h2>
          {confidence.charAt(0) +
            confidence.slice(1).toLowerCase()}
          {" "}
          confidence
        </h2>

      </div>

      <p>
        {explanation}
      </p>

    </section>
  );
}


/*
 * ---------------------------------------------------------
 * Main Hypothesis Page
 * ---------------------------------------------------------
 */

export default async function HypothesisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let data: HypothesisResponse;

  try {
    const response = await fetch(
      `${API_URL}/api/hypotheses/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Hypothesis API returned ${response.status}`
      );
    }

    data =
      (await response.json()) as HypothesisResponse;

  } catch (error) {
    console.error(
      "DARKTRACE Hypothesis API error:",
      error
    );

    return (
      <div className="hypothesis-page">

        <div className="page-breadcrumb">
          <Link href="/dashboard">
            Dashboard
          </Link>

          <span>/</span>

          <span>Hypotheses</span>

          <span>/</span>

          <strong>{id}</strong>
        </div>

        <section className="hypothesis-section">

          <h2>
            Unable to load hypothesis
          </h2>

          <p>
            The DARKTRACE analytical backend could not
            be reached. Make sure FastAPI is running on
            port 8000.
          </p>

        </section>

      </div>
    );
  }

  const {
    hypothesis,
    analysis,
  } = data;

  const supporting =
    analysis.supporting_evidence || [];

  const contradictory =
    analysis.contradictory_evidence || [];

  const confidenceClass =
    analysis.confidence.toLowerCase();

  return (
    <div className="hypothesis-page">

      {/* -------------------------------------------------
          Breadcrumb
      ------------------------------------------------- */}

      <div className="page-breadcrumb">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <span>/</span>

        <span>Hypotheses</span>

        <span>/</span>

        <strong>
          {hypothesis.id}
        </strong>

      </div>


      {/* -------------------------------------------------
          Header
      ------------------------------------------------- */}

      <header className="hypothesis-header">

        <div>

          <div className="hypothesis-title-row">

            <span className="hypothesis-id">
              {hypothesis.id}
            </span>

            <span
              className={`confidence-band ${confidenceClass}`}
            >
              {analysis.confidence}
            </span>

          </div>

          <h1>
            {hypothesis.title}
          </h1>

          <p>

            Possible Persona Link

            <span className="hypothesis-dot">
              •
            </span>

            Synthetic Dataset

          </p>

        </div>


        <div className="hypothesis-actions">

          <Link
            href={`/personas/${hypothesis.persona_a}`}
            className="secondary-action"
          >
            View Persona
          </Link>

          <Link
            href={`/personas/${hypothesis.persona_a}`}
            className="primary-action"
          >
            View Relationship Graph
          </Link>

        </div>

      </header>


      {/* -------------------------------------------------
          Analytical Note
      ------------------------------------------------- */}

      <div className="analytical-note">

        <strong>
          Analytical note:
        </strong>

        <span>
          {analysis.analytical_note}
        </span>

      </div>


      {/* -------------------------------------------------
          Confidence
      ------------------------------------------------- */}

      <ConfidenceCard
        confidence={analysis.confidence}
        explanation={analysis.explanation}
      />


      {/* -------------------------------------------------
          Explanation
      ------------------------------------------------- */}

      <section className="hypothesis-explanation">

        <div>

          <p className="section-eyebrow">
            WHY THIS HYPOTHESIS EXISTS
          </p>

          <h2>
            Evidence points in both directions
          </h2>

        </div>


        <div className="explanation-grid">

          <div className="explanation-column supporting">

            <span>
              SUPPORTING SIGNALS
            </span>

            <p>
              {supporting.length} supporting
              evidence signal
              {supporting.length === 1
                ? ""
                : "s"} contribute to the
              hypothesis.
            </p>

          </div>


          <div className="explanation-column contradictory">

            <span>
              CONTRADICTORY SIGNALS
            </span>

            <p>
              {contradictory.length} contradictory
              evidence signal
              {contradictory.length === 1
                ? ""
                : "s"} weaken the
              hypothesis.
            </p>

          </div>

        </div>

      </section>


      {/* -------------------------------------------------
          Supporting Evidence
      ------------------------------------------------- */}

      <section className="hypothesis-section">

        <div className="section-heading-row">

          <div>

            <p className="section-eyebrow">
              SUPPORTING EVIDENCE
            </p>

            <h2>
              Signals strengthening the hypothesis
            </h2>

          </div>

          <span className="section-count">
            {supporting.length}{" "}
            {supporting.length === 1
              ? "signal"
              : "signals"}
          </span>

        </div>


        <div className="evidence-grid">

          {supporting.map(
            (evidence) => (
              <EvidenceCard
                key={evidence.id}
                evidence={evidence}
              />
            )
          )}

        </div>

      </section>


      {/* -------------------------------------------------
          Contradictory Evidence
      ------------------------------------------------- */}

      <section className="hypothesis-section">

        <div className="section-heading-row">

          <div>

            <p className="section-eyebrow">
              CONTRADICTORY EVIDENCE
            </p>

            <h2>
              Signals weakening the hypothesis
            </h2>

          </div>

          <span className="section-count contradiction-count">

            {contradictory.length}{" "}
            {contradictory.length === 1
              ? "signal"
              : "signals"}

          </span>

        </div>


        <div className="evidence-grid">

          {contradictory.map(
            (evidence) => (
              <ContradictionCard
                key={evidence.id}
                evidence={evidence}
              />
            )
          )}

        </div>

      </section>


      {/* -------------------------------------------------
          Investigation Guidance
      ------------------------------------------------- */}

      <section className="hypothesis-section">

        <div className="section-heading-row">

          <div>

            <p className="section-eyebrow">
              INVESTIGATION GUIDANCE
            </p>

            <h2>
              What should be investigated next?
            </h2>

          </div>

        </div>


        <InvestigationGap
          text={analysis.investigation_gap}
        />


        <NextBestEvidence
          text={analysis.next_best_evidence}
        />

      </section>


      {/* -------------------------------------------------
          Analytical Scores
      ------------------------------------------------- */}

      <section className="hypothesis-section">

        <div className="section-heading-row">

          <div>

            <p className="section-eyebrow">
              ANALYTICAL SIGNAL
            </p>

            <h2>
              Evidence balance
            </h2>

          </div>

        </div>


        <div className="explanation-grid">

          <div className="explanation-column supporting">

            <span>
              SUPPORTING SCORE
            </span>

            <p>
              {analysis.supporting_score.toFixed(4)}
            </p>

          </div>


          <div className="explanation-column contradictory">

            <span>
              CONTRADICTORY SCORE
            </span>

            <p>
              {analysis.contradictory_score.toFixed(4)}
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}