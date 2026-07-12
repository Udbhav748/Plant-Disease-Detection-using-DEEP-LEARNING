import React from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const VARIANT_CLASSES = {
  primary: "bg-accent text-white hover:bg-accent/90 shadow-soft",
  secondary:
    "bg-surface-secondary dark:bg-surface-secondary-dark text-text-primary dark:text-text-primary-dark hover:opacity-80",
  ghost:
    "bg-transparent text-text-primary dark:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark",
  outline:
    "bg-transparent border border-border dark:border-border-dark text-text-primary dark:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark",
};

const SIZE_CLASSES = {
  sm: "text-sm px-3 py-1.5 gap-1.5 rounded-lg",
  md: "text-sm px-4 py-2.5 gap-2 rounded-xl",
  lg: "text-base px-6 py-3.5 gap-2.5 rounded-xl",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

function ButtonContent({ isLoading, Icon, iconPosition, children }) {
  return (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        Icon && iconPosition === "left" && <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      {children}
      {!isLoading && Icon && iconPosition === "right" && (
        <Icon className="h-4 w-4" aria-hidden="true" />
      )}
    </>
  );
}

const Button = React.forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    isLoading = false,
    disabled = false,
    className = "",
    to,
    ...props
  },
  ref
) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;
  const content = (
    <ButtonContent isLoading={isLoading} Icon={icon} iconPosition={iconPosition}>
      {children}
    </ButtonContent>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
