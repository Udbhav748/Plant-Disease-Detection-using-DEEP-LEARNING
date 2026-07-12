import React from "react";
import { motion } from "framer-motion";

/**
 * value: 0-100
 */
export default function ProgressBar({ value, label, showValue = true, size = "md" }) {
  const clamped = Math.max(0, Math.min(100, value));
  const height = size === "sm" ? "h-1.5" : "h-2.5";

  const tone =
    clamped >= 85 ? "bg-success" : clamped >= 60 ? "bg-accent" : clamped >= 40 ? "bg-warning" : "bg-error";

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="text-text-secondary dark:text-text-secondary-dark">{label}</span>}
          {showValue && (
            <span className="font-heading font-semibold text-text-primary dark:text-text-primary-dark">
              {clamped.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${height} rounded-full bg-surface-secondary dark:bg-surface-secondary-dark overflow-hidden`}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className={`${height} rounded-full ${tone}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
