import { runTestsForDevices } from "../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";
import { mobileTests } from "../../../../utils/sharedTests/testRepoPageMobile";

const pageName = "Database page with tables and no docs";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_no_docs";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;
const hasDocs = false;
const hasBranch = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const desktopAndIpadTests = (isIpad = false) => [
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      isIpad,
    ),
    newExpectation(
      "should not find empty database",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    newExpectation(
      "should find database table data",
      "[data-cy=repo-data-table]",
      beVisible,
    ),
    newExpectation(
      "should not find doc markdown",
      "[data-cy=repo-doc-markdown]",
      notExist,
    ),
    newExpectation(
      "should display data columns",
      "[data-cy=repo-data-table-columns] > th",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    newExpectation(
      "should display database data row column values",
      "[data-cy=repo-data-table-row-0-col-1]",
      newShouldArgs("be.visible.and.contain", "b"),
    ),
    ...tableExpectations(hasDocs, hasBranch, loggedIn, 1, "test_table"),
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 1, "test_table"),
    testSqlConsole,
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests()),
    iPad2ForAppLayout(pageName, desktopAndIpadTests(true)),
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentRepo, currentPage, hasDocs, hasBranch),
      true,
    ),
  ];
  runTestsForDevices({ currentPage, devices });
});
