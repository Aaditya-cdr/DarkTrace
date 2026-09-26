import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/api/evidence",
    tags=["Evidence"],
)

DATA_DIR = Path(__file__).resolve().parents[2] / "data"

EVIDENCE_FILE = DATA_DIR / "evidence.json"
HYPOTHESES_FILE = DATA_DIR / "hypotheses.json"


def load_json(file_path: Path):
    if not file_path.exists():
        raise HTTPException(
            status_code=500,
            detail=f"Dataset not found: {file_path.name}",
        )

    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)


@router.get("")
def get_evidence():
    evidence = load_json(EVIDENCE_FILE)

    return {
        "count": len(evidence),
        "items": evidence,
    }


@router.get("/{evidence_id}")
def get_evidence_by_id(evidence_id: str):
    evidence = load_json(EVIDENCE_FILE)
    hypotheses = load_json(HYPOTHESES_FILE)

    item = next(
        (
            record
            for record in evidence
            if record["id"].lower() == evidence_id.lower()
        ),
        None,
    )

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="Evidence not found",
        )

    # Find the hypothesis that contains this evidence record.
    related_hypothesis = next(
        (
            hypothesis
            for hypothesis in hypotheses
            if item["id"] in hypothesis.get("evidence_ids", [])
        ),
        None,
    )

    return {
        **item,
        "related_hypothesis": (
            {
                "id": related_hypothesis["id"],
                "title": related_hypothesis["title"],
                "persona_a": related_hypothesis["persona_a"],
                "persona_b": related_hypothesis["persona_b"],
                "assessment": related_hypothesis["assessment"],
                "investigation_status": related_hypothesis[
                    "investigation_status"
                ],
            }
            if related_hypothesis
            else None
        ),
    }