import json
from pathlib import Path
from typing import Any


PERSONAS_FILE = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "personas.json"
)

EVIDENCE_FILE = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "evidence.json"
)

HYPOTHESES_FILE = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "hypotheses.json"
)


def load_json(file_path: Path) -> Any:
    if not file_path.exists():
        raise FileNotFoundError(
            f"Dataset not found: {file_path}"
        )

    with file_path.open(
        "r",
        encoding="utf-8",
    ) as file:
        return json.load(file)


def add_node(
    nodes: list[dict[str, Any]],
    node_ids: set[str],
    node_id: str,
    label: str,
    node_type: str,
    status: str | None = None,
) -> None:
    """
    Add a graph node only once.
    """

    if node_id in node_ids:
        return

    node_data: dict[str, Any] = {
        "id": node_id,
        "label": label,
        "type": node_type,
    }

    if status is not None:
        node_data["status"] = status

    nodes.append(
        {
            "data": node_data,
        }
    )

    node_ids.add(node_id)


def add_edge(
    edges: list[dict[str, Any]],
    edge_ids: set[str],
    edge_id: str,
    source: str,
    target: str,
    label: str,
    edge_type: str = "normal",
    **extra_data: Any,
) -> None:
    """
    Add a graph edge only once.
    """

    if edge_id in edge_ids:
        return

    edge_data: dict[str, Any] = {
        "id": edge_id,
        "source": source,
        "target": target,
        "label": label,
        "type": edge_type,
    }

    edge_data.update(extra_data)

    edges.append(
        {
            "data": edge_data,
        }
    )

    edge_ids.add(edge_id)


def build_relationship_graph() -> dict[str, Any]:
    personas = load_json(PERSONAS_FILE)
    evidence = load_json(EVIDENCE_FILE)
    hypotheses = load_json(HYPOTHESES_FILE)

    nodes: list[dict[str, Any]] = []
    edges: list[dict[str, Any]] = []

    node_ids: set[str] = set()
    edge_ids: set[str] = set()

    # =========================================================
    # PERSONA NODES + ASSOCIATED ENTITIES
    # =========================================================

    for persona in personas:
        persona_id = persona["id"]
        handle = persona["handle"]

        add_node(
            nodes=nodes,
            node_ids=node_ids,
            node_id=persona_id,
            label=handle,
            node_type="persona",
            status=persona.get("status"),
        )

        # -----------------------------------------------------
        # PGP
        # -----------------------------------------------------

        pgp = persona.get("pgp")

        if pgp:
            pgp_id = f"pgp-{pgp.lower()}"

            add_node(
                nodes=nodes,
                node_ids=node_ids,
                node_id=pgp_id,
                label=pgp,
                node_type="pgp",
            )

            add_edge(
                edges=edges,
                edge_ids=edge_ids,
                edge_id=f"{persona_id}-{pgp_id}",
                source=persona_id,
                target=pgp_id,
                label="USES",
                edge_type="normal",
            )

        # -----------------------------------------------------
        # WALLET
        # -----------------------------------------------------

        wallet = persona.get("wallet")

        if wallet:
            wallet_id = f"wallet-{wallet.lower()}"

            add_node(
                nodes=nodes,
                node_ids=node_ids,
                node_id=wallet_id,
                label=wallet,
                node_type="wallet",
            )

            add_edge(
                edges=edges,
                edge_ids=edge_ids,
                edge_id=f"{persona_id}-{wallet_id}",
                source=persona_id,
                target=wallet_id,
                label="ASSOCIATED",
                edge_type="normal",
            )

        # -----------------------------------------------------
        # INFRASTRUCTURE
        # -----------------------------------------------------

        infrastructure = persona.get(
            "infrastructure"
        )

        if infrastructure:
            infrastructure_id = (
                f"infra-{infrastructure.lower()}"
            )

            add_node(
                nodes=nodes,
                node_ids=node_ids,
                node_id=infrastructure_id,
                label=infrastructure,
                node_type="infrastructure",
            )

            add_edge(
                edges=edges,
                edge_ids=edge_ids,
                edge_id=f"{persona_id}-{infrastructure_id}",
                source=persona_id,
                target=infrastructure_id,
                label="OPERATES",
                edge_type="normal",
            )

    # =========================================================
    # HYPOTHESIS RELATIONSHIPS
    # =========================================================

    for hypothesis in hypotheses:
        persona_a = hypothesis["persona_a"]
        persona_b = hypothesis["persona_b"]

        related_evidence = [
            item
            for item in evidence
            if item["id"]
            in hypothesis.get(
                "evidence_ids",
                [],
            )
        ]

        supporting_count = sum(
            1
            for item in related_evidence
            if item.get("direction")
            == "SUPPORTING"
        )

        contradictory_count = sum(
            1
            for item in related_evidence
            if item.get("direction")
            == "CONTRADICTORY"
        )

        add_edge(
            edges=edges,
            edge_ids=edge_ids,
            edge_id=hypothesis["id"],
            source=persona_a,
            target=persona_b,
            label="POSSIBLE LINK",
            edge_type="possible",
            assessment=hypothesis.get(
                "assessment",
                "POSSIBLE_LINK",
            ),
            supporting_count=supporting_count,
            contradictory_count=contradictory_count,
            investigation_status=hypothesis.get(
                "investigation_status",
                "OPEN",
            ),
        )

    # =========================================================
    # RESPONSE
    # =========================================================

    persona_count = sum(
        1
        for node in nodes
        if node["data"]["type"] == "persona"
    )

    relationship_count = sum(
        1
        for edge in edges
        if edge["data"]["type"] == "possible"
    )

    return {
        "nodes": nodes,
        "edges": edges,
        "metadata": {
            "entity_count": len(nodes),
            "persona_count": persona_count,
            "relationship_count": relationship_count,
            "source": "synthetic_demo_dataset",
        },
    }