import React, { forwardRef } from "react";

const Customeinput = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#ECECEC] ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-[#383838] border border-transparent focus:border-gray-500 rounded-lg px-4 py-3 text-[#ECECEC] placeholder-gray-500 outline-none transition-colors ${className}`}
          {...props}
        />
        {error && (
          <span className="text-red-400 text-xs ml-1">{error.message}</span>
        )}
      </div>
    );
  },
);

export default Customeinput;
