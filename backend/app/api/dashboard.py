import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.services.attribution_engine import analyze_hypothesis

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

DATA_DIR = Path(__file__).resolve().parents[2] / "data"

PERSONAS_FILE = DATA_DIR / "personas.json"
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
def get_dashboard():
    personas = load_json(PERSONAS_FILE)
    evidence = load_json(EVIDENCE_FILE)
    hypotheses = load_json(HYPOTHESES_FILE)

    # -----------------------------------
    # Hypothesis analysis
    # -----------------------------------

    dashboard_hypotheses = []

    for hypothesis in hypotheses:
        evidence_ids = set(hypothesis.get("evidence_ids", []))

        related_evidence = [
            item
            for item in evidence
            if item["id"] in evidence_ids
        ]

        analysis = analyze_hypothesis(related_evidence)

        dashboard_hypotheses.append(
            {
                "id": hypothesis["id"],
                "personaA": hypothesis["title"].split(" ↔ ")[0],
                "personaB": hypothesis["title"].split(" ↔ ")[1],
                "confidence": analysis["confidence"],
                "supporting": len(
                    analysis["supporting_evidence"]
                ),
                "contradictory": len(
                    analysis["contradictory_evidence"]
                ),
                "gaps": (
                    1
                    if analysis["investigation_gap"]
                    else 0
                ),
            }
        )

    # -----------------------------------
    # Evidence distribution
    # -----------------------------------

    category_scores = {}

    for item in evidence:
        category = item.get("category", "OTHER").upper()

        strength_weights = {
            "WEAK": 0.25,
            "MODERATE": 0.60,
            "STRONG": 1.00,
        }

        strength = strength_weights.get(
            item.get("strength", "WEAK"),
            0.25,
        )

        score = (
            strength
            * float(item.get("reliability", 0.5))
            * float(item.get("independence", 0.5))
            * float(item.get("specificity", 0.5))
            * float(item.get("temporal_relevance", 0.5))
        )

        category_scores[category] = (
            category_scores.get(category, 0) + score
        )

    max_score = max(
        category_scores.values(),
        default=1,
    )

    evidence_distribution = [
        {
            "label": category.title(),
            "value": round(
                (score / max_score) * 100
            ),
        }
        for category, score in category_scores.items()
    ]

    # -----------------------------------
    # Dashboard metrics
    # -----------------------------------

    open_hypotheses = [
        hypothesis
        for hypothesis in hypotheses
        if hypothesis.get("investigation_status") == "OPEN"
    ]

    return {
        "metrics": {
            "personas": len(personas),
            "hypotheses": len(hypotheses),
            "evidence": len(evidence),
            "open_gaps": len(open_hypotheses),
        },

        "hypotheses": dashboard_hypotheses,

        "evidence_distribution": evidence_distribution,

        "activity": [
            {
                "time": "--:--",
                "text": "Dashboard data loaded from synthetic dataset",
            },
            {
                "time": "--:--",
                "text": (
                    f"{len(evidence)} evidence records available"
                ),
            },
            {
                "time": "--:--",
                "text": (
                    f"{len(hypotheses)} hypotheses available"
                ),
            },
            {
                "time": "--:--",
                "text": (
                    f"{len(personas)} personas available"
                ),
            },
        ],
    }