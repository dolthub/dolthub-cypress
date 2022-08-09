import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

const testViewName = "test-view-name";

export const testViewQuery: Tests = [
  // NAVIGATE TO THE DATABASE TAB
  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),

  // SAVE THE VIEW
  newExpectationWithClickFlows(
    "should show create view button",
    "[data-cy=create-view-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=create-view-button]",
        [typingExpectation(testViewName, "[data-cy=query-name]")],
        "[data-cy=modal-create-view-button]",
      ),
    ],
  ),
  newExpectation(
    "should have saved view listed",
    "[data-cy=workspace-commit-list]>li:first>div>a",
    beVisibleAndContain(testViewName),
  ),
  newExpectationWithClickFlows(
    "should show create commit button",
    "[data-cy=create-commit]",
    beVisible,
    [newClickFlow("[data-cy=create-commit]", [])],
  ),
  newExpectationWithClickFlows(
    "should be able to create commit",
    "[data-cy=create-commit-button]",
    beVisible,
    [newClickFlow("[data-cy=create-commit-button]", [])],
  ),
  newExpectationWithClickFlows(
    "the saved view should be rendered in the view tab",
    "[data-cy=tab-views]",
    beVisible,
    [
      newClickFlow("[data-cy=tab-views]", [
        newExpectation(
          "should have saved view listed",
          `[data-cy=repo-view-views-${testViewName}`,
          beVisibleAndContain(testViewName),
        ),
      ]),
    ],
  ),

  newExpectationWithClickFlows(
    "the saved view should be rendered",
    `[data-cy=repo-view-views-${testViewName}]`,
    beVisible,
    [
      newClickFlow(`[data-cy=repo-view-views-${testViewName}]>div>button`, [
        newExpectation(
          "should have view listed",
          `[data-cy=repo-views-view-button-${testViewName}]`,
          beVisibleAndContain("Viewing"),
        ),
      ]),
    ],
  ),
];
