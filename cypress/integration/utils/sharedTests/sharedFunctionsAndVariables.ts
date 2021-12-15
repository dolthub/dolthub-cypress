import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithSqlConsole,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

export const beVisible = newShouldArgs("be.visible");
export const notExist = newShouldArgs("not.exist");
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

export const typingExpectation = (value: string, datacy: string) =>
  newExpectationWithTypeString(
    `should write description in textbox`,
    `[data-cy=${datacy}]`,
    beVisible,
    value,
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
    "[data-cy=sql-editor-collapsed]",
    [
      newExpectationWithSqlConsole(
        "should use sql console to edit table",
        "[data-cy=sql-editor-expanded]>div>div",
        beVisibleAndContain(queryType),
        sqlQuery,
      ),
    ],
    "[data-cy=run-query-button]",
  );

export const preUploadSteps = (
  description: string,
  uploadMethod: string,
  uploadMethodTitle: string,
  tableName: string,
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

  //! CHOOSE BRANCH AND TABLE NAME
  newExpectationWithClickFlows(
    "should show File Importer page",
    "[data-cy=upload-nav]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=upload-next-button]",
        [typingExpectation(tableName, "choose-table-name")],
        "[data-cy=upload-next-button]",
      ),
    ],
  ),
];

export const afterUploadSteps = (
  fileName: string,
  description: string,
  mergingTitle: string,
) => [
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
            beVisibleAndContain(fileName),
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
    `[data-cy=repo-tables-table-${fileName}`,
    beVisibleAndContain(fileName),
  ),
];
