export default function InvestigationGap() {
  return (
    <section className="investigation-gap-card">
      <div className="gap-icon">!</div>

      <div className="gap-content">
        <div className="gap-header">
          <div>
            <p className="section-eyebrow">INVESTIGATION GAP</p>
            <h3>Independent corroboration is missing</h3>
          </div>

          <span className="gap-priority">HIGH PRIORITY</span>
        </div>

        <p>
          Independent corroboration of the PGP relationship is missing.
          The current relationship should therefore remain a hypothesis
          rather than an established attribution.
        </p>

        <div className="gap-state">
          <span>Evidence State</span>
          <strong>UNKNOWN</strong>
        </div>
      </div>
    </section>
  );
}