import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
} from "../helpers";
import { Tests } from "../types";
import { testCreateTableWithFileUpload } from "./createTableWithFileUpload";
import { testCreateTableWithSpreadsheetEditor } from "./createTableWithSpreadsheetEditor";
import { testCreateTableWithSqlQuery } from "./createTableWithSqlQuery";
import { beVisible, beVisibleAndContain } from "./sharedFunctionsAndVariables";

export const testAddTable: Tests = [
  // CLICK ADD TABLE AND SHOW 3 WAYS OF ADDING TABLE
  newExpectationWithClickFlow(
    "should open left nav",
    "[data-cy=left-nav-toggle-icon]",
    beVisible,
    newClickFlow("[data-cy=left-nav-toggle-icon]", []),
  ),
  newExpectationWithClickFlow(
    "should show add table button",
    "[data-cy=repo-tables-add-table]",
    beVisible,
    newClickFlow("[data-cy=repo-tables-add-table]", [
      newExpectation(
        "should show sql query button",
        "[data-cy=sql-query-create-table]",
        beVisibleAndContain("SQL Query"),
      ),
      newExpectation(
        "should show spreadsheet editor link",
        "[data-cy=file-upload-spreadsheet-table-link]",
        beVisibleAndContain("Spreadsheet Editor"),
      ),
      newExpectation(
        "should show file upload link",
        "[data-cy=file-upload-fileupload-table-link]",
        beVisibleAndContain("File Upload"),
      ),
    ]),
  ),

  ...testCreateTableWithSqlQuery,

  ...testCreateTableWithSpreadsheetEditor,

  ...testCreateTableWithFileUpload,
];
