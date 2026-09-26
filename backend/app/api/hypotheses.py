import json
from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException

from app.services.attribution_engine import analyze_hypothesis


router = APIRouter(
    prefix="/api/hypotheses",
    tags=["Hypotheses"],
)


HYPOTHESES_FILE = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "hypotheses.json"
)

EVIDENCE_FILE = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "evidence.json"
)


def load_json(file_path: Path) -> Any:
    if not file_path.exists():
        raise HTTPException(
            status_code=500,
            detail=f"Dataset not found: {file_path.name}",
        )

    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)


@router.get("")
def get_hypotheses():
    hypotheses = load_json(HYPOTHESES_FILE)

    return {
        "count": len(hypotheses),
        "items": hypotheses,
    }


@router.get("/{hypothesis_id}")
def get_hypothesis(hypothesis_id: str):
    hypotheses = load_json(HYPOTHESES_FILE)
    evidence = load_json(EVIDENCE_FILE)

    hypothesis = next(
        (
            item
            for item in hypotheses
            if item["id"].lower() == hypothesis_id.lower()
        ),
        None,
    )

    if hypothesis is None:
        raise HTTPException(
            status_code=404,
            detail="Hypothesis not found",
        )

    evidence_ids = set(hypothesis["evidence_ids"])

    related_evidence = [
        item
        for item in evidence
        if item["id"] in evidence_ids
    ]

    analysis = analyze_hypothesis(related_evidence)

    return {
        "hypothesis": hypothesis,
        "analysis": analysis,
    }