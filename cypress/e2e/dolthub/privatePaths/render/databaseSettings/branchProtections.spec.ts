import {
  beChecked,
  beVisible,
  beVisibleAndContain,
  notBeChecked,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newExpectationWithClickFlow,
  newClickFlow,
  newExpectation,
  scrollToPosition,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Logged in branch protection settings page";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_branch_protection";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings/branch-protections`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should have an active branch protection tab",
      "[data-cy=active-branch-protections-settings-tab]",
      beVisibleAndContain("Branch Protection"),
    ),
    newExpectation(
      "should have text block with descriptions",
      "[data-cy=branch-protection-description-text]",
      beVisibleAndContain(
        "protect important branches by setting branch protection rules",
      ),
    ),

    // check the branch protection list
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

    // click to edit the branch protection:branch_can_not_be_deleted-edit
    newExpectation(
      "should have edit branch protection button",
      "[data-cy=branch_can_not_be_deleted-edit]",
      beVisibleAndContain("Edit"),
    ),
    newExpectationWithClickFlow(
      "should have edit button",
      "[data-cy=branch_can_not_be_deleted-edit]",
      beVisible,
      newClickFlow("[data-cy=branch_can_not_be_deleted-edit]", [
        newExpectation(
          "should show branch name: branch_can_not_be_deleted",
          "[data-cy=branch-name-branch_can_not_be_deleted]",
          beVisibleAndContain("branch_can_not_be_deleted"),
        ),
        newExpectation(
          "should have prevent deletion checked",
          "[data-cy=prevent-deletions-checkbox] input",
          beChecked,
        ),
        newExpectation(
          "should not have prevent force push checked",
          "[data-cy=prevent-force-push-checkbox] input",
          notBeChecked,
        ),

        newExpectation(
          "should have require approval checked",
          "[data-cy=require-approval-checkbox] input",
          notBeChecked,
        ),

        newExpectation(
          "should not have prevent no pull request push checked",
          "[data-cy=prevent-non-pr-push-checkbox] input",
          notBeChecked,
        ),
      ]),
    ),
    // go back to branch protections page
    newExpectationWithClickFlow(
      "should have breadcrumb link",
      "[data-cy=branch-protection-breadcrumbs]",
      beVisible,
      newClickFlow("[data-cy=branch-protection-breadcrumbs] a", []),
    ),

    newExpectation(
      "should show branch selector",
      "[data-cy=branch-protection-branch-selector]",
      beVisible,
    ),

    // check the checkboxes on the branch protections page
    scrollToPosition("#main-content", "bottom"),
    newExpectation(
      "should show branch can not be deleted checkbox",
      "[data-cy=prevent-deletions-checkbox]",
      beVisible,
    ),
    newExpectation(
      "should show branch can not be force pushed checkbox",
      "[data-cy=prevent-force-push-checkbox]",
      beVisible,
    ),
    newExpectation(
      "should show require approval checkbox",
      "[data-cy=require-approval-checkbox]",
      beVisible,
    ),
    newExpectation(
      "should show no pull request push checkbox",
      "[data-cy=prevent-non-pr-push-checkbox]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
