/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/**',
      },
      // اگر تصاویر از دامنه‌های دیگر هم می‌آیند، اینجا اضافه کنید
    ],
    domains: ["upload.wikimedia.org"],
  },
};

export default nextConfig;
