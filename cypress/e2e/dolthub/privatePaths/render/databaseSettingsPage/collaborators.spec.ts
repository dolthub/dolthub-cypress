import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import {
  beVisible,
  beVisibleAndContain,
  notExist,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Logged in database collaborators settings page";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings/collaborators`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const addCollabModalClickFlow = newClickFlow(
    "[data-cy=add-collab-button]",
    [
      newExpectation(
        "should have a Add Collaborator header",
        "[data-cy=modal-title]",
        beVisibleAndContain("Add Collaborator"),
      ),
      newExpectation(
        "should have two radio options",
        "[data-cy=add-collab-radios]",
        beVisible,
      ),
      newExpectation(
        "should have a New Collaborator form",
        "[data-cy=new-collab-form]",
        beVisible,
      ),
      newExpectation(
        "should have a disabled Add button",
        "[data-cy=add-collab-modal-button]",
        newShouldArgs("be.disabled"),
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
      "should have an active Collaborators tab",
      "[data-cy=active-collaborators-settings-tab]",
      beVisibleAndContain("Collaborators"),
    ),
    newExpectation(
      "should have a Collaborators section with header",
      "[data-cy=repo-settings-collab] > h2",
      beVisibleAndContain("Collaborators"),
    ),
    newExpectation(
      "should have a no collaborators section",
      "[data-cy=collab-table-no-collabs]",
      beVisible,
    ),
    newExpectation(
      "should not have a collaborators table",
      "[data-cy=collab-table]",
      notExist,
    ),
    newExpectationWithClickFlows(
      "should have an Add Collaborator button that opens a modal",
      "[data-cy=add-collab-button]",
      beVisible,
      [addCollabModalClickFlow],
    ),
  ];

  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
