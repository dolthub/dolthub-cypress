import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Webhooks page with no webhooks";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const currentPage = `repositories/${currentOwner}/${currentRepo}/webhooks`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
    newExpectation(
      "should have table layout",
      "[data-cy=table-layout-container]",
      beVisible,
    ),
    newExpectation(
      "should render repo webhooks page",
      "[data-cy=repo-page-for-webhooks]",
      beVisible,
    ),
    newExpectation(
      "should show webhooks header",
      "[data-cy=webhooks-header]",
      newShouldArgs("be.visible.and.contain", "Webhooks"),
    ),
    newExpectation(
      "should show webhook form",
      "[data-cy=create-webhook-form]",
      beVisible,
    ),
    newExpectation(
      "should not have visible webhooks list",
      "[data-cy=webhooks-list]",
      newShouldArgs("not.be.visible"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];

  runTestsForDevices({ currentPage, devices });
});
