import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const commitMsg1 = `Run SQL query: CREATE TABLE tablename (
  pk INT,
  col1 VARCHAR(255),
  PRIMARY KEY (pk)
);`;

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
    newExpectation(
      "should show create commit form",
      "[data-cy=create-commit-form]",
      beVisible,
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
      newClickFlow(
        "[data-cy=repo-commit-log-tab]",
        [
          newExpectation(
            "should have new commit",
            "[data-cy=commit-log-item]:first",
            newShouldArgs("be.visible.and.contain", commitMsg1),
          ),
        ],
        "[data-cy=repo-database-tab]",
      ),
    ],
  ),
];
