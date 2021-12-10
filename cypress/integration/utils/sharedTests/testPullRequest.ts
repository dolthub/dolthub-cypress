import {
  newClickFlow,
  newExpectationWithClickFlows,
  newExpectationWithSelector,
  newExpectationWithURL,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  createPullRequest,
  mergingAndDeletingBranch,
  typingExpectation,
} from "./sharedFunctionsAndVariables";

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
    "should show edit table button",
    "[data-cy=repo-tables-table-tablename-edit]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-tables-table-tablename-edit]",
        [],
        "[data-cy=SQL-Query-edit-button]",
      ),
    ],
  ),
  newExpectationWithClickFlows(
    "should show run query button",
    "[data-cy=run-query-button]",
    beVisible,
    [newClickFlow("[data-cy=run-query-button]", [])],
  ),
  ...createPullRequest(),

  //! REDIRECT TO PARENT DATABASE
  newExpectationWithURL(
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
  newExpectationWithSelector(
    "should select the fork repo",
    "[data-cy=from-repo-selector]>div>div>div>div>input",
    `automated_testing`,
    beVisibleAndContain("automated_testing"),
  ),
  //! SELECT THE BASE BRANCH
  newExpectationWithSelector(
    "should select the main branch",
    "[data-cy=to-branch-selector]>div>div>div>div>input",
    "main",
    beVisibleAndContain("main"),
  ),
  //! SELECT THE BASE BRANCH
  newExpectationWithSelector(
    "should select the main branch",
    "[data-cy=to-branch-selector]>div>div>div>div>input",
    `cypresstesting`,
    beVisibleAndContain("cypresstesting"),
  ),

  newExpectationWithClickFlows(
    "should submit the pull form",
    "[data-cy=new-pull-page]",
    beVisible,
    [
      newClickFlow(
        "",
        [
          typingExpectation("test pull", "pull-form-input"),
          typingExpectation("test pull description", "pull-form-description"),
        ],
        "[data-cy=pull-form-submit]",
      ),
    ],
  ),
  ...mergingAndDeletingBranch(),
];
