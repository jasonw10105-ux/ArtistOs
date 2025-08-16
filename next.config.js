/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['YOUR_SUPABASE_BUCKET_URL'] }
}

module.exports = nextConfig