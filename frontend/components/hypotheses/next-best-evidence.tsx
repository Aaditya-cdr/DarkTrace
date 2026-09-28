type NextBestEvidenceProps = {
  nextBestEvidence: string;
};

export default function NextBestEvidence({
  nextBestEvidence,
}: NextBestEvidenceProps) {
  return (
    <section className="next-evidence-card">
      <div className="next-evidence-header">
        <div>
          <p className="section-eyebrow">NEXT-BEST EVIDENCE</p>
          <h3>Recommended investigative direction</h3>
        </div>

        <span className="expected-value">HIGH VALUE</span>
      </div>

      <p>
        {nextBestEvidence}
      </p>

      <div className="next-evidence-footer">
        <span>Recommended investigative direction</span>
        <strong>Independent corroboration</strong>
      </div>
    </section>
  );
}