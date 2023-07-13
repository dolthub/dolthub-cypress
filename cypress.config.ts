import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  projectId: "f6ssqp",
  e2e: {
    baseUrl: "https://www.dolthub.com",
    specPattern: "cypress/e2e/dolthub/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
      });
      on("after:run",  (results) => {
        if (results) {
          // results will be undefined in interactive mode

          const adjustedTotal = results.totalTests - results.totalSkipped;
          console.log(
            results.totalPassed,
            'out of',
            results.totalTests,
            'passed'
          )

          console.log(
            results.totalFailed,
            'out of',
            adjustedTotal,
            'failed, which is',
            Math.floor(100 * (results.totalFailed/adjustedTotal)),
            ' percent'
          )
        }
      });
    },
  },
  viewportWidth: 1440,
  viewportHeight: 900,
});
