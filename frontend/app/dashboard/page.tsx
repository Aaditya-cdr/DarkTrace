"use client";

import { useCallback, useEffect, useState } from "react";

import AppShell from "@/components/layout/app-shell";
import MetricCard from "@/components/dashboard/metric-card";
import HypothesisCard from "@/components/dashboard/hypothesis-card";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type DashboardHypothesis = {
  id: string;
  personaA: string;
  personaB: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  supporting: number;
  contradictory: number;
  gaps: number;
};

type EvidenceDistribution = {
  label: string;
  value: number;
};

type ActivityItem = {
  time: string;
  text: string;
};

type DashboardData = {
  metrics: {
    personas: number;
    hypotheses: number;
    evidence: number;
    open_gaps: number;
  };
  hypotheses: DashboardHypothesis[];
  evidence_distribution: EvidenceDistribution[];
  activity: ActivityItem[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(
    async (isAnalysisRun = false) => {
      try {
        if (isAnalysisRun) {
          setRunningAnalysis(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const response = await fetch(`${API_URL}/api/dashboard`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const result: DashboardData = await response.json();

        setData(result);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to connect to the DARKTRACE intelligence API."
        );
      } finally {
        setLoading(false);
        setRunningAnalysis(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleRunAnalysis = () => {
    loadDashboard(true);
  };

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

          <button
            className="primary-button"
            onClick={handleRunAnalysis}
            disabled={runningAnalysis}
          >
            {runningAnalysis ? "Analyzing..." : "Run Analysis"}
          </button>
        </div>

        {/* Initial loading */}
        {loading && (
          <div className="dashboard-panel">
            <p>Loading intelligence data...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="dashboard-panel">
            <p>{error}</p>

            <p>
              Make sure the FastAPI backend is running on port 8000.
            </p>
          </div>
        )}

        {/* Dashboard */}
        {data && (
          <>
            {/* Metrics */}
            <section className="metric-grid">
              <MetricCard
                label="TOTAL PERSONAS"
                value={String(data.metrics.personas)}
                description="Entities in dataset"
              />

              <MetricCard
                label="HYPOTHESES"
                value={String(data.metrics.hypotheses)}
                description="Analytical relationships"
              />

              <MetricCard
                label="EVIDENCE"
                value={String(data.metrics.evidence)}
                description="Evidence records"
              />

              <MetricCard
                label="OPEN GAPS"
                value={String(data.metrics.open_gaps)}
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

                  <span className="panel-count">
                    {data.hypotheses.length} total
                  </span>
                </div>

                <div className="hypothesis-list">
                  {data.hypotheses.map((hypothesis) => (
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

                    <p>
                      Current analytical evidence by category
                    </p>
                  </div>
                </div>

                <div className="evidence-distribution">
                  {data.evidence_distribution.map((item) => (
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

            {/* Recent Activity */}
            <section className="dashboard-panel activity-panel">
              <div className="panel-header">
                <div>
                  <h2>Recent Activity</h2>

                  <p>
                    Latest changes in the intelligence environment
                  </p>
                </div>
              </div>

              <div className="activity-list">
                {data.activity.map((item, index) => (
                  <div
                    className="activity-item"
                    key={`${item.text}-${index}`}
                  >
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
          </>
        )}
      </div>
    </AppShell>
  );
}