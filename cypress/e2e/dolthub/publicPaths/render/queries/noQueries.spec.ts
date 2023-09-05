import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Query catalog page with no pulls";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/queries/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, false, false, true),
    newExpectation(
      "should find empty queries message with link",
      "[data-cy=repo-no-queries] > a",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should not find queries",
      "[data-cy=query-catalog-table]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
