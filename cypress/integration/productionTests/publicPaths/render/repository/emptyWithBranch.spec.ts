import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import {
  testAboutSection,
  testPullRequestsSection,
  testRepoHeaderWithBranch,
  testSectionsNotVisible,
  testTablesSection,
} from "../../../../utils/sharedTests/repoLeftNav";

const pageName = "Repository page with branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...testRepoHeaderWithBranch(currentRepo, currentOwner),
    testAboutSection,
    testTablesSection(0),
    testPullRequestsSection(0),
    ...testSectionsNotVisible,
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
      "should have Create new repo section",
      "[data-cy=repo-empty-create-new-repo]",
      beVisible,
    ),
    newExpectation(
      "should have Push existing repo section",
      "[data-cy=repo-empty-push-local-repo]",
      beVisible,
    ),
    newExpectation(
      "should have link to copy Dolt install script",
      "[data-cy=repo-empty-copy-dolt-release]",
      beVisible,
    ),
    newExpectation(
      "should have link to latest Dolt releases",
      "[data-cy=repo-empty-dolt-release-latest]",
      beVisible,
    ),
    newExpectation(
      "should have link to Dolt source",
      "[data-cy=repo-empty-dolt-source]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
