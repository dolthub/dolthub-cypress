import {
  newClickFlow,
  newExpectationWithClickFlows,
  newExpectationWithSelector,
  newExpectationWithSqlConsole,
  newExpectationWithVisitPage,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  createPullRequest,
  mergingAndDeletingBranch,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

const sqlConsoleClickFlow = newClickFlow(
  "[data-cy=sql-editor-collapsed]",
  [
    newExpectationWithSqlConsole(
      "should use sql console to edit table",
      "[data-cy=sql-editor-expanded]>div>div",
      beVisibleAndContain("INSERT INTO"),
      'INSERT INTO `tablename` (`pk`, `col1`) VALUES (1, "test")',
    ),
  ],
  "[data-cy=run-query-button]",
);

export const testPullRequest = (repoName: string, ownerName: string): Tests => [
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

  //! EDIT THE TABLE
  newExpectationWithClickFlows(
    "should execute insert query",
    "[data-cy=sql-editor-collapsed]",
    beVisible,
    [sqlConsoleClickFlow],
  ),

  ...createPullRequest(),

  //! REDIRECT TO PARENT DATABASE
  newExpectationWithVisitPage(
    "should route to database page",
    "[data-cy=repo-breadcrumbs]",
    beVisibleAndContain(`${ownerName}`),
    `/repositories/${ownerName}/${repoName}`,
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

  newExpectationWithClickFlows(
    "should show the new pull request page",
    "[data-cy=new-pull-page]",
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
    "should show the from database",
    "[data-cy=from-repo-selector]>div>div>div>div>input",
    beVisible,
    [
      newClickFlow(
        "[data-cy=from-repo-selector]>div>div>div>div>input",
        [
          newExpectationWithSelector(
            "should select the fork repo",
            "[data-cy=from-repo-selector]>div>div",
            1,
            `automated_testing/${repoName}`,
            beVisibleAndContain("automated_testing"),
          ),
        ],
        "",
      ),
    ],
  ),
  //! SELECT THE BASE BRANCH
  newExpectationWithClickFlows(
    "should show the from database",
    "[data-cy=to-branch-selector]>div>div>div>div>input",
    beVisible,
    [
      newClickFlow(
        "[data-cy=to-branch-selector]>div>div>div>div>input",
        [
          newExpectationWithSelector(
            "should select the fork repo",
            "[data-cy=to-branch-selector]>div>div",
            1,
            "main",
            beVisibleAndContain("main"),
          ),
        ],
        "",
      ),
    ],
  ),
  //! SELECT THE FROM BRANCH
  newExpectationWithClickFlows(
    "should show the from database",
    "[data-cy=from-branch-selector]>div>div>div>div>input",
    beVisible,
    [
      newClickFlow(
        "[data-cy=from-branch-selector]>div>div>div>div>input",
        [
          newExpectationWithSelector(
            "should select the fork repo",
            "[data-cy=from-branch-selector]>div>div>div>div",
            3,
            "cypresstesting",
            beVisibleAndContain("cypresstesting"),
          ),
        ],
        "",
      ),
    ],
  ),

  newExpectationWithClickFlows(
    "should submit the pull form",
    "[data-cy=new-pull-page]",
    beVisible,
    [
      newClickFlow(
        "",
        [
          typingExpectation("test pull", "pull-form-title-input"),
          typingExpectation("test pull description", "pull-form-description"),
        ],
        "[data-cy=pull-form-submit]",
      ),
    ],
  ),
  ...mergingAndDeletingBranch(),
];
