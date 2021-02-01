import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Webhooks page with webhook";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
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
      "should have webhooks list with one webhook",
      "[data-cy=webhooks-list] li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];

  runTestsForDevices({ currentPage, devices });
});
