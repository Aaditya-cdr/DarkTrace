from fastapi import APIRouter, HTTPException

from app.services.graph_service import build_relationship_graph


router = APIRouter(
    prefix="/api/graph",
    tags=["Graph"],
)


@router.get("")
def get_relationship_graph():
    try:
        return build_relationship_graph()
    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc