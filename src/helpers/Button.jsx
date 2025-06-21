import React from "react";

// Define the Button component
const Button = ({
  label = "Click Me",
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  icon,
  ...props
}) => {
  // Base styles for the button
  const baseStyles =
    "font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  // Variant styles
  const variantStyles = {
    primary: "bg-[#94B316] text-white hover:bg-[#7A9612] focus:ring-[#94B316]",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "bg-transparent border border-[#94B316] text-[#94B316] hover:bg-[#94B316] hover:text-white focus:ring-[#94B316]",
  };

  // Size styles
  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  // Combine classes
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${
    sizeStyles[size]
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClasses} rounded-full hover:cursor-pointer ${
        icon && "flex items-center gap-3"
      }`}
      {...props}
    >
      {icon && icon} {label}
    </button>
  );
};

export default Button;
