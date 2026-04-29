// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // Gzip automatique
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.aureliensebe.com',
      },
    ],
  },
  /* Redirects si tu changes l'URL d'un blog post
  async redirects() {
    return [
      {
        source: '/old-article',
        destination: '/blog/new-article',
        permanent: true, // 301 — pour le SEO
      },
    ]
  }, */
}

export default nextConfig