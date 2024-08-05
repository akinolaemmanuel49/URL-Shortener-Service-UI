"use client";

import Image from "next/image";

import PlaceHolderImage from "@/public/media/images/PlaceHolder.jpeg";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { user, error, isLoading } = useUser();

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

          {/* Conditional rendering based on authentication */}
          <div className="flex flex-col gap-4 mt-4">
            {!isAuthenticated ? (
              <>
                <p className="text-center">
                  Login to begin shortening your URLs.
                </p>
                <div className="border-b-2 rounded-lg bg-gray-800 text-white text-center hover:text-cyan-600 px-12 py-4 font-mono font-bold text-lg w-80">
                  <a href="/api/auth/login">Login</a>
                </div>
              </>
            ) : (
              <>
                <p className="text-center">
                  Hello <span className="font-bold">{user?.nickname}</span>{" "}
                  begin shortening your URLs.
                </p>
                <div className="border-b-2 rounded-lg bg-gray-800 text-white text-center hover:text-cyan-600 px-12 py-4 font-mono font-bold text-lg w-65">
                  <a href="/dashboard">Go to Dashboard</a>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
