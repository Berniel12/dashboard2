/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your other config
  webpack: (config, { isServer }) => {
    // Ignore punycode warning
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];
    return config;
  },
}

module.exports = nextConfig 