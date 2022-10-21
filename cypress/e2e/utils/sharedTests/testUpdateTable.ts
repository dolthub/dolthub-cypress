import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithSelector,
} from "../helpers";
import { Tests } from "../types";
import { mergingAndDeletingBranch, preUploadSteps } from "./editRepo";
import {
  beVisible,
  beVisibleAndContain,
  getTypeInGridTests,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

const grids = [
  ["pk", "col1"],
  ["id1", "colvalue"],
  ["a", "b"],
];

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
            "[data-cy=table-selector]>div>div div",
            7,
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
  newExpectationWithClickFlows(
    "should show upload page",
    "[data-cy=spread-sheet-button]",
    beVisible,
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
  //! REVIEW CHANGES
  newExpectationWithClickFlows(
    "should show Review your changes message",
    "[data-cy=review-title]",
    beVisibleAndContain("Review your changes"),
    [
      newClickFlow(
        "",
        [
          newExpectation(
            "should match the file name",
            "[data-cy=file-name]",
            beVisibleAndContain("editor.csv"),
          ),
        ],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),
  //! COMMIT
  newExpectationWithClickFlows(
    "should show Commit changes message",
    "[data-cy=commit-title]",
    beVisibleAndContain("Commit changes"),
    [
      newClickFlow(
        "",
        [
          typingExpectation(
            `Creating test with changes from updating TestSpreadSheetTable`,
            "[data-cy=textarea-container]>textarea",
          ),
        ],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),
  ...mergingAndDeletingBranch("Create new table"),
  //! CHECK UPDATED TABLE
  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),
];
