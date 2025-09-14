import React from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "xs" | "sm" | "md";

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
};

export default function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  return <button className={`${variantClass[variant]} ${sizeClass[size]} ${className}`} {...props} />;
}
