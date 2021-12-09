import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import { mergingAndDeletingBranch } from "./testDocs";
import { typingExpectation } from "./testIssues";

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);
const testQueryName = "test-query-name";
const testQueryDescription = "test-query-description";

const createPullRequest = () => [
  newExpectationWithClickFlows(
    "should show create pull request button",
    "[data-cy=create-pull]",
    beVisible,
    [newClickFlow("[data-cy=create-pull]", [])],
  ),
  newExpectationWithClickFlows(
    "should be able to create pull request",
    "[data-cy=create-pull-button]",
    beVisible,
    [newClickFlow("[data-cy=create-pull-button]", [])],
  ),
];

export const testSaveQuery: Tests = [
  //! SAVE THE QUERY
  newExpectationWithClickFlows(
    "should show save query button",
    "[data-cy=save-query-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=save-query-button]",
        [
          typingExpectation(testQueryName, "query-name", ""),
          typingExpectation(testQueryDescription, "query-description", ""),
        ],
        "[data-cy=query-save-button]",
      ),
    ],
  ),
  newExpectation(
    "should have saved query listed",
    "[data-cy=workspace-commit-list]>li>div>a",
    beVisibleAndContain(testQueryName),
  ),
  ...createPullRequest(),
  ...mergingAndDeletingBranch("Changes", "from", "workspace"),
  newExpectationWithClickFlows(
    "should switch back to the database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
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
    "data-cy=[remove-query-button]",
    beVisible,
    [newClickFlow("data-cy=[remove-query-button]", [])],
  ),
  ...createPullRequest(),
  ...mergingAndDeletingBranch("Changes", "from", "workspace"),
  newExpectationWithClickFlows(
    "should switch back to the database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),
  newExpectationWithClickFlows(
    "should switch back to the database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),

  newExpectationWithClickFlows(
    "the removed query should not be shown in the queries tab",
    "[data-cy=tab-queries]",
    beVisible,
    [
      newClickFlow("[data-cy=tab-queries]", [
        newExpectation(
          "should not have removed query listed",
          `[data-cy=repo-query-list-query-${testQueryName}`,
          notExist,
        ),
      ]),
    ],
  ),
];
