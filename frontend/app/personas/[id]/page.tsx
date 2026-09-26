import Link from "next/link";
import AppShell from "@/components/layout/app-shell";
import RelationshipGraph from "@/components/graph/relationship-graph";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Persona {
  id: string;
  handle: string;
  status: string;
  pgp: string;
  wallet: string;
  infrastructure: string;
  writing_sample: string;
  activity_start: string;
  activity_end: string;
}

interface Hypothesis {
  id: string;
  persona_a: string;
  persona_b: string;
  title: string;
  assessment: string;
  evidence_ids: string[];
  investigation_status: string;
}

interface HypothesisAnalysis {
  confidence: "HIGH" | "MEDIUM" | "LOW";
}

interface HypothesisResponse {
  hypothesis: Hypothesis;
  analysis: HypothesisAnalysis;
}

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let persona: Persona | null = null;
  let hypotheses: HypothesisResponse[] = [];
  let error = false;

  try {
    const [personaResponse, hypothesesResponse] = await Promise.all([
      fetch(`${API_URL}/api/personas/${encodeURIComponent(id)}`, {
        cache: "no-store",
      }),
      fetch(`${API_URL}/api/hypotheses`, {
        cache: "no-store",
      }),
    ]);

    if (personaResponse.ok) {
      persona = await personaResponse.json();
    }

    if (hypothesesResponse.ok) {
      const data = await hypothesesResponse.json();

      const allHypotheses: Hypothesis[] = data.items || [];

      const related = allHypotheses.filter(
        (hypothesis) =>
          hypothesis.persona_a.toLowerCase() === id.toLowerCase() ||
          hypothesis.persona_b.toLowerCase() === id.toLowerCase(),
      );

      hypotheses = await Promise.all(
        related.map(async (hypothesis) => {
          const response = await fetch(
            `${API_URL}/api/hypotheses/${encodeURIComponent(hypothesis.id)}`,
            { cache: "no-store" },
          );

          if (!response.ok) {
            return {
              hypothesis,
              analysis: {
                confidence: "LOW" as const,
              },
            };
          }

          return response.json();
        }),
      );
    }
  } catch {
    error = true;
  }

  if (!persona) {
    return (
      <AppShell>
        <div className="page-container persona-page">
          <div className="persona-breadcrumb">
            <Link href="/dashboard">Dashboard</Link>
            <span> / </span>
            <Link href="/personas">Personas</Link>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <div className="eyebrow">PERSONA PROFILE</div>
                <h1>
                  {error ? "Unable to load persona" : "Persona not found"}
                </h1>
                <p>
                  {error
                    ? "The DARKTRACE intelligence API could not be reached."
                    : "The requested persona does not exist in the current synthetic dataset."}
                </p>
              </div>
            </div>

            <Link href="/dashboard" className="secondary-button">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const relatedHypotheses = hypotheses;

  return (
    <AppShell>
      <div className="page-container persona-page">
        <div className="persona-breadcrumb">
          <Link href="/personas">Personas</Link>
          <span> / </span>
          <span>{persona.handle}</span>
        </div>

        {/* HEADER */}
        <div className="persona-header">
          <div>
            <div className="eyebrow">PERSONA PROFILE</div>

            <div className="persona-title-row">
              <h1>{persona.handle}</h1>

              <span className="persona-id">{persona.id}</span>

              <span className="active-badge">
                {persona.status}
              </span>
            </div>

            <p>
              Synthetic intelligence entity representing a dark-web persona
              in the DARKTRACE demonstration dataset.
            </p>
          </div>

          <div className="persona-actions">
            {relatedHypotheses.length > 0 ? (
              <Link
                href={`/hypotheses/${relatedHypotheses[0].hypothesis.id}`}
                className="secondary-button"
              >
                View Hypotheses
              </Link>
            ) : (
              <Link
                href="/hypotheses"
                className="secondary-button"
              >
                View Hypotheses
              </Link>
            )}

            <Link
              href={`/reports/${persona.id}`}
              className="primary-button"
            >
              Generate Report
            </Link>
          </div>
        </div>

        {/* IDENTITY */}
        <section className="identity-grid">
          <div className="identity-card">
            <span>HANDLE</span>

            <div className="identity-values">
              <code>{persona.handle}</code>
            </div>
          </div>

          <div className="identity-card">
            <span>PGP</span>

            <div className="identity-values">
              <code>{persona.pgp}</code>
            </div>
          </div>

          <div className="identity-card">
            <span>WALLET</span>

            <div className="identity-values">
              <code>{persona.wallet}</code>
            </div>
          </div>

          <div className="identity-card">
            <span>INFRASTRUCTURE</span>

            <div className="identity-values">
              <code>{persona.infrastructure}</code>
            </div>
          </div>
        </section>

        {/* RELATIONSHIP GRAPH */}
        <section className="persona-section">
          <div className="section-heading">
            <div>
              <h2>Relationship Overview</h2>

              <p>
                Connected entities and possible relationships surrounding this
                persona.
              </p>
            </div>

            <span className="section-meta">
              {relatedHypotheses.length} hypothesis
              {relatedHypotheses.length !== 1 ? "es" : ""}
            </span>
          </div>

          <RelationshipGraph />
        </section>

        {/* BOTTOM GRID */}
        <section className="persona-bottom-grid">
          {/* TIMELINE */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Timeline</h2>
                <p>Observed activity window</p>
              </div>
            </div>

            <div className="mini-timeline">
              <div>
                <span>START</span>
                <p>
                  Activity observed from {persona.activity_start}
                </p>
              </div>

              <div>
                <span>IDENTITY</span>
                <p>
                  {persona.handle} associated with {persona.pgp}
                </p>
              </div>

              <div>
                <span>END</span>
                <p>
                  Activity observed through {persona.activity_end}
                </p>
              </div>

              <Link href="/timeline">
                View full timeline →
              </Link>
            </div>
          </div>

          {/* RELATED HYPOTHESES */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Related Hypotheses</h2>

                <p>
                  Analytical relationships involving {persona.handle}
                </p>
              </div>
            </div>

            {relatedHypotheses.length === 0 ? (
              <div className="related-hypothesis">
                <div>
                  <strong>No related hypotheses</strong>

                  <span>
                    No analytical relationship is currently linked to this
                    persona.
                  </span>
                </div>
              </div>
            ) : (
              relatedHypotheses.map(({ hypothesis, analysis }) => (
                <Link
                  key={hypothesis.id}
                  href={`/hypotheses/${hypothesis.id}`}
                  className="related-hypothesis"
                >
                  <div>
                    <code>{hypothesis.id}</code>

                    <strong>{hypothesis.title}</strong>

                    <span>
                      Possible Persona Link
                    </span>
                  </div>

                  <span
                    className={`confidence-badge ${analysis.confidence.toLowerCase()}`}
                  >
                    {analysis.confidence}
                  </span>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}