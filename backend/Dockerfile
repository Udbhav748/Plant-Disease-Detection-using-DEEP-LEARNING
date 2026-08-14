FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HYBRID_MODEL_PATH=/app/models/cbam_vit_efficientnet_hybrid.h5

WORKDIR /app/backend

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/main.py backend/model_arch.py ./

# Baked into the image rather than mounted: this is a trained-weights
# artifact (~125MB), not something that changes without a full rebuild
# anyway, and build_hybrid() rebuilds the architecture from code then
# loads only these weights (weights=None in model_arch.py — no ImageNet
# download needed), so there's no network dependency at build or runtime.
COPY models/cbam_vit_efficientnet_hybrid.h5 /app/models/cbam_vit_efficientnet_hybrid.h5

RUN useradd --create-home --shell /usr/sbin/nologin appuser \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8001

# --host 0.0.0.0, not start.sh's localhost -- this needs to accept
# connections from other containers on the Compose network (InsightAI-RAG's
# backend), not just loopback traffic within its own container.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
