import { tableExpectations } from "cypress/integration/utils/sharedTests/repoDatabaseNav";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";

const pageName = "Logged in database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;
const hasDocs = false;
const hasBranch = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should not find empty database",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    newExpectation(
      "should not find database table data",
      "[data-cy=repo-data-table]",
      notExist,
    ),
    newExpectation(
      "should find doc markdown",
      "[data-cy=repo-doc-markdown]",
      beVisible,
    ),
    // newExpectation(
    //   "should have upload file button",
    //   "[data-cy=upload-file-button]",
    //   beVisible,
    // ),
    // testSqlConsole,
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, hasDocs),
    // testAboutSection(true),
    ...tableExpectations(hasBranch, 1, "test_table"),
    // testIndexesSection(1, "test_table"),
    // testViewsSection(0),
    // testQueryCatalogSection(0),
    // testCommitSection(4),
    // testReleasesSection(0),
    // testPullRequestsSection(0),
    // testCollaboratorsSection(1),
    // testRepoSettings,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
