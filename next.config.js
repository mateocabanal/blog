/** @type {import('next').NextConfig} */
//const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]); // pass the modules you would like to see transpiled
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
//module.exports = withTM({});
module.exports = withBundleAnalyzer({});
