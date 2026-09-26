from datetime import datetime, timezone
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

from app.api.personas import router as personas_router
from app.api.evidence import router as evidence_router
from app.api.hypotheses import router as hypotheses_router
from app.api.graph import router as graph_router
from app.api.dashboard import router as dashboard_router
from app.api.timeline import router as timeline_router
from app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    description="Explainable Dark Web Threat Actor Attribution Assistant",
    version=settings.app_version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(personas_router)
app.include_router(evidence_router)
app.include_router(hypotheses_router)
app.include_router(graph_router)
app.include_router(dashboard_router)
app.include_router(timeline_router)

@app.get("/")
def root():
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "darktrace-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }