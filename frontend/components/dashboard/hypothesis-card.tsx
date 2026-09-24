import Link from "next/link";

interface HypothesisCardProps {
  id: string;
  personaA: string;
  personaB: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  supporting: number;
  contradictory: number;
  gaps: number;
}

export default function HypothesisCard({
  id,
  personaA,
  personaB,
  confidence,
  supporting,
  contradictory,
  gaps,
}: HypothesisCardProps) {
  return (
    <Link href={`/hypotheses/${id}`} className="hypothesis-card">
      <div className="hypothesis-top">
        <div>
          <div className="hypothesis-id">{id}</div>

          <div className="hypothesis-title">
            {personaA} <span>↔</span> {personaB}
          </div>
        </div>

        <span className={`confidence-badge ${confidence.toLowerCase()}`}>
          {confidence}
        </span>
      </div>

      <div className="hypothesis-subtitle">
        Possible Persona Link
      </div>

      <div className="hypothesis-stats">
        <span className="supporting-stat">
          {supporting} Supporting
        </span>

        <span className="contradictory-stat">
          {contradictory} Contradictory
        </span>

        <span className="gap-stat">
          {gaps} {gaps === 1 ? "Gap" : "Gaps"}
        </span>
      </div>
    </Link>
  );
}