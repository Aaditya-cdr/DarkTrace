import Link from "next/link";

import PrintButton from "@/components/reports/print-button";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type Evidence = {
  id: string;
  type: string;
  category: string;
  direction: "SUPPORTING" | "CONTRADICTORY";
  strength: string;
  source: string;
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

type TimelineEvent = {
  id: string;
  date: string;
  time: string;
  entity: string;
  type: string;
  title: string;
  description: string;
  direction: "SUPPORTING" | "CONTRADICTORY" | "NEUTRAL";
  source: string;
};

type TimelineResponse = {
  count: number;
  categories: string[];
  items: TimelineEvent[];
};

function getEvidenceTitle(type: string) {
  const titles: Record<string, string> = {
    SHARED_PGP: "Shared PGP Identifier",
    BEHAVIOURAL_SIMILARITY: "Behavioural Similarity",
    SEMANTIC_SIMILARITY: "Semantic Writing Similarity",
    ACTIVITY_OVERLAP: "Activity Overlap",
    INFRASTRUCTURE_MISMATCH: "Infrastructure Mismatch",
    TEMPORAL_GAP: "Temporal Activity Gap",
    INFRASTRUCTURE_CONTINUITY: "Infrastructure Continuity",
    IDENTIFIER_CONFLICT: "Identifier Conflict",
  };

  return titles[type] || type.replaceAll("_", " ");
}

function formatDate(date: string) {
  if (!date) return "Unknown date";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

export default async function ReportPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let data: HypothesisResponse | null = null;
  let timelineData: TimelineResponse | null = null;
  let error = false;

  try {
    const [hypothesisResponse, timelineResponse] = await Promise.all([
      fetch(
        `${API_URL}/api/hypotheses/${encodeURIComponent(id)}`,
        {
          cache: "no-store",
        },
      ),
      fetch(`${API_URL}/api/timeline`, {
        cache: "no-store",
      }),
    ]);

    if (!hypothesisResponse.ok) {
      throw new Error(
        `Hypothesis API returned ${hypothesisResponse.status}`,
      );
    }

    data = (await hypothesisResponse.json()) as HypothesisResponse;

    if (timelineResponse.ok) {
      timelineData =
        (await timelineResponse.json()) as TimelineResponse;
    }
  } catch (err) {
    console.error("DARKTRACE Report API error:", err);
    error = true;
  }

  if (!data) {
    return (
      <div className="report-preview-page">
        <div className="page-breadcrumb">
          <Link href="/dashboard">Dashboard</Link>
          <span>/</span>
          <Link href="/reports">Reports</Link>
          <span>/</span>
          <strong>{id}</strong>
        </div>

        <section className="report-section">
          <p className="section-eyebrow">
            INVESTIGATION REPORT
          </p>

          <h1>Unable to load report</h1>

          <p>
            {error
              ? "The DARKTRACE analytical backend could not be reached."
              : "The requested investigation report does not exist."}
          </p>

          <Link href="/reports" className="secondary-action">
            Back to Reports
          </Link>
        </section>
      </div>
    );
  }

  const { hypothesis, analysis } = data;

  const supporting = analysis.supporting_evidence || [];
  const contradictory =
    analysis.contradictory_evidence || [];

  const confidenceClass =
    analysis.confidence.toLowerCase();

  /*
   * The report timeline is limited to evidence belonging
   * to this hypothesis.
   */
  const hypothesisEvidenceIds = new Set(
    hypothesis.evidence_ids,
  );

  const reportTimeline =
    timelineData?.items
      .filter((event) =>
        hypothesisEvidenceIds.has(event.id),
      )
      .sort((a, b) =>
        a.date.localeCompare(b.date),
      ) || [];

  return (
    <div className="report-preview-page">
      {/* Top navigation */}
      <div className="page-breadcrumb">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <Link href="/reports">Reports</Link>
        <span>/</span>
        <strong>{id}</strong>
      </div>

      {/* Report header */}
      <header className="report-preview-header">
        <div>
          <p className="section-eyebrow">
            INVESTIGATION REPORT
          </p>

          <h1>{hypothesis.title}</h1>

          <p>
            Evidence-backed attribution hypothesis
            <span className="hypothesis-dot">•</span>
            {hypothesis.id}
          </p>
        </div>

        <div className="report-actions">
          <Link
            href={`/hypotheses/${hypothesis.id}`}
            className="secondary-action"
          >
            View Analysis
          </Link>

          <PrintButton />
        </div>
      </header>

      {/* Report document */}
      <main className="report-document">
        {/* Document header */}
        <section className="report-document-header">
          <div>
            <span className="report-document-label">
              DARKTRACE
            </span>

            <h2>Threat Actor Attribution Analysis</h2>

            <p>
              Synthetic Intelligence Investigation Report
            </p>
          </div>

          <div className="report-document-meta">
            <span>REPORT ID</span>
            <strong>DT-{hypothesis.id}</strong>

            <span>DATASET</span>
            <strong>SYNTHETIC V1.0</strong>

            <span>STATUS</span>
            <strong>ANALYSIS COMPLETE</strong>
          </div>
        </section>

        {/* Executive summary */}
        <section className="report-section">
          <div className="report-section-heading">
            <span>01</span>

            <div>
              <p className="section-eyebrow">
                EXECUTIVE SUMMARY
              </p>

              <h2>Possible Persona Link</h2>
            </div>
          </div>

          <div className="report-summary-grid">
            <div className="report-summary-text">
              <p>
                DARKTRACE identified an evidence-backed
                hypothesis connecting the personas{" "}
                <strong>{hypothesis.persona_a}</strong> and{" "}
                <strong>{hypothesis.persona_b}</strong>.
              </p>

              <p>{analysis.explanation}</p>

              <p>{analysis.analytical_note}</p>
            </div>

            <div className="report-confidence-box">
              <span>ANALYTICAL CONFIDENCE</span>

              <strong>{analysis.confidence}</strong>

              <div
                className={`report-confidence-band ${confidenceClass}`}
              >
                Evidence-backed confidence band
              </div>

              <small>
                Net Evidence Score:{" "}
                {analysis.net_score.toFixed(2)}
              </small>
            </div>
          </div>
        </section>

        {/* Hypothesis */}
        <section className="report-section">
          <div className="report-section-heading">
            <span>02</span>

            <div>
              <p className="section-eyebrow">
                HYPOTHESIS
              </p>

              <h2>Relationship Assessment</h2>
            </div>
          </div>

          <div className="report-hypothesis-box">
            <div>
              <span>SUBJECT A</span>
              <strong>{hypothesis.persona_a}</strong>
            </div>

            <div className="report-relationship-arrow">
              POSSIBLE LINK
            </div>

            <div>
              <span>SUBJECT B</span>
              <strong>{hypothesis.persona_b}</strong>
            </div>
          </div>

          <p className="report-disclaimer">
            This relationship is an analytical hypothesis and
            should not be interpreted as a definitive
            determination of common ownership or real-world
            identity.
          </p>
        </section>

        {/* Supporting evidence */}
        <section className="report-section">
          <div className="report-section-heading">
            <span>03</span>

            <div>
              <p className="section-eyebrow">
                SUPPORTING EVIDENCE
              </p>

              <h2>Signals strengthening the hypothesis</h2>
            </div>
          </div>

          <div className="report-evidence-table">
            <div className="report-table-header">
              <span>Evidence</span>
              <span>Category</span>
              <span>Strength</span>
              <span>Source</span>
            </div>

            {supporting.length > 0 ? (
              supporting.map((evidence) => (
                <div
                  className="report-table-row"
                  key={evidence.id}
                >
                  <strong>
                    {getEvidenceTitle(evidence.type)}
                  </strong>

                  <span>{evidence.category}</span>

                  <span className="report-positive">
                    {evidence.strength}
                  </span>

                  <span>{evidence.source}</span>
                </div>
              ))
            ) : (
              <div className="report-table-row">
                <strong>No supporting evidence</strong>
                <span>—</span>
                <span>—</span>
                <span>—</span>
              </div>
            )}
          </div>
        </section>

        {/* Contradictions */}
        <section className="report-section">
          <div className="report-section-heading">
            <span>04</span>

            <div>
              <p className="section-eyebrow">
                CONTRADICTORY EVIDENCE
              </p>

              <h2>Signals weakening the hypothesis</h2>
            </div>
          </div>

          <div className="report-evidence-table">
            <div className="report-table-header">
              <span>Evidence</span>
              <span>Category</span>
              <span>Severity</span>
              <span>Source</span>
            </div>

            {contradictory.length > 0 ? (
              contradictory.map((evidence) => (
                <div
                  className="report-table-row"
                  key={evidence.id}
                >
                  <strong>
                    {getEvidenceTitle(evidence.type)}
                  </strong>

                  <span>{evidence.category}</span>

                  <span className="report-negative">
                    {evidence.strength}
                  </span>

                  <span>{evidence.source}</span>
                </div>
              ))
            ) : (
              <div className="report-table-row">
                <strong>No contradictory evidence</strong>
                <span>—</span>
                <span>—</span>
                <span>—</span>
              </div>
            )}
          </div>
        </section>

        {/* Investigation gap */}
        <section className="report-section">
          <div className="report-section-heading">
            <span>05</span>

            <div>
              <p className="section-eyebrow">
                INVESTIGATION GAP
              </p>

              <h2>Missing evidence</h2>
            </div>
          </div>

          <div className="report-gap-box">
            <div className="report-gap-icon">!</div>

            <div>
              <span>INVESTIGATION PRIORITY</span>

              <h3>{analysis.investigation_gap}</h3>

              <p>
                The current evidence set contains signals
                that support and/or weaken the relationship.
                Additional independent corroboration may be
                required before the hypothesis can be
                strengthened further.
              </p>
            </div>
          </div>
        </section>

        {/* Next evidence */}
        <section className="report-section">
          <div className="report-section-heading">
            <span>06</span>

            <div>
              <p className="section-eyebrow">
                NEXT-BEST EVIDENCE
              </p>

              <h2>Recommended investigative direction</h2>
            </div>
          </div>

          <div className="report-next-evidence">
            <strong>
              {analysis.next_best_evidence}
            </strong>

            <p>
              This evidence could materially strengthen or
              weaken the current hypothesis depending on the
              result.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="report-section">
          <div className="report-section-heading">
            <span>07</span>

            <div>
              <p className="section-eyebrow">
                TIMELINE SUMMARY
              </p>

              <h2>Key chronological observations</h2>
            </div>
          </div>

          <div className="report-timeline">
            {reportTimeline.length > 0 ? (
              reportTimeline.map((event) => (
                <div key={event.id}>
                  <strong>
                    {formatDate(event.date)}
                  </strong>

                  <span>{event.title}</span>
                </div>
              ))
            ) : (
              <div>
                <strong>NO TIMELINE DATA</strong>

                <span>
                  No chronological observations are
                  currently linked to this hypothesis.
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="report-document-footer">
          <div>
            <strong>DARKTRACE</strong>
            <span>Connecting the Hidden Threads</span>
          </div>

          <div>
            <span>
              Generated from synthetic demonstration data
            </span>

            <span>Analytical Engine v0.1</span>
          </div>
        </footer>
      </main>
    </div>
  );
}