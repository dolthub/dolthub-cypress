import {
  loopTabsWithNewExpectation,
  TabParams,
} from "cypress/e2e/utils/sharedTests/loopTabsWithNewExpection";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

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
      test: "about tab",
      data_cy: "repo-about-tab",
      find: "description",
      text: "empty repository for testing",
    },
    {
      test: "commit tab",
      data_cy: "repo-commit-log-tab",
      find: "repo-empty-get-started",
      text: "Get Started",
    },
    {
      test: "releases tab",
      data_cy: "repo-releases-tab",
      find: "release-list-no-releases",
      text: "No releases found",
    },
    {
      test: "issues tab",
      data_cy: "repo-issues-tab",
      find: "issue-no-issues",
      text: "No issues found",
    },
    {
      test: "pulls tab",
      data_cy: "repo-pull-requests-tab",
      find: "pull-requests-no-pulls",
      text: "No pulls found",
    },
    {
      test: "bounties tab",
      data_cy: "repo-bounties-tab",
      find: "bounties-table-no-bounties",
      text: "No bounties found",
    },
    {
      test: "setting tab",
      data_cy: "repo-settings-tab",
      find: "repo-settings-description-textarea",
      text: "empty repository for testing",
    },
    {
      test: "deploy tab",
      data_cy: "repo-deploy-tab",
      find: "empty-db-message",
      text: "Cannot deploy an empty database. Please",
    },
  ];

  const tests = () => [
    newExpectation(
      `Should find empty database`,
      `[data-cy=repo-empty-get-started]`,
      beVisible,
    ),

    ...loopTabsWithNewExpectation(tabs, (tab: TabParams) =>
      newExpectation(
        `Should find ${tab.text}`,
        `[data-cy=${tab.find}]`,
        beVisibleAndContain(tab.text ?? ""),
      ),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests())];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
