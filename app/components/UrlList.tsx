"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UrlListProps } from "@/app/types/urlEntry";

export default function UrlList({ urls }: UrlListProps) {
  const router = useRouter();
  const [copyStatus, setCopyStatus] = useState<{
    [key: string]: { original: string; shortened: string };
  }>({});

  const handleViewMetrics = (key?: string) => {
    router.push(`/dashboard/metrics/${key}`);
  };

  const handleCopy = (
    text: string,
    key: string,
    type: "original" | "shortened"
  ) => {
    navigator.clipboard.writeText(text);
    setCopyStatus((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: "Copied!",
      },
    }));
    setTimeout(() => {
      setCopyStatus((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [type]: "",
        },
      }));
    }, 2000); // Reset text after 2 seconds
  };

  return (
    <ul className="flex flex-col space-y-4">
      {urls.map((url) => (
        <li
          key={url.shortened_url}
          className="flex flex-col p-2 border border-gray-300 rounded"
        >
          <div className="flex flex-col space-y-2">
            <div className="text-sm flex items-center justify-between">
              <div>
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
              </div>
              <button
                onClick={() =>
                  handleCopy(url.original_url, url.shortened_url, "original")
                }
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                {copyStatus[url.shortened_url]?.original || "Copy"}
              </button>
            </div>
            <div className="text-sm flex items-center justify-between">
              <div>
                Shortened URL:{" "}
                <a
                  href={url.shortened_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {url.shortened_url}
                </a>
              </div>
              <button
                onClick={() =>
                  handleCopy(url.shortened_url, url.shortened_url, "shortened")
                }
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                {copyStatus[url.shortened_url]?.shortened || "Copy"}
              </button>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <button
              onClick={() =>
                handleViewMetrics(url.shortened_url.split("/").pop() as string)
              }
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              View Metrics
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
