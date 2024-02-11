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
			{
        protocol:"https",
        hostname: "s4v7372ik6wn7j5n.public.blob.vercel-storage.com",
        port: "",
      },
			{
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        // pathname: '/my-bucket/**',
      },
    ],
  },
};

export default nextConfig;
