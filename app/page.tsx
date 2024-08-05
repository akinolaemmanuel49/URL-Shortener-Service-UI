"use client";

import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

import PlaceHolderImage from "@/public/media/images/PlaceHolder.jpeg";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <div>
      <main className="flex flex-col">
        {/* Hero Image */}
        <div style={{ width: "100%", height: "208px", position: "relative" }}>
          <Image
            src={PlaceHolderImage}
            placeholder="blur"
            alt="Hero Image"
            fill
          />
        </div>
        <div className="flex flex-col justify-between items-center p-4">
          <p className="text-center">
            Welcome to the{" "}
            <span className="font-bold font-mono text-lg text-cyan-600">
              URLShortener
            </span>{" "}
            Project Landing page
          </p>
          <p>Begin shortening your URLs.</p>
          {/* Conditional rendering based on authentication */}
          <div className="flex flex-col gap-4 mt-4">
            {!isAuthenticated ? (
              <div className="border-b-2 rounded-lg bg-gray-800 text-white hover:text-cyan-600 px-12 py-4 font-mono font-bold text-lg">
                <a href="/api/auth/login">Login</a>
              </div>
            ) : (
              <div className="border-b-2 rounded-lg bg-gray-800 text-white hover:text-cyan-600 px-12 py-4 font-mono font-bold text-lg">
                <a href="/dashboard">Go to Dashboard</a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
