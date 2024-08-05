"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function Header() {
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
    <header className="flex flex-col md:flex-row bg-white dark:bg-gray-800 justify-between p-4">
      <div className="flex h-8 font-bold text-left py-4 md:py-0 text-black dark:text-white hover:text-cyan-300">
        URL Shortener
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        {isAuthenticated && (
          <div className="text-gray-800 dark:text-white hover:text-cyan-300">
            <a href="/api/auth/logout">Logout</a>
          </div>
        )}
      </div>
    </header>
  );
}
