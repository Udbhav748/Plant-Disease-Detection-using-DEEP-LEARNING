import React from "react";

export default function Card({ children, className = "", padding = "p-6", hoverLift = false, as: Component = "div", ...props }) {
  return (
    <Component
      className={`bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-card ${
        hoverLift ? "transition-transform duration-200 hover:-translate-y-1 hover:shadow-elevated" : ""
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
