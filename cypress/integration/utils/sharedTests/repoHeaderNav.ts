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
  ".popup-overlay",
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

// DATABASE TAB

export const testDatabaseTab: Expectation = newExpectation(
  "should have repo Database tab",
  "[data-cy=repo-about-tab]",
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

export const testRepoHeaderForAll = (
  repoName: string,
  ownerName: string,
  loggedIn: boolean,
): Tests => {
  // TODO: Add oustanding header tests:
  // `+` button logged out dropdown (New issue, New pull request)
  // `+` button logged in dropdown (logged out tests plus File Upload, Add README.md/LICENSE.md)
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
): Tests => [
  ...testRepoHeaderForAll(repoName, ownerName, loggedIn),
  newExpectationWithClickFlows(
    "should open create fork modal on fork button click",
    "[data-cy=repo-fork-button]",
    beVisible,
    [forkButtonClickFlow(loggedIn)],
  ),
  newExpectation(
    "should have repo branch selector",
    "[data-cy=branch-selector]",
    beVisible,
  ),
];
