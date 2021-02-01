import { testSignInTo } from "cypress/integration/utils/sharedTests/signInTo";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Closed issue page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentIssueId = "8";
const currentPage = `repositories/${currentOwner}/${currentRepo}/issues/${currentIssueId}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should show title",
      "[data-cy=issue-page-title]",
      beVisible,
    ),
    newExpectation(
      "should show description",
      "[data-cy=issue-page-description]",
      beVisible,
    ),
    newExpectation(
      "should not show edit description button for logged out user",
      "[data-cy=issue-page-edit-description-button]",
      notExist,
    ),
    newExpectation(
      "should show closed state label",
      "[data-cy=issue-state-label]",
      newShouldArgs("be.visible.and.contain", "Closed"),
    ),
    newExpectation(
      "should show details section",
      "[data-cy=issue-page-details]",
      beVisible,
    ),
    newExpectation(
      "should not find 404 page",
      "[data-cy=issue-404-page]",
      notExist,
    ),
    ...testSignInTo("comment on issues"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
