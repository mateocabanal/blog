/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://mateocabanal.ca",
  generateRobotsTxt: true, // (optional)
  // ...other options
  additionalPaths: async (config) => [
    await config.transform(config, "/post/tiny_binaries"),
    await config.transform(config, "/post/tinyhttp"),
  ],
};
