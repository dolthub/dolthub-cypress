import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Issue page with no issues";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}/issues`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, false, false),
    newExpectation(
      "should find empty issue message",
      "[data-cy=issue-no-issues]",
      beVisible,
    ),
    newExpectation(
      "should not have issue search input",
      "[data-cy=issue-search-input]",
      newShouldArgs("not.exist"),
    ),
    newExpectation(
      "should not find issues",
      "[data-cy=issue-table]",
      newShouldArgs("not.exist"),
    ),
    // ...testNewIssueButton(loggedIn),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
