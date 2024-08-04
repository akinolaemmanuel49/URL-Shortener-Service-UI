import Image from "next/image";

import PlaceHolderImage from "../public/media/images/PlaceHolder.jpeg";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col">
        {/* Hero Image should be here */}
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
          {/* This should be conditional, should show Go to Dashboard if user is authenticated. */}
          {/* Conditonal Starts Here */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="border-b-2 rounded-lg bg-gray-800 text-white hover:text-cyan-600 px-12 py-4 font-mono font-bold text-lg">
              <a href="/api/auth/login">Login</a>
            </div>
          </div>
          {/* Conditonal Ends Here */}
        </div>
      </main>
    </div>
  );
}
