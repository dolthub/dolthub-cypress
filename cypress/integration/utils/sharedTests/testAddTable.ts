import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "../helpers";
import { Tests } from "../types";
import { beVisible, beVisibleAndContain } from "./sharedFunctionsAndVariables";
import { testCreateTableWithFileUpload } from "./testCreateTableWithFileUpload";
import { testCreateTableWithSpreadsheetEditor } from "./testCreateTableWithSpreadsheetEditor";
import { testCreateTableWithSqlQuery } from "./testCreateTableWithSqlQuery";

export const testAddTable: Tests = [
  //! NAVIGATE TO THE TABLES TAB
  newExpectationWithClickFlows(
    "should be able to navigate to tables tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=tab-tables]>button", [])],
  ),

  //! CLICK ADD TABLE AND SHOW 3 WAYS OF ADDING TABLE
  newExpectationWithClickFlows(
    "should show add table button",
    "[data-cy=repo-tables-add-table]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-tables-add-table]", [
        newExpectation(
          "should show sql query button",
          "[data-cy=sql-query-create-table]",
          beVisibleAndContain("SQL Query"),
        ),
        newExpectation(
          "should show spreadsheet editor link",
          "[data-cy=file-upload-spreadsheet-branch-link]",
          beVisibleAndContain("Spreadsheet Editor"),
        ),
        newExpectation(
          "should show file upload link",
          "[data-cy=file-upload-fileupload-branch-link]",
          beVisibleAndContain("File Upload"),
        ),
      ]),
    ],
  ),

  ...testCreateTableWithSqlQuery,

  ...testCreateTableWithSpreadsheetEditor,

  ...testCreateTableWithFileUpload,
];
