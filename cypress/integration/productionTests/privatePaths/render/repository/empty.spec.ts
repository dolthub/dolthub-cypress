import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import {
  testAboutSection,
  testCollaboratorsSection,
  testPullRequestsSection,
  testRepoHeaderForAll,
  testRepoSettings,
  testSectionsNotVisible,
  testTablesSection,
} from "../../../../utils/sharedTests/repoLeftNav";

const pageName = "Logged in repo page with no branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    ...testRepoHeaderForAll(currentRepo, currentOwner),
    testAboutSection,
    testTablesSection(0),
    testPullRequestsSection(0),
    testCollaboratorsSection(0),
    testRepoSettings,
    ...testSectionsNotVisible,
    newExpectation(
      "should have Get Started section",
      "[data-cy=repo-empty-get-started]",
      beVisible,
    ),
    newExpectation(
      "should have upload file link",
      "[data-cy=repo-empty-upload-file]",
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
    newExpectation(
      "should have disabled Fork button",
      "[data-cy=repo-fork-button]",
      newShouldArgs("be.disabled"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];

  runTestsForDevices({ currentPage, devices });
});
