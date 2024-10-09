import {
  haveLength,
  shouldBeVisible,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { testOldFormatPopup } from "@utils/sharedTests/repoHeaderNav";

const pageName = "Webhooks page with webhook";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/webhooks`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    testOldFormatPopup,
    shouldFindAndContain("active-tab-webhooks-settings", "Webhooks"),
    shouldBeVisible("repo-page-for-webhooks"),
    shouldFindAndContain("webhooks-header", "Webhooks"),
    shouldBeVisible("create-webhook-form"),
    newExpectation(
      "should have webhooks list with one webhook",
      "[data-cy=webhooks-list] li",
      haveLength(1),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
