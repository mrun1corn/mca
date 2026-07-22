import React, { forwardRef } from "react";
import { Field } from "./Field";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = "", containerClassName, leftIcon, rightIcon, ...props }, ref) => {
    const inputElement = (
      <input
        ref={ref}
        className={`input w-full ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""} ${
          error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""
        } ${className}`}
        {...props}
      />
    );

    const inputContent =
      leftIcon || rightIcon ? (
        <div className="relative flex items-center w-full">
          {inputElement}
          {leftIcon ? (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          ) : null}
          {rightIcon ? (
            <div className="absolute right-3 text-slate-400 flex items-center justify-center">
              {rightIcon}
            </div>
          ) : null}
        </div>
      ) : (
        inputElement
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
