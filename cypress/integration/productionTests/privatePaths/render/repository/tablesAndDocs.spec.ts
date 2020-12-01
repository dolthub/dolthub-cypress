import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import {
  testAboutSection,
  testCollaboratorsSection,
  testCommitSection,
  testIndexesSection,
  testPullRequestsSection,
  testQueryCatalogSection,
  testReleasesSection,
  testRepoHeaderWithBranch,
  testRepoSettings,
  testTablesSection,
  testViewsSection,
} from "../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";

const pageName = "Logged in repo page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notBeVisible = newShouldArgs("not.be.visible");

  const tests = [
    newExpectation(
      "should not find empty repo",
      "[data-cy=repo-data-table-empty]",
      notBeVisible,
    ),
    newExpectation(
      "should not find repo table data",
      "[data-cy=repo-data-table]",
      notBeVisible,
    ),
    newExpectation(
      "should find doc markdown",
      "[data-cy=repo-doc-markdown]",
      beVisible,
    ),
    newExpectation(
      "should not find table list",
      "[data-cy=repo-tables-table-list]",
      notBeVisible,
    ),
    newExpectation(
      "should have upload file button",
      "[data-cy=upload-file-button]",
      beVisible,
    ),
    testSqlConsole,
    ...testRepoHeaderWithBranch(currentRepo, currentOwner),
    testAboutSection,
    testTablesSection(1, "test_table"),
    testIndexesSection(1, "test_table"),
    testViewsSection(0),
    testQueryCatalogSection(0),
    testCommitSection(4),
    testReleasesSection(0),
    testPullRequestsSection(0),
    testCollaboratorsSection(1),
    testRepoSettings,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];

  runTestsForDevices({ currentPage, devices });
});
