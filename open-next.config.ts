import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Cloudflare Workers Builds often runs `npm run build`, then `wrangler deploy`.
// OpenNext defaults to calling `npm run build` itself, so point it at `build:next`
// to avoid recursion while still producing the `.open-next` worker bundle.
export default {
  ...defineCloudflareConfig(),
  buildCommand: "npm run build:next",
};
