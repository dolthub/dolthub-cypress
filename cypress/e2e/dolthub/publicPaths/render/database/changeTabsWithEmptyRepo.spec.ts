import {
  loopTabsWithNewExpectation,
  TabParams,
} from "@sharedTests/loopTabsWithNewExpection";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const beVisibleAndContain = (value: string) =>
    newShouldArgs("be.visible.and.contain", value);

  const tabs = [
    {
      tabName: "about",
      tabDataCy: "repo-about-tab",
      dataCyToFind: "description",
      textToFind: "empty repository for testing",
    },
    {
      tabName: "commit",
      tabDataCy: "repo-commit-log-tab",
      dataCyToFind: "repo-empty-get-started",
      textToFind: "Get Started",
    },
    {
      tabName: "releases",
      tabDataCy: "repo-releases-tab",
      dataCyToFind: "release-list-no-releases",
      textToFind: "No releases found",
    },
    {
      tabName: "issues",
      tabDataCy: "repo-issues-tab",
      dataCyToFind: "issue-no-issues",
      textToFind: "No issues found",
    },
    {
      tabName: "pulls",
      tabDataCy: "repo-pull-requests-tab",
      dataCyToFind: "pull-requests-no-pulls",
      textToFind: "No pulls found",
    },
    {
      tabName: "deploy",
      tabDataCy: "repo-deploy-tab",
      dataCyToFind: "hosted-button",
      textToFind: "Hosted",
    },
  ];

  const tests = () => [
    newExpectation(
      `Should dataCyToFind empty database`,
      `[data-cy=repo-empty-get-started]`,
      beVisible,
    ),

    ...loopTabsWithNewExpectation(tabs, (tab: TabParams) =>
      newExpectation(
        `Should dataCyToFind ${tab.textToFind}`,
        `[data-cy=${tab.dataCyToFind}]`,
        beVisibleAndContain(tab.textToFind ?? ""),
      ),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests())];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
