import { useCallback, useState } from "react";
import { predictDisease, PredictionError } from "../services/api";

export function useImagePrediction() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const predict = useCallback(async (file) => {
    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const prediction = await predictDisease(file);
      setResult(prediction);
      setStatus("success");
      return prediction;
    } catch (err) {
      const message =
        err instanceof PredictionError ? err.message : "Unexpected error. Please try again.";
      setError(message);
      setStatus("error");
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return {
    status,
    isLoading: status === "loading",
    result,
    error,
    predict,
    reset,
  };
}
