import React, { forwardRef } from "react";

const CustomInput = forwardRef(
  (
    {
      label,
      error,
      helperText,
      containerClassName = "",
      labelClassName = "",
      className = "",
      id,
      required,
      type,
      ...props
    },
    ref
  ) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    // Utility function to join class names
    const joinClasses = (...classes) => classes.filter(Boolean).join(" ");

    return (
      <div className={joinClasses("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={joinClasses(
              "text-sm font-medium text-[#6C7275]",
              error && "text-red-600",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          type={type || "text"}
          className={joinClasses(
            "border border-gray-300 px-3 py-2 rounded-md w-full mt-2",
            "placeholder:text-gray-400 placeholder:font-normal",
            "hover:border-gray-400",
            "transition-all duration-200 ease-in-out transform focus:scale-[1.01]",
            "focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#94B316]",
            "focus-visible:ring-1 focus-visible:ring-offset-1 ",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="text-red-500">⚠</span>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
