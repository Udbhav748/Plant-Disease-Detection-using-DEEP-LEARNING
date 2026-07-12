# Plant Disease Classification — CBAM + EfficientNet + ViT Hybrid

A hybrid deep learning model for classifying plant leaf diseases from images, combining a CBAM-attention
EfficientNetB0 CNN branch with a custom Vision Transformer (ViT) branch. Trained and evaluated on the
"New Plant Diseases Dataset (Augmented)" (38 classes across 14 crop species).

**Test accuracy: 98.95%** (macro-avg F1: 0.989, macro ROC AUC ≈ 1.0 — see `results/`).

## Repository structure

```
notebooks/   plant_disease_hybrid_model.ipynb — model definition, training, evaluation
models/      cbam_vit_efficientnet_hybrid.h5 — trained weights (gitignored; regenerate via the notebook)
data/        split_dataset/ — train/valid/test images (gitignored; see data/README.md)
results/     confusion matrices, ROC curve, accuracy/loss curves, classification_report.csv
reports/     project write-ups and presentation certificates (PDF)
frontend/    React web UI for uploading a leaf image and viewing predictions
backend/     FastAPI service that loads a model and serves predictions to the frontend
```

## Model architecture

Two parallel branches operate on the same 224x224x3 input and are fused before classification:

- **CNN branch**: frozen `EfficientNetB0` (ImageNet weights) → CBAM channel + spatial attention → global
  average pooling → `Dense(512)`.
- **ViT branch**: 16x16 patch embedding (196 patches) → learned positional embeddings → 4 transformer
  encoder blocks (multi-head attention + FFN, each with residual connections and layer norm) → `Dense(512)`.
- **Fusion**: concatenate both 512-d feature vectors → `Dense(1024, relu)` → `Dropout(0.4)` →
  `Dense(38, softmax)`.

Only the CBAM/ViT/fusion layers are trained; the EfficientNetB0 backbone stays frozen.

## Setup

```bash
pip install -r requirements.txt
```

Download the dataset per `data/README.md` so it lands at `data/split_dataset/{train,valid,test}`.

## Running

Open `notebooks/plant_disease_hybrid_model.ipynb` in Jupyter (or VS Code) and run all cells top-to-bottom
from a fresh kernel. If `models/cbam_vit_efficientnet_hybrid.h5` already exists, the notebook loads it and
skips training; delete/rename it first to force a retrain. Evaluation plots and the per-class
classification report are written to `results/`.

## Web app (frontend/backend)

`frontend/` (React 18 + Tailwind CSS + Framer Motion + Lucide icons) and `backend/` (FastAPI) provide a
polished web UI for uploading a leaf image and getting an instant diagnosis. The backend loads
`models/cbam_vit_efficientnet_hybrid.h5` and classifies directly across all 38 classes. Verified locally:
6/6 correct test-set predictions across different crops, in line with the notebook's ~98.95% test accuracy,
and a full browser walkthrough (landing page, upload, prediction result, light/dark mode, mobile layout)
with zero console errors. To run it:

```bash
cd backend && pip install -r requirements.txt && cp .env.example .env && python main.py
cd frontend && npm install && cp .env.example .env && npm start
```

TensorFlow needs Python 3.9–3.13 — if your system Python is newer (e.g. 3.14), create the backend's venv
with an older interpreter (`py -3.13 -m venv .venv` or similar) before installing requirements.

### Frontend architecture

Two pages: `HomePage` (landing) and `PredictPage` (upload + result), lazy-loaded via `React.lazy`.

- `components/ui/` — generic, reusable primitives (Button, Card, ProgressBar, LoadingSpinner, Toast, Modal,
  EmptyState, ThemeToggle).
- `components/layout/` — Navbar, Footer, AboutModal.
- `components/features/` — app-specific pieces (UploadZone, PredictionCard).
- `contexts/` — `ThemeContext` (light/dark, persisted to `localStorage`) and `ToastContext`.
- `hooks/useImagePrediction.js` — wraps the upload → predict → result/error state machine.
- `services/api.js` — the only place that talks to the backend.
- `utils/diseaseInfo.js` — static description/treatment/prevention copy for all 38 classes (the backend
  only returns `{class, confidence}`; this content lives entirely in the frontend).

See `THIRD_PARTY_NOTICES.md` for attribution.
