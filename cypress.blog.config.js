import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  projectId: "f6ssqp",

  e2e: {
    baseUrl: "https://www.dolthub.com",
    specPattern: "cypress/e2e/blog/**/*.{js,jsx,ts,tsx}",
    allowCypressEnv: false,
    setupNodeEvents(on) {
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
      });
    },
  },

  viewportWidth: 1440,
  viewportHeight: 900,
});
