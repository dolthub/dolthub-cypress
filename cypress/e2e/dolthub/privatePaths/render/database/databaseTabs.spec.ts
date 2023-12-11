import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { beVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Logged in database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

const tabsClickFlow = (tabName: string) =>
  newExpectationWithClickFlows(
    `should have repo ${tabName} tab`,
    `[data-cy=repo-${tabName}-tab]`,
    beVisible,
    [
      newClickFlow(`[data-cy=repo-${tabName}-tab]`, [
        newExpectation(
          `should have repo ${tabName} tab active`,
          `[data-cy=repo-${tabName}-active-tab]`,
          beVisible,
        ),
      ]),
    ],
  );

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    // DATABASE TAB
    newExpectation(
      `should have repo Database tab`,
      "[data-cy=repo-database-active-tab]",
      beVisible,
    ),

    // ABOUT TAB
    tabsClickFlow("about"),

    // COMMIT LOG TAB
    tabsClickFlow("commit-log"),

    // RELEASES TAB
    tabsClickFlow("releases"),

    // ISSUES TAB
    tabsClickFlow("issues"),

    // PULL REQUESTS TAB
    tabsClickFlow("pull-requests"),

    // JOBS TAB
    tabsClickFlow("jobs"),

    // SETTINGS TAB
    tabsClickFlow("settings"),

    // DEPLOY TAB
    tabsClickFlow("deploy"),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
