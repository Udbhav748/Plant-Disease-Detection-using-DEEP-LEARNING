import React from "react";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-border-dark">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-text-secondary dark:text-text-secondary-dark sm:flex-row">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>LeafSense &mdash; AI-powered plant disease detection</span>
        </div>
        <span>Hybrid CNN + Transformer model</span>
      </div>
    </footer>
  );
}
