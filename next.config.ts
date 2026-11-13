import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The university emblem is requested at quality 90 to keep its thin lines
    // from smearing; Next 16 only serves qualities listed here.
    qualities: [75, 90],
  },
};

export default nextConfig;
