import { testFileUpload } from "cypress/integration/utils/sharedTests/testFileUpload";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithSpreadSheetEditor,
} from "../helpers";
import { Tests } from "../types";
import {
  afterUploadSteps,
  beVisible,
  beVisibleAndContain,
  createPullRequest,
  mergingAndDeletingBranch,
  preUploadSteps,
  sqlConsoleEditClickFlow,
} from "./sharedFunctionsAndVariables";

const createTableQuery =
  "CREATE TABLE TestSqlCreateTable (pk INT,col1 VARCHAR(255),PRIMARY KEY (pk));";
const queryType = "CREATE TABLE";
const tableName = "TestSpreadSheetTable";

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
    "should have TestSqlCreateTable listed",
    "[data-cy=repo-tables-table-TestSqlCreateTable]",
    beVisibleAndContain("TestSqlCreateTable"),
  ),

  //! USE SPREAD SHEET TO ADD TABLE
  ...preUploadSteps(
    "spread sheet editor",
    "spreadsheet",
    "Spreadsheet Editor",
    tableName,
  ),
  newExpectationWithClickFlows(
    "should show File Importer page",
    "[data-cy=upload-title]",
    beVisibleAndContain("Upload file or create spreadsheet"),
    [newClickFlow("[data-cy=spread-sheet-button]", [])],
  ),
  newExpectationWithSpreadSheetEditor(
    "should show spreadsheet editor title",
    "[data-cy=spreadsheet-editor-title]",
    beVisibleAndContain("Spreadsheet Editor"),
    "col1",
  ),
  newExpectationWithClickFlows(
    "should show upload table button",
    "[data-cy=upload-table-button]",
    beVisibleAndContain("Upload table"),
    [newClickFlow("[data-cy=upload-table-button]", [])],
  ),

  newExpectationWithClickFlows(
    "should show upload successful message",
    "[data-cy=spreadsheet-upload-successful]",
    beVisibleAndContain("Upload successful"),
    [
      newClickFlow(
        "",
        [
          newExpectation(
            "should show uploaded file",
            "[data-cy=file-name]",
            beVisibleAndContain("editor.csv"),
          ),
        ],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),
  ...afterUploadSteps(
    tableName,
    "editor.csv",
    "spreadsheet editor",
    "Create new table",
  ),

  //! USE FILE UPLOAD TO ADD TABLE
  ...testFileUpload,
];
