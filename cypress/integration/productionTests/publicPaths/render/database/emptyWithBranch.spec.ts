import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../../utils/helpers";
import { testDoltInstallationSteps } from "../../../../utils/sharedTests/emptyRepo";
import {
  testTablesSection,
  testViewsSection,
} from "../../../../utils/sharedTests/repoDatabaseNav";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
// import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";

const pageName = "Database page with branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;
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
    // testSqlConsole,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
