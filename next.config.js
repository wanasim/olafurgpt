const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer, dev }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    if (isServer && dev) {
      config.devtool = "source-map";
      // config.plugins.push(
      //   new CopyPlugin({
      //     patterns: [
      //       {
      //         from: "./node_modules/tiktoken/lite/tiktoken_bg.wasm",
      //         to: "tiktoken_bg.wasm",
      //         toType: "file",
      //       },
      //     ],
      //   }),
      // );
    }

    return config;
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/**/*.wasm"],
      "/*": ["./cache/**/*"],
    },
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },
};
