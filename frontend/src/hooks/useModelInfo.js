import { useEffect, useState } from "react";
import { getModelInfo } from "../services/api";

// Static fallback used until the live /model-info response arrives (or if
// the backend can't be reached), so consumers never render empty/undefined.
export const FALLBACK_MODEL_INFO = {
  architecture: "Hybrid CBAM-attention EfficientNetB0 CNN + Vision Transformer",
  num_classes: 38,
  num_crops: 14,
  test_accuracy: 0.9895,
  model_loaded: undefined,
};

export function useModelInfo() {
  const [info, setInfo] = useState(FALLBACK_MODEL_INFO);

  useEffect(() => {
    let cancelled = false;

    getModelInfo()
      .then((data) => {
        if (!cancelled) setInfo(data);
      })
      .catch(() => {
        // Backend unreachable - keep showing the static fallback above.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return info;
}
