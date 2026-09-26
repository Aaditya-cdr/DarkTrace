"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type Hypothesis = {
  id: string;
  title: string;
  persona_a: string;
  persona_b: string;
  assessment: string;
  investigation_status: string;
};

type HypothesisAnalysis = {
  confidence: "HIGH" | "MEDIUM" | "LOW";
  supporting_evidence: unknown[];
  contradictory_evidence: unknown[];
  investigation_gap: string;
};

type Report = {
  id: string;
  title: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  supporting: number;
  contradictory: number;
  gaps: number;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/api/hypotheses`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Hypothesis API returned ${response.status}`,
          );
        }

        const data = await response.json();
        const hypotheses: Hypothesis[] = data.items || [];

        const generatedReports = await Promise.all(
          hypotheses.map(async (hypothesis) => {
            const analysisResponse = await fetch(
              `${API_URL}/api/hypotheses/${encodeURIComponent(
                hypothesis.id,
              )}`,
              {
                cache: "no-store",
              },
            );

            if (!analysisResponse.ok) {
              throw new Error(
                `Unable to load ${hypothesis.id}`,
              );
            }

            const result = await analysisResponse.json();

            const analysis: HypothesisAnalysis =
              result.analysis;

            return {
              id: hypothesis.id,
              title: `${hypothesis.title} Investigation`,
              confidence: analysis.confidence,
              supporting:
                analysis.supporting_evidence.length,
              contradictory:
                analysis.contradictory_evidence.length,
              gaps: analysis.investigation_gap ? 1 : 0,
            };
          }),
        );

        setReports(generatedReports);
      } catch (err) {
        console.error(
          "DARKTRACE Reports API error:",
          err,
        );

        setError(
          "Unable to load investigation reports.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <div className="reports-page">
      <div className="page-breadcrumb">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <strong>Reports</strong>
      </div>

      <header className="reports-header">
        <div>
          <p className="section-eyebrow">
            INVESTIGATION OUTPUT
          </p>

          <h1>Reports</h1>

          <p>
            Generate and review evidence-backed investigation
            reports from DARKTRACE hypotheses.
          </p>
        </div>
      </header>

      <section className="report-list-card">
        <div className="report-list-header">
          <div>
            <p className="section-eyebrow">
              AVAILABLE REPORTS
            </p>

            <h2>Investigation Reports</h2>
          </div>

          <span className="report-count">
            {loading
              ? "Loading..."
              : `${reports.length} ${
                  reports.length === 1
                    ? "report"
                    : "reports"
                }`}
          </span>
        </div>

        {loading && (
          <div className="timeline-empty">
            <h3>Loading reports...</h3>
            <p>
              Fetching investigation hypotheses from the
              DARKTRACE API.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="timeline-empty">
            <h3>Reports unavailable</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          reports.length === 0 && (
            <div className="timeline-empty">
              <h3>No reports available</h3>
              <p>
                No investigation hypotheses are currently
                available for report generation.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          reports.map((report) => (
            <Link
              key={report.id}
              href={`/reports/${report.id}`}
              className="report-list-item"
            >
              <div className="report-list-icon">
                R
              </div>

              <div className="report-list-content">
                <div className="report-list-title">
                  <h3>{report.title}</h3>

                  <span
                    className={`confidence-band ${report.confidence.toLowerCase()}`}
                  >
                    {report.confidence}
                  </span>
                </div>

                <p>
                  Evidence-backed attribution hypothesis
                  report based on the current synthetic
                  dataset.
                </p>

                <div className="report-list-meta">
                  <span>{report.id}</span>

                  <span>
                    {report.supporting} Supporting
                  </span>

                  <span>
                    {report.contradictory} Contradictory
                  </span>

                  <span>
                    {report.gaps} Open Gap
                  </span>
                </div>
              </div>

              <span className="report-arrow">
                →
              </span>
            </Link>
          ))}
      </section>
    </div>
  );
}