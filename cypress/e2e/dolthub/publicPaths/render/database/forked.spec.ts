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
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const loggedIn = false;
const hasDocs = false;
const hasBranch = true;
const testTable = "IPv4ToCountry";

databaseTypeConfigs.forEach(({ label, currentOwner, isDoltgres }) => {
  const currentRepo = isDoltgres ? "ip-to-country-doltgres" : "ip-to-country";
  const pageName = `Forked ${label.toLowerCase()} page`;
  const currentPage = `repositories/${currentOwner}/${currentRepo}`;
  const tableName = getTableName(testTable, isDoltgres);

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
        newShouldArgs("be.visible.and.have.length", 8),
      ),
      ...testRepoHeaderWithBranch(
        currentRepo,
        currentOwner,
        loggedIn,
        hasDocs,
        "database",
        isDoltgres,
      ),
      newExpectation(
        "should find forked repo parent detail",
        "[data-cy=forked-parent-repo-detail]",
        beVisible,
      ),
      ...tableExpectations(hasDocs, loggedIn, 2, tableName),
      testViewsSection(hasBranch, 0),
      testQueryCatalogSection(hasBranch, 0),
      testSchemaSection(
        hasBranch,
        2,
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
    const skip = false;
    runTestsForDevices({ currentPage, devices, skip });
  });
});
