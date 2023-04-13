import {
  beVisible,
  beVisibleAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
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
      newExpectation(
        "should have a Delete Database header",
        "[data-cy=modal-title]",
        beVisibleAndContain("Delete Database"),
      ),
      newExpectation(
        "should render a delete database button in modal",
        "[data-cy=submit-delete-database]",
        newShouldArgs("be.visible"),
      ),
      newExpectation(
        "should render a cancel button",
        "[data-cy=cancel-button]",
        newShouldArgs("be.visible"),
      ),
    ],
    "[data-cy=close-modal]",
  );

  const tests = [
    newExpectation(
      "should have an active Database Details tab",
      "[data-cy=active-database-settings-tab]",
      beVisibleAndContain("Database Details"),
    ),
    newExpectation(
      "should have textarea container with Description header",
      "[data-cy=textarea-container] > div",
      beVisibleAndContain("Description"),
    ),
    newExpectation(
      "should have textarea with populated description",
      "[data-cy=repo-settings-description-textarea]",
      beVisibleAndContain("empty repository for testing"),
    ),
    newExpectation(
      "should have one visibility radio button that says Public",
      "[data-cy=repo-settings-visibility-radios]",
      beVisibleAndContain("Public"),
    ),
    newExpectationWithClickFlows(
      "should have Save button",
      "[data-cy=repo-settings-submit-button]",
      beVisible,
      [
        newClickFlow("[data-cy=repo-settings-submit-button]", [
          newExpectation(
            "should change to Saved! when clicked",
            "[data-cy=repo-settings-submit-button]",
            beVisibleAndContain("Saved!"),
          ),
        ]),
      ],
    ),
    newExpectationWithScrollIntoView(
      "should have a Delete Database section with header",
      "[data-cy=repo-settings-delete-database-header]",
      beVisibleAndContain("Delete Database"),
      true,
    ),
    newExpectationWithClickFlows(
      "should have a Delete Database button that opens a modal",
      "[data-cy=delete-database-button]",
      beVisible,
      [deleteDatabaseModalClickFlow],
    ),
  ];

  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];

  // Tests work for both database settings links (/settings and /settings/database)
  runTestsForDevices({ currentPage: currentPageOne, devices, skip });
  runTestsForDevices({ currentPage: currentPageTwo, devices, skip });
});
