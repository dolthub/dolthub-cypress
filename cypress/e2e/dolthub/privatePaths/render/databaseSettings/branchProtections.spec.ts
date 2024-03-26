import {
  beVisible,
  shouldBeVisible,
  shouldCheckbox,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectationWithClickFlow,
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
    shouldFindAndContain(
      "active-tab-branch-protections-settings",
      "Branch Protection",
    ),
    shouldFindAndContain(
      "branch-protection-description-text",
      "protect important branches by setting branch protection rules",
    ),

    // check the branch protection list
    shouldFindAndContain(
      "branch-name-branch_can_not_be_deleted",
      "branch_can_not_be_deleted",
    ),
    shouldFindAndContain(
      "branch-name-branch_can_not_be_force_pushed",
      "branch_can_not_be_force_pushed",
    ),
    shouldFindAndContain("branch-name-main", "main"),

    // click to edit the branch protection:branch_can_not_be_deleted-edit
    shouldFindAndContain("branch_can_not_be_deleted-edit", "Edit"),
    newExpectationWithClickFlow(
      "should have edit button",
      "[data-cy=branch_can_not_be_deleted-edit]",
      beVisible,
      newClickFlow("[data-cy=branch_can_not_be_deleted-edit]", [
        shouldFindAndContain(
          "branch-name-branch_can_not_be_deleted",
          "branch_can_not_be_deleted",
        ),
        shouldCheckbox("prevent-deletions-checkbox", true),
        shouldCheckbox("prevent-force-push-checkbox", false),
        shouldCheckbox("require-approval-checkbox", false),
        shouldCheckbox("prevent-non-pr-push-checkbox", false),
      ]),
    ),
    // go back to branch protections page
    newExpectationWithClickFlow(
      "should have breadcrumb link",
      "[data-cy=branch-protection-breadcrumbs]",
      beVisible,
      newClickFlow("[data-cy=branch-protection-breadcrumbs] a", []),
    ),
    shouldBeVisible("branch-protection-branch-selector"),

    // check the checkboxes on the branch protections page
    scrollToPosition("#main-content", "bottom"),
    shouldBeVisible("prevent-deletions-checkbox"),
    shouldBeVisible("prevent-force-push-checkbox"),
    shouldBeVisible("require-approval-checkbox"),
    shouldBeVisible("prevent-non-pr-push-checkbox"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
