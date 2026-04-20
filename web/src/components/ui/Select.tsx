import React, { forwardRef } from "react";
import { Field } from "./Field";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, className = "", containerClassName, children, ...props }, ref) => {
    const selectContent = (
      <select
        ref={ref}
        className={`input w-full pr-8 ${
          error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </select>
    );

    if (label || hint || error) {
      return (
        <Field label={label} hint={hint} error={error} className={containerClassName}>
          {selectContent}
        </Field>
      );
    }

    return selectContent;
  }
);
Select.displayName = "Select";
