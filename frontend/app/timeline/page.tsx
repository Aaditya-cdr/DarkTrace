"use client";

import { useState } from "react";

type TimelineEvent = {
  date: string;
  time: string;
  entity: string;
  type: string;
  title: string;
  description: string;
  direction: "SUPPORTING" | "CONTRADICTORY" | "NEUTRAL";
  source: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    date: "2026-08-12",
    time: "09:42",
    entity: "ShadowX",
    type: "IDENTITY",
    title: "PGP-A observed",
    description:
      "PGP identifier PGP-A is associated with ShadowX in the observed dataset.",
    direction: "SUPPORTING",
    source: "SRC-A",
  },
  {
    date: "2026-08-15",
    time: "13:18",
    entity: "ShadowX",
    type: "BEHAVIOURAL",
    title: "Behavioural pattern recorded",
    description:
      "Activity patterns associated with ShadowX establish a behavioural baseline for comparison.",
    direction: "NEUTRAL",
    source: "SRC-C",
  },
  {
    date: "2026-08-17",
    time: "16:04",
    entity: "ShadowNova",
    type: "LINGUISTIC",
    title: "Writing sample observed",
    description:
      "A writing sample associated with ShadowNova contains semantic characteristics comparable to ShadowX.",
    direction: "SUPPORTING",
    source: "SRC-D",
  },
  {
    date: "2026-08-18",
    time: "10:27",
    entity: "ShadowX ↔ ShadowNova",
    type: "TEMPORAL",
    title: "Activity overlap detected",
    description:
      "Several activity windows associated with the two personas overlap within the observed period.",
    direction: "SUPPORTING",
    source: "SRC-E",
  },
  {
    date: "2026-08-19",
    time: "14:51",
    entity: "ShadowX ↔ ShadowNova",
    type: "INFRASTRUCTURE",
    title: "Infrastructure mismatch detected",
    description:
      "The personas are associated with different infrastructure nodes: INFRA-01 and INFRA-02.",
    direction: "CONTRADICTORY",
    source: "SRC-F",
  },
  {
    date: "2026-08-20",
    time: "11:36",
    entity: "ShadowX ↔ ShadowNova",
    type: "TEMPORAL",
    title: "Temporal activity gap identified",
    description:
      "A period of expected continuity is not observed between the two activity sequences.",
    direction: "CONTRADICTORY",
    source: "SRC-G",
  },
  {
    date: "2026-08-21",
    time: "08:15",
    entity: "CipherWolf ↔ NullShade",
    type: "IDENTITY",
    title: "Independent PGP-D association",
    description:
      "Both personas are independently associated with PGP-D.",
    direction: "SUPPORTING",
    source: "SRC-H",
  },
  {
    date: "2026-08-22",
    time: "17:23",
    entity: "CipherWolf ↔ NullShade",
    type: "INFRASTRUCTURE",
    title: "Infrastructure continuity detected",
    description:
      "Both personas show association with infrastructure node INFRA-04.",
    direction: "SUPPORTING",
    source: "SRC-I",
  },
];

const filters = [
  "ALL",
  "IDENTITY",
  "INFRASTRUCTURE",
  "BEHAVIOURAL",
  "LINGUISTIC",
  "TEMPORAL",
];

export default function TimelinePage() {
  const [filter, setFilter] = useState("ALL");

  const filteredEvents =
    filter === "ALL"
      ? timelineEvents
      : timelineEvents.filter((event) => event.type === filter);

  return (
    <div className="timeline-page">
      {/* Header */}
      <div className="timeline-header">
        <div>
          <p className="section-eyebrow">INVESTIGATION CHRONOLOGY</p>

          <h1>Investigation Timeline</h1>

          <p>
            Chronological view of observed intelligence signals,
            relationships and contradictions across the dataset.
          </p>
        </div>

        <div className="timeline-summary">
          <strong>{filteredEvents.length}</strong>
          <span>Events</span>
        </div>
      </div>

      {/* Filters */}
      <div className="timeline-filter-bar">
        <span>Event Category</span>

        <div className="timeline-filter-buttons">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <section className="timeline-container">
        {filteredEvents.map((event, index) => (
          <div className="timeline-event" key={`${event.date}-${event.time}`}>
            <div className="timeline-date-column">
              <strong>{event.date}</strong>
              <span>{event.time}</span>
            </div>

            <div className="timeline-line-column">
              <div
                className={`timeline-marker ${event.direction.toLowerCase()}`}
              />

              {index !== filteredEvents.length - 1 && (
                <div className="timeline-line" />
              )}
            </div>

            <article className="timeline-event-card">
              <div className="timeline-event-top">
                <div>
                  <span className="timeline-event-type">
                    {event.type}
                  </span>

                  <h2>{event.title}</h2>
                </div>

                <span
                  className={`timeline-direction ${event.direction.toLowerCase()}`}
                >
                  {event.direction}
                </span>
              </div>

              <p>{event.description}</p>

              <div className="timeline-event-footer">
                <span>Entity</span>

                <strong>{event.entity}</strong>

                <span>Source</span>

                <strong>{event.source}</strong>
              </div>
            </article>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="timeline-empty">
            <h3>No events found</h3>
            <p>
              No timeline events match the selected category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}