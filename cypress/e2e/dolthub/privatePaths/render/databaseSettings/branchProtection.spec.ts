import {
  shouldBeVisible,
  shouldCheckbox,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Logged in branch protection settings page";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_branch_protection";
const currentBranch = "main";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings/branch-protections/${currentBranch}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible(
      "active-branch-protections-settings-tab",
      "Branch Protection",
    ),
    shouldCheckbox(
      "prevent-deletions-checkbox",
      true,
      "prevent deletion checked",
    ),
    shouldCheckbox(
      "prevent-force-push-checkbox",
      false,
      "prevent force push unchecked",
    ),
    shouldCheckbox(
      "require-approval-checkbox",
      true,
      "require approval checked",
    ),
    shouldCheckbox(
      "prevent-non-pr-push-checkbox",
      false,
      "prevent non pull request push unchecked",
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
