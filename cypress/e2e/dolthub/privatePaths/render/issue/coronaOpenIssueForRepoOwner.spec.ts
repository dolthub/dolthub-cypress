import { testIssuePageForAll } from "@sharedTests/issuePage";
import { testLoggedInSignInTo } from "@sharedTests/signInTo";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Open issue page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentIssueId = "2";
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
  const loggedIn = true;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
