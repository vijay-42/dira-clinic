/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — nine mostly-static pages, no server to maintain.
  output: 'export',
  trailingSlash: true,
  images: {
    // Required for static export: no on-demand image optimisation server.
    unoptimized: true,
  },
  poweredByHeader: false,
}

export default nextConfig
