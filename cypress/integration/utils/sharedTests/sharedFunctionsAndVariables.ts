import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

export const beVisible = newShouldArgs("be.visible");
export const notExist = newShouldArgs("not.exist");
export const exist = newShouldArgs("exist");
export const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

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
    "[data-cy=view-diffs-button]>button",
    beVisibleAndContain("View Diff "),
    [
      newClickFlow(
        "[data-cy=view-diffs-button]>button",
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
        "",
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

export const typingExpectation = (value: string, selectorStr: string) =>
  newExpectationWithTypeString(
    `should write description in textbox`,
    selectorStr,
    beVisible,
    { value },
  );

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

export const sqlConsoleEditClickFlow = (queryType: string, sqlQuery: string) =>
  newClickFlow(
    "",
    [
      newExpectationWithTypeString(
        "should use sql console to edit table",
        "[data-cy=sql-editor-expanded]>div>div textarea",
        beVisibleAndContain(queryType),
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
            `[data-cy=file-upload-${uploadMethod}-branch-link]`,
            beVisibleAndContain(uploadMethodTitle),
          ),
        ],
        `[data-cy=file-upload-${uploadMethod}-branch-link]`,
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
  tableName: string,
  fileName: string,
  description: string,
  mergingTitle: string,
  primaryKey: string,
  uploadMethod: string,
) => [
  newExpectation(
    "should show upload successful message",
    `[data-cy=${uploadMethod}upload-successful]`,
    beVisibleAndContain("Upload successful"),
  ),
  newExpectation(
    "should show uploaded file",
    "[data-cy=file-name]",
    beVisibleAndContain(`${fileName}.csv`),
  ),

  //! CHOOSE PRIMARY KEY
  newExpectationWithClickFlows(
    "should show choose primary key button",
    "[data-cy=choose-primary-keys-button]",
    beVisibleAndContain("Choose primary keys"),
    [newClickFlow("[data-cy=choose-primary-keys-button]", [], "")],
  ),
  newExpectationWithClickFlows(
    "should choose the primary key",
    `data-cy=${primaryKey}-checkbox`,
    beVisibleAndContain(primaryKey),
    [
      newClickFlow(
        `data-cy=${primaryKey}-checkbox`,
        [],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),

  //! REVIEW CHANGES
  newExpectationWithClickFlows(
    "should show Review your changes message",
    "[data-cy=review-title]",
    beVisibleAndContain("Review your changes"),
    [
      newClickFlow(
        "",
        [
          newExpectation(
            "should match the file name",
            "[data-cy=file-name]",
            beVisibleAndContain(`${fileName}.csv`),
          ),
        ],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),

  //! COMMIT
  newExpectationWithClickFlows(
    "should show Commit changes message",
    "[data-cy=commit-title]",
    beVisibleAndContain("Commit changes"),
    [
      newClickFlow(
        "",
        [
          typingExpectation(
            `Creating test with changes from ${description}`,
            "[data-cy=textarea-container]>textarea",
          ),
        ],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),
  ...mergingAndDeletingBranch(mergingTitle),
  //! CHECK UPLOADED TABLE
  newExpectationWithClickFlows(
    "should be able to navigate to database tab",
    "[data-cy=repo-database-tab]",
    beVisible,
    [newClickFlow("[data-cy=repo-database-tab]", [])],
  ),
  newExpectation(
    "should show the uploaded table",
    `[data-cy=repo-tables-table-${tableName}`,
    beVisibleAndContain(tableName),
  ),
  newExpectation(
    "should show the primary key",
    `[data-cy=repo-tables-table-${tableName} [data-cy=${primaryKey}-primary-key]`,
    beVisible,
  ),
];
