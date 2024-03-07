import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "../helpers";
import { ClickFlow, Expectation, ShouldArgs, Tests } from "../types";
import { notExist } from "./sharedFunctionsAndVariables";

const beVisible = newShouldArgs("be.visible");
const notBeVisible = newShouldArgs("not.be.visible");

// OLD FORMAT POPUP

export const testOldFormatPopup = newExpectationWithClickFlow(
  "should find and old format popup",
  "[data-cy=old-format-popup]",
  beVisible,
  newClickFlow("[data-cy=close-modal]", []),
);

// HEADER

const cloneClickFlow = newClickFlow(
  "[data-cy=repository-page-header] [data-cy=repo-clone-button]",
  [
    newExpectation(
      "",
      "[data-cy=repo-clone-code-block]",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
  ],
  "[data-cy=repository-page-header] [data-cy=repo-clone-button]",
);

export const forkButtonClickFlow = (loggedIn: boolean) =>
  newClickFlow(
    "[data-cy=repository-page-header] [data-cy=repo-fork-button]",
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
): ClickFlow => {
  const commonTests = [
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
  ];
  const tests = loggedIn
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
  cloneDisabled = false,
  activeTab = "database",
): Tests => {
  const loggedOutRepoHeaderTests = [
    ...testCommonHeader(repoName, ownerName),
    cloneDisabled
      ? newExpectation(
          "should have clone button disabled",
          "[data-cy=repository-page-header] [data-cy=repo-clone-button]",
          newShouldArgs("not.be.enabled"),
        )
      : newExpectationWithClickFlow(
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
  cloneDisabled = false,
  activeTab = "database",
): Tests => [
  ...testRepoHeaderForAll(
    repoName,
    ownerName,
    loggedIn,
    hasDocs,
    cloneDisabled,
    activeTab,
  ),
  newExpectationWithClickFlow(
    "should open create fork modal on fork button click",
    "[data-cy=repository-page-header] [data-cy=repo-fork-button]",
    beVisible,
    forkButtonClickFlow(loggedIn),
  ),
];
