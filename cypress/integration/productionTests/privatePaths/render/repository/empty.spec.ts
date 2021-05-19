import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "cypress/integration/utils/helpers";
import { testDoltInstallationSteps } from "cypress/integration/utils/sharedTests/emptyRepo";
import { testRepoHeaderForAll } from "cypress/integration/utils/sharedTests/repoHeaderNav";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";

const pageName = "Logged in repo page with no branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  // TODO: Add tests for left side database navigation
  const tests = [
    ...testRepoHeaderForAll(currentRepo, currentOwner, loggedIn),
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
      "should have sql console link",
      "[data-cy=repo-empty-sql-console]",
      beVisible,
    ),
    newExpectation(
      "should not have Push a commit section",
      "[data-cy=repo-empty-push-a-commit]",
      notExist,
    ),
    newExpectation(
      "should have Create new repo section",
      "[data-cy=repo-empty-create-new-repo]",
      beVisible,
    ),
    newExpectationWithScrollIntoView(
      "should have Push existing repo section",
      "[data-cy=repo-empty-push-local-repo]",
      beVisible,
      true,
    ),
    testDoltInstallationSteps,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices });
});
