import AppShell from "@/components/layout/app-shell";
import MetricCard from "@/components/dashboard/metric-card";
import HypothesisCard from "@/components/dashboard/hypothesis-card";

const hypotheses = [
  {
    id: "H-001",
    personaA: "ShadowX",
    personaB: "ShadowNova",
    confidence: "MEDIUM" as const,
    supporting: 4,
    contradictory: 2,
    gaps: 1,
  },
  {
    id: "H-002",
    personaA: "CipherWolf",
    personaB: "NullShade",
    confidence: "HIGH" as const,
    supporting: 5,
    contradictory: 0,
    gaps: 0,
  },
  {
    id: "H-003",
    personaA: "NightFox",
    personaB: "RedVector",
    confidence: "LOW" as const,
    supporting: 1,
    contradictory: 3,
    gaps: 2,
  },
];

const evidenceDistribution = [
  { label: "Identity", value: 82 },
  { label: "Infrastructure", value: 64 },
  { label: "Behavioural", value: 51 },
  { label: "Linguistic", value: 43 },
  { label: "Temporal", value: 58 },
];

const activity = [
  {
    time: "09:42",
    text: "Hypothesis H-001 analyzed",
  },
  {
    time: "09:31",
    text: "Evidence E-017 added",
  },
  {
    time: "09:18",
    text: "Persona ShadowNova updated",
  },
  {
    time: "08:56",
    text: "Relationship graph refreshed",
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="page-container dashboard-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <div className="eyebrow">
              INTELLIGENCE OVERVIEW
            </div>

            <h1>Dashboard</h1>

            <p>
              Monitor investigations, evidence and attribution
              hypotheses across the DARKTRACE intelligence environment.
            </p>
          </div>

          <button className="primary-button">
            Run Analysis
          </button>
        </div>

        {/* Metrics */}
        <section className="metric-grid">
          <MetricCard
            label="TOTAL PERSONAS"
            value="8"
            description="Entities in dataset"
          />

          <MetricCard
            label="HYPOTHESES"
            value="10"
            description="Analytical relationships"
          />

          <MetricCard
            label="EVIDENCE"
            value="64"
            description="Evidence records"
          />

          <MetricCard
            label="OPEN GAPS"
            value="12"
            description="Investigation gaps"
          />
        </section>

        {/* Main grid */}
        <section className="dashboard-grid">
          {/* Hypotheses */}
          <div className="dashboard-panel hypotheses-panel">
            <div className="panel-header">
              <div>
                <h2>Active Hypotheses</h2>
                <p>
                  Current evidence-backed relationship hypotheses
                </p>
              </div>

              <span className="panel-count">10 total</span>
            </div>

            <div className="hypothesis-list">
              {hypotheses.map((hypothesis) => (
                <HypothesisCard
                  key={hypothesis.id}
                  {...hypothesis}
                />
              ))}
            </div>
          </div>

          {/* Evidence Distribution */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Evidence Distribution</h2>
                <p>Current analytical evidence by category</p>
              </div>
            </div>

            <div className="evidence-distribution">
              {evidenceDistribution.map((item) => (
                <div
                  className="distribution-row"
                  key={item.label}
                >
                  <div className="distribution-meta">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>

                  <div className="distribution-track">
                    <div
                      className="distribution-fill"
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="distribution-note">
              Values represent analytical evidence contribution,
              not absolute probability.
            </div>
          </div>
        </section>

        {/* Recent activity */}
        <section className="dashboard-panel activity-panel">
          <div className="panel-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest changes in the intelligence environment</p>
            </div>
          </div>

          <div className="activity-list">
            {activity.map((item) => (
              <div className="activity-item" key={item.time}>
                <div className="activity-marker" />

                <div className="activity-content">
                  <span className="activity-time">
                    {item.time}
                  </span>

                  <span className="activity-text">
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}