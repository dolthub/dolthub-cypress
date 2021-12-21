import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithSelector,
  newExpectationWithTypeString,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  createPullRequest,
  mergingAndDeletingBranch,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

const sqlQuery = 'INSERT INTO `tablename` (`pk`, `col1`) VALUES (1, "test")';

export const testPullRequest = (forkOwnerName: string): Tests => [
  //! FORK THE DATABASE
  newExpectationWithClickFlows(
    "should show fork button",
    "[data-cy=repo-fork-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-fork-button]",
        [],
        "[data-cy=fork-confirm-button]",
      ),
    ],
  ),

  //! SHOW THE FORKED DATABASE PAGE:
  newExpectation(
    "should show the forked database page",
    "[data-cy=repo-owner-breadcrumb-link]",
    beVisibleAndContain(forkOwnerName),
  ),
  //! EDIT THE TABLE
  newExpectationWithClickFlows(
    "should execute insert query",
    "[data-cy=sql-editor-collapsed]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=sql-editor-collapsed]",
        [
          newExpectationWithTypeString(
            "should use sql console to edit table",
            "[data-cy=sql-editor-expanded]>div>div>textarea",
            beVisibleAndContain("INSERT INTO"),
            {
              value: sqlQuery,
            },
          ),
        ],
        "[data-cy=run-query-button]",
      ),
    ],
  ),

  ...createPullRequest,

  //! REDIRECT TO PARENT DATABASE
  newExpectationWithClickFlows(
    "Should have Open pull state",
    "[data-cy=pull-state-label]",
    beVisibleAndContain("Open"),
    [
      newClickFlow(
        "[data-cy=forked-parent-repo-detail] [data-cy=repo-name-breadcrumb-link]",
        [],
      ),
    ],
  ),
  newExpectation(
    "should redirect to parent database",
    "[data-cy=repo-owner-breadcrumb-link]",
    beVisibleAndContain("cypresstesting"),
  ),
  //! NAVIGATE TO PULL REQUEST PAGE
  newExpectationWithClickFlows(
    "should show navigate to pull request page",
    "[data-cy=repo-pull-requests-tab]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-pull-requests-tab]",
        [],
        "[data-cy=create-pull-request-button]",
      ),
    ],
  ),

  //! SELECT THE FROM DATABASE
  newExpectationWithClickFlows(
    "should show and select the from database",
    "[data-cy=from-repo-selector] input",
    beVisible,
    [
      newClickFlow(
        "[data-cy=from-repo-selector] input",
        [
          newExpectationWithSelector(
            "should select the fork repo",
            "[data-cy=from-repo-selector]>div>div",
            1,
            beVisibleAndContain(forkOwnerName),
          ),
        ],
        "",
      ),
    ],
  ),
  //! SELECT THE BASE BRANCH
  newExpectationWithClickFlows(
    "should show and select the base branch",
    "[data-cy=to-branch-selector] input",
    beVisible,
    [
      newClickFlow(
        "[data-cy=to-branch-selector] input",
        [
          newExpectationWithSelector(
            "should select the fork repo",
            "[data-cy=to-branch-selector]>div>div",
            1,
            beVisibleAndContain("main"),
          ),
        ],
        "",
      ),
    ],
  ),
  //! SELECT THE FROM BRANCH
  newExpectationWithClickFlows(
    "should show and select the from branch",
    "[data-cy=from-branch-selector] input",
    beVisible,
    [
      newClickFlow(
        "[data-cy=from-branch-selector] input",
        [
          newExpectationWithSelector(
            "should select the fork repo",
            "[data-cy=from-branch-selector]>div>div>div>div",
            3,
            beVisibleAndContain("cypresstesting"),
          ),
        ],
        "",
      ),
    ],
  ),

  newExpectation(
    "should show new pull form",
    "[data-cy=new-pull-page]",
    beVisible,
  ),
  typingExpectation("test pull", "[data-cy=pull-form-title-input]"),
  typingExpectation("test pull description", "[data-cy=pull-form-description]"),
  newExpectationWithClickFlows(
    "should submit the pull form",
    "[data-cy=pull-form-submit]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=pull-form-submit]",
        mergingAndDeletingBranch("test pull"),
      ),
    ],
  ),

  //! CHECK THE COMMIT IS THERE
  newExpectationWithClickFlows(
    "should be able to navigate to commit log page",
    "[data-cy=repo-commit-log-tab]",
    beVisibleAndContain("Commit Log"),
    [newClickFlow("[data-cy=repo-commit-log-tab]", [])],
  ),
  newExpectation(
    "should show the new commit",
    "[data-cy=commit-log-item]:first a:first",
    beVisibleAndContain(sqlQuery),
  ),

  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-database-tab]", [
        newExpectation(
          "should show tablename",
          "[data-cy=repo-tables-table-tablename]",
          beVisibleAndContain("tablename"),
        ),
      ]),
    ],
  ),

  newExpectation(
    "should show the inserted column",
    "[data-cy=repo-tables-table-column-col1] span",
    beVisibleAndContain("col1"),
  ),
];
