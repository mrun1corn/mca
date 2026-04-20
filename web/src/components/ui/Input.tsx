import React, { forwardRef } from "react";
import { Field } from "./Field";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = "", containerClassName, ...props }, ref) => {
    const inputContent = (
      <input
        ref={ref}
        className={`input w-full ${
          error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""
        } ${className}`}
        {...props}
      />
    );

    if (label || hint || error) {
      return (
        <Field label={label} hint={hint} error={error} className={containerClassName}>
          {inputContent}
        </Field>
      );
    }

    return inputContent;
  }
);
Input.displayName = "Input";
