import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  devIndicators: false,

  // Smaller, self-contained output, easier to run on Hostinger
  output: "standalone",

  // Less memory and time during build
  productionBrowserSourceMaps: false,
  compress: true,

  experimental: {
    webpackMemoryOptimizations: true,
    cpus: 1, // fewer parallel workers = less RAM
    // Your project has big libraries, so only bundle what you import
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "@react-three/drei",
      "three",
      "gsap",
    ],
  },

  // Uncomment ONLY if the build still fails on type errors.
  // Fix the errors later, then remove this.
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;