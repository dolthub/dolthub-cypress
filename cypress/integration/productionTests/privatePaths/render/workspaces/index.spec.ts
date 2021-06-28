import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";

const pageName = "Workspaces page logged in";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = isProd
  ? "bd283677-206b-444b-bde4-13332f7cd385"
  : "348d4226-fa12-4c6f-a624-7a597e1af128";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const pullClickFlow = newClickFlow(
    "[data-cy=create-pull]",
    [
      newExpectation(
        "should have form and textarea",
        "[data-cy=create-commit-form]",
        newShouldArgs("be.visible.and.contain", "Commit message"),
      ),
      newExpectation(
        "should have cancel button",
        "[data-cy=cancel-button]",
        beVisible,
      ),
      newExpectation(
        "should have pull button",
        "[data-cy=create-pull-button]",
        beVisible,
      ),
    ],
    "[data-cy=close-modal]",
  );

  const discardClickFlow = newClickFlow(
    "[data-cy=discard-work]",
    [
      newExpectation(
        "should have cancel button",
        "[data-cy=cancel-button]",
        beVisible,
      ),
      newExpectation(
        "should have discard button",
        "[data-cy=discard-button]",
        beVisible,
      ),
    ],
    "[data-cy=close-modal]",
  );

  const diffClickFlow = newClickFlow("[data-cy=cumulative-diff]", [
    newExpectation(
      "should show cumulative diff",
      "[data-cy=diff-table-list]",
      beVisible,
    ),
  ]);

  const tests = [
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
    newExpectationWithClickFlows(
      "should show pull button",
      "[data-cy=create-pull]",
      beVisible,
      [pullClickFlow],
    ),
    newExpectationWithClickFlows(
      "should show discard workspace button",
      "[data-cy=discard-work]",
      beVisible,
      [discardClickFlow],
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
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
