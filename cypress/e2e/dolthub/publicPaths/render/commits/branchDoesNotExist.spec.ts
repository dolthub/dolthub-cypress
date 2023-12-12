import { testRepoHeaderForAll } from "@sharedTests/repoHeaderNav";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Commit log page";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/commits/${currentBranch}`;

describe(`${pageName} with no branch renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...testRepoHeaderForAll(
      currentRepo,
      currentOwner,
      false,
      false,
      false,
      "commit-log",
    ),
    newExpectation(
      "should find page not found message",
      "[data-cy=404-page]",
      beVisible,
    ),
    newExpectation(
      "should not find commit list",
      "[data-cy=commit-log-commits-list]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
