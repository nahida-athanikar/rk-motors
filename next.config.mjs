/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false,
    serverActions: {
      bodySizeLimit: '10mb', // ✅ Increase limit to 10 MB
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pmduzvmhsylocdqrcxek.supabase.co"
      }
    ]
  },
  
   webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
