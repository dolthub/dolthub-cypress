import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
} from "../helpers";
import { Tests } from "../types";
import {
  afterUploadSteps,
  beVisibleAndContain,
  preUploadSteps,
} from "./sharedFunctionsAndVariables";

const spreadSheetTable = "TestSpreadSheetTable";
const grids = ["pk", "col1"];

export const testCreateTableWithSpreadsheetEditor: Tests = [
  //! USE SPREAD SHEET TO ADD TABLE
  ...preUploadSteps(
    "spread sheet editor",
    "spreadsheet",
    "Spreadsheet Editor",
    spreadSheetTable,
  ),
  newExpectationWithClickFlows(
    "should show File Importer page",
    "[data-cy=upload-title]",
    beVisibleAndContain("Upload file or create spreadsheet"),
    [newClickFlow("[data-cy=spread-sheet-button]", [])],
  ),
  newExpectationWithTypeString(
    "should show spreadsheet editor title",
    "[data-cy=spreadsheet-editor-title]",
    beVisibleAndContain("Spreadsheet Editor"),
    grids,
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
    spreadSheetTable,
    "editor.csv",
    "spreadsheet editor",
    "Create new table",
  ),
];
