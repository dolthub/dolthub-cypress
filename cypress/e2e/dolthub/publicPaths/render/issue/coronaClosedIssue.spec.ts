import { testIssuePageForAll } from "@sharedTests/issuePage";
import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { testLoggedOutSignInTo } from "@sharedTests/signInTo";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";
const pageName = "Closed issue page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentIssueId = isProd ? "9" : "8";
const currentPage = `repositories/${currentOwner}/${currentRepo}/issues/${currentIssueId}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should not find 404 page",
      "[data-cy=issue-404-page]",
      notExist,
    ),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, false, true,true),
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
    ...testIssuePageForAll(currentOwner, currentRepo, currentIssueId, "Closed"),
    ...testLoggedOutSignInTo("comment on issues"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
