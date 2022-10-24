import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "../../../../utils/helpers";
import {
  beVisible,
  haveLength,
  shouldBeVisible,
  shouldFindAndContain,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Webhook page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";
const currentWebhook = isProd
  ? "dc6682d3-f0df-4549-87a4-46874ac95ff2"
  : "d4c4580c-1805-4e73-9e26-ae847789c0ed";
const currentPage = `repositories/${currentOwner}/${currentRepo}/webhooks/${currentWebhook}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const attemptId = isProd
    ? "2a962909-6f88-41af-b613-12266e1f7b3a"
    : "68fc0528-c258-4c55-a79a-1709b79759ec";

  const viewDeliveryClickFlow = newClickFlow(
    `[data-cy=view-attempt-button-${attemptId}]`,
    [
      shouldBeVisible("webhook-attempt-breadcrumbs"),
      shouldBeVisible("delivery-attempt-details"),
      shouldBeVisible("webhook-request-payload"),
      shouldBeVisible("back-to-webhook-link"),
    ],
  );

  const tests = [
    shouldFindAndContain("active-webhooks-settings-tab", "Webhooks"),
    shouldBeVisible("repo-page-for-webhooks"),
    shouldFindAndContain("webhook-header", ["Webhooks", "Manage Webhook"]),
    shouldBeVisible("webhook-breadcrumbs"),
    shouldBeVisible("back-to-webhooks-link"),
    shouldBeVisible("webhook-settings-form"),
    shouldBeVisible("delivery-attempt-table"),
    newExpectation(
      "should have delivery attempt table with one row",
      "[data-cy=delivery-attempt-table] tbody tr",
      haveLength(1),
    ),
    newExpectationWithClickFlows(
      "should have view button for attempt",
      `[data-cy=view-attempt-button-${attemptId}]`,
      beVisible,
      [viewDeliveryClickFlow],
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
