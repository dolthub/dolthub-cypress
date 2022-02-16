import { runTestsForDevices } from "../../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../../utils/sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testClickDeleteRow,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "../../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../../utils/sharedTests/sqlEditor";
import { mobileTests } from "../../../../../utils/sharedTests/testRepoPageMobile";
import { Tests } from "../../../../../utils/types";

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

  const desktopAndIpadTests = (isIpad = false): Tests => [
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
    ...testClickDeleteRow(
      "error-modal",
      newShouldArgs("be.visible.and.contain", ["No authentication", "sign in"]),
    ),
    testViewsSection(hasBranch, 15, testView),
    testQueryCatalogSection(hasBranch, 10, testQuery),
    testSchemaSection(hasBranch, 11, "case_details"),
    testSqlConsole,
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests()),
    iPad2ForAppLayout(pageName, desktopAndIpadTests(true)),
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentRepo, currentPage, hasDocs, hasBranch),
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
