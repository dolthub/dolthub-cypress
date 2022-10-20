import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import {
  haveLength,
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Logged in database collaborators settings page";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings/collaborators`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldFindAndContain("active-collaborators-settings-tab", "Collaborators"),
    newExpectation(
      "should have a Collaborators section with headers",
      "[data-cy=repo-settings-collab] h3",
      haveLength(2),
    ),
    shouldBeVisible("no-collabs-message"),
    shouldNotExist("collab-table"),
    shouldBeVisible("add-collab-radios"),
    shouldBeVisible("new-collab-form"),
    newExpectation(
      "should have a disabled Add button",
      "[data-cy=add-collab-modal-button]",
      newShouldArgs("be.disabled"),
    ),
  ];

  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
