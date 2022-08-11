import {
  beChecked,
  beVisible,
  beVisibleAndContain,
  notBeChecked,
} from "cypress/integration/utils/sharedTests/sharedFunctionsAndVariables";
import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithSelector,
} from "../../../../../utils/helpers";

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
      "[data-cy=branch-protection-branch-selector]",
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
            newExpectationWithSelector(
              "should select the branch_can_not_be_deleted branch",
              "[data-cy=branch-protection-branch-selector]>div>div>div>div>div",
              1,
              beVisibleAndContain("branch_can_not_be_deleted"),
            ),
          ],
          "",
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

    newExpectationWithClickFlows(
      "should show and select the branch",
      "[data-cy=branch-protection-branch-selector] input",
      beVisible,
      [
        newClickFlow(
          "[data-cy=branch-protection-branch-selector]>div>div",
          [
            newExpectationWithSelector(
              "should select the branch_can_not_be_deleted branch",
              "[data-cy=branch-protection-branch-selector]>div>div>div>div>div",
              2,
              beVisibleAndContain("branch_can_not_be_force_pushed"),
            ),
          ],
          "",
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

    newExpectation(
      "should have protected branches list title",
      "[data-cy=protected-branch-list-title]",
      beVisibleAndContain("Protected Branches"),
    ),
    newExpectation(
      "should have branch_can_not_be_deleted branch listed",
      "[data-cy=branch-name]",
      beVisibleAndContain("branch_can_not_be_deleted"),
    ),
    newExpectation(
      "should have branch_can_not_be_deleted branch listed",
      "[data-cy=branch-name-branch_can_not_be_deleted]",
      beVisibleAndContain("branch_can_not_be_deleted"),
    ),

    newExpectation(
      "should have delete protection",
      "[data-cy=protection-rule]",
      beVisibleAndContain("Cannot delete"),
    ),

    newExpectation(
      "should have branch_can_not_be_deleted branch listed",
      "[data-cy=branch-name-branch_can_not_be_force_pushed]",
      beVisibleAndContain("branch_can_not_be_force_pushed"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
