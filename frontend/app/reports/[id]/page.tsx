import Link from "next/link";
import PrintButton from "@/components/reports/print-button";

export default async function ReportPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
          <p className="section-eyebrow">INVESTIGATION REPORT</p>

          <h1>ShadowX ↔ ShadowNova</h1>

          <p>
            Evidence-backed attribution hypothesis
            <span className="hypothesis-dot">•</span>
            {id}
          </p>
        </div>

        <div className="report-actions">
          <Link
            href="/hypotheses/H-001"
            className="secondary-action"
          >
            View Analysis
          </Link>

          <button
            className="primary-action"
            onClick={() => window.print()}
          >
            Print / Save PDF
          </button>
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
            <strong>DT-H-001</strong>

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
              <p className="section-eyebrow">EXECUTIVE SUMMARY</p>
              <h2>Possible Persona Link</h2>
            </div>
          </div>

          <div className="report-summary-grid">
            <div className="report-summary-text">
              <p>
                DARKTRACE identified an evidence-backed hypothesis
                connecting the personas <strong>ShadowX</strong> and{" "}
                <strong>ShadowNova</strong>.
              </p>

              <p>
                The relationship is supported by a shared PGP
                identifier, behavioural similarity, semantic writing
                similarity and activity overlap.
              </p>

              <p>
                However, different infrastructure and a temporal
                activity gap introduce contradictory evidence.
                Independent corroboration of the PGP relationship is
                currently missing.
              </p>
            </div>

            <div className="report-confidence-box">
              <span>ANALYTICAL CONFIDENCE</span>

              <strong>62</strong>

              <div className="report-confidence-band">
                MEDIUM
              </div>

              <small>Data Confidence: 71%</small>
            </div>
          </div>
        </section>

        {/* Hypothesis */}
        <section className="report-section">
          <div className="report-section-heading">
            <span>02</span>

            <div>
              <p className="section-eyebrow">HYPOTHESIS</p>
              <h2>Relationship Assessment</h2>
            </div>
          </div>

          <div className="report-hypothesis-box">
            <div>
              <span>SUBJECT A</span>
              <strong>ShadowX</strong>
            </div>

            <div className="report-relationship-arrow">
              POSSIBLE LINK
            </div>

            <div>
              <span>SUBJECT B</span>
              <strong>ShadowNova</strong>
            </div>
          </div>

          <p className="report-disclaimer">
            This relationship is an analytical hypothesis and should
            not be interpreted as a definitive determination of
            common ownership or real-world identity.
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

            <div className="report-table-row">
              <strong>Shared PGP Identifier</strong>
              <span>Identity</span>
              <span className="report-positive">STRONG</span>
              <span>SRC-A</span>
            </div>

            <div className="report-table-row">
              <strong>Behavioural Similarity</strong>
              <span>Behavioural</span>
              <span className="report-positive">
                MODERATE
              </span>
              <span>SRC-C</span>
            </div>

            <div className="report-table-row">
              <strong>Semantic Writing Similarity</strong>
              <span>Linguistic</span>
              <span className="report-positive">
                MODERATE
              </span>
              <span>SRC-D</span>
            </div>

            <div className="report-table-row">
              <strong>Activity Overlap</strong>
              <span>Temporal</span>
              <span className="report-positive">
                MODERATE
              </span>
              <span>SRC-E</span>
            </div>
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

            <div className="report-table-row">
              <strong>Infrastructure Mismatch</strong>
              <span>Infrastructure</span>
              <span className="report-negative">
                MEDIUM
              </span>
              <span>SRC-F</span>
            </div>

            <div className="report-table-row">
              <strong>Temporal Activity Gap</strong>
              <span>Temporal</span>
              <span className="report-negative">
                MEDIUM
              </span>
              <span>SRC-G</span>
            </div>
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
              <span>HIGH PRIORITY</span>

              <h3>
                Independent corroboration of the PGP relationship
                is missing.
              </h3>

              <p>
                The current evidence set contains an important
                identifier relationship, but independent
                corroboration is required before the relationship
                can be strengthened further.
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
              Seek an independently sourced identifier linking
              both personas.
            </strong>

            <p>
              This evidence could materially strengthen or weaken
              the current hypothesis depending on the result.
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
            <div>
              <strong>12 AUG 2026</strong>
              <span>PGP-A association observed</span>
            </div>

            <div>
              <strong>18 AUG 2026</strong>
              <span>Activity overlap detected</span>
            </div>

            <div>
              <strong>19 AUG 2026</strong>
              <span>Infrastructure mismatch identified</span>
            </div>

            <div>
              <strong>20 AUG 2026</strong>
              <span>Temporal activity gap identified</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="report-document-footer">
          <div>
            <strong>DARKTRACE</strong>
            <span>Connecting the Hidden Threads</span>
          </div>

          <div>
            <span>Generated from synthetic demonstration data</span>
            <span>Analytical Engine v0.1</span>
          </div>
        </footer>
      </main>
    </div>
  );
}