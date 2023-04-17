import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "@utils/helpers";
import { beVisible, beVisibleAndContain } from "./sharedFunctionsAndVariables";

export const testCreatePullModal = [
  newExpectation(
    "should have button with dropdown",
    "[data-cy=button-dropdown-arrow]",
    beVisible,
  ),
  newExpectationWithClickFlows(
    "should show button dropdown arrow",
    "[data-cy=button-dropdown-arrow]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=button-dropdown-arrow]",
        [
          newExpectation(
            "should show commit directly button",
            "[data-cy=commit-directly-button]",
            beVisible,
          ),
          newExpectation(
            "should show create pull button",
            "[data-cy=create-pull-request-button]",
            beVisible,
          ),
        ],
        "[data-cy=create-pull-request-button]",
      ),
    ],
  ),

  newExpectationWithClickFlows(
    "should show create pull button",
    "[data-cy=create-pull]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=create-pull]",
        [
          newExpectation(
            "should show modal title",
            "[data-cy=modal-title]",
            beVisibleAndContain("Create pull request"),
          ),
          newExpectation(
            "should show create pull form",
            "[data-cy=create-pull-form]",
            beVisible,
          ),
          newExpectation(
            "should have new branch input",
            "[data-cy=new-branch-name-input]",
            beVisible,
          ),
          newExpectation(
            "should have create pull button",
            "[data-cy=create-pull-button]",
            beVisible,
          ),
        ],
        "[data-cy=close-modal]",
      ),
    ],
  ),
];
