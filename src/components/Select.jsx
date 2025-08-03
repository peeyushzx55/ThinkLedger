import { forwardRef, useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/20 duration-200 border border-white/20 w-full ${className}`}
      >
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-gray-800 text-white"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(Select);
