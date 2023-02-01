import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://doltlab.dolthub.com",
    specPattern: "cypress/e2e/doltlab/**/*.{js,jsx,ts,tsx}",
  },
  viewportWidth: 1440,
  viewportHeight: 900,
});
