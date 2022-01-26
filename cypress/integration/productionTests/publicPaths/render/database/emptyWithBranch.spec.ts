import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../../utils/helpers";
import { testDoltInstallationSteps } from "../../../../utils/sharedTests/emptyRepo";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import {
  testQueryCatalogSection,
  testSchemaSection,
  testTablesSection,
  testViewsSection,
} from "../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";
import { mobileTests } from "../../../../utils/sharedTests/testRepoPageMobile";

const pageName = "Database page with branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;
const hasDocs = false;
const hasBranch = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const desktopAndIpadTests = (isIpad = false) => [
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      isIpad,
    ),
    newExpectation(
      "should have database Get Started section",
      "[data-cy=repo-empty-get-started]",
      beVisible,
    ),
    newExpectation(
      "should have database Push a commit section",
      "[data-cy=repo-empty-push-a-commit]",
      beVisible,
    ),
    newExpectation(
      "should have upload file link",
      "[data-cy=repo-empty-upload-file]",
      beVisible,
    ),
    newExpectation(
      "should have sql console link",
      "[data-cy=repo-empty-sql-console]",
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
    ...testTablesSection(hasDocs, hasBranch, loggedIn, 0),
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 0),
    testSqlConsole,
  ];

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    desktopAndIpadTests(),
    desktopAndIpadTests(true),
    mobileTests(currentOwner, currentRepo, hasDocs),
  );

  runTestsForDevices({ currentPage, devices });
});
