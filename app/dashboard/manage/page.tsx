"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Loading from "@/app/components/Loading";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

interface UrlEntry {
  original_url: string;
  shortened_url: string;
}

function Manage() {
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch("/api/shorten", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch URLs");
        }

        const result: UrlEntry[] = await response.json();
        setUrls(result);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchUrls();
  }, []);

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
              <div>Original URL: {url.original_url}</div>
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
    </div>
  );
}

export default withPageAuthRequired(Manage, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
