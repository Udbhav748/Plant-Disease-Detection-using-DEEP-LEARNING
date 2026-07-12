import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, X, Info } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";

const ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const ICON_COLORS = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-accent",
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4 shadow-elevated"
            >
              <Icon className={`h-5 w-5 shrink-0 ${ICON_COLORS[toast.type]}`} aria-hidden="true" />
              <p className="flex-1 text-sm text-text-primary dark:text-text-primary-dark">{toast.message}</p>
              <button
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="shrink-0 rounded-md p-0.5 text-text-secondary dark:text-text-secondary-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
