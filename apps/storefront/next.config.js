const path = require("path");
const withTM = require("next-transpile-modules")(["ui", "logger"]);

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
});
