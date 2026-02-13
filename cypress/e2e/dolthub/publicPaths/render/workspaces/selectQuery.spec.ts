import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { testSqlConsole } from "@sharedTests/sqlEditor";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";

const pageName = "Workspaces page with select query logged out";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = isProd
  ? "c87e3ac6-03f2-4802-a150-f3d40cc3c706"
  : "a1b9f587-752e-441b-befb-59e1241be7eb";
const query = "select * from test_table";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}?q=${query}`;
const loggedIn = false;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("repository-layout-container"),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, hasDocs),
    shouldNotExist("workspaces-run-msg"),
    shouldFindAndContain("workspace-title", "Temporary Workspace"),
    shouldBeVisible("workspace-link"),
    shouldBeVisible("info-icon"),
    shouldBeVisible("sql-editor-collapsed"),
    shouldNotExist("create-pull"),
    shouldNotExist("discard-work"),
    shouldFindAndContain("diff-tabs", [
      "Current Query",
      "Query History",
      "Cumulative Diff",
    ]),
    shouldFindAndContain("data-table-message", "2 rows selected"),
    shouldBeVisible("desktop-repo-data-table"),
    shouldNotExist("workspace-commit-list"),
    testSqlConsole,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
