import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);
const issueTitle = "test";
const issueContent = "test content";
const issueTitleEdits = "test edited";
const issueContentEdits = "test content edited";
const issueComment = "test comment";
const issueCommentUpdate = "test comment update";

const typingExpectation = (value: string, datacy: string, status?: string) =>
  newExpectationWithTypeString(
    `should write ${status}description in textbox`,
    `[data-cy=${datacy}]`,
    beVisible,
    value,
  );

export const testIssues: Tests = [
  //! CREATE A NEW ISSUE
  newExpectationWithClickFlows(
    "should navigate to the new issue page",
    "[data-cy=dropdown-database-nav]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=dropdown-database-nav]",
        [],
        "[data-cy=dropdown-new-issue-link]",
      ),
    ],
  ),
  typingExpectation(issueTitle, "issue-title-input", ""),
  typingExpectation(issueContent, "textarea-container", ""),
  newExpectationWithClickFlows(
    "should create the new issue",
    "[data-cy=new-issue-button]",
    beVisible,
    [newClickFlow("[data-cy=new-issue-button]", [])],
  ),

  newExpectationWithClickFlows(
    "the new issue should render in the issue tab",
    "[data-cy=repo-issues-tab]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-issues-tab]", [
        newExpectation(
          "should contain a new issue",
          "[data-cy=issue-row-1]",
          beVisible,
        ),
        newExpectation(
          "title should contain 'test'",
          "[data-cy=issue-title-1]",
          beVisibleAndContain(issueTitle),
        ),
        newExpectation(
          "Issue state should be Open",
          "[data-cy=issue-state-label]",
          newShouldArgs("equal", "Open"),
        ),
      ]),
    ],
  ),

  newExpectationWithClickFlows(
    "the new issue should be clickable",
    "[data-cy=issue-title-1]",
    beVisible,
    [newClickFlow("[data-cy=issue-title-1]", [])],
  ),

  newExpectationWithClickFlows(
    "should be able to edit the issue",
    "[data-cy=issue-page-edit-description-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=issue-page-edit-description-button]",
        [
          typingExpectation(issueTitleEdits, "issue-title-input", ""),
          typingExpectation(
            issueContentEdits,
            "issue-description-textarea",
            "",
          ),
        ],
        "[data-cy=issue-edit-save]",
      ),
    ],
  ),

  newExpectation(
    "should have changed issue title",
    "[data-cy=issue-page-title]>div>div>span",
    beVisibleAndContain("test edited"),
  ),

  newExpectation(
    "should have changed issue content",
    "[data-cy=issue-page-description]>div>p",
    beVisibleAndContain("test edited"),
  ),

  typingExpectation(issueComment, "comment-textarea-content", ""),

  newExpectationWithClickFlows(
    "should be able to submit the comment",
    "[data-cy=issue-page-comment-button]",
    beVisible,
    [newClickFlow("[data-cy=issue-page-comment-button]", [])],
  ),

  newExpectation(
    "should show the comment",
    "[data-cy=comment-markdown]>div>p",
    beVisibleAndContain("test comment"),
  ),

  newExpectationWithClickFlows(
    "should show the comment update button",
    "[data-cy=comment-edit-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=comment-edit-button]",
        [
          typingExpectation(
            issueCommentUpdate,
            "update-textarea-container",
            "",
          ),
        ],
        "[data-cy=issue-comment-update-button]",
      ),
    ],
  ),

  newExpectation(
    "should updated the comment",
    "[data-cy=comment-markdown]>div>p",
    beVisibleAndContain("test comment update"),
  ),

  newExpectationWithClickFlows(
    "should be able to close the issue",
    "[data-cy=issue-state-change-button]",
    beVisible,
    [newClickFlow("[data-cy=issue-state-change-button]", [])],
  ),

  newExpectationWithClickFlows(
    "the issue should be closed",
    "[data-cy=repo-issues-tab]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-issues-tab]",
        [
          newExpectation(
            "Issue state should be Closed",
            "[data-cy=issue-state-label]",
            newShouldArgs("equal", "Closed"),
          ),
        ],
        "[data-cy=issue-title-1]",
      ),
    ],
  ),

  newExpectationWithClickFlows(
    "should be able to reopen the issue",
    "[data-cy=issue-state-change-button]",
    beVisible,
    [newClickFlow("[data-cy=issue-state-change-button]", [])],
  ),

  newExpectationWithClickFlows(
    "the issue should be reopen",
    "[data-cy=repo-issues-tab]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-issues-tab]", [
        newExpectation(
          "Issue state should be Open",
          "[data-cy=issue-state-label]",
          newShouldArgs("equal", "Open"),
        ),
      ]),
    ],
  ),
];
