import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { testSqlConsole } from "@sharedTests/sqlEditor";
import { mobileTests } from "@sharedTests/testRepoPageMobile";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

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
  const notExist = newShouldArgs("not.exist");

  const diffClickFlow = newClickFlow("[data-cy=cumulative-diff]", [
    newExpectation(
      "should show cumulative diff",
      "[data-cy=diff-table-list-summaries]",
      beVisible,
    ),
  ]);

  const tests = [
    newExpectation(
      "should have repository layout",
      "[data-cy=repository-layout-container]",
      beVisible,
    ),
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      true,
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
        "Query History",
        "Cumulative Diff",
      ]),
    ),
    newExpectation(
      "should show commit list",
      "[data-cy=workspace-commit-list] li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectationWithClickFlows(
      "should show cumulative diff on tab click",
      "[data-cy=cumulative-diff]",
      beVisible,
      [diffClickFlow],
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
