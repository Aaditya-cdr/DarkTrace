"use client";

export default function ConfidenceCard() {
  return (
    <section className="hypothesis-confidence-card">
      <div className="hypothesis-confidence-header">
        <div>
          <p className="section-eyebrow">ANALYTICAL CONFIDENCE</p>
          <div className="confidence-score-row">
            <span className="confidence-score">62</span>
            <span className="confidence-band medium">MEDIUM</span>
          </div>
        </div>

        <div className="confidence-summary">
          <span>Data Confidence</span>
          <strong>71%</strong>
        </div>
      </div>

      <div className="confidence-bar">
        <div
          className="confidence-fill medium-fill"
          style={{ width: "62%" }}
        />
      </div>

      <p className="confidence-description">
        The hypothesis is supported by multiple signals, but unresolved
        contradictions and limited independent corroboration prevent a high
        confidence assessment.
      </p>
    </section>
  );
}