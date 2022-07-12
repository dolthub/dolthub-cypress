import {
  beVisible,
  beVisibleAndContain,
  exist,
  notExist,
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
const currentRepo = "repo_docs_no_tables";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings/branch-protections`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
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
              "should select the master branch",
              "[data-cy=branch-protection-branch-selector]>div>div>div>div>div",
              1,
              beVisibleAndContain("master"),
            ),
          ],
          "",
        ),
      ],
    ),
    newExpectationWithClickFlows(
      "should check the delete protection checkbox",
      "[data-cy=delete-protection-checkbox]",
      exist,
      [newClickFlow("[data-cy=delete-protection-checkbox]", [])],
    ),
    newExpectation(
      "should have delete branch protection rule description",
      "[data-cy=delete-branch-rule-description]",
      beVisibleAndContain(
        "Prevents database collaborators from deleting branch.",
      ),
    ),
    newExpectationWithClickFlows(
      "should save the branch protection settings",
      "[data-cy=branch-protection-submit-button]",
      beVisible,
      [newClickFlow("[data-cy=branch-protection-submit-button]", [])],
    ),
    newExpectation(
      "should have protected branches list title",
      "[data-cy=protected-branch-list-title]",
      beVisibleAndContain("Protected Branches"),
    ),
    newExpectation(
      "should have master branch listed",
      "[data-cy=branch-name]",
      beVisibleAndContain("master"),
    ),
    newExpectation(
      "should have delete protection",
      "[data-cy=protection-rule]",
      beVisibleAndContain("Cannot delete"),
    ),
    newExpectationWithClickFlows(
      "should delete the protection",
      "[data-cy=delete-rule-button]",
      beVisible,
      [newClickFlow("[data-cy=delete-rule-button]", [])],
    ),
    newExpectation(
      "should not have master branch listed",
      "[data-cy=branch-name]",
      notExist,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
