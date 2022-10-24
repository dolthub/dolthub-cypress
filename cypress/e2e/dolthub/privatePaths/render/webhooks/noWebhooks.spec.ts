import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Webhooks page with no webhooks";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const currentPage = `repositories/${currentOwner}/${currentRepo}/webhooks`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldFindAndContain("active-webhooks-settings-tab", "Webhooks"),
    shouldBeVisible("repo-page-for-webhooks"),
    shouldFindAndContain("webhooks-header", "Webhooks"),
    shouldBeVisible("create-webhook-form"),
    shouldNotExist("webhooks-list"),
    shouldBeVisible("no-webhooks-message"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
