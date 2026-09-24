"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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

const evidenceData: Evidence[] = [
  {
    id: "E-001",
    type: "SHARED_PGP",
    category: "IDENTITY",
    title: "Shared PGP Identifier",
    description:
      "Both ShadowX and ShadowNova are associated with the PGP identifier PGP-A.",
    direction: "SUPPORTING",
    strength: "STRONG",
    source: "SRC-A",
    entities: ["ShadowX", "ShadowNova", "PGP-A"],
    date: "2026-08-12",
  },
  {
    id: "E-002",
    type: "BEHAVIOURAL_SIMILARITY",
    category: "BEHAVIOURAL",
    title: "Behavioural Pattern Similarity",
    description:
      "Observed activity patterns show meaningful similarity across marketplace interactions.",
    direction: "SUPPORTING",
    strength: "MODERATE",
    source: "SRC-C",
    entities: ["ShadowX", "ShadowNova"],
    date: "2026-08-15",
  },
  {
    id: "E-003",
    type: "SEMANTIC_SIMILARITY",
    category: "LINGUISTIC",
    title: "Semantic Writing Similarity",
    description:
      "Writing samples demonstrate similarities in terminology, sentence structure and recurring expressions.",
    direction: "SUPPORTING",
    strength: "MODERATE",
    source: "SRC-D",
    entities: ["ShadowX", "ShadowNova"],
    date: "2026-08-17",
  },
  {
    id: "E-004",
    type: "ACTIVITY_OVERLAP",
    category: "TEMPORAL",
    title: "Activity Timeline Overlap",
    description:
      "Several observed activity windows overlap within the same period.",
    direction: "SUPPORTING",
    strength: "MODERATE",
    source: "SRC-E",
    entities: ["ShadowX", "ShadowNova"],
    date: "2026-08-18",
  },
  {
    id: "E-005",
    type: "INFRASTRUCTURE_MISMATCH",
    category: "INFRASTRUCTURE",
    title: "Infrastructure Mismatch",
    description:
      "The two personas are associated with different infrastructure nodes.",
    direction: "CONTRADICTORY",
    strength: "MODERATE",
    source: "SRC-F",
    entities: ["ShadowX", "ShadowNova", "INFRA-01", "INFRA-02"],
    date: "2026-08-19",
  },
  {
    id: "E-006",
    type: "TEMPORAL_GAP",
    category: "TEMPORAL",
    title: "Temporal Activity Gap",
    description:
      "A period of expected activity continuity is not observed between the two personas.",
    direction: "CONTRADICTORY",
    strength: "MODERATE",
    source: "SRC-G",
    entities: ["ShadowX", "ShadowNova"],
    date: "2026-08-20",
  },
  {
    id: "E-007",
    type: "SHARED_PGP",
    category: "IDENTITY",
    title: "Shared PGP Identifier",
    description:
      "CipherWolf and NullShade are independently associated with PGP-D.",
    direction: "SUPPORTING",
    strength: "STRONG",
    source: "SRC-H",
    entities: ["CipherWolf", "NullShade", "PGP-D"],
    date: "2026-08-21",
  },
  {
    id: "E-008",
    type: "INFRASTRUCTURE_CONTINUITY",
    category: "INFRASTRUCTURE",
    title: "Infrastructure Continuity",
    description:
      "Both personas show association with infrastructure node INFRA-04.",
    direction: "SUPPORTING",
    strength: "STRONG",
    source: "SRC-I",
    entities: ["CipherWolf", "NullShade", "INFRA-04"],
    date: "2026-08-22",
  },
  {
    id: "E-009",
    type: "SEMANTIC_SIMILARITY",
    category: "LINGUISTIC",
    title: "Limited Semantic Similarity",
    description:
      "NightFox and RedVector demonstrate limited semantic similarity in observed writing samples.",
    direction: "SUPPORTING",
    strength: "WEAK",
    source: "SRC-J",
    entities: ["NightFox", "RedVector"],
    date: "2026-08-23",
  },
  {
    id: "E-010",
    type: "IDENTIFIER_CONFLICT",
    category: "IDENTITY",
    title: "Identifier Conflict",
    description:
      "Observed identifiers do not provide consistent corroboration between the two personas.",
    direction: "CONTRADICTORY",
    strength: "STRONG",
    source: "SRC-J",
    entities: ["NightFox", "RedVector"],
    date: "2026-08-24",
  },
];

const categories = [
  "ALL",
  "IDENTITY",
  "INFRASTRUCTURE",
  "BEHAVIOURAL",
  "LINGUISTIC",
  "TEMPORAL",
];

export default function EvidencePage() {
  const [category, setCategory] = useState("ALL");
  const [direction, setDirection] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredEvidence = useMemo(() => {
    return evidenceData.filter((evidence) => {
      const matchesCategory =
        category === "ALL" || evidence.category === category;

      const matchesDirection =
        direction === "ALL" || evidence.direction === direction;

      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        evidence.id.toLowerCase().includes(query) ||
        evidence.title.toLowerCase().includes(query) ||
        evidence.type.toLowerCase().includes(query) ||
        evidence.description.toLowerCase().includes(query) ||
        evidence.entities.some((entity) =>
          entity.toLowerCase().includes(query)
        );

      return matchesCategory && matchesDirection && matchesSearch;
    });
  }, [category, direction, search]);

  return (
    <div className="evidence-page">
      {/* Header */}
      <div className="evidence-page-header">
        <div>
          <p className="section-eyebrow">INTELLIGENCE DATASET</p>

          <h1>Evidence Explorer</h1>

          <p className="evidence-page-subtitle">
            Inspect evidence signals, provenance and analytical direction
            across the DARKTRACE dataset.
          </p>
        </div>

        <div className="evidence-total">
          <strong>64</strong>
          <span>Total Evidence</span>
        </div>
      </div>

      {/* Search */}
      <div className="evidence-search">
        <input
          type="text"
          placeholder="Search evidence, entities, identifiers..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
                className={category === item ? "active" : ""}
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
              className={direction === "ALL" ? "active" : ""}
              onClick={() => setDirection("ALL")}
            >
              ALL
            </button>

            <button
              className={direction === "SUPPORTING" ? "active supporting-filter" : ""}
              onClick={() => setDirection("SUPPORTING")}
            >
              SUPPORTING
            </button>

            <button
              className={
                direction === "CONTRADICTORY"
                  ? "active contradictory-filter"
                  : ""
              }
              onClick={() => setDirection("CONTRADICTORY")}
            >
              CONTRADICTORY
            </button>
          </div>
        </div>
      </div>

      {/* Result count */}
      <div className="evidence-result-header">
        <span>
          Showing <strong>{filteredEvidence.length}</strong> evidence records
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
                    <span key={entity}>{entity}</span>
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
              Try changing the filters or searching for another entity,
              identifier or evidence type.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}