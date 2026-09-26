"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type TimelineEvent = {
  id: string;
  date: string;
  time: string;
  entity: string;
  type: string;
  title: string;
  description: string;
  direction: "SUPPORTING" | "CONTRADICTORY" | "NEUTRAL";
  source: string;
};

type TimelineResponse = {
  count: number;
  categories: string[];
  items: TimelineEvent[];
};

export default function TimelinePage() {
  const [filter, setFilter] = useState("ALL");
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTimeline() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/timeline`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Timeline API returned ${response.status}`,
          );
        }

        const data: TimelineResponse = await response.json();

        setTimelineEvents(data.items || []);
        setCategories(data.categories || []);
      } catch (err) {
        console.error("DARKTRACE Timeline API error:", err);

        setError(
          "Unable to load investigation timeline.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadTimeline();
  }, []);

  const filters = useMemo(
    () => ["ALL", ...categories],
    [categories],
  );

  const filteredEvents =
    filter === "ALL"
      ? timelineEvents
      : timelineEvents.filter(
          (event) => event.type === filter,
        );

  if (loading) {
    return (
      <div className="timeline-page">
        <div className="timeline-header">
          <div>
            <p className="section-eyebrow">
              INVESTIGATION CHRONOLOGY
            </p>

            <h1>Investigation Timeline</h1>

            <p>
              Loading observed intelligence signals,
              relationships and contradictions...
            </p>
          </div>
        </div>

        <section className="timeline-container">
          <div className="timeline-empty">
            <h3>Loading timeline...</h3>
            <p>
              Fetching chronological intelligence from the
              DARKTRACE API.
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="timeline-page">
        <div className="timeline-header">
          <div>
            <p className="section-eyebrow">
              INVESTIGATION CHRONOLOGY
            </p>

            <h1>Investigation Timeline</h1>

            <p>{error}</p>
          </div>
        </div>

        <section className="timeline-container">
          <div className="timeline-empty">
            <h3>Timeline unavailable</h3>

            <p>
              Make sure the DARKTRACE FastAPI backend is
              running on port 8000.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="timeline-page">
      {/* Header */}
      <div className="timeline-header">
        <div>
          <p className="section-eyebrow">
            INVESTIGATION CHRONOLOGY
          </p>

          <h1>Investigation Timeline</h1>

          <p>
            Chronological view of observed intelligence
            signals, relationships and contradictions across
            the dataset.
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
          <div
            className="timeline-event"
            key={event.id}
          >
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
              No timeline events match the selected
              category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}