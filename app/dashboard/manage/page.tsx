"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ErrorMessage from "@/app/components/ErrorMessage";
import Loading from "@/app/components/Loading";
import { UrlEntry } from "@/app/types/urlEntry";

function Manage() {
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3); // Default limit
  const [offset, setOffset] = useState<number>(0); // Default offset
  const [copyStatus, setCopyStatus] = useState<{
    [key: string]: { original: string; shortened: string };
  }>({});
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const router = useRouter(); // Router for navigation

  const fetchUrls = async (limit: number, offset: number) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `/api/shorten?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }

      const result = await response.json();
      setTotalCount(result.total);
      setUrls(result.urls);
      setError(null); // Clear any previous error
    } catch (error) {
      setError((error as Error).message);
      setUrls([]); // Clear URLs on error
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchUrls(limit, offset);
  }, [limit, offset]);

  const handleDelete = async (key: string) => {
    try {
      const response = await fetch(`/api/shorten/${key}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete URL");
      }

      // Remove the deleted URL from the state
      setUrls((prevUrls) =>
        prevUrls.filter((url) => url.shortened_url.split("/").pop() !== key)
      );
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleViewMetrics = (key: string) => {
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

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      setOffset((prevOffset) => prevOffset + limit);
    } else if (direction === "prev") {
      setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="text-lg font-bold mb-4">Dashboard | Manage</div>
      {loading && <Loading />} {/* Show loading component */}
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
                    {url.original_url}
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
                    handleCopy(
                      url.shortened_url,
                      url.shortened_url,
                      "shortened"
                    )
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
                  handleViewMetrics(
                    url.shortened_url.split("/").pop() as string
                  )
                }
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                View Metrics
              </button>
              <button
                onClick={() =>
                  handleDelete(url.shortened_url.split("/").pop() as string)
                }
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={offset === 0}
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <span className="text-sm">
          Showing {offset + 1} to {Math.min(offset + limit, totalCount)} of{" "}
          {totalCount} URLs
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={offset + limit >= totalCount}
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default withPageAuthRequired(Manage, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
