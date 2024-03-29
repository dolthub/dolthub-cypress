import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
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
  newExpectationWithClickFlow(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    newClickFlow("[data-cy=repo-database-tab]", []),
  ),

  // SAVE THE VIEW
  newExpectationWithClickFlow(
    "should show create view button",
    "[data-cy=create-view-button]",
    beVisible,
    newClickFlow(
      "[data-cy=create-view-button]",
      [typingExpectation(testViewName, "[data-cy=query-name]")],
      "[data-cy=modal-create-view-button]",
    ),
  ),
  newExpectation(
    "should have saved view listed",
    "[data-cy=workspace-commit-list]>li:first>div>a",
    beVisibleAndContain(testViewName),
  ),
  newExpectationWithClickFlow(
    "should show create commit button",
    "[data-cy=create-commit]",
    beVisible,
    newClickFlow("[data-cy=create-commit]", []),
  ),
  newExpectationWithClickFlow(
    "should be able to create commit",
    "[data-cy=create-commit-button]",
    beVisible,
    newClickFlow("[data-cy=create-commit-button]", []),
  ),
  newExpectationWithClickFlow(
    "the saved view should be rendered in the view tab",
    "[data-cy=tab-views]",
    beVisible,
    newClickFlow("[data-cy=tab-views]", [
      newExpectation(
        "should have saved view listed",
        `[data-cy=db-view-views-${testViewName}`,
        beVisibleAndContain(testViewName),
      ),
    ]),
  ),

  newExpectationWithClickFlow(
    "the saved view should be rendered",
    `[data-cy=db-view-views-${testViewName}]`,
    beVisible,
    newClickFlow(`[data-cy=db-view-views-${testViewName}]>div>button`, [
      newExpectation(
        "should have view listed",
        `[data-cy=repo-views-view-button-${testViewName}]`,
        beVisibleAndContain("Viewing"),
      ),
    ]),
  ),
];
