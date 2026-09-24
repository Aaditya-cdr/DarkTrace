import Link from "next/link";
import AppShell from "@/components/layout/app-shell";
import RelationshipGraph from "@/components/graph/relationship-graph";

interface PersonaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PersonaPage({
  params,
}: PersonaPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="page-container persona-page">
        <div className="persona-breadcrumb">
          <Link href="/personas">Personas</Link>
          <span> / </span>
          <span>ShadowX</span>
        </div>

        <div className="persona-header">
          <div>
            <div className="eyebrow">
              PERSONA PROFILE
            </div>

            <div className="persona-title-row">
              <h1>ShadowX</h1>

              <span className="persona-id">
                P-001
              </span>

              <span className="active-badge">
                ACTIVE
              </span>
            </div>

            <p>
              Synthetic intelligence entity representing a
              dark-web persona in the DARKTRACE demonstration dataset.
            </p>
          </div>

          <div className="persona-actions">
            <Link
              href={`/hypotheses/H-001`}
              className="secondary-button"
            >
              View Hypotheses
            </Link>

            <button className="primary-button">
              Generate Report
            </button>
          </div>
        </div>

        <section className="identity-grid">
          <div className="identity-card">
            <span>HANDLES</span>

            <div className="identity-values">
              <code>ShadowX</code>
              <code>Shadow_X</code>
              <code>ShadowTrader</code>
            </div>
          </div>

          <div className="identity-card">
            <span>PGP</span>

            <div className="identity-values">
              <code>PGP-A</code>
            </div>
          </div>

          <div className="identity-card">
            <span>WALLET</span>

            <div className="identity-values">
              <code>WALLET-A</code>
            </div>
          </div>

          <div className="identity-card">
            <span>INFRASTRUCTURE</span>

            <div className="identity-values">
              <code>INFRA-01</code>
            </div>
          </div>
        </section>

        <section className="persona-section">
          <div className="section-heading">
            <div>
              <h2>Relationship Overview</h2>

              <p>
                Connected entities and possible relationships
                surrounding this persona.
              </p>
            </div>

            <span className="section-meta">
              7 entities
            </span>
          </div>

          <RelationshipGraph />
        </section>

        <section className="persona-bottom-grid">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Timeline</h2>
                <p>Recent observed activity</p>
              </div>
            </div>

            <div className="mini-timeline">
              <div>
                <span>JAN 08</span>
                <p>ShadowX appears with PGP-A</p>
              </div>

              <div>
                <span>JAN 17</span>
                <p>WALLET-A observed</p>
              </div>

              <div>
                <span>FEB 19</span>
                <p>Infrastructure activity observed</p>
              </div>

              <Link href={`/personas/${id}/timeline`}>
                View full timeline →
              </Link>
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Related Hypotheses</h2>
                <p>Analytical relationships involving ShadowX</p>
              </div>
            </div>

            <div className="related-hypothesis">
              <div>
                <code>H-001</code>

                <strong>
                  ShadowX ↔ ShadowNova
                </strong>

                <span>
                  Possible Persona Link
                </span>
              </div>

              <span className="confidence-badge medium">
                MEDIUM
              </span>
            </div>

            <div className="related-hypothesis">
              <div>
                <code>H-005</code>

                <strong>
                  ShadowX ↔ GhostMarket
                </strong>

                <span>
                  Possible Association
                </span>
              </div>

              <span className="confidence-badge low">
                LOW
              </span>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}