import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { beVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Logged in database page with empty repo and branch";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

const tabsClickFlow = (tabName: string) =>
  newExpectationWithClickFlow(
    `should have repo ${tabName} tab`,
    `[data-cy=repo-${tabName}-tab]`,
    beVisible,
    newClickFlow(`[data-cy=repo-${tabName}-tab]`, [
      newExpectation(
        `should have repo ${tabName} tab active`,
        `[data-cy=repo-${tabName}-active-tab]`,
        beVisible,
      ),
    ]),
  );

const tabNames = [
  "about",
  "commit-log",
  "releases",
  "issues",
  "pull-requests",
  "jobs",
  "settings",
  "deploy",
];
describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    // DATABASE TAB
    newExpectation(
      `should have repo Database tab`,
      "[data-cy=repo-database-active-tab]",
      beVisible,
    ),
    ...tabNames.map(tabName => tabsClickFlow(tabName)),
  ];

  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
