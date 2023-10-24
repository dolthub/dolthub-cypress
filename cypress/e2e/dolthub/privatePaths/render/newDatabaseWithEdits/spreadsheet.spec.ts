import { createTempDatabase } from "@sharedTests/createTempDatabase";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  beVisibleAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";
import { testCreateTableWithSpreadsheetEditor } from "@utils/sharedTests/testCreateTableWithSpreadsheetEditor";

const pageName = "Create, edit tables, teardown database";
const currentPage = "/profile/new-repository";
const loggedIn = true;

const randomNum = Math.ceil(Math.random() * 10000);
const repoName = `temp_db_${randomNum}`;
const ownerName = "cypresstesting";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    ...createTempDatabase(repoName, ownerName),
    // CLICK ADD TABLE AND SHOW 3 WAYS OF ADDING TABLE
    newExpectationWithClickFlows(
      "should open left nav",
      "[data-cy=left-nav-toggle-icon]",
      beVisible,
      [newClickFlow("[data-cy=left-nav-toggle-icon]", [])],
    ),
    newExpectationWithClickFlows(
      "should show add table button",
      "[data-cy=repo-tables-add-table]",
      beVisible,
      [
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
      ],
    ),

    ...testCreateTableWithSpreadsheetEditor,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
