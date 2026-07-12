import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Stethoscope, ShieldCheck } from "lucide-react";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import { formatDisplayName, getDiseaseInfo, isHealthyClass } from "../../utils/diseaseInfo";

export default function PredictionCard({ prediction }) {
  const { class: predictedClass, confidence } = prediction;
  const healthy = isHealthyClass(predictedClass);
  const info = getDiseaseInfo(predictedClass);
  const displayName = formatDisplayName(predictedClass);
  const confidencePct = confidence * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
              healthy ? "bg-success/10" : "bg-warning/10"
            }`}
          >
            {healthy ? (
              <CheckCircle2 className="h-6 w-6 text-success" aria-hidden="true" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-warning" aria-hidden="true" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-text-secondary dark:text-text-secondary-dark">
              {healthy ? "No disease detected" : "Detected condition"}
            </p>
            <h3 className="font-heading text-xl font-bold text-text-primary dark:text-text-primary-dark">
              {displayName}
            </h3>
          </div>
        </div>

        <ProgressBar value={confidencePct} label="Model confidence" />

        <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
          {info.description}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-surface-secondary dark:bg-surface-secondary-dark p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-accent" aria-hidden="true" />
              <p className="font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                {healthy ? "Care tips" : "Recommended treatment"}
              </p>
            </div>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{info.treatment}</p>
          </div>
          <div className="rounded-xl bg-surface-secondary dark:bg-surface-secondary-dark p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              <p className="font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                Prevention
              </p>
            </div>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{info.prevention}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
