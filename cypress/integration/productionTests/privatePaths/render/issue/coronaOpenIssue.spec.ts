import { testIssuePageForAll } from "cypress/integration/utils/sharedTests/issuePage";
import { testLoggedOutSignInTo } from "cypress/integration/utils/sharedTests/signInTo";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";
const pageName = "Closed issue page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentIssueId = isProd ? "6" : "8";
const currentPage = `repositories/${currentOwner}/${currentRepo}/issues/${currentIssueId}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const notExist = newShouldArgs("not.exist");
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should not find 404 page",
      "[data-cy=issue-404-page]",
      notExist,
    ),
    newExpectation(
      "should not show edit description button for logged in user who is not author or admin",
      "[data-cy=issue-page-edit-description-button]",
      notExist,
    ),
    newExpectation(
      "should show issue comment form for logged in user",
      "[data-cy=issue-comment-form]",
      beVisible,
    ),
    newExpectation(
      "should show issue comment button for logged in user",
      "[data-cy=issue-page-comment-button]",
      beVisible,
    ),
    newExpectation(
      "should not show issue Re-open/Close button for logged in user who is not author or admin",
      "[data-cy=issue-state-change-button]",
      notExist,
    ),
    ...testIssuePageForAll(currentOwner, currentRepo, currentIssueId, "Open"),
    ...testLoggedOutSignInTo,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
