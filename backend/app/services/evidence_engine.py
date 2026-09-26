from typing import Any


STRENGTH_WEIGHTS = {
    "WEAK": 0.25,
    "MODERATE": 0.60,
    "STRONG": 1.00,
}


def calculate_evidence_score(evidence: dict[str, Any]) -> float:
    strength = STRENGTH_WEIGHTS.get(
        evidence.get("strength", "WEAK"),
        0.25,
    )

    reliability = float(evidence.get("reliability", 0.5))
    independence = float(evidence.get("independence", 0.5))
    specificity = float(evidence.get("specificity", 0.5))
    temporal_relevance = float(
        evidence.get("temporal_relevance", 0.5)
    )

    score = (
        strength
        * reliability
        * independence
        * specificity
        * temporal_relevance
    )

    return round(score, 4)


def classify_evidence(evidence: dict[str, Any]) -> dict[str, Any]:
    score = calculate_evidence_score(evidence)

    return {
        **evidence,
        "analytical_score": score,
    }


def split_evidence(
    evidence_items: list[dict[str, Any]],
) -> dict[str, list[dict[str, Any]]]:

    supporting = []
    contradictory = []

    for evidence in evidence_items:
        enriched = classify_evidence(evidence)

        if evidence.get("direction") == "SUPPORTING":
            supporting.append(enriched)

        elif evidence.get("direction") == "CONTRADICTORY":
            contradictory.append(enriched)

    return {
        "supporting": supporting,
        "contradictory": contradictory,
    }


def aggregate_evidence(
    evidence_items: list[dict[str, Any]],
) -> dict[str, Any]:

    split = split_evidence(evidence_items)

    supporting_score = sum(
        item["analytical_score"]
        for item in split["supporting"]
    )

    contradictory_score = sum(
        item["analytical_score"]
        for item in split["contradictory"]
    )

    net_score = supporting_score - contradictory_score

    return {
        "supporting": split["supporting"],
        "contradictory": split["contradictory"],
        "supporting_score": round(supporting_score, 4),
        "contradictory_score": round(contradictory_score, 4),
        "net_score": round(net_score, 4),
    }