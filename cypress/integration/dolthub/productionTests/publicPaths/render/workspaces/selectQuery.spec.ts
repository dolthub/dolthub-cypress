import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../../utils/sharedTests/repoHeaderNav";
import { testSqlConsole } from "../../../../../utils/sharedTests/sqlEditor";

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
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should have repository layout",
      "[data-cy=repository-layout-container]",
      beVisible,
    ),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, hasDocs),
    newExpectation(
      "should not show run message",
      "[data-cy=workspaces-run-msg]",
      notExist,
    ),
    newExpectation(
      "should show workspace title",
      "[data-cy=workspace-title]",
      newShouldArgs("be.visible.and.contain", "Temporary Workspace"),
    ),
    newExpectation(
      "should have link button",
      "[data-cy=workspace-link]",
      beVisible,
    ),
    newExpectation("should have info icon", "[data-cy=info-icon]", beVisible),
    newExpectation(
      "should have collapsed sql editor",
      "[data-cy=sql-editor-collapsed]",
      beVisible,
    ),
    newExpectation(
      "should not show pull button",
      "[data-cy=create-pull]",
      notExist,
    ),
    newExpectation(
      "should not show discard workspace button",
      "[data-cy=discard-work]",
      notExist,
    ),
    newExpectation(
      "should show diff tabs",
      "[data-cy=diff-tabs]",
      newShouldArgs("be.visible.and.contain", [
        "Current Query",
        "Query History",
        "Cumulative Diff",
      ]),
    ),
    newExpectation(
      "should show sql data table message",
      "[data-cy=data-table-message]",
      newShouldArgs("be.visible.and.contain", "2 rows selected"),
    ),
    newExpectation(
      "should show data table",
      "[data-cy=desktop-repo-data-table]",
      beVisible,
    ),
    newExpectation(
      "should not show commit list",
      "[data-cy=workspace-commit-list]",
      notExist,
    ),
    testSqlConsole,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
