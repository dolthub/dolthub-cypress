import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  createPullRequest,
  mergingAndDeletingBranch,
  notExist,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

const testQueryName = "test-view-name";

export const testViewQuery: Tests = [
  // NAVIGATE TO THE DATABASE TAB
  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),

  // SAVE THE QUERY
  newExpectationWithClickFlows(
    "should show view query button",
    "[data-cy=create-view-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=create-view-button]",
        [typingExpectation(testQueryName, "[data-cy=query-name]")],
        "[data-cy=modal-create-view-button]",
      ),
    ],
  ),
  newExpectation(
    "should have saved view listed",
    "[data-cy=workspace-commit-list]>li:first>div>a",
    beVisibleAndContain(testQueryName),
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
    "the saved query should be rendered in the queries tab",
    "[data-cy=tab-views]",
    beVisible,
    [
      newClickFlow("[data-cy=tab-views]", [
        newExpectation(
          "should have saved view listed",
          `[data-cy=repo-view-views-${testQueryName}`,
          beVisibleAndContain(testQueryName),
        ),
      ]),
    ],
  ),

  newExpectationWithClickFlows(
    "the saved query description should be rendered",
    `[data-cy=repo-view-views-${testQueryName}]`,
    beVisible,
    [
      newClickFlow(`[data-cy=repo-view-views-${testQueryName}]>div>button`, [
        newExpectation(
          "should have view query listed",
          `[data-cy=repo-views-view-button-${testQueryName}]`,
          beVisibleAndContain("Viewing"),
        ),
      ]),
    ],
  ),
];
