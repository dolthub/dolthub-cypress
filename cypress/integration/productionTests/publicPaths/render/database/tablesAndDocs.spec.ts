import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { tableExpectations } from "../../../../utils/sharedTests/repoDatabaseNav";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";

const pageName = "Database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;
const hasDocs = true;

// TODO: Test commented out sections for left nav
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
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, hasDocs),
    // testAboutSection(true),
    ...tableExpectations(1, "test_table"),
    testSqlConsole,
    // testSchemasSection(1, "test_table"),
    // testViewsSection(0),
    // testQueryCatalogSection(0),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
