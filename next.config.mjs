/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Loaded from node_modules at runtime instead of bundled: this version of
    // Next's webpack can't parse the undici code @vercel/blob depends on.
    serverComponentsExternalPackages: ['@vercel/blob'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
}

export default nextConfig
