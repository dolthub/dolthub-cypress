import { clickAndCheckCurrentBranch } from "cypress/e2e/utils/sharedTests/checkCurrentBranch";
import {
  loopTabsWithNewExpectation,
  TabParams,
} from "cypress/e2e/utils/sharedTests/loopTabsWithNewExpection";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "archived";
const currentPage = `repositories/${currentOwner}/${currentRepo}/data/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const tabs = [
    {
      test: "about tab",
      data_cy: "repo-about-tab",
      openMenu: false,
      find: "repo-doc-markdown",
    },
    {
      test: "commit tab",
      data_cy: "repo-commit-log-tab",
      openMenu: true,
      find: "commit-log-commits-list",
    },
    {
      test: "releases tab",
      data_cy: "repo-releases-tab",
      openMenu: true,
      find: "release-list-no-releases",
    },
    {
      test: "issues tab",
      data_cy: "repo-issues-tab",
      openMenu: true,
      find: "issue-table",
    },
    {
      test: "pulls tab",
      data_cy: "repo-pull-requests-tab",
      openMenu: true,
      find: "create-pull-request-button",
    },
    {
      test: "deploy tab",
      data_cy: "repo-deploy-tab",
      openMenu: true,
      find: "hosted-button",
    },
  ];

  const tests = () => [
    newExpectation(
      "should have currentBranch in branch selector",
      "[data-cy=branch-selector]",
      newShouldArgs("be.visible.and.contain", currentBranch),
    ),
    ...loopTabsWithNewExpectation(tabs, (tab: TabParams) =>
      clickAndCheckCurrentBranch(currentBranch, tab.openMenu ?? false),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests())];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
