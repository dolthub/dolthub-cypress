import {
  newClickFlow,
  newExpectationWithClickFlows,
  newExpectationWithFileUpload,
} from "../helpers";
import { Tests } from "../types";
import {
  afterUploadSteps,
  beVisible,
  preUploadSteps,
} from "./sharedFunctionsAndVariables";

const tableName = "TestFileUploadTable";
export const testFileUpload: Tests = [
  ...preUploadSteps("file upload link", "fileupload", "File Upload", tableName),

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

  ...afterUploadSteps(
    tableName,
    `${tableName}.csv`,
    `Import of ${tableName}.csv`,
  ),
];
