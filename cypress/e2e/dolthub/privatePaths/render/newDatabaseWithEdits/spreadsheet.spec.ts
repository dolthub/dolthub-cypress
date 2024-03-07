import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { testCreateTableWithSpreadsheetEditor } from "@utils/sharedTests/createTableWithSpreadsheetEditor";
import {
  beVisible,
  beVisibleAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Create table with spreadsheet editor";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_branch_protection";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectationWithClickFlow(
      "should show add table button",
      "[data-cy=repo-tables-add-table]",
      beVisible,
      newClickFlow("[data-cy=repo-tables-add-table]", [
        newExpectation(
          "should show sql query button",
          "[data-cy=sql-query-create-table]",
          beVisibleAndContain("SQL Query"),
        ),
        newExpectation(
          "should show spreadsheet editor link",
          "[data-cy=file-upload-spreadsheet-table-link]",
          beVisibleAndContain("Spreadsheet Editor"),
        ),
        newExpectation(
          "should show file upload link",
          "[data-cy=file-upload-fileupload-table-link]",
          beVisibleAndContain("File Upload"),
        ),
      ]),
    ),

    ...testCreateTableWithSpreadsheetEditor,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
