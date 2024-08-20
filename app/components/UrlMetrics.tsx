"use client";

import React from "react";

import { UrlMetricsProps } from "@/app/types/metrics";

export default function UrlMetrics({ metrics, url, metricsKey }: UrlMetricsProps) {
  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-bold">Metrics {metricsKey ? `| ${metricsKey}` : ""}</h2>
      {url && (
        <div>
          Original URL:{" "}
          <a
            href={url} // Correct URL rendering
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {url}
          </a>
        </div>
      )}
      <div>Total Hits: {metrics?.total_hits}</div>
      <div>Unique IPs: {metrics?.unique_ips}</div>
      <div>
        Average Resolution Time: {metrics?.avg_resolution_time.toFixed(2)} ms
      </div>
    </div>
  );
}
