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
  ? "4ef937bb-d5ee-4a75-93b0-424396f76a71"
  : "348d4226-fa12-4c6f-a624-7a597e1af128";
const query = "select * from test_table";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}?q=${query}`;
const loggedIn = false;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
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
