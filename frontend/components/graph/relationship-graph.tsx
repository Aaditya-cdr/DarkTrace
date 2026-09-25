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

const elements: ElementDefinition[] = [
  {
    data: {
      id: "shadowx",
      label: "ShadowX",
      type: "persona",
    },
    position: {
      x: 260,
      y: 220,
    },
  },
  {
    data: {
      id: "shadownova",
      label: "ShadowNova",
      type: "persona",
    },
    position: {
      x: 600,
      y: 220,
    },
  },
  {
    data: {
      id: "pgp-a",
      label: "PGP-A",
      type: "pgp",
    },
    position: {
      x: 430,
      y: 80,
    },
  },
  {
    data: {
      id: "wallet-a",
      label: "WALLET-A",
      type: "wallet",
    },
    position: {
      x: 120,
      y: 380,
    },
  },
  {
    data: {
      id: "wallet-b",
      label: "WALLET-B",
      type: "wallet",
    },
    position: {
      x: 740,
      y: 380,
    },
  },
  {
    data: {
      id: "infra-01",
      label: "INFRA-01",
      type: "infrastructure",
    },
    position: {
      x: 120,
      y: 100,
    },
  },
  {
    data: {
      id: "infra-02",
      label: "INFRA-02",
      type: "infrastructure",
    },
    position: {
      x: 740,
      y: 100,
    },
  },

  {
    data: {
      id: "e-shadowx-pgp",
      source: "shadowx",
      target: "pgp-a",
      label: "USES",
      type: "normal",
    },
  },
  {
    data: {
      id: "e-nova-pgp",
      source: "shadownova",
      target: "pgp-a",
      label: "USES",
      type: "normal",
    },
  },
  {
    data: {
      id: "e-shadowx-wallet",
      source: "shadowx",
      target: "wallet-a",
      label: "ASSOCIATED",
      type: "normal",
    },
  },
  {
    data: {
      id: "e-nova-wallet",
      source: "shadownova",
      target: "wallet-b",
      label: "ASSOCIATED",
      type: "normal",
    },
  },
  {
    data: {
      id: "e-shadowx-infra",
      source: "shadowx",
      target: "infra-01",
      label: "OPERATES",
      type: "normal",
    },
  },
  {
    data: {
      id: "e-nova-infra",
      source: "shadownova",
      target: "infra-02",
      label: "OPERATES",
      type: "normal",
    },
  },
  {
    data: {
      id: "e-possible-link",
      source: "shadowx",
      target: "shadownova",
      label: "POSSIBLE LINK",
      type: "possible",
    },
  },
];

export default function RelationshipGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);

  const [selectedEntity, setSelectedEntity] =
    useState<SelectedEntity | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,

      elements,

      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "font-family": "Inter, sans-serif",
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

        {
          selector: 'node[type="persona"]',
          style: {
            "background-color": "#eff6ff",
            "border-color": "#2563eb",
            "border-width": 1.5,
            width: 92,
            height: 44,
            color: "#1e3a8a",
            "font-weight": 600,
          },
        },

        {
          selector: 'node[type="pgp"]',
          style: {
            "background-color": "#f8fafc",
            "border-color": "#64748b",
            "font-family": "JetBrains Mono, monospace",
            "font-size": 10,
          },
        },

        {
          selector: 'node[type="wallet"]',
          style: {
            "background-color": "#fffbeb",
            "border-color": "#d97706",
            "font-family": "JetBrains Mono, monospace",
            "font-size": 10,
          },
        },

        {
          selector: 'node[type="infrastructure"]',
          style: {
            "background-color": "#f8fafc",
            "border-color": "#94a3b8",
            "font-family": "JetBrains Mono, monospace",
            "font-size": 10,
          },
        },

        {
          selector: "edge",
          style: {
            width: 1,
            "line-color": "#cbd5e1",
            "target-arrow-color": "#cbd5e1",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(label)",
            "font-family": "Inter, sans-serif",
            "font-size": 7,
            color: "#94a3b8",
            "text-background-color": "#ffffff",
            "text-background-opacity": 0.9,
            "text-background-padding": "2px",
          },
        },

        {
          selector: 'edge[type="possible"]',
          style: {
            width: 2,
            "line-color": "#2563eb",
            "target-arrow-color": "#2563eb",
            "line-style": "dashed",
            "target-arrow-shape": "none",
            color: "#2563eb",
            "font-weight": 600,
          },
        },

        {
          selector: ":selected",
          style: {
            "border-width": 3,
            "border-color": "#2563eb",
          },
        },

        {
          selector: ".dimmed",
          style: {
            opacity: 0.25,
          },
        },
      ],

      layout: {
        name: "preset",
      },

      minZoom: 0.5,
      maxZoom: 2,
      wheelSensitivity: 0.2,
    });

    cyRef.current = cy;

    cy.on("tap", "node", (event) => {
      const node = event.target;

      const entity: SelectedEntity = {
        id: node.id(),
        label: node.data("label"),
        type: node.data("type"),
      };

      setSelectedEntity(entity);

      cy.elements().addClass("dimmed");
      node.removeClass("dimmed");

      node.connectedEdges().removeClass("dimmed");

      node.neighborhood("node").removeClass("dimmed");
    });

    cy.on("tap", (event) => {
      if (event.target === cy) {
        setSelectedEntity(null);
        cy.elements().removeClass("dimmed");
      }
    });

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
  }, []);

  const zoomIn = () => {
    cyRef.current?.zoom({
      level: cyRef.current.zoom() * 1.2,
      renderedPosition: {
        x: 400,
        y: 240,
      },
    });
  };

  const zoomOut = () => {
    cyRef.current?.zoom({
      level: cyRef.current.zoom() * 0.8,
      renderedPosition: {
        x: 400,
        y: 240,
      },
    });
  };

  const fitGraph = () => {
    cyRef.current?.fit(undefined, 50);
  };

  const resetGraph = () => {
    cyRef.current?.zoom(1);
    cyRef.current?.pan({ x: 0, y: 0 });
    cyRef.current?.elements().removeClass("dimmed");
    setSelectedEntity(null);
  };

  return (
    <div className="relationship-graph-wrapper">
      <div className="graph-toolbar">
        <div className="graph-toolbar-title">
          <span>Relationship Graph</span>
          <span className="graph-node-count">
            7 entities
          </span>
        </div>

        <div className="graph-toolbar-actions">
          <button onClick={zoomIn}>+</button>
          <button onClick={zoomOut}>−</button>
          <button onClick={fitGraph}>Fit</button>
          <button onClick={resetGraph}>Reset</button>
        </div>
      </div>

      <div className="graph-canvas" ref={containerRef} />

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

              <h3>{selectedEntity.label}</h3>
            </div>

            <button
              onClick={() => {
                setSelectedEntity(null);
                cyRef.current?.elements().removeClass("dimmed");
              }}
            >
              ×
            </button>
          </div>

          <div className="entity-panel-body">
            <div>
              <span>ENTITY ID</span>
              <strong>{selectedEntity.id}</strong>
            </div>

            <div>
              <span>TYPE</span>
              <strong>{selectedEntity.type}</strong>
            </div>
          </div>

          <button className="entity-view-button">
            View Entity Details
          </button>
        </div>
      )}
    </div>
  );
}