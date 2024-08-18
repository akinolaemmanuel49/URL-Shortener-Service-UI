"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TopFiveBarChartProps {
  data: { [key: string]: number };
}

const TopFiveBarChart: React.FC<TopFiveBarChartProps> = ({ data }) => {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    hits: data[key],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* No need for defaultProps, just use props directly */}
          <YAxis />
          <Tooltip />
          <Bar dataKey="hits" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopFiveBarChart;
