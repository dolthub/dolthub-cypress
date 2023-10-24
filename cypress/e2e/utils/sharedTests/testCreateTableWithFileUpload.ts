import {
  newClickFlow,
  newExpectationWithClickFlows,
  newExpectationWithFileUpload,
} from "../helpers";
import { Tests } from "../types";
import { afterUploadSteps, preUploadSteps } from "./editRepo";
import {
  beVisible,
  beVisibleAndContain,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

const tableName = "TestFileUploadTable";
export const testCreateTableWithFileUpload: Tests = [
  ...preUploadSteps("file upload link", "fileupload", "File Upload"),
  //! CHOOSE TABLE
  newExpectationWithClickFlows(
    "should show Create a new table",
    "[data-cy=upload-table-create]",
    beVisibleAndContain("Create a new table"),
    [
      newClickFlow(
        "",
        [typingExpectation(tableName, "[data-cy=choose-table-name]")],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),
  //! UPLOAD FILE
  newExpectationWithFileUpload(
    "should be able to upload file",
    "[data-cy=drop-container]",
    "./TestFileUploadTable.csv",
    beVisible,
  ),

  ...afterUploadSteps(`${tableName}.csv`, "Col1"),
];
