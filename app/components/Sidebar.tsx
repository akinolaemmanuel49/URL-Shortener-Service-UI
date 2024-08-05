"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  return (
    <aside
      className={clsx(
        // "bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300",
        "bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300",
        {
          "w-64": isExpanded,
          "w-16": !isExpanded,
        }
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ height: "90vh" }}
    >
      <nav className="p-4">
        <ul className="flex flex-col items-center">
          {isExpanded ? (
            <>
              <li className="w-full mb-4">
                <Link
                  href="/dashboard"
                  className="text-gray-800 dark:text-gray-200 hover:text-cyan-300 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li className="w-full mb-4">
                <Link
                  href="/dashboard/create"
                  className="text-gray-800 dark:text-gray-200 hover:text-cyan-300 transition-colors"
                >
                  Create
                </Link>
              </li>
              <li className="w-full mb-4">
                <Link
                  href="/dashboard/manage"
                  className="text-gray-800 dark:text-gray-200 hover:text-cyan-300 transition-colors"
                >
                  Manage
                </Link>
              </li>
            </>
          ) : (
            <li className="flex justify-center items-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
