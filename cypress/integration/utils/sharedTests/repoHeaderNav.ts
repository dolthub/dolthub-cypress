import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { Expectation, Tests } from "../types";

const beVisible = newShouldArgs("be.visible");

// HEADER

const cloneClickFlow = newClickFlow(
  "[data-cy=repo-clone-button]",
  [
    newExpectation(
      "",
      "[data-cy=repo-clone-code-block]",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
  ],
  "[data-cy=repository-layout-container]",
);

export const forkButtonClickFlow = (loggedIn: boolean) =>
  newClickFlow(
    "[data-cy=repo-fork-button]",
    loggedIn
      ? [
          newExpectation("", "[data-cy=create-fork-modal]", beVisible),
          newExpectation(
            "Confirm button should not be disabled on initial open",
            "[data-cy=fork-confirm-button]",
            beVisible,
          ),
        ]
      : [
          newExpectation(
            "",
            "[data-cy=create-fork-modal] a",
            newShouldArgs("be.visible.and.contain", "sign in"),
          ),
        ],
    "[data-cy=close-modal]",
  );

// DATABSE DROPDOWN CLICKFLOW

export const conditionalReadMeTest = (hasDocs: boolean) => {
  const docsExpectation: Expectation = hasDocs
    ? newExpectation(
        "Should not have readmeLink",
        "[data-cy=dropdown-new-readme-link]",
        newShouldArgs("not.exist"),
      )
    : newExpectation(
        "Should have a create new readme link",
        "[data-cy=dropdown-new-readme-link]",
        beVisible,
      );

  return docsExpectation;
};

export const databaseDropdownClickFlow = (
  loggedIn: boolean,
  hasDocs: boolean,
) =>
  newClickFlow(
    "[data-cy=dropdown-database-nav]",
    loggedIn
      ? [
          newExpectation(
            "Should have a create new table link",
            "[data-cy=dropdown-create-new-table-link]",
            beVisible,
          ),
          newExpectation(
            "Should have a upload a file link",
            "[data-cy=dropdown-upload-a-file-link]",
            beVisible,
          ),
          newExpectation(
            "Should have a create new issue link",
            "[data-cy=dropdown-new-issue-link]",
            beVisible,
          ),
          newExpectation(
            "Should have a create new pull request link",
            "[data-cy=dropdown-new-pull-request-link]",
            beVisible,
          ),
          conditionalReadMeTest(hasDocs),
        ]
      : [
          newExpectation(
            "Should have a create new issue link",
            "[data-cy=dropdown-new-issue-link]",
            beVisible,
          ),
          newExpectation(
            "Should have a create new pull request link",
            "[data-cy=dropdown-new-pull-request-link]",
            beVisible,
          ),
        ],
    "[data-cy=dropdown-database-nav]",
  );

// DATABASE TAB

export const testDatabaseTab: Expectation = newExpectation(
  "should have repo Database tab",
  "[data-cy=repo-database-tab]",
  newShouldArgs("be.visible"),
);

// ABOUT TAB

export const testAboutTab: Expectation = newExpectation(
  "should have repo About tab",
  "[data-cy=repo-about-tab]",
  newShouldArgs("be.visible"),
);

// COMMIT LOG TAB

export const testCommitLogTab: Expectation = newExpectation(
  "should have repo Commit Log tab",
  "[data-cy=repo-commit-log-tab]",
  beVisible,
);

// RELEASES TAB

export const testReleasesTab: Expectation = newExpectation(
  "should have repo Tag List tab",
  "[data-cy=repo-releases-tab]",
  beVisible,
);

// PULL REQUESTS TAB

export const testPullRequestsTab: Expectation = newExpectation(
  "should have repo Pull Requests tab",
  "[data-cy=repo-pull-requests-tab]",
  beVisible,
);

// ISSUES TAB

export const testIssuesTab: Expectation = newExpectation(
  "should have repo Issues tab",
  "[data-cy=repo-issues-tab]",
  beVisible,
);

// SETTINGS TAB

export const testRepoSettingsTab = newExpectation(
  "should have Repo Settings section for user with write perms",
  "[data-cy=repo-settings-tab]",
  beVisible,
);

// DEPLOY TAB

export const testDeployTab: Expectation = newExpectation(
  "should have repo Deploy tab",
  "[data-cy=repo-deploy-tab]",
  beVisible,
);

export const testRepoHeaderForAll = (
  repoName: string,
  ownerName: string,
  loggedIn: boolean,
  hasDocs: boolean,
): Tests => {
  const loggedOutRepoHeaderTests = [
    newExpectation(
      "should have repo header",
      "[data-cy=repository-page-header]",
      beVisible,
    ),
    newExpectation(
      "should have owner's name",
      "[data-cy=repo-breadcrumbs]",
      newShouldArgs("be.visible.and.contain", ownerName),
    ),
    newExpectation(
      "should have repo's name",
      "[data-cy=repo-breadcrumbs]",
      newShouldArgs("be.visible.and.contain", repoName),
    ),
    newExpectation(
      "should have repo last updated",
      "[data-cy=updated-at]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have repo's size",
      "[data-cy=repo-size]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have repo star button",
      "[data-cy=repo-star]",
      beVisible,
    ),
    newExpectation(
      "should have repo fork button",
      "[data-cy=repo-fork-button]",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "should have repo clone button",
      "[data-cy=repo-clone-button]",
      beVisible,
      [cloneClickFlow],
    ),
    testDatabaseTab,
    testAboutTab,
    testCommitLogTab,
    testReleasesTab,
    testPullRequestsTab,
    testIssuesTab,
    testDeployTab,
    newExpectationWithClickFlows(
      "should have functioning nav dropdown",
      "[data-cy=dropdown-database-nav]",
      beVisible,
      [databaseDropdownClickFlow(loggedIn, hasDocs)],
    ),
  ];

  const loggedInRepoHeaderTests = [testRepoSettingsTab];

  return loggedIn
    ? [...loggedOutRepoHeaderTests, ...loggedInRepoHeaderTests]
    : loggedOutRepoHeaderTests;
};

export const testRepoHeaderWithBranch = (
  repoName: string,
  ownerName: string,
  loggedIn: boolean,
  hasDocs: boolean,
): Tests => [
  ...testRepoHeaderForAll(repoName, ownerName, loggedIn, hasDocs),
  newExpectationWithClickFlows(
    "should open create fork modal on fork button click",
    "[data-cy=repo-fork-button]",
    beVisible,
    [forkButtonClickFlow(loggedIn)],
  ),
];
