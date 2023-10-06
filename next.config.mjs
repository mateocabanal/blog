import million from 'million/compiler';

/** @type {import('next').NextConfig} */
//const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]); // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
};

//module.exports = withTM({});

export default million.next(nextConfig);
