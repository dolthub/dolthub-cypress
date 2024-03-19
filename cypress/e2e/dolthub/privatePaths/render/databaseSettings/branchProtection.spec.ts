import {
  beChecked,
  beVisibleAndContain,
  notBeChecked,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Logged in branch protection settings page";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_branch_protection";
const currentBranch = "main";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings/branch-protections/${currentBranch}`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should have an active branch protection tab",
      "[data-cy=active-branch-protections-settings-tab]",
      beVisibleAndContain("Branch Protection"),
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
      beChecked,
    ),

    newExpectation(
      "should not have prevent no pull request push checked",
      "[data-cy=prevent-non-pr-push-checkbox] input",
      notBeChecked,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
