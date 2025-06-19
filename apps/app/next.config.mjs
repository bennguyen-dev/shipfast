/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  // Ensure Next.js looks for pages in the src directory
  distDir: ".next",
  // Enable React strict mode
  reactStrictMode: true,
};

export default nextConfig;
