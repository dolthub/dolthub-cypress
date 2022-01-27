import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../../utils/helpers";

const pageName = "Logged in database settings page with no branch and no data";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings`;
const loggedIn = true;

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

const addCollabModalClickflow = newClickFlow(
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

const deleteDatabaseModalClickflow = newClickFlow(
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

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should have Settings header",
      "[data-cy=repo-settings-header]",
      beVisible,
    ),
    newExpectation(
      "should have an Update Repo form with Database Details header",
      "[data-cy=update-repo-form] > h2",
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
    newExpectation(
      "should have a Webhooks section with header",
      "[data-cy=repo-settings-webhooks] > h2",
      beVisibleAndContain("Webhooks"),
    ),
    newExpectation(
      "should have a manage webhooks link",
      "[data-cy=repo-settings-manage-webhooks-link]",
      beVisible,
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
      [addCollabModalClickflow],
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
      [deleteDatabaseModalClickflow],
    ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
