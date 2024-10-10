import { testIssuePageForAll } from "@sharedTests/issuePage";
import { testLoggedInSignInTo } from "@sharedTests/signInTo";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Closed issue page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentIssueId = "4";
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
      "should not show edit description button for logged in user who is admin for closed issue",
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
      "should show issue Re-open button for logged in user who is admin",
      "[data-cy=issue-state-change-button]",
      newShouldArgs("be.visible.and.contain", "Re-open"),
    ),
    ...testIssuePageForAll(currentOwner, currentRepo, currentIssueId, "Closed"),
    ...testLoggedInSignInTo,
  ];
  const loggedIn = true;

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];

  const skip = true;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
