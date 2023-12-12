import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pull requests page with no pulls";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      false,
      false,
      false,
      "pull-requests",
    ),
    // newExpectation(
    //   "should find create pull button",
    //   "[data-cy=new-pull-button]",
    //   beVisible,
    // ),
    newExpectation(
      "should not have pull search input",
      "[data-cy=pull-search-input]",
      newShouldArgs("not.exist"),
    ),
    newExpectation(
      "should find empty pull message",
      "[data-cy=pull-requests-no-pulls]",
      beVisible,
    ),
    newExpectation(
      "should not find pulls",
      "[data-cy=pull-requests-table]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
