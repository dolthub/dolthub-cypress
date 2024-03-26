import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { testSqlConsole } from "@sharedTests/sqlEditor";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { mobileTests } from "@utils/sharedTests/repoPageMobile";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";

const pageName = "Workspaces page logged out";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = isProd
  ? "4ef937bb-d5ee-4a75-93b0-424396f76a71"
  : "348d4226-fa12-4c6f-a624-7a597e1af128";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}`;
const loggedIn = false;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const diffClickFlow = newClickFlow("[data-cy=tab-cumulative-diff]", [
    shouldBeVisible("diff-table-list-summaries"),
  ]);

  const tests = [
    shouldBeVisible("repository-layout-container"),
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      true,
    ),
    shouldNotExist("workspaces-run-msg"),
    shouldFindAndContain("workspace-title", "Temporary Workspace"),
    shouldBeVisible("workspace-link"),
    shouldBeVisible("info-icon"),
    shouldNotExist("create-pull"),
    shouldNotExist("discard-work"),
    shouldFindAndContain("diff-tabs", ["Query History", "Cumulative Diff"]),
    newExpectation(
      "should show commit list",
      "[data-cy=workspace-commit-list] li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectationWithClickFlow(
      "should show cumulative diff on tab click",
      "[data-cy=tab-cumulative-diff]",
      beVisible,
      diffClickFlow,
    ),
    testSqlConsole,
  ];

  const devices = [
    macbook15ForAppLayout(pageName, tests, false, loggedIn),
    iPad2ForAppLayout(pageName, tests),
    iPhoneXForAppLayout(
      pageName,
      mobileTests(
        currentOwner,
        currentRepo,
        currentPage,
        hasDocs,
        true,
        true,
        false,
        "about",
      ),
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
