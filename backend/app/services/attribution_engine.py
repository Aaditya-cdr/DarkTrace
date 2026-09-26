from typing import Any

from app.services.evidence_engine import aggregate_evidence


def calculate_confidence(net_score: float) -> str:
    """
    Convert the net analytical score into a confidence band.

    These thresholds are demonstration thresholds.
    They are not probabilities and do not establish real-world identity.
    """

    if net_score >= 0.75:
        return "HIGH"

    if net_score >= 0.25:
        return "MEDIUM"

    return "LOW"


def build_explanation(
    supporting: list[dict[str, Any]],
    contradictory: list[dict[str, Any]],
    confidence: str,
) -> str:
    """
    Generate a concise human-readable explanation.
    """

    supporting_count = len(supporting)
    contradictory_count = len(contradictory)

    if confidence == "HIGH":
        return (
            f"The hypothesis is strengthened by {supporting_count} "
            f"supporting evidence items with limited contradictory evidence. "
            "Multiple signals provide corroboration, but the result remains "
            "an analytical hypothesis rather than proof of common ownership."
        )

    if confidence == "MEDIUM":
        return (
            f"The hypothesis is supported by {supporting_count} evidence "
            f"items but weakened by {contradictory_count} contradictory "
            "signals. The available evidence supports a possible relationship, "
            "but independent corroboration is still required."
        )

    return (
        f"The available evidence provides limited support and includes "
        f"{contradictory_count} contradictory signal(s). The current dataset "
        "does not provide sufficient corroboration for a strong relationship."
    )


def identify_investigation_gap(
    supporting: list[dict[str, Any]],
    contradictory: list[dict[str, Any]],
) -> str:
    """
    Identify the most important remaining evidence gap.
    """

    if not supporting:
        return "No meaningful supporting evidence is currently available."

    independent_support = [
        item
        for item in supporting
        if float(item.get("independence", 0)) >= 0.80
    ]

    if not independent_support:
        return (
            "Independent corroboration of the observed relationship "
            "is missing."
        )

    if contradictory:
        return (
            "The relationship contains contradictory signals that "
            "require additional independent corroboration."
        )

    strong_support = [
        item
        for item in supporting
        if item.get("strength") == "STRONG"
    ]

    if not strong_support:
        return (
            "No strong evidence signal is currently available to "
            "substantially strengthen the hypothesis."
        )

    return (
        "No major evidence gap was identified in the current "
        "synthetic dataset."
    )


def identify_next_best_evidence(
    confidence: str,
    contradictory: list[dict[str, Any]],
) -> str:
    """
    Suggest the next category of evidence that could reduce uncertainty.
    """

    if confidence == "HIGH":
        return (
            "Seek an independently sourced identifier that corroborates "
            "the existing relationship."
        )

    if contradictory:
        return (
            "Seek an independently sourced identifier or infrastructure "
            "link that can resolve the contradictory signals."
        )

    return (
        "Seek an independently sourced identifier linking the two "
        "personas."
    )


def analyze_hypothesis(
    evidence_items: list[dict[str, Any]],
) -> dict[str, Any]:
    """
    Perform an explainable attribution assessment.

    This does NOT determine real-world identity.
    It produces an evidence-backed analytical hypothesis.
    """

    aggregated = aggregate_evidence(evidence_items)

    supporting = aggregated["supporting"]
    contradictory = aggregated["contradictory"]

    supporting_score = aggregated["supporting_score"]
    contradictory_score = aggregated["contradictory_score"]
    net_score = aggregated["net_score"]

    confidence = calculate_confidence(net_score)

    explanation = build_explanation(
        supporting,
        contradictory,
        confidence,
    )

    investigation_gap = identify_investigation_gap(
        supporting,
        contradictory,
    )

    next_best_evidence = identify_next_best_evidence(
        confidence,
        contradictory,
    )

    return {
        "assessment": "POSSIBLE_LINK",
        "confidence": confidence,
        "supporting_score": supporting_score,
        "contradictory_score": contradictory_score,
        "net_score": net_score,
        "supporting_evidence": supporting,
        "contradictory_evidence": contradictory,
        "explanation": explanation,
        "investigation_gap": investigation_gap,
        "next_best_evidence": next_best_evidence,
        "analytical_note": (
            "This assessment represents an evidence-backed hypothesis. "
            "Similarity or shared identifiers do not independently establish "
            "common ownership or real-world identity."
        ),
    }