import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";
import { testRepoHeaderForAll } from "../../../../../utils/sharedTests/repoHeaderNav";

const pageName = "Query catalog page with no branch";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/queries/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...testRepoHeaderForAll(currentRepo, currentOwner, false, false),
    newExpectation(
      "should find page not found message",
      "[data-cy=404-page]",
      beVisible,
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
