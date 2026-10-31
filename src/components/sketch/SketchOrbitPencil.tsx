import React from 'react';

interface SketchOrbitPencilProps {
  className?: string;
  size?: number;
  showOrbits?: boolean;
}

export const SketchOrbitPencil: React.FC<SketchOrbitPencilProps> = ({
  className = '',
  size = 120,
  showOrbits = true
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Technical Blueprint Crosshairs */}
        <g stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.8" strokeDasharray="3 3">
          <line x1="10" y1="80" x2="150" y2="80" />
          <line x1="80" y1="10" x2="80" y2="150" />
          <circle cx="80" cy="80" r="70" />
          <circle cx="80" cy="80" r="45" />
        </g>

        {/* Orbit Ring 1 (Electric Blue) */}
        {showOrbits && (
          <g className="animate-orbit-spin origin-center">
            <ellipse
              cx="80"
              cy="80"
              rx="66"
              ry="26"
              transform="rotate(-28 80 80)"
              stroke="#2563EB"
              strokeWidth="1.6"
              strokeDasharray="6 4 2 4"
              strokeOpacity="0.85"
            />
            {/* Satellite Node on Orbit */}
            <circle
              cx="140"
              cy="65"
              r="4.5"
              fill="#84CC16"
              stroke="#12161A"
              strokeWidth="1.5"
            />
            <circle
              cx="20"
              cy="95"
              r="3"
              fill="#2563EB"
            />
          </g>
        )}

        {/* Orbit Ring 2 (Tilted Secondary Ring) */}
        {showOrbits && (
          <ellipse
            cx="80"
            cy="80"
            rx="56"
            ry="20"
            transform="rotate(42 80 80)"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
          />
        )}

        {/* Mascot Center: Futuristic Pencil-Satellite (Floating Levitation) */}
        <g className="animate-float-slow origin-center">
          {/* Hard Offset Drop Shadow for Pencil */}
          <g transform="translate(4, 4)" opacity="0.4">
            <path
              d="M72 32 L88 32 L94 98 L80 128 L66 98 Z"
              fill="#12161A"
            />
          </g>

          {/* Pencil Body Shell */}
          <path
            d="M72 32 L88 32 L94 98 L80 128 L66 98 Z"
            fill="#FFFFFF"
            stroke="#12161A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Technical Body Sections */}
          <line x1="72" y1="46" x2="88" y2="46" stroke="#12161A" strokeWidth="1.8" />
          <line x1="70" y1="62" x2="90" y2="62" stroke="#12161A" strokeWidth="1.8" />
          <line x1="68" y1="78" x2="92" y2="78" stroke="#12161A" strokeWidth="1.8" />
          <line x1="66" y1="94" x2="94" y2="94" stroke="#12161A" strokeWidth="1.8" />

          {/* Blueprint Indigo Stripe (Middle Segment) */}
          <rect
            x="70.5"
            y="47"
            width="19"
            height="14"
            fill="#2563EB"
          />

          {/* Cyber-Lime Glowing Indicator */}
          <rect
            x="68.5"
            y="63"
            width="23"
            height="14"
            fill="#84CC16"
          />

          {/* Longitudinal facet lines */}
          <line x1="80" y1="32" x2="80" y2="108" stroke="#12161A" strokeWidth="1.4" />

          {/* Graphite / Stylus Tip */}
          <polygon
            points="74,115 80,128 86,115"
            fill="#12161A"
          />

          {/* Satellite Wings / Drafting Calipers (Left & Right Wings) */}
          {/* Left Wing */}
          <path
            d="M66 74 L46 66 L42 86 L66 84 Z"
            fill="#FFFFFF"
            stroke="#12161A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <line x1="48" y1="72" x2="64" y2="78" stroke="#2563EB" strokeWidth="1.2" />
          <circle cx="44" cy="76" r="2.5" fill="#84CC16" stroke="#12161A" strokeWidth="1" />

          {/* Right Wing */}
          <path
            d="M94 74 L114 66 L118 86 L94 84 Z"
            fill="#FFFFFF"
            stroke="#12161A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <line x1="112" y1="72" x2="96" y2="78" stroke="#2563EB" strokeWidth="1.2" />
          <circle cx="116" cy="76" r="2.5" fill="#84CC16" stroke="#12161A" strokeWidth="1" />

          {/* Top Eraser / Thruster Antenna */}
          <path
            d="M75 32 L75 22 L85 22 L85 32 Z"
            fill="#F59E0B"
            stroke="#12161A"
            strokeWidth="1.8"
          />
          <line x1="80" y1="22" x2="80" y2="14" stroke="#12161A" strokeWidth="1.8" />
          <circle cx="80" cy="12" r="3" fill="#84CC16" stroke="#12161A" strokeWidth="1.4" />
        </g>

        {/* Hand-drawn Sparkles / Stars */}
        <g stroke="#12161A" strokeWidth="1.5" strokeLinecap="round">
          {/* Star Top-Left */}
          <path d="M30 36 L30 46 M25 41 L35 41" />
          {/* Star Bottom-Right */}
          <path d="M132 118 L132 128 M127 123 L137 123" />
        </g>
      </svg>
    </div>
  );
};
