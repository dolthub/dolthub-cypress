import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
  scrollToPosition,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Webhook page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";
const currentWebhook = isProd
  ? "5ebe3b54-3528-4e2e-bce4-03bb90a3a27e"
  : "8f3fc106-ec72-44ba-8d5d-c7d9c0f2fdbd";
const currentPage = `repositories/${currentOwner}/${currentRepo}/webhooks/${currentWebhook}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const attemptId = isProd
    ? "99b71670-c248-4248-9493-6659ab1292e3"
    : "7186a042-c39c-41d2-9798-2b917e4b75d4";

  const tests = [
    shouldFindAndContain("active-tab-webhooks-settings", "Webhooks"),
    shouldBeVisible("repo-page-for-webhooks"),
    shouldFindAndContain("webhook-header", "Webhooks"),
    shouldBeVisible("webhook-breadcrumbs"),
    scrollToPosition("#main-content", "bottom"),
    shouldBeVisible("back-to-webhooks-link"),
    shouldBeVisible("webhook-settings-form"),
    shouldBeVisible("delivery-attempt-table"),
    newExpectation(
      "should have delivery attempt table with one row",
      "[data-cy=delivery-attempt-table] tbody tr",
      newShouldArgs("be.visible.and.have.length.of.at.least", 1),
    ),
    newExpectationWithClickFlow(
      "should have view button for attempt",
      `[data-cy=view-attempt-button-${attemptId}]`,
      beVisible,
      newClickFlow(`[data-cy=view-attempt-button-${attemptId}]`, []),
    ),
    shouldBeVisible("webhook-attempt-breadcrumbs"),
    shouldBeVisible("delivery-attempt-details"),
    shouldBeVisible("webhook-request-payload"),
    scrollToPosition("#main-content", "bottom"),
    shouldBeVisible("back-to-webhook-link"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
