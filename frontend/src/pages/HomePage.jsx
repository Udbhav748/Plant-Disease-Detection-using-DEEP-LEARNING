import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, ListChecks, Target, Zap, UploadCloud } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useModelInfo } from "../hooks/useModelInfo";

export default function HomePage() {
  const info = useModelInfo();

  const stats = [
    { value: `${(info.test_accuracy * 100).toFixed(2)}%`, label: "Test accuracy" },
    { value: `${info.num_classes}`, label: "Disease classes" },
    { value: `${info.num_crops}`, label: "Crop species" },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-powered detection",
      description: "A deep learning model trained on tens of thousands of real leaf images.",
    },
    {
      icon: Layers,
      title: "Hybrid CNN + Transformer",
      description: "Combines CBAM-attention EfficientNet with a Vision Transformer branch.",
    },
    {
      icon: ListChecks,
      title: "Multi-class classification",
      description: `Identifies ${info.num_classes} conditions across ${info.num_crops} crop species in a single pass.`,
    },
    {
      icon: Target,
      title: "High accuracy",
      description: `${(info.test_accuracy * 100).toFixed(2)}% accuracy on a held-out test set of over 10,000 images.`,
    },
    {
      icon: Zap,
      title: "Instant prediction",
      description: "Upload a photo and get a diagnosis in seconds, right in your browser.",
    },
  ];

  return (
    <div className="flex flex-col gap-24 py-16 sm:py-24">
      <section className="flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="rounded-full bg-surface-secondary dark:bg-surface-secondary-dark px-4 py-1.5 text-xs font-medium text-text-secondary dark:text-text-secondary-dark">
            Powered by a hybrid CNN + Transformer model
          </span>
          <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-text-primary dark:text-text-primary-dark sm:text-5xl">
            Plant Disease Detection using Hybrid CNN + Transformer
          </h1>
          <p className="max-w-xl text-lg text-text-secondary dark:text-text-secondary-dark">
            Upload a photo of a leaf and get an instant, accurate diagnosis across {info.num_classes} diseases
            and {info.num_crops} crop species &mdash; no expertise required.
          </p>
          <Button to="/predict" size="lg" icon={UploadCloud}>
            Upload Leaf Image
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 + index * 0.05 }}
            >
              <Card hoverLift className="flex h-full flex-col gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-base font-semibold text-text-primary dark:text-text-primary-dark">
                  {title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
