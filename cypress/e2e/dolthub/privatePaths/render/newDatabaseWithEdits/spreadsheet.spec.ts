import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { testCreateTableWithSpreadsheetEditor } from "@utils/sharedTests/createTableWithSpreadsheetEditor";

const pageName = "Create table with spreadsheet editor";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_branch_protection";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const devices = [
    macbook15ForAppLayout(
      pageName,
      testCreateTableWithSpreadsheetEditor,
      false,
      loggedIn,
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
