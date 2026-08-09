import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// OpenNext defaults to calling the package manager's `build` script, which would
// recurse back into this config. Invoking Next directly avoids that and keeps the
// command package-manager agnostic.
export default {
  ...defineCloudflareConfig(),
  buildCommand: "next build",
};
