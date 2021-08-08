import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { tableExpectations } from "../../../../utils/sharedTests/repoDatabaseNav";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";

const pageName = "Repository page with docs and no tables";
const currentOwner = "automated_testing";
const currentRepo = "repo_docs_no_tables";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should not find empty repo",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    newExpectation(
      "should not find repo table data",
      "[data-cy=repo-data-table]",
      notExist,
    ),
    newExpectation(
      "should find doc markdown",
      "[data-cy=repo-doc-markdown]",
      beVisible,
    ),
    // testSqlConsole,
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn),
    // testAboutSection(true),
    ...tableExpectations(0),
    // testIndexesSection(0),
    // testViewsSection(0),
    // testQueryCatalogSection(0),
    // testCommitSection(3),
    // testReleasesSection(0),
    // testPullRequestsSection(0),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
