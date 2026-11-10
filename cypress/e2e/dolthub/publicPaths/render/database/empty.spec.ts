import { databaseTypeConfigs } from "@sharedTests/databaseTypes";
import { testGetStartedForEngine } from "@sharedTests/emptyRepo";
import {
  testMobileRepoHeaderNav,
  testRepoHeaderForAll,
} from "@sharedTests/repoHeaderNav";
import {
  testQueryCatalogSection,
  testSchemaSection,
  testTablesSection,
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

const currentRepo = "empty_repo";
const loggedIn = false;
const hasDocs = false;
const hasBranch = false;

databaseTypeConfigs.forEach(({ label, currentOwner, isDoltgres }) => {
  const pageName = `${label} page with no branch and no data`;
  const currentPage = `repositories/${currentOwner}/${currentRepo}`;

  describe(`${pageName} renders expected components on different devices`, () => {
    const beVisible = newShouldArgs("be.visible");
    const notExist = newShouldArgs("not.exist");

    const tests = [
      ...testRepoHeaderForAll(
        currentRepo,
        currentOwner,
        loggedIn,
        hasDocs,
        "database",
        isDoltgres,
      ),
      newExpectation(
        "should have disabled Fork button",
        "[data-cy=repo-fork-button]",
        newShouldArgs("be.disabled"),
      ),
      newExpectation(
        "should have Get Started section",
        "[data-cy=repo-empty-get-started]",
        beVisible,
      ),
      newExpectation(
        "should not have Push a commit section",
        "[data-cy=repo-empty-push-a-commit]",
        notExist,
      ),
      newExpectation(
        "should have sql query section",
        "[data-cy=sql-query-create-table]",
        beVisible,
      ),
      newExpectation(
        "should have spreadsheet editor section",
        "[data-cy=file-upload-spreadsheet-table-link]",
        beVisible,
      ),
      newExpectation(
        "should have file upload section",
        "[data-cy=file-upload-fileupload-table-link]",
        beVisible,
      ),
      ...testGetStartedForEngine(isDoltgres),
      ...testTablesSection(hasDocs, loggedIn, 0),
      testViewsSection(hasBranch, 0),
      testQueryCatalogSection(hasBranch, 0),
      testSchemaSection(hasBranch, 0),
      testSqlConsole,
    ];

    const devices = [
      macbook15ForAppLayout(pageName, tests),
      iPad2ForAppLayout(pageName, tests),
      iPhoneXForAppLayout(
        pageName,
        testMobileRepoHeaderNav(currentOwner, currentRepo),
      ),
    ];
    runTestsForDevices({ currentPage, devices });
  });
});
