import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScanSearch, Leaf } from "lucide-react";
import UploadZone from "../components/features/UploadZone";
import PredictionCard from "../components/features/PredictionCard";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import { useImagePrediction } from "../hooks/useImagePrediction";
import { useToast } from "../contexts/ToastContext";

export default function PredictPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { status, isLoading, result, error, predict, reset } = useImagePrediction();
  const { showToast } = useToast();
  const previousError = useRef(null);

  useEffect(() => {
    if (error && error !== previousError.current) {
      showToast(error, { type: "error" });
    }
    previousError.current = error;
  }, [error, showToast]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileSelect = (file) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    reset();
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    reset();
  };

  const handleAnalyze = () => {
    if (selectedFile) predict(selectedFile);
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 py-12">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          Diagnose a leaf
        </h1>
        <p className="mt-2 text-text-secondary dark:text-text-secondary-dark">
          Upload a clear photo of a single leaf to get started.
        </p>
      </div>

      <UploadZone
        previewUrl={previewUrl}
        onFileSelect={handleFileSelect}
        onClear={handleClear}
        disabled={isLoading}
      />

      {selectedFile && !result && (
        <Button size="lg" icon={ScanSearch} onClick={handleAnalyze} isLoading={isLoading} className="mx-auto">
          {isLoading ? "Analyzing..." : "Analyze Image"}
        </Button>
      )}

      {isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <LoadingSpinner size="lg" label="Running the hybrid model..." />
        </motion.div>
      )}

      {!selectedFile && status === "idle" && (
        <EmptyState
          icon={Leaf}
          title="No image selected yet"
          description="Your prediction and treatment recommendations will appear here."
        />
      )}

      {result && <PredictionCard prediction={result} />}

      {result && (
        <Button variant="ghost" onClick={handleClear} className="mx-auto">
          Analyze another image
        </Button>
      )}
    </div>
  );
}
