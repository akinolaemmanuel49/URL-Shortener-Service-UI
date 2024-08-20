"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

import ErrorMessage from "@/app/components/ErrorMessage";
import Loading from "@/app/components/Loading";
import { UrlEntry } from "@/app/types/urlEntry";

function Manage() {
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(4); // Default limit
  const [offset, setOffset] = useState<number>(0); // Default offset

  const fetchUrls = async (limit: number, offset: number) => {
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
    } catch (error) {
      setError((error as Error).message);
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
      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-200 rounded">
          Error: {error}
        </div>
      )}
      <ul className="flex flex-col space-y-4">
        {urls.map((url) => (
          <li
            key={url.shortened_url}
            className="flex justify-between items-center p-2 border border-gray-300 rounded"
          >
            <div>
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
            <button
              onClick={() =>
                handleDelete(url.shortened_url.split("/").pop() as string)
              }
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
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
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
