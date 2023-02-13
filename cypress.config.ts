import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  projectId: "f6ssqp",
  e2e: {
    baseUrl: "https://www.dolthub.com",
    specPattern: "cypress/e2e/dolthub/**/*.{js,jsx,ts,tsx}",
    experimentalSessionAndOrigin: true,
  },
  viewportWidth: 1440,
  viewportHeight: 900,
});
