const withTM = require("next-transpile-modules")(["ui", "logger"]);

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTM({
  reactStrictMode: true,
  basePath: process.env.STOREFRONT_BASE_PATH || "",
});
