import React from "react";

const Logo = ({ width = "100px", className = "" }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#8B5CF6", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#EC4899", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      {/* Main circle background */}
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />

      {/* Book/journal icon */}
      <g transform="translate(25, 20)">
        {/* Book spine */}
        <rect
          x="0"
          y="0"
          width="4"
          height="60"
          rx="2"
          fill="#FFFFFF"
          opacity="0.9"
        />

        {/* Book pages */}
        <rect
          x="4"
          y="0"
          width="46"
          height="60"
          rx="3"
          fill="#FFFFFF"
          opacity="0.95"
        />

        {/* Page lines representing text */}
        <rect
          x="8"
          y="8"
          width="34"
          height="2"
          rx="1"
          fill="#8B5CF6"
          opacity="0.7"
        />
        <rect
          x="8"
          y="14"
          width="28"
          height="2"
          rx="1"
          fill="#8B5CF6"
          opacity="0.7"
        />
        <rect
          x="8"
          y="20"
          width="32"
          height="2"
          rx="1"
          fill="#8B5CF6"
          opacity="0.7"
        />
        <rect
          x="8"
          y="26"
          width="30"
          height="2"
          rx="1"
          fill="#8B5CF6"
          opacity="0.7"
        />
        <rect
          x="8"
          y="32"
          width="36"
          height="2"
          rx="1"
          fill="#8B5CF6"
          opacity="0.7"
        />
        <rect
          x="8"
          y="38"
          width="24"
          height="2"
          rx="1"
          fill="#8B5CF6"
          opacity="0.7"
        />
        <rect
          x="8"
          y="44"
          width="38"
          height="2"
          rx="1"
          fill="#8B5CF6"
          opacity="0.7"
        />
        <rect
          x="8"
          y="50"
          width="26"
          height="2"
          rx="1"
          fill="#8B5CF6"
          opacity="0.7"
        />

        {/* Thought bubble dots representing ideas */}
        <circle cx="42" cy="12" r="2" fill="#EC4899" opacity="0.8" />
        <circle cx="46" cy="16" r="1.5" fill="#EC4899" opacity="0.6" />
        <circle cx="48" cy="20" r="1" fill="#EC4899" opacity="0.4" />
      </g>

      {/* Optional: Add a small pen icon */}
      <g transform="translate(65, 35)">
        <path d="M0 0 L8 8 L6 10 L-2 2 Z" fill="#FFFFFF" opacity="0.8" />
        <circle cx="8" cy="8" r="1.5" fill="#EC4899" />
      </g>
    </svg>
  );
};

export default Logo;
