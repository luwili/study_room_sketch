import React from 'react';

export const SketchArrow: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    <path
      d="M6 22 C14 20, 24 21, 33 19 M26 12 C29 15, 33 18, 34 20 C32 23, 27 27, 24 29"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchCurvedArrow: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 50 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    <path
      d="M8 8 C12 28, 28 34, 42 26 M34 32 C38 30, 42 27, 43 25 C41 21, 38 16, 36 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchStar: React.FC<{ className?: string; fill?: string }> = ({ 
  className = 'w-4 h-4',
  fill = 'currentColor'
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    <path
      d="M12 2 C12 7, 14 10, 19 12 C14 14, 12 17, 12 22 C12 17, 10 14, 5 12 C10 10, 12 7, 12 2 Z"
      fill={fill}
      stroke="#12161A"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

export const SketchCircleHighlight: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <svg
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      fill="none"
      className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)] pointer-events-none -z-0"
      aria-hidden="true"
    >
      <path
        d="M6 20 C6 8, 28 4, 60 4 C95 4, 114 9, 114 20 C114 31, 90 36, 56 36 C22 36, 4 30, 6 18"
        stroke="#84CC16"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const SketchUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-full h-2',
  color = '#2563EB'
}) => (
  <svg
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
    fill="none"
    className={`block ${className}`}
    aria-hidden="true"
  >
    <path
      d="M1 5 C24 2, 68 7, 99 3"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export interface SketchBadgeProps {
  children: React.ReactNode;
  variant?: 'indigo' | 'lime' | 'amber' | 'default' | 'danger';
  className?: string;
}

export const SketchBadge: React.FC<SketchBadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variantStyles = {
    indigo: 'bg-sketch-indigo/15 text-sketch-indigo dark:text-blue-300 border-sketch-indigo/40',
    lime: 'bg-sketch-lime/25 text-lime-950 dark:text-lime-300 border-sketch-lime/60',
    amber: 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    danger: 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-700',
    default: 'bg-sketch-card dark:bg-sketch-darkCard text-slate-800 dark:text-slate-200 border-sketch-line/40 dark:border-sketch-darkLine/60'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-sketch-xs text-xs font-mono font-bold border shadow-sketch-xs transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export interface SketchStampProps {
  label?: string;
  text?: string;
  sublabel?: string;
  variant?: 'indigo' | 'lime' | 'amber' | 'ink';
  color?: 'indigo' | 'lime' | 'amber' | 'ink';
  className?: string;
}

export const SketchStamp: React.FC<SketchStampProps> = ({
  label,
  text,
  sublabel,
  variant,
  color,
  className = ''
}) => {
  const effectiveLabel = label || text || '';
  const effectiveVariant = variant || color || 'indigo';

  const variantStyles = {
    indigo: 'border-[#2563EB] text-[#2563EB] bg-blue-50/70 dark:bg-blue-950/40 shadow-[2px_2px_0px_#2563EB]',
    lime: 'border-[#65A30D] text-[#3F6212] dark:text-[#BEF264] bg-lime-50/80 dark:bg-lime-950/40 shadow-[2px_2px_0px_#84CC16]',
    amber: 'border-[#D97706] text-[#B45309] dark:text-[#FCD34D] bg-amber-50/80 dark:bg-amber-950/40 shadow-[2px_2px_0px_#F59E0B]',
    ink: 'border-[#12161A] text-[#12161A] dark:border-white/40 dark:text-white bg-slate-100/90 dark:bg-slate-800/80 shadow-[2px_2px_0px_#12161A] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.3)]',
  };

  return (
    <div
      className={`inline-flex flex-col items-center justify-center px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider uppercase border-sketch-sm rotate-[-1.5deg] select-none ${variantStyles[effectiveVariant]} ${className}`}
    >
      <span>{effectiveLabel}</span>
      {sublabel && (
        <span className="text-[9px] opacity-80 tracking-normal font-sans font-medium">
          {sublabel}
        </span>
      )}
    </div>
  );
};
