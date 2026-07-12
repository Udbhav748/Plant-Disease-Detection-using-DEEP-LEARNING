import React from "react";
import { Cpu, Layers, ShieldCheck } from "lucide-react";
import Modal from "../ui/Modal";

const FACTS = [
  {
    icon: Layers,
    title: "Hybrid architecture",
    description:
      "Combines a CBAM-attention EfficientNetB0 CNN branch with a custom Vision Transformer branch, fused before classification.",
  },
  {
    icon: Cpu,
    title: "38 disease classes",
    description: "Covers 14 crop species, from Apple and Tomato to Grape, Corn, and Citrus.",
  },
  {
    icon: ShieldCheck,
    title: "98.95% test accuracy",
    description: "Evaluated on a held-out test set of over 10,000 leaf images.",
  },
];

export default function AboutModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About LeafSense">
      <p className="mb-5 text-sm text-text-secondary dark:text-text-secondary-dark">
        LeafSense is an AI-powered plant disease detector. Upload a photo of a leaf and get an instant
        diagnosis, powered by a hybrid CNN + Transformer model trained on the New Plant Diseases Dataset.
      </p>
      <div className="flex flex-col gap-4">
        {FACTS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-secondary dark:bg-surface-secondary-dark">
              <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                {title}
              </p>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
