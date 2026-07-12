import React, { useEffect, useState } from "react";
import { Cpu, Layers, ShieldCheck } from "lucide-react";
import Modal from "../ui/Modal";
import { getModelInfo } from "../../services/api";

// Static fallback shown until the live /model-info response arrives (or if
// the backend can't be reached) so the modal never renders empty.
const FALLBACK_INFO = {
  architecture: "Hybrid CBAM-attention EfficientNetB0 CNN + Vision Transformer",
  num_classes: 38,
  num_crops: 14,
  test_accuracy: 0.9895,
};

export default function AboutModal({ isOpen, onClose }) {
  const [info, setInfo] = useState(FALLBACK_INFO);

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

  const facts = [
    {
      icon: Layers,
      title: "Hybrid architecture",
      description: `${info.architecture}, fused before classification.`,
    },
    {
      icon: Cpu,
      title: `${info.num_classes} disease classes`,
      description: `Covers ${info.num_crops} crop species, from Apple and Tomato to Grape, Corn, and Citrus.`,
    },
    {
      icon: ShieldCheck,
      title: `${(info.test_accuracy * 100).toFixed(2)}% test accuracy`,
      description: "Evaluated on a held-out test set of over 10,000 leaf images.",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About LeafSense">
      <p className="mb-5 text-sm text-text-secondary dark:text-text-secondary-dark">
        LeafSense is an AI-powered plant disease detector. Upload a photo of a leaf and get an instant
        diagnosis, powered by a hybrid CNN + Transformer model trained on the New Plant Diseases Dataset.
      </p>
      <div className="flex flex-col gap-4">
        {facts.map(({ icon: Icon, title, description }) => (
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
