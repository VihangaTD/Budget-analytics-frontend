import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const formatUSD = (v) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(v);

const getTightTicks = (max) => {
  if (max <= 0) return [0, 2500, 5000, 7500, 10000];
  const top = Math.ceil(max * 1.1);
  const step = top / 4;
  return [0, step, step * 2, step * 3, top];
};

const CustomTooltip = ({ active, payload, coordinate }) => {
  if (!active || !payload || !payload[0] || !coordinate) return null;

  const data = payload[0].payload;
  const { x, y } = coordinate;

  const width = 200;
  const height = 90 + data.items.length * 30;

  // GLUE TO DOT: 8px above dot
  const left = x - width / 2;
  const top = y - height - 8; // 8px gap

  // Clamp to screen
  const minX = 10;
  const maxX = 1200 - width - 10;
  const finalX = Math.max(minX, Math.min(left, maxX));
  const finalY = Math.max(10, top);

  return (
    <div
      className="absolute bg-white rounded-2xl shadow-2xl border border-yellow-100 p-5 pointer-events-none z-50"
      style={{
        left: `${finalX}px`,
        top: `${finalY}px`,
        width: `${width}px`,
        boxShadow: '0 16px 32px rgba(250, 204, 21, 0.3)',
        transform: 'translateY(-8px)', // extra stick
      }}
    >
      <p className="text-sm font-bold text-gray-800 mb-1">{data.date}</p>
      <p className="text-lg font-bold text-yellow-600 mb-4">
        {formatUSD(data.dailyTotal)}
      </p>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {data.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-700 font-medium truncate max-w-36">
              {item.icon || ''} {item.name}
            </span>
            <span className="font-bold text-yellow-700">
              {formatUSD(item.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
        No income this month
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const ticks = getTightTicks(maxValue);
  const domain = [0, ticks[4]];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 30, right: 30, left: 10, bottom: 20 }}
      >
        <defs>
          <linearGradient id="yellowFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="4 4" stroke="#fef3c7" />

        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          ticks={ticks}
          domain={domain}
          tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
          tickFormatter={(v) =>
            v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
          }
          axisLine={false}
          tickLine={false}
          interval={0}
        />

        {/* TOOLTIP STICKS TO DOT */}
        <Tooltip content={<CustomTooltip />} cursor={false} />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#f59e0b"
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#yellowFill)"
          dot={{
            fill: '#f59e0b',
            r: 9,
            stroke: '#fff',
            strokeWidth: 4,
          }}
          activeDot={{
            r: 13,
            fill: '#f97316',
            stroke: '#fff',
            strokeWidth: 6,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;