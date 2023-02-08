import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { Expectation, ShouldArgs, Tests } from "../types";
import { notExist } from "./sharedFunctionsAndVariables";

const beVisible = newShouldArgs("be.visible");
const notBeVisible = newShouldArgs("not.be.visible");

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
  "#main-content",
  false,
  500,
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

// DATABASE DROPDOWN CLICK FLOW

export const conditionalReadMeTest = (hasDocs: boolean) => {
  const docsExpectation: Expectation = hasDocs
    ? newExpectation(
        "should not have README link",
        "[data-cy=dropdown-new-docs-link]",
        newShouldArgs("not.exist"),
      )
    : newExpectation(
        "should have a create new readme link",
        "[data-cy=dropdown-new-docs-link]",
        beVisible,
      );

  return docsExpectation;
};

export const databaseDropdownClickFlow = (
  loggedIn: boolean,
  hasDocs: boolean,
) =>
  newClickFlow(
    "[data-cy=repo-dropdown-button]",
    loggedIn
      ? [
          newExpectation(
            "should have a create new table link",
            "[data-cy=dropdown-create-new-table-link]",
            beVisible,
          ),
          newExpectation(
            "should have a upload a file link",
            "[data-cy=dropdown-upload-a-file-link]",
            beVisible,
          ),
          newExpectation(
            "should have a create new issue link",
            "[data-cy=dropdown-new-issue-link]",
            beVisible,
          ),
          newExpectation(
            "should have a create new pull request link",
            "[data-cy=dropdown-new-pull-request-link]",
            beVisible,
          ),
          conditionalReadMeTest(hasDocs),
        ]
      : [
          newExpectation(
            "should have a create new issue link",
            "[data-cy=dropdown-new-issue-link]",
            beVisible,
          ),
          newExpectation(
            "should have a create new pull request link",
            "[data-cy=dropdown-new-pull-request-link]",
            beVisible,
          ),
        ],
    "[data-cy=repo-dropdown-button]",
  );

export const testTabs = (visibility: ShouldArgs): Expectation[] => {
  const tabsVisibility = visibility.chainer === "be.visible" ? "" : "not ";
  return [
    // DATABASE TAB
    newExpectation(
      `should ${tabsVisibility}have repo Database tab`,
      "[data-cy=repo-database-tab]",
      visibility,
    ),

    // ABOUT TAB

    newExpectation(
      `should ${tabsVisibility}have repo About tab`,
      "[data-cy=repo-about-tab]",
      visibility,
    ),

    // COMMIT LOG TAB
    newExpectation(
      `should ${tabsVisibility}have repo Commit Log tab`,
      "[data-cy=repo-commit-log-tab]",
      visibility,
    ),

    // RELEASES TAB

    newExpectation(
      `should ${tabsVisibility}have repo Tag List tab`,
      "[data-cy=repo-releases-tab]",
      visibility,
    ),

    // PULL REQUESTS TAB

    newExpectation(
      `should ${tabsVisibility}have repo Pull Requests tab`,
      "[data-cy=repo-pull-requests-tab]",
      visibility,
    ),

    // ISSUES TAB

    newExpectation(
      `should ${tabsVisibility}have repo Issues tab`,
      "[data-cy=repo-issues-tab]",
      visibility,
    ),
    // DEPLOY TAB

    newExpectation(
      `should ${tabsVisibility}have repo Deploy tab`,
      "[data-cy=repo-deploy-tab]",
      visibility,
    ),
  ];
};

// SETTINGS TAB

export const testRepoSettingsTab = newExpectation(
  "should have Repo Settings section for user with write perms",
  "[data-cy=repo-settings-tab]",
  beVisible,
);

export const testCommonHeader = (
  repoName: string,
  ownerName: string,
): Expectation[] => [
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
];

export const testRepoHeaderForAll = (
  repoName: string,
  ownerName: string,
  loggedIn: boolean,
  hasDocs: boolean,
): Tests => {
  const loggedOutRepoHeaderTests = [
    ...testCommonHeader(repoName, ownerName),
    newExpectationWithClickFlows(
      "should have repo clone button",
      "[data-cy=repo-clone-button]",
      beVisible,
      [cloneClickFlow],
    ),
    ...testTabs(beVisible),
    newExpectationWithClickFlows(
      "should have functioning nav dropdown",
      "[data-cy=repo-dropdown-button]",
      beVisible,
      [databaseDropdownClickFlow(loggedIn, hasDocs)],
    ),
  ];

  const loggedInRepoHeaderTests = [testRepoSettingsTab];

  return loggedIn
    ? [...loggedOutRepoHeaderTests, ...loggedInRepoHeaderTests]
    : loggedOutRepoHeaderTests;
};

export const testMobileRepoHeaderNav = (
  ownerName: string,
  repoName: string,
): Expectation[] => [
  ...testCommonHeader(repoName, ownerName),
  newExpectation(
    "should not have repo clone button",
    "[data-cy=repo-clone-button]",
    notBeVisible,
  ),
  newExpectation(
    "should not have nav dropdown",
    "[data-cy=repo-dropdown-button]",
    notBeVisible,
  ),
  ...testTabs(notBeVisible),
  newExpectation(
    "should not have Repo Settings section",
    "[data-cy=repo-settings-tab]",
    notExist,
  ),
];

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
