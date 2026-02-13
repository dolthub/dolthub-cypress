import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { testSqlConsole } from "@sharedTests/sqlEditor";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { testCreatePullModal } from "@utils/sharedTests/createPullModalInWorkspaces";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";

const pageName = "Workspaces page with query logged out";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = isProd
  ? "c87e3ac6-03f2-4802-a150-f3d40cc3c706"
  : "a1b9f587-752e-441b-befb-59e1241be7eb";
const query = "insert into test_table (pk, a, b, c) values (2, 3, 4, 5);";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}?q=${query}`;
const loggedIn = true;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const noButtonClickFlow = newClickFlow("[data-cy=no-button]", [
    shouldNotExist("workspaces-run-msg"),
  ]);

  const tests = [
    shouldBeVisible("repository-layout-container"),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, hasDocs),
    shouldBeVisible("workspaces-run-msg"),
    shouldFindAndContain("workspace-title", "Temporary Workspace"),
    shouldBeVisible("workspace-link"),
    shouldBeVisible("info-icon"),
    shouldBeVisible("create-pull"),
    shouldBeVisible("discard-work"),
    shouldFindAndContain("diff-tabs", ["Query History", "Cumulative Diff"]),
    newExpectation(
      "should show commit list",
      "[data-cy=workspace-commit-list] li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectationWithClickFlow(
      "should remove run message on no click",
      "[data-cy=no-button]",
      beVisible,
      noButtonClickFlow,
    ),
    ...testCreatePullModal,
    testSqlConsole,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
