import React from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "xs" | "sm" | "md" | "full";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  danger: "btn btn-danger",
  ghost: "btn btn-ghost",
};

const sizeClass: Record<Size, string> = {
  xs: "text-xs px-2 py-0.5",
  sm: "text-sm px-2 py-1",
  md: "text-sm px-3 py-1.5",
  full: "text-sm w-full px-3 py-2 justify-center",
};

export default function Button({ variant = "primary", size = "md", className = "", isLoading, children, disabled, ...props }: ButtonProps & { isLoading?: boolean }) {
  return (
    <button
      className={`${variantClass[variant]} ${sizeClass[size]} ${className} ${isLoading ? "opacity-75 cursor-not-allowed" : ""} flex items-center justify-center gap-2`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
