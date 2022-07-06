import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../../../utils/helpers";
import { testDoltInstallationSteps } from "../../../../../utils/sharedTests/emptyRepo";
import { testRepoHeaderWithBranch } from "../../../../../utils/sharedTests/repoHeaderNav";
import {
  testQueryCatalogSection,
  testSchemaSection,
  testTablesSection,
  testViewsSection,
} from "../../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../../utils/sharedTests/sqlEditor";

const pageName = "Logged in database page with branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;
const hasDocs = false;
const hasBranch = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, hasDocs),
    newExpectation(
      "should have database Get Started section",
      "[data-cy=repo-empty-get-started]",
      beVisible,
    ),
    newExpectation(
      "should have sql query section",
      "[data-cy=sql-query-create-table]",
      beVisible,
    ),
    newExpectation(
      "should have spreadsheet editor section",
      "[data-cy=file-upload-spreadsheet-upload-link]",
      beVisible,
    ),
    newExpectation(
      "should have file upload section",
      "[data-cy=file-upload-fileupload-upload-link]",
      beVisible,
    ),
    newExpectation(
      "should have database Push a commit section",
      "[data-cy=repo-empty-push-a-commit]",
      beVisible,
    ),
    newExpectationWithScrollIntoView(
      "should have Create new database section",
      "[data-cy=repo-empty-create-new-repo]",
      beVisible,
      true,
    ),
    newExpectationWithScrollIntoView(
      "should have Push existing database section",
      "[data-cy=repo-empty-push-local-repo]",
      beVisible,
      true,
    ),
    ...testDoltInstallationSteps,
    ...testTablesSection(hasDocs, loggedIn, 0),
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 0),
    testSqlConsole,
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
