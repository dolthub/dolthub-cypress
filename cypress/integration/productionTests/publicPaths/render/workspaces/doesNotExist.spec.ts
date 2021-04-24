import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Workspace 404 page logged out";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = "348d4226-fa12-4c6f-a624-7a597e1af129";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}`;
const loggedIn = false;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should have table layout",
      "[data-cy=table-layout-container]",
      beVisible,
    ),
    newExpectation(
      "should not show run message",
      "[data-cy=workspaces-run-msg]",
      notExist,
    ),
    newExpectation(
      "should not show workspace title",
      "[data-cy=workspace-title]",
      notExist,
    ),
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
      "should not show diff tabs",
      "[data-cy=diff-tabs]",
      notExist,
    ),
    newExpectation(
      "should show workspace 404",
      "[data-cy=404-page]",
      newShouldArgs("be.visible.and.contain", "Workspace not found"),
    ),
    newExpectation(
      "should have create workspace button",
      "[data-cy=create-workspace-404]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
