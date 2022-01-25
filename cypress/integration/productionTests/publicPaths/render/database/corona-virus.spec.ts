import { allDevicesDiffTestsForSignedOut } from "cypress/integration/utils/devices";
import { testDesktopOnlyWarnings } from "cypress/integration/utils/sharedTests/testDesktopOnlyWarnings";
import { Tests } from "cypress/integration/utils/types";
import { runTestsForDevices } from "../../../../utils";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
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

const pageName = "Database page (corona-virus) with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;
const hasDocs = true;
const hasBranch = true;

const testView = "cases_by_age_range";
const testQuery = "mortality_rates";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const desktopTests: Tests = [
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
    ...tableExpectations(hasDocs, hasBranch, loggedIn, 11, "case_details"),
    testViewsSection(hasBranch, 15, testView),
    testQueryCatalogSection(hasBranch, 10, testQuery),
    testSchemaSection(hasBranch, 11, "case_details"),
    testSqlConsole,
  ];
  const isIpad = true;
  const ipadTests: Tests = [
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
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      isIpad,
    ),
    ...tableExpectations(hasDocs, hasBranch, loggedIn, 11, "case_details"),
    testViewsSection(hasBranch, 15, testView),
    testQueryCatalogSection(hasBranch, 10, testQuery),
    testSchemaSection(hasBranch, 11, "case_details"),
    testSqlConsole,
  ];
  const mobileTests: Tests = [
    ...testMobileRepoHeaderNav(currentOwner, currentRepo),
    ...testDesktopOnlyWarnings(currentPage, hasDocs),
  ];
  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    desktopTests,
    ipadTests,
    mobileTests,
  );
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
