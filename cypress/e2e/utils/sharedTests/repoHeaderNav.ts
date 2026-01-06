import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "../helpers";
import { ClickFlow, Expectation, ShouldArgs, Tests } from "../types";
import {
  beVisible,
  shouldBeVisible,
  shouldBeVisibleAndHaveLength,
  shouldFindAndContain,
  shouldNotExist,
} from "./sharedFunctionsAndVariables";

const notBeVisible = newShouldArgs("not.be.visible");

// HEADER

const cloneClickFlow = newClickFlow(
  "[data-cy=repository-page-header] [data-cy=repo-clone-button]",
  [
    shouldNotExist("clone-disabled"),
    shouldBeVisibleAndHaveLength("repo-clone-code-block", 2),
  ],

  "[data-cy=repository-page-header] [data-cy=repo-clone-button]",
);

export const forkButtonClickFlow = (loggedIn: boolean) =>
  newClickFlow(
    "[data-cy=repository-page-header] [data-cy=repo-fork-button]",
    loggedIn
      ? [
          shouldBeVisible("create-fork-modal"),
          shouldBeVisible("fork-confirm-button"),
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

export const conditionalReadMeTest = (hasDocs: boolean): Expectation =>
  hasDocs
    ? shouldNotExist("dropdown-new-docs-link")
    : shouldBeVisible("dropdown-new-docs-link");

export const databaseDropdownClickFlow = (
  loggedIn: boolean,
  hasDocs: boolean,
): ClickFlow => {
  const commonTests = [
    shouldBeVisible("dropdown-new-issue-link"),
    shouldBeVisible("dropdown-new-pull-request-link"),
  ];
  const tests = loggedIn
    ? [
        shouldBeVisible("dropdown-create-new-table-link"),
        shouldBeVisible("dropdown-upload-a-file-link"),
        ...commonTests,
        conditionalReadMeTest(hasDocs),
      ]
    : commonTests;

  return newClickFlow(
    "[data-cy=repository-page-header] [data-cy=repo-dropdown-button]",
    tests,
  );
};

function getDataCyForTab(tab: string, activeTab?: string): string {
  return `[data-cy=repo-${tab}-${activeTab === tab ? "active-" : ""}tab]`;
}

export const testTabs = (
  visibility: ShouldArgs,
  activeTab?: string,
): Expectation[] => {
  const tabsVisibility = visibility.chainer === "be.visible" ? "" : "not ";
  return [
    // DATABASE TAB
    newExpectation(
      `should ${tabsVisibility}have repo Database tab`,
      getDataCyForTab("database", activeTab),
      visibility,
    ),

    // ABOUT TAB
    newExpectation(
      `should ${tabsVisibility}have repo About tab`,
      getDataCyForTab("about", activeTab),
      visibility,
    ),

    // COMMIT LOG TAB
    newExpectation(
      `should ${tabsVisibility}have repo Commit Log tab`,
      getDataCyForTab("commit-log", activeTab),
      visibility,
    ),

    // RELEASES TAB

    newExpectation(
      `should ${tabsVisibility}have repo Tag List tab`,
      getDataCyForTab("releases", activeTab),
      visibility,
    ),

    // PULL REQUESTS TAB

    newExpectation(
      `should ${tabsVisibility}have repo Pull Requests tab`,
      getDataCyForTab("pull-requests", activeTab),
      visibility,
    ),

    // ISSUES TAB

    newExpectation(
      `should ${tabsVisibility}have repo Issues tab`,
      getDataCyForTab("issues", activeTab),
      visibility,
    ),
    // DEPLOY TAB

    newExpectation(
      `should ${tabsVisibility}have repo Deploy tab`,
      getDataCyForTab("deploy", activeTab),
      visibility,
    ),
  ];
};

// SETTINGS TAB

export const testRepoSettingsTab = shouldBeVisible("repo-settings-tab");

export const testCommonHeader = (
  repoName: string,
  ownerName: string,
): Expectation[] => [
  shouldBeVisible("repository-page-header"),
  shouldFindAndContain("repo-breadcrumbs", [ownerName, repoName]),
  shouldBeVisible("updated-at"),
  shouldBeVisible("repo-size"),
  shouldBeVisible("repo-star"),
  shouldBeVisible("repo-fork-button"),
];

export const testRepoHeaderForAll = (
  repoName: string,
  ownerName: string,
  loggedIn: boolean,
  hasDocs: boolean,
  activeTab = "database",
): Tests => {
  const loggedOutRepoHeaderTests = [
    ...testCommonHeader(repoName, ownerName),
    newExpectationWithClickFlow(
      "should have repo clone button",
      " [data-cy=repo-clone-button]",
      beVisible,
      cloneClickFlow,
    ),
    ...testTabs(beVisible, activeTab),
    newExpectationWithClickFlow(
      "should have functioning nav dropdown",
      "[data-cy=repository-page-header] [data-cy=repo-dropdown-button]",
      beVisible,
      databaseDropdownClickFlow(loggedIn, hasDocs),
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
  activeTab = "database",
): Expectation[] => [
  ...testCommonHeader(repoName, ownerName),
  newExpectation(
    "should not have repo clone button",
    "[data-cy=small-repository-page-header] [data-cy=repo-clone-button]",
    notBeVisible,
  ),
  newExpectation(
    "should not have nav dropdown",
    "[data-cy=repo-dropdown-button]",
    notBeVisible,
  ),
  ...testTabs(notBeVisible, activeTab),
  shouldNotExist("repo-settings-tab"),
];

export const testRepoHeaderWithBranch = (
  repoName: string,
  ownerName: string,
  loggedIn: boolean,
  hasDocs: boolean,
  activeTab = "database",
): Tests => [
  ...testRepoHeaderForAll(repoName, ownerName, loggedIn, hasDocs, activeTab),
  newExpectationWithClickFlow(
    "should open create fork modal on fork button click",
    "[data-cy=repository-page-header] [data-cy=repo-fork-button]",
    beVisible,
    forkButtonClickFlow(loggedIn),
  ),
];
