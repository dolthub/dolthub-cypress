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

const testQueryName = "test-query-name";
const testQueryDescription = "test-query-description";

export const testSaveQuery: Tests = [
  // NAVIGATE TO THE DATABASE TAB
  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),

  // SAVE THE QUERY
  newExpectationWithClickFlows(
    "should show save query button",
    "[data-cy=save-query-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=save-query-button]",
        [
          typingExpectation(testQueryName, "[data-cy=query-name]"),
          typingExpectation(
            testQueryDescription,
            "[data-cy=query-description]",
          ),
        ],
        "[data-cy=query-save-button]",
      ),
    ],
  ),
  newExpectation(
    "should have saved query listed",
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
    "[data-cy=tab-queries]",
    beVisible,
    [
      newClickFlow("[data-cy=tab-queries]", [
        newExpectation(
          "should have saved query listed",
          `[data-cy=repo-query-list-query-${testQueryName}`,
          beVisibleAndContain(testQueryName),
        ),
      ]),
    ],
  ),
  newExpectationWithClickFlows(
    "the saved query description should be rendered",
    `[data-cy=repo-query-list-query-${testQueryName}]`,
    beVisible,
    [
      newClickFlow(
        `[data-cy=repo-query-list-query-${testQueryName}]>div>button`,
        [
          newExpectation(
            "should have saved query listed",
            "[data-cy=query-description]",
            beVisibleAndContain(testQueryDescription),
          ),
        ],
      ),
    ],
  ),
  //! REMOVE THE QUERY
  newExpectationWithClickFlows(
    "should be able to remove query",
    "[data-cy=remove-query-button]",
    beVisible,
    [newClickFlow("[data-cy=remove-query-button]", [])],
  ),
  ...createPullRequest,
  ...mergingAndDeletingBranch("Temporary Workspace"),
  newExpectationWithClickFlows(
    "should switch back to the database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),

  newExpectationWithClickFlows(
    "should have the query deleted",
    "[data-cy=tab-queries]",
    beVisible,
    [
      newClickFlow("[data-cy=tab-queries]", [
        newExpectation(
          "should not have removed query listed",
          `[data-cy=repo-query-list-query-${testQueryName}`,
          notExist,
        ),
        newExpectation(
          "should have no queries message showing",
          "[data-cy=repo-no-queries]",
          beVisibleAndContain("No saved queries."),
        ),
      ]),
    ],
  ),
];