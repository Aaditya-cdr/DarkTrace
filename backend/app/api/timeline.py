import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/api/timeline",
    tags=["Timeline"],
)

DATA_DIR = Path(__file__).resolve().parents[2] / "data"

EVIDENCE_FILE = DATA_DIR / "evidence.json"
PERSONAS_FILE = DATA_DIR / "personas.json"


def load_json(file_path: Path):
    if not file_path.exists():
        raise HTTPException(
            status_code=500,
            detail=f"Dataset not found: {file_path.name}",
        )

    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)


def build_entity_label(
    evidence: dict,
    personas: list[dict],
) -> str:
    entities = evidence.get("entities", [])

    if len(entities) >= 2:
        persona_names = {
            persona["id"]: persona["handle"]
            for persona in personas
        }

        name_a = persona_names.get(
            entities[0],
            entities[0],
        )

        name_b = persona_names.get(
            entities[1],
            entities[1],
        )

        return f"{name_a} ↔ {name_b}"

    if len(entities) == 1:
        persona_names = {
            persona["id"]: persona["handle"]
            for persona in personas
        }

        return persona_names.get(
            entities[0],
            entities[0],
        )

    return "Unknown Entity"


def get_event_title(evidence: dict) -> str:
    titles = {
        "SHARED_PGP": "PGP association observed",
        "BEHAVIOURAL_SIMILARITY": "Behavioural pattern recorded",
        "SEMANTIC_SIMILARITY": "Writing similarity observed",
        "ACTIVITY_OVERLAP": "Activity overlap detected",
        "INFRASTRUCTURE_MISMATCH": "Infrastructure mismatch detected",
        "TEMPORAL_GAP": "Temporal activity gap identified",
        "INFRASTRUCTURE_CONTINUITY": "Infrastructure continuity detected",
        "IDENTIFIER_CONFLICT": "Identifier conflict detected",
    }

    return titles.get(
        evidence.get("type", ""),
        evidence.get(
            "type",
            "Evidence signal observed",
        ).replace("_", " ").title(),
    )


def get_event_description(evidence: dict) -> str:
    descriptions = {
        "SHARED_PGP": (
            "Both personas are associated with the same "
            "PGP identifier."
        ),
        "BEHAVIOURAL_SIMILARITY": (
            "Observed activity patterns show meaningful "
            "behavioural overlap."
        ),
        "SEMANTIC_SIMILARITY": (
            "Writing samples show semantic similarities "
            "across observed communications."
        ),
        "ACTIVITY_OVERLAP": (
            "Several activity windows overlap within "
            "the observed period."
        ),
        "INFRASTRUCTURE_MISMATCH": (
            "The personas are associated with different "
            "infrastructure nodes."
        ),
        "TEMPORAL_GAP": (
            "A period of expected continuity is not observed "
            "between the activity sequences."
        ),
        "INFRASTRUCTURE_CONTINUITY": (
            "The personas share a consistent infrastructure "
            "relationship across the observed records."
        ),
        "IDENTIFIER_CONFLICT": (
            "Observed identifiers conflict with the "
            "proposed relationship."
        ),
    }

    return descriptions.get(
        evidence.get("type", ""),
        "Evidence signal identified in the "
        "synthetic investigation dataset.",
    )


@router.get("")
def get_timeline():
    evidence = load_json(EVIDENCE_FILE)
    personas = load_json(PERSONAS_FILE)

    events = []

    for item in evidence:
        # Evidence records use `observed_at` as the
        # authoritative observation date.
        observed_at = item.get("observed_at", "")

        events.append(
            {
                "id": item["id"],
                "date": observed_at,
                "time": "--:--",
                "entity": build_entity_label(
                    item,
                    personas,
                ),
                "type": item.get(
                    "category",
                    "OTHER",
                ),
                "title": get_event_title(item),
                "description": get_event_description(
                    item,
                ),
                "direction": item.get(
                    "direction",
                    "NEUTRAL",
                ),
                "source": item.get(
                    "source",
                    "UNKNOWN",
                ),
            }
        )

    events.sort(
        key=lambda event: (
            event["date"],
            event["id"],
        )
    )

    categories = sorted(
        {
            event["type"]
            for event in events
            if event["type"]
        }
    )

    return {
        "count": len(events),
        "categories": categories,
        "items": events,
    }