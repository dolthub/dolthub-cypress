import { newClickFlow, newExpectationWithClickFlow } from "@utils/helpers";
import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
} from "./sharedFunctionsAndVariables";

export const testCreatePullModal = [
  newExpectationWithClickFlow(
    "should show button dropdown arrow",
    "[data-cy=button-dropdown-arrow]",
    beVisible,
    newClickFlow(
      "[data-cy=button-dropdown-arrow]",
      [
        shouldBeVisible("commit-directly-button"),
        shouldBeVisible("create-pull-request-button"),
      ],
      "[data-cy=create-pull-request-button]",
    ),
  ),

  newExpectationWithClickFlow(
    "should show create pull modal",
    "[data-cy=create-pull]",
    beVisible,
    newClickFlow(
      "[data-cy=create-pull]",
      [
        shouldFindAndContain("modal-title", "Create pull request"),
        shouldBeVisible("create-pull-form"),
        shouldBeVisible("new-branch-name-input"),
        shouldBeVisible("create-pull-button"),
      ],
      "[data-cy=close-modal]",
    ),
  ),
];
