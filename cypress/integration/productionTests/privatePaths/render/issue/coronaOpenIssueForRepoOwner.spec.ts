import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testIssuePageForAll } from "../../../../utils/sharedTests/issuePage";
import { testLoggedInSignInTo } from "../../../../utils/sharedTests/signInTo";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";
const pageName = "Open issue page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentIssueId = isProd ? "6" : "7";
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
      "should show edit description button for logged in user who is admin",
      "[data-cy=issue-page-edit-description-button]",
      beVisible,
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
      "should show issue Close button for logged in user who is admin",
      "[data-cy=issue-state-change-button]",
      newShouldArgs("be.visible.and.contain", "Close"),
    ),
    ...testIssuePageForAll(currentOwner, currentRepo, currentIssueId, "Open"),
    ...testLoggedInSignInTo,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, true)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
