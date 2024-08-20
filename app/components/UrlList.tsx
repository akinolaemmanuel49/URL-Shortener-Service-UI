"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UrlListProps } from "@/app/types/urlEntry";

export default function UrlList({ urls }: UrlListProps) {
  const router = useRouter();

  const handleViewMetrics = (key?: string) => {
    router.push(`/dashboard/metrics/${key}`);
  };

  return (
    <ul className="flex flex-col space-y-4">
      {urls.map((url) => (
        <li
          key={url.shortened_url}
          className="flex flex-col p-2 border border-gray-300 rounded"
        >
          <div className="mb-2">
            <div className="text-sm">
              Original URL:{" "}
              <a
                href={url.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {url.original_url.length > 30
                  ? `${url.original_url.slice(0, 30)}...`
                  : url.original_url}
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(url.original_url)}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
            <div className="text-sm">
              Shortened URL:{" "}
              <a
                href={url.shortened_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {url.shortened_url}
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(url.shortened_url)}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={() =>
              handleViewMetrics(url.shortened_url.split("/").pop())
            }
          >
            View Metrics
          </button>
        </li>
      ))}
    </ul>
  );
}
