"use client";

import { useEffect, useRef, useState } from "react";
import cytoscape, {
  Core,
  ElementDefinition,
} from "cytoscape";

type EntityType =
  | "persona"
  | "pgp"
  | "wallet"
  | "infrastructure";

interface SelectedEntity {
  id: string;
  label: string;
  type: EntityType;
}

interface GraphNode {
  data: {
    id: string;
    label: string;
    type: EntityType;
    status?: string;
  };

  position?: {
    x: number;
    y: number;
  };
}

interface GraphEdge {
  data: {
    id: string;
    source: string;
    target: string;
    label?: string;
    type: string;
    assessment?: string;
    supporting_count?: number;
    contradictory_count?: number;
    investigation_status?: string;
  };
}

interface GraphResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];

  metadata: {
    persona_count: number;
    relationship_count: number;
    source: string;
  };
}

const API_URL = "http://127.0.0.1:8000";

export default function RelationshipGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);

  const [selectedEntity, setSelectedEntity] =
    useState<SelectedEntity | null>(null);

  const [graphData, setGraphData] =
    useState<GraphResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /*
   * ---------------------------------------------------------
   * Load graph data from FastAPI
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const loadGraph = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/api/graph`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Graph API returned ${response.status}`
          );
        }

        const data: GraphResponse =
          await response.json();

        setGraphData(data);
      } catch (err) {
        console.error(
          "DARKTRACE Graph API error:",
          err
        );

        setError(
          "Unable to load relationship graph."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGraph();
  }, []);

  /*
   * ---------------------------------------------------------
   * Initialize Cytoscape when data arrives
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      !containerRef.current ||
      !graphData
    ) {
      return;
    }

    const elements: ElementDefinition[] = [
      ...graphData.nodes,
      ...graphData.edges,
    ];

    const cy = cytoscape({
      container: containerRef.current,

      elements,

      style: [
        /*
         * ---------------------------------------------------
         * Base node
         * ---------------------------------------------------
         */

        {
          selector: "node",

          style: {
            label: "data(label)",

            "font-family":
              "Inter, sans-serif",

            "font-size": 11,

            color: "#334155",

            "text-valign": "center",

            "text-halign": "center",

            "background-color": "#ffffff",

            "border-width": 1,

            "border-color": "#cbd5e1",

            width: 70,

            height: 38,

            shape: "roundrectangle",

            "overlay-opacity": 0,
          },
        },

        /*
         * ---------------------------------------------------
         * Persona
         * ---------------------------------------------------
         */

        {
          selector:
            'node[type="persona"]',

          style: {
            "background-color":
              "#eff6ff",

            "border-color":
              "#2563eb",

            "border-width": 1.5,

            width: 92,

            height: 44,

            color: "#1e3a8a",

            "font-weight": 600,
          },
        },

        /*
         * ---------------------------------------------------
         * PGP
         * ---------------------------------------------------
         */

        {
          selector:
            'node[type="pgp"]',

          style: {
            "background-color":
              "#f8fafc",

            "border-color":
              "#64748b",

            "font-family":
              "JetBrains Mono, monospace",

            "font-size": 10,
          },
        },

        /*
         * ---------------------------------------------------
         * Wallet
         * ---------------------------------------------------
         */

        {
          selector:
            'node[type="wallet"]',

          style: {
            "background-color":
              "#fffbeb",

            "border-color":
              "#d97706",

            "font-family":
              "JetBrains Mono, monospace",

            "font-size": 10,
          },
        },

        /*
         * ---------------------------------------------------
         * Infrastructure
         * ---------------------------------------------------
         */

        {
          selector:
            'node[type="infrastructure"]',

          style: {
            "background-color":
              "#f8fafc",

            "border-color":
              "#94a3b8",

            "font-family":
              "JetBrains Mono, monospace",

            "font-size": 10,
          },
        },

        /*
         * ---------------------------------------------------
         * Normal relationship
         * ---------------------------------------------------
         */

        {
          selector: "edge",

          style: {
            width: 1,

            "line-color":
              "#cbd5e1",

            "target-arrow-color":
              "#cbd5e1",

            "target-arrow-shape":
              "triangle",

            "curve-style":
              "bezier",

            label: "data(label)",

            "font-family":
              "Inter, sans-serif",

            "font-size": 7,

            color: "#94a3b8",

            "text-background-color":
              "#ffffff",

            "text-background-opacity":
              0.9,

            "text-background-padding":
              "2px",
          },
        },

        /*
         * ---------------------------------------------------
         * Possible attribution link
         * ---------------------------------------------------
         */

        {
          selector:
            'edge[type="possible"]',

          style: {
            width: 2,

            "line-color":
              "#2563eb",

            "target-arrow-color":
              "#2563eb",

            "line-style":
              "dashed",

            "target-arrow-shape":
              "none",

            color: "#2563eb",

            "font-weight": 600,
          },
        },

        /*
         * ---------------------------------------------------
         * Hypothesis relationship
         * ---------------------------------------------------
         */

        {
          selector:
            'edge[type="hypothesis"]',

          style: {
            width: 2,

            "line-color":
              "#2563eb",

            "line-style":
              "dashed",

            "target-arrow-shape":
              "none",

            color: "#2563eb",

            "font-weight": 600,
          },
        },

        /*
         * ---------------------------------------------------
         * Selected element
         * ---------------------------------------------------
         */

        {
          selector: ":selected",

          style: {
            "border-width": 3,

            "border-color":
              "#2563eb",
          },
        },

        /*
         * ---------------------------------------------------
         * Dimmed elements
         * ---------------------------------------------------
         */

        {
          selector: ".dimmed",

          style: {
            opacity: 0.25,
          },
        },
      ],

      /*
       * -----------------------------------------------------
       * Graph layout
       * -----------------------------------------------------
       */

      layout: {
        name: "cose",

        animate: true,

        animationDuration: 400,

        padding: 60,

        nodeRepulsion: 7000,

        idealEdgeLength: 150,

        gravity: 0.4,

        numIter: 500,
      },

      minZoom: 0.5,

      maxZoom: 2,

      wheelSensitivity: 0.2,
    });

    cyRef.current = cy;

    /*
     * -------------------------------------------------------
     * Node selection
     * -------------------------------------------------------
     */

    cy.on(
      "tap",
      "node",
      (event) => {
        const node = event.target;

        const entity: SelectedEntity = {
          id: node.id(),

          label: node.data("label"),

          type: node.data("type"),
        };

        setSelectedEntity(entity);

        cy.elements()
          .addClass("dimmed");

        node.removeClass("dimmed");

        node
          .connectedEdges()
          .removeClass("dimmed");

        node
          .neighborhood("node")
          .removeClass("dimmed");
      }
    );

    /*
     * -------------------------------------------------------
     * Empty canvas click
     * -------------------------------------------------------
     */

    cy.on("tap", (event) => {
      if (event.target === cy) {
        setSelectedEntity(null);

        cy.elements()
          .removeClass("dimmed");
      }
    });

    /*
     * -------------------------------------------------------
     * Cleanup
     * -------------------------------------------------------
     */

    return () => {
      cy.destroy();

      cyRef.current = null;
    };
  }, [graphData]);

  /*
   * ---------------------------------------------------------
   * Zoom controls
   * ---------------------------------------------------------
   */

  const zoomIn = () => {
    const cy = cyRef.current;

    if (!cy) return;

    cy.zoom({
      level: cy.zoom() * 1.2,

      renderedPosition: {
        x: 400,
        y: 240,
      },
    });
  };

  const zoomOut = () => {
    const cy = cyRef.current;

    if (!cy) return;

    cy.zoom({
      level: cy.zoom() * 0.8,

      renderedPosition: {
        x: 400,
        y: 240,
      },
    });
  };

  const fitGraph = () => {
    cyRef.current?.fit(
      undefined,
      50
    );
  };

  const resetGraph = () => {
    const cy = cyRef.current;

    if (!cy) return;

    cy.fit(
      undefined,
      50
    );

    cy.elements()
      .removeClass("dimmed");

    setSelectedEntity(null);
  };

  /*
   * ---------------------------------------------------------
   * Loading state
   * ---------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="relationship-graph-wrapper">
        <div className="graph-toolbar">
          <div className="graph-toolbar-title">
            <span>
              Relationship Graph
            </span>
          </div>
        </div>

        <div className="graph-state">
          Loading relationship graph...
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * Error state
   * ---------------------------------------------------------
   */

  if (error) {
    return (
      <div className="relationship-graph-wrapper">
        <div className="graph-toolbar">
          <div className="graph-toolbar-title">
            <span>
              Relationship Graph
            </span>
          </div>
        </div>

        <div className="graph-state graph-error">
          {error}
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * Main graph
   * ---------------------------------------------------------
   */

  return (
    <div className="relationship-graph-wrapper">

      <div className="graph-toolbar">

        <div className="graph-toolbar-title">

          <span>
            Relationship Graph
          </span>

          <span className="graph-node-count">
            {graphData?.nodes.length ?? 0} entities
          </span>

        </div>

        <div className="graph-toolbar-actions">

          <button
            onClick={zoomIn}
            aria-label="Zoom in"
          >
            +
          </button>

          <button
            onClick={zoomOut}
            aria-label="Zoom out"
          >
            −
          </button>

          <button
            onClick={fitGraph}
          >
            Fit
          </button>

          <button
            onClick={resetGraph}
          >
            Reset
          </button>

        </div>

      </div>

      <div
        className="graph-canvas"
        ref={containerRef}
      />

      <div className="graph-legend">

        <span>
          <i className="legend-dot persona" />
          Persona
        </span>

        <span>
          <i className="legend-dot pgp" />
          PGP
        </span>

        <span>
          <i className="legend-dot wallet" />
          Wallet
        </span>

        <span>
          <i className="legend-dot infrastructure" />
          Infrastructure
        </span>

        <span>
          <i className="legend-line possible" />
          Possible Link
        </span>

      </div>

      {selectedEntity && (

        <div className="graph-entity-panel">

          <div className="entity-panel-header">

            <div>

              <span className="entity-type">
                {selectedEntity.type}
              </span>

              <h3>
                {selectedEntity.label}
              </h3>

            </div>

            <button
              onClick={() => {
                setSelectedEntity(null);

                cyRef.current
                  ?.elements()
                  .removeClass(
                    "dimmed"
                  );
              }}
              aria-label="Close entity details"
            >
              ×
            </button>

          </div>

          <div className="entity-panel-body">

            <div>

              <span>
                ENTITY ID
              </span>

              <strong>
                {selectedEntity.id}
              </strong>

            </div>

            <div>

              <span>
                TYPE
              </span>

              <strong>
                {selectedEntity.type}
              </strong>

            </div>

          </div>

          <button
            className="entity-view-button"
          >
            View Entity Details
          </button>

        </div>

      )}

    </div>
  );
}