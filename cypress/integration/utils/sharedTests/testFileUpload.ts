import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithFileUpload,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  mergingAndDeletingBranch,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

export const testFileUpload: Tests = [
  //! NAVIGATE TO THE DATABASE TAB
  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),

  newExpectationWithClickFlows(
    "should show add table button",
    "[data-cy=repo-tables-add-table]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-tables-add-table]",
        [
          newExpectation(
            "should show file upload",
            "[data-cy=file-upload-file-upload-link]",
            beVisibleAndContain("File Upload"),
          ),
        ],
        "[data-cy=file-upload-branch-link]",
      ),
    ],
  ),

  //! CHOOSE BRANCH AND TABLE NAME
  newExpectationWithClickFlows(
    "should show File Importer page",
    "[data-cy=upload-nav]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=upload-next-button]",
        [typingExpectation("test-upload-table", "choose-table-name")],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),

  //! UPLOAD FILE
  newExpectationWithFileUpload(
    "should be able to upload file",
    "[data-cy=drop-container]",
    "./test-table.csv",
    beVisible,
  ),

  newExpectationWithClickFlows(
    "should show upload successful message",
    "[data-cy=upload-successful]",
    beVisible,
    [newClickFlow("[data-cy=upload-next-button]", [])],
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
            beVisibleAndContain("test-table"),
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
            "Creating test with changes from test.csv",
            "[data-cy=textarea-container]>textarea",
          ),
        ],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),
  ...mergingAndDeletingBranch("Import of test.csv"),

  //! CHECK UPLOADED TABLE
  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),
  newExpectation(
    "should show the uploaded table",
    "[data-cy=repo-tables-table-test-upload-table",
    beVisibleAndContain("test-upload-table"),
  ),
];
