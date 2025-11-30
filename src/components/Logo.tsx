// src/components/Logo.tsx

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon - Modern, minimal design with peso symbol */}
      <div className="relative flex-shrink-0">
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          
          {/* Modern square with rounded corners - represents stability and tracking */}
          <rect
            x="4"
            y="4"
            width="30"
            height="30"
            rx="6"
            fill="url(#logoGradient)"
            className="drop-shadow-sm"
          />
          
          {/* Peso symbol - clean and prominent */}
          <text
            x="19"
            y="26"
            fontSize="20"
            fontWeight="700"
            fill="white"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
            letterSpacing="0"
          >
            ₱
          </text>
          
          {/* Subtle tracking lines - represents expense tracking */}
          <path
            d="M10 14 L14 12 L18 14 L22 10 L26 12"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
            fill="none"
          />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col leading-tight">
        <div className="text-base font-bold tracking-tight text-slate-900">
          PH Expense Tracker
        </div>
        <div className="text-[11px] font-medium text-slate-500 tracking-wide">
          Budget Management
        </div>
      </div>
    </div>
  );
}

