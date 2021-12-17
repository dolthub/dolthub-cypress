import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  createPullRequest,
  mergingAndDeletingBranch,
  sqlConsoleEditClickFlow,
} from "./sharedFunctionsAndVariables";

const sqlQueryTable = "TestSqlCreateTable";
const createTableQuery = `CREATE TABLE ${sqlQueryTable} (pk INT,col1 VARCHAR(255),PRIMARY KEY (pk));`;
const queryType = "CREATE TABLE";

export const testCreateTableWithSqlQuery: Tests = [
  //! USE SQL QUERY FOR ADDING TABLE
  newExpectationWithClickFlows(
    "should show sql query button",
    "[data-cy=sql-query-create-table]",
    beVisibleAndContain("SQL Query"),
    [
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
    ],
  ),
  newExpectationWithClickFlows(
    "should execute insert query",
    "[data-cy=sql-editor-expanded]",
    beVisible,
    [sqlConsoleEditClickFlow(queryType, createTableQuery)],
  ),
  ...createPullRequest,
  ...mergingAndDeletingBranch("Changes from workspace"),
  //! NAVIGATE TO THE DATABASE TAB
  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),
  newExpectation(
    `should have ${sqlQueryTable} listed`,
    `[data-cy=repo-tables-table-${sqlQueryTable}]`,
    beVisibleAndContain(sqlQueryTable),
  ),
];
