"use client";

import { useState } from "react";

type CategoryData = {
  category: string;
  amount: number;
  color: string;
};

type CategoryPieChartProps = {
  data: CategoryData[];
  total: number;
};

// Default fallback colors (used when category settings are not available)
const defaultCategoryColors: Record<string, string> = {
  Food: "#F66D44", // vibrant reddish-orange
  Transport: "#2D87BB", // medium clear blue
  Bills: "#64C2A6", // medium teal/mint green
  Entertainment: "#FEAE65", // soft orange/peach
};

export function CategoryPieChart({ data, total }: CategoryPieChartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const activateCategory = (category: string) => {
    setHoveredCategory((current) => (current === category ? null : category));
  };

  if (data.length === 0 || total === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-slate-500">
        No data to display
      </div>
    );
  }

  const size = 160;
  const radius = size / 2 - 8;
  const center = size / 2;
  let currentAngle = -90; // Start at top

  const segments = data.map((item) => {
    const percentage = item.amount / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    // Calculate path for pie slice
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startAngleRad);
    const y1 = center + radius * Math.sin(startAngleRad);
    const x2 = center + radius * Math.cos(endAngleRad);
    const y2 = center + radius * Math.sin(endAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    return {
      ...item,
      pathData,
      percentage,
      startAngle,
      endAngle,
    };
  });

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Pie Chart SVG */}
      <div className="flex-shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-sm"
        >
          {segments.map((segment) => {
            const isHovered = hoveredCategory === segment.category;
            const midAngle = (segment.startAngle + segment.endAngle) / 2;
            const midAngleRad = (midAngle * Math.PI) / 180;
            const offset = isHovered ? 8 : 0;
            const translateX = Math.cos(midAngleRad) * offset;
            const translateY = Math.sin(midAngleRad) * offset;

            return (
              <path
                key={segment.category}
                d={segment.pathData}
                fill={segment.color}
                onMouseEnter={() => setHoveredCategory(segment.category)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => activateCategory(segment.category)}
                className="cursor-pointer transition-all duration-200"
                style={{
                  transform: `translate(${translateX}px, ${translateY}px)`,
                  opacity: isHovered ? 0.9 : 0.8,
                  stroke: isHovered ? "#0f172a" : "transparent",
                  strokeWidth: isHovered ? 1.5 : 0,
                }}
              />
            );
          })}

          {/* Center label showing hovered category + percentage */}
          {hoveredCategory && (() => {
            const hovered = segments.find(
              (segment) => segment.category === hoveredCategory
            );
            if (!hovered) return null;

            const percentLabel = `${(hovered.percentage * 100).toFixed(1)}%`;

            return (
              <foreignObject
                x={center - 45}
                y={center - 22}
                width={90}
                height={44}
                style={{ pointerEvents: "none" }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/95 px-2 py-1 text-[10px] shadow-sm ring-1"
                  style={{ borderColor: hovered.color, color: hovered.color }}
                >
                  <span className="font-semibold">
                    {hovered.category}
                  </span>
                  <span className="text-[9px] font-medium opacity-80">
                    {percentLabel} of total
                  </span>
                </div>
              </foreignObject>
            );
          })()}
        </svg>
      </div>

      {/* Percentages */}
      <div className="flex-shrink-0 space-y-2">
        {data.map((item) => {
          const percentage = ((item.amount / total) * 100).toFixed(1);
          return (
            <div
              key={item.category}
              className="flex items-center gap-2 text-xs cursor-pointer"
              onMouseEnter={() => setHoveredCategory(item.category)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => activateCategory(item.category)}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span 
                className={`font-semibold transition-colors transition-transform ${
                  hoveredCategory === item.category
                    ? "scale-110 drop-shadow-[0_0_6px_rgba(0,0,0,0.25)]"
                    : ""
                }`}
                style={{
                  color: item.color,
                }}
              >
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to prepare data for the pie chart
export function prepareCategoryData(
  byCategory: Record<string, number>,
  categorySettings?: Record<string, { color: string; enabled: boolean }>
): CategoryData[] {
  return Object.entries(byCategory)
    .map(([category, amount]) => {
      // Use color from category settings if available, otherwise use default colors
      let color = "#F66D44"; // default fallback
      if (categorySettings && categorySettings[category]) {
        color = categorySettings[category].color;
      } else if (defaultCategoryColors[category]) {
        color = defaultCategoryColors[category];
      }
      
      return {
        category,
        amount,
        color,
      };
    })
    .sort((a, b) => b.amount - a.amount); // Sort by amount descending
}

