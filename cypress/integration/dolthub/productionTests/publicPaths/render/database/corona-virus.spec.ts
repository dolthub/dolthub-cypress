import { runTestsForDevices } from "../../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../../utils/helpers";
import {
  testMobileRepoHeaderNav,
  testRepoHeaderWithBranch,
} from "../../../../../utils/sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testClickDeleteRow,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "../../../../../utils/sharedTests/repoLeftNav";
import { typingExpectation } from "../../../../../utils/sharedTests/sharedFunctionsAndVariables";
import {
  testSqlConsole,
  testSqlConsoleMobile,
} from "../../../../../utils/sharedTests/sqlEditor";
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

  const desktopAndIpadTests = (isIpad = false): Tests => [
    ...commonTests,
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      isIpad,
    ),
    ...tableExpectations(hasDocs, loggedIn, 11, "case_details"),
    ...testClickDeleteRow(
      "error-modal",
      newShouldArgs("be.visible.and.contain", ["No authentication", "sign in"]),
    ),
    testViewsSection(hasBranch, 15, testView),
    newExpectationWithClickFlows(
      "should show create view button",
      "[data-cy=create-view-button]",
      beVisible,
      [
        newClickFlow(
          "[data-cy=create-view-button]",
          [typingExpectation("testQueryName", "[data-cy=query-name]")],
          "[data-cy=close-modal]",
        ),
      ],
    ),
    testQueryCatalogSection(hasBranch, 10, testQuery),
    testSchemaSection(hasBranch, 11, "case_details"),
    testSqlConsole,
  ];

  const mobileTests = [
    ...commonTests,
    ...testMobileRepoHeaderNav(currentOwner, currentRepo),
    ...tableExpectations(hasDocs, loggedIn, 11, "case_details", true),
    testViewsSection(hasBranch, 15, testView, true),
    testQueryCatalogSection(hasBranch, 10, testQuery, true),
    testSchemaSection(hasBranch, 11, "case_details", true),
    newExpectationWithClickFlows(
      "should click button to close repo nav",
      "[data-cy=close-table-nav-button]",
      beVisible,
      [newClickFlow("[data-cy=close-table-nav-button]", [])],
    ),
    testSqlConsoleMobile,
  ];
  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests()),
    iPad2ForAppLayout(pageName, desktopAndIpadTests(true)),
    iPhoneXForAppLayout(pageName, mobileTests),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
