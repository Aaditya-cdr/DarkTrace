"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type EvidenceDirection = "SUPPORTING" | "CONTRADICTORY";

type Evidence = {
  id: string;
  type: string;
  category: string;
  title: string;
  description: string;
  direction: EvidenceDirection;
  strength: string;
  source: string;
  entities: string[];
  date: string;
};

const categories = [
  "ALL",
  "IDENTITY",
  "INFRASTRUCTURE",
  "BEHAVIOURAL",
  "LINGUISTIC",
  "TEMPORAL",
];

export default function EvidencePage() {
  const [evidenceData, setEvidenceData] = useState<Evidence[]>([]);
  const [category, setCategory] = useState("ALL");
  const [direction, setDirection] = useState("ALL");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvidence() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/evidence`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load evidence");
        }

        const result = await response.json();

        setEvidenceData(result.items);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to connect to the DARKTRACE intelligence API."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEvidence();
  }, []);

  const filteredEvidence = useMemo(() => {
    return evidenceData.filter((evidence) => {
      const matchesCategory =
        category === "ALL" || evidence.category === category;

      const matchesDirection =
        direction === "ALL" ||
        evidence.direction === direction;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        evidence.id.toLowerCase().includes(query) ||
        evidence.title.toLowerCase().includes(query) ||
        evidence.type.toLowerCase().includes(query) ||
        evidence.description.toLowerCase().includes(query) ||
        evidence.entities.some((entity) =>
          entity.toLowerCase().includes(query)
        );

      return (
        matchesCategory &&
        matchesDirection &&
        matchesSearch
      );
    });
  }, [evidenceData, category, direction, search]);

  return (
    <div className="evidence-page">
      {/* Header */}
      <div className="evidence-page-header">
        <div>
          <p className="section-eyebrow">
            INTELLIGENCE DATASET
          </p>

          <h1>Evidence Explorer</h1>

          <p className="evidence-page-subtitle">
            Inspect evidence signals, provenance and analytical direction
            across the DARKTRACE dataset.
          </p>
        </div>

        <div className="evidence-total">
          <strong>{evidenceData.length}</strong>
          <span>Total Evidence</span>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="evidence-empty">
          <h3>Loading evidence...</h3>
          <p>
            Retrieving intelligence records from the DARKTRACE API.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="evidence-empty">
          <h3>Unable to load evidence</h3>
          <p>{error}</p>
          <p>
            Make sure the FastAPI backend is running on port 8000.
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Search */}
          <div className="evidence-search">
            <input
              type="text"
              placeholder="Search evidence, entities, identifiers..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          {/* Filters */}
          <div className="evidence-filters">
            <div className="filter-group">
              <span>Category</span>

              <div className="filter-buttons">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={
                      category === item ? "active" : ""
                    }
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <span>Direction</span>

              <div className="filter-buttons">
                <button
                  className={
                    direction === "ALL" ? "active" : ""
                  }
                  onClick={() => setDirection("ALL")}
                >
                  ALL
                </button>

                <button
                  className={
                    direction === "SUPPORTING"
                      ? "active supporting-filter"
                      : ""
                  }
                  onClick={() =>
                    setDirection("SUPPORTING")
                  }
                >
                  SUPPORTING
                </button>

                <button
                  className={
                    direction === "CONTRADICTORY"
                      ? "active contradictory-filter"
                      : ""
                  }
                  onClick={() =>
                    setDirection("CONTRADICTORY")
                  }
                >
                  CONTRADICTORY
                </button>
              </div>
            </div>
          </div>

          {/* Result count */}
          <div className="evidence-result-header">
            <span>
              Showing{" "}
              <strong>{filteredEvidence.length}</strong>{" "}
              evidence records
            </span>

            {(category !== "ALL" ||
              direction !== "ALL" ||
              search.length > 0) && (
              <button
                className="clear-filters"
                onClick={() => {
                  setCategory("ALL");
                  setDirection("ALL");
                  setSearch("");
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Evidence list */}
          <div className="evidence-list">
            {filteredEvidence.map((evidence) => (
              <Link
                href={`/evidence/${evidence.id}`}
                className="evidence-row"
                key={evidence.id}
              >
                <article>
                  <div className="evidence-row-main">
                    <div className="evidence-row-id">
                      {evidence.id}
                    </div>

                    <div className="evidence-row-content">
                      <div className="evidence-row-title">
                        <h2>{evidence.title}</h2>

                        <span
                          className={`direction-badge ${
                            evidence.direction === "SUPPORTING"
                              ? "supporting"
                              : "contradictory"
                          }`}
                        >
                          {evidence.direction}
                        </span>
                      </div>

                      <p>{evidence.description}</p>

                      <div className="evidence-entities">
                        {evidence.entities.map((entity) => (
                          <span key={entity}>
                            {entity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="evidence-row-meta">
                      <span className="evidence-category">
                        {evidence.category}
                      </span>

                      <span
                        className={`evidence-strength-tag ${evidence.strength.toLowerCase()}`}
                      >
                        {evidence.strength}
                      </span>

                      <span className="evidence-source-tag">
                        {evidence.source}
                      </span>

                      <span className="evidence-date">
                        {evidence.date}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {filteredEvidence.length === 0 && (
              <div className="evidence-empty">
                <h3>No evidence found</h3>

                <p>
                  Try changing the filters or searching for
                  another entity, identifier or evidence type.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}