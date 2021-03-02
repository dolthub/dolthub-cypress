import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newShouldArgs,
} from "../../../../utils/helpers";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";

const pageName = "Workspaces page with select query logged out";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = isProd
  ? "bd283677-206b-444b-bde4-13332f7cd385"
  : "348d4226-fa12-4c6f-a624-7a597e1af128";
const query = "select * from test_table";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}?q=${query}`;
const loggedIn = false;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const noButtonClickFlow = newClickFlow("[data-cy=no-button]", [
    newExpectation(
      "should remove run message",
      "[data-cy=workspaces-run-msg]",
      notExist,
    ),
  ]);

  const tests = [
    newExpectation(
      "should have table layout",
      "[data-cy=table-layout-container]",
      beVisible,
    ),
    newExpectation(
      "should have table header",
      "[data-cy=data-table-header]",
      newShouldArgs("be.visible.and.contain", "Query"),
    ),
    newExpectation(
      "should have table header query",
      "[data-cy=repo-table-header-query]",
      beVisible,
    ),
    newExpectation(
      "should not have results header",
      "[data-cy=results-header]",
      notExist,
    ),
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
      "should have open sql editor",
      "[data-cy=sql-editor]",
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
      "[data-cy=repo-data-table]",
      beVisible,
    ),
    newExpectation(
      "should not show commit list",
      "[data-cy=workspace-commit-list]",
      notExist,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];

  runTestsForDevices({ currentPage, devices });
});
