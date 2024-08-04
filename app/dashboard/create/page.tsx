"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Loading from "@/app/components/Loading";

function Create() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShortenedUrl(null);
    setError(null);

    try {
      const response = await fetch(`/api/shorten/?url=${originalUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const result = await response.json();
      setShortenedUrl(result.shortenedUrl);

      // Redirect to dashboard/manage page
      router.push("/dashboard/manage");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="text-lg font-bold mb-4">Dashboard | Create</div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="mb-2">Original URL:</span>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Shorten URL
        </button>
      </form>
      {shortenedUrl && (
        <div className="mt-4 p-2 bg-green-100 border border-green-200 rounded">
          Shortened URL:{" "}
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {shortenedUrl}
          </a>
        </div>
      )}
      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-200 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default withPageAuthRequired(Create, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
