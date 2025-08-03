import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/20 duration-200 border border-white/20 w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
