import { runTestsForDevices } from "../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../../utils/helpers";
import {
  testMobileRepoHeaderNav,
  testRepoHeaderWithBranch,
} from "../../../../utils/sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";

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
      "[data-cy=desktop-repo-data-table]",
      beVisible,
    ),
    newExpectation(
      "should not find doc markdown",
      "[data-cy=repo-doc-markdown]",
      notExist,
    ),
    newExpectation(
      "should display data columns",
      "[data-cy=desktop-repo-data-table-columns] > th",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    newExpectation(
      "should display database data row column values",
      "[data-cy=desktop-repo-data-table-row-0-col-1]",
      newShouldArgs("be.visible.and.contain", "b"),
    ),
    newExpectationWithScrollIntoView(
      "should have Option dropdown",
      "[data-cy=options-button]",
      beVisible,
      true,
    ),
    newExpectationWithClickFlows(
      "Option dropdown should have appropriate links",
      "[data-cy=options-button]",
      beVisible,
      [
        newClickFlow("[data-cy=options-button]", [
          newExpectation(
            "should have toggle whitespace button",
            "[data-cy=toggle-whitespace-button]",
            beVisible,
          ),
          newExpectation(
            "should have download query result as csv button",
            "[data-cy=open-download-csv-modal-button]",
            beVisible,
          ),
          newExpectation(
            "should have download table as csv button",
            "[data-cy=download-table-as-csv]",
            beVisible,
          ),
        ]),
      ],
    ),
    ...tableExpectations(hasDocs, loggedIn, 1, "test_table"),
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 1, "test_table"),
    testSqlConsole,
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests()),
    iPad2ForAppLayout(pageName, desktopAndIpadTests(true), true),
    iPhoneXForAppLayout(
      pageName,
      testMobileRepoHeaderNav(currentOwner, currentRepo),
      true,
    ),
  ];
  runTestsForDevices({ currentPage, devices });
});
