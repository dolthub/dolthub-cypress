import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "../helpers";
import { Tests } from "../types";
import { afterUploadSteps } from "./editRepo";
import {
  beVisible,
  beVisibleAndContain,
  checkValueInGridTests,
  getTypeInGridTests,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

const spreadSheetTable = "TestSpreadSheetTable";
const grids = [
  ["pk", "col1"],
  ["id1", "colvalue"],
];

export const testCreateTableWithSpreadsheetEditor: Tests = [
  //! CLICK ADD TABLE
  newExpectationWithClickFlows(
    "should show add table button",
    "[data-cy=repo-tables-add-table]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-tables-add-table]",
        [
          newExpectation(
            `should show and click spread sheet editor`,
            `[data-cy=file-upload-spreadsheet-table-link]`,
            beVisibleAndContain("Spreadsheet Editor"),
          ),
        ],
        `[data-cy=file-upload-spreadsheet-table-link]`,
      ),
    ],
  ),
  // CHOOSE TABLE
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

  newExpectation(
    "should show spreadsheet editor title",
    "[data-cy=spreadsheet-editor-title]",
    beVisibleAndContain("Spreadsheet Editor"),
  ),
  ...getTypeInGridTests(grids, true),
  // click the editor title to lose focus in the last cell
  newExpectationWithClickFlows(
    "should show Create a new table",
    "[data-cy=spreadsheet-editor-title]",
    beVisible,
    [newClickFlow("", [], "[data-cy=spreadsheet-editor-title]")],
  ),

  ...checkValueInGridTests(grids),
  newExpectationWithClickFlows(
    "should show upload table button",
    "[data-cy=upload-table-button]",
    beVisibleAndContain("Upload table"),
    [newClickFlow("[data-cy=upload-table-button]", [])],
  ),

  ...afterUploadSteps("editor", grids[0][0], "spreadsheet-"),
];
