import { testIssuePageForAll } from "cypress/integration/utils/sharedTests/issuePage";
import { testLoggedOutSignInTo } from "cypress/integration/utils/sharedTests/signInTo";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";
const pageName = "Open issue page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentIssueId = isProd ? "6" : "7";
const currentPage = `repositories/${currentOwner}/${currentRepo}/issues/${currentIssueId}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should not find 404 page",
      "[data-cy=issue-404-page]",
      notExist,
    ),
    newExpectation(
      "should not show edit description button for logged out user",
      "[data-cy=issue-page-edit-description-button]",
      notExist,
    ),
    newExpectation(
      "should not show issue comment form for logged out user",
      "[data-cy=issue-comment-form]",
      notExist,
    ),
    ...testIssuePageForAll(currentOwner, currentRepo, currentIssueId, "Open"),
    ...testLoggedOutSignInTo("comment on issues"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
