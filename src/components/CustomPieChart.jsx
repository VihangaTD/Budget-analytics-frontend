import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const CustomPieChart = ({
  data = [],
  label = "",
  totalAmount = "",
  colors = [],
  showTextAnchor = false,
  innerRadius = 80,
  outerRadius = 110,
  height = 250,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="none"
              />
            ))}
          </Pie>

          {/* Center Texts */}
          <text
            x="50%"
            y="45%"
            textAnchor={showTextAnchor ? "middle" : "start"}
            dominantBaseline="middle"
            className="text-[14px]"
            fill="#555"
          >
            {label}
          </text>

          <text
            x="50%"
            y="58%"
            textAnchor={showTextAnchor ? "middle" : "start"}
            dominantBaseline="middle"
            className="text-[20px] font-semibold"
            fill="#111"
          >
            {totalAmount}
          </text>
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
