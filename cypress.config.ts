import { defineConfig } from "cypress";
import  { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

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
          const alertOnFailure = !!process.env.ALERT_ON_FAILURE;

          if (alertOnFailure) {
            const adjustedTotal = results.totalTests - results.totalSkipped;
            const percentFailed = Math.floor(100 * (results.totalFailed/adjustedTotal));

            if (percentFailed >= 0) {
              const region = process.env.AWS_REGION;
              const topicArn = process.env.SNS_TOPIC_ARN;

              const params = {
                Message: "dolthub_degraded_cypress_1",
                TopicArn: topicArn,
              };

              const snsClient = new SNSClient({ region: region });
              const run = async () => {
                try {
                  const data = await snsClient.send(new PublishCommand(params));
                  console.log("Successfully alarmed by sending SNS message.",  data);
                  return data; // For unit tests.
                } catch (err) {
                  console.log("Error", err.stack);
                }
              };
              run();
            }

          }
        }
      });
    },
  },
  viewportWidth: 1440,
  viewportHeight: 900,
});
