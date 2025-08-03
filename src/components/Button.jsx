import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-gradient-to-r from-purple-600 to-pink-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
