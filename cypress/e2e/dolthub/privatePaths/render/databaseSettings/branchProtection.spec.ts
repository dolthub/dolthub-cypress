import {
  shouldCheckbox,
  shouldFindAndContain,
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
    shouldFindAndContain(
      "active-tab-branch-protections-settings",
      "Branch Protection",
    ),
    shouldCheckbox("prevent-deletions-checkbox", true),
    shouldCheckbox("prevent-force-push-checkbox", false),
    shouldCheckbox("require-approval-checkbox", true),
    shouldCheckbox("prevent-non-pr-push-checkbox", false),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
