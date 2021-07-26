import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { tableExpectations } from "../../../../utils/sharedTests/repoDatabaseNav";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";

const pageName = "Forked repository page";
const currentOwner = "automated_testing";
const currentRepo = "ip-to-country";
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
      "should find repo table data",
      "[data-cy=repo-data-table]",
      beVisible,
    ),
    newExpectation(
      "should not find doc markdown",
      "[data-cy=repo-doc-markdown]",
      notExist,
    ),
    newExpectation(
      "should display repo data columns",
      "[data-cy=repo-data-table-columns] > th",
      newShouldArgs("be.visible.and.have.length", 7),
    ),
    testSqlConsole,
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn),
    newExpectation(
      "should find forked repo parent detail",
      "[data-cy=forked-parent-repo-detail]",
      beVisible,
    ),
    // testAboutSection(false),
    ...tableExpectations(2, "IPv6ToCountry"),
    // ...testPaginationForRepoDataTable,
    // testIndexesSection(2, "IPv4ToCountry"),
    // testViewsSection(0),
    // testQueryCatalogSection(0),
    // testCommitSection(5),
    // testPullRequestsSection(0),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
