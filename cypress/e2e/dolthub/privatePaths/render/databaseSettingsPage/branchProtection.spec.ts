import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  scrollToPosition,
} from "../../../../utils/helpers";
import {
  beChecked,
  beVisible,
  beVisibleAndContain,
  notBeChecked,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName =
  "Logged in branch protection settings page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_branch_protection";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings/branch-protections`;
const loggedIn = true;

describe(`${pageName} renders branch protection settings`, () => {
  const tests = [
    newExpectation(
      "should have a branch protection tab",
      "[data-cy=branch-protection-settings-button]",
      beVisibleAndContain("Branch Protection"),
    ),
    newExpectation(
      "should have text block with descriptions",
      "[data-cy=branch-protection-description-text]",
      beVisibleAndContain(
        "protect important branches by setting branch protection rules",
      ),
    ),
    newExpectation(
      "should have branch name title for branch selector",
      "[data-cy=branch-name-title]",
      beVisibleAndContain("Branch name"),
    ),
    newExpectation(
      "should have branch selector",
      "[data-cy=branch-protection-branch-selector] input",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "should show and select the branch",
      "[data-cy=branch-protection-branch-selector] input",
      beVisible,
      [
        newClickFlow(
          "[data-cy=branch-protection-branch-selector]>div>div",
          [
            newExpectation(
              "should select the branch_can_not_be_deleted branch",
              "[data-cy=branch_can_not_be_deleted]",
              beVisibleAndContain("branch_can_not_be_deleted"),
            ),
          ],
          "[data-cy=branch_can_not_be_deleted]",
        ),
      ],
    ),
    newExpectation(
      "should have prevent deletion checked",
      "[data-cy=prevent-deletions-checkbox]",
      beChecked,
    ),
    newExpectation(
      "should not have prevent force push checked",
      "[data-cy=prevent-force-push-checkbox]",
      notBeChecked,
    ),

    scrollToPosition("#main-content", "top"),

    newExpectationWithClickFlows(
      "should show and select the branch",
      "[data-cy=branch-protection-branch-selector]",
      beVisible,
      [
        newClickFlow(
          "[data-cy=branch-protection-branch-selector]>div>div",
          [
            newExpectation(
              "should select the branch_can_not_be_deleted branch",
              "[data-cy=branch_can_not_be_force_pushed]",
              beVisibleAndContain("branch_can_not_be_force_pushed"),
            ),
          ],
          "[data-cy=branch_can_not_be_force_pushed]",
        ),
      ],
    ),
    newExpectation(
      "should have prevent deletion checked",
      "[data-cy=prevent-deletions-checkbox]",
      beChecked,
    ),
    newExpectation(
      "should have prevent force push checked",
      "[data-cy=prevent-force-push-checkbox]",
      beChecked,
    ),

    scrollToPosition("#main-content", "top"),

    newExpectationWithClickFlows(
      "should show and select the branch",
      "[data-cy=branch-protection-branch-selector]",
      beVisible,
      [
        newClickFlow(
          "[data-cy=branch-protection-branch-selector]>div>div",
          [
            newExpectation(
              "should select the main branch",
              "[data-cy=main]",
              beVisibleAndContain("main"),
            ),
          ],
          "[data-cy=main]",
        ),
      ],
    ),
    newExpectation(
      "should have prevent deletion checked",
      "[data-cy=prevent-deletions-checkbox]",
      beChecked,
    ),
    newExpectation(
      "should have require approval checked",
      "[data-cy=require-approval-checkbox]",
      beChecked,
    ),
    scrollToPosition("#main-content", "bottom"),
    newExpectation(
      "should have protected branches list title",
      "[data-cy=protected-branch-list-title]",
      beVisibleAndContain("Protected Branches"),
    ),
    newExpectation(
      "should have branch_can_not_be_deleted branch listed",
      "[data-cy=branch-name-branch_can_not_be_deleted]",
      beVisibleAndContain("branch_can_not_be_deleted"),
    ),
    newExpectation(
      "should have branch_can_not_be_force_pushed branch listed",
      "[data-cy=branch-name-branch_can_not_be_force_pushed]",
      beVisibleAndContain("branch_can_not_be_force_pushed"),
    ),
    newExpectation(
      "should have main branch listed",
      "[data-cy=branch-name-main]",
      beVisibleAndContain("main"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});