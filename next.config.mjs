/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        // pathname: '/my-bucket/**',
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        // pathname: '/my-bucket/**',
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        // pathname: '/my-bucket/**',
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
        // pathname: '/my-bucket/**',
      },
    ],
  },
};

export default nextConfig;
