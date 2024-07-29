/** @type {import('next').NextConfig} */
import nextConfig from "./next.config.js";
import webpack from "./webpack.config.mjs";

nextConfig.webpack = webpack;

export default nextConfig;
