"use client";

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
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      {/* Pie Chart SVG */}
      <div className="flex-shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-sm"
        >
          {segments.map((segment, index) => (
            <path
              key={segment.category}
              d={segment.pathData}
              fill={segment.color}
              className="transition-opacity hover:opacity-80"
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-2.5">
        {data.map((item) => {
          const percentage = ((item.amount / total) * 100).toFixed(1);
          return (
            <div
              key={item.category}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-slate-700">
                  {item.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-900">
                  {percentage}%
                </div>
              </div>
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

