import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
} from "../helpers";
import { Tests } from "../types";
import { sqlConsoleEditClickFlow } from "./editRepo";
import { beVisible, beVisibleAndContain } from "./sharedFunctionsAndVariables";

const sqlQueryTable = "TestSqlCreateTable";
const createTableQuery = `CREATE TABLE ${sqlQueryTable} (pk INT,col1 VARCHAR(255),PRIMARY KEY (pk));`;

export const testCreateTableWithSqlQuery: Tests = [
  // USE SQL QUERY FOR ADDING TABLE
  newExpectationWithClickFlow(
    "should show sql query button",
    "[data-cy=sql-query-create-table]",
    beVisibleAndContain("SQL Query"),
    newClickFlow(
      "[data-cy=sql-query-create-table]",
      [
        newExpectation(
          "should show expanded sql console",
          "[data-cy=sql-editor-expanded]",
          beVisible,
        ),
      ],
      "",
    ),
  ),
  newExpectationWithClickFlow(
    "should execute insert query",
    "[data-cy=sql-editor-expanded]",
    beVisible,
    sqlConsoleEditClickFlow(createTableQuery),
  ),
  newExpectationWithClickFlow(
    "should show create commit button",
    "[data-cy=create-commit]",
    beVisible,
    newClickFlow("[data-cy=create-commit]", []),
  ),
  newExpectationWithClickFlow(
    "should be able to create commit",
    "[data-cy=create-commit-button]",
    beVisible,
    newClickFlow("[data-cy=create-commit-button]", []),
  ),
  newExpectation(
    `should have ${sqlQueryTable} listed`,
    `[data-cy=repo-tables-table-${sqlQueryTable}]`,
    beVisibleAndContain(sqlQueryTable),
  ),
];
