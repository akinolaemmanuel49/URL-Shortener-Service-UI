"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

import ErrorMessage from "@/app/components/ErrorMessage";
import Loading from "@/app/components/Loading";
import TopFiveBarChart from "@/app/components/TopFiveBarChart";
import { UrlEntry } from "@/app/types/urlEntry";
import UrlList from "@/app/components/UrlList";

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
      <div className="font-mono font-extrabold text-xl mb-4">Dashboard</div>
      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-200 rounded">
          Error: {error}
        </div>
      )}
      <div className="flex flex-wrap gap-4 mt-8">
        {/* Container for TopFiveBarChart and UrlList */}
        <div className="flex-1 min-w-[300px]">
          <TopFiveBarChart data={topHits} />
        </div>
        <div className="flex-1 min-w-[300px]">
          <h1 className="font-mono font-extrabold text-lg mb-4">Latest</h1>
          <UrlList urls={urls} />
        </div>
      </div>
    </div>
  );
}

export default withPageAuthRequired(Dashboard, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
