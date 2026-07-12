const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/predict";

// API_BASE_URL points at the /predict route specifically; strip that suffix
// to get the backend's root for other endpoints like /model-info.
const API_ROOT = API_BASE_URL.replace(/\/predict\/?$/, "");

// The backend runs a single hybrid model regardless of the {model_id} path
// segment (kept for route compatibility) - any identifier works here.
const MODEL_ID = "hybrid-model";

export class PredictionError extends Error {}

export async function getModelInfo() {
  const response = await fetch(`${API_ROOT}/model-info`);
  if (!response.ok) throw new Error("Failed to fetch model info");
  return response.json();
}

export async function predictDisease(file) {
  const formData = new FormData();
  formData.append("file", file);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/${MODEL_ID}`, {
      method: "POST",
      body: formData,
    });
  } catch (networkError) {
    throw new PredictionError(
      "Couldn't reach the prediction server. Make sure the backend is running."
    );
  }

  if (!response.ok) {
    let detail = "Something went wrong while analyzing the image.";
    try {
      const body = await response.json();
      if (body?.detail) detail = body.detail;
    } catch (_) {
      // response wasn't JSON - keep the generic message
    }
    throw new PredictionError(detail);
  }

  return response.json();
}
