from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image, UnidentifiedImageError
from dotenv import load_dotenv
import tensorflow as tf
import numpy as np
import logging
import os

from model_arch import build_hybrid

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to the trained hybrid model (CBAM + EfficientNet + ViT)
MODEL_PATH = os.getenv(
    "HYBRID_MODEL_PATH",
    os.path.join("..", "models", "cbam_vit_efficientnet_hybrid.h5"),
)

# Class order must match train_ds.class_names from notebooks/plant_disease_hybrid_model.ipynb
# (image_dataset_from_directory sorts class subfolders alphabetically) - do not reorder.
CLASS_NAMES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
]

# Static facts about the model that aren't derivable at runtime (e.g. test
# accuracy comes from the notebook's held-out evaluation, not something the
# server can recompute on the fly). Kept alongside CLASS_NAMES as the single
# source of truth the frontend's About modal reads from.
MODEL_ARCHITECTURE = "Hybrid CBAM-attention EfficientNetB0 CNN + Vision Transformer"
TEST_ACCURACY = 0.9895

# Initialize logger
logging.basicConfig(level=logging.INFO)

# Load the hybrid model. tf.keras.models.load_model() fails on this .h5 under
# Keras 3 ("too many positional arguments" reconstructing the CBAM block's
# avg+max merge node), regardless of TF/Keras patch version - see
# model_arch.py for details. Rebuilding the architecture from code and loading
# only the weights avoids that broken deserialization path.
MODEL = None
if os.path.exists(MODEL_PATH):
    try:
        MODEL = build_hybrid(len(CLASS_NAMES))
        MODEL.load_weights(MODEL_PATH)
        # Warm up the model graph to eliminate cold-start latency on the first request
        dummy = np.zeros((1, 224, 224, 3), dtype=np.float32)
        _ = MODEL(dummy, training=False)
        logging.info(f"Successfully loaded hybrid model weights from {MODEL_PATH} and warmed up graph")
    except Exception as e:
        logging.error(f"Error loading hybrid model weights from {MODEL_PATH}: {e}")
        MODEL = None
else:
    logging.error(f"Model file not found at path: {MODEL_PATH}")


# Define endpoint for checking server status
@app.get("/ping")
async def ping():
    return "Hello, I am alive"


# Model metadata for the frontend's About modal - num_crops/num_classes are
# derived live from CLASS_NAMES rather than hardcoded on the frontend.
@app.get("/model-info")
async def model_info():
    crops = {name.split("___")[0] for name in CLASS_NAMES}
    return {
        "architecture": MODEL_ARCHITECTURE,
        "num_classes": len(CLASS_NAMES),
        "num_crops": len(crops),
        "test_accuracy": TEST_ACCURACY,
        "model_loaded": MODEL is not None,
    }


def preprocess_image(image: Image.Image) -> np.ndarray:
    # Matches training preprocessing in the notebook: image_dataset_from_directory
    # yields raw [0, 255] float32 pixels with no rescaling layer in the model, so
    # inference must NOT normalize to [0, 1] either.
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize((224, 224), Image.Resampling.BILINEAR)
    image_array = np.array(image, dtype=np.float32)
    return np.expand_dims(image_array, axis=0)


# Define endpoint for making predictions. model_id is accepted for compatibility
# with the frontend's per-crop routes, but every model_id runs the same hybrid
# model, which classifies across all 38 classes directly.
@app.post("/predict/{model_id}")
async def predict(model_id: str, file: UploadFile = File(...)):
    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model is not loaded.")

    # Check if the uploaded file is an image
    if not file.content_type or not file.content_type.startswith('image'):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

    try:
        # Read file as image
        image_bytes = await file.read()
        image = Image.open(BytesIO(image_bytes))
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image.")

    try:
        img_batch = preprocess_image(image)

        # Make predictions using direct tensor call (avoids Dataset and batch iterator overhead)
        predictions = MODEL(img_batch, training=False).numpy()

        # Get predicted class index and confidence
        predicted_class_idx = int(np.argmax(predictions[0]))
        predicted_class = CLASS_NAMES[predicted_class_idx]
        confidence = float(predictions[0][predicted_class_idx])

        return {
            'class': predicted_class,
            'confidence': confidence
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        logging.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")

# Run the FastAPI app with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='localhost', port=8001)
