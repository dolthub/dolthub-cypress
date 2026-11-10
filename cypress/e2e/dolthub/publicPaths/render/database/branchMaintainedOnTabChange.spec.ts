import { openLeftNavAndCheckCurrentBranch } from "@sharedTests/checkCurrentBranch";
import { doltConfig, doltgresConfig } from "@sharedTests/databaseTypes";
import {
  loopTabsWithNewExpectation,
  TabParams,
} from "@sharedTests/loopTabsWithNewExpection";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

// The Dolt and Doltgres fixtures use different databases with multiple branches
const configs = [
  {
    pageName: `${doltConfig.label} page with tables and docs`,
    currentOwner: doltConfig.currentOwner,
    currentRepo: "corona-virus",
    currentBranch: "archived",
    issuesDataCy: "issue-table",
  },
  {
    pageName: `${doltgresConfig.label} page with tables and branches`,
    currentOwner: doltgresConfig.currentOwner,
    currentRepo: "repo_with_branch_protection",
    currentBranch: "branch_can_not_be_deleted",
    issuesDataCy: "issue-no-issues",
  },
];

configs.forEach(c => {
  const { pageName, currentBranch } = c;
  const currentPage = `repositories/${c.currentOwner}/${c.currentRepo}/data/${currentBranch}`;

  describe(`${pageName} renders expected components on different devices`, () => {
    const tabs = [
      {
        tabName: "about tab",
        tabDataCy: "repo-about-tab",
        isLeftNavClosed: false,
        dataCyToFind: "repo-doc-markdown",
      },
      {
        tabName: "commit tab",
        tabDataCy: "repo-commit-log-tab",
        isLeftNavClosed: true,
        dataCyToFind: "commit-log-commits-list",
      },
      {
        tabName: "releases tab",
        tabDataCy: "repo-releases-tab",
        isLeftNavClosed: true,
        dataCyToFind: "release-list-no-releases",
      },
      {
        tabName: "issues tab",
        tabDataCy: "repo-issues-tab",
        isLeftNavClosed: true,
        dataCyToFind: c.issuesDataCy,
      },
      {
        tabName: "pulls tab",
        tabDataCy: "repo-pull-requests-tab",
        isLeftNavClosed: true,
        dataCyToFind: "create-pull-request-button",
      },
      {
        tabName: "deploy tab",
        tabDataCy: "repo-deploy-tab",
        isLeftNavClosed: true,
        dataCyToFind: "hosted-button",
      },
    ];

    const tests = () => [
      newExpectation(
        "should have currentBranch in branch selector",
        "[data-cy=branch-and-tag-selector]",
        newShouldArgs("be.visible.and.contain", currentBranch),
      ),
      ...loopTabsWithNewExpectation(tabs, (tab: TabParams) =>
        openLeftNavAndCheckCurrentBranch(
          currentBranch,
          tab.isLeftNavClosed ?? false,
        ),
      ),
    ];

    const devices = [macbook15ForAppLayout(pageName, tests())];
    const skip = false;
    runTestsForDevices({ currentPage, devices, skip });
  });
});
