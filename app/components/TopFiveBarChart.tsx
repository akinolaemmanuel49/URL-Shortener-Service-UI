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

import { TopFiveBarChartProps } from "@/app/types/metrics";

export default function TopFiveBarChart({ data }: TopFiveBarChartProps) {
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
          barCategoryGap="10%"
          barGap={2}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hits" fill="#E76F51" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
