import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/api/personas",
    tags=["Personas"],
)

DATA_FILE = Path(__file__).resolve().parents[2] / "data" / "personas.json"


def load_personas():
    if not DATA_FILE.exists():
        raise HTTPException(
            status_code=500,
            detail="Persona dataset not found",
        )

    with DATA_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


@router.get("")
def get_personas():
    personas = load_personas()

    return {
        "count": len(personas),
        "items": personas,
    }


@router.get("/{persona_id}")
def get_persona(persona_id: str):
    personas = load_personas()

    persona = next(
        (
            item
            for item in personas
            if item["id"].lower() == persona_id.lower()
        ),
        None,
    )

    if persona is None:
        raise HTTPException(
            status_code=404,
            detail="Persona not found",
        )

    return persona