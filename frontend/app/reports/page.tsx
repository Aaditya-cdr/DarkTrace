"use client";

import Link from "next/link";

export default function ReportsPage() {
  return (
    <div className="reports-page">
      <div className="page-breadcrumb">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <strong>Reports</strong>
      </div>

      <header className="reports-header">
        <div>
          <p className="section-eyebrow">INVESTIGATION OUTPUT</p>

          <h1>Reports</h1>

          <p>
            Generate and review evidence-backed investigation reports
            from DARKTRACE hypotheses.
          </p>
        </div>
      </header>

      <section className="report-list-card">
        <div className="report-list-header">
          <div>
            <p className="section-eyebrow">AVAILABLE REPORTS</p>
            <h2>Investigation Reports</h2>
          </div>

          <span className="report-count">1 report</span>
        </div>

        <Link
          href="/reports/H-001"
          className="report-list-item"
        >
          <div className="report-list-icon">
            R
          </div>

          <div className="report-list-content">
            <div className="report-list-title">
              <h3>ShadowX ↔ ShadowNova Investigation</h3>

              <span className="confidence-band medium">
                MEDIUM
              </span>
            </div>

            <p>
              Evidence-backed attribution hypothesis report based on
              the current synthetic dataset.
            </p>

            <div className="report-list-meta">
              <span>H-001</span>
              <span>4 Supporting</span>
              <span>2 Contradictory</span>
              <span>1 Open Gap</span>
            </div>
          </div>

          <span className="report-arrow">→</span>
        </Link>
      </section>
    </div>
  );
}