import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../../utils/helpers";

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
  const beVisible = newShouldArgs("be.visible");

  // const viewDeliveryClickFlow = newClickFlow(
  //   "[data-cy=view-attempt-button-68fc0528-c258-4c55-a79a-1709b79759ec]",
  //   [
  //     newExpectation(
  //       "should have delivery attempt details",
  //       "[data-cy=delivery-attempt-details]",
  //       beVisible,
  //     ),
  //     newExpectation(
  //       "should have request payload",
  //       "[data-cy=webhook-request-payload]",
  //       beVisible,
  //     ),
  //   ],
  // );

  // TODO: Investigate auth error for delivery attempts table
  // const attemptId = isProd
  //   ? "2a962909-6f88-41af-b613-12266e1f7b3a"
  //   : "68fc0528-c258-4c55-a79a-1709b79759ec";
  const deliveriesClickFlow = newClickFlow("[data-cy=webhook-deliveries-tab]", [
    // newExpectation(
    //   "should have delivery attempt table with one row",
    //   "[data-cy=delivery-attempt-table] tr",
    //   newShouldArgs("be.visible.and.have.length", 2),
    // ),
    // newExpectationWithClickFlows(
    //   "should have view button for attempt",
    //   `[data-cy=view-attempt-button-${attemptId}]`,
    //   beVisible,
    //   [viewDeliveryClickFlow],
    // ),
  ]);

  const tests = [
    newExpectation(
      "should render repo webhooks page",
      "[data-cy=repo-page-for-webhooks]",
      beVisible,
    ),
    newExpectation(
      "should show webhook header",
      "[data-cy=webhook-header]",
      newShouldArgs("be.visible.and.contain", ["Webhooks", "Manage Webhook"]),
    ),
    newExpectation(
      "should show webhook settings form",
      "[data-cy=webhook-settings-form]",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "should have deliveries tab",
      "[data-cy=webhook-deliveries-tab]",
      beVisible,
      [deliveriesClickFlow],
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
