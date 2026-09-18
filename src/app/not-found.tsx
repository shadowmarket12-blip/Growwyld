import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Growwyld",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12">
      {/* Main content */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* SVG Image Container */}
        <div className="w-full flex justify-center mb-8">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img
              src="/developing feature.svg"
              alt="404 Not Found"
              className="w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] lg:w-[68rem] lg:h-[55rem] object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
