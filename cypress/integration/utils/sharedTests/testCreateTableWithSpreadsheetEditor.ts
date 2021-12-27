import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "../helpers";
import { Tests } from "../types";
import {
  afterUploadSteps,
  beVisibleAndContain,
  getTypeInGridTests,
  preUploadSteps,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

const spreadSheetTable = "TestSpreadSheetTable";
const grids = [
  ["pk", "col1"],
  ["id1", "colvalue"],
];

export const testCreateTableWithSpreadsheetEditor: Tests = [
  //! USE SPREAD SHEET TO ADD TABLE
  ...preUploadSteps("spread sheet editor", "spreadsheet", "Spreadsheet Editor"),

  //! CHOOSE TABLE
  newExpectationWithClickFlows(
    "should show Create a new table",
    "[data-cy=upload-table-create]",
    beVisibleAndContain("Create a new table"),
    [
      newClickFlow(
        "",
        [typingExpectation(spreadSheetTable, "[data-cy=choose-table-name]")],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),

  newExpectationWithClickFlows(
    "should show File Importer page",
    "[data-cy=upload-title]",
    beVisibleAndContain("Upload file or create spreadsheet"),
    [newClickFlow("[data-cy=spread-sheet-button]", [])],
  ),
  newExpectation(
    "should show spreadsheet editor title",
    "[data-cy=spreadsheet-editor-title]",
    beVisibleAndContain("Spreadsheet Editor"),
  ),
  ...getTypeInGridTests(grids, true),
  newExpectationWithClickFlows(
    "should show upload table button",
    "[data-cy=upload-table-button]",
    beVisibleAndContain("Upload table"),
    [newClickFlow("[data-cy=upload-table-button]", [])],
  ),

  ...afterUploadSteps(
    spreadSheetTable,
    "editor",
    "spreadsheet editor",
    "Create new table",
    grids[0][0],
    "spreadsheet-",
  ),
];
