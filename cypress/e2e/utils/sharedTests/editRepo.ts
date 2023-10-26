import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newExpectationWithScrollTo,
  newExpectationWithTypeString,
  newScrollToPosition,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  exist,
} from "./sharedFunctionsAndVariables";

export const mergingAndDeletingBranch = (title: string) => [
  newExpectation(
    `Should have title ${title}`,
    "[data-cy=pull-page-title]",
    beVisible,
  ),
  newExpectation(
    "Should have Open pull state",
    "[data-cy=pull-state-label]",
    beVisibleAndContain("Open"),
  ),

  //! VIEW DIFF
  newExpectationWithClickFlows(
    "should show view diff button",
    "[data-cy=view-diffs-button] button",
    beVisibleAndContain("View Diff "),
    [
      newClickFlow(
        "[data-cy=view-diffs-button] button",
        [
          newExpectation(
            "should should diff title",
            "[data-cy=diff-table-name]",
            beVisible,
          ),
          newExpectation(
            "should show diff stats",
            "[data-cy=diff-table-stats]",
            beVisible,
          ),
          newExpectation(
            "should show data button",
            "[data-cy=data-button]",
            beVisible,
          ),
          newExpectation(
            "should show schema button",
            "[data-cy=schema-button]",
            beVisible,
          ),
        ],
        "[data-cy=back-to-pull] button",
      ),
    ],
  ),

  newExpectationWithClickFlows(
    "should merge",
    "[data-cy=merge-button]",
    beVisible,
    [
      newClickFlow("[data-cy=merge-button]", [
        newExpectation(
          "Should say 'merging'",
          "[data-cy=merge-button]",
          beVisibleAndContain("Merging..."),
        ),
      ]),
    ],
  ),
  newExpectation(
    "Should have Merged pull state",
    "[data-cy=pull-state-label]",
    beVisibleAndContain("Merged"),
  ),
  newExpectationWithClickFlows(
    "should delete branch",
    "[data-cy=delete-branch-button]",
    beVisible,
    [newClickFlow("[data-cy=delete-branch-button]", [])],
  ),
];

export const createPullRequest: Tests = [
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

export const sqlConsoleEditClickFlow = (sqlQuery: string) =>
  newClickFlow(
    "",
    [
      newExpectationWithTypeString(
        "should use sql console to edit table",
        "[data-cy=sql-editor-expanded]>div>div textarea",
        exist,
        { value: sqlQuery },
      ),
    ],
    "[data-cy=run-query-button]",
  );

export const preUploadSteps = (
  description: string,
  uploadMethod: string,
  uploadMethodTitle: string,
) => [
  //! CLICK ADD TABLE
  newExpectationWithClickFlows(
    "should show add table button",
    "[data-cy=repo-tables-add-table]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-tables-add-table]",
        [
          newExpectation(
            `should show and click ${description}`,
            `[data-cy=file-upload-${uploadMethod}-table-link]`,
            beVisibleAndContain(uploadMethodTitle),
          ),
        ],
        `[data-cy=file-upload-${uploadMethod}-table-link]`,
      ),
    ],
  ),
  //! CHOOSE BRANCH
  newExpectationWithClickFlows(
    "should show File Importer page",
    "[data-cy=branch-title]",
    beVisibleAndContain("Choose a base branch"),
    [newClickFlow("[data-cy=upload-next-button]", [])],
  ),
];

export const afterUploadSteps = (
  fileName: string,
  primaryKey: string,
  uploadMethod = "",
) => [
  newExpectation(
    "should show upload successful message",
    `[data-cy=${uploadMethod}upload-successful]`,
    beVisibleAndContain("Upload successful"),
  ),
  newExpectation(
    "should show uploaded file",
    "[data-cy=file-name]",
    beVisibleAndContain(fileName),
  ),

  //! CHOOSE PRIMARY KEY
  newExpectationWithClickFlows(
    "should show choose primary key button",
    "[data-cy=choose-primary-keys-button]",
    beVisibleAndContain("Choose primary keys"),
    [newClickFlow("[data-cy=choose-primary-keys-button]", [])],
  ),
  newExpectationWithScrollTo(
    "should scroll to bottom",
    "#main-content",
    beVisible,
    newScrollToPosition("bottom", "#main-content"),
  ),
  newExpectationWithClickFlows(
    "should choose the primary key",
    `[data-cy=${primaryKey}-checkbox]`,
    exist,
    [newClickFlow(`[data-cy=${primaryKey}-checkbox]`, [])],
  ),
  newExpectationWithScrollIntoView(
    "should show the upload button",
    "[data-cy=upload-next-button]",
    beVisible,
    true,
  ),
  newExpectationWithClickFlows(
    "should click the upload button",
    "[data-cy=upload-next-button]",
    beVisible,
    [newClickFlow("[data-cy=upload-next-button]", [])],
  ),

  //! START IMPORT
  newExpectation(
    "should show Start import message",
    "[data-cy=import-title]",
    beVisibleAndContain("Start import"),
  ),
  newExpectation(
    "should have commit message text area",
    "[data-cy=commit-message-input",
    beVisible,
  ),
  newExpectation(
    "should have new branch name input",
    "[data-cy=new-branch-name-input",
    beVisible,
  ),
];
