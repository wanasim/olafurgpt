const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: (config, { isServer, dev }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

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

    return config;
  },
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./cache/**/*"],
    },
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },
};
