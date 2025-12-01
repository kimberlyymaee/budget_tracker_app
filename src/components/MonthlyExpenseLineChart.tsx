"use client";

import { useState, useEffect, useRef } from "react";
import { Expense, peso } from "@/lib/mockData";

type MonthlyData = {
  month: string;
  monthIndex: number;
  amount: number;
};

type MonthlyExpenseLineChartProps = {
  data: MonthlyData[];
  height?: number;
  showArea?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  monthlyBudget?: number; // still accepted (for potential highlighting), but scale is now fixed
};

// Helper function to aggregate expenses by month
export function aggregateExpensesByMonth(
  expenses: Expense[],
  year: number = new Date().getFullYear()
): MonthlyData[] {
  // Initialize all 12 months with 0 amounts
  const monthlyTotals: Record<number, number> = {};
  for (let i = 0; i < 12; i++) {
    monthlyTotals[i] = 0;
  }

  // Aggregate expenses by month
  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    if (expenseDate.getFullYear() === year) {
      const monthIndex = expenseDate.getMonth();
      monthlyTotals[monthIndex] += expense.amount;
    }
  });

  // Convert to array format with month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames.map((month, index) => ({
    month,
    monthIndex: index,
    amount: monthlyTotals[index],
  }));
}

type MonthlyExpenseChartCardProps = {
  expenses: Expense[];
  year?: number;
  height?: number;
  showArea?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  isLoading?: boolean;
  availableYears?: number[];
  onYearChange?: (year: number) => void;
  monthlyBudget?: number;
};

export function MonthlyExpenseChartCard({
  expenses,
  year = new Date().getFullYear(),
  height = 300,
  showArea = true,
  showGrid = true,
  showTooltip = true,
  isLoading = false,
  availableYears = [new Date().getFullYear()],
  onYearChange,
  monthlyBudget,
}: MonthlyExpenseChartCardProps) {
  const monthlyData = aggregateExpensesByMonth(expenses, year);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[var(--shadow-soft)] sm:p-5">
        <div className="mb-4">
          <div className="h-5 w-48 animate-pulse rounded bg-slate-200"></div>
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-200"></div>
        </div>
        <div className="mb-4 h-[300px] animate-pulse rounded-lg bg-slate-100"></div>
        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200"></div>
              <div className="mt-2 h-5 w-24 animate-pulse rounded bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (monthlyData.length === 0 || monthlyData.every(d => d.amount === 0)) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[var(--shadow-soft)] sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              Yearly Expenses - {year}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Track your spending trends throughout the year
            </p>
          </div>
        </div>
        <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
          <svg
            className="mb-3 h-12 w-12 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-sm font-medium text-slate-600">No expense data available</p>
          <p className="mt-1 text-xs text-slate-500">
            Start adding expenses to see your monthly trends
          </p>
        </div>
      </div>
    );
  }
  
  // Calculate stats
  const totalYear = monthlyData.reduce((sum, d) => sum + d.amount, 0);
  const averageMonthly = totalYear / 12;
  const highestMonth = monthlyData.reduce((max, d) => 
    d.amount > max.amount ? d : max, monthlyData[0] || { month: '', monthIndex: 0, amount: 0 }
  );
  const lowestMonth = monthlyData.reduce((min, d) => 
    d.amount < min.amount ? d : min, monthlyData[0] || { month: '', monthIndex: 0, amount: 0 }
  );

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 p-4 shadow-[var(--shadow-soft)] sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Yearly Expenses
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Track your spending trends throughout the year
          </p>
        </div>
        {availableYears.length > 1 && (
          <div className="relative">
            <select
              value={year}
              onChange={(e) => {
                const newYear = parseInt(e.target.value);
                if (onYearChange) {
                  onYearChange(newYear);
                }
              }}
              className="appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 shadow-sm transition-all duration-200 hover:border-cyan-400 hover:shadow-md focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="mb-4">
        <MonthlyExpenseLineChart
          data={monthlyData}
          height={height}
          showArea={showArea}
          showGrid={showGrid}
          showTooltip={showTooltip}
          monthlyBudget={monthlyBudget}
        />
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700 pt-4 sm:grid-cols-4">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Year</div>
          <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {peso(totalYear)}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Monthly Average</div>
          <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {peso(averageMonthly)}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Highest Month</div>
          <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {highestMonth.month}: {peso(highestMonth.amount)}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Lowest Month</div>
          <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {lowestMonth.month}: {peso(lowestMonth.amount)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MonthlyExpenseLineChart({
  data,
  height = 300,
  showArea = true,
  showGrid = true,
  showTooltip = true,
}: MonthlyExpenseLineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate line drawing on mount
  useEffect(() => {
    setAnimationProgress(0);
    const duration = 800; // milliseconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-slate-500">
        No data to display
      </div>
    );
  }

  // Responsive width calculation
  const [containerWidth, setContainerWidth] = useState(800);
  
  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector('[data-chart-container]');
      if (container) {
        setContainerWidth(container.clientWidth || 800);
      }
      setIsMobile(window.innerWidth < 640);
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Use the actual container width so the chart stays within the viewport on mobile.
  // Clamp to a reasonable range for larger screens.
  const width = Math.min(Math.max(containerWidth, 320), 960);
  const padding = { 
    top: 40, 
    right: isMobile ? 20 : 40, 
    bottom: 40, 
    left: isMobile ? 50 : 60 
  };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  // Fixed scale: top at ₱10,000, decreasing by ₱2,000 downwards, bottom at ₱0
  const minAmount = 0;
  const maxAmount = 10000;
  const range = maxAmount - minAmount; // 10,000 range
  
  const yScale = (value: number) =>
    chartHeight - ((value - minAmount) / range) * chartHeight;

  const xScale = (index: number) => (index / (data.length - 1 || 1)) * chartWidth;

  // Generate path data for the line
  const fullLinePath = data
    .map((d, i) => {
      const x = xScale(i);
      const y = yScale(d.amount);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  // Calculate animated path length
  const getAnimatedPath = () => {
    if (animationProgress === 0) return "";
    
    const totalPoints = data.length;
    const animatedPoints = Math.ceil(totalPoints * animationProgress);
    
    return data
      .slice(0, animatedPoints)
      .map((d, i) => {
        const x = xScale(i);
        const y = yScale(d.amount);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(" ");
  };

  const animatedLinePath = getAnimatedPath();

  // Generate path data for the area (closed path) - also animated
  const areaPath =
    animatedLinePath +
    (animatedLinePath
      ? ` L ${xScale(Math.ceil(data.length * animationProgress) - 1)} ${chartHeight} L ${xScale(0)} ${chartHeight} Z`
      : "");

  // Update tooltip position to follow mouse cursor
  const handleMouseMove = (e: React.MouseEvent<SVGCircleElement>) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    });
  };

  return (
    <div className="relative w-full" data-chart-container ref={containerRef}>
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Chart area */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          {showGrid && (
            <g className="text-slate-300">
              {[0, 1, 2, 3, 4].map((i) => {
                const value = minAmount + (range / 4) * i;
                const y = yScale(value);
                return (
                  <g key={i}>
                    <line
                      x1={0}
                      y1={y}
                      x2={chartWidth}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Area fill */}
          {showArea && (
            <path
              d={areaPath}
              fill="url(#areaGradient)"
              className="transition-opacity duration-300"
            />
          )}

          {/* Gradient line with animation */}
          <path
            d={animatedLinePath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm transition-opacity duration-300"
            style={{
              opacity: animationProgress > 0 ? 1 : 0,
            }}
          />

          {/* Data points with hover areas and animation */}
          {data.map((d, i) => {
            const x = xScale(i);
            const y = yScale(d.amount);
            const isHovered = hoveredIndex === i;
            const shouldShow = i < Math.ceil(data.length * animationProgress);
            const baseRadius = isMobile ? 3 : 4;
            const hoverRadius = isMobile ? 5 : 7;
            const hitRadius = isMobile ? 20 : 16;
            
            return (
              <g key={i}>
                {/* Invisible larger hit area for easier hovering / tapping */}
                <circle
                  cx={x}
                  cy={y}
                  r={hitRadius}
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth="4"
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setTooltipPosition(null);
                  }}
                  className="cursor-pointer"
                  style={{ pointerEvents: 'all' }}
                />
                {/* Visible data point with fade-in animation */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? hoverRadius : baseRadius}
                  fill={isHovered ? "#0891b2" : "#06b6d4"}
                  stroke="white"
                  strokeWidth={isMobile ? (isHovered ? 2 : 1.5) : isHovered ? 3 : 2}
                  className="transition-all duration-200 pointer-events-none"
                  style={{
                    opacity: shouldShow ? 1 : 0,
                    transform: shouldShow ? "scale(1)" : "scale(0)",
                    transition: "opacity 0.3s ease-out, transform 0.3s ease-out, r 0.2s ease-out",
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* Y-axis labels (currency) - responsive font size */}
        <g className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-slate-600`}>
          {[
            10000, // top
            8000,
            6000,
            4000,
            2000,
            0,     // bottom
          ].map((value) => {
            const y = padding.top + yScale(value);
            const formattedValue =
              isMobile && value >= 1000
                ? `₱${(value / 1000).toFixed(1)}K`
                : peso(value);

            return (
              <text
                key={value}
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-600"
              >
                {formattedValue}
              </text>
            );
          })}
        </g>

        {/* X-axis labels (months) - responsive: show every other month on mobile */}
        <g className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-slate-600`}>
          {data.map((d, i) => {
            // On mobile, show every other month label to avoid crowding
            const shouldShow = !isMobile || i % 2 === 0;
            if (!shouldShow) return null;
            
            const x = padding.left + xScale(i);
            return (
              <text
                key={i}
                x={x}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                className="fill-slate-600"
              >
                {d.month}
              </text>
            );
          })}
        </g>
      </svg>

      {/* Tooltip - follows cursor */}
      {showTooltip && hoveredIndex !== null && tooltipPosition && (
        <div
          className="absolute z-50 rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white shadow-xl"
          style={{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y - 15}px`,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div className="mb-1 text-xs font-medium text-slate-300">
            {data[hoveredIndex].month}
          </div>
          <div className="text-base font-bold text-cyan-400">
            {peso(data[hoveredIndex].amount)}
          </div>
        </div>
      )}
    </div>
  );
}

