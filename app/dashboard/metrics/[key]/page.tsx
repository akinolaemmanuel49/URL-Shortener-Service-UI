"use client";

import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Loading from "@/app/components/Loading";
import { MetricsData } from "@/app/types/metrics";
import UrlMetrics from "@/app/components/UrlMetrics";
import { OriginalUrl } from "@/app/types/urlEntry";

function MetricsDetail({ params }: { params: { key: string } }) {
  const { key } = params;
  const [originalUrl, setOriginalUrl] = useState<OriginalUrl | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOriginalURL = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/shorten/${key}`);
        if (!response.ok) {
          throw new Error("Failed to retrieve original URL");
        }
        const data: OriginalUrl = await response.json();
        setOriginalUrl(data);
      } catch (error) {
        setError("An error occurred while retrieving the original URL");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMetricsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/metrics/performance/${key}`);
        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }
        const data: MetricsData = await response.json();
        if (data.avg_resolution_time === null) {
          setMetrics(null); // Handle case where no metrics are available
        } else {
          setMetrics(data);
        }
      } catch (error) {
        setError("An error occurred while fetching metrics data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOriginalURL();
    fetchMetricsData();
  }, [key]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (metrics === null) {
    return <div>No data available.</div>;
  }

  return (
    <div className="p-4">
      <UrlMetrics
        metrics={metrics}
        url={originalUrl?.original_url}
        metricsKey={key} // Passing key as metricsKey to avoid confusion with React's special key prop
      />
    </div>
  );
}

export default withPageAuthRequired(MetricsDetail, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
