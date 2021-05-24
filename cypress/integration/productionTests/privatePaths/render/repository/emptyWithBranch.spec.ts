import { testDoltInstallationSteps } from "cypress/integration/utils/sharedTests/emptyRepo";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../../utils/helpers";
import { testTablesSection } from "../../../../utils/sharedTests/repoDatabaseNav";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";

const pageName = "Logged in repo page with branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn),
    ...testTablesSection(0),
    newExpectation(
      "should have repo Get Started section",
      "[data-cy=repo-empty-get-started]",
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
    newExpectation(
      "should have repo Push a commit section",
      "[data-cy=repo-empty-push-a-commit]",
      beVisible,
    ),
    newExpectationWithScrollIntoView(
      "should have Create new repo section",
      "[data-cy=repo-empty-create-new-repo]",
      beVisible,
      true
    ),
    newExpectationWithScrollIntoView(
      "should have Push existing repo section",
      "[data-cy=repo-empty-push-local-repo]",
      beVisible,
      true,
    ),
    ...testDoltInstallationSteps,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices });
});
