import React, { forwardRef } from "react";

const CustomeSelect = forwardRef(
  ({ label, error, dept, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[#ECECEC] ml-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full bg-[#383838] border border-transparent focus:border-gray-500 rounded-lg px-4 py-3 text-[#ECECEC] outline-none appearance-none transition-colors cursor-pointer ${className}`}
            {...props}
          >
            {dept.map((department) => (
              <option
                key={department}
                value={department === "Select Department" ? "" : department}
                disabled={department === "Select Department"}
                className="bg-[#2F2F2F] text-[#ECECEC] py-2"
              >
                {department}
              </option>
            ))}
          </select>
          {/* Custom arrow icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <span className="text-red-400 text-xs ml-1">{error.message}</span>
        )}
      </div>
    );
  },
);

export default CustomeSelect;
