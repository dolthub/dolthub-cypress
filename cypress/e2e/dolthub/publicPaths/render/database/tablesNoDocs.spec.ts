import {
  databaseTypeConfigs,
  getSchemaQuery,
  getTableName,
} from "@sharedTests/databaseTypes";
import {
  testMobileRepoHeaderNav,
  testRepoHeaderWithBranch,
} from "@sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "@sharedTests/repoLeftNav";
import { testSqlConsole } from "@sharedTests/sqlEditor";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { Tests } from "@utils/types";

const currentRepo = "repo_tables_no_docs";
const loggedIn = false;
const hasDocs = false;
const hasBranch = true;
const testTable = "test_table";

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");

// Doltgres databases do not support CSV downloads, but have schemas.
const engineSpecificTests = (isDoltgres: boolean): Tests => {
  const csvShould = isDoltgres ? notExist : beVisible;
  const csvPrefix = isDoltgres ? "should not have" : "should have";
  return [
    ...(isDoltgres
      ? [
          newExpectation(
            "should have schemas selector",
            "[data-cy=schemas-selector]",
            newShouldArgs("be.visible.and.contain", "public"),
          ),
          newExpectation(
            "should not have save query button",
            "[data-cy=save-query-button]",
            notExist,
          ),
        ]
      : []),
    newExpectationWithScrollIntoView(
      "should have Option dropdown",
      "[data-cy=options-button]",
      beVisible,
      true,
    ),
    newExpectationWithClickFlow(
      "Option dropdown should have appropriate links",
      "[data-cy=options-button]",
      beVisible,
      newClickFlow("[data-cy=options-button]", [
        newExpectation(
          `${csvPrefix} download query result as csv button`,
          "[data-cy=open-download-csv-modal-button]",
          csvShould,
        ),
        newExpectation(
          `${csvPrefix} download table as csv button`,
          "[data-cy=download-table-as-csv]",
          csvShould,
        ),
      ]),
    ),
  ];
};

databaseTypeConfigs.forEach(({ label, currentOwner, isDoltgres }) => {
  const pageName = `${label} page with tables and no docs`;
  const currentPage = `repositories/${currentOwner}/${currentRepo}`;
  const tableName = getTableName(testTable, isDoltgres);

  describe(`${pageName} renders expected components on different devices`, () => {
    const tests = [
      ...testRepoHeaderWithBranch(
        currentRepo,
        currentOwner,
        loggedIn,
        hasDocs,
        "database",
        isDoltgres,
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
      ...engineSpecificTests(isDoltgres),
      ...tableExpectations(hasDocs, loggedIn, 1, tableName),
      testViewsSection(hasBranch, 0),
      testQueryCatalogSection(hasBranch, 0),
      testSchemaSection(
        hasBranch,
        1,
        tableName,
        false,
        getSchemaQuery(testTable, isDoltgres),
      ),
      testSqlConsole,
    ];

    const devices = [
      macbook15ForAppLayout(pageName, tests),
      iPad2ForAppLayout(pageName, tests, true),
      iPhoneXForAppLayout(
        pageName,
        testMobileRepoHeaderNav(currentOwner, currentRepo),
        true,
      ),
    ];
    runTestsForDevices({ currentPage, devices });
  });
});
