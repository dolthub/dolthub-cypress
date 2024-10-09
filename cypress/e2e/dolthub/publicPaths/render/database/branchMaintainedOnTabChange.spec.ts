import { openLeftNavAndCheckCurrentBranch } from "@sharedTests/checkCurrentBranch";
import {
  loopTabsWithNewExpectation,
  TabParams,
} from "@sharedTests/loopTabsWithNewExpection";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "archived";
const currentPage = `repositories/${currentOwner}/${currentRepo}/data/${currentBranch}`;

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
      dataCyToFind: "issue-table",
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
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
