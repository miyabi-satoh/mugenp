import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./src/tests",
  use: {
    baseURL: "http://localhost:3001",
  },
  projects: [
    {
      name: 'Microsoft Edge',
      use: {
        // Supported Microsoft Edge channels are: msedge, msedge-beta, msedge-dev, msedge-canary
        channel: 'msedge',
      },
    },
  ],
};

export default config;