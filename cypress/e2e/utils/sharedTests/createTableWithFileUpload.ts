import {
  newClickFlow,
  newExpectationWithClickFlow,
  newExpectationWithFileUpload,
} from "../helpers";
import { Tests } from "../types";
import { afterUploadSteps, preUploadSteps } from "./editRepo";
import {
  beVisible,
  beVisibleAndContain,
  shouldTypeString,
} from "./sharedFunctionsAndVariables";

const tableName = "TestFileUploadTable";
export const testCreateTableWithFileUpload: Tests = [
  ...preUploadSteps("file upload link", "fileupload", "File Upload"),
  // CHOOSE TABLE
  newExpectationWithClickFlow(
    "should show Create a new table",
    "[data-cy=upload-table-create]",
    beVisibleAndContain("Create a new table"),
    newClickFlow(
      "",
      [shouldTypeString("choose-table-name", tableName)],
      "[data-cy=upload-next-button]",
    ),
  ),
  // UPLOAD FILE
  newExpectationWithFileUpload(
    "should be able to upload file",
    "[data-cy=drop-container]",
    "./TestFileUploadTable.csv",
    beVisible,
  ),

  ...afterUploadSteps(`${tableName}.csv`, "Col1"),
];
