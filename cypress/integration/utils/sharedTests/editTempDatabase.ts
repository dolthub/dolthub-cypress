import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const commitMsg1 = "Adding query changes 1";

const sqlConsoleClickFlow = newClickFlow(
  "[data-cy=sql-editor-collapsed]",
  [
    newExpectation(
      "should run query",
      "[data-cy=sql-editor-expanded]",
      beVisible,
    ),
  ],
  "[data-cy=run-query-button]",
);

const createCommit = newClickFlow(
  "[data-cy=create-commit]",
  [
    newExpectationWithTypeString(
      "should change commit message",
      "textarea[name=commit-message]",
      beVisible,
      commitMsg1,
    ),
  ],
  "[data-cy=create-commit-button]",
);

export const editTempDatabase: Tests = [
  newExpectationWithClickFlows(
    "should execute sample query",
    "[data-cy=sql-editor-collapsed]",
    beVisible,
    [sqlConsoleClickFlow],
  ),
  newExpectation(
    "should navigate to workspace page",
    "[data-cy=workspace-title]",
    beVisible,
  ),
  newExpectation("should render diff tabs", "[data-cy=diff-tabs]", beVisible),
  newExpectationWithClickFlows(
    "should click create commit button",
    "[data-cy=create-commit]",
    newShouldArgs("be.visible.and.contain", "Create commit"),
    [createCommit],
  ),
  newExpectation(
    "should have data table",
    "[data-cy=repo-data-table]",
    beVisible,
  ),
  newExpectation(
    "should have new table in left nav",
    "[data-cy=repo-tables-table-tablename]",
    newShouldArgs("be.visible.and.contain", [
      "tablename",
      "Viewing",
      "pk",
      "col1",
    ]),
  ),
  newExpectationWithClickFlows(
    "should have new commit",
    "[data-cy=repo-commit-log-tab]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-commit-log-tab]", [
        newExpectation(
          "should have new commit",
          "[data-cy=commit-log-item]:first",
          newShouldArgs("be.visible.and.contain", commitMsg1),
        ),
      ]),
    ],
  ),
];
