import { testDoltInstallationSteps } from "cypress/integration/utils/sharedTests/emptyRepo";
import { testRepoHeaderWithBranch } from "cypress/integration/utils/sharedTests/repoHeaderNav";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testTablesSection } from "../../../../utils/sharedTests/repoDatabaseNav";

const pageName = "Repository page with branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;

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
      "should have repo Push a commit section",
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
    newExpectation(
      "should have Create new repo section",
      "[data-cy=repo-empty-create-new-repo]",
      beVisible,
    ),
    ...testDoltInstallationSteps,
    newExpectation(
      "should have Push existing repo section",
      "[data-cy=repo-empty-push-local-repo]",
      beVisible,
    ),

    newExpectation(
      "should have table footer",
      "[data-cy=table-footer]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
