type ContradictionCardProps = {
  title: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  source: string;
};

export default function ContradictionCard({
  title,
  description,
  severity,
  source,
}: ContradictionCardProps) {
  return (
    <article className="hypothesis-contradiction-card">
      <div className="contradiction-card-top">
        <div>
          <span className="contradiction-label">CONTRADICTORY EVIDENCE</span>
          <h3>{title}</h3>
        </div>

        <span className={`severity-badge ${severity.toLowerCase()}`}>
          {severity}
        </span>
      </div>

      <p>{description}</p>

      <div className="evidence-source">
        <span>Source</span>
        <strong>{source}</strong>
      </div>
    </article>
  );
}