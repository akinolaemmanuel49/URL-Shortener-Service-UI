"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Loading from "@/app/components/Loading";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import TopFiveBarChart from "@/app/components/TopFiveBarChart";

interface UrlEntry {
  original_url: string;
  shortened_url: string;
}

function Dashboard() {
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [topHits, setTopHits] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);

  const fetchLatestUrls = async () => {
    try {
      const response = await fetch(`/api/shorten?limit=4&offset=0`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }

      const result = await response.json();
      setUrls(result.urls);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const fetchTopHits = async () => {
    try {
      const response = await fetch(`/api/metrics/top`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch top hits");
      }

      const result = await response.json();
      setTopHits(result);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchLatestUrls();
    fetchTopHits();
  }, []);

  return (
    <div className="flex flex-col p-4">
      {/* Render the bar chart */}
      <div className="mt-8">
        <TopFiveBarChart data={topHits} />
      </div>
      <div className="font-mono font-extrabold text-xl mb-4">Dashboard</div>
      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-200 rounded">
          Error: {error}
        </div>
      )}
      <ul className="flex flex-col space-y-4">
        {urls.map((url) => (
          <li
            key={url.shortened_url}
            className="flex flex-col p-2 border border-gray-300 rounded"
          >
            <div className="mb-2">
              <div>
                Original URL:{" "}
                <a
                  href={url.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {url.original_url}
                </a>
              </div>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withPageAuthRequired(Dashboard, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
