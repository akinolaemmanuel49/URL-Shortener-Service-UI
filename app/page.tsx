import Image from "next/image";
import PlaceHolderImage from "../public/media/images/PlaceHolder.jpeg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row justify-between p-4">
        <div className="flex font-bold text-left py-4 md:py-0 text-cyan-600">
          URL Shortener
        </div>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="hover:text-cyan-600">Signout</div>
        </div>
      </div>
      {/* Hero Image should be here */}
      <div
        className="mt-2"
        style={{ width: "100%", height: "208px", position: "relative" }}
      >
        <Image
          src={PlaceHolderImage}
          placeholder="blur"
          alt="Hero Image"
          fill
        />
      </div>
      <div className="flex flex-col justify-between items-center mt-8 p-4">
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
          <div className="border-b-2 rounded-lg bg-black text-white hover:text-cyan-600 px-12 py-4 font-mono font-bold text-lg">
            Signin
          </div>
        </div>
        {/* Conditonal Ends Here */}
      </div>
    </main>
  );
}
