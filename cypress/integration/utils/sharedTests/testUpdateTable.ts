import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithSelector,
  newExpectationWithTypeString,
} from "../helpers";
import { Tests } from "../types";
import {
  afterUploadSteps,
  beVisible,
  beVisibleAndContain,
  preUploadSteps,
} from "./sharedFunctionsAndVariables";

const grids = [[], ["a", "b"]];
export const testUpdateTable: Tests = [
  ...preUploadSteps("spread sheet editor", "spreadsheet", "Spreadsheet Editor"),

  //! CHOOSE TO UPDATE TABLE
  newExpectationWithClickFlows(
    "should show update an existing table",
    "[data-cy=upload-table-update]>label",
    beVisibleAndContain("Update an existing table"),
    [newClickFlow("[data-cy=radio-old]", [])],
  ),

  //! CHOOSE THE TABLE TO UPDATE
  newExpectationWithClickFlows(
    "should show and select from the existing tables",
    "[data-cy=table-selector] input",
    beVisible,
    [
      newClickFlow(
        "[data-cy=table-selector] input",
        [
          newExpectationWithSelector(
            "should select the spread sheet created table",
            "[data-cy=table-selector]>div>div",
            2,
            beVisibleAndContain("TestSpreadSheetTable"),
          ),
        ],
        "[data-cy=radio-Update]",
      ),
    ],
  ),
  newExpectationWithClickFlows(
    "should show update message",
    "[data-cy=update-message]",
    beVisibleAndContain("Update TestSpreadSheetTable"),
    [newClickFlow("[data-cy=upload-next-button]", [], "")],
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
    "TestSpreadSheetTable",
    "editor.csv",
    "spreadsheet editor",
    "Create new table",
    grids[0][0],
    "spreadsheet",
  ),
];
