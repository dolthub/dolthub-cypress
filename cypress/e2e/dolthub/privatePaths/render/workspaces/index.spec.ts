import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { testCreatePullModal } from "@utils/sharedTests/createPullModalInWorkspaces";
import { testOldFormatPopup } from "@utils/sharedTests/repoHeaderNav";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";

const pageName = "Workspaces page logged in";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = isProd
  ? "4ef937bb-d5ee-4a75-93b0-424396f76a71"
  : "348d4226-fa12-4c6f-a624-7a597e1af128";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const discardClickFlow = newClickFlow(
    "[data-cy=discard-work]",
    [shouldBeVisible("cancel-button"), shouldBeVisible("discard-button")],
    "[data-cy=close-modal]",
  );

  const diffClickFlow = newClickFlow("[data-cy=tab-cumulative-diff]", [
    shouldBeVisible("diff-table-list-summaries"),
  ]);

  const tests = [
    testOldFormatPopup,
    shouldNotExist("workspaces-run-msg"),
    shouldFindAndContain("workspace-title", "Temporary Workspace"),
    shouldBeVisible("workspace-link"),
    shouldBeVisible("info-icon"),
    shouldBeVisible("sql-editor-collapsed"),
    shouldBeVisible("create-pull"),
    ...testCreatePullModal,
    newExpectationWithClickFlow(
      "should show discard workspace button",
      "[data-cy=discard-work]",
      beVisible,
      discardClickFlow,
    ),
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
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
