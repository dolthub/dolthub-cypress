import {
  beVisible,
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Logged in database settings page";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPageOne = `repositories/${currentOwner}/${currentRepo}/settings`;
const currentPageTwo = `${currentPageOne}/database`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const deleteDatabaseModalClickFlow = newClickFlow(
    "[data-cy=delete-database-button]",
    [
      shouldFindAndContain("modal-title", "Delete database"),
      shouldBeVisible("submit-delete-database"),
    ],
    "[data-cy=close-modal]",
  );

  const tests = [
    shouldFindAndContain("active-tab-database-settings", "Database Details"),
    newExpectation(
      "should have textarea container with Description header",
      "[data-cy=textarea-container] > div",
      beVisibleAndContain("Description"),
    ),
    shouldFindAndContain(
      "repo-settings-description-textarea",
      "empty repository for testing",
    ),
    shouldFindAndContain("repo-settings-visibility-radios", "Public"),
    newExpectationWithScrollIntoView(
      "should scroll to the Save button",
      "[data-cy=repo-settings-submit-button]",
      beVisibleAndContain("Save changes"),
      true,
    ),
    newExpectationWithScrollIntoView(
      "should have a Delete Database section with header",
      "[data-cy=repo-settings-delete-database-header]",
      beVisibleAndContain("Delete Database"),
      true,
    ),
    newExpectationWithClickFlow(
      "should have a Delete Database button that opens a modal",
      "[data-cy=delete-database-button]",
      beVisible,
      deleteDatabaseModalClickFlow,
    ),
  ];

  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];

  // Tests work for both database settings links (/settings and /settings/database)
  runTestsForDevices({ currentPage: currentPageOne, devices, skip, loggedIn });
  runTestsForDevices({ currentPage: currentPageTwo, devices, skip, loggedIn });
});
