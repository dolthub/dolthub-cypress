import {
  doltConfig,
  doltgresConfig,
  getSchemaQuery,
  getTableName,
  getViewQuery,
} from "@sharedTests/databaseTypes";
import {
  testMobileRepoHeaderNav,
  testRepoHeaderWithBranch,
} from "@sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testClickDeleteRow,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "@sharedTests/repoLeftNav";
import { shouldTypeString } from "@sharedTests/sharedFunctionsAndVariables";
import { testSqlConsole, testSqlConsoleMobile } from "@sharedTests/sqlEditor";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { Tests } from "@utils/types";

const loggedIn = false;
const hasDocs = true;
const hasBranch = true;

const testView = "cases_by_age_range";

// The Doltgres database has no saved queries and does not support saving
// queries, so the query catalog is empty.
const configs = [
  {
    ...doltConfig,
    currentRepo: "corona-virus",
    queriesLen: 10,
    testQuery: "mortality_rates",
  },
  {
    ...doltgresConfig,
    currentRepo: "corona-virus-doltgres",
    queriesLen: 0,
    testQuery: undefined,
  },
];

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");

// Doltgres databases have schemas, cannot save queries, and the Doltgres
// corona-virus database is a fork.
const doltgresOnlyTests: Tests = [
  newExpectation(
    "should find forked repo parent detail",
    "[data-cy=forked-parent-repo-detail]",
    beVisible,
  ),
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
];

configs.forEach(c => {
  const { currentOwner, currentRepo, isDoltgres, queriesLen, testQuery } = c;
  const pageName = `${c.label} page (${currentRepo}) with tables and docs`;
  const currentPage = `repositories/${currentOwner}/${currentRepo}`;
  const testTable = getTableName("case_details", isDoltgres);
  const viewQuery = getViewQuery(testView, isDoltgres);
  const schemaQuery = getSchemaQuery("case_details", isDoltgres);

  describe(`${pageName} renders expected components on different devices`, () => {
    const commonTests = [
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
    ];

    const tests: Tests = [
      ...commonTests,
      ...testRepoHeaderWithBranch(
        currentRepo,
        currentOwner,
        loggedIn,
        hasDocs,
        "about",
        isDoltgres,
      ),
      ...(isDoltgres ? doltgresOnlyTests : []),
      ...tableExpectations(hasDocs, loggedIn, 11, testTable),
      ...testClickDeleteRow(
        "error-modal",
        newShouldArgs("be.visible.and.contain", [
          "No authentication",
          "sign in",
        ]),
      ),
      testViewsSection(hasBranch, 15, testView, false, viewQuery),
      newExpectationWithClickFlow(
        "should show create view button",
        "[data-cy=create-view-button]",
        beVisible,
        newClickFlow(
          "[data-cy=create-view-button]",
          [shouldTypeString("query-name", "testQueryName")],
          "[data-cy=close-modal]",
        ),
      ),
      testQueryCatalogSection(hasBranch, queriesLen, testQuery),
      testSchemaSection(hasBranch, 11, testTable, false, schemaQuery),
      testSqlConsole,
    ];

    const mobileTests = [
      ...commonTests,
      ...testMobileRepoHeaderNav(currentOwner, currentRepo, "about"),
      ...tableExpectations(hasDocs, loggedIn, 11, testTable, true),
      testViewsSection(hasBranch, 15, testView, true, viewQuery),
      testQueryCatalogSection(hasBranch, queriesLen, testQuery, true),
      testSchemaSection(hasBranch, 11, testTable, true, schemaQuery),
      newExpectationWithClickFlow(
        "should click button to close repo nav",
        "[data-cy=close-table-nav-button]",
        beVisible,
        newClickFlow("[data-cy=close-table-nav-button]", [
          newExpectation(
            "mobile table nav should be closed",
            "[data-cy=close-table-nav-button]",
            notExist,
          ),
        ]),
      ),
      testSqlConsoleMobile,
    ];

    const devices = [
      macbook15ForAppLayout(pageName, tests),
      iPad2ForAppLayout(pageName, tests),
      iPhoneXForAppLayout(pageName, mobileTests),
    ];
    const skip = false;
    runTestsForDevices({ currentPage, devices, skip });
  });
});

// TODO: Implement saved queries for Doltgres databases, add the saved queries
// to corona-virus-doltgres, then unskip this test and replace the empty query
// catalog check above (queriesLen: 0) with these expectations.
describe(`${doltgresConfig.label} page (corona-virus-doltgres) query catalog renders saved queries`, () => {
  const currentPage = `repositories/${doltgresConfig.currentOwner}/corona-virus-doltgres`;
  const pageName = `${doltgresConfig.label} page (corona-virus-doltgres) saved queries`;
  const testQuery = "mortality_rates";

  const devices = [
    macbook15ForAppLayout(pageName, [
      testQueryCatalogSection(hasBranch, 10, testQuery),
    ]),
    iPhoneXForAppLayout(pageName, [
      testQueryCatalogSection(hasBranch, 10, testQuery, true),
    ]),
  ];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
