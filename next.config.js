/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import withPWAInit from "@ducanh2912/next-pwa";
import "./src/env.js";

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {import("next").NextConfig} */
const config = {
  basePath: "/docs",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA(config);
