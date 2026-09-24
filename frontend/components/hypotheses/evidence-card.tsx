type EvidenceCardProps = {
  title: string;
  type: string;
  description: string;
  strength: string;
  source: string;
};

export default function EvidenceCard({
  title,
  type,
  description,
  strength,
  source,
}: EvidenceCardProps) {
  return (
    <article className="hypothesis-evidence-card">
      <div className="evidence-card-top">
        <div>
          <span className="evidence-type">{type}</span>
          <h3>{title}</h3>
        </div>

        <span className="evidence-strength">{strength}</span>
      </div>

      <p>{description}</p>

      <div className="evidence-source">
        <span>Source</span>
        <strong>{source}</strong>
      </div>
    </article>
  );
}