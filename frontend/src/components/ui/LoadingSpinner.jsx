import React from "react";
import { Loader2 } from "lucide-react";

const SIZE_MAP = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

export default function LoadingSpinner({ size = "md", label, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status">
      <Loader2 className={`${SIZE_MAP[size]} animate-spin text-accent`} aria-hidden="true" />
      {label && <span className="text-sm text-text-secondary dark:text-text-secondary-dark">{label}</span>}
      <span className="sr-only">Loading</span>
    </div>
  );
}
