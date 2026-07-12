import React from "react";

export default function EmptyState({ icon: Icon, title, description, action, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 text-center ${className}`}>
      {Icon && (
        <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-surface-secondary dark:bg-surface-secondary-dark">
          <Icon className="h-6 w-6 text-text-secondary dark:text-text-secondary-dark" aria-hidden="true" />
        </div>
      )}
      {title && <p className="font-heading text-base font-semibold text-text-primary dark:text-text-primary-dark">{title}</p>}
      {description && (
        <p className="max-w-xs text-sm text-text-secondary dark:text-text-secondary-dark">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
