import { clickAndCheckCurrentBranch } from "cypress/e2e/utils/sharedTests/checkCurrentBranch";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";

const pageName = "Database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "archived";
const currentPage = `repositories/${currentOwner}/${currentRepo}/data/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tabs = [
    {
      test: "about tab",
      data_cy: "repo-about-tab",
      openMenu: false,
    },
    {
      test: "commit tab",
      data_cy: "repo-commit-log-tab",
      openMenu: true,
    },
    {
      test: "releases tab",
      data_cy: "repo-releases-tab",
      openMenu: true,
    },
    {
      test: "issues tab",
      data_cy: "repo-issues-tab",
      openMenu: true,
    },
    {
      test: "pulls tab",
      data_cy: "repo-pull-requests-tab",
      openMenu: true,
    },
    {
      test: "bounties tab",
      data_cy: "repo-bounties-tab",
      openMenu: true,
    },
    {
      test: "setting tab",
      data_cy: "repo-settings-tab",
      openMenu: true,
    },
    {
      test: "deploy tab",
      data_cy: "repo-deploy-tab",
      openMenu: true,
    },
  ];

  const tests = () => [
    newExpectation(
      "should have currentBranch in branch selector",
      "[data-cy=branch-selector]",
      newShouldArgs("be.visible.and.contain", currentBranch),
    ),
    ...tabs.map(tab =>
      newExpectationWithClickFlows(
        `should click to ${tab.test}`,
        `[data-cy=${tab.data_cy}]`,
        beVisible,
        [
          newClickFlow(`[data-cy=${tab.data_cy}]`, [
            clickAndCheckCurrentBranch(currentBranch, tab.openMenu),
          ]),
        ],
      ),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests())];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
